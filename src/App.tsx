import { useEffect, useState } from 'react'
import Newt from './Newt'

const EMAIL = 'shanekopec.dev@gmail.com'
const GITHUB = 'https://github.com/kopecs48'
const LINKEDIN = 'https://www.linkedin.com/in/shane-kopec-b4b85a1ab/'
const RESUME = '/Shane_Kopec_resume_current.pdf'

const jobs = [
  {
    dates: 'July 2025 to July 2026',
    title: 'Senior Full Stack Software Engineer',
    company: 'Cengage Group',
    summary:
      'Led the evolution of React, TypeScript, and Node.js systems supporting hundreds of thousands of GitHub Codespaces environments. Replaced legacy content synchronization, led a TypeScript migration, and moved validation into Codespaces to reduce feedback latency by roughly 85%.',
    tools: 'TypeScript, React, Node.js, Docker, GitHub Codespaces',
  },
  {
    dates: 'July 2023 to July 2025',
    title: 'Junior Full Stack Software Engineer',
    company: 'Cengage Group',
    summary:
      'Built production devcontainer images and CI/CD pipelines serving up to 30,000 seats per semester. Helped migrate 24 programming courses and more than 170,000 students to cloud development environments while creating scalable QA automation for release validation.',
    tools: 'Devcontainers, GitHub Actions, GHCR, CI/CD, QA automation',
  },
]

const machines = [
  {
    name: 'Dual-boot workstation',
    specs: [
      ['Processor', 'Ryzen 7 9800X3D'],
      ['Graphics', 'MSI Ventus 3X RTX 5090'],
      ['Memory', '32 GB DDR5'],
      ['Systems', 'Arch Linux with KDE Plasma, Windows'],
    ],
    notes:
      'I built this workstation myself and dual-boot Windows for gaming and Arch Linux for gaming and development. With roughly 29 GB of VRAM available after Arch and KDE Plasma overhead, I use llama.cpp to run Qwen3.8 and other 27B dense or comparably sized MoE models locally.',
  },
  {
    name: 'Ubuntu server',
    specs: [
      ['Processor', 'Ryzen 7 5700X'],
      ['Graphics', 'RTX 3080'],
      ['Memory', '32 GB DDR4'],
      ['Systems', 'Ubuntu, Docker'],
    ],
    notes:
      'I built the machine entirely from secondhand parts and chose Ubuntu for its stability. Services run directly in Docker containers instead of through Proxmox, keeping GPU access straightforward without an added virtualization layer.',
  },
]

type Theme = 'dark' | 'light'
const THEME_COLORS: Record<Theme, string> = { dark: '#111a2e', light: '#e3eaec' }

function App() {
  // index.html has already applied the saved theme (or dark) to <html>.
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  }, [theme])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header wrap">
        <a className="site-name" href="#top">Shane Kopec</a>
        <nav aria-label="Main navigation">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#homelab">Homelab</a>
          <a href={RESUME} target="_blank" rel="noreferrer">Resume</a>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <Newt />
          <div className="wrap hero-inner">
            <div className="hero-text">
              <h1>Curious by nature.</h1>
              <p className="lead">
                I’m Shane, a software engineer in Lawrence, New Jersey. I like asking how things work, learning what I don’t know, and turning that curiosity into useful software.
              </p>
              <p className="hero-actions">
                <a className="button" href={`mailto:${EMAIL}`}>Email me</a>
                <a className="button quiet" href={RESUME} target="_blank" rel="noreferrer">Read my resume</a>
              </p>
            </div>
            <p className="caption hero-caption">
              <b>Fig. 1.</b> <i>Notophthalmus proceduralis</i>, a red eft. Common in New Jersey woods after rain; this one is drawn fresh every frame from eighteen circles and some trigonometry. It follows your pointer.
            </p>
          </div>
        </section>

        <section className="band wrap" id="about">
          <div className="margin-row">
            <img className="portrait" src="/images/shane-kopec-headshot.jpg" alt="Shane Kopec" width="400" height="400" />
            <div className="prose">
              <h2>Learning across the stack, building at scale</h2>
              <p>
                Curiosity has taken me across the stack, from React and TypeScript products to Node.js services and containerized development infrastructure. At Cengage, that breadth helped me support cloud-based learning environments used across 24 programming courses and more than 170,000 students.
              </p>
              <p>
                I’ve led JavaScript-to-TypeScript migrations, redesigned content delivery and validation pipelines, and reduced developer feedback time by roughly 85%. I care about dependable systems, maintainable code, and solving the infrastructure problems that make better product experiences possible.
              </p>
              <p className="aside">
                Most days I work with TypeScript, React, Node.js, Docker, GitHub Codespaces, CI/CD pipelines, VS Code extensions, and MCP. I’m open to the right opportunity.
              </p>
            </div>
          </div>
        </section>

        <section className="band wrap ruled" id="experience">
          <h2>Experience</h2>
          <ol className="jobs">
            {jobs.map((job) => (
              <li className="margin-row" key={job.title}>
                <p className="job-dates">{job.dates}</p>
                <div className="prose">
                  <h3>{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <p>{job.summary}</p>
                  <p className="aside">Worked with {job.tools}.</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="dark" id="projects">
          <div className="band wrap">
            <h2>Things I built to find out how they work</h2>

            <article className="project">
              <figure>
                <img src="/images/mcp_dashboard.png" alt="A table of recent MCP calls showing server, method, status, latency, and request payload" loading="lazy" width="1112" height="557" />
                <figcaption className="caption"><b>Fig. 2.</b> Recent calls passing through the proxy, with status and latency for each.</figcaption>
              </figure>
              <div className="prose">
                <h3>MCP Dashboard</h3>
                <p>
                  A self-hosted, containerized reverse proxy that brings visibility to MCP traffic across my local AI setup by logging tool calls, status, latency, and payloads.
                </p>
                <p className="aside">Built with TypeScript, Fastify, SQLite, and Docker.</p>
                <p><a className="button" href="https://github.com/kopecs48/mcp-dashboard" target="_blank" rel="noreferrer"aria-label="View the MCP Dashboard code on GitHub">View the code on GitHub</a></p>
              </div>
            </article>

            <article className="project flipped">
              <figure>
                <video controls playsInline preload="none" poster="/images/human-walking.jpg" aria-label="Procedural Animations: a character walking, animated entirely in code">
                  <source src="/videos/human-walking.webm" type="video/webm" />
                  <a href="/videos/human-walking.webm">Download the animation demo</a>
                </video>
                <figcaption className="caption"><b>Fig. 3.</b> A walking character with no sprite sheet. Press play to watch it move.</figcaption>
              </figure>
              <div className="prose">
                <h3>Procedural Animations</h3>
                <p>
                  Asset-free character and animal animations in Lua and LÖVE2D, with reusable movement modules for walking, trotting, and slithering and interchangeable visual models.
                </p>
                <p className="aside">Built with Lua and LÖVE2D. The newt at the top of this page uses the same ideas.</p>
                <p><a className="button" href="https://github.com/kopecs48/ProceduralAnimations" target="_blank" rel="noreferrer"aria-label="View the Procedural Animations code on GitHub">View the code on GitHub</a></p>
              </div>
            </article>

            <p className="more"><a href={GITHUB} target="_blank" rel="noreferrer">See everything else on GitHub</a></p>
          </div>
        </section>

        <section className="band wrap" id="homelab">
          <div className="margin-row">
            <div />
            <div className="prose">
              <h2>Off the clock, still curious</h2>
              <p>
                I enjoy running technology on my own terms. I experiment with models that run locally to understand their capabilities, their tradeoffs, and the infrastructure working behind the interface. And I like owning the whole stack: deploying useful services, keeping them running, and learning from everything that breaks along the way.
              </p>
            </div>
          </div>
          <div className="machines">
            {machines.map((machine) => (
              <article className="machine" key={machine.name}>
                <h3>{machine.name}</h3>
                <dl>
                  {machine.specs.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
                <p>{machine.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="band wrap ruled contact" id="contact">
          <h2>Have a project or an opening? Write to me.</h2>
          <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </section>
      </main>

      <footer className="wrap site-footer">
        <p>© {new Date().getFullYear()} Shane Kopec</p>
        <p><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a></p>
      </footer>
    </>
  )
}

export default App
