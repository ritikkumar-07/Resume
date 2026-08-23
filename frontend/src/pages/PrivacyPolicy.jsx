import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-16 md:py-24">
      <div className="bg-white border border-cream-200 rounded-2xl shadow-sm p-6 md:p-12">

        <p className="text-sm font-medium text-cream-700 mb-3">
          LEGAL
        </p>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cream-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-cream-700 leading-relaxed mb-10">
          Last updated: August 23, 2026
        </p>

        <div className="space-y-10 text-cream-800 leading-relaxed">

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              1. Introduction
            </h2>

            <p>
              Welcome to ResumeBuilder. We respect your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, and protect information
              when you use our resume building platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              2. Information We Collect
            </h2>

            <p className="mb-3">
              We may collect information that you provide while using our
              services, including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name and account information</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Resume content and professional information</li>
              <li>Education, experience, and skills information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              3. How We Use Your Information
            </h2>

            <p className="mb-3">
              Your information may be used to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage your ResumeBuilder account</li>
              <li>Save and display your resumes</li>
              <li>Provide resume creation and editing features</li>
              <li>Improve the performance and functionality of our platform</li>
              <li>Maintain the security of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              4. Resume Content
            </h2>

            <p>
              ResumeBuilder stores the information that you enter into your
              resumes so that you can edit, manage, and access your documents.
              You remain responsible for the accuracy and content of the
              information included in your resume.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              5. Data Security
            </h2>

            <p>
              We take reasonable measures to protect your personal information
              and resume data. However, no method of storing or transmitting
              information over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              6. Third-Party Authentication
            </h2>

            <p>
              ResumeBuilder may allow users to sign in using third-party
              authentication services such as Google or Microsoft. These
              services may process your information according to their own
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-cream-900 mb-3">
              7. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy, you can contact
              us through the contact information available on ResumeBuilder.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}