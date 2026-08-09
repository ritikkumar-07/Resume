import React from 'react';

const Section = ({ title, children }) => (
  <section className="resume-section">
    <h2 className="resume-section-title">{title}</h2>
    {children}
  </section>
);

const clean = (value) => String(value || '').trim();

export default function Minimal({ data = {} }) {
  const p = data.personal || {};
  const skills = data.skills || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const experience = data.experience || [];
  const positions = data.positions || [];
  const achievements = data.achievements || [];
  const links = data.links || {};

  return (
    <article className="resume-paper resume-minimal">
      <header className="resume-header">
        <h1>{clean(p.fullName) || 'YOUR NAME'}</h1>
        {clean(p.title) && <div className="resume-role">{p.title}</div>}
        <div className="resume-contact">
          {clean(p.email) && <span>{p.email}</span>}
          {clean(p.phone) && <span>{p.phone}</span>}
          {clean(p.location) && <span>{p.location}</span>}
        </div>
        <div className="resume-links">
          {clean(p.github) && <span>{p.github}</span>}
          {clean(p.linkedin) && <span>{p.linkedin}</span>}
          {clean(p.portfolio) && <span>{p.portfolio}</span>}
        </div>
      </header>

      {clean(p.summary) && <Section title="PROFESSIONAL SUMMARY"><p className="resume-paragraph">{p.summary}</p></Section>}

      {skills.length > 0 && <Section title="SKILLS">
        <div className="resume-skills">
          {skills.map((group, i) => (
            <div className="resume-skill-row" key={group.id || i}>
              <strong>{clean(group.category) || 'Skills'}:</strong>
              <span>{(group.items || []).filter(Boolean).join(', ')}</span>
            </div>
          ))}
        </div>
      </Section>}

      {education.length > 0 && <Section title="EDUCATION">
        <div className="resume-list">
          {education.map((item, i) => (
            <div className="resume-entry" key={item.id || i}>
              <div className="resume-entry-main">
                <strong>{clean(item.degree) || 'Degree / Qualification'}</strong>
                {clean(item.institution) && <span>{item.institution}</span>}
              </div>
              <div className="resume-entry-side">
                {(clean(item.startDate) || clean(item.endDate)) && <span>{item.startDate}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate}</span>}
                {clean(item.score) && <span>{item.score}</span>}
              </div>
            </div>
          ))}
        </div>
      </Section>}

      {projects.length > 0 && <Section title="ACADEMIC PROJECTS">
        <div className="resume-list">
          {projects.map((item, i) => (
            <div className="resume-project" key={item.id || i}>
              <div className="resume-entry-line">
                <strong>{clean(item.name) || 'Project Name'}</strong>
                {clean(item.date) && <span>{item.date}</span>}
              </div>
              {(item.technologies || []).filter(Boolean).length > 0 && <div className="resume-tech">{item.technologies.filter(Boolean).join(' · ')}</div>}
              {clean(item.description) && <p className="resume-bullets">{item.description}</p>}
              {(clean(item.github) || clean(item.liveDemo)) && (
                <div className="resume-project-links">
                  {clean(item.github) && <span>GitHub: {item.github}</span>}
                  {clean(item.liveDemo) && <span>Live: {item.liveDemo}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>}

      {experience.length > 0 && <Section title="EXPERIENCE">
        <div className="resume-list">
          {experience.map((item, i) => (
            <div className="resume-project" key={item.id || i}>
              <div className="resume-entry-line"><strong>{clean(item.title) || 'Role'}</strong><span>{item.startDate}{item.startDate && item.endDate ? ' – ' : ''}{item.endDate}</span></div>
              {clean(item.company) && <div className="resume-tech">{item.company}</div>}
              {clean(item.description) && <p className="resume-bullets">{item.description}</p>}
            </div>
          ))}
        </div>
      </Section>}

      {positions.length > 0 && <Section title="POSITION OF RESPONSIBILITY">
        <div className="resume-list">
          {positions.map((item, i) => (
            <div className="resume-project" key={item.id || i}>
              <div className="resume-entry-line"><strong>{clean(item.role) || 'Role'}</strong><span>{item.date}</span></div>
              {clean(item.organization) && <div className="resume-tech">{item.organization}</div>}
              {clean(item.description) && <p className="resume-bullets">{item.description}</p>}
            </div>
          ))}
        </div>
      </Section>}

      {achievements.length > 0 && <Section title="ACHIEVEMENTS / HOBBIES">
        <ul className="resume-bullet-list">
          {achievements.map((item, i) => <li key={item.id || i}><strong>{item.title}</strong>{clean(item.description) ? ` — ${item.description}` : ''}</li>)}
        </ul>
      </Section>}

      {(clean(links.github) || clean(links.linkedin) || clean(links.portfolio)) && <Section title="LINKS">
        <div className="resume-links-bottom">
          {clean(links.github) && <span>{links.github}</span>}
          {clean(links.linkedin) && <span>{links.linkedin}</span>}
          {clean(links.portfolio) && <span>{links.portfolio}</span>}
        </div>
      </Section>}
    </article>
  );
}
