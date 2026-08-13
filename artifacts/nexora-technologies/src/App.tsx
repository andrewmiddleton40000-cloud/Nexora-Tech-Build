import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CircleCheck,
  Compass,
  Globe2,
  Layers3,
  Menu,
  MessageSquare,
  Minus,
  MonitorSmartphone,
  MoveUpRight,
  Network,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const CONTACT_CONFIG = {
  whatsapp: '[WhatsApp number to be configured]',
  phone: '[Phone number to be configured]',
  email: '[Email address to be configured]',
  instagram: '[Instagram handle to be configured]',
  linkedin: '[LinkedIn page to be configured]',
};

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
];

const serviceGroups = [
  {
    title: 'Web solutions',
    index: '01',
    description: 'Digital touchpoints that make your value clear and your business easier to choose.',
    icon: Globe2,
    items: ['Business Websites', 'Corporate Websites', 'E-commerce Platforms', 'Landing Pages', 'Web Applications', 'Customer Portals'],
  },
  {
    title: 'Mobile solutions',
    index: '02',
    description: 'Useful, focused mobile experiences for your customers and your internal teams.',
    icon: MonitorSmartphone,
    items: ['Mobile Applications', 'Customer Apps', 'Business Apps', 'Booking Applications'],
  },
  {
    title: 'Business technology',
    index: '03',
    description: 'Connected systems that bring the important parts of your operation into view.',
    icon: Network,
    items: ['Business Management Systems', 'Booking Systems', 'Customer Dashboards', 'Admin Dashboards', 'CRM Solutions', 'Payment Integrations', 'Custom Business Platforms'],
  },
  {
    title: 'AI & automation',
    index: '04',
    description: 'Practical intelligence and automation for work that should not stay repetitive.',
    icon: Bot,
    items: ['AI Chatbots', 'AI Assistants', 'Business Automation', 'AI-powered Applications', 'Workflow Automation'],
  },
  {
    title: 'Digital infrastructure',
    index: '05',
    description: 'The quiet, essential layer that keeps your digital presence dependable.',
    icon: ShieldCheck,
    items: ['Domain Setup', 'Hosting', 'Business Email', 'Website Maintenance', 'Analytics', 'SEO Infrastructure', 'Technical Support'],
  },
];

const solutions = [
  { question: 'Need more customers?', answer: 'Websites + SEO + conversion-focused landing pages.', icon: ArrowDownRight },
  { question: 'Need to sell online?', answer: 'E-commerce + payment integration + customer management.', icon: Layers3 },
  { question: 'Need to automate repetitive work?', answer: 'AI + automation + integrations.', icon: Zap },
  { question: 'Need customers to book appointments?', answer: 'Booking system + payments + notifications.', icon: Compass },
  { question: 'Need a custom business platform?', answer: 'Web application + dashboard + database + integrations.', icon: Settings2 },
];

const processSteps = [
  ['01', 'Discover', 'We understand your business, objectives, audience, and challenges.'],
  ['02', 'Strategize', 'We define the right technology and digital approach for your needs.'],
  ['03', 'Design', 'We create the user experience, interface, and solution architecture.'],
  ['04', 'Build', 'We develop, integrate, test, and refine the solution.'],
  ['05', 'Launch & Grow', 'We launch the solution and provide ongoing support, optimization, and improvements.'],
];

const projects = [
  { type: 'Concept Project', category: 'Business platform', title: 'Northstar Operations', description: 'A composed command centre concept for teams managing customers, work, and decisions in one place.', tech: ['React', 'Data systems'], color: 'blue' },
  { type: 'Concept Project', category: 'Digital commerce', title: 'Arc Supply Co.', description: 'A considered commerce experience showing how product discovery and operational clarity can share one system.', tech: ['E-commerce', 'Payments'], color: 'cyan' },
  { type: 'Concept Project', category: 'AI & automation', title: 'Signal Desk', description: 'A practical AI workspace concept for turning incoming requests into clear next actions.', tech: ['AI workflows', 'Integrations'], color: 'violet' },
];

function Mark({ light = false }: { light?: boolean }) {
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center" aria-label="Nexora N mark">
      <svg viewBox="0 0 38 38" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={light ? 'nexora-mark-light' : 'nexora-mark'} x1="3" y1="34" x2="35" y2="4">
            <stop offset="0" stopColor="#155EEF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path d="M7 31V7l24 24V7" fill="none" stroke={light ? 'url(#nexora-mark-light)' : 'url(#nexora-mark)'} strokeWidth="5.2" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    </span>
  );
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${footer ? 'text-white' : 'text-white'}`} data-testid={`link-${footer ? 'footer' : 'header'}-logo`}>
      <Mark light />
      <span className="font-display text-[15px] font-semibold tracking-[-0.03em]">Nexora <span className="font-normal text-slate-400">Technologies</span></span>
    </a>
  );
}

function ButtonLink({ children, href, variant = 'primary', testId }: { children: ReactNode; href: string; variant?: 'primary' | 'outline' | 'text'; testId: string }) {
  const classes = variant === 'primary'
    ? 'bg-[#155EEF] text-white hover:bg-[#2870ff] shadow-[0_8px_28px_rgba(21,94,239,.24)]'
    : variant === 'outline'
      ? 'border border-slate-600/80 bg-slate-950/15 text-slate-100 hover:border-cyan-300/70 hover:bg-slate-900/40'
      : 'text-slate-300 hover:text-cyan-300';
  return (
    <a href={href} className={`group inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1020] ${classes}`} data-testid={testId}>
      {children}
      {variant !== 'text' && <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy, dark = false }: { eyebrow: string; title: string; copy?: string; dark?: boolean }) {
  return (
    <div className={`max-w-2xl ${dark ? 'text-white' : ''}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[46px]">{title}</h2>
      {copy && <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400">{copy}</p>}
    </div>
  );
}

function AbstractHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] float-mark" aria-label="Abstract Nexora technology system visual" role="img">
      <div className="absolute inset-[9%] border border-slate-700/70 bg-slate-950/30" />
      <div className="absolute inset-[16%] border border-cyan-300/15" />
      <div className="absolute inset-[25%] rounded-full border border-blue-400/25" />
      <div className="absolute inset-[34%] rounded-full border border-cyan-300/25" />
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <defs><linearGradient id="hero-n" x1="22" y1="140" x2="138" y2="18"><stop offset="0" stopColor="#155EEF" /><stop offset="1" stopColor="#22D3EE" /></linearGradient></defs>
          <path d="M35 128V32l90 96V32" fill="none" stroke="url(#hero-n)" strokeWidth="14" strokeLinecap="square" />
          <path d="M35 32l90 96" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute left-[10%] top-[17%] flex items-center gap-2 font-mono-ui text-[9px] text-cyan-200/70"><span className="h-1.5 w-1.5 bg-cyan-300" />SYSTEMS / 01</div>
      <div className="absolute bottom-[16%] right-[7%] max-w-44 border border-slate-700/70 bg-[#0B1020]/85 p-3 backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between font-mono-ui text-[9px] text-slate-500"><span>ORBITAL VIEW</span><span className="text-cyan-300">LIVE</span></div>
        <div className="flex items-end gap-1.5"><span className="h-3 w-1 bg-blue-500" /><span className="h-6 w-1 bg-blue-500" /><span className="h-4 w-1 bg-cyan-300" /><span className="h-9 w-1 bg-cyan-300" /><span className="h-7 w-1 bg-blue-500" /><span className="h-11 w-1 bg-slate-500" /></div>
      </div>
      <div className="absolute left-[22%] top-1/2 h-px w-[56%] bg-cyan-300/20" />
      <div className="absolute left-1/2 top-[22%] h-[56%] w-px bg-cyan-300/20" />
      <div className="absolute left-[49%] top-[49%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_0_5px_rgba(34,211,238,.13)]" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-800/55 bg-[#0B1020]/84 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className="text-[12px] font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</a>)}
          <ButtonLink href="#consultation" testId="link-nav-consultation">Book a Consultation</ButtonLink>
        </nav>
        <button type="button" className="inline-flex h-10 w-10 items-center justify-center border border-slate-700 text-slate-100 lg:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-800/70 bg-[#0B1020] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-1">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-slate-800/60 py-3.5 text-sm text-slate-300" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</a>)}
            <a href="#consultation" onClick={() => setOpen(false)} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 bg-[#155EEF] px-5 text-sm font-semibold text-white" data-testid="link-mobile-consultation">Book a Consultation <ArrowRight size={15} /></a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[760px] border-b border-slate-800/60 pt-[72px]">
      <div className="grid-lines absolute inset-x-0 top-0 h-[690px] opacity-70" />
      <div className="absolute -right-32 top-16 h-[420px] w-[420px] rounded-full bg-blue-600/8 blur-3xl" />
      <div className="relative mx-auto grid min-h-[688px] max-w-[1240px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-10 lg:py-20">
        <div className="max-w-[680px]">
          <div className="reveal inline-flex items-center gap-2 border border-slate-700/80 bg-slate-900/45 px-3 py-2 font-mono-ui text-[10px] tracking-[.12em] text-slate-300"><span className="h-1.5 w-1.5 bg-cyan-300" /> DIGITAL PARTNER FOR AMBITIOUS OPERATORS</div>
          <h1 className="reveal reveal-delay-1 mt-7 max-w-[720px] font-display text-[clamp(3.1rem,8vw,6.5rem)] font-semibold leading-[.98] tracking-[-.075em] text-white">Digital Solutions.<br /><span className="text-gradient">Built for Growth.</span></h1>
          <p className="reveal reveal-delay-2 mt-7 max-w-[590px] text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">We turn ideas, business challenges, and opportunities into powerful digital solutions that help businesses operate smarter, connect better, and grow faster.</p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#consultation" testId="link-hero-consultation">Book a Consultation</ButtonLink>
            <ButtonLink href="#services" variant="outline" testId="link-hero-services">Explore Our Services</ButtonLink>
          </div>
          <div className="mt-14 flex items-center gap-5 text-[11px] text-slate-500">
            <span className="font-mono-ui text-cyan-300">NXR / 2026</span><span className="h-px w-10 bg-slate-700" /><span>Strategy · Design · Technology</span>
          </div>
        </div>
        <AbstractHeroVisual />
      </div>
      <a href="#services" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-ui text-[10px] tracking-[.18em] text-slate-500 transition-colors hover:text-cyan-300 md:flex" data-testid="link-scroll-services">SCROLL TO EXPLORE <ChevronDown size={14} /></a>
    </section>
  );
}

function IntroStrip() {
  return (
    <section className="border-b border-slate-800/60 bg-[#0d1428]">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-11 sm:px-8 md:grid-cols-[.7fr_1.3fr] md:items-center lg:px-10">
        <p className="eyebrow">A considered starting point</p>
        <p className="max-w-3xl font-display text-xl leading-relaxed tracking-[-.03em] text-slate-200 sm:text-2xl">Nexora does not simply sell websites or apps. We solve the business problem behind the brief, then build the right system around it.</p>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section id="services" className="section-anchor mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow="Capabilities" title="The right digital layer for the work ahead." copy="From a sharper public presence to a connected operating system, we bring strategic thinking and delivery into the same room." />
        <p className="max-w-[240px] font-mono-ui text-[10px] leading-5 text-slate-500">SELECT A CAPABILITY<br /><span className="text-cyan-300">TO SEE THE SYSTEM BEHIND IT</span></p>
      </div>
      <div className="mt-14 border-t border-slate-700/70">
        {serviceGroups.map((service, index) => {
          const Icon = service.icon;
          const isActive = active === index;
          return (
            <div key={service.title} className="border-b border-slate-700/70">
              <button type="button" onClick={() => setActive(isActive ? null : index)} className="group flex w-full items-center gap-4 py-5 text-left sm:gap-7 sm:py-7" aria-expanded={isActive} data-testid={`button-service-${service.index}`}>
                <span className="font-mono-ui text-[10px] text-cyan-300">{service.index}</span>
                <Icon size={21} strokeWidth={1.4} className="text-slate-400 transition-colors group-hover:text-cyan-300" />
                <span className="font-display text-xl font-medium tracking-[-.04em] text-slate-100 sm:text-2xl">{service.title}</span>
                <span className="ml-auto flex h-8 w-8 items-center justify-center border border-slate-700 text-slate-400 transition-colors group-hover:border-cyan-300/60 group-hover:text-cyan-300">{isActive ? <Minus size={15} /> : <ArrowDownRight size={15} />}</span>
              </button>
              {isActive && (
                <div className="grid gap-6 pb-8 pl-[52px] sm:grid-cols-[.7fr_1.3fr] sm:pl-[80px]">
                  <p className="max-w-xs text-sm leading-6 text-slate-400">{service.description}</p>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                    {service.items.map((item) => <a href="#consultation" key={item} className="group/item flex items-center gap-2 text-[13px] text-slate-300 hover:text-cyan-300" data-testid={`link-service-${item.toLowerCase().replaceAll(' ', '-')}`}><span className="h-1 w-1 bg-blue-500 transition-transform group-hover/item:scale-150" />{item}</a>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section-anchor border-y border-slate-800/60 bg-[#0d1428]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div><SectionHeading eyebrow="Business-first technology" title="Start with the friction. End with momentum." copy="Good technology feels obvious in hindsight. We map what is slowing your business down and create a solution people can actually use." /></div>
          <div className="border-t border-slate-700/70">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return <a href="#consultation" key={solution.question} className="group grid grid-cols-[35px_1fr_20px] items-center gap-4 border-b border-slate-700/70 py-6 transition-colors hover:bg-slate-800/20 sm:grid-cols-[42px_1fr_20px] sm:gap-6" data-testid={`link-solution-${index + 1}`}>
                <span className="font-mono-ui text-[10px] text-slate-600">0{index + 1}</span><span><span className="flex items-center gap-3 font-display text-base text-slate-100 sm:text-lg"><Icon size={16} className="text-cyan-300" />{solution.question}</span><span className="mt-2 block text-sm text-slate-400">{solution.answer}</span></span><ArrowRight size={16} className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300" />
              </a>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="process" className="section-anchor mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <SectionHeading eyebrow="Our process" title="Clear thinking. Deliberate progress." copy="The best work is not rushed into existence. It is shaped through a transparent process that keeps the business goal in view." />
      <div className="mt-14 grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div className="flex gap-2 lg:flex-col">
          {processSteps.map(([number, title], index) => <button type="button" key={number} onClick={() => setSelected(index)} className={`flex flex-1 items-center gap-3 border-t px-2 py-4 text-left transition-colors lg:justify-between lg:px-0 ${selected === index ? 'border-cyan-300 text-white' : 'border-slate-700/70 text-slate-500 hover:text-slate-200'}`} aria-current={selected === index ? 'step' : undefined} data-testid={`button-process-${number}`}><span className="font-mono-ui text-[10px]">{number}</span><span className="hidden font-display text-sm lg:block">{title}</span><span className={`h-1.5 w-1.5 ${selected === index ? 'bg-cyan-300' : 'bg-slate-700'}`} /></button>)}
        </div>
        <div className="relative min-h-[280px] border border-slate-700/70 bg-[#0d1428] p-7 sm:p-10">
          <div className="absolute right-6 top-6 font-mono-ui text-[10px] text-cyan-300">PHASE / {processSteps[selected][0]}</div>
          <div className="mt-12 max-w-xl">
            <h3 className="font-display text-3xl font-medium tracking-[-.05em] text-white sm:text-4xl">{processSteps[selected][1]}</h3>
            <p className="mt-5 text-base leading-7 text-slate-400">{processSteps[selected][2]}</p>
          </div>
          <div className="absolute bottom-7 right-8 flex items-center gap-2 text-[10px] text-slate-600"><span className="h-px w-10 bg-slate-700" /> NEXORA / METHOD</div>
        </div>
      </div>
    </section>
  );
}

function PortfolioVisual({ color }: { color: string }) {
  return (
    <div className={`relative h-56 overflow-hidden border-b border-slate-700/80 ${color === 'cyan' ? 'bg-[#0b2835]' : color === 'violet' ? 'bg-[#18203c]' : 'bg-[#102456]'}`}>
      <div className="absolute inset-5 border border-white/10 bg-[#0B1020]/45 p-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="font-mono-ui text-[8px] text-slate-400">NEXORA / CONCEPT</span><span className="h-1.5 w-1.5 bg-cyan-300" /></div>
        <div className="mt-5 grid grid-cols-[.8fr_1.2fr] gap-3"><div><div className="h-2 w-16 bg-white/20" /><div className="mt-3 h-1.5 w-24 bg-white/10" /><div className="mt-1.5 h-1.5 w-20 bg-white/10" /></div><div className="grid grid-cols-3 items-end gap-2">{[30, 50, 40, 68, 54, 76].map((height, index) => <span key={index} className={`h-${height} min-h-[24px] ${index % 2 ? 'bg-cyan-300/70' : 'bg-blue-500/60'}`} style={{ height: `${height}%` }} />)}</div></div>
      </div>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/10" />
    </div>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="section-anchor border-y border-slate-800/60 bg-[#0d1428]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><SectionHeading eyebrow="Selected direction" title="A glimpse of what we could build together." copy="These are concept projects: visual studies of how thoughtful systems can make a business clearer, faster, and easier to engage with. Real client work will be added here as it launches." /><span className="font-mono-ui text-[10px] text-slate-500">ARCHIVE / OPEN FOR NEW WORK</span></div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => <article key={project.title} className="group border border-slate-700/70 bg-[#0B1020] transition-transform duration-300 hover:-translate-y-1" data-testid={`card-project-${index + 1}`}>
            <PortfolioVisual color={project.color} />
            <div className="p-6"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-semibold uppercase tracking-[.14em] text-cyan-300">{project.type}</span><span className="font-mono-ui text-[10px] text-slate-600">0{index + 1}</span></div><p className="mt-4 text-[11px] uppercase tracking-[.12em] text-slate-500">{project.category}</p><h3 className="mt-2 font-display text-xl tracking-[-.04em] text-white">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="border border-slate-700 px-2 py-1 font-mono-ui text-[9px] text-slate-500">{tech}</span>)}</div><a href="#consultation" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-200 transition-colors hover:text-cyan-300" data-testid={`link-view-project-${index + 1}`}>Discuss a similar direction <MoveUpRight size={14} /></a></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-anchor mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <SectionHeading eyebrow="About Nexora" title="Technology should solve problems, not create them." />
        <div>
          <p className="text-lg leading-8 text-slate-200">Nexora combines strategy, design, development, automation, and technology to help businesses create practical digital solutions.</p>
          <p className="mt-6 text-sm leading-7 text-slate-400">We are building a technology consultancy for serious business owners, entrepreneurs, professionals, and organizations who need more than a surface-level digital presence. The work starts with understanding what matters, then choosing the simplest powerful way forward.</p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 border-t border-slate-700/70 pt-7 sm:grid-cols-3"><div><p className="font-display text-sm text-white">Business-aware</p><p className="mt-2 text-xs leading-5 text-slate-500">Technology tied to an actual objective.</p></div><div><p className="font-display text-sm text-white">Built to adapt</p><p className="mt-2 text-xs leading-5 text-slate-500">A foundation for what comes next.</p></div><div className="mt-6 sm:mt-0"><p className="font-display text-sm text-white">Human by design</p><p className="mt-2 text-xs leading-5 text-slate-500">Clear interfaces people want to use.</p></div></div>
        </div>
      </div>
    </section>
  );
}

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const serviceOptions = ['Website', 'Web Application', 'Mobile Application', 'E-commerce', 'Business System', 'AI Solution', 'Automation', 'Other'];
  const toggleService = (service: string) => setSelectedServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedServices.length === 0) return;
    setSubmitted(true);
  };
  return (
    <div className="border border-slate-700/80 bg-[#0d1428] p-5 sm:p-8 lg:p-10">
      {submitted ? (
        <div className="flex min-h-[520px] flex-col justify-center" role="status" data-testid="status-consultation-success">
          <div className="flex h-12 w-12 items-center justify-center border border-cyan-300/40 bg-cyan-300/10 text-cyan-300"><CircleCheck size={24} /></div>
          <p className="eyebrow mt-8">Request prepared locally</p><h3 className="mt-3 max-w-md font-display text-3xl tracking-[-.05em] text-white">Thank you for telling us where you want to go.</h3><p className="mt-5 max-w-md text-sm leading-7 text-slate-400">This demonstration form is not connected to a backend yet. Your information has not been sent. Connect the form to your preferred email, WhatsApp, CRM, or API before launch.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 inline-flex w-fit items-center gap-2 border border-slate-600 px-4 py-3 text-xs font-semibold text-slate-200 hover:border-cyan-300/60" data-testid="button-edit-consultation">Edit request <ArrowRight size={14} /></button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-7" noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Full Name <span className="text-cyan-300">*</span></span><input required name="fullName" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300" placeholder="Your name" data-testid="input-full-name" /></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Business / Organization <span className="text-cyan-300">*</span></span><input required name="organization" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300" placeholder="Organization name" data-testid="input-organization" /></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Email <span className="text-cyan-300">*</span></span><input required type="email" name="email" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" placeholder="you@company.com" data-testid="input-email" /></label>
            <label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">WhatsApp / Phone</span><input name="phone" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" placeholder="Preferred contact number" data-testid="input-phone" /></label>
          </div>
          <fieldset><legend className="mb-3 text-xs font-medium text-slate-300">What do you need? <span className="text-cyan-300">*</span></legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{serviceOptions.map((service) => { const checked = selectedServices.includes(service); return <button type="button" key={service} onClick={() => toggleService(service)} className={`flex min-h-10 items-center justify-between border px-3 text-left text-[11px] transition-colors ${checked ? 'border-cyan-300/70 bg-cyan-300/10 text-cyan-100' : 'border-slate-700 bg-[#0B1020] text-slate-400 hover:border-slate-500'}`} aria-pressed={checked} data-testid={`button-service-option-${service.toLowerCase().replaceAll(' ', '-')}`}>{service}{checked && <Check size={13} />}</button>; })}</div>{selectedServices.length === 0 && <p className="mt-2 text-[11px] text-slate-500">Select at least one area to continue.</p>}</fieldset>
          <label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Tell us about your project <span className="text-cyan-300">*</span></span><textarea required name="project" rows={5} className="w-full resize-y border border-slate-700 bg-[#0B1020] p-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" placeholder="What are you trying to achieve, improve, or make possible?" data-testid="input-project" /></label>
          <div className="grid gap-6 sm:grid-cols-2"><label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Current website, if any</span><input name="website" type="url" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300" placeholder="https://" data-testid="input-website" /></label><label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Preferred timeline</span><select name="timeline" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none focus:border-cyan-300" defaultValue="" data-testid="select-timeline"><option value="" disabled>Select a timeline</option><option>Exploring options</option><option>Within the next 1–3 months</option><option>Within 3–6 months</option><option>Timeline to be determined</option></select></label><label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">Budget range</span><select name="budget" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none focus:border-cyan-300" defaultValue="" data-testid="select-budget"><option value="" disabled>Select a range</option><option>To be discussed</option><option>Under consideration</option><option>Defined internally</option></select></label><label className="block"><span className="mb-2 block text-xs font-medium text-slate-300">How did you hear about Nexora?</span><select name="source" className="h-12 w-full border border-slate-700 bg-[#0B1020] px-3 text-sm text-white outline-none focus:border-cyan-300" defaultValue="" data-testid="select-source"><option value="" disabled>Select an option</option><option>Referral</option><option>Search</option><option>Social media</option><option>Other</option></select></label></div>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-slate-700/70 pt-6 sm:flex-row sm:items-center"><p className="max-w-sm text-[11px] leading-5 text-slate-500">This form is currently a local demonstration. No information is transmitted until a contact integration is configured.</p><button type="submit" className="inline-flex min-h-12 items-center gap-2 bg-[#155EEF] px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(21,94,239,.2)] transition-colors hover:bg-[#2870ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" data-testid="button-submit-consultation">Request a Consultation <Send size={15} /></button></div>
        </form>
      )}
    </div>
  );
}

function Consultation() {
  return (
    <section id="consultation" className="section-anchor border-y border-slate-800/60 bg-[#102456]">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div><p className="eyebrow">Start a conversation</p><h2 className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-[-.06em] text-white sm:text-5xl">Let's build something that moves your business forward.</h2><p className="mt-6 max-w-md text-[15px] leading-7 text-blue-100/70">Tell us what you're trying to achieve and we'll help you determine the right digital solution.</p><div className="mt-10 flex items-center gap-3 text-xs text-blue-100/65"><MessageSquare size={16} className="text-cyan-300" /> Clear brief. Thoughtful next step.</div></div>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contactRows = [['WhatsApp', CONTACT_CONFIG.whatsapp], ['Phone', CONTACT_CONFIG.phone], ['Email', CONTACT_CONFIG.email], ['Instagram', CONTACT_CONFIG.instagram], ['LinkedIn', CONTACT_CONFIG.linkedin]];
  return (
    <section id="contact" className="section-anchor mx-auto max-w-[1240px] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">Contact</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] text-white sm:text-5xl">Have a meaningful problem to solve?</h2><p className="mt-6 max-w-md text-sm leading-7 text-slate-400">Start with a conversation. We will help you make sense of the opportunity, the right technology, and a sensible next move.</p><ButtonLink href="#consultation" testId="link-contact-consultation">Tell Us About Your Project</ButtonLink></div>
        <div className="border-t border-slate-700/70">{contactRows.map(([label, value]) => <div key={label} className="grid gap-2 border-b border-slate-700/70 py-5 sm:grid-cols-[.35fr_1fr]"><span className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-cyan-300">{label}</span><span className="text-sm text-slate-300" data-testid={`text-contact-${label.toLowerCase()}`}>{value}</span></div>)}</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-[#080c18]">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
          <div><Logo footer /><p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">Digital technology consultancy for businesses ready to operate smarter, connect better, and grow faster.</p><p className="mt-8 font-mono-ui text-[10px] text-slate-600">DIGITAL SOLUTIONS. BUILT FOR GROWTH.</p></div>
          <div><p className="eyebrow mb-5">Explore</p><div className="flex flex-col gap-3">{navItems.map((item) => <a key={item.href} href={item.href} className="w-fit text-sm text-slate-400 hover:text-white" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</a>)}<a href="#contact" className="w-fit text-sm text-slate-400 hover:text-white" data-testid="link-footer-contact">Contact</a></div></div>
          <div><p className="eyebrow mb-5">Services</p><div className="flex flex-col gap-3 text-sm text-slate-500"><span>Web solutions</span><span>Mobile solutions</span><span>Business technology</span><span>AI & automation</span><span>Digital infrastructure</span></div></div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-slate-800/70 pt-6 text-[11px] text-slate-600 sm:flex-row"><span>© 2026 Nexora Technologies. All rights reserved.</span><span>Contact configuration pending · Built for the next brief.</span></div>
      </div>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    document.title = 'Nexora Technologies | Digital Solutions. Built for Growth.';
    const description = 'Nexora Technologies builds modern websites, applications, business systems, AI solutions, and digital platforms designed to help businesses grow.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag); }
    tag.setAttribute('content', description);
  }, []);
  return <div className="site-shell noise min-h-[100dvh] bg-[#0B1020] text-slate-100"><Header /><main><Hero /><IntroStrip /><Services /><Solutions /><Process /><Portfolio /><About /><Consultation /><Contact /></main><Footer /></div>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Home} />
        <Route path="/solutions" component={Home} />
        <Route path="/process" component={Home} />
        <Route path="/portfolio" component={Home} />
        <Route path="/about" component={Home} />
        <Route path="/consultation" component={Home} />
        <Route path="/contact" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;