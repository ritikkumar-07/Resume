import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Download, Eye, FileText, GripVertical, Loader2, Plus, Save,
  Trash2, ChevronDown, ChevronUp, X
} from 'lucide-react';
// import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { useResumeStore } from '../store/resumeStore';
import Minimal from '../components/templates/Minimal';
import Executive from '../components/templates/Executive';
import ModernCreative from '../components/templates/ModernCreative';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const defaultData = {
  personal: { fullName: '', title: '', email: '', phone: '', location: '', summary: '', github: '', linkedin: '', portfolio: '' },
  skills: [],
  education: [],
  projects: [],
  experience: [],
  positions: [],
  achievements: [],
  links: { github: '', linkedin: '', portfolio: '' }
};

const newEducation = () => ({ id: uid(), degree: '', institution: '', score: '', startDate: '', endDate: '' });
const newProject = () => ({ id: uid(), name: '', technologies: [], description: '', github: '', liveDemo: '', date: '' });
const newExperience = () => ({ id: uid(), title: '', company: '', startDate: '', endDate: '', description: '' });
const newPosition = () => ({ id: uid(), role: '', organization: '', date: '', description: '' });
const newAchievement = () => ({ id: uid(), title: '', description: '' });
const newSkillGroup = () => ({
  id: uid(),
  category: '',
  items: []
});

function Input({
  label,
  value,
  onChange,
  onBlur = () => {},
  type = 'text',
  placeholder = ''
}) {
  return (
    <label className="builder-field">
      <span>{label}</span>

      <input
        type={type}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  onBlur = () => {},
  placeholder = '',
  rows = 4
}) {
  return (
    <label className="builder-field">
      <span>{label}</span>

      <textarea
        rows={rows}
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </label>
  );
}

function SectionCard({ title, count, children, onAdd, open, onToggle }) {
  return <section className="builder-card">
    <button type="button" className="builder-card-title" onClick={onToggle}>
      <span><strong>{title}</strong>{typeof count === 'number' && <em>{count}</em>}</span>
      {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
    {open && <div className="builder-card-body">{children}{onAdd && <button type="button" className="add-row" onClick={onAdd}><Plus size={16} /> Add {title.replace(/s$/, '')}</button>}</div>}
  </section>;
}

function ItemCard({ children, onDelete, onMoveUp, onMoveDown, first, last, title }) {
  return <div className="item-card">
    <div className="item-card-head">
      <div className="item-card-title"><GripVertical size={16} /><strong>{title}</strong></div>
      <div className="item-actions">
        <button type="button" onClick={onMoveUp} disabled={first}><ChevronUp size={15} /></button>
        <button type="button" onClick={onMoveDown} disabled={last}><ChevronDown size={15} /></button>
        <button type="button" className="danger" onClick={onDelete}><Trash2 size={15} /></button>
      </div>
    </div>
    {children}
  </div>;
}

function SectionHeading({ children }) { return <h3 className="field-heading">{children}</h3>; }

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, fetchResume, updateResume, isLoading, error } = useResumeStore();
  const [data, setData] = useState(defaultData);
  const [previewData, setPreviewData] = useState(defaultData);
  const [skillInputText, setSkillInputText] = useState({});
  const dataRef = useRef(defaultData);

  const [template, setTemplate] = useState('Minimal');
  const [activeTab, setActiveTab] = useState('edit');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [open, setOpen] = useState({ personal: true, skills: true, education: true, projects: true, experience: false, positions: false, achievements: false });
  const previewRef = useRef(null);

  useEffect(() => { if (id) fetchResume(id); }, [id, fetchResume]);

  useEffect(() => {
    if (!currentResume) return;

    const loadedTemplate = currentResume.template || 'Minimal';

    setTemplate(loadedTemplate);

    try {
      const parsed = currentResume.resumeData
        ? JSON.parse(currentResume.resumeData)
        : {};

      const loadedData = {
        ...defaultData,
        ...parsed,
        personal: {
          ...defaultData.personal,
          ...(parsed.personal || {})
        },
        links: {
          ...defaultData.links,
          ...(parsed.links || {})
        }
      };

      setData(loadedData);
      setPreviewData(loadedData);

      dataRef.current = loadedData;

    } catch {
      setData(defaultData);
      setPreviewData(defaultData);

      dataRef.current = defaultData;
    }

  } , [currentResume]);

const updateDraft = (updater) => {
  setData((prev) => {
    const next =
      typeof updater === 'function'
        ? updater(prev)
        : updater;

    dataRef.current = next;

    return next;
  });
};


const saveCurrentData = async (dataToSave = dataRef.current) => {
  if (!id || !currentResume) return;

  try {
    setSaveStatus('Saving...');

    await updateResume(id, {
      title:
        dataToSave.personal?.fullName ||
        'Untitled Resume',

      template,

      resumeData: dataToSave
    });

    setSaveStatus('Saved');

  } catch (error) {
    console.error('Save failed:', error);
    setSaveStatus('Save failed');
  }
};


const commitField = async () => {
  const latestData = dataRef.current;

  // Update resume preview
  setPreviewData(latestData);

  // Save only after leaving the input box
  await saveCurrentData(latestData);
};


const handlePreview = async () => {
  const latestData = dataRef.current;

  // Show complete current data
  setPreviewData(latestData);

  // Save complete resume once
  await saveCurrentData(latestData);

  // Open preview
  setActiveTab('preview');
};

  const updatePersonal = (field, value) => {
  updateDraft((d) => ({
    ...d,
    personal: {
      ...d.personal,
      [field]: value
    }
  }));
};
  const updateArray = (section, index, patch) => {
  updateDraft((d) => ({
    ...d,
    [section]: d[section].map((item, i) =>
      i === index
        ? { ...item, ...patch }
        : item
    )
  }));
};
  const removeArray = (section, index) => {
  updateDraft((d) => ({ ...d, [section]: d[section].filter((_, i) => i !== index) }));
};
const moveArray = (section, index, direction) => {
  updateDraft((d) => {
    const arr = [...d[section]];
    const next = index + direction;

    if (next < 0 || next >= arr.length) {
      return d;
    }

    [arr[index], arr[next]] = [
      arr[next],
      arr[index]
    ];

    return {
      ...d,
      [section]: arr
    };
  });
};
const addArray = (section, item) => {
  updateDraft((d) => ({
    ...d,
    [section]: [
      ...(d[section] || []),
      item()
    ]
  }));
};
const renderPreview = useMemo(() => {

  if (template === 'Executive') {
    return <Executive data={previewData} />;
  }

  if (template === 'ModernCreative') {
    return <ModernCreative data={previewData} />;
  }

  return <Minimal data={previewData} />;
}, [template, previewData]);

const downloadPDF = async () => {
  try {
    const element =
      previewRef.current?.querySelector('.resume-paper') ||
      previewRef.current;

    if (!element) {
      console.error('Resume preview not found');
      return;
    }

    const fileName =
      `${(data.personal?.fullName || 'Resume')
        .trim()
        .replace(/[^a-z0-9]+/gi, '_')
        .replace(/^_+|_+$/g, '') || 'Resume'}.pdf`;

    // High resolution render for razor-sharp text and icons (scale: 4 = ~400 DPI)
    const canvas = await html2canvas(element, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    // A4 dimensions in mm
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Add high-resolution crisp image (PNG for lossless text & icon sharpness)
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      A4_WIDTH,
      A4_HEIGHT,
      undefined,
      'FAST'
    );

    // Make all links clickable in the generated PDF
    const elementRect = element.getBoundingClientRect();
    const aTags = element.querySelectorAll('a[href]');

    const scaleX = A4_WIDTH / elementRect.width;
    const scaleY = A4_HEIGHT / elementRect.height;

    aTags.forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;

      const rect = a.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const linkX = (rect.left - elementRect.left) * scaleX;
      const linkY = (rect.top - elementRect.top) * scaleY;
      const linkW = rect.width * scaleX;
      const linkH = rect.height * scaleY;

      let targetUrl = href;
      if (
        !/^https?:\/\//i.test(targetUrl) &&
        !/^mailto:/i.test(targetUrl) &&
        !/^tel:/i.test(targetUrl)
      ) {
        targetUrl = `https://${targetUrl}`;
      }

      pdf.link(linkX, linkY, linkW, linkH, { url: targetUrl });
    });

    pdf.save(fileName);

  } catch (error) {
    console.error('PDF download failed:', error);
  }
};

const downloadDocx = async () => {
  try {
    const p = data.personal || {};
    const children = [];

    // =========================
    // HEADER
    // =========================

    children.push(
      new Paragraph({
        text: p.fullName || "YOUR NAME",
        heading: HeadingLevel.TITLE,
        alignment: "center",
      })
    );

    const contact = [
      p.email,
      p.phone,
      p.location,
      p.github,
      p.linkedin,
      p.portfolio,
    ]
      .filter(Boolean)
      .join(" | ");

    if (contact) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: contact,
              size: 18,
            }),
          ],
          alignment: "center",
        })
      );
    }

    // =========================
    // SECTION HELPER
    // =========================

    const addSection = (title, rows) => {
      if (!rows || rows.length === 0) return;

      children.push(
        new Paragraph({
          text: title,
          heading: HeadingLevel.HEADING_1,
        })
      );

      rows.forEach((row) => {
        if (row) {
          children.push(
            new Paragraph({
              text: String(row),
            })
          );
        }
      });
    };

    // =========================
    // SUMMARY
    // =========================

    if (p.summary) {
      addSection("PROFESSIONAL SUMMARY", [p.summary]);
    }

    // =========================
    // SKILLS
    // =========================

    addSection(
      "SKILLS",
      (data.skills || [])
        .map((s) => {
          const items = Array.isArray(s.items)
            ? s.items
            : Array.isArray(s.skills)
              ? s.skills
              : s.skills
                ? [s.skills]
                : [];

          return `${s.category || "Skills"}: ${items
            .filter(Boolean)
            .join(", ")}`;
        })
        .filter(Boolean)
    );

    // =========================
    // EDUCATION
    // =========================

    addSection(
      "EDUCATION",
      (data.education || [])
        .map((e) =>
          [
            e.degree,
            e.institution,
            e.score,
            [e.startDate, e.endDate]
              .filter(Boolean)
              .join(" – "),
          ]
            .filter(Boolean)
            .join(" | ")
        )
        .filter(Boolean)
    );

    // =========================
    // ACADEMIC PROJECTS
    // =========================

    addSection(
      "ACADEMIC PROJECTS",
      (data.projects || [])
        .map((x) => {
          const technologies = Array.isArray(x.technologies)
            ? x.technologies
                .filter(Boolean)
                .join(", ")
            : x.technologies || "";

          return [
            x.name,
            technologies,
            x.description,
            x.github,
            x.liveDemo,
          ]
            .filter(Boolean)
            .join(" | ");
        })
        .filter(Boolean)
    );

    // =========================
    // EXPERIENCE
    // =========================

    addSection(
      "EXPERIENCE",
      (data.experience || [])
        .map((x) =>
          [
            x.title,
            x.company,
            [x.startDate, x.endDate]
              .filter(Boolean)
              .join(" – "),
            x.description,
          ]
            .filter(Boolean)
            .join(" | ")
        )
        .filter(Boolean)
    );

    // =========================
    // POSITION OF RESPONSIBILITY
    // =========================

    addSection(
      "POSITION OF RESPONSIBILITY",
      (data.positions || [])
        .map((x) =>
          [
            x.role,
            x.organization,
            x.date,
            x.description,
          ]
            .filter(Boolean)
            .join(" | ")
        )
        .filter(Boolean)
    );

    // =========================
    // ACHIEVEMENTS
    // =========================

    addSection(
      "ACHIEVEMENTS / HOBBIES",
      (data.achievements || [])
        .map((x) =>
          [x.title, x.description]
            .filter(Boolean)
            .join(" — ")
        )
        .filter(Boolean)
    );

    // =========================
    // CREATE DOCX
    // =========================

    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const fileName =
      `${p.fullName || "Resume"}`
        .trim()
        .replace(/[^a-z0-9]+/gi, "_")
        .replace(/^_+|_+$/g, "") || "Resume";

    a.download = `${fileName}.docx`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("DOCX download failed:", error);
    alert("DOCX download failed. Check the browser console.");
  }
};

  if (isLoading || !data) return <div className="builder-loading"><Loader2 className="spin" /> Loading resume...</div>;
  if (error) return <div className="builder-loading error">{error}</div>;

  return <div className="builder-shell">
    <header className="builder-toolbar">
      <div className="toolbar-left"><button type="button" className="icon-button" onClick={() => navigate('/dashboard')}><ArrowLeft size={19} /></button><div><strong>{data.personal.fullName || 'Untitled Resume'}</strong><small><Save size={12} /> {saveStatus}</small></div></div>
      <div className="toolbar-center">
        <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Edit</button>
        <button
  type="button"
  className={activeTab === 'preview' ? 'active' : ''}
  onClick={handlePreview}
>
  <Eye size={15} />
  Preview
</button>
      </div>
      <div className="toolbar-right"><select value={template} onChange={(e) => setTemplate(e.target.value)}><option value="Minimal">Classic ATS</option><option value="Executive">Executive</option><option value="ModernCreative">Modern Creative</option></select><div className="download-group"><button type="button" className="primary-download"><Download size={16} /> Download</button><div className="download-menu"><button onClick={downloadPDF}><FileText size={15} /> PDF Document</button><button onClick={downloadDocx}><FileText size={15} /> Word Document</button></div></div></div>
    </header>

    <div className="builder-workspace">
      <aside className={`builder-editor ${activeTab === 'edit' ? 'mobile-visible' : ''}`}>
        <div className="editor-inner">
          <div className="editor-intro">
  <span>Resume details</span>
  <h1>Build your resume</h1>
  <p>
    Enter your details and move to the next field to update the preview.
    Click Preview when you're ready to review the complete resume.
  </p>
</div>

          <SectionCard title="Personal Information" open={open.personal} onToggle={() => setOpen(o => ({ ...o, personal: !o.personal }))}>
            <div className="field-grid two"><Input label="Full Name" value={data.personal.fullName} onChange={(v) => updatePersonal('fullName', v)} placeholder="Ritik Kumar" /><Input label="Professional Title" value={data.personal.title} onChange={(v) => updatePersonal('title', v)} placeholder="Software Developer" /><Input label="Email" value={data.personal.email} onChange={(v) => updatePersonal('email', v)} type="email" placeholder="you@example.com" /><Input label="Phone" value={data.personal.phone} onChange={(v) => updatePersonal('phone', v)} placeholder="+91 98765 43210" /><Input label="Location" value={data.personal.location} onChange={(v) => updatePersonal('location', v)} placeholder="Kolkata, India" /><Input label="GitHub" value={data.personal.github} onChange={(v) => updatePersonal('github', v)} placeholder="github.com/username" /><Input label="LinkedIn" value={data.personal.linkedin} onChange={(v) => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/username" /><Input label="Portfolio" value={data.personal.portfolio} onChange={(v) => updatePersonal('portfolio', v)} placeholder="yourportfolio.com" /></div><Textarea label="Professional Summary" value={data.personal.summary} onChange={(v) => updatePersonal('summary', v)} placeholder="2–4 lines about your professional profile, strengths and goals." />
          </SectionCard>

          <SectionCard
  title="Skills"
  count={data.skills.length}
  open={open.skills}
  onToggle={() => setOpen(o => ({ ...o, skills: !o.skills }))}
  onAdd={() => addArray('skills', newSkillGroup)}
>
  {data.skills.map((s, i) => (
    <ItemCard
      key={s.id || i}
      title={s.category || 'Skill category'}
      first={i === 0}
      last={i === data.skills.length - 1}
      onDelete={() => removeArray('skills', i)}
      onMoveUp={() => moveArray('skills', i, -1)}
      onMoveDown={() => moveArray('skills', i, 1)}
    >

      {/* Skill Category */}
      <Input
        label="Skill Category"
        value={s.category}
        onChange={(v) =>
          updateArray('skills', i, {
            category: v
          })
        }
        placeholder="Frontend"
      />

      {/* Skills */}
      <Input
        label="Skills (comma separated)"
        value={
          skillInputText[s.id] !== undefined
            ? skillInputText[s.id]
            : (s.items || []).join(', ')
        }
        onChange={(v) => {
          setSkillInputText((prev) => ({
            ...prev,
            [s.id]: v
          }));
        }}
        onBlur={() => {
          const text = skillInputText[s.id] ?? '';

          const items = text
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

          updateArray('skills', i, { items });
        }}
        placeholder="HTML5, CSS3, JavaScript, React.js"
      />

    </ItemCard>
  ))}
</SectionCard>

          <SectionCard title="Education" count={data.education.length} open={open.education} onToggle={() => setOpen(o => ({ ...o, education: !o.education }))} onAdd={() => addArray('education', newEducation)}>
            {data.education.map((e, i) => <ItemCard key={e.id || i} title={e.degree || 'Education'} first={i === 0} last={i === data.education.length - 1} onDelete={() => removeArray('education', i)} onMoveUp={() => moveArray('education', i, -1)} onMoveDown={() => moveArray('education', i, 1)}>
              <div className="field-grid two"><Input label="Degree / Qualification" value={e.degree} onChange={(v) => updateArray('education', i, { degree: v })} placeholder="B.Tech CSE" /><Input label="Institution" value={e.institution} onChange={(v) => updateArray('education', i, { institution: v })} placeholder="JIS College of Engineering" /><Input label="Score" value={e.score} onChange={(v) => updateArray('education', i, { score: v })} placeholder="SGPA: 8.9" /><Input label="Start" value={e.startDate} onChange={(v) => updateArray('education', i, { startDate: v })} placeholder="2025" /><Input label="End" value={e.endDate} onChange={(v) => updateArray('education', i, { endDate: v })} placeholder="2029" /></div>
            </ItemCard>)}
          </SectionCard>

          <SectionCard title="Academic Projects" count={data.projects.length} open={open.projects} onToggle={() => setOpen(o => ({ ...o, projects: !o.projects }))} onAdd={() => addArray('projects', newProject)}>
            {data.projects.map((x, i) => <ItemCard key={x.id || i} title={x.name || 'Project'} first={i === 0} last={i === data.projects.length - 1} onDelete={() => removeArray('projects', i)} onMoveUp={() => moveArray('projects', i, -1)} onMoveDown={() => moveArray('projects', i, 1)}>
              <div className="field-grid two"><Input label="Project Name" value={x.name} onChange={(v) => updateArray('projects', i, { name: v })} placeholder="TalkingRabbit-AI" /><Input label="Date" value={x.date} onChange={(v) => updateArray('projects', i, { date: v })} placeholder="2026" />
<Input
  label="Technologies (comma separated)"
  value={
    Array.isArray(x.technologies)
      ? x.technologies.join(', ')
      : x.technologies || ''
  }
  onChange={(v) =>
    updateArray('projects', i, {
      technologies: v
    })
  }
  placeholder="React.js, Node.js, MongoDB"
/>
              <Input label="GitHub URL" value={x.github} onChange={(v) => updateArray('projects', i, { github: v })} placeholder="github.com/username/project" /><Input label="Live Demo" value={x.liveDemo} onChange={(v) => updateArray('projects', i, { liveDemo: v })} placeholder="https://..." /></div><Textarea label="Project Description" value={x.description} onChange={(v) => updateArray('projects', i, { description: v })} placeholder="Describe what you built, key features and impact." />
            </ItemCard>)}
          </SectionCard>

          <SectionCard title="Experience" count={data.experience.length} open={open.experience} onToggle={() => setOpen(o => ({ ...o, experience: !o.experience }))} onAdd={() => addArray('experience', newExperience)}>
            {data.experience.map((x, i) => <ItemCard key={x.id || i} title={x.title || 'Experience'} first={i === 0} last={i === data.experience.length - 1} onDelete={() => removeArray('experience', i)} onMoveUp={() => moveArray('experience', i, -1)} onMoveDown={() => moveArray('experience', i, 1)}>
              <div className="field-grid two"><Input label="Job Title" value={x.title} onChange={(v) => updateArray('experience', i, { title: v })} placeholder="Software Developer Intern" /><Input label="Company" value={x.company} onChange={(v) => updateArray('experience', i, { company: v })} placeholder="Company Name" /><Input label="Start" value={x.startDate} onChange={(v) => updateArray('experience', i, { startDate: v })} placeholder="Jun 2026" /><Input label="End" value={x.endDate} onChange={(v) => updateArray('experience', i, { endDate: v })} placeholder="Aug 2026" /></div><Textarea label="Description" value={x.description} onChange={(v) => updateArray('experience', i, { description: v })} placeholder="Responsibilities, achievements and measurable impact." />
            </ItemCard>)}
          </SectionCard>

          <SectionCard title="Position of Responsibility" count={data.positions.length} open={open.positions} onToggle={() => setOpen(o => ({ ...o, positions: !o.positions }))} onAdd={() => addArray('positions', newPosition)}>
            {data.positions.map((x, i) => <ItemCard key={x.id || i} title={x.role || 'Position'} first={i === 0} last={i === data.positions.length - 1} onDelete={() => removeArray('positions', i)} onMoveUp={() => moveArray('positions', i, -1)} onMoveDown={() => moveArray('positions', i, 1)}>
              <div className="field-grid two"><Input label="Role" value={x.role} onChange={(v) => updateArray('positions', i, { role: v })} placeholder="Team Leader" /><Input label="Organization / Event" value={x.organization} onChange={(v) => updateArray('positions', i, { organization: v })} placeholder="Hackathon" /><Input label="Date" value={x.date} onChange={(v) => updateArray('positions', i, { date: v })} placeholder="July 2026" /></div><Textarea label="Description" value={x.description} onChange={(v) => updateArray('positions', i, { description: v })} placeholder="What did you organize, lead or accomplish?" />
            </ItemCard>)}
          </SectionCard>

        

          <SectionCard title="Achievements / Hobbies" count={data.achievements.length} open={open.achievements} onToggle={() => setOpen(o => ({ ...o, achievements: !o.achievements }))} onAdd={() => addArray('achievements', newAchievement)}>
            {data.achievements.map((x, i) => <ItemCard key={x.id || i} title={x.title || 'Achievement / Hobby'} first={i === 0} last={i === data.achievements.length - 1} onDelete={() => removeArray('achievements', i)} onMoveUp={() => moveArray('achievements', i, -1)} onMoveDown={() => moveArray('achievements', i, 1)}>
              <Input label="Title" value={x.title} onChange={(v) => updateArray('achievements', i, { title: v })} placeholder="Software Development & Coding" /><Textarea label="Description" value={x.description} onChange={(v) => updateArray('achievements', i, { description: v })} placeholder="Optional short explanation." rows={3} />
            </ItemCard>)}
          </SectionCard>
        </div>
      </aside>

      <main className={`builder-preview-area ${activeTab === 'preview' ? 'mobile-visible' : ''}`}><div className="preview-topline"><span><Eye size={15} /> Live preview</span><small>A4 · {template === 'Minimal' ? 'Classic ATS' : template}</small></div><div className="paper-frame"><div ref={previewRef}>{renderPreview}</div></div></main>
    </div>
  </div>;
}
