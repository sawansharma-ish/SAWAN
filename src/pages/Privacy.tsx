import React from "react";

export default function Privacy() {
  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16 text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Regulatory Security Charter
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-mono">
            UPDATED: JUNE 13, 2026 | CLIENT INFRASTRUCTURE PROTECTION PROTOCOL
          </p>
        </div>

        {/* Content Pane */}
        <div className="bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-sm space-y-8 text-sm leading-relaxed text-slate-700">
          <p className="text-base text-slate-900 font-medium">
            At <strong>Aura Web Inc.</strong> (accessible via our digital agency platforms), client confidentiality, information integrity, and sovereign data handling form the bedrock of our high-ROI operational model.
          </p>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">1. Information We Capture and Store</h2>
            <p>
              We only capture and process individual identity indices that are actively and intentionally supplied by humans through our user input controls, specifically:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1.5 text-slate-650">
              <li><strong>Personal Contact Indices:</strong> Your Name, Registered Business Title, contact email addresses, and phone or WhatsApp line numbers.</li>
              <li><strong>Operational Specifications:</strong> Industry classifications, project target timelines, custom requirements, and localized design budget preferences.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">2. Secure Offline Storage & Persistence Sync</h2>
            <p>
              All customer transmissions are fully encrypted using standard transport protocols. To prevent transactional loss under high traffic or transient API downtime, records may fallback to a <strong>client-side local secure storage vault</strong> within your active browser sandbox. No telemetry records, sensitive indices, or contact histories are ever shared with third-party tracking conglomerates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">3. Diagnostic and Analytics Logging</h2>
            <p>
              Our custom performance and conversion diagnostic modules evaluate page benchmarks, regional speed indicators, and visual layout load times. This telemetry captures non-identifying metrics: general device classes, generic location zones within India metropolitan clusters (e.g. Gurugram, Delhi, Mumbai), and landing path duration times. This allows us to continuously optimize page scores.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">4. Your Right to Permanent Purging</h2>
            <p>
              You maintain absolute control over your digital coordinates and record registries. To coordinate a comprehensive and permanent purge of all lead captures, design blueprint requirements, or historic contact tickets, please communicate a clearance request to our systems administrator at:
            </p>
            <p className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl font-mono text-xs text-violet-600 block w-max">
              Email Helpline: <a href="mailto:sawanforwork@gmail.com" className="underline font-bold">sawanforwork@gmail.com</a>
            </p>
            <p>
              Your structural sweep will be confirmed and audited within 24 business hours from receipt of authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">5. Continuous Security Audits</h2>
            <p>
              Aura Agency enforces rigid structural firewalls across all cloud endpoints. We continually audit platform ports, server variables, and API request schemas to secure your business inquiries against unauthorized scanning or bot vectors. We do not use persistent commercial marketing tracking beacons on our static endpoints.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
