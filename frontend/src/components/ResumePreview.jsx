import React, { useLayoutEffect, useRef, useState } from "react";
import "./ResumePreview.css";

const ResumePreview = ({ resumeData }) => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);

  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const content = contentRef.current;

    if (!page || !content) return;

    let frame;

    const fitResume = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const availableHeight = page.clientHeight;
        const contentHeight = content.scrollHeight;

        if (!availableHeight || !contentHeight) return;

        const idealScale = availableHeight / contentHeight;

        /*
          1.00 = normal size
          >1   = content gets slightly larger
          <1   = content gets smaller
        */

        let newScale = idealScale;

        // Don't make a short resume ridiculously large
        newScale = Math.min(newScale, 1.18);

        // Don't make a long resume unreadably small
        newScale = Math.max(newScale, 0.76);

        // Small safety margin
        if (newScale > 1) {
          newScale *= 0.97;
        } else {
          newScale *= 0.985;
        }

        setScale(Number(newScale.toFixed(3)));
      });
    };

    fitResume();

    const resizeObserver = new ResizeObserver(fitResume);

    resizeObserver.observe(page);
    resizeObserver.observe(content);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [resumeData]);

  const {
    personal = {},
    summary = "",
    skills = [],
    education = [],
    projects = [],
    experience = [],
    achievements = [],
  } = resumeData || {};

  return (
    <div className="resume-preview-wrapper">
      <div
        ref={pageRef}
        className="resume-page"
        style={{
          "--resume-scale": scale,
        }}
      >
        <div ref={contentRef} className="resume-content">

          {/* HEADER */}
          <header className="resume-header">
            <h1>
              {personal.fullName || "Your Name"}
            </h1>

            {personal.title && (
              <div className="resume-title">
                {personal.title}
              </div>
            )}

            <div className="contact-line">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.location && <span>{personal.location}</span>}
            </div>

            <div className="contact-line">
              {personal.github && (
                <span>{personal.github}</span>
              )}

              {personal.linkedin && (
                <span>{personal.linkedin}</span>
              )}

              {personal.portfolio && (
                <span>{personal.portfolio}</span>
              )}
            </div>
          </header>

          {/* SUMMARY */}
          {summary && (
            <section className="resume-section">
              <h2>PROFESSIONAL SUMMARY</h2>

              <p className="summary-text">
                {summary}
              </p>
            </section>
          )}

          {/* SKILLS */}
          {skills?.length > 0 && (
            <section className="resume-section">
              <h2>SKILLS</h2>

              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div
                    className="skill-row"
                    key={skill.id || index}
                  >
                    <strong>
                      {skill.category || "Skills"}:
                    </strong>

                    <span>
                      {Array.isArray(skill.skills)
                        ? skill.skills.join(", ")
                        : skill.skills || skill.name || ""}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education?.length > 0 && (
            <section className="resume-section">
              <h2>EDUCATION</h2>

              {education.map((edu, index) => (
                <div
                  className="resume-entry"
                  key={edu.id || index}
                >
                  <div className="entry-top">
                    <strong>
                      {edu.degree || edu.qualification}
                    </strong>

                    <span>
                      {edu.startDate}{" "}
                      {edu.endDate && `– ${edu.endDate}`}
                    </span>
                  </div>

                  <div className="entry-bottom">
                    <span>
                      {edu.institution}
                    </span>

                    {edu.score && (
                      <strong>
                        {edu.score}
                      </strong>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <section className="resume-section">
              <h2>ACADEMIC PROJECTS</h2>

              {projects.map((project, index) => (
                <div
                  className="project-entry"
                  key={project.id || index}
                >
                  <div className="entry-top">
                    <strong>
                      {project.name || project.title}
                    </strong>

                    <span>
                      {project.date ||
                        project.year ||
                        ""}
                    </span>
                  </div>

                  {project.technologies && (
                    <div className="project-tech">
                      {Array.isArray(project.technologies)
                        ? project.technologies.join(" · ")
                        : project.technologies}
                    </div>
                  )}

                  {project.description && (
                    <p className="project-description">
                      {project.description}
                    </p>
                  )}

                  {(project.github ||
                    project.live) && (
                    <div className="project-links">
                      {project.github && (
                        <span>
                          GitHub: {project.github}
                        </span>
                      )}

                      {project.live && (
                        <span>
                          Live: {project.live}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* EXPERIENCE */}
          {experience?.length > 0 && (
            <section className="resume-section">
              <h2>EXPERIENCE</h2>

              {experience.map((item, index) => (
                <div
                  className="resume-entry"
                  key={item.id || index}
                >
                  <div className="entry-top">
                    <strong>
                      {item.position || item.role}
                    </strong>

                    <span>
                      {item.startDate}{" "}
                      {item.endDate &&
                        `– ${item.endDate}`}
                    </span>
                  </div>

                  <div className="entry-bottom">
                    <span>
                      {item.company}
                    </span>
                  </div>

                  {item.description && (
                    <p className="description">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* ACHIEVEMENTS */}
          {achievements?.length > 0 && (
            <section className="resume-section">
              <h2>ACHIEVEMENTS / ACTIVITIES</h2>

              {achievements.map((item, index) => (
                <div
                  className="achievement-entry"
                  key={item.id || index}
                >
                  <strong>
                    {item.title}
                  </strong>

                  {item.description && (
                    <span>
                      {" — "}
                      {item.description}
                    </span>
                  )}
                </div>
              ))}
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumePreview;