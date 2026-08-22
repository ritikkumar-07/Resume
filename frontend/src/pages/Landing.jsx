// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FileText, Wand2, Layout, Download } from 'lucide-react';

// export default function Landing() {
//   return (
//     <div className="flex-grow flex flex-col items-center justify-center pt-16 pb-24 px-6 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cream-300/20 blur-[120px] rounded-full pointer-events-none" />

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="max-w-4xl text-center relative z-10"
//       >
//         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-200/50 text-cream-900 text-sm font-medium mb-8">
//           <Wand2 className="w-4 h-4 text-cream-800" />
//           <span>The next generation resume builder</span>
//         </div>
        
//         <h1 className="text-5xl md:text-7xl font-serif font-bold text-cream-900 tracking-tight leading-tight mb-6">
//           Build a Resume That <br className="hidden md:block" />
//           <span className="text-cream-800">Gets Noticed.</span>
//         </h1>
        
//         <p className="text-lg md:text-xl text-cream-800 max-w-2xl mx-auto mb-10 leading-relaxed">
//           Create professional, ATS-friendly resumes in minutes. Choose from elegant templates, customize your content, and download in PDF or editable Word format.
//         </p>
        
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <Link
//             to="/register"
//             className="w-full sm:w-auto px-8 py-4 bg-cream-900 text-[#1f1c1a] border border-[#2F2B28] rounded-xl font-medium text-lg hover:bg-cream-800 transition-all shadow-soft hover:shadow-lg flex items-center justify-center gap-2"
//           >
//             <FileText className="w-5 h-5" />
//             Create My Resume
//           </Link>

//           <Link
//             to="/templates"
//             className="w-full sm:w-auto px-8 py-4 bg-white text-cream-900 border border-cream-200 rounded-xl font-medium text-lg hover:bg-cream-50 transition-all shadow-sm flex items-center justify-center gap-2"
//           >
//             <Layout className="w-5 h-5" />
//             Explore Templates
//           </Link>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.3 }}
//         className="mt-20 w-full max-w-5xl"
//       >
//         <div className="bg-white p-2 rounded-2xl border border-cream-200 shadow-2xl relative">
//           <div className="absolute top-4 left-4 flex gap-2">
//             <div className="w-3 h-3 rounded-full bg-red-400"></div>
//             <div className="w-3 h-3 rounded-full bg-amber-400"></div>
//             <div className="w-3 h-3 rounded-full bg-green-400"></div>
//           </div>
//           <div className="bg-cream-50 mt-8 rounded-xl h-[500px] border border-cream-100 flex items-center justify-center">
//             <p className="text-cream-800 font-medium">Interactive Preview Mockup</p>
//           </div>
//         </div>
//       </motion.div>
      
//       <div className="max-w-6xl w-full mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
//         <div className="text-center p-6">
//           <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
//             <Layout className="w-8 h-8" />
//           </div>
//           <h3 className="text-xl font-bold mb-3 text-cream-900">Premium Templates</h3>
//           <p className="text-cream-800">Stand out with recruiter-approved designs that highlight your professional journey.</p>
//         </div>
//         <div className="text-center p-6">
//           <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
//             <Wand2 className="w-8 h-8" />
//           </div>
//           <h3 className="text-xl font-bold mb-3 text-cream-900">Live Editing</h3>
//           <p className="text-cream-800">See your changes instantly with our robust split-screen live preview editor.</p>
//         </div>
//         <div className="text-center p-6">
//           <div className="w-16 h-16 bg-cream-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-cream-900">
//             <Download className="w-8 h-8" />
//           </div>
//           <h3 className="text-xl font-bold mb-3 text-cream-900">Export Anywhere</h3>
//           <p className="text-cream-800">Download pixel-perfect PDFs or editable DOCX formats completely free.</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Wand2,
  Layout,
  Download,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Eye,
  PenLine,
  FileDown
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Layout,
      title: 'Professional Templates',
      description:
        'Choose clean, modern and recruiter-friendly resume designs.'
    },
    {
      icon: Wand2,
      title: 'Easy Customization',
      description:
        'Edit your information and see your resume update instantly.'
    },
    {
      icon: Download,
      title: 'Ready to Download',
      description:
        'Create a polished resume and export it when you are ready.'
    }
  ];

  return (
    <div className="overflow-hidden">

      {/* ================= HERO SECTION ================= */}

      <section className="relative px-6 pt-16 pb-24">

        {/* Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cream-300/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-cream-200 shadow-sm text-sm font-medium text-cream-900 mb-8">

              <Sparkles className="w-4 h-4" />

              <span>
                Build your professional resume in minutes
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-cream-900 tracking-tight leading-[1.05] mb-7">

              Build Your Resume.

              <br />

              <span className="text-cream-700">
                Build Your Future.
              </span>

            </h1>


            {/* Description */}

            <p className="text-lg md:text-xl text-cream-800 max-w-2xl mx-auto leading-relaxed mb-10">

              Create a professional, modern and ATS-friendly resume
              that helps you present your skills, experience and
              achievements with confidence.

            </p>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-[#2F2B28] text-white rounded-xl font-semibold text-lg hover:bg-black transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >

                <FileText className="w-5 h-5" />

                Create My Resume

                <ArrowRight className="w-5 h-5" />

              </Link>


              <Link
                to="/templates"
                className="w-full sm:w-auto px-8 py-4 bg-white text-cream-900 border border-cream-300 rounded-xl font-semibold text-lg hover:bg-cream-50 transition-all shadow-sm hover:-translate-y-1 flex items-center justify-center gap-2"
              >

                <Eye className="w-5 h-5" />

                Explore Templates

              </Link>

            </div>


            {/* Small trust text */}

            <div className="flex flex-wrap justify-center gap-5 mt-7 text-sm text-cream-700">

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                No design skills required
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Professional templates
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Easy to customize
              </div>

            </div>

          </motion.div>



          {/* ================= RESUME PREVIEW ================= */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-20 max-w-6xl mx-auto"
          >

            <div className="relative bg-white rounded-[28px] border border-cream-300 shadow-2xl p-3 md:p-5">

              {/* Browser top bar */}

              <div className="flex items-center gap-2 mb-4 px-2">

                <div className="w-3 h-3 rounded-full bg-red-400" />

                <div className="w-3 h-3 rounded-full bg-amber-400" />

                <div className="w-3 h-3 rounded-full bg-green-400" />

                <div className="flex-1 mx-4 h-9 bg-cream-100 rounded-lg hidden sm:flex items-center px-4">

                  <span className="text-xs text-cream-700">
                    ResumeBuilder — Live Resume Preview
                  </span>

                </div>

              </div>


              {/* Preview Area */}

              <div className="bg-cream-100 rounded-2xl p-5 md:p-10 min-h-[520px] flex items-center justify-center overflow-hidden">

                <div className="relative w-full max-w-[430px]">


                  {/* Floating edit card */}

                  <div className="hidden md:flex absolute -left-32 top-24 bg-white rounded-xl border border-cream-200 shadow-xl p-4 w-40 z-10 flex-col gap-2">

                    <div className="flex items-center gap-2 text-xs font-semibold text-cream-900">

                      <PenLine className="w-4 h-4" />

                      Live Editing

                    </div>

                    <div className="h-2 bg-cream-200 rounded w-full" />

                    <div className="h-2 bg-cream-200 rounded w-3/4" />

                    <div className="h-2 bg-cream-200 rounded w-5/6" />

                  </div>


                  {/* Floating download card */}

                  <div className="hidden md:flex absolute -right-32 bottom-20 bg-[#2F2B28] text-white rounded-xl shadow-xl p-4 w-40 z-10 flex-col gap-2">

                    <div className="flex items-center gap-2 text-xs font-semibold">

                      <FileDown className="w-4 h-4" />

                      Ready to Export

                    </div>

                    <span className="text-[10px] text-white/70">

                      Your professional resume is ready.

                    </span>

                  </div>


                  {/* Actual Resume */}

                  <div className="bg-white min-h-[540px] shadow-2xl border border-cream-300 rounded-sm overflow-hidden">

                    {/* Resume Header */}

                    <div className="bg-[#2F2B28] text-white px-8 py-8">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h2 className="text-3xl font-serif font-bold">

                            Hrithik Kumar

                          </h2>

                          <p className="text-white/70 text-sm mt-1">

                            Computer Science Student

                          </p>

                        </div>


                        <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center text-xl font-bold">

                          H

                        </div>

                      </div>


                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-white/75 mt-6">

                        <span>India</span>

                        <span>hrithik@email.com</span>

                        <span>+91 0000000000</span>

                      </div>

                    </div>


                    {/* Resume Content */}

                    <div className="p-8 space-y-7">


                      {/* Profile */}

                      <div>

                        <h3 className="text-xs font-bold tracking-[0.18em] text-[#2F2B28] mb-3">

                          PROFILE

                        </h3>

                        <p className="text-xs text-gray-600 leading-6">

                          Motivated computer science student passionate about
                          software development, problem solving and building
                          modern technology solutions.

                        </p>

                      </div>


                      {/* Education */}

                      <div>

                        <h3 className="text-xs font-bold tracking-[0.18em] text-[#2F2B28] mb-3">

                          EDUCATION

                        </h3>

                        <div className="flex justify-between gap-4">

                          <div>

                            <h4 className="text-sm font-bold text-gray-800">

                              Bachelor of Technology

                            </h4>

                            <p className="text-xs text-gray-500 mt-1">

                              Computer Science & Engineering

                            </p>

                          </div>

                          <span className="text-[10px] text-gray-500">

                            2025 — Present

                          </span>

                        </div>

                      </div>


                      {/* Skills */}

                      <div>

                        <h3 className="text-xs font-bold tracking-[0.18em] text-[#2F2B28] mb-3">

                          SKILLS

                        </h3>

                        <div className="flex flex-wrap gap-2">

                          {[
                            'C++',
                            'JavaScript',
                            'React',
                            'Node.js',
                            'MongoDB',
                            'Git'
                          ].map((skill) => (

                            <span
                              key={skill}
                              className="px-3 py-1.5 text-[10px] bg-cream-100 text-cream-900 rounded-md"
                            >

                              {skill}

                            </span>

                          ))}

                        </div>

                      </div>


                      {/* Projects */}

                      <div>

                        <h3 className="text-xs font-bold tracking-[0.18em] text-[#2F2B28] mb-3">

                          PROJECTS

                        </h3>

                        <div className="space-y-4">

                          <div>

                            <div className="flex justify-between">

                              <h4 className="text-sm font-bold text-gray-800">

                                Resume Builder

                              </h4>

                              <span className="text-[10px] text-gray-400">

                                2026

                              </span>

                            </div>

                            <p className="text-xs text-gray-500 mt-1 leading-5">

                              Developed a modern full-stack application for
                              creating professional resumes.

                            </p>

                          </div>


                          <div>

                            <h4 className="text-sm font-bold text-gray-800">

                              Smart Attendance System

                            </h4>

                            <p className="text-xs text-gray-500 mt-1">

                              Built an intelligent attendance solution using
                              modern technologies.

                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>



      {/* ================= FEATURES SECTION ================= */}

      <section className="border-y border-cream-200 bg-white px-6 py-24">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">

            <span className="text-sm font-semibold text-cream-700 uppercase tracking-widest">

              Everything you need

            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-900 mt-4">

              Create a resume with confidence.

            </h2>

            <p className="text-cream-800 mt-5 text-lg">

              A simple and professional workspace designed to help you
              focus on your experience instead of complicated formatting.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-cream-50 border border-cream-200 rounded-2xl p-8 hover:shadow-xl transition-all"
                >

                  <div className="w-14 h-14 bg-[#2F2B28] text-white rounded-2xl flex items-center justify-center mb-7">

                    <Icon className="w-7 h-7" />

                  </div>

                  <h3 className="text-xl font-bold text-cream-900 mb-3">

                    {feature.title}

                  </h3>

                  <p className="text-cream-800 leading-relaxed">

                    {feature.description}

                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>



      {/* ================= HOW IT WORKS ================= */}

      <section className="px-6 py-24">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream-900">

              From idea to resume in minutes.

            </h2>

            <p className="text-cream-800 mt-5 text-lg">

              Three simple steps to create your professional resume.

            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">

              <div className="w-16 h-16 rounded-full bg-[#2F2B28] text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">

                01

              </div>

              <h3 className="text-xl font-bold text-cream-900 mb-3">

                Create an Account

              </h3>

              <p className="text-cream-800">

                Sign up and access your personal resume workspace.

              </p>

            </div>


            <div className="text-center">

              <div className="w-16 h-16 rounded-full bg-[#2F2B28] text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">

                02

              </div>

              <h3 className="text-xl font-bold text-cream-900 mb-3">

                Build Your Resume

              </h3>

              <p className="text-cream-800">

                Add your education, skills, projects and experience.

              </p>

            </div>


            <div className="text-center">

              <div className="w-16 h-16 rounded-full bg-[#2F2B28] text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">

                03

              </div>

              <h3 className="text-xl font-bold text-cream-900 mb-3">

                Download & Apply

              </h3>

              <p className="text-cream-800">

                Review your resume and use it for your next opportunity.

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* ================= FINAL CTA ================= */}

      <section className="px-6 pb-24">

        <div className="max-w-6xl mx-auto bg-[#2F2B28] rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center text-white">

          <h2 className="text-4xl md:text-5xl font-serif font-bold">

            Ready to build your future?

          </h2>

          <p className="text-white/70 text-lg max-w-xl mx-auto mt-5">

            Create your professional resume today and take the next step
            toward your career goals.

          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-8 bg-white text-[#2F2B28] px-7 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
          >

            Start Building Now

            <ArrowRight className="w-5 h-5" />

          </Link>

        </div>

      </section>

    </div>
  );
}
