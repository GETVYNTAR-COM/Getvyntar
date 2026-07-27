"use client";
import React, { useState } from 'react';

const VyntarLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Free Visibility Audit Request - ${formData.businessName}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBusiness: ${formData.businessName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nWebsite: ${formData.website}`
    );
    window.location.href = `mailto:dave@vyntarseo.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-mono text-xl font-bold text-green-400">VYNTAR</div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#results" className="text-slate-300 hover:text-green-400 transition-colors">Results</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-green-400 transition-colors">How It Works</a>
              <a href="#contact" className="text-slate-300 hover:text-green-400 transition-colors">Contact</a>
              <a href="#contact"><button className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-md font-medium transition-colors">Get My Free Visibility Audit</button></a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-slate-100">More customers start with</span><br />
              <span className="text-green-400">being found on Google.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light">We help local businesses get found by the people already searching for them — so more customers find you, trust you, and choose you.</p>
            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">Make the Invisible Visible.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#contact"><button className="bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-green-500/20">Get My Free Visibility Audit</button></a>
              <a href="#results"><button className="border border-slate-600 hover:border-slate-400 text-slate-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-slate-800">See how Outback increased their visibility</button></a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof — Real Review */}
      <section className="py-16 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/60"></div>
            <div className="text-center">
              <div className="text-3xl mb-6">&#11088;&#11088;&#11088;&#11088;&#11088;</div>
              <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 italic">
                &ldquo;Dave at VYNTAR completely transformed our Google Business Profile. Before working with him, we simply weren&rsquo;t getting the visibility our business deserved. Now we&rsquo;re much easier to find on Google, our profile is performing far better, and we&rsquo;re seeing more enquiries coming through. I&rsquo;d happily recommend VYNTAR to any local business that wants to improve its visibility on Google.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-slate-400 font-medium">Jason Adams, Outback Garden Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results — Real Case Study */}
      <section id="results" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-6">Real Results</span>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">From almost invisible to hundreds of customer interactions</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">Outback Garden Design had 5 customer interactions in 6 months. Here&rsquo;s what changed.</p>
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12 max-w-4xl mx-auto">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500/60"></div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Before VYNTAR</p>
              <p className="text-5xl font-bold text-red-400 mb-2">5</p>
              <p className="text-slate-400">customer interactions in 6 months</p>
              <p className="text-xs text-slate-500 font-mono mt-4">June &ndash; October 2025</p>
            </div>
            <div className="bg-zinc-800 border border-green-500/50 rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500/60"></div>
              <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-4">After VYNTAR</p>
              <p className="text-5xl font-bold text-green-400 mb-2">40x</p>
              <p className="text-slate-300">more customer interactions</p>
              <p className="text-xs text-slate-500 font-mono mt-4">And still growing</p>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {[
              { value: '605', label: 'Profile views', detail: 'People finding the business on Google' },
              { value: '120%', label: 'Website visits up', detail: 'More visitors from search results' },
              { value: '100%', label: 'Directory coverage', detail: 'Listed on every key directory' },
              { value: '£0', label: 'Spent on advertising', detail: 'All growth from organic visibility' },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-center hover:border-green-500 transition-all duration-300">
                <p className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</p>
                <p className="text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Standout stat */}
          <div className="mt-12 text-center">
            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 max-w-2xl mx-auto hover:border-green-500 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-mono uppercase tracking-widest">Still performing</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">60&ndash;76 customer interactions every month</p>
              <p className="text-slate-400">Eight months on, the results are still going strong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-slate-100">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Scan', desc: 'We check where your business appears online and find out what\'s missing, broken, or holding you back from being found.' },
              { step: '2', title: 'Fix', desc: 'We get your business listed correctly across the directories and platforms that matter, so Google trusts your information.' },
              { step: '3', title: 'Measure', desc: 'You get clear numbers showing how many people are finding you, visiting your website, and getting in touch.' },
              { step: '4', title: 'Grow', desc: 'As your visibility improves, more local customers find you first instead of your competitors. No advertising spend required.' },
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

      {/* Final CTA / Contact Form */}
      <section id="contact" className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-100">Ready to stop losing customers you never knew you were missing?</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">Request your free visibility audit. We&rsquo;ll show you exactly where your business stands and what&rsquo;s holding you back.</p>
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
                    <label className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleFormChange} required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="Your business" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="you@yourbusiness.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone (optional)</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="07xxx xxxxxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Website (optional)</label>
                  <input type="url" name="website" value={formData.website} onChange={handleFormChange} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-slate-100 placeholder-slate-500" placeholder="https://yourbusiness.com" />
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg shadow-green-500/20">Get My Free Visibility Audit</button>
              </form>
            </div>
          ) : (
            <div className="bg-zinc-800 border border-green-500 rounded-2xl p-8 max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-slate-100">Request Received</h3>
              <p className="text-slate-300">We&rsquo;ll review your details and send your free visibility audit within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* Agency Section — Discreet */}
      <section className="py-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-400">Are you a marketing agency? We also licence the VYNTAR platform to selected agencies. <a href="/agency" className="text-green-400 hover:text-green-300 transition-colors font-medium">Learn more</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-mono text-xl font-bold text-green-400 mb-1">VYNTAR</h3>
          <p className="text-slate-500 text-sm font-mono mb-4">Local visibility, proven results.</p>
          <a href="mailto:dave@vyntarseo.com" className="text-green-400 hover:text-green-300 transition-colors text-sm font-mono inline-block mb-6">dave@vyntarseo.com</a>
          <div className="flex justify-center space-x-8 text-sm mt-6 pt-6 border-t border-zinc-800">
            <a href="#results" className="text-slate-400 hover:text-green-400 transition-colors">Results</a>
            <a href="#how-it-works" className="text-slate-400 hover:text-green-400 transition-colors">How It Works</a>
            <a href="#contact" className="text-slate-400 hover:text-green-400 transition-colors">Contact</a>
          </div>
          <p className="text-slate-600 text-xs mt-6 font-mono">&copy; 2026 VYNTAR Growth Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VyntarLanding;
