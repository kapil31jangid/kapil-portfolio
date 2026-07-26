"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Download, ExternalLink, Github, Mail, Send, Award, BadgeCheck, BookOpen, Bot } from "lucide-react";
import { aboutParagraphs, achievements, assistantKnowledge, certifications, currentFocus, education, experience, extras, projects, services, siteConfig, skillCategories, socialProfiles } from "@/data/portfolio";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

type View = "home" | "about" | "projects" | "journey" | "services" | "contact" | "certifications" | "achievements" | "blogs" | "open-source" | "social" | "assistant" | "extras";
const titles: Record<Exclude<View, "home">, string> = { about: "The person behind the systems.", projects: "Selected product worlds.", journey: "A path in motion.", services: "Ways we can build.", contact: "Start a meaningful conversation.", certifications: "Learning, verified.", achievements: "Milestones in motion.", blogs: "Notes worth sharing.", "open-source": "Public code, verified.", social: "Find the right channel.", assistant: "Portfolio guidance, grounded.", extras: "Behind the portfolio." };

function Frame({ children, view }: { children: React.ReactNode; view: View }) {
  const reduced = useReducedMotion();
  const extrasEnvironment = view === "extras";
  return <AnimatePresence mode="wait"><motion.section key={view} className={`screen screen-${view}`} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -12 }} transition={{ duration: .46, ease: "easeOut" }}>
    {extrasEnvironment ? <><div className="extras-environment" aria-hidden="true"><div className="extras-grid" /><div className="extras-circuits" /><div className="extras-beam" /></div></> : <><div className="poster-grid" aria-hidden="true" /><div className="circuit-field" aria-hidden="true" /><ParticlesBackground density={25} /></>}{children}
  </motion.section></AnimatePresence>;
}

function Label({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{"// "}{children}</p>; }
function PageTitle({ view }: { view: Exclude<View, "home"> }) { return <div className="view-title"><Label>Kapil Jangid / index</Label><h1>{titles[view]}</h1></div>; }

function Home() { return <Frame view="home"><div className="hero-copy"><Label>Ahmedabad, India · Available for collaboration</Label><p className="hero-kapil">KAPIL<br />JANGID</p><h1>AI Driven<br /><em>Full Stack Developer</em></h1><p className="hero-intro">{siteConfig.heroIntro}</p><Link className="explore focus-ring" href="/projects"><span>Explore<br />My Work</span><ArrowDownRight /></Link></div><div className="hero-portrait" aria-label="Portrait of Kapil Jangid"><div className="energy energy-cyan" /><div className="energy energy-violet" /><Image src="/profile/kapil-hero-transparent.png" alt="Kapil Jangid" fill priority sizes="(max-width: 767px) 88vw, 51vw" /></div><div className="hero-meta">KJ / 2026<br /><span>BUILDING INTELLIGENT<br />DIGITAL SYSTEMS</span></div></Frame>; }

function About() { return <Frame view="about"><PageTitle view="about" /><div className="about-layout"><div className="about-copy">{aboutParagraphs.slice(0,2).map(p=><p key={p}>{p}</p>)}<a className="text-link focus-ring" href={siteConfig.resumePath} download>Download résumé <Download /></a></div><div className="education-rail">{education.slice(0,2).map(item=><div key={item.institution}><span>{item.period}</span><h2>{item.institution}</h2><p>{item.qualification}</p></div>)}</div></div><div className="capability-line">{skillCategories.map((group, i)=><div key={group.title}><b>0{i+1}</b><h2>{group.title}</h2><p>{group.skills.slice(0,4).join(" · ")}</p></div>)}</div><div className="focus-strip"><Label>Current focus</Label>{currentFocus.map(item=><p key={item}>{item}</p>)}</div></Frame>; }

function Projects() { const [current,setCurrent] = useState(0); const p = projects[current]; const previous=()=>setCurrent((current+projects.length-1)%projects.length), next=()=>setCurrent((current+1)%projects.length); return <Frame view="projects"><PageTitle view="projects" /><div className="project-stage"><div className="project-shot"><Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 767px) 94vw, 56vw" priority /><span>{String(current+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span></div><div className="project-details"><Label>{p.status}</Label><h2>{p.name}</h2><p>{p.tagline}</p><div className="project-tags">{p.stack.slice(0,5).map(s=><span key={s}>{s}</span>)}</div><p className="contribution">{p.contribution}</p><div className="project-links">{p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="focus-ring"><Github /> Repository</a>}{p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="focus-ring"><ExternalLink /> Live build</a>}</div></div><div className="slider-controls"><button onClick={previous} className="focus-ring" aria-label="Previous project"><ChevronLeft /></button><button onClick={next} className="focus-ring" aria-label="Next project"><ChevronRight /></button></div></div></Frame>; }

function Journey() { return <Frame view="journey"><PageTitle view="journey" /><div className="journey-layout"><div className="timeline">{experience.map((e,i)=><article key={e.organisation}><span className="timeline-dot" /><time>{e.start} — {e.end}</time><h2>{e.role}</h2><h3>{e.organisation}</h3><p>{e.responsibilities[0]}</p><small>{String(i+1).padStart(2,"0")}</small></article>)}</div><aside className="journey-aside"><Label>Learning track</Label>{education.slice(0,2).map(e=><div key={e.institution}><b>{e.institution}</b><p>{e.qualification}</p><span>{e.period}</span></div>)}</aside></div></Frame>; }

function Services() { return <Frame view="services"><PageTitle view="services" /><div className="services-list">{services.map((service,i)=><article key={service.title}><span>0{i+1}</span><h2>{service.title}</h2><p>{service.description}</p><ArrowUpRight /></article>)}</div></Frame>; }

function Contact() { const [sent,setSent]=useState(false); const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault(); const form=new FormData(e.currentTarget); const name=String(form.get("name")||""); const email=String(form.get("email")||""); const message=String(form.get("message")||""); window.location.href=`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Portfolio contact — ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`; setSent(true);}; return <Frame view="contact"><PageTitle view="contact" /><div className="contact-layout"><div><p className="contact-copy">{siteConfig.contactAvailability}</p><a href={`mailto:${siteConfig.email}`} className="contact-email focus-ring"><Mail />{siteConfig.email}</a><p className="location">Ahmedabad, Gujarat, India<br />IST · UTC +5:30</p></div><form className="contact-form" onSubmit={submit}><label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label><label>Tell me about it<textarea name="message" required minLength={20} /></label><button className="focus-ring" type="submit"><Send /> Send message</button>{sent&&<p role="status">Opening your email client with your message.</p>}</form></div></Frame>; }

function ExtrasExplorer() {
  return <Frame view="extras">
    <header className="extras-kicker"><span>Beyond the code</span><p>A collection of the tools, ideas and experiences that shape how I learn, build and contribute beyond the code.</p></header>
    <main className="extras-single-page">{extras.map((item) => <article id={item.id} key={item.id} className="extras-single-section">
      <div className="extras-single-heading"><Label>{item.metadata}</Label><h1>{item.title}</h1><p>{item.introduction}</p></div>
      <div className="extras-details"><p className="eyebrow">{"// Field notes"}</p>{item.items.map((entry, index) => <div key={`${entry.title}-${index}`}><h2>{entry.title}</h2><p>{entry.detail}</p></div>)}</div>
    </article>)}</main>
  </Frame>;
}

function Secondary({ view }: { view: Exclude<View, "home" | "about" | "projects" | "journey" | "services" | "contact"> }) {
  const certView = view === "certifications";
  const sourceProjects = projects.filter((project) => project.github);
  return <Frame view={view}><PageTitle view={view} />
    {certView && <div className="editorial-list certificate-list">{certifications.map((item, i) => <article key={item.name}><span>0{i + 1}</span><div>{item.image && <Image src={item.image} alt="" width={72} height={72} className="certificate-thumb" />}<h2>{item.name}</h2><p>{item.issuer}{item.date ? ` · ${item.date}` : ""}</p><small>{item.skills?.join(" · ")}</small></div><BadgeCheck /></article>)}</div>}
    {view === "achievements" && <div className="editorial-list">{achievements.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div><h2>{item.title}</h2><p>{item.description}</p><small>{item.date}</small></div><Award /></article>)}</div>}
    {view === "blogs" && <div className="empty-editorial"><BookOpen /><h2>Verified writing archive</h2><p>No verified publication link has been supplied yet. This route intentionally does not fabricate articles or reading metrics.</p></div>}
    {view === "open-source" && <div className="editorial-list">{sourceProjects.map((item, i) => <article key={item.id}><span>0{i + 1}</span><div><h2>{item.name}</h2><p>{item.contribution}</p><small>{item.stack.join(" · ")}</small></div><a href={item.github} target="_blank" rel="noopener noreferrer" className="focus-ring" aria-label={`${item.name} repository`}><Github /></a></article>)}</div>}
    {view === "social" && <><p className="social-support">Explore my professional profiles, developer communities, technical writing and direct contact channels.</p><div className="social-directory">{socialProfiles.map((profile) => { const Icon = profile.icon; const demoLabel = profile.demo ? "Demo link — profile URL pending verification" : profile.category; return <a key={profile.name} href={profile.url} target={profile.external ? "_blank" : undefined} rel={profile.external ? "noopener noreferrer" : undefined} className={`social-entry focus-ring ${profile.featured ? "featured" : ""}`} aria-label={profile.demo ? `Open demo link for ${profile.name}` : profile.external ? `Open Kapil Jangid’s ${profile.name} profile` : "Email Kapil Jangid"}><Icon aria-hidden={true} className="social-entry-icon" /><span className="social-entry-copy"><small>{demoLabel}</small><b>{profile.name}</b>{profile.username && <em>{profile.username}</em>}<span>{profile.description}</span></span>{profile.external ? <ArrowUpRight className="social-entry-link" aria-hidden="true" /> : <Mail className="social-entry-link" aria-hidden="true" />}</a>; })}</div></>}
    {view === "assistant" && <div className="assistant-state"><Bot /><Label>KJ Assistant</Label><h2>Grounded portfolio guidance.</h2><p>{assistantKnowledge.unavailableMessage}</p><div>{assistantKnowledge.suggestedQuestions.map(question => <span key={question}>{question}</span>)}</div><a className="text-link focus-ring" href={`mailto:${siteConfig.email}`}><Mail /> Ask Kapil directly</a></div>}
  </Frame>;
}

export function PortfolioView({ view }: { view: View }) { return view==="home"?<Home/>:view==="about"?<About/>:view==="projects"?<Projects/>:view==="journey"?<Journey/>:view==="services"?<Services/>:view==="contact"?<Contact/>:view==="extras"?<ExtrasExplorer/>:<Secondary view={view}/>; }
