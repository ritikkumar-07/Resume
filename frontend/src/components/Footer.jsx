import React from 'react';
import {
  Mail,
  Phone,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FDFBF7] text-[#1F1C1A] border-t border-[#2F2B28]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:pr-8">

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2F2B28] text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                ResumeBuilder
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#514B47]">
              Build a professional resume that gets noticed.
              Create, customize and download your resume
              in a clean and professional format.
            </p>

            {/* Social Icons */}
            
          </div>


          {/* Product */}
          <div>
            <h3 className="text-base font-bold mb-5">
              Product
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/templates"
                  className="text-sm text-[#514B47] hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  Templates
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-[#514B47] hover:text-black transition-colors"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/builder"
                  className="text-sm text-[#514B47] hover:text-black transition-colors"
                >
                  Create Resume
                </Link>
              </li>

            </ul>
          </div>


          {/* Company */}
          <div>
            <h3 className="text-base font-bold mb-5">
              Company
            </h3>

            <ul className="space-y-4">

              <li>
                <a
                  href="/#about"
                  className="text-sm text-[#514B47] hover:text-black transition-colors"
                >
                  About
                </a>
              </li>

              <li>
                <Link
                  to="/career"
                  className="text-sm text-[#514B47] hover:text-black transition-colors"
                >
                  Career
                </Link>
              </li>

              <li>
                <a
                  href="/#contact"
                  className="text-sm text-[#514B47] hover:text-black transition-colors"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div>

            <h3 className="text-base font-bold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-xs uppercase tracking-wider text-[#77706A] mb-1">
                  Developer
                </p>

                <p className="text-sm font-semibold text-[#1F1C1A]">
                  Hrithik Kr Gupta
                </p>
              </div>


              {/* Phone */}
              <a
                href="tel:+916291089226"
                className="flex items-center gap-3 text-sm text-[#514B47] hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 6291089226</span>
              </a>


              {/* Email */}
              <a
                href="mailto:hritikkrgupta7746@gmail.com"
                className="flex items-center gap-3 text-sm text-[#514B47] hover:text-black transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>hritikkrgupta7746@gmail.com</span>
              </a>


              {/* GitHub */}
              <div className="flex items-center gap-3 mt-6">

              {/* GitHub */}
              <a
                href="https://github.com/ritikkumar-07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-[#2F2B28] flex items-center justify-center hover:bg-[#2F2B28] hover:text-white transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.35-3.87-1.35-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ritik-kumar-b56580411/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-[#2F2B28] flex items-center justify-center hover:bg-[#2F2B28] hover:text-white transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
                </svg>
              </a>

            </div>

            </div>

          </div>

        </div>


        {/* Bottom Divider */}
        <div className="mt-14 pt-6 border-t border-[#2F2B28]">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-[#514B47] text-center md:text-left">
              © {currentYear} ResumeBuilder. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <Link
                to="/privacy"
                className="text-sm text-[#514B47] hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-sm text-[#514B47] hover:text-black transition-colors"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}