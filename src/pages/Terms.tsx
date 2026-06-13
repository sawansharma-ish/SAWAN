import React from "react";

export default function Terms() {
  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16 text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            Agency Charters & Terms
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed font-mono">
            UPDATED: JUNE 13, 2026 | STANDARD INDIAN HUB ENGAGEMENT PROTOCOLS
          </p>
        </div>

        {/* Content Pane */}
        <div className="bg-white border border-slate-100 p-8 sm:p-12 rounded-3xl shadow-sm space-y-8 text-sm leading-relaxed text-slate-700">
          <p className="text-base text-slate-900 font-medium">
            By accessing the digital portals, deploying interactive blueprint estimation wizards, or requesting custom business audit parameters from <strong>Aura Web Inc.</strong>, you agree to comply with and be bound by the following structural terms.
          </p>

          <hr className="border-slate-100" />

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">1. Services & Custom Strategy Proposals</h2>
            <p>
              All automated design specifications, pricing blueprints, Indian Rupee valuation ranges (INR ₹), and completion timeline suggestions presented across our marketing pages represent localized standards. These benchmarks are optimized specifically for NCR (Gurugram, Delhi, Noida), Mumbai, and metropolitan commerce hubs. Binding conditions, final cost outlines, and SLA deliverables are governed explicitly by physical agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">2. Client Cooperation & Information Veracity</h2>
            <p>
              To ensure optimal delivery speed, clients agree to cooperate in good faith by supplying accurate segment parameters, graphic material resources (logos, print media assets), and active mapping coordinates for any local SEO campaign or business location registry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">3. Full Application Code Ownership</h2>
            <p>
              Unless explicitly specified under a monthly support SLA model, our strategic web configurations are developed with completely modern front-end technologies with zero hidden proprietary licensing retainers. Full source-code and domain ownership transfer seamlessly to the buyer directly upon final invoice clearance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">4. Support, Inquiries, or Disputes</h2>
            <p>
              For immediate technical adjustments on active hosting setups, maps optimizations, or to modify your registered brand coordinates, please communicate directly with our sales helpdesk:
            </p>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-xs text-slate-600">
              <div>
                <span className="block text-slate-400 uppercase text-[10px] mb-1 font-bold">HELPLINE CONTACT</span>
                <a href="tel:+918929757028" className="text-violet-600 hover:underline font-bold">+91 89297 57028</a>
              </div>
              <div>
                <span className="block text-slate-400 uppercase text-[10px] mb-1 font-bold">TRANSMISSIONS PORT</span>
                <a href="mailto:sawanforwork@gmail.com" className="text-violet-600 hover:underline font-bold">sawanforwork@gmail.com</a>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900">5. Right to Terminate Platform Usage</h2>
            <p>
              Aura Agency preserves the right to temporarily freeze or permanently cancel platform access for users who repeatedly attempt malicious payload injection, automated form flooding, scanning scripts, or any other vector that compromises host resource performance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
