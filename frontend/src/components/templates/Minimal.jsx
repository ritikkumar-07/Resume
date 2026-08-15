import React from 'react';

import {
  Github,
  Linkedin,
  Globe
} from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="resume-section">
    <h2 className="resume-section-title">{title}</h2>
    {children}
  </section>
);

const clean = (value) => String(value || '').trim();

const makeUrl = (value) => {
  const url = clean(value);

  if (!url) return '#';

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `https://${url}`;
};

const ResumeLink = ({ value, label }) => {
  if (!clean(value)) return null;

  return (
    <a
      href={makeUrl(value)}
      target="_blank"
      rel="noopener noreferrer"
      className="resume-link"
    >
      {label || value}
    </a>
  );
};

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

      {/* HEADER */}
      <header className="resume-header">

        <h1 className="resume-name">
          {clean(p.fullName) || 'YOUR NAME'}
        </h1>

        {clean(p.title) && (
          <div className="resume-role">
            {p.title}
          </div>
        )}

        <div className="resume-contact">

          {clean(p.email) && (
            <a
              href={`mailto:${p.email}`}
              className="resume-contact-link"
            >
              {p.email}
            </a>
          )}

          {clean(p.phone) && (
            <a
              href={`tel:${p.phone}`}
              className="resume-contact-link"
            >
              {p.phone}
            </a>
          )}

          {clean(p.location) && (
            <span>{p.location}</span>
          )}

        </div>

        <div className="resume-links">

          {clean(p.github) && (
            <a
              href={makeUrl(p.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social-link"
            >
              <Github size={14} className="resume-social-icon" />
              <span>{p.github}</span>
            </a>
          )}

          {clean(p.linkedin) && (
            <a
              href={makeUrl(p.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social-link"
            >
              <Linkedin size={14} className="resume-social-icon" />
              <span>{p.linkedin}</span>
            </a>
          )}

          {clean(p.portfolio) && (
            <a
              href={makeUrl(p.portfolio)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-social-link"
            >
              <Globe size={14} className="resume-social-icon" />
              <span>{p.portfolio}</span>
            </a>
          )}

        </div>

      </header>


      {/* SUMMARY */}
      {clean(p.summary) && (
        <Section title="PROFESSIONAL SUMMARY">
          <p className="resume-paragraph">
            {p.summary}
          </p>
        </Section>
      )}


      {/* SKILLS */}
      {skills.length > 0 && (
        <Section title="SKILLS">

          <div className="resume-skills">

            {skills.map((group, i) => (
              <div
                className="resume-skill-row"
                key={group.id || i}
              >
                <strong>
                  {clean(group.category) || 'Skills'}:
                </strong>

                <span>
                  {(group.items || [])
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            ))}

          </div>

        </Section>
      )}


      {/* EDUCATION */}
      {education.length > 0 && (
        <Section title="EDUCATION">

          <div className="resume-list">

            {education.map((item, i) => (
              <div
                className="resume-entry"
                key={item.id || i}
              >

                <div
                  className="resume-entry-top"
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '10px',
                  }}
                >
                  <strong>
                    {clean(item.degree) || 'Degree / Qualification'}
                  </strong>

                  {(clean(item.startDate) || clean(item.endDate)) && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        whiteSpace: 'nowrap',
                        textAlign: 'right',
                      }}
                    >
                      {item.startDate}
                      {item.startDate && item.endDate ? ' – ' : ''}
                      {item.endDate}
                    </span>
                  )}
                </div>

                <div
                  className="resume-entry-bottom"
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '10px',
                    marginTop: '0.12em',
                  }}
                >
                  {clean(item.institution) && (
                    <span>
                      {item.institution}
                    </span>
                  )}

                  {clean(item.score) && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        whiteSpace: 'nowrap',
                        textAlign: 'right',
                      }}
                    >
                      {item.score}
                    </span>
                  )}
                </div>

              </div>
            ))}

          </div>

        </Section>
      )}


      {/* PROJECTS */}
      {projects.length > 0 && (
        <Section title="ACADEMIC PROJECTS">

          <div className="resume-list">

            {projects.map((item, i) => (
              <div
                className="resume-project"
                key={item.id || i}
              >

                <div className="resume-entry-line">

                  <strong>
                    {clean(item.name) || 'Project Name'}
                  </strong>

                  {clean(item.date) && (
                    <span>{item.date}</span>
                  )}

                </div>

                {item.technologies && (
                  <div className="resume-tech">
                    {Array.isArray(item.technologies)
                      ? item.technologies.filter(Boolean).join(' · ')
                      : item.technologies}
                  </div>
                )}

                {clean(item.description) && (
                  <p className="resume-bullets">
                    {item.description}
                  </p>
                )}

                {(clean(item.github) ||
                  clean(item.liveDemo)) && (

                  <div className="resume-project-links">

                    {clean(item.github) && (
                      <span>
                        GitHub:{' '}
                        <ResumeLink
                          value={item.github}
                          label={item.github}
                        />
                      </span>
                    )}

                    {clean(item.liveDemo) && (
                      <span>
                        Live:{' '}
                        <ResumeLink
                          value={item.liveDemo}
                          label={item.liveDemo}
                        />
                      </span>
                    )}

                  </div>
                )}

              </div>
            ))}

          </div>

        </Section>
      )}


      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Section title="EXPERIENCE">

          <div className="resume-list">

            {experience.map((item, i) => (
              <div
                className="resume-project"
                key={item.id || i}
              >

                <div className="resume-entry-line">

                  <strong>
                    {clean(item.title) || 'Role'}
                  </strong>

                  <span>
                    {item.startDate}
                    {item.startDate && item.endDate
                      ? ' – '
                      : ''}
                    {item.endDate}
                  </span>

                </div>

                {clean(item.company) && (
                  <div className="resume-tech">
                    {item.company}
                  </div>
                )}

                {clean(item.description) && (
                  <p className="resume-bullets">
                    {item.description}
                  </p>
                )}

              </div>
            ))}

          </div>

        </Section>
      )}


      {/* POSITIONS */}
      {positions.length > 0 && (
        <Section title="POSITION OF RESPONSIBILITY">

          <div className="resume-list">

            {positions.map((item, i) => (
              <div
                className="resume-project"
                key={item.id || i}
              >

                <div className="resume-entry-line">

                  <strong>
                    {clean(item.role) || 'Role'}
                  </strong>

                  <span>{item.date}</span>

                </div>

                {clean(item.organization) && (
                  <div className="resume-tech">
                    {item.organization}
                  </div>
                )}

                {clean(item.description) && (
                  <p className="resume-bullets">
                    {item.description}
                  </p>
                )}

              </div>
            ))}

          </div>

        </Section>
      )}


      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <Section title="ACHIEVEMENTS / HOBBIES">

          <ul className="resume-bullet-list">

            {achievements.map((item, i) => (
              <li key={item.id || i}>

                <strong>
                  {item.title}
                </strong>

                {clean(item.description)
                  ? ` — ${item.description}`
                  : ''}

              </li>
            ))}

          </ul>

        </Section>
      )}


      {/* LINKS */}
      {(clean(links.github) ||
        clean(links.linkedin) ||
        clean(links.portfolio)) && (

        <Section title="LINKS">

          <div className="resume-links-bottom">

            <ResumeLink value={links.github} />

            <ResumeLink value={links.linkedin} />

            <ResumeLink value={links.portfolio} />

          </div>

        </Section>
      )}

    </article>
  );
}