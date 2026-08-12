import React from 'react';

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

      {/* HEADER */}
      <header className="modern-head">

        <div>

          <h1 className="resume-name">
            {clean(p.fullName) || 'YOUR NAME'}
          </h1>

          {clean(p.title) && (
            <p>{p.title}</p>
          )}

        </div>

        <div className="modern-contact">

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

          <ResumeLink value={p.github} />

          <ResumeLink value={p.linkedin} />

          <ResumeLink value={p.portfolio} />

        </div>

      </header>


      <div className="modern-grid">

        {/* LEFT */}
        <aside>

          {clean(p.summary) && (
            <section>

              <h2>PROFILE</h2>

              <p>{p.summary}</p>

            </section>
          )}


          {skills.length > 0 && (
            <section>

              <h2>SKILLS</h2>

              {skills.map((g, i) => (
                <div
                  className="modern-skill"
                  key={g.id || i}
                >

                  <strong>
                    {g.category}
                  </strong>

                  <p>
                    {(g.items || [])
                      .filter(Boolean)
                      .join(', ')}
                  </p>

                </div>
              ))}

            </section>
          )}


          {education.length > 0 && (
            <section>

              <h2>EDUCATION</h2>

              {education.map((e, i) => (
                <div
                  className="modern-side-entry"
                  key={e.id || i}
                >

                  <strong>
                    {e.degree}
                  </strong>

                  <span>
                    {e.institution}
                  </span>

                  <small>
                    {e.score}
                  </small>

                  <small>
                    {e.startDate}
                    {e.startDate && e.endDate
                      ? ' – '
                      : ''}
                    {e.endDate}
                  </small>

                </div>
              ))}

            </section>
          )}

        </aside>


        {/* RIGHT */}
        <main>

          {projects.length > 0 && (
            <section>

              <h2>PROJECTS</h2>

              {projects.map((x, i) => (
                <div
                  className="modern-main-entry"
                  key={x.id || i}
                >

                  <div className="modern-entry-title">

                    <strong>
                      {x.name}
                    </strong>

                    <span>
                      {x.date}
                    </span>

                  </div>

                  <small>
                    {(x.technologies || [])
                      .filter(Boolean)
                      .join(' · ')}
                  </small>

                  <p>
                    {x.description}
                  </p>

                  {(clean(x.github) ||
                    clean(x.liveDemo)) && (

                    <div className="resume-project-links">

                      {clean(x.github) && (
                        <span>
                          GitHub:{' '}
                          <ResumeLink
                            value={x.github}
                            label={x.github}
                          />
                        </span>
                      )}

                      {clean(x.liveDemo) && (
                        <span>
                          Live:{' '}
                          <ResumeLink
                            value={x.liveDemo}
                            label={x.liveDemo}
                          />
                        </span>
                      )}

                    </div>
                  )}

                </div>
              ))}

            </section>
          )}


          {experience.length > 0 && (
            <section>

              <h2>EXPERIENCE</h2>

              {experience.map((x, i) => (
                <div
                  className="modern-main-entry"
                  key={x.id || i}
                >

                  <div className="modern-entry-title">

                    <strong>
                      {x.title}
                    </strong>

                    <span>
                      {x.startDate}
                      {x.startDate && x.endDate
                        ? ' – '
                        : ''}
                      {x.endDate}
                    </span>

                  </div>

                  <small>
                    {x.company}
                  </small>

                  <p>
                    {x.description}
                  </p>

                </div>
              ))}

            </section>
          )}


          {positions.length > 0 && (
            <section>

              <h2>LEADERSHIP</h2>

              {positions.map((x, i) => (
                <div
                  className="modern-main-entry"
                  key={x.id || i}
                >

                  <div className="modern-entry-title">

                    <strong>
                      {x.role}
                    </strong>

                    <span>
                      {x.date}
                    </span>

                  </div>

                  <small>
                    {x.organization}
                  </small>

                  <p>
                    {x.description}
                  </p>

                </div>
              ))}

            </section>
          )}


          {achievements.length > 0 && (
            <section>

              <h2>ACHIEVEMENTS</h2>

              <ul>

                {achievements.map((x, i) => (
                  <li key={x.id || i}>

                    <strong>
                      {x.title}
                    </strong>

                    {clean(x.description)
                      ? ` — ${x.description}`
                      : ''}

                  </li>
                ))}

              </ul>

            </section>
          )}

        </main>

      </div>

    </article>
  );
}