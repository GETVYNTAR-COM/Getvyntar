"use client";
import React, { useState } from 'react';
const VyntarSEOLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    agencyName: '',
    email: '',
    website: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Agency Access Request - ${formData.agencyName}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nAgency: ${formData.agencyName}\nEmail: ${formData.email}\nWebsite: ${formData.website}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:vyntar@vyntaraiagent.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans">
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-mono text-xl font-bold text-green-400">VYNTAR SEO Lead Engine</div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-slate-300 hover:text-green-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-green-400 transition-colors">How It Works</a>
              <a href="#contact" className="text-slate-300 hover:text-green-400 transition-colors">Contact</a>
              <button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-md font-medium transition-colors">Request Sample Leads</button>
            </div>
          </div>
        </div>
      </nav>
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-green-400">AI Lead Discovery</span><br />
              <span className="text-slate-100">for SEO Agencies</span>
            </h1>
            <p className="text-2xl text-slate-300 mb-6 font-light">We scan UK businesses for missing SEO signals and generate qualified outreach opportunities for agencies.</p>
            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">VYNTAR helps agencies identify businesses with obvious SEO gaps, enriches decision-maker data, and turns those opportunities into outreach-ready leads.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#contact"><button className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg">Request Sample Leads</button></a>
              <a href="#how-it-works"><button className="border border-slate-600 hover:border-slate-400 text-slate-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-slate-800">See How It Works</button></a>
            </div>
            <p className="text-sm text-slate-500 font-mono">Built for agency outreach • UK business data • Outreach-ready lead flow</p>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-100">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Business Discovery', desc: 'We scan UK businesses and detect visible SEO gaps such as missing citations and local signal weaknesses.' },
              { step: '2', title: 'Contact Enrichment', desc: 'We enrich the opportunity with decision-maker details including owner name, email, LinkedIn, and company info.' },
              { step: '3', title: 'Outreach-Ready Leads', desc: 'Agencies receive qualified opportunities that are ready to review, contact, and convert.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 h-full hover:border-green-500 transition-all duration-300">
                  <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-black">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-6">Live Feed Preview</span>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Recent SEO Opportunities Detected</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">We continuously scan UK businesses for visible SEO gaps and surface qualified opportunities for agency partners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { type: 'Dental Clinic', city: 'Manchester', score: 18, issue: 'Missing citations across key UK directories' },
              { type: 'Roofing Company', city: 'Leeds', score: 24, issue: 'Weak local visibility signals' },
              { type: 'Physio Clinic', city: 'Birmingham', score: 21, issue: 'Citation and local trust gaps' },
            ].map((card, i) => (
              <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/60"></div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Business Type</p>
                    <p className="text-lg font-semibold text-slate-100">{card.type}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-600 rounded-lg px-3 py-1.5 text-center">
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">City</p>
                    <p className="text-sm font-semibold text-green-400">{card.city}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">SEO Signal Score</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-red-400">{card.score}<span className="text-lg text-slate-500">/100</span></span>
                    <div className="flex-1 bg-zinc-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${card.score}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Issue Detected</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.issue}</p>
                </div>
                <div className="pt-4 border-t border-zinc-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500 font-mono">Contact data enriched</span>
                  </div>
                  <span className="text-xs text-slate-600 font-mono">🔒 Hidden</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6 text-lg">Want access to the full opportunity feed?</p>
            <a href="#contact"><button className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-green-500/20">Request Agency Access</button></a>
          </div>
        </div>
      </section>
      <section id="features" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-100">Why Agencies Care</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'More Qualified Prospects', desc: 'Focus on businesses with visible SEO problems instead of cold guessing.' },
              { title: 'Faster Outreach', desc: 'Get decision-maker data attached to each opportunity so your team can move quickly.' },
              { title: 'Better Conversations', desc: 'Lead with a real problem the business already has, not a generic pitch.' }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 h-full hover:border-green-500 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-4 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-slate-100">Currently Testing With a Small Number of Agencies</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">We're opening the system to a small number of agencies who want access to qualified SEO opportunities from the scans.</p>
          </div>
          {!isSubmitted ? (
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Agency Name</label>
                    <input type="text" name="agencyName" value={formData.agencyName} onChange={handleFormChange} required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="Your agency" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="your@agency.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                    <input type="url" name="website" value={formData.website} onChange={handleFormChange} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="https://youragency.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleFormChange} rows="4" className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500 resize-none" placeholder="Tell us about your agency and interest in qualified SEO leads..."></textarea>
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg">Submit Request</button>
              </form>
            </div>
          ) : (
            <div className="bg-zinc-800 border border-green-500 rounded-2xl p-8 max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-slate-100">Request Submitted</h3>
              <p className="text-slate-300">We'll review your request and get back to you within 24 hours with sample leads from your area.</p>
            </div>
          )}
        </div>
      </section>
      <footer className="border-t border-zinc-800 py-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-mono text-xl font-bold text-green-400 mb-1">VYNTAR SEO Lead Engine</h3>
          <p className="text-slate-500 text-sm font-mono mb-4">by VYNTAR Growth Solutions</p>
          <p className="text-slate-400 mb-2">AI lead discovery for agencies</p>
          <a href="mailto:vyntar@vyntaraiagent.com" className="text-green-400 hover:text-green-300 transition-colors text-sm font-mono inline-block mb-6">vyntar@vyntaraiagent.com</a>
          <div className="flex justify-center space-x-8 text-sm mt-6 pt-6 border-t border-zinc-800">
            <a href="#features" className="text-slate-400 hover:text-green-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-400 hover:text-green-400 transition-colors">How It Works</a>
            <a href="#contact" className="text-slate-400 hover:text-green-400 transition-colors">Contact</a>
          </div>
          <p className="text-slate-600 text-xs mt-6 font-mono">© 2026 VYNTAR Growth Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default VyntarSEOLanding;
