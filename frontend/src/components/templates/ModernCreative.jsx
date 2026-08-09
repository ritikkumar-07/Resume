import React from 'react';

const clean = (value) => String(value || '').trim();

export default function ModernCreative({ data = {} }) {
  const p = data.personal || {};
  const skills = data.skills || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const experience = data.experience || [];
  const positions = data.positions || [];
  const achievements = data.achievements || [];

  return (
    <article className="resume-paper resume-modern">
      <header className="modern-head">
        <div>
          <h1>{clean(p.fullName) || 'YOUR NAME'}</h1>
          {clean(p.title) && <p>{p.title}</p>}
        </div>
        <div className="modern-contact">
          {clean(p.email) && <span>{p.email}</span>}
          {clean(p.phone) && <span>{p.phone}</span>}
          {clean(p.location) && <span>{p.location}</span>}
          {clean(p.github) && <span>{p.github}</span>}
          {clean(p.linkedin) && <span>{p.linkedin}</span>}
        </div>
      </header>

      <div className="modern-grid">
        <aside>
          {clean(p.summary) && <section><h2>PROFILE</h2><p>{p.summary}</p></section>}
          {skills.length > 0 && <section><h2>SKILLS</h2>{skills.map((g, i) => <div className="modern-skill" key={g.id || i}><strong>{g.category}</strong><p>{(g.items || []).filter(Boolean).join(', ')}</p></div>)}</section>}
          {education.length > 0 && <section><h2>EDUCATION</h2>{education.map((e, i) => <div className="modern-side-entry" key={e.id || i}><strong>{e.degree}</strong><span>{e.institution}</span><small>{e.score}</small><small>{e.startDate}{e.startDate && e.endDate ? ' – ' : ''}{e.endDate}</small></div>)}</section>}
        </aside>

        <main>
          {projects.length > 0 && <section><h2>PROJECTS</h2>{projects.map((x, i) => <div className="modern-main-entry" key={x.id || i}><div className="modern-entry-title"><strong>{x.name}</strong><span>{x.date}</span></div><small>{(x.technologies || []).filter(Boolean).join(' · ')}</small><p>{x.description}</p></div>)}</section>}
          {experience.length > 0 && <section><h2>EXPERIENCE</h2>{experience.map((x, i) => <div className="modern-main-entry" key={x.id || i}><div className="modern-entry-title"><strong>{x.title}</strong><span>{x.startDate}{x.startDate && x.endDate ? ' – ' : ''}{x.endDate}</span></div><small>{x.company}</small><p>{x.description}</p></div>)}</section>}
          {positions.length > 0 && <section><h2>LEADERSHIP</h2>{positions.map((x, i) => <div className="modern-main-entry" key={x.id || i}><div className="modern-entry-title"><strong>{x.role}</strong><span>{x.date}</span></div><small>{x.organization}</small><p>{x.description}</p></div>)}</section>}
          {achievements.length > 0 && <section><h2>ACHIEVEMENTS</h2><ul>{achievements.map((x, i) => <li key={x.id || i}><strong>{x.title}</strong>{clean(x.description) ? ` — ${x.description}` : ''}</li>)}</ul></section>}
        </main>
      </div>
    </article>
  );
}
