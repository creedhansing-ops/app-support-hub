import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function HomepageHeader() {
  useEffect(() => {
    // Focus search when clicking the dummy search bar
    const searchInput = document.getElementById('hero-search');
    if (searchInput) {
      searchInput.addEventListener('click', () => {
        // Find the native docusaurus search button and click it
        const docSearchButton = document.querySelector('.DocSearch-Button');
        if (docSearchButton) {
          docSearchButton.click();
        }
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-8 md:px-12 border-b border-outline-variant bg-surface-subtle">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h1 className="font-headline-xl text-4xl md:text-5xl text-on-background mb-4 font-bold tracking-tight">AppSupp Docs</h1>
        <p className="font-body-lg text-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          The central intelligence hub for Application Support Analysts. Access technical workflows, infrastructure maps, and troubleshooting guides in one unified portal.
        </p>

        {/* Search Container */}
        <div className="max-w-xl mx-auto relative group mt-8 cursor-pointer" id="hero-search">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            className="w-full h-14 pl-12 pr-20 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-body-md cursor-pointer" 
            placeholder="Search documentation (Cmd + K)" 
            type="text" 
            readOnly 
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-outline-variant bg-surface-container px-1.5 font-label-md text-[10px] text-on-surface-variant">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoGrid() {
  return (
    <section className="py-12 px-8 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Knowledge Base Card */}
        <Link to="/docs/knowledge-base/common-errors" className="group relative flex flex-col p-8 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 hover:no-underline">
          <div className="w-12 h-12 rounded-lg bg-secondary-container text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h3 className="font-headline-md text-2xl font-semibold text-on-background mb-2">Knowledge Base</h3>
          <p className="text-on-surface-variant font-body-md flex-grow">
            Deep dive into technical articles, issue resolutions, and historical support knowledge.
          </p>
          <div className="mt-6 flex items-center text-primary font-semibold">
            Explore Wiki <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </div>
        </Link>

        {/* Installation Guides Card */}
        <Link to="/docs/knowledge-base/installation-guide" className="group relative flex flex-col p-8 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 hover:no-underline">
          <div className="w-12 h-12 rounded-lg bg-secondary-container text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl">settings</span>
          </div>
          <h3 className="font-headline-md text-2xl font-semibold text-on-background mb-2">Installation Document</h3>
          <p className="text-on-surface-variant font-body-md flex-grow">
            Step-by-step procedures for client software deployment and environment setup.
          </p>
          <div className="mt-6 flex items-center text-primary font-semibold">
            View Guides <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </div>
        </Link>

        {/* Client Infrastructure Card */}
        <Link to="/docs/category/client-infrastructure" className="group relative flex flex-col p-8 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary hover:shadow-lg transition-all duration-300 hover:no-underline">
          <div className="w-12 h-12 rounded-lg bg-secondary-container text-primary flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-3xl">lan</span>
          </div>
          <h3 className="font-headline-md text-2xl font-semibold text-on-background mb-2">Client Infrastructure</h3>
          <p className="text-on-surface-variant font-body-md flex-grow">
            Architectural diagrams, server configurations, and networking topology details.
          </p>
          <div className="mt-6 flex items-center text-primary font-semibold">
            View Topology <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
          </div>
        </Link>

      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="py-12 px-8 md:px-12 bg-surface-container-low border-y border-outline-variant">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="font-headline-lg text-3xl font-semibold text-on-surface mb-4">Built for High-Pressure Environments</h2>
          <p className="text-body-lg text-lg text-on-surface-variant mb-8">
            Our documentation is designed to minimize Time-to-Resolution (TTR) by providing analysts with actionable data exactly when they need it.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-status-success">check_circle</span>
              <div>
                <span className="block font-bold">Real-time API References</span>
                <span className="text-on-surface-variant text-body-md">Always up-to-date documentation for every endpoint.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-status-success">check_circle</span>
              <div>
                <span className="block font-bold">Emergency Runbooks</span>
                <span className="text-on-surface-variant text-body-md">Critical paths for high-severity incident management.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="bg-surface p-6 rounded-xl border border-outline shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Documentation Pulse
              </h4>
              <span className="px-2 py-1 bg-status-success/10 text-status-success rounded text-xs font-medium">All Systems Operational</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-on-surface-variant mb-1 font-medium">
                  <span>Knowledge Base Coverage</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[94%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-on-surface-variant mb-1 font-medium">
                  <span>API Accuracy Rating</span>
                  <span>99.2%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-status-info h-full w-[99.2%]"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant">
                  <span className="text-xs text-on-surface-variant block font-medium uppercase tracking-wider">Recent Updates</span>
                  <span className="text-3xl font-bold block text-primary mt-1">124</span>
                </div>
                <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant">
                  <span className="text-xs text-on-surface-variant block font-medium uppercase tracking-wider">New Runbooks</span>
                  <span className="text-3xl font-bold block text-primary mt-1">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodePreviewSection() {
  return (
    <section className="py-16 px-8 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-headline-lg text-3xl font-semibold text-on-surface mb-2">Integrated API Docs</h2>
        <p className="text-on-surface-variant text-lg">Native code highlighting for multiple support environments.</p>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1D1D1D] group relative max-w-4xl mx-auto text-left">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
          </div>
          <span className="text-zinc-400 font-mono text-xs">troubleshoot_v2.sh</span>
          <button className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          <pre className="text-[#f8f8f2] m-0 bg-transparent p-0 border-0">
<span className="text-[#ff79c6]">#!/bin/bash</span>{'\n'}
<span className="text-[#6272a4]"># Infrastructure check script for support analysts</span>{'\n'}
{'\n'}
<span className="text-[#50fa7b]">check_status()</span> {'{\n'}
  <span className="text-[#8be9fd]">endpoint</span>=<span className="text-[#f1fa8c]">"$1"</span>{'\n'}
  <span className="text-[#ff79c6]">if</span> <span className="text-[#bd93f9]">curl</span> -s --head <span className="text-[#f1fa8c]">"$endpoint"</span> | <span className="text-[#bd93f9]">grep</span> <span className="text-[#f1fa8c]">"200 OK"</span> &gt; /dev/null; <span className="text-[#ff79c6]">then</span>{'\n'}
    <span className="text-[#bd93f9]">echo</span> <span className="text-[#f1fa8c]">"SUCCESS: $endpoint is reachable"</span>{'\n'}
  <span className="text-[#ff79c6]">else</span>{'\n'}
    <span className="text-[#bd93f9]">echo</span> <span className="text-[#ff5555]">"CRITICAL: $endpoint failed health check"</span>{'\n'}
  <span className="text-[#ff79c6]">fi</span>{'\n'}
{'}\n'}
{'\n'}
<span className="text-[#6272a4]"># Verify core services</span>{'\n'}
check_status <span className="text-[#f1fa8c]">"https://api.client-infrastructure.internal/v2/health"</span>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Dashboard"
      description="Application Support Documentation Hub">
      <main className="bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container">
        <HomepageHeader />
        <BentoGrid />
        <MetricsSection />
        <CodePreviewSection />
      </main>
    </Layout>
  );
}
