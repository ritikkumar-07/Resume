import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, Loader2, Layout } from 'lucide-react';
import html2pdf from 'html2pdf.js';

import { useResumeStore } from '../store/resumeStore';

import Minimal from '../components/templates/Minimal';
import Executive from '../components/templates/Executive';
import ModernCreative from '../components/templates/ModernCreative';

export default function Builder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, fetchResume, updateResume, isLoading, error } = useResumeStore();
  
  const [activeTab, setActiveTab] = useState('edit'); // edit | preview (for mobile)
  const [saveStatus, setSaveStatus] = useState('Saved'); // Saving..., Saved, Error
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState('Minimal');
  
  const previewRef = useRef();

  useEffect(() => {
    if (id) fetchResume(id);
  }, [id, fetchResume]);

  useEffect(() => {
    if (currentResume) {
      setTemplate(currentResume.template || 'Minimal');
      try {
        const parsed = JSON.parse(currentResume.resumeData);
        if (Object.keys(parsed).length > 0) {
          setResumeData(parsed);
        } else {
          setResumeData(defaultData);
        }
      } catch (e) {
        setResumeData(defaultData);
      }
    }
  }, [currentResume]);

  // Debounced Autosave
  useEffect(() => {
    if (!resumeData || !currentResume) return;
    
    const handler = setTimeout(async () => {
      setSaveStatus('Saving...');
      await updateResume(id, { title: resumeData.personal?.fullName || 'Untitled', template, resumeData });
      setSaveStatus('Saved');
    }, 1500);

    return () => clearTimeout(handler);
  }, [resumeData, template]);

  const handleChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), defaultItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const downloadPDF = () => {
    const element = previewRef.current;
    if (!element) return;
    
    const opt = {
      margin: 0,
      filename: `${resumeData?.personal?.fullName?.replace(/\\s+/g, '_') || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const downloadDOCX = async () => {
    alert("DOCX generation will be implemented with docx library");
    // Implementation requires parsing data into docx instances
  };

  if (isLoading || !resumeData) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex-grow flex flex-col h-screen overflow-hidden bg-cream-50">
      {/* Builder Navbar */}
      <header className="h-16 border-b border-cream-200 bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-cream-800 hover:text-cream-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <h2 className="font-bold text-cream-900 text-sm truncate max-w-[200px]">{resumeData.personal?.fullName || 'Untitled'}</h2>
            <span className="text-xs text-cream-500 flex items-center gap-1">
              {saveStatus === 'Saving...' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              {saveStatus}
            </span>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-cream-100 rounded-lg p-1">
          <button onClick={() => setActiveTab('edit')} className={`px-4 py-1.5 text-xs font-medium rounded-md ${activeTab === 'edit' ? 'bg-white shadow-sm text-cream-900' : 'text-cream-800'}`}>Edit</button>
          <button onClick={() => setActiveTab('preview')} className={`px-4 py-1.5 text-xs font-medium rounded-md ${activeTab === 'preview' ? 'bg-white shadow-sm text-cream-900' : 'text-cream-800'}`}>Preview</button>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            className="text-xs border border-cream-200 rounded-lg px-2 py-2 bg-cream-50 outline-none"
          >
            <option value="Minimal">Minimal</option>
            <option value="Executive">Executive</option>
            <option value="ModernCreative">Modern Creative</option>
          </select>

          <div className="relative group">
            <button className="bg-cream-900 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cream-800">
              <Download className="w-4 h-4" /> Download
            </button>
            <div className="absolute right-0 top-10 mt-1 w-40 bg-white border border-cream-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-1 overflow-hidden">
              <button onClick={downloadPDF} className="text-left px-4 py-2 text-xs text-cream-900 hover:bg-cream-50">PDF Document (.pdf)</button>
              <button onClick={downloadDOCX} className="text-left px-4 py-2 text-xs text-cream-900 hover:bg-cream-50">Word Document (.docx)</button>
            </div>
          </div>
        </div>
      </header>

      {/* Split Pane */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* Editor Pane */}
        <div className={`w-full lg:w-1/2 lg:flex flex-col border-r border-cream-200 bg-white overflow-y-auto ${activeTab === 'edit' ? 'block' : 'hidden'}`}>
          <div className="p-6 max-w-2xl mx-auto w-full space-y-8 pb-32">
            
            {/* Personal Info */}
            <section>
              <h3 className="text-lg font-serif font-bold text-cream-900 mb-4 border-b border-cream-100 pb-2">Personal Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-cream-800 font-medium mb-1">Full Name</label>
                  <input type="text" value={resumeData.personal?.fullName || ''} onChange={(e) => handleChange('personal', 'fullName', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                </div>
                <div>
                  <label className="block text-cream-800 font-medium mb-1">Professional Title</label>
                  <input type="text" value={resumeData.personal?.title || ''} onChange={(e) => handleChange('personal', 'title', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cream-800 font-medium mb-1">Email</label>
                    <input type="email" value={resumeData.personal?.email || ''} onChange={(e) => handleChange('personal', 'email', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                  </div>
                  <div>
                    <label className="block text-cream-800 font-medium mb-1">Phone</label>
                    <input type="text" value={resumeData.personal?.phone || ''} onChange={(e) => handleChange('personal', 'phone', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                  </div>
                </div>
                <div>
                  <label className="block text-cream-800 font-medium mb-1">Location</label>
                  <input type="text" value={resumeData.personal?.location || ''} onChange={(e) => handleChange('personal', 'location', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                </div>
                <div>
                  <label className="block text-cream-800 font-medium mb-1">Professional Summary</label>
                  <textarea rows="4" value={resumeData.personal?.summary || ''} onChange={(e) => handleChange('personal', 'summary', e.target.value)} className="w-full border border-cream-200 rounded-lg px-3 py-2 bg-cream-50 outline-none focus:border-cream-800" />
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <div className="flex justify-between items-end mb-4 border-b border-cream-100 pb-2">
                <h3 className="text-lg font-serif font-bold text-cream-900">Work Experience</h3>
              </div>
              
              <div className="space-y-6">
                {(resumeData.experience || []).map((exp, index) => (
                  <div key={index} className="p-4 border border-cream-200 rounded-xl bg-cream-50/50 relative group">
                    <button onClick={() => removeArrayItem('experience', index)} className="absolute top-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:underline">Remove</button>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3 pr-10">
                      <div>
                        <label className="block text-cream-800 text-xs mb-1">Job Title</label>
                        <input type="text" value={exp.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} className="w-full border border-cream-200 rounded-lg px-2 py-1.5 bg-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-cream-800 text-xs mb-1">Company</label>
                        <input type="text" value={exp.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} className="w-full border border-cream-200 rounded-lg px-2 py-1.5 bg-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-cream-800 text-xs mb-1">Start Date</label>
                        <input type="text" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} className="w-full border border-cream-200 rounded-lg px-2 py-1.5 bg-white outline-none" placeholder="MM/YYYY" />
                      </div>
                      <div>
                        <label className="block text-cream-800 text-xs mb-1">End Date</label>
                        <input type="text" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} className="w-full border border-cream-200 rounded-lg px-2 py-1.5 bg-white outline-none" placeholder="Present or MM/YYYY" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-cream-800 text-xs mb-1">Description</label>
                      <textarea rows="3" value={exp.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} className="w-full border border-cream-200 rounded-lg px-2 py-1.5 bg-white outline-none text-sm" placeholder="Bullet points of your achievements..." />
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => addArrayItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
                  className="w-full py-2 border border-dashed border-cream-300 rounded-xl text-sm font-medium text-cream-800 hover:bg-cream-100 transition-colors"
                >
                  + Add Experience
                </button>
              </div>
            </section>
            
            {/* Education, Skills, etc. would go here following same pattern */}

          </div>
        </div>

        {/* Preview Pane */}
        <div className={`w-full lg:w-1/2 h-full bg-cream-200 overflow-y-auto lg:flex justify-center p-4 sm:p-8 ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
          <div ref={previewRef} className="bg-white shadow-2xl origin-top transition-all" style={{ width: '210mm', minHeight: '297mm' }}>
             {template === 'Minimal' && <Minimal data={resumeData} />}
             {template === 'Executive' && <Executive data={resumeData} />}
             {template === 'ModernCreative' && <ModernCreative data={resumeData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultData = {
  personal: {
    fullName: '', title: '', email: '', phone: '', location: '', summary: ''
  },
  experience: [],
  education: [],
  skills: []
};