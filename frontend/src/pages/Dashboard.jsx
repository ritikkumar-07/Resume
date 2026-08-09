import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  FileText,
  MoreVertical,
  Copy,
  Trash2,
  Download,
  Loader2,
  Eye,
  Edit3
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useResumeStore } from '../store/resumeStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  const {
    resumes,
    fetchResumes,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    isLoading
  } = useResumeStore();
  const [menuOpen, setMenuOpen] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleCreate = async () => {
    setIsCreating(true);
    const newResume = await createResume('Untitled Resume', 'Minimal');
    setIsCreating(false);
    if (newResume) {
      navigate(`/builder/${newResume.id}`);
    }
  };

  const handleDuplicate = async (id) => {
    setMenuOpen(null);
    await duplicateResume(id);
  };

  const handleDelete = async (id) => {
    setMenuOpen(null);
    if (confirm('Are you sure you want to delete this resume?')) {
      await deleteResume(id);
    }
  };

  const handleView = (id) => {
  setMenuOpen(null);
  navigate(`/builder/${id}?view=true`);
};

const handleRename = async (resume) => {
  setMenuOpen(null);

  const newTitle = window.prompt(
    'Enter a new name for your resume:',
    resume.title
  );

  if (!newTitle) return;

  const trimmedTitle = newTitle.trim();

  if (!trimmedTitle) {
    alert('Resume name cannot be empty.');
    return;
  }

  if (trimmedTitle === resume.title) return;

  await useResumeStore.getState().updateResume(resume.id, {
    title: trimmedTitle
  });
};

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-6">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cream-900 mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p className="text-cream-800">You have {resumes.length} {resumes.length === 1 ? 'resume' : 'resumes'} in your workspace.</p>
        </div>
        <button 
          onClick={handleCreate} 
          disabled={isCreating}
          className="bg-[#2F2B28] text-white px-5 py-3 rounded-xl font-medium border border-[#2F2B28] hover:bg-black hover:border-black transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Create New Resume
        </button>
      </div>

      {isLoading && resumes.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-cream-800" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white border border-cream-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-cream-800" />
          </div>
          <h2 className="text-xl font-bold text-cream-900 mb-2">No resumes yet</h2>
          <p className="text-cream-800 max-w-md mx-auto mb-8">
            Create your first professional resume and start building your career story.
          </p>
          <button onClick={handleCreate} className="bg-[#2F2B28] text-white px-6 py-3 rounded-xl font-medium border border-[#2F2B28] hover:bg-black hover:border-black transition-colors">
            Create Your First Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <div
  key={resume.id}
  className="bg-white border border-cream-200 rounded-2xl overflow-visible shadow-sm hover:shadow-md transition-all relative group"
>
              <div 
                className="h-48 bg-cream-50 border-b border-cream-200 cursor-pointer flex items-center justify-center p-4 relative"
                onClick={() => navigate(`/builder/${resume.id}`)}
              >
                {/* Mini Preview Mock */}
                <div className="w-full h-full bg-white shadow-sm border border-cream-200 rounded p-3 overflow-hidden">
                   <div className="w-1/2 h-2 bg-cream-300 rounded mb-4 mx-auto"></div>
                   <div className="w-3/4 h-1.5 bg-cream-200 rounded mb-2"></div>
                   <div className="w-full h-1.5 bg-cream-200 rounded mb-2"></div>
                   <div className="w-5/6 h-1.5 bg-cream-200 rounded mb-2"></div>
                </div>
                
                <div className="absolute inset-0 bg-cream-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-cream-900 px-4 py-2 rounded-lg font-medium shadow-sm text-sm">Edit Resume</span>
                </div>
              </div>
              
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-cream-900 truncate pr-2">{resume.title}</h3>
                  <p className="text-xs text-cream-800 mt-1">Template: {resume.template}</p>
                  <p className="text-[10px] text-cream-500 mt-2">Edited {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpen(menuOpen === resume.id ? null : resume.id)}
                    className="p-1.5 text-cream-800 hover:bg-cream-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
{menuOpen === resume.id && (
  <div className="absolute right-0 top-10 w-44 bg-white border border-[#D8D2CC] rounded-xl shadow-xl z-50 py-1 overflow-hidden">

    {/* Edit */}
    <button
      onClick={() => {
        setMenuOpen(null);
        navigate(`/builder/${resume.id}`);
      }}
      className="w-full text-left px-4 py-2.5 text-sm text-[#1F1C1A] hover:bg-[#F5F1EA] flex items-center gap-3 transition-colors"
    >
      <Edit3 className="w-4 h-4" />
      <span>Edit</span>
    </button>

    {/* View */}
    <button
      onClick={() => handleView(resume.id)}
      className="w-full text-left px-4 py-2.5 text-sm text-[#1F1C1A] hover:bg-[#F5F1EA] flex items-center gap-3 transition-colors"
    >
      <Eye className="w-4 h-4" />
      <span>View</span>
    </button>

    {/* Rename */}
    <button
      onClick={() => handleRename(resume)}
      className="w-full text-left px-4 py-2.5 text-sm text-[#1F1C1A] hover:bg-[#F5F1EA] flex items-center gap-3 transition-colors"
    >
      <FileText className="w-4 h-4" />
      <span>Rename</span>
    </button>

    {/* Delete */}
    <button
      onClick={() => handleDelete(resume.id)}
      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 border-t border-[#E5E0DA] transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>

  </div>
)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}