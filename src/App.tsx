import { useEffect, useState } from 'react'

type Project = {
  number: string
  title: string
  summary: string
  image: string
  tags: string[]
  href?: string
  live?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    number: '01',
    title: 'MCP Dashboard',
    summary: 'A self-hosted, containerized reverse proxy that brings visibility to MCP traffic across my local AI setup by logging tool calls, status, latency, and payloads.',
    image: '/images/mcp_dashboard.png',
    tags: ['TypeScript', 'Fastify', 'SQLite', 'Docker', 'MCP', 'Self-hosted'],
    href: 'https://github.com/kopecs48/mcp-dashboard',
    featured: true,
  },
  {
    number: '02',
    title: 'MusicBuddy',
    summary: 'A social music platform that brings Spotify playback, playlists, profiles, and conversation into one connected experience.',
    image: '/images/musicBuddyHome.png',
    tags: ['Django', 'Python', 'Spotify API', 'Bootstrap'],
    href: 'https://github.com/kopecs48/DjangoSpotify',
    featured: true,
  },
  {
    number: '03',
    title: 'Mood Journal',
    summary: 'A private daily check-in app with secure accounts, personal post history, and streak tracking.',
    image: '/images/moodWebApp.png',
    tags: ['Django REST', 'Python', 'Authentication'],
    href: 'https://github.com/kopecs48/MoodWebApp',
    featured: true,
  },
  {
    number: '04',
    title: 'Metric Learning Lab',
    summary: 'A visual data-analysis pipeline comparing learned distance metrics through KNN classification accuracy.',
    image: '/images/metricLearnHome.png',
    tags: ['scikit-learn', 'NumPy', 'Matplotlib'],
    href: 'https://github.com/kopecs48/Metric-Learn-Data-Visualization',
  },
  {
    number: '05',
    title: 'Secure Access',
    summary: 'A React authentication flow powered by AWS Cognito, including verification and account recovery.',
    image: '/images/userLoginHome.png',
    tags: ['React', 'AWS Amplify', 'Cognito'],
    href: 'https://github.com/kopecs48/aws-cognito-tutorial-starter',
  },
]

const skills = ['TypeScript', 'React', 'Node.js', 'Docker', 'GitHub Codespaces', 'CI/CD', 'VS Code Extensions', 'MCP']

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function SocialIcon({ name }: { name: 'github' | 'linkedin' }) {
  return name === 'github' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.3 7.9H1.7V22h3.6V7.9ZM3.5 2a2.1 2.1 0 1 0 0 4.2A2.1 2.1 0 0 0 3.5 2ZM22.3 13.9c0-4.2-2.2-6.2-5.2-6.2-2.4 0-3.5 1.3-4.1 2.2v-2H9.4V22H13v-7c0-1.8.4-3.6 2.7-3.6 2.3 0 2.3 2.1 2.3 3.7V22h3.6l.7-8.1Z" /></svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <div className="brand-cluster">
          <a className="monogram" href="#top" aria-label="Shane Kopec, home">SK<span>.</span></a>
          <div className="header-socials" aria-label="Professional profiles">
            <a href="https://github.com/kopecs48" target="_blank" rel="noreferrer" aria-label="GitHub"><SocialIcon name="github" /></a>
            <a href="https://www.linkedin.com/in/shane-kopec-b4b85a1ab/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon name="linkedin" /></a>
          </div>
        </div>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a className="resume-link" href="/Shane_Kopec_resume_current.pdf" target="_blank" onClick={() => setMenuOpen(false)}>Resume</a>
          <a className="contact-pill" href="mailto:shanekopec.dev@gmail.com">Let’s talk <Arrow diagonal /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <p className="eyebrow"><span className="status-dot" /> Available for the right opportunity</p>
          <h1>Curious by nature.<br /><em>Always learning.</em></h1>
          <div className="hero-bottom">
            <p className="intro-copy">I’m Shane, a software engineer who likes asking how things work, learning what I don’t know, and turning that curiosity into useful software.</p>
            <a className="hero-portrait" href="#about" aria-label="Learn more about Shane">
              <img src="/images/shane-kopec-headshot.jpg" alt="Shane Kopec" />
              <span className="portrait-arrow"><Arrow /></span>
            </a>
          </div>
          <div className="hero-rule"><span>Based in Lawrence, New Jersey</span><span>Software Engineer · Lifelong Learner</span></div>
        </section>

        <section className="about section-pad" id="about">
          <div className="about-label"><span>About</span><span className="curiosity-note">Always asking why</span></div>
          <div className="about-copy">
            <h2>Learning across the stack.<br /><em>Building at scale.</em></h2>
            <div className="about-columns">
              <p>Curiosity has taken me across the stack—from React and TypeScript products to Node.js services and containerized development infrastructure. At Cengage, that breadth helped me support cloud-based learning environments used across 24 programming courses and more than 170,000 students.</p>
              <p>I’ve led JavaScript-to-TypeScript migrations, redesigned content delivery and validation pipelines, and reduced developer feedback time by roughly 85%. I care about dependable systems, maintainable code, and solving the infrastructure problems that make better product experiences possible.</p>
            </div>
            <ul className="skills-list">
              {skills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, '0')}</span>{skill}</li>)}
            </ul>
          </div>
        </section>

        <section className="experience section-pad" id="experience">
          <div className="section-heading">
            <p className="kicker">Professional experience</p>
            <h2>Building systems that<br /><em>work at scale.</em></h2>
          </div>
          <div className="experience-list">
            <article className="experience-row">
              <div className="experience-meta">
                <p>Cengage Group</p>
                <span>July 2025 — July 2026</span>
              </div>
              <div className="experience-detail">
                <h3>Senior Full Stack Software Engineer</h3>
                <p>Led the evolution of React, TypeScript, and Node.js systems supporting hundreds of thousands of GitHub Codespaces environments. Replaced legacy content synchronization, led a TypeScript migration, and moved validation into Codespaces to reduce feedback latency by roughly 85%.</p>
                <ul className="tag-list dark-tags">
                  <li>TypeScript</li><li>React</li><li>Node.js</li><li>Docker</li><li>GitHub Codespaces</li>
                </ul>
              </div>
            </article>
            <article className="experience-row">
              <div className="experience-meta">
                <p>Cengage Group</p>
                <span>July 2023 — July 2025</span>
              </div>
              <div className="experience-detail">
                <h3>Junior Full Stack Software Engineer</h3>
                <p>Built production devcontainer images and CI/CD pipelines serving up to 30,000 seats per semester. Helped migrate 24 programming courses and more than 170,000 students to cloud development environments while creating scalable QA automation for release validation.</p>
                <ul className="tag-list dark-tags">
                  <li>Devcontainers</li><li>GitHub Actions</li><li>GHCR</li><li>CI/CD</li><li>QA Automation</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="interests section-pad" aria-labelledby="interests-heading">
          <div className="section-heading interests-heading">
            <p className="kicker">Beyond work</p>
            <div>
              <h2 id="interests-heading">Off the clock.<br /><em>Still curious.</em></h2>
              <p className="interests-intro">My curiosity follows me beyond the job. I enjoy running technology on my own terms and exploring the systems behind the tools I use.</p>
            </div>
          </div>
          <div className="interest-list">
            <article>
              <span>01</span>
              <h3>Local LLMs</h3>
              <p>I experiment with models that run locally to better understand their capabilities, tradeoffs, and the infrastructure working behind the interface.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Self-hosting</h3>
              <p>I like taking ownership of the whole stack—deploying useful services, keeping them running, and learning from everything that breaks along the way.</p>
            </article>
          </div>
          <div className="homelab-setup">
            <p className="kicker">The setup</p>
            <div className="machine-list">
              <article>
                <div className="machine-heading">
                  <span>01</span>
                  <h3>Dual-boot workstation</h3>
                </div>
                <p className="machine-specs">Ryzen 7 9800X3D · MSI Ventus 3X RTX 5090 · 32 GB DDR5</p>
                <p>I built this workstation myself and dual-boot Windows for gaming and Arch Linux for gaming and development. With roughly 29 GB of VRAM available after Arch and KDE Plasma overhead, I use llama.cpp to run Qwen3.8 and other 27B dense or comparably sized MoE models locally.</p>
              </article>
              <article>
                <div className="machine-heading">
                  <span>02</span>
                  <h3>Ubuntu server</h3>
                </div>
                <p className="machine-specs">Ryzen 7 5700X · RTX 3080 · 32 GB DDR4</p>
                <p>I built the machine entirely from secondhand parts and chose Ubuntu for its stability. Services run directly in Docker containers instead of through Proxmox, keeping GPU access straightforward without an added virtualization layer.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="work">
          <div className="section-heading">
            <p className="kicker">Selected work</p>
            <h2>Projects made to be <em>used.</em></h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={project.featured ? 'project-card featured' : 'project-card'} key={project.title}>
                <div className="project-image-wrap">
                  <span className="project-number">{project.number}</span>
                  <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
                </div>
                <div className="project-content">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <ul className="tag-list" aria-label="Technologies">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="project-links">
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer">View code <Arrow diagonal /></a>}
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live site <Arrow diagonal /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="text-link" href="https://github.com/kopecs48" target="_blank" rel="noreferrer">Explore all projects on GitHub <Arrow diagonal /></a>
        </section>

        <section className="contact section-pad" id="contact">
          <p className="kicker">Have a project or opportunity?</p>
          <h2>Let’s make something<br /><em>worth using.</em></h2>
          <a className="email-link" href="mailto:shanekopec.dev@gmail.com">shanekopec.dev@gmail.com <Arrow diagonal /></a>
        </section>
      </main>

      <footer className="footer section-pad">
        <a className="monogram" href="#top">SK<span>.</span></a>
        <p>© {new Date().getFullYear()} Shane Kopec</p>
        <div><a href="https://github.com/kopecs48" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/shane-kopec-b4b85a1ab/" target="_blank" rel="noreferrer">LinkedIn</a></div>
      </footer>
    </div>
  )
}

export default App
