import { useEffect, useRef } from 'react'

/*
 * A red eft (juvenile eastern newt) drawn procedurally: a chain of
 * distance-constrained circles for the spine, an outline traced around
 * them, and four legs that step on their own using two-bone IK.
 * No sprites or image assets.
 */

type P = { x: number; y: number }
type Leg = { idx: number; side: 1 | -1; front: boolean; foot: P; from: P; to: P; t: number }

let INK = '#16213b' // outline colour; replaced by the theme's --newt-line
const BODY = '#e8601c'
const SPOT = '#b8201a'

// Body radius at each spine point, nose to tail tip.
const RADII = [9, 11, 10, 9.5, 11.5, 12.5, 13, 13, 12.5, 11.5, 10, 8.5, 7, 5.8, 4.6, 3.6, 2.6, 1.7]
const N = RADII.length
const SHOULDER = 3
const HIP = 9
const MAX_BEND = 0.42

const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

export default function Newt() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let s = 1
    let seg = 12
    let heading = Math.PI * 1.08
    let speed = 0
    let phase = 0
    let visible = true
    let pointer: P | null = null
    let pointerExpires = 0
    let raf = 0
    let last = 0
    const spine: P[] = []
    const legs: Leg[] = []

    const segAngle = (i: number) => {
      const a = spine[Math.max(i, 1) - 1]
      const b = spine[Math.max(i, 1)]
      return Math.atan2(a.y - b.y, a.x - b.x)
    }

    const legHome = (leg: Leg, lead = 0): P => {
      const a = segAngle(leg.idx)
      const p = spine[leg.idx]
      const reach = 25 * s
      const fwd = (leg.front ? 9 : -3) * s + lead
      return {
        x: p.x + Math.cos(a) * fwd + Math.cos(a + (Math.PI / 2) * leg.side) * reach,
        y: p.y + Math.sin(a) * fwd + Math.sin(a + (Math.PI / 2) * leg.side) * reach,
      }
    }

    const place = () => {
      const wide = w > 800
      const head = wide ? { x: w * 0.7, y: h * 0.47 } : { x: w * 0.4, y: h - 195 }
      heading = Math.PI * 1.08
      spine.length = 0
      let x = head.x
      let y = head.y
      for (let i = 0; i < N; i++) {
        spine.push({ x, y })
        const a = heading + 0.55 * Math.sin(i * 0.42 + 0.6)
        x -= Math.cos(a) * seg
        y -= Math.sin(a) * seg
      }
      legs.length = 0
      for (const idx of [SHOULDER, HIP]) {
        for (const side of [1, -1] as const) {
          const leg: Leg = { idx, side, front: idx === SHOULDER, foot: { x: 0, y: 0 }, from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, t: 1 }
          // Offset diagonal pairs so the first steps fall into a walking gait.
          const diagonal = (leg.front ? 1 : -1) * side
          leg.foot = legHome(leg, diagonal * 7 * s)
          legs.push(leg)
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s = clamp(w / 1150, 0.62, 1.2)
      seg = 12 * s
      place()
      draw()
    }

    const update = (dt: number, now: number) => {
      const wide = w > 800
      const following = pointer !== null && now < pointerExpires
      let target: P
      if (following && pointer) {
        target = pointer
      } else {
        const t = now / 1000
        const cx = wide ? w * 0.7 : w * 0.5
        const cy = wide ? h * 0.5 : h - 195
        const rx = wide ? w * 0.2 : w * 0.3
        const ry = wide ? h * 0.3 : 18
        target = { x: cx + rx * Math.sin(t * 0.21), y: cy + ry * Math.sin(t * 0.33 + 1) }
      }

      const head = spine[0]
      const dx = target.x - head.x
      const dy = target.y - head.y
      const dist = Math.hypot(dx, dy)
      const stopAt = 30 * s
      const diff = wrap(Math.atan2(dy, dx) - heading)
      if (dist > stopAt) heading += clamp(diff, -3.2 * dt, 3.2 * dt)

      const top = (following ? 210 : 60) * s
      let want = dist > stopAt ? Math.min(top, (dist - stopAt) * 2.5) : 0
      want *= Math.max(0.25, Math.cos(diff))
      speed += (want - speed) * Math.min(1, dt * 6)

      // The head swings side to side as it travels, which sends a wave down the body.
      phase += (speed * dt) / (seg * 2.4)
      const dir = heading + Math.sin(phase) * 0.32 * Math.min(1, speed / (40 * s))
      head.x += Math.cos(dir) * speed * dt
      head.y += Math.sin(dir) * speed * dt

      let prev = dir
      for (let i = 1; i < N; i++) {
        const a = spine[i - 1]
        const b = spine[i]
        let ang = Math.atan2(a.y - b.y, a.x - b.x)
        ang = prev + clamp(wrap(ang - prev), -MAX_BEND, MAX_BEND)
        b.x = a.x - Math.cos(ang) * seg
        b.y = a.y - Math.sin(ang) * seg
        prev = ang
      }

      const moving = speed > 6 * s
      for (const leg of legs) {
        if (leg.t < 1) {
          leg.t = Math.min(1, leg.t + dt / 0.14)
          const e = leg.t * leg.t * (3 - 2 * leg.t)
          leg.foot.x = leg.from.x + (leg.to.x - leg.from.x) * e
          leg.foot.y = leg.from.y + (leg.to.y - leg.from.y) * e
          continue
        }
        const home = legHome(leg)
        const off = Math.hypot(home.x - leg.foot.x, home.y - leg.foot.y)
        const partner = legs.find((l) => l.idx === leg.idx && l.side !== leg.side)
        if (off > 17 * s && (!partner || partner.t >= 1)) {
          leg.from = { ...leg.foot }
          leg.to = legHome(leg, moving ? 13 * s : 0)
          leg.t = 0
        }
      }
    }

    const strokeBoth = (path: () => void, outer: number, inner: number) => {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      path()
      ctx.strokeStyle = INK
      ctx.lineWidth = outer * s
      ctx.stroke()
      path()
      ctx.strokeStyle = BODY
      ctx.lineWidth = inner * s
      ctx.stroke()
    }

    const drawLeg = (leg: Leg) => {
      const a = spine[leg.idx]
      const upper = 15 * s
      const lower = 16 * s
      const base = Math.atan2(leg.foot.y - a.y, leg.foot.x - a.x)
      const d = clamp(Math.hypot(leg.foot.x - a.x, leg.foot.y - a.y), 2, upper + lower - 0.5)
      const foot = { x: a.x + Math.cos(base) * d, y: a.y + Math.sin(base) * d }
      const inner = Math.acos(clamp((upper * upper + d * d - lower * lower) / (2 * upper * d), -1, 1))
      const bend = base + inner * leg.side * (leg.front ? 1 : -1)
      const joint = { x: a.x + Math.cos(bend) * upper, y: a.y + Math.sin(bend) * upper }
      const toeDir = Math.atan2(foot.y - joint.y, foot.x - joint.x)

      strokeBoth(() => {
        ctx.beginPath()
        for (const spread of [-0.75, -0.25, 0.25, 0.75]) {
          ctx.moveTo(foot.x, foot.y)
          ctx.lineTo(foot.x + Math.cos(toeDir + spread) * 6.5 * s, foot.y + Math.sin(toeDir + spread) * 6.5 * s)
        }
      }, 4.6, 2)
      strokeBoth(() => {
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(joint.x, joint.y)
        ctx.lineTo(foot.x, foot.y)
      }, 8.6, 5.4)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      if (!spine.length) return
      legs.forEach(drawLeg)

      // Trace the outline: around the snout, down one flank, round the tail tip, back up the other.
      const a0 = segAngle(0)
      const pts: P[] = []
      for (let k = 0; k <= 6; k++) {
        const rel = (Math.PI / 2) * (1 - k / 3)
        const r = RADII[0] * s * (1 + 0.3 * Math.cos(rel))
        pts.push({ x: spine[0].x + Math.cos(a0 + rel) * r, y: spine[0].y + Math.sin(a0 + rel) * r })
      }
      const flank = (i: number, side: number): P => {
        const a = (segAngle(i) + segAngle(Math.min(i + 1, N - 1))) / 2
        const fix = Math.abs(segAngle(i) - segAngle(Math.min(i + 1, N - 1))) > Math.PI ? Math.PI : 0
        const r = RADII[i] * s
        return { x: spine[i].x + Math.cos(a + fix + (Math.PI / 2) * side) * r, y: spine[i].y + Math.sin(a + fix + (Math.PI / 2) * side) * r }
      }
      for (let i = 1; i < N; i++) pts.push(flank(i, -1))
      const tailA = segAngle(N - 1)
      pts.push({ x: spine[N - 1].x - Math.cos(tailA) * 5 * s, y: spine[N - 1].y - Math.sin(tailA) * 5 * s })
      for (let i = N - 1; i >= 1; i--) pts.push(flank(i, 1))

      ctx.beginPath()
      const n = pts.length
      ctx.moveTo((pts[n - 1].x + pts[0].x) / 2, (pts[n - 1].y + pts[0].y) / 2)
      for (let i = 0; i < n; i++) {
        const next = pts[(i + 1) % n]
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + next.x) / 2, (pts[i].y + next.y) / 2)
      }
      ctx.closePath()
      ctx.fillStyle = BODY
      ctx.fill()
      ctx.strokeStyle = INK
      ctx.lineWidth = 2 * s
      ctx.lineJoin = 'round'
      ctx.stroke()

      // Two rows of black-ringed red spots along the back, as on a real eft.
      for (let i = 2; i <= 11; i++) {
        for (const side of [1, -1]) {
          const a = segAngle(i) + (Math.PI / 2) * side
          const r = RADII[i] * s * 0.48
          ctx.beginPath()
          ctx.arc(spine[i].x + Math.cos(a) * r, spine[i].y + Math.sin(a) * r, (i > 9 ? 1.4 : 2) * s, 0, Math.PI * 2)
          ctx.fillStyle = SPOT
          ctx.fill()
          ctx.strokeStyle = INK
          ctx.lineWidth = 0.9 * s
          ctx.stroke()
        }
      }

      for (const side of [1, -1]) {
        const a = a0 + (Math.PI / 2) * side
        const r = RADII[0] * s
        ctx.beginPath()
        ctx.arc(spine[0].x + Math.cos(a0) * r * 0.3 + Math.cos(a) * r * 0.66, spine[0].y + Math.sin(a0) * r * 0.3 + Math.sin(a) * r * 0.66, 2.5 * s, 0, Math.PI * 2)
        ctx.fillStyle = INK
        ctx.fill()
      }
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!visible || document.hidden) return
      update(dt, now)
      draw()
    }

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointer = null
        return
      }
      pointer = { x, y }
      // A mouse keeps the newt's attention while it stays in the frame; a tap holds it briefly.
      pointerExpires = e.pointerType === 'mouse' ? Infinity : performance.now() + 4000
    }

    const readTheme = () => {
      INK = getComputedStyle(document.documentElement).getPropertyValue('--newt-line').trim() || INK
      draw()
    }
    const themeObserver = new MutationObserver(readTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    readTheme()

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    const viewObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    viewObserver.observe(canvas)
    resize()

    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointer)
      window.addEventListener('pointerdown', onPointer)
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      sizeObserver.disconnect()
      themeObserver.disconnect()
      viewObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  return <canvas ref={ref} className="newt" aria-hidden="true" />
}
