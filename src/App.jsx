import { useState } from "react";

// ─── COLOR SYSTEM ─────────────────────────────────────────────────────────────
// Background: warm white #FAFAF8
// Cards: pure white #FFFFFF with subtle border
// Text: near-black #1A1A1A, secondary #4A4A4A, muted #8A8A8A
// Accents: distinct saturated colors per role — no muddy darks
// Type labels: clear bg+text combos with enough contrast

const ROLES = [
  {
    id:"pmm", rank:1, tier:1, score:51, icon:"📣",
    title:"Product Marketing Manager", short:"PMM",
    color:"#D97706", colorLight:"#FEF3C7", colorDark:"#92400E",
    salary:"$95K–$140K",
    scores:{skill:9,energy:8,demand:8,comp:9,creator:9,ai:8},
    why:"Translates complexity into stories. MSBA + AI + writing + consulting all converge here.",
    redFlag:null,
    workflows:[
      {task:"Research ICP, buyer personas, market segments",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"SparkToro, Claude, Typeform"},
      {task:"Write and maintain positioning and messaging doc",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Google Docs"},
      {task:"Own go-to-market strategy for launches",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Asana, Slides"},
      {task:"Write website copy and landing pages",type:"Hybrid",freq:"Monthly",cat:"Writing",tools:"Claude, Figma, Webflow"},
      {task:"Build sales enablement: decks, battle cards, one-pagers",type:"Hybrid",freq:"Weekly",cat:"Enablement",tools:"Notion, Slides, Claude"},
      {task:"Run competitive analysis and maintain intel",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"Crayon, Klue, Claude"},
      {task:"Conduct win/loss interviews with sales and customers",type:"Human",freq:"Monthly",cat:"Research",tools:"Gong, Chorus, Zoom"},
      {task:"Align cross-functionally with product, sales, design",type:"Human",freq:"Weekly",cat:"Collab",tools:"Slack, Notion, Zoom"},
      {task:"Track and report launch and campaign metrics",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"HubSpot, Amplitude, Looker"},
      {task:"Train sales team on messaging and value props",type:"Human",freq:"Monthly",cat:"Enablement",tools:"Slides, Loom, Zoom"},
    ],
    metrics:[
      {name:"Win Rate",desc:"% of sales deals won",impact:"Your positioning directly shortens sales cycles"},
      {name:"Pipeline Influenced",desc:"$$ of pipeline touched by marketing",impact:"Connects your content to revenue"},
      {name:"Feature Adoption Rate",desc:"% users activating key features post-launch",impact:"Measures if your launch messaging worked"},
      {name:"Sales Cycle Length",desc:"Avg days from first touch to close",impact:"Clear positioning compresses this"},
      {name:"Content Engagement Rate",desc:"CTR and time-on-page for assets",impact:"Shows if your copy resonates"},
    ],
    seniority:{
      entry:["Write copy on request","Support launch logistics","Assist competitive research"],
      mid:["Own full GTM launches","Write positioning docs","Run win/loss program","Build sales enablement"],
      senior:["Set messaging strategy for product line","Influence product roadmap","Manage PMM team"],
    },
    overlap:[
      {task:"Sales enablement decks and one-pagers",match:"Strong",note:"Accenture stakeholder decks. Bino creative strategy presentations to clients."},
      {task:"Cross-functional alignment",match:"Strong",note:"Accenture: across data, engineering, business teams. Wayfair: stakeholder presentation."},
      {task:"Write landing page and website copy",match:"Moderate",note:"Ghostwriting + email courses. Bino landing page built. Needs PMM-specific reps."},
      {task:"Competitive analysis",match:"Moderate",note:"Consulting context. No direct PMM competitive intel ownership yet."},
      {task:"GTM strategy and product launches",match:"Emerging",note:"Wayfair build + LinkedIn doc = mini-GTM. No formal launch yet."},
    ],
  },
  {
    id:"creative-strat", rank:2, tier:1, score:48, icon:"🎯",
    title:"Creative Strategist", short:"Creative Strat",
    color:"#DC2626", colorLight:"#FEE2E2", colorDark:"#991B1B",
    salary:"$75K–$110K",
    scores:{skill:8,energy:9,demand:5,comp:7,creator:9,ai:7},
    why:"You already do 70% of this at Bino. Direct overlap with photo, video, scripting, and client strategy.",
    redFlag:null,
    workflows:[
      {task:"Analyze briefs and audience data",type:"AI",freq:"Weekly",cat:"Research",tools:"Meta Ad Library, SparkToro"},
      {task:"Lead competitor ad teardowns",type:"Hybrid",freq:"Weekly",cat:"Research",tools:"Meta Ad Library, MagicBrief"},
      {task:"Generate campaign angles and hooks",type:"Hybrid",freq:"Weekly",cat:"Ideation",tools:"Claude, Notion, whiteboard"},
      {task:"Write ad copy and video scripts",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Google Docs"},
      {task:"Brief and direct creative production",type:"Human",freq:"Weekly",cat:"Production",tools:"Figma, Canva, storyboards"},
      {task:"Review performance data and identify patterns",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Meta Ads Manager, Triple Whale"},
      {task:"Write iteration briefs from test results",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Notion, Loom"},
      {task:"Present creative strategy to clients",type:"Human",freq:"Monthly",cat:"Collab",tools:"Slides, Loom, Zoom"},
      {task:"Build A/B creative testing frameworks",type:"Hybrid",freq:"Quarterly",cat:"Strategy",tools:"Notion, Airtable"},
      {task:"Research platform trends (TikTok, Meta, YouTube)",type:"AI",freq:"Weekly",cat:"Research",tools:"TikTok, Instagram, X"},
    ],
    metrics:[
      {name:"ROAS",desc:"Revenue ÷ ad spend",impact:"Your creatives move this directly"},
      {name:"Hook Rate",desc:"% who watch past 3 seconds",impact:"Measures if your opening stops the scroll"},
      {name:"CTR",desc:"% who click after seeing ad",impact:"CTA clarity and offer appeal"},
      {name:"Creative Win Rate",desc:"% of new concepts that beat control",impact:"Quality of your ideation process"},
      {name:"CPA",desc:"Ad spend ÷ conversions",impact:"Bottom-line metric your work affects"},
    ],
    seniority:{
      entry:["Execute briefs written by others","Write copy variations"],
      mid:["Own brief-to-launch creative cycles","Direct production teams","Present to clients"],
      senior:["Set creative strategy for brand or account","Build testing frameworks","Lead creative team"],
    },
    overlap:[
      {task:"Direct creative production (video, photo)",match:"Strong",note:"Bino Productions. Directed shoots, edited content, full creative workflow."},
      {task:"Write ad copy and video scripts",match:"Strong",note:"Ghostwriting Academy. Email courses. 60+ Reels scripted. Nicolas Cole trained."},
      {task:"Present creative strategy to clients",match:"Strong",note:"Bino: presented pricing, packages, creative direction to clients directly."},
      {task:"Generate campaign angles and hooks",match:"Strong",note:"You think in content angles. Proven with LinkedIn content performance."},
      {task:"Review performance data",match:"Moderate",note:"Understands metrics conceptually. Needs live paid media data experience."},
    ],
  },
  {
    id:"content-mktg", rank:3, tier:1, score:47, icon:"✍️",
    title:"Content Marketing Manager", short:"Content Mktg",
    color:"#059669", colorLight:"#D1FAE5", colorDark:"#065F46",
    salary:"$70K–$110K",
    scores:{skill:9,energy:9,demand:7,comp:7,creator:9,ai:7},
    why:"Fastest door in. Directly overlaps ghostwriting, newsletter, and email marketing background.",
    redFlag:null,
    workflows:[
      {task:"Develop and own content marketing strategy",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Miro"},
      {task:"Build and manage editorial content calendar",type:"Hybrid",freq:"Weekly",cat:"Strategy",tools:"Notion, Airtable, Claude"},
      {task:"Write long-form blog posts, whitepapers, case studies",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Google Docs, SurferSEO"},
      {task:"Write and send email newsletter",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Beehiiv, ConvertKit, Claude"},
      {task:"Repurpose content across channels",type:"AI",freq:"Weekly",cat:"Distribution",tools:"Claude, Descript, Canva"},
      {task:"Conduct SEO keyword research",type:"AI",freq:"Monthly",cat:"Research",tools:"Ahrefs, SurferSEO, Semrush"},
      {task:"Interview subject matter experts",type:"Human",freq:"Weekly",cat:"Research",tools:"Zoom, Otter.ai, Notion"},
      {task:"Track and report on content performance",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"GA4, HubSpot, Looker"},
      {task:"Manage freelance writers and contributors",type:"Human",freq:"Weekly",cat:"Collab",tools:"Notion, Slack"},
      {task:"Run content audits and identify gaps",type:"Hybrid",freq:"Monthly",cat:"Strategy",tools:"Ahrefs, Screaming Frog"},
    ],
    metrics:[
      {name:"Organic Traffic",desc:"Monthly visits from search and social",impact:"Core measure of content reach"},
      {name:"Email Open Rate",desc:"% of subscribers who open",impact:"Subject line quality and audience trust"},
      {name:"Email Click Rate",desc:"% who click a link",impact:"Content relevance and CTA clarity"},
      {name:"MQL from Content",desc:"Marketing-qualified leads from organic",impact:"Connects content to revenue pipeline"},
      {name:"Subscriber Growth Rate",desc:"Net new subs per month",impact:"Is your content engine building an audience"},
    ],
    seniority:{
      entry:["Write assigned blog posts","Manage social scheduling","Track basic analytics"],
      mid:["Own full editorial calendar","Write and send newsletter","Run SEO strategy"],
      senior:["Build content engine from scratch","Own content-attributed pipeline","Hire and lead content team"],
    },
    overlap:[
      {task:"Write long-form content and articles",match:"Strong",note:"Ghostwriting Academy. Email courses with 30%+ opt-in. 60+ LinkedIn posts."},
      {task:"Write and manage email newsletter",match:"Strong",note:"Built 5-day email course. Studied Beehiiv and ConvertKit. Nicolas Cole foundation."},
      {task:"Repurpose content across channels",match:"Strong",note:"60+ Reels. LinkedIn. Multiple format experience across video, written, visual."},
      {task:"SEO keyword research",match:"Moderate",note:"Familiar with SEO concepts. No live SEO campaign ownership yet."},
      {task:"Track and report on content performance",match:"Moderate",note:"MSBA + Power BI means analytics is easy. Needs content-platform reps."},
    ],
  },
  {
    id:"dev-advocate", rank:4, tier:1, score:45, icon:"🛠️",
    title:"Developer Advocate", short:"DevRel",
    color:"#4F46E5", colorLight:"#EEF2FF", colorDark:"#3730A3",
    salary:"$110K–$170K",
    scores:{skill:9,energy:8,demand:6,comp:8,creator:8,ai:6},
    why:"35 apps + MSBA + video production + technical writing. Rare combo. Best as year 2–3 role after PMM.",
    redFlag:null,
    workflows:[
      {task:"Build demo apps, integrations, and code examples",type:"Hybrid",freq:"Weekly",cat:"Production",tools:"GitHub, VS Code, Claude, Python/Node"},
      {task:"Write technical tutorials and documentation",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Markdown, Notion, Mintlify"},
      {task:"Record and publish video walkthroughs",type:"Human",freq:"Weekly",cat:"Production",tools:"Loom, DaVinci Resolve, Descript"},
      {task:"Engage developer community (Discord, forums, GitHub)",type:"Human",freq:"Daily",cat:"Community",tools:"Discord, GitHub, Stack Overflow"},
      {task:"Speak at conferences and webinars",type:"Human",freq:"Monthly",cat:"Community",tools:"Slides, Zoom, in-person"},
      {task:"Synthesize developer feedback for product team",type:"Hybrid",freq:"Weekly",cat:"Research",tools:"Notion, Slack, GitHub Issues"},
      {task:"Collaborate with product on roadmap",type:"Human",freq:"Weekly",cat:"Collab",tools:"Linear, Jira, Notion"},
      {task:"Monitor developer sentiment and pain points",type:"AI",freq:"Daily",cat:"Research",tools:"Discord bots, GitHub, Twitter"},
      {task:"Run onboarding workshops and live coding sessions",type:"Human",freq:"Monthly",cat:"Community",tools:"Zoom, Replit, Loom"},
      {task:"Manage developer content calendar",type:"Hybrid",freq:"Weekly",cat:"Strategy",tools:"Notion, Buffer, Dev.to"},
    ],
    metrics:[
      {name:"Developer Activation Rate",desc:"% of signups who use API within 7 days",impact:"Your docs and tutorials drive this"},
      {name:"Community Growth",desc:"Discord members, forum posts, GitHub stars",impact:"Health of the community you build"},
      {name:"Tutorial Completion Rate",desc:"% who finish a guide you wrote",impact:"Shows if your content is clear enough"},
      {name:"Support Ticket Deflection",desc:"% answered by your docs",impact:"Good docs reduce engineering burden"},
      {name:"Content Reach",desc:"Views, shares of your technical content",impact:"Measures thought leadership footprint"},
    ],
    seniority:{
      entry:["Write tutorials","Answer community questions","Build small demos"],
      mid:["Own developer onboarding content","Speak at events","Build SDK examples"],
      senior:["Set DevRel strategy","Build community programs","Influence product roadmap"],
    },
    overlap:[
      {task:"Build demo apps and code examples",match:"Strong",note:"35 AI Studio apps. Wayfair: built live AI tool with n8n + Gemini. Direct proof."},
      {task:"Write technical tutorials and documentation",match:"Strong",note:"Wayfair build documented publicly on LinkedIn. Writing + technical combined."},
      {task:"Record and publish video walkthroughs",match:"Strong",note:"Bino Productions. Video production background. DaVinci Resolve, Descript."},
      {task:"Engage developer community",match:"Moderate",note:"Active on LinkedIn. No dedicated Discord/GitHub community yet."},
      {task:"Speak at conferences",match:"Emerging",note:"No conference speaking history. NatGeo photography credibility. Need live reps."},
    ],
  },
  {
    id:"ai-pmm", rank:5, tier:1, score:44, icon:"🤖",
    title:"AI Product Marketing Manager", short:"AI PMM",
    color:"#0891B2", colorLight:"#E0F2FE", colorDark:"#0E7490",
    salary:"$100K–$155K",
    scores:{skill:8,energy:7,demand:7,comp:8,creator:7,ai:7},
    why:"PMM specialized for AI. 35 apps + 100+ AI certs + MSBA = rare credibility. Fastest-growing PMM category.",
    redFlag:null,
    workflows:[
      {task:"Translate AI capabilities into plain-language benefits",type:"Human",freq:"Weekly",cat:"Writing",tools:"Notion, Claude, Google Docs"},
      {task:"Build AI competitive landscape and positioning",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"Claude, Perplexity, G2"},
      {task:"Write AI feature launch announcements",type:"Hybrid",freq:"Monthly",cat:"Writing",tools:"Claude, Notion, HubSpot"},
      {task:"Create AI demo scripts and videos",type:"Human",freq:"Monthly",cat:"Production",tools:"Loom, Descript, Slides"},
      {task:"Educate sales team on AI differentiators",type:"Human",freq:"Weekly",cat:"Enablement",tools:"Slides, Notion, Loom"},
      {task:"Gather feedback on AI features from users",type:"Hybrid",freq:"Weekly",cat:"Research",tools:"Dovetail, Notion, Slack"},
      {task:"Monitor AI industry news and competitor moves",type:"AI",freq:"Daily",cat:"Research",tools:"Perplexity, Claude, Twitter/X"},
      {task:"Build personas for technical and non-technical buyers",type:"Hybrid",freq:"Quarterly",cat:"Research",tools:"Claude, Surveys, Zoom"},
    ],
    metrics:[
      {name:"AI Feature Adoption Rate",desc:"% users enabling and using AI features",impact:"Your messaging drives comfort and activation"},
      {name:"Demo-to-Trial Conversion",desc:"% who sign up after AI demo",impact:"Shows if your narrative resonates"},
      {name:"Win Rate vs AI Competitors",desc:"% of deals won against AI alternatives",impact:"Your battle cards and positioning drive this"},
      {name:"Trust Score",desc:"Survey scores on AI reliability perception",impact:"Your messaging sets expectations"},
      {name:"Sales Enablement Usage",desc:"% of reps using your AI materials",impact:"Measures if your enablement is actually useful"},
    ],
    seniority:{
      entry:["Support AI feature launches","Write AI explainer content"],
      mid:["Own AI product positioning","Run AI feature launches end-to-end"],
      senior:["Set AI narrative for entire company","Lead AI go-to-market"],
    },
    overlap:[
      {task:"Translate AI capabilities into plain-language benefits",match:"Strong",note:"35 AI apps built for non-technical users. This exact skill is your strongest proof point."},
      {task:"Build AI competitive landscape",match:"Strong",note:"100+ AI certifications. Daily AI tool use. You know the landscape better than most."},
      {task:"Create AI demo scripts and videos",match:"Strong",note:"Bino video production + Wayfair AI build documentation on LinkedIn = direct proof."},
      {task:"Monitor AI industry news",match:"Strong",note:"You do this naturally. Part of your daily information diet already."},
      {task:"Educate sales on AI differentiators",match:"Moderate",note:"Accenture cross-functional delivery. No direct sales enablement on AI products yet."},
    ],
  },
  {
    id:"growth-mktg", rank:6, tier:1, score:40, icon:"📈",
    title:"Growth Marketing Manager", short:"Growth Mktg",
    color:"#65A30D", colorLight:"#F7FEE7", colorDark:"#3F6212",
    salary:"$85K–$130K",
    scores:{skill:7,energy:6,demand:8,comp:7,creator:5,ai:7},
    why:"Analytics + content + strategy. MSBA data skills meet marketing instincts. Good PMM bridge role.",
    redFlag:null,
    workflows:[
      {task:"Design and run growth experiments (A/B tests)",type:"Hybrid",freq:"Weekly",cat:"Experiments",tools:"Optimizely, VWO, Notion"},
      {task:"Analyze funnel data and identify drop-offs",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Amplitude, Mixpanel, SQL"},
      {task:"Write and test landing page copy variants",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Webflow, Unbounce"},
      {task:"Manage paid acquisition campaigns",type:"Hybrid",freq:"Weekly",cat:"Paid",tools:"Meta Ads, Google Ads, Triple Whale"},
      {task:"Build and optimize email drip sequences",type:"Hybrid",freq:"Monthly",cat:"Email",tools:"HubSpot, Klaviyo, Claude"},
      {task:"Report on growth metrics to leadership",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Looker, Slides, Notion"},
      {task:"Research acquisition channels and competitors",type:"AI",freq:"Monthly",cat:"Research",tools:"Semrush, Perplexity, SimilarWeb"},
      {task:"Run user onboarding optimization projects",type:"Human",freq:"Monthly",cat:"Strategy",tools:"Fullstory, Hotjar, Notion"},
    ],
    metrics:[
      {name:"CAC",desc:"Total marketing spend ÷ new customers",impact:"Core efficiency metric the whole team optimizes"},
      {name:"MoM Growth Rate",desc:"% month-over-month user or revenue growth",impact:"Headline number leadership watches"},
      {name:"Conversion Rate by Channel",desc:"% visitors who convert per source",impact:"Shows where to scale spend"},
      {name:"Activation Rate",desc:"% of signups who hit the key action in week 1",impact:"Your onboarding messaging drives this"},
      {name:"LTV:CAC Ratio",desc:"Lifetime value vs cost to acquire",impact:"Shows if growth is sustainable"},
    ],
    seniority:{
      entry:["Run assigned A/B tests","Manage ad spend","Build basic reports"],
      mid:["Own channel strategy","Build experiments framework","Track CAC and LTV"],
      senior:["Set company growth model","Build growth team","Own acquisition strategy"],
    },
    overlap:[
      {task:"Analyze funnel data",match:"Strong",note:"MSBA + Power BI + SQL. Data analysis is your trained foundation."},
      {task:"Write and test landing page copy",match:"Strong",note:"Ghostwriting Academy + email courses. Bino landing page built."},
      {task:"Report growth metrics to leadership",match:"Strong",note:"Accenture dashboards and stakeholder reports. MSBA analytics background."},
      {task:"Build and optimize email drip sequences",match:"Strong",note:"5-day email course with 30%+ opt-in rate. Real execution proof."},
      {task:"Manage paid acquisition campaigns",match:"Emerging",note:"No live paid media management. Bino Instagram content is the closest analog."},
    ],
  },
  {
    id:"comms", rank:7, tier:2, score:41, icon:"📡",
    title:"Communications Specialist", short:"Comms",
    color:"#DB2777", colorLight:"#FCE7F3", colorDark:"#9D174D",
    salary:"$60K–$90K",
    scores:{skill:7,energy:7,demand:7,comp:6,creator:7,ai:7},
    why:"Strong writing overlap. Best bridge role for getting into a tech company first, then pivoting to PMM.",
    redFlag:null,
    workflows:[
      {task:"Write press releases and public announcements",type:"Hybrid",freq:"Monthly",cat:"Writing",tools:"Claude, Google Docs, PR Newswire"},
      {task:"Pitch journalists and manage media relationships",type:"Human",freq:"Weekly",cat:"Outreach",tools:"Muck Rack, Gmail, Twitter/X"},
      {task:"Monitor brand mentions and press coverage",type:"AI",freq:"Daily",cat:"Research",tools:"Mention, Google Alerts, Muck Rack"},
      {task:"Write internal newsletters and company memos",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Notion, Confluence"},
      {task:"Draft executive social content and talking points",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Notion, LinkedIn"},
      {task:"Manage social media content calendar",type:"Hybrid",freq:"Weekly",cat:"Distribution",tools:"Buffer, Later, Canva"},
      {task:"Support crisis communications and rapid response",type:"Human",freq:"As needed",cat:"Strategy",tools:"Slack, Google Docs, Zoom"},
      {task:"Write award submissions and speaking proposals",type:"Hybrid",freq:"Quarterly",cat:"Writing",tools:"Claude, Google Docs"},
    ],
    metrics:[
      {name:"Press Coverage Volume",desc:"# earned media placements per quarter",impact:"Measures outreach effectiveness"},
      {name:"Share of Voice",desc:"% of industry articles mentioning your company",impact:"Relative PR presence vs competitors"},
      {name:"Internal Comms Open Rate",desc:"% of employees who read internal comms",impact:"Shows if your messaging cuts through"},
      {name:"Crisis Response Time",desc:"Hours to publish official response",impact:"Speed and clarity when issues arise"},
    ],
    seniority:{
      entry:["Draft press releases","Monitor media mentions","Manage social scheduling"],
      mid:["Pitch journalists independently","Own internal comms calendar","Write executive content"],
      senior:["Set PR strategy","Manage agency relationships","Own brand reputation"],
    },
    overlap:[
      {task:"Draft executive social content",match:"Strong",note:"LinkedIn content creation + ghostwriting = direct match."},
      {task:"Manage social media content calendar",match:"Strong",note:"60+ Reels. Bino content calendar. Real execution proof."},
      {task:"Write internal newsletters and memos",match:"Strong",note:"Email newsletter experience. Accenture stakeholder communications."},
      {task:"Pitch journalists and media relations",match:"Emerging",note:"No media relations experience. Outreach skills exist but context is new."},
    ],
  },
  {
    id:"mktg-ops", rank:8, tier:2, score:39, icon:"⚙️",
    title:"Marketing Operations Manager", short:"Mktg Ops",
    color:"#7C3AED", colorLight:"#EDE9FE", colorDark:"#5B21B6",
    salary:"$75K–$115K",
    scores:{skill:7,energy:5,demand:8,comp:7,creator:3,ai:9},
    why:"n8n + automation + MSBA analytics = strong fit for the technical side. But the daily work is systems, not storytelling.",
    redFlag:"Energy check: daily work is tool configuration and reporting. Not storytelling. Watch this.",
    workflows:[
      {task:"Manage and configure marketing tech stack (HubSpot, Salesforce)",type:"Hybrid",freq:"Weekly",cat:"Systems",tools:"HubSpot, Salesforce, Notion"},
      {task:"Build and maintain marketing automation workflows",type:"Hybrid",freq:"Weekly",cat:"Automation",tools:"n8n, HubSpot, Zapier, Make"},
      {task:"Build dashboards and performance reports",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Looker, Power BI, HubSpot"},
      {task:"Manage lead scoring and segmentation logic",type:"Hybrid",freq:"Monthly",cat:"Systems",tools:"HubSpot, Salesforce, SQL"},
      {task:"Audit and clean CRM data quality",type:"AI",freq:"Monthly",cat:"Systems",tools:"HubSpot, Salesforce, Python"},
      {task:"Coordinate with demand gen on campaign execution",type:"Human",freq:"Weekly",cat:"Collab",tools:"Slack, Notion, Asana"},
      {task:"Document marketing processes and SOPs",type:"Hybrid",freq:"Monthly",cat:"Writing",tools:"Notion, Confluence, Claude"},
      {task:"Evaluate and onboard new marketing tools",type:"Hybrid",freq:"Quarterly",cat:"Strategy",tools:"G2, vendor demos, Notion"},
    ],
    metrics:[
      {name:"Lead-to-MQL Conversion Rate",desc:"% of leads who become marketing qualified",impact:"Shows if your lead scoring logic is accurate"},
      {name:"Campaign ROI",desc:"Revenue attributed to specific campaigns",impact:"Measures if automation and targeting works"},
      {name:"Data Quality Score",desc:"% of clean, complete CRM records",impact:"Foundation of every other marketing metric"},
      {name:"Email Deliverability Rate",desc:"% of emails reaching inbox",impact:"Technical health of your email programs"},
    ],
    seniority:{
      entry:["Manage basic HubSpot workflows","Build reports","Support campaign launches"],
      mid:["Own full marketing tech stack","Build automation programs","Manage lead scoring"],
      senior:["Set martech strategy","Manage vendor relationships","Own marketing data infrastructure"],
    },
    overlap:[
      {task:"Build and maintain marketing automation workflows",match:"Strong",note:"n8n experience. Wayfair Comet build. 35+ automation apps. This is direct."},
      {task:"Build dashboards and performance reports",match:"Strong",note:"MSBA + Power BI + SQL. Accenture dashboard delivery. Very direct overlap."},
      {task:"Document marketing processes and SOPs",match:"Strong",note:"Accenture: process documentation is core consulting output."},
      {task:"Manage marketing tech stack",match:"Moderate",note:"HubSpot certs. Salesforce AI Associate cert. No live admin experience yet."},
    ],
  },
  {
    id:"brand-mktg", rank:9, tier:2, score:39, icon:"✦",
    title:"Brand Marketing Manager", short:"Brand Mktg",
    color:"#9333EA", colorLight:"#F3E8FF", colorDark:"#6B21A8",
    salary:"$75K–$120K",
    scores:{skill:7,energy:8,demand:6,comp:7,creator:7,ai:4},
    why:"Natural fit for visual storytelling background. Positioning + identity work. Best as year 2 move after PMM.",
    redFlag:null,
    workflows:[
      {task:"Run brand audit and competitive positioning",type:"Hybrid",freq:"Quarterly",cat:"Research",tools:"Claude, Perplexity, Miro"},
      {task:"Research audience, culture, and behavioral trends",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"SparkToro, Reddit, TikTok"},
      {task:"Build brand identity framework (voice, values, tone)",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Miro, workshops"},
      {task:"Create visual direction and moodboards",type:"Human",freq:"Monthly",cat:"Production",tools:"Figma, Pinterest, Canva"},
      {task:"Write brand guidelines documentation",type:"Hybrid",freq:"Quarterly",cat:"Writing",tools:"Figma, Notion, Claude"},
      {task:"Develop campaign concepts and creative territory",type:"Human",freq:"Monthly",cat:"Ideation",tools:"Miro, Slides, storyboards"},
      {task:"Write brand narrative and company story",type:"Human",freq:"Quarterly",cat:"Writing",tools:"Notion, Google Docs"},
      {task:"Present brand strategy to leadership or clients",type:"Human",freq:"Monthly",cat:"Collab",tools:"Slides, Figma, Loom"},
    ],
    metrics:[
      {name:"Brand Awareness Score",desc:"% of target market who recognize the brand",impact:"Baseline measure of brand-building reach"},
      {name:"Brand Sentiment",desc:"Positive vs negative mentions online",impact:"Shows if positioning resonates emotionally"},
      {name:"Share of Voice",desc:"Your brand mentions vs competitors",impact:"Relative market presence and mindshare"},
      {name:"Campaign Attribution",desc:"Revenue or signups tied to brand campaigns",impact:"Connects brand investment to outcome"},
    ],
    seniority:{
      entry:["Execute guidelines made by others","Produce moodboards and assets"],
      mid:["Build brand guidelines from scratch","Run audits","Develop campaign concepts"],
      senior:["Set brand vision","Lead agency relationships","Own brand P&L"],
    },
    overlap:[
      {task:"Create visual direction and moodboards",match:"Strong",note:"Bino Productions. Photoshop, Figma. NatGeo-featured photography. Strong visual eye."},
      {task:"Present brand strategy to clients",match:"Strong",note:"Bino: presented creative strategy and packages directly to clients."},
      {task:"Build brand identity framework",match:"Moderate",note:"Built Bino's own brand. No formal client brand strategy yet."},
      {task:"Write brand guidelines",match:"Emerging",note:"No formal brand guidelines doc produced. Figma background transfers."},
    ],
  },
  {
    id:"lxd", rank:10, tier:2, score:40, icon:"🎓",
    title:"Learning Experience Designer", short:"L&D / LXD",
    color:"#0D9488", colorLight:"#F0FDFA", colorDark:"#0F766E",
    salary:"$60K–$95K",
    scores:{skill:8,energy:7,demand:6,comp:6,creator:6,ai:7},
    why:"93rd percentile Theory Development. Built email courses with 30%+ opt-in. Best at AI or ed-tech companies.",
    redFlag:null,
    workflows:[
      {task:"Conduct learner needs analysis and gap assessment",type:"Hybrid",freq:"Quarterly",cat:"Research",tools:"Surveys, Typeform, Notion"},
      {task:"Write learning objectives and curriculum map",type:"Human",freq:"Monthly",cat:"Strategy",tools:"Notion, Google Docs"},
      {task:"Design course structure and module flow",type:"Human",freq:"Monthly",cat:"Strategy",tools:"Miro, Notion, Figma"},
      {task:"Write scripts and storyboards for instructional video",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Google Docs, Notion"},
      {task:"Build interactive modules and assessments",type:"Hybrid",freq:"Weekly",cat:"Production",tools:"Articulate 360, Rise, Typeform"},
      {task:"Record and edit instructional video content",type:"Human",freq:"Weekly",cat:"Production",tools:"Loom, DaVinci Resolve, Descript"},
      {task:"Facilitate live training sessions and workshops",type:"Human",freq:"Weekly",cat:"Facilitation",tools:"Zoom, Mentimeter, Miro"},
      {task:"Measure learning outcomes and iterate",type:"Hybrid",freq:"Monthly",cat:"Analytics",tools:"Notion, LMS analytics, surveys"},
    ],
    metrics:[
      {name:"Course Completion Rate",desc:"% who finish a course or module",impact:"Core measure of instructional design quality"},
      {name:"Learning Assessment Scores",desc:"Quiz results pre/post training",impact:"Shows actual knowledge transfer"},
      {name:"Learner Satisfaction (NPS)",desc:"Post-course survey score",impact:"Was the training useful and engaging"},
      {name:"Time-to-Proficiency",desc:"Days until learner performs independently",impact:"Shorter = better training design"},
    ],
    seniority:{
      entry:["Build single modules","Record instructional videos","Manage LMS"],
      mid:["Design full curriculum from scratch","Run needs analysis","Facilitate live sessions"],
      senior:["Own L&D strategy","Build instructional design team","Align learning with business OKRs"],
    },
    overlap:[
      {task:"Write scripts and storyboards for instructional video",match:"Strong",note:"Bino Productions scripting. Email courses = structured educational sequences."},
      {task:"Record and edit instructional video",match:"Strong",note:"DaVinci Resolve, Descript, Loom. Bino is the direct proof."},
      {task:"Write learning objectives and curriculum",match:"Strong",note:"5-day email course was a functional curriculum. 30%+ opt-in = it worked."},
      {task:"Facilitate live training sessions",match:"Moderate",note:"No formal facilitation history. Client presentations at Bino and Accenture transfer."},
    ],
  },
  {
    id:"apm", rank:11, tier:2, score:38, icon:"🧭",
    title:"Associate Product Manager", short:"APM",
    color:"#0369A1", colorLight:"#E0F2FE", colorDark:"#075985",
    salary:"$90K–$130K",
    scores:{skill:7,energy:5,demand:7,comp:8,creator:4,ai:7},
    why:"Viable with MSBA + Accenture. Execution-heavy. Best at learning or HR tech companies.",
    redFlag:"Energy check: 60% of the job is sprint ceremonies, ticket writing, and backlog management.",
    workflows:[
      {task:"Conduct user research and synthesize insights",type:"Hybrid",freq:"Weekly",cat:"Research",tools:"Dovetail, UserTesting, Zoom"},
      {task:"Write PRDs, feature specs, and user stories",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Notion, Confluence, Claude"},
      {task:"Manage and prioritize product backlog",type:"Human",freq:"Weekly",cat:"Strategy",tools:"Linear, Jira, Productboard"},
      {task:"Run sprint planning, standups, and retros",type:"Human",freq:"Weekly",cat:"Collab",tools:"Jira, Linear, Notion"},
      {task:"Analyze product usage data and metrics",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Amplitude, Mixpanel, SQL"},
      {task:"Coordinate cross-functional launches",type:"Human",freq:"Monthly",cat:"Collab",tools:"Asana, Notion, Slack"},
      {task:"Interview customers and synthesize feedback",type:"Human",freq:"Weekly",cat:"Research",tools:"Zoom, Dovetail, Notion"},
      {task:"Write competitive analysis and market research",type:"AI",freq:"Monthly",cat:"Research",tools:"Claude, Perplexity, G2"},
    ],
    metrics:[
      {name:"Feature Adoption Rate",desc:"% using a feature within 30 days of launch",impact:"Did you build and launch the right thing"},
      {name:"User Retention (D7, D30)",desc:"% active 7 and 30 days after signup",impact:"Core health metric of your product area"},
      {name:"Sprint Velocity",desc:"Story points per sprint",impact:"Team execution health you manage"},
      {name:"Time to Ship",desc:"Days from spec to production",impact:"Your ability to move teams forward"},
    ],
    seniority:{
      entry:["Write tickets","Assist sprint planning","Run basic user interviews"],
      mid:["Own product area end-to-end","Write PRDs","Manage backlog"],
      senior:["Set product vision","Manage APMs","Own product OKRs"],
    },
    overlap:[
      {task:"Analyze product usage data",match:"Strong",note:"MSBA + SQL + Power BI + Amplitude Foundations cert. Strong data foundation."},
      {task:"Write PRDs and specs",match:"Moderate",note:"Accenture: wrote business requirements docs. Translates well."},
      {task:"Run sprint planning and agile ceremonies",match:"Moderate",note:"Accenture agile exposure. Scrum certifications. Not hands-on PM experience."},
      {task:"Manage and prioritize product backlog",match:"Emerging",note:"Know the tools. No live backlog ownership as PM."},
    ],
  },
  {
    id:"ux-writer", rank:12, tier:2, score:36, icon:"🖊️",
    title:"UX Writer / Content Designer", short:"UX Writer",
    color:"#BE185D", colorLight:"#FDF2F8", colorDark:"#9D174D",
    salary:"$75K–$115K",
    scores:{skill:7,energy:6,demand:5,comp:7,creator:5,ai:6},
    why:"Writing + UX certs overlap is real. Only apply if the role includes strategy, not just button labels.",
    redFlag:"Condition: only applies if JD includes content strategy. Most UX writer roles are narrow microcopy work.",
    workflows:[
      {task:"Write UX copy: buttons, tooltips, error messages, onboarding",type:"Hybrid",freq:"Daily",cat:"Writing",tools:"Figma, Notion, Claude"},
      {task:"Conduct content audits and identify UX writing gaps",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"Figma, Notion, spreadsheets"},
      {task:"Build and maintain UX writing style guide",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Google Docs, Figma"},
      {task:"Collaborate with product designers on user flows",type:"Human",freq:"Weekly",cat:"Collab",tools:"Figma, Miro, Slack"},
      {task:"Conduct user research and usability testing",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"UserTesting, Maze, Zoom"},
      {task:"Write product marketing copy and in-app messaging",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Figma, Webflow"},
      {task:"Define content patterns and reusable components",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Figma, Storybook, Notion"},
    ],
    metrics:[
      {name:"Task Completion Rate",desc:"% of users who complete a key flow",impact:"Your copy removes confusion and friction"},
      {name:"Support Contact Rate",desc:"% who need help after seeing your copy",impact:"Clear writing reduces support load"},
      {name:"Onboarding Completion Rate",desc:"% who finish the onboarding flow",impact:"Your first-impression copy drives this"},
    ],
    seniority:{
      entry:["Write microcopy on request","Support design sprints"],
      mid:["Own voice and tone guide","Conduct content audits","Write full product flows"],
      senior:["Set content design strategy","Build UX writing team","Influence product decisions"],
    },
    overlap:[
      {task:"Write product copy and messaging",match:"Strong",note:"Ghostwriting Academy. Nicolas Cole training. 60+ pieces written."},
      {task:"Collaborate with product designers",match:"Moderate",note:"7 Uxcel UX certs. Microsoft UX Design cert. Figma proficiency. No live product UX reps."},
      {task:"Build UX writing style guide",match:"Moderate",note:"Writing background + brand systems thinking transfers."},
      {task:"Conduct usability testing",match:"Emerging",note:"UX research concepts familiar from certifications. No live usability study run."},
    ],
  },
  {
    id:"prod-ops", rank:13, tier:2, score:39, icon:"🔧",
    title:"Product Operations Manager", short:"Prod Ops",
    color:"#64748B", colorLight:"#F1F5F9", colorDark:"#334155",
    salary:"$85K–$125K",
    scores:{skill:7,energy:5,demand:8,comp:7,creator:4,ai:8},
    why:"Systems thinking + MSBA + Accenture process work. High demand 2025–26. But execution-heavy and creativity-light.",
    redFlag:"Energy check: daily work is process optimization and tool management. Drains creative energy over time.",
    workflows:[
      {task:"Build and maintain product analytics dashboards",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Amplitude, Mixpanel, Looker, SQL"},
      {task:"Document product processes and playbooks",type:"Hybrid",freq:"Monthly",cat:"Writing",tools:"Notion, Confluence, Claude"},
      {task:"Coordinate cross-functional product reviews",type:"Human",freq:"Weekly",cat:"Collab",tools:"Notion, Slides, Zoom"},
      {task:"Manage tools and integrations across product team",type:"Hybrid",freq:"Weekly",cat:"Systems",tools:"Linear, Jira, Notion, Zapier"},
      {task:"Build and run user feedback collection systems",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"Typeform, Dovetail, Notion"},
      {task:"Track and report on product OKRs and KPIs",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Looker, Notion, Slides"},
      {task:"Onboard new tools and train product team",type:"Human",freq:"Quarterly",cat:"Enablement",tools:"Notion, Loom, Zoom"},
      {task:"Identify process bottlenecks and propose fixes",type:"Hybrid",freq:"Monthly",cat:"Strategy",tools:"Miro, Notion, Claude"},
    ],
    metrics:[
      {name:"Product Team Velocity",desc:"Story points shipped per sprint over time",impact:"Your process improvements increase team output"},
      {name:"Tool Adoption Rate",desc:"% of team using recommended tools",impact:"Measures if your systems work get used"},
      {name:"Decision Turnaround Time",desc:"Days from question to answered decision",impact:"Good ops infrastructure speeds this up"},
    ],
    seniority:{
      entry:["Manage specific tools","Build assigned dashboards","Document processes"],
      mid:["Own product analytics","Build feedback systems","Coordinate cross-functional reviews"],
      senior:["Set product ops strategy","Own tooling and data infrastructure","Lead product ops team"],
    },
    overlap:[
      {task:"Build product analytics dashboards",match:"Strong",note:"MSBA + Power BI + SQL + Amplitude cert. Accenture dashboard delivery. Very direct."},
      {task:"Document product processes and playbooks",match:"Strong",note:"Accenture: process documentation is a core consulting output."},
      {task:"Manage tools and integrations",match:"Strong",note:"n8n. Wayfair Comet. 35 apps. You build integrations as a hobby."},
      {task:"Identify process bottlenecks",match:"Strong",note:"Accenture consulting. This is literally what consulting is."},
    ],
  },
  {
    id:"solutions-eng", rank:14, tier:2, score:35, icon:"🔗",
    title:"Solutions Engineer", short:"Solutions Eng",
    color:"#EA580C", colorLight:"#FFF7ED", colorDark:"#C2410C",
    salary:"$100K–$160K",
    scores:{skill:6,energy:4,demand:8,comp:8,creator:3,ai:6},
    why:"High comp. Technical builds + communication skills are the rare combo SE roles need.",
    redFlag:"Energy check: 60% of the job is running the same demo repeatedly and supporting sales calls.",
    workflows:[
      {task:"Build and maintain technical product demos",type:"Hybrid",freq:"Weekly",cat:"Production",tools:"GitHub, VS Code, Loom, Slides"},
      {task:"Run live product demos for prospects",type:"Human",freq:"Daily",cat:"Sales",tools:"Zoom, Slides, product sandbox"},
      {task:"Answer technical questions from prospects",type:"Human",freq:"Daily",cat:"Support",tools:"Slack, Zoom, email"},
      {task:"Write technical documentation and integration guides",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Markdown, Notion, Claude"},
      {task:"Build proof-of-concept integrations for prospects",type:"Hybrid",freq:"Weekly",cat:"Production",tools:"GitHub, VS Code, API docs"},
      {task:"Collaborate with sales on deal strategy",type:"Human",freq:"Weekly",cat:"Sales",tools:"Salesforce, Slack, Zoom"},
      {task:"Collect and relay customer feedback to product",type:"Human",freq:"Weekly",cat:"Research",tools:"Notion, Slack, Salesforce"},
      {task:"Train sales team on technical product capabilities",type:"Human",freq:"Monthly",cat:"Enablement",tools:"Slides, Loom, Notion"},
    ],
    metrics:[
      {name:"Demo-to-Opportunity Rate",desc:"% of demos that move to qualified opportunity",impact:"Your demo quality and clarity drives this"},
      {name:"Technical Win Rate",desc:"% of technical evaluations won",impact:"Your PoC builds and objection handling"},
      {name:"Time-to-Technical-Win",desc:"Days from first demo to technical approval",impact:"Speed of your evaluation process"},
    ],
    seniority:{
      entry:["Support demos run by senior SEs","Answer basic technical questions"],
      mid:["Run demos independently","Build PoC integrations","Own customer onboarding"],
      senior:["Own SE team","Set technical sales strategy","Build demo engineering"],
    },
    overlap:[
      {task:"Build technical product demos",match:"Strong",note:"35 AI apps. Wayfair Comet. You build demos as proof of work already."},
      {task:"Write technical documentation",match:"Strong",note:"Wayfair build documented on LinkedIn. Writing + technical combined."},
      {task:"Build proof-of-concept integrations",match:"Strong",note:"n8n. AI Studio. This is your wheelhouse."},
      {task:"Run live product demos repeatedly",match:"Moderate",note:"Can do it. Running the same demo daily is energy-draining for an ENFP though."},
    ],
  },
  {
    id:"influencer", rank:15, tier:2, score:37, icon:"🌟",
    title:"Influencer Marketing Manager", short:"Influencer Mktg",
    color:"#C026D3", colorLight:"#FDF4FF", colorDark:"#86198F",
    salary:"$65K–$100K",
    scores:{skill:6,energy:7,demand:6,comp:6,creator:7,ai:5},
    why:"Creator network + content creation background = credible. Good fit at DTC brands or creator-economy companies.",
    redFlag:"Condition: only at companies where influencer work connects to content strategy. Skip at pure e-commerce.",
    workflows:[
      {task:"Source and vet influencer partners",type:"Hybrid",freq:"Weekly",cat:"Research",tools:"AspireIQ, Grin, LinkedIn, Instagram"},
      {task:"Negotiate influencer contracts and rates",type:"Human",freq:"Monthly",cat:"Outreach",tools:"Email, contracts, Notion"},
      {task:"Write creative briefs for influencer campaigns",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Claude, Notion, Google Docs"},
      {task:"Manage influencer relationships and communication",type:"Human",freq:"Daily",cat:"Outreach",tools:"Email, Instagram DMs, Slack"},
      {task:"Review influencer content before publishing",type:"Human",freq:"Weekly",cat:"Production",tools:"Instagram, TikTok, YouTube"},
      {task:"Track campaign performance and influencer ROI",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"AspireIQ, Meta Insights, Notion"},
      {task:"Build and maintain influencer database",type:"Hybrid",freq:"Monthly",cat:"Systems",tools:"Airtable, Notion, Grin"},
      {task:"Report influencer results to leadership",type:"Hybrid",freq:"Monthly",cat:"Analytics",tools:"Slides, Notion, Excel"},
    ],
    metrics:[
      {name:"Influencer Reach",desc:"Total impressions across active campaigns",impact:"Baseline measure of campaign spread"},
      {name:"Earned Media Value (EMV)",desc:"Estimated $ value of organic influencer content",impact:"Translates creator output to budget value"},
      {name:"Conversion Rate from Influencer",desc:"% of influencer traffic who convert",impact:"Connects influencer spend to revenue"},
    ],
    seniority:{
      entry:["Source influencers from lists","Track campaign metrics","Support relationship management"],
      mid:["Own campaigns end-to-end","Negotiate contracts","Brief creators independently"],
      senior:["Set influencer strategy","Build creator network","Own influencer budget"],
    },
    overlap:[
      {task:"Write creative briefs for campaigns",match:"Strong",note:"Bino Productions creative briefs. Ghostwriting background. This is direct."},
      {task:"Review influencer content",match:"Strong",note:"Bino: visual and creative quality judgment is trained. NatGeo photography credibility."},
      {task:"Source and vet influencer partners",match:"Moderate",note:"Creator ecosystem familiarity. No formal influencer sourcing process run."},
      {task:"Negotiate contracts and rates",match:"Emerging",note:"Bino pricing conversations transfer. No formal influencer contract negotiation."},
    ],
  },
  // ── TIER 3 — AVOID ─────────────────────────────────────────────────────────
  {
    id:"data-analyst", rank:16, tier:3, score:20, icon:"⛔",
    title:"Data Analyst", short:"Data Analyst",
    color:"#DC2626", colorLight:"#FEF2F2", colorDark:"#991B1B",
    salary:"$65K–$95K",
    scores:{skill:5,energy:2,demand:4,comp:5,creator:2,ai:2},
    why:"Previous role at Accenture. Uses 20% of your skills. Daily work is solo spreadsheets. Going backwards.",
    redFlag:"RED DRESS. The trap that looks safe because you did it before. Skip entirely.",
    workflows:[
      {task:"Clean and validate datasets",type:"AI",freq:"Daily",cat:"Data",tools:"Python, pandas, SQL"},
      {task:"Build and maintain Excel/SQL reports",type:"Hybrid",freq:"Daily",cat:"Data",tools:"SQL, Excel, Power BI"},
      {task:"Create dashboards for stakeholders",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Power BI, Tableau, Looker"},
      {task:"Run ad hoc analysis for business questions",type:"Hybrid",freq:"Daily",cat:"Analytics",tools:"SQL, Python, Excel"},
      {task:"Present findings in stakeholder meetings",type:"Human",freq:"Weekly",cat:"Collab",tools:"Slides, Power BI, Notion"},
    ],
    metrics:[
      {name:"Report Accuracy Rate",desc:"% of reports with zero errors",impact:"Baseline quality measure"},
      {name:"Time to Insight",desc:"Hours from request to delivered analysis",impact:"Your speed and efficiency"},
    ],
    seniority:{
      entry:["Build assigned reports","Clean data","Answer basic data questions"],
      mid:["Own analytical domains","Build dashboards","Lead data projects"],
      senior:["Set analytics strategy","Manage data team","Own data infrastructure"],
    },
    overlap:[
      {task:"Build dashboards and reports",match:"Strong",note:"MSBA + Power BI + SQL. BUT: strong overlap doesn't mean right direction. Going backwards."},
    ],
  },
  {
    id:"biz-analyst", rank:17, tier:3, score:25, icon:"⛔",
    title:"Business Analyst", short:"Biz Analyst",
    color:"#DC2626", colorLight:"#FEF2F2", colorDark:"#991B1B",
    salary:"$65K–$90K",
    scores:{skill:6,energy:3,demand:6,comp:5,creator:2,ai:3},
    why:"Previous role at Accenture. Data analyst in a different outfit. Got paid for it doesn't mean best fit.",
    redFlag:"RED DRESS. Your strongest technical trap. Skip unless it's clearly a bridge to PMM within 6 months.",
    workflows:[
      {task:"Gather and document business requirements",type:"Human",freq:"Weekly",cat:"Research",tools:"Notion, Confluence, Visio"},
      {task:"Map current and future processes",type:"Hybrid",freq:"Weekly",cat:"Strategy",tools:"Miro, Visio, Notion"},
      {task:"Write user stories and acceptance criteria",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Jira, Notion, Confluence"},
      {task:"Facilitate stakeholder workshops",type:"Human",freq:"Weekly",cat:"Collab",tools:"Miro, Zoom, Slides"},
      {task:"Analyze data to support business decisions",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Excel, SQL, Power BI"},
    ],
    metrics:[
      {name:"Requirements Accuracy",desc:"% of requirements that make it to production unchanged",impact:"Your clarity prevents rework"},
      {name:"Stakeholder Satisfaction Score",desc:"Survey score after project delivery",impact:"Did you capture the right needs"},
    ],
    seniority:{
      entry:["Document requirements","Assist workshops","Write user stories"],
      mid:["Own requirements for full projects","Facilitate stakeholder sessions"],
      senior:["Lead BA team","Set requirements methodology"],
    },
    overlap:[
      {task:"Gather and document business requirements",match:"Strong",note:"Accenture. Core deliverable. BUT: going backwards in career terms."},
    ],
  },
  {
    id:"data-sci", rank:18, tier:3, score:29, icon:"⛔",
    title:"Data Scientist", short:"Data Sci",
    color:"#DC2626", colorLight:"#FEF2F2", colorDark:"#991B1B",
    salary:"$100K–$145K",
    scores:{skill:6,energy:3,demand:6,comp:8,creator:2,ai:4},
    why:"MSBA qualifies on paper. That's the trap. Daily work is solo math. ENFP energy collapses by month 4.",
    redFlag:"RED DRESS. The comp looks good until month 4. Can't compete with CS PhDs who've done Kaggle for 5 years.",
    workflows:[
      {task:"Clean and preprocess raw datasets",type:"AI",freq:"Daily",cat:"Data",tools:"Python, pandas, SQL"},
      {task:"Run exploratory data analysis",type:"Hybrid",freq:"Daily",cat:"Analytics",tools:"Jupyter, Matplotlib"},
      {task:"Build and train ML models",type:"Hybrid",freq:"Weekly",cat:"Models",tools:"scikit-learn, PyTorch, AutoML"},
      {task:"Evaluate model performance",type:"Human",freq:"Weekly",cat:"Models",tools:"MLflow, W&B"},
      {task:"Present insights to stakeholders",type:"Human",freq:"Weekly",cat:"Collab",tools:"Slides, Jupyter"},
    ],
    metrics:[
      {name:"Model Accuracy / AUC",desc:"Model performance on test data",impact:"Core quality measure of your models"},
      {name:"Time to Insight",desc:"Days from business question to delivered analysis",impact:"Speed and efficiency as a data scientist"},
    ],
    seniority:{
      entry:["Clean data","Run basic EDA","Assist model development"],
      mid:["Build and deploy models independently","Own analytical domains"],
      senior:["Set data science strategy","Lead team","Own ML infrastructure"],
    },
    overlap:[
      {task:"Write SQL and run EDA",match:"Strong",note:"MSBA + SQL. But this is the paper qualification that creates the trap."},
    ],
  },
  {
    id:"ml-engineer", rank:19, tier:3, score:31, icon:"⛔",
    title:"ML Engineer", short:"ML Eng",
    color:"#DC2626", colorLight:"#FEF2F2", colorDark:"#991B1B",
    salary:"$120K–$170K",
    scores:{skill:5,energy:3,demand:7,comp:9,creator:2,ai:5},
    why:"365 DS cert gave you vocabulary, not engineering ability. Competing with people who ship production ML daily.",
    redFlag:"RED DRESS. High comp is the lure. Your AI knowledge is application-layer, not infrastructure-layer.",
    workflows:[
      {task:"Build and deploy ML models to production",type:"Human",freq:"Daily",cat:"Engineering",tools:"Python, PyTorch, AWS/GCP"},
      {task:"Write and optimize data pipelines",type:"Human",freq:"Daily",cat:"Engineering",tools:"Spark, dbt, Airflow, SQL"},
      {task:"Monitor model performance in production",type:"Hybrid",freq:"Daily",cat:"Analytics",tools:"MLflow, Datadog, W&B"},
      {task:"Write unit tests and validate model outputs",type:"Human",freq:"Weekly",cat:"Engineering",tools:"pytest, GitHub, CI/CD"},
    ],
    metrics:[
      {name:"Model Latency",desc:"Milliseconds for model to return prediction",impact:"Production performance metric"},
      {name:"Model Uptime",desc:"% of time model is serving predictions correctly",impact:"Reliability of your engineering"},
    ],
    seniority:{
      entry:["Assist model deployment","Write data pipelines"],
      mid:["Own model deployment end-to-end","Build monitoring systems"],
      senior:["Set ML platform strategy","Lead ML engineering team"],
    },
    overlap:[
      {task:"Build and deploy ML models",match:"Emerging",note:"MSBA concepts + 365 DS cert. Not production-ready. Course knowledge ≠ engineering ability."},
    ],
  },
  {
    id:"swe", rank:20, tier:3, score:27, icon:"⛔",
    title:"Software Engineer", short:"SWE",
    color:"#DC2626", colorLight:"#FEF2F2", colorDark:"#991B1B",
    salary:"$110K–$160K",
    scores:{skill:4,energy:3,demand:8,comp:9,creator:2,ai:5},
    why:"You build apps with AI tools. That is not production-grade software engineering.",
    redFlag:"RED DRESS. Highest trap score. 'I build things so I could do this.' No. Different skill entirely.",
    workflows:[
      {task:"Write and review production-grade code",type:"Human",freq:"Daily",cat:"Engineering",tools:"VS Code, GitHub, CI/CD"},
      {task:"Debug and fix production bugs",type:"Human",freq:"Daily",cat:"Engineering",tools:"Datadog, Sentry, GitHub"},
      {task:"Participate in code reviews",type:"Human",freq:"Daily",cat:"Collab",tools:"GitHub PRs, Slack"},
      {task:"Design system architecture",type:"Human",freq:"Weekly",cat:"Strategy",tools:"Miro, Notion, system design docs"},
      {task:"Participate in on-call rotation",type:"Human",freq:"Weekly",cat:"Engineering",tools:"PagerDuty, Datadog, Slack"},
    ],
    metrics:[
      {name:"PR Merge Rate",desc:"PRs merged vs opened per sprint",impact:"Your coding output velocity"},
      {name:"Bug Rate",desc:"Bugs introduced per 1K lines of code",impact:"Quality of your engineering"},
    ],
    seniority:{
      entry:["Fix assigned bugs","Write small features","Pair program with seniors"],
      mid:["Own features end-to-end","Lead small projects","Mentor juniors"],
      senior:["Set technical architecture","Lead engineering team"],
    },
    overlap:[
      {task:"Write production-grade code",match:"Emerging",note:"35 apps with AI tools. But AI-assisted building ≠ production software engineering."},
    ],
  },
  {
    id:"ai-ops", rank:21, tier:2, score:40, icon:"🤖",
    title:"AI Operations Manager", short:"AI Ops",
    color:"#7C3AED", colorLight:"#EDE9FE", colorDark:"#5B21B6",
    salary:"$90K–$135K",
    scores:{skill:7,energy:7,demand:7,comp:7,creator:6,ai:9},
    why:"Bridge role between business and AI implementation. Your MSBA + 35 AI apps + consulting background make this a natural fit.",
    redFlag:null,
    workflows:[
      {task:"Audit existing workflows for AI automation opportunities",type:"Hybrid",freq:"Monthly",cat:"Strategy",tools:"Notion, Miro, Claude"},
      {task:"Design and implement AI-powered process improvements",type:"Hybrid",freq:"Weekly",cat:"Strategy",tools:"Claude, Zapier, Make, Python"},
      {task:"Manage AI tool stack selection and vendor evaluation",type:"Human",freq:"Monthly",cat:"Research",tools:"G2, vendor demos, Notion"},
      {task:"Build prompt libraries and AI usage guidelines",type:"Hybrid",freq:"Weekly",cat:"Enablement",tools:"Claude, Notion, GitHub"},
      {task:"Train teams on AI tools and best practices",type:"Human",freq:"Weekly",cat:"Enablement",tools:"Loom, Slides, Zoom, Notion"},
      {task:"Monitor AI tool performance, costs, and ROI",type:"Hybrid",freq:"Weekly",cat:"Analytics",tools:"Dashboards, Excel, Looker"},
      {task:"Ensure AI compliance with data privacy and governance",type:"Human",freq:"Monthly",cat:"Compliance",tools:"Notion, legal docs, audit logs"},
      {task:"Coordinate cross-functional AI adoption roadmap",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Miro, Slides"},
    ],
    metrics:[
      {name:"Process Automation Rate",desc:"% of workflows automated with AI",impact:"Core measure of your operational impact"},
      {name:"AI Tool Adoption Rate",desc:"% of team actively using AI tools",impact:"Shows if your enablement is landing"},
      {name:"Cost Savings from AI",desc:"$ saved via AI-driven efficiency gains",impact:"Direct ROI of your function"},
      {name:"Time-to-Automate",desc:"Days from identifying opportunity to live automation",impact:"Speed of your AI implementation cycles"},
    ],
    seniority:{
      entry:["Document AI use cases","Assist tool evaluations","Support training sessions"],
      mid:["Own AI ops roadmap","Lead tool selection","Run training programs","Track ROI"],
      senior:["Set enterprise AI strategy","Build AI ops team","Report to C-suite on AI transformation"],
    },
    overlap:[
      {task:"Audit workflows for AI opportunities",match:"Strong",note:"35 AI apps built. You live this daily. Built AI workflows across content, research, outreach."},
      {task:"Train teams on AI tools",match:"Strong",note:"Content creator teaching AI use. Ghostwriting Academy. Natural teacher energy."},
      {task:"Build prompt libraries and guidelines",match:"Strong",note:"Heavy Claude user. Built prompt workflows for research, writing, audits."},
      {task:"Monitor AI tool costs and ROI",match:"Moderate",note:"MSBA analytics background. Needs enterprise-scale AI budget experience."},
      {task:"AI compliance and governance",match:"Emerging",note:"Conceptual understanding. No formal data governance or compliance ownership yet."},
    ],
  },
  {
    id:"ai-consultant", rank:22, tier:1, score:46, icon:"🧠",
    title:"AI Consultant", short:"AI Consult",
    color:"#0891B2", colorLight:"#CFFAFE", colorDark:"#155E75",
    salary:"$100K–$160K",
    scores:{skill:8,energy:8,demand:8,comp:8,creator:7,ai:9},
    why:"Accenture consulting DNA + MSBA + hands-on AI building = rare hybrid. You can advise AND demo. Most consultants can't.",
    redFlag:null,
    workflows:[
      {task:"Conduct AI readiness assessments for clients",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"Notion, Miro, Claude, surveys"},
      {task:"Identify and prioritize AI use cases by business impact",type:"Hybrid",freq:"Monthly",cat:"Strategy",tools:"Miro, Claude, Excel"},
      {task:"Build AI proof-of-concepts and demos",type:"Hybrid",freq:"Weekly",cat:"Engineering",tools:"Claude, Python, Cursor, APIs"},
      {task:"Design AI implementation roadmaps",type:"Human",freq:"Quarterly",cat:"Strategy",tools:"Notion, Slides, Miro"},
      {task:"Present findings and recommendations to executives",type:"Human",freq:"Monthly",cat:"Collab",tools:"Slides, Loom, Zoom"},
      {task:"Evaluate AI vendors and build vs. buy decisions",type:"Hybrid",freq:"Monthly",cat:"Research",tools:"G2, vendor demos, Claude"},
      {task:"Train client teams on AI adoption",type:"Human",freq:"Weekly",cat:"Enablement",tools:"Slides, Loom, workshops"},
      {task:"Measure and report AI project ROI",type:"Hybrid",freq:"Monthly",cat:"Analytics",tools:"Excel, Looker, Notion"},
    ],
    metrics:[
      {name:"Client AI Maturity Score Improvement",desc:"Pre/post AI readiness assessment delta",impact:"Did your engagement actually move the needle"},
      {name:"Use Cases Deployed",desc:"# of AI use cases moved from POC to production",impact:"Execution rate, not just slide decks"},
      {name:"Client Satisfaction (CSAT/NPS)",desc:"Post-engagement satisfaction score",impact:"Repeat business and referrals"},
      {name:"Revenue Influenced",desc:"$ of AI-driven impact attributed to your recommendations",impact:"Connects your advice to client bottom line"},
    ],
    seniority:{
      entry:["Support assessments","Build POCs","Document findings"],
      mid:["Own client engagements","Lead AI roadmap workshops","Deliver executive presentations"],
      senior:["Lead AI practice area","Set methodology","Manage consultant team","Drive new business"],
    },
    overlap:[
      {task:"Present recommendations to executives",match:"Strong",note:"Accenture: stakeholder decks to directors. Bino: client pitches. This is muscle memory."},
      {task:"Build AI proof-of-concepts",match:"Strong",note:"35 AI apps. You build faster than most consultants can write the proposal."},
      {task:"Conduct AI readiness assessments",match:"Strong",note:"Accenture business analysis + MSBA + daily AI usage = can assess from both sides."},
      {task:"Train client teams on AI adoption",match:"Strong",note:"Creator + teacher energy. Already teach AI concepts through content."},
      {task:"Evaluate vendors and build vs. buy",match:"Moderate",note:"Used 50+ AI tools. Needs formal enterprise procurement experience."},
    ],
  },
  {
    id:"sap-early", rank:23, tier:2, score:37, icon:"🏢",
    title:"SAP Early Career Consultant", short:"SAP Early",
    color:"#EA580C", colorLight:"#FFF7ED", colorDark:"#9A3412",
    salary:"$65K–$95K",
    scores:{skill:6,energy:5,demand:7,comp:5,creator:3,ai:4},
    why:"Accenture pedigree + MSBA makes you qualified on paper. SAP early career programs hire for consulting DNA, not SAP expertise.",
    redFlag:"Comp ceiling is low early. Daily work is highly structured ERP configuration — low creative energy. But it's a stable on-ramp with clear progression.",
    workflows:[
      {task:"Learn SAP modules (S/4HANA, MM, SD, FI/CO)",type:"Human",freq:"Daily",cat:"Learning",tools:"SAP Learning Hub, openSAP, practice systems"},
      {task:"Configure SAP modules per business requirements",type:"Human",freq:"Daily",cat:"Engineering",tools:"SAP GUI, SAP Fiori, config docs"},
      {task:"Gather and document business process requirements",type:"Human",freq:"Weekly",cat:"Research",tools:"Notion, Visio, Miro, workshops"},
      {task:"Support data migration and system testing",type:"Hybrid",freq:"Weekly",cat:"Data",tools:"SAP LSMW, Excel, SQL, test scripts"},
      {task:"Create functional specs and training documentation",type:"Hybrid",freq:"Weekly",cat:"Writing",tools:"Confluence, Word, Notion"},
      {task:"Support go-live cutover activities",type:"Human",freq:"Quarterly",cat:"Collab",tools:"War room, checklists, Slack"},
      {task:"Attend SAP certification training",type:"Human",freq:"Quarterly",cat:"Learning",tools:"SAP Learning Hub, classroom"},
    ],
    metrics:[
      {name:"Certification Progress",desc:"SAP certs completed vs. plan",impact:"Your marketability and billable rate"},
      {name:"Configuration Accuracy",desc:"% of configs passing UAT first time",impact:"Quality of your technical work"},
      {name:"Client Satisfaction",desc:"Post-project CSAT from client stakeholders",impact:"Your consulting effectiveness"},
      {name:"Billable Utilization",desc:"% of time spent on client-billable work",impact:"Core consulting performance metric"},
    ],
    seniority:{
      entry:["Learn SAP modules","Assist configuration","Document requirements","Support testing"],
      mid:["Own module configuration","Lead workstreams","Mentor junior consultants"],
      senior:["Lead full SAP implementations","Solution architect","Manage delivery teams"],
    },
    overlap:[
      {task:"Gather and document business requirements",match:"Strong",note:"Accenture core skill. Requirements gathering, stakeholder workshops, process mapping."},
      {task:"Create functional specs and training docs",match:"Strong",note:"Accenture documentation + MSBA writing. Clear, structured communication."},
      {task:"Support go-live cutover activities",match:"Moderate",note:"Accenture project experience. Understands delivery cycles and war rooms."},
      {task:"Configure SAP modules",match:"Emerging",note:"No SAP experience. Early career programs train from scratch — consulting DNA matters more."},
      {task:"Data migration and testing",match:"Moderate",note:"MSBA data skills + SQL. Migration tooling is learnable."},
    ],
  },
];

// ─── STYLE TOKENS ─────────────────────────────────────────────────────────────
const BG     = "#F8F7F4";
const CARD   = "#FFFFFF";
const BORDER = "#E5E3DE";
const TEXT   = "#1A1A1A";
const TEXT2  = "#4A4A4A";
const TEXT3  = "#8A8A8A";

const TYPE_STYLE = {
  AI:     {bg:"#ECFDF5", text:"#065F46", border:"#6EE7B7"},
  Hybrid: {bg:"#FFFBEB", text:"#92400E", border:"#FCD34D"},
  Human:  {bg:"#EFF6FF", text:"#1E40AF", border:"#93C5FD"},
};
const FREQ_STYLE = {
  Daily:      {bg:"#FEF2F2", text:"#991B1B", border:"#FECACA"},
  Weekly:     {bg:"#FFF7ED", text:"#C2410C", border:"#FED7AA"},
  Monthly:    {bg:"#EFF6FF", text:"#1D4ED8", border:"#BFDBFE"},
  Quarterly:  {bg:"#F5F3FF", text:"#5B21B6", border:"#DDD6FE"},
  "As needed":{bg:"#F9FAFB", text:"#6B7280", border:"#E5E7EB"},
};
const MATCH_STYLE = {
  Strong:   {bg:"#ECFDF5", text:"#065F46", dot:"#10B981"},
  Moderate: {bg:"#FFFBEB", text:"#92400E", dot:"#F59E0B"},
  Emerging: {bg:"#FEF2F2", text:"#991B1B", dot:"#EF4444"},
};
const TIER_STYLE = {
  1:{label:"GO GET IT", bg:"#ECFDF5", text:"#065F46"},
  2:{label:"VIABLE",    bg:"#FFFBEB", text:"#92400E"},
  3:{label:"AVOID",     bg:"#FEF2F2", text:"#991B1B"},
};
const DIM_LABELS = {skill:"Skill",energy:"Energy",demand:"Demand",comp:"Comp",creator:"Creator",ai:"AI Proof"};

const Chip = ({bg, text, border, children, small}) => (
  <span style={{
    display:"inline-block", padding:small?"2px 6px":"3px 9px",
    borderRadius:"4px", background:bg, color:text,
    border:`1px solid ${border}`, fontSize:small?"9px":"10px",
    fontWeight:600, letterSpacing:"0.02em", whiteSpace:"nowrap",
    lineHeight:"1.4",
  }}>{children}</span>
);

export default function SiddRoleOS() {
  const [activeId, setActiveId]   = useState("pmm");
  const [view, setView]           = useState("master");
  const [dView, setDView]         = useState("workflows");
  const [typeF, setTypeF]         = useState("All");
  const [freqF, setFreqF]         = useState("All");
  const [senLevel, setSenLevel]   = useState("mid");

  const role = ROLES.find(r => r.id === activeId);
  const tier = TIER_STYLE[role.tier];

  const wfFiltered = role.workflows.filter(w =>
    (typeF==="All"||w.type===typeF) && (freqF==="All"||w.freq===freqF)
  );
  const wfWeekly   = role.workflows.filter(w => ["Daily","Weekly"].includes(w.freq));
  const wfPeriodic = role.workflows.filter(w => !["Daily","Weekly"].includes(w.freq));

  const btn = (active, color, onClick, label) => (
    <button onClick={onClick} style={{
      padding:"6px 13px", borderRadius:"6px", cursor:"pointer",
      border: active ? `1.5px solid ${color}` : `1.5px solid ${BORDER}`,
      background: active ? color : CARD,
      color: active ? "#FFFFFF" : TEXT2,
      fontSize:"11px", fontWeight:600, letterSpacing:"0.02em",
      transition:"all 0.12s",
    }}>{label}</button>
  );

  const filterBtn = (val, current, setter, bg, text, border, label) => {
    const active = current === val;
    return (
      <button onClick={()=>setter(active ? "All" : val)} style={{
        padding:"3px 8px", borderRadius:"4px", cursor:"pointer",
        border: `1px solid ${active ? border : BORDER}`,
        background: active ? bg : "#FAFAFA",
        color: active ? text : TEXT3,
        fontSize:"9px", fontWeight:600, letterSpacing:"0.03em",
        transition:"all 0.1s",
      }}>{label}</button>
    );
  };

  const WRow = ({w}) => (
    <div style={{background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"12px 16px", marginBottom:"6px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div style={{display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:"8px", alignItems:"center"}}>
        <div>
          <div style={{fontSize:"13px", color:TEXT, fontWeight:500, marginBottom:"3px"}}>{w.task}</div>
          <div style={{fontSize:"10px", color:TEXT3}}>{w.tools}</div>
        </div>
        <Chip bg="#F9FAFB" text={TEXT3} border={BORDER} small>{w.cat}</Chip>
        <Chip {...FREQ_STYLE[w.freq]||FREQ_STYLE["As needed"]} small>{w.freq}</Chip>
        <Chip {...TYPE_STYLE[w.type]} small>{w.type}</Chip>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Georgia', 'Times New Roman', serif", background:BG, minHeight:"100vh", color:TEXT, padding:"24px 20px", maxWidth:"960px", margin:"0 auto"}}>

      {/* HEADER */}
      <div style={{marginBottom:"22px", paddingBottom:"16px", borderBottom:`2px solid ${BORDER}`}}>
        <div style={{fontSize:"10px", letterSpacing:"0.2em", color:TEXT3, textTransform:"uppercase", marginBottom:"6px", fontFamily:"'Courier New', monospace"}}>
          Sidd's Role OS — 20 Roles Ranked
        </div>
        <div style={{fontSize:"22px", fontWeight:700, lineHeight:1.25, color:TEXT, fontFamily:"Georgia, serif"}}>
          What does the job actually demand?<br/>
          <span style={{color:role.color}}>JD-sourced. Proof points mapped. Rank ordered.</span>
        </div>
      </div>

      {/* TOP NAV */}
      <div style={{display:"flex", gap:"8px", marginBottom:"18px"}}>
        {btn(view==="master", "#1A1A1A", ()=>setView("master"), "📊 Master Rank")}
        {btn(view==="detail", role.color, ()=>setView("detail"), "🔍 Role Detail")}
        {view==="detail" && <span style={{marginLeft:"auto", fontSize:"11px", color:TEXT3, alignSelf:"center", fontFamily:"'Courier New', monospace"}}>Viewing: {role.short}</span>}
      </div>

      {/* ── MASTER RANK ── */}
      {view==="master" && (
        <div>
          {/* Score key */}
          <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"14px", padding:"10px 14px", background:CARD, borderRadius:"8px", border:`1px solid ${BORDER}`}}>
            <span style={{fontSize:"9px", color:TEXT3, letterSpacing:"0.1em", textTransform:"uppercase", alignSelf:"center", fontFamily:"'Courier New', monospace"}}>Scoring /10:</span>
            {Object.entries(DIM_LABELS).map(([k,v])=>(
              <span key={k} style={{fontSize:"10px", color:TEXT2}}><strong style={{color:TEXT}}>{v}</strong></span>
            ))}
            <span style={{fontSize:"9px", color:TEXT3, marginLeft:"auto"}}>Click any role → detail view</span>
          </div>

          {ROLES.map(r => {
            const t = TIER_STYLE[r.tier];
            const isActive = r.id === activeId;
            const barW = (r.score/60)*100;
            return (
              <div key={r.id}
                onClick={()=>{setActiveId(r.id); setView("detail"); setDView("workflows");}}
                style={{
                  background: isActive ? r.colorLight : CARD,
                  border: `1.5px solid ${isActive ? r.color : BORDER}`,
                  borderRadius:"10px", padding:"13px 16px", marginBottom:"6px",
                  cursor:"pointer", transition:"all 0.12s",
                  boxShadow: isActive ? `0 2px 12px ${r.color}25` : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{display:"grid", gridTemplateColumns:"32px 32px 1fr auto auto", gap:"10px", alignItems:"center"}}>
                  <div style={{fontSize:"13px", fontWeight:700, color:TEXT3, fontFamily:"'Courier New', monospace"}}>#{r.rank}</div>
                  <div style={{fontSize:"18px"}}>{r.icon}</div>
                  <div>
                    <div style={{fontSize:"13px", fontWeight:700, color: isActive ? r.color : TEXT, marginBottom:"5px"}}>{r.title}</div>
                    <div style={{display:"flex", gap:"6px", alignItems:"center", flexWrap:"wrap"}}>
                      {/* Score bar */}
                      <div style={{width:"90px", height:"4px", background:BORDER, borderRadius:"2px", overflow:"hidden"}}>
                        <div style={{width:`${barW}%`, height:"100%", background: r.tier===3 ? "#D1D5DB" : r.color, borderRadius:"2px"}}/>
                      </div>
                      <span style={{fontSize:"10px", color:TEXT3, fontFamily:"'Courier New', monospace", fontWeight:700}}>{r.score}/60</span>
                      {/* 6 score chips */}
                      {Object.entries(r.scores).map(([k,v])=>(
                        <span key={k} title={DIM_LABELS[k]} style={{
                          display:"inline-block", padding:"1px 5px", borderRadius:"3px",
                          background: v >= 8 ? "#ECFDF5" : v >= 6 ? "#FFFBEB" : "#F9FAFB",
                          color: v >= 8 ? "#065F46" : v >= 6 ? "#92400E" : "#6B7280",
                          fontSize:"9px", fontWeight:700, border:`1px solid ${v>=8?"#A7F3D0":v>=6?"#FDE68A":"#E5E7EB"}`,
                        }}>{v}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{padding:"4px 10px", borderRadius:"5px", background:t.bg, color:t.text, fontSize:"9px", fontWeight:700, letterSpacing:"0.06em", whiteSpace:"nowrap", border:`1px solid ${t.text}30`}}>
                    T{r.tier} {t.label}
                  </span>
                  <span style={{fontSize:"11px", color:TEXT3, whiteSpace:"nowrap"}}>{r.salary.split("–")[0]}+</span>
                </div>
                {r.redFlag && (
                  <div style={{marginTop:"8px", fontSize:"10px", color:"#991B1B", background:"#FEF2F2", padding:"5px 10px", borderRadius:"4px", border:"1px solid #FECACA"}}>
                    ⚠ {r.redFlag}
                  </div>
                )}
                {isActive && (
                  <div style={{marginTop:"8px", fontSize:"11px", color:r.colorDark, background:r.colorLight, padding:"5px 10px", borderRadius:"4px", border:`1px solid ${r.color}40`}}>
                    {r.why}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── DETAIL VIEW ── */}
      {view==="detail" && (
        <div>
          {/* Role selector */}
          <div style={{display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"14px", padding:"10px", background:CARD, borderRadius:"8px", border:`1px solid ${BORDER}`}}>
            {ROLES.map(r => (
              <button key={r.id} onClick={()=>{setActiveId(r.id); setTypeF("All"); setFreqF("All"); setDView("workflows");}} style={{
                padding:"4px 8px", borderRadius:"5px", cursor:"pointer",
                border: activeId===r.id ? `1.5px solid ${r.color}` : `1px solid ${BORDER}`,
                background: activeId===r.id ? r.colorLight : "#FAFAFA",
                color: activeId===r.id ? r.colorDark : TEXT3,
                fontSize:"9px", fontWeight:700, transition:"all 0.1s",
              }}>
                {r.icon} #{r.rank} {r.short}
              </button>
            ))}
          </div>

          {/* Role header card */}
          <div style={{background:role.colorLight, border:`2px solid ${role.color}`, borderRadius:"12px", padding:"18px 20px", marginBottom:"14px", boxShadow:`0 2px 12px ${role.color}20`}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr auto", gap:"12px", alignItems:"start", marginBottom:"14px"}}>
              <div>
                <div style={{fontSize:"18px", fontWeight:700, color:role.colorDark, marginBottom:"5px"}}>{role.icon} #{role.rank} — {role.title}</div>
                <div style={{fontSize:"12px", color:role.colorDark, lineHeight:1.6, opacity:0.85}}>{role.why}</div>
                {role.redFlag && (
                  <div style={{marginTop:"8px", fontSize:"11px", color:"#991B1B", background:"#FEF2F2", padding:"6px 10px", borderRadius:"5px", border:"1px solid #FECACA"}}>
                    ⚠ {role.redFlag}
                  </div>
                )}
              </div>
              <div style={{textAlign:"right", flexShrink:0}}>
                <div style={{padding:"5px 12px", borderRadius:"6px", background:tier.bg, color:tier.text, fontSize:"10px", fontWeight:700, letterSpacing:"0.08em", border:`1px solid ${tier.text}40`, marginBottom:"6px"}}>
                  TIER {role.tier} — {tier.label}
                </div>
                <div style={{fontSize:"13px", color:role.colorDark, fontWeight:600}}>{role.salary}</div>
                <div style={{fontSize:"10px", color:TEXT3, marginTop:"2px", fontFamily:"'Courier New', monospace"}}>{role.score}/60 match score</div>
              </div>
            </div>
            {/* Score dimension bars */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:"6px"}}>
              {Object.entries(role.scores).map(([k,v])=>(
                <div key={k} style={{background:"rgba(255,255,255,0.7)", borderRadius:"6px", padding:"7px 9px", border:`1px solid ${role.color}30`}}>
                  <div style={{fontSize:"8px", color:TEXT3, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"5px", fontFamily:"'Courier New', monospace"}}>{DIM_LABELS[k]}</div>
                  <div style={{display:"flex", gap:"5px", alignItems:"center"}}>
                    <div style={{flex:1, height:"4px", background:"rgba(0,0,0,0.1)", borderRadius:"2px", overflow:"hidden"}}>
                      <div style={{width:`${v*10}%`, height:"100%", background:role.color}}/>
                    </div>
                    <span style={{fontSize:"11px", color:role.colorDark, fontWeight:700}}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail tabs */}
          <div style={{display:"flex", gap:"6px", marginBottom:"14px", flexWrap:"wrap"}}>
            {[["workflows","Workflows"],["weekly","Weekly View"],["metrics","Key Metrics"],["overlap","My Overlap"],["seniority","Seniority"]].map(([v,label])=>(
              <button key={v} onClick={()=>setDView(v)} style={{
                padding:"7px 14px", borderRadius:"6px", cursor:"pointer",
                border: dView===v ? `1.5px solid ${role.color}` : `1.5px solid ${BORDER}`,
                background: dView===v ? role.color : CARD,
                color: dView===v ? "#FFF" : TEXT2,
                fontSize:"11px", fontWeight:600, letterSpacing:"0.02em",
                transition:"all 0.12s",
              }}>{label}</button>
            ))}
          </div>

          {/* WORKFLOWS */}
          {dView==="workflows" && (
            <>
              <div style={{display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"10px", alignItems:"center"}}>
                <span style={{fontSize:"9px", color:TEXT3, fontFamily:"'Courier New', monospace"}}>TYPE:</span>
                {["All","AI","Hybrid","Human"].map(f=>{
                  const s = f==="All" ? {bg:CARD,text:TEXT2,border:BORDER} : TYPE_STYLE[f];
                  return filterBtn(f, typeF, setTypeF, s.bg, s.text, s.border||BORDER, f);
                })}
                <div style={{width:"1px", height:"18px", background:BORDER, margin:"0 3px"}}/>
                <span style={{fontSize:"9px", color:TEXT3, fontFamily:"'Courier New', monospace"}}>FREQ:</span>
                {["All","Daily","Weekly","Monthly","Quarterly"].map(f=>{
                  const s = f==="All" ? {bg:CARD,text:TEXT2,border:BORDER} : FREQ_STYLE[f];
                  return filterBtn(f, freqF, setFreqF, s.bg, s.text, s.border||BORDER, f);
                })}
              </div>
              <div style={{fontSize:"10px", color:TEXT3, marginBottom:"8px", fontFamily:"'Courier New', monospace"}}>{wfFiltered.length} workflows shown</div>
              {wfFiltered.map((w,i) => <WRow key={i} w={w}/>)}
            </>
          )}

          {/* WEEKLY VIEW */}
          {dView==="weekly" && (
            <div>
              <div style={{display:"flex", gap:"7px", alignItems:"center", marginBottom:"10px"}}>
                <div style={{width:"8px", height:"8px", borderRadius:"50%", background:"#EA580C"}}/>
                <span style={{fontSize:"10px", fontWeight:700, color:TEXT2, letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"'Courier New', monospace"}}>Daily + Weekly Core Workload</span>
              </div>
              {wfWeekly.map((w,i) => <WRow key={i} w={w}/>)}
              <div style={{display:"flex", gap:"7px", alignItems:"center", margin:"20px 0 10px"}}>
                <div style={{width:"8px", height:"8px", borderRadius:"50%", background:"#7C3AED"}}/>
                <span style={{fontSize:"10px", fontWeight:700, color:TEXT2, letterSpacing:"0.06em", textTransform:"uppercase", fontFamily:"'Courier New', monospace"}}>Monthly + Quarterly Periodic Work</span>
              </div>
              {wfPeriodic.map((w,i) => (
                <div key={i} style={{opacity:0.65}}><WRow w={w}/></div>
              ))}
            </div>
          )}

          {/* METRICS */}
          {dView==="metrics" && (
            <div>
              <div style={{fontSize:"10px", color:TEXT3, marginBottom:"10px", fontFamily:"'Courier New', monospace", textTransform:"uppercase", letterSpacing:"0.08em"}}>
                {role.metrics.length} key metrics — what you're actually measured on
              </div>
              {role.metrics.map((m,i) => (
                <div key={i} style={{background:CARD, border:`1px solid ${BORDER}`, borderRadius:"9px", padding:"15px 18px", marginBottom:"8px", boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px"}}>
                    <div style={{fontSize:"15px", fontWeight:700, color:role.color}}>{m.name}</div>
                    <div style={{padding:"2px 8px", borderRadius:"3px", background:role.colorLight, color:role.colorDark, fontSize:"9px", fontWeight:700, fontFamily:"'Courier New', monospace"}}>METRIC {i+1}</div>
                  </div>
                  <div style={{fontSize:"12px", color:TEXT2, marginBottom:"7px"}}>{m.desc}</div>
                  <div style={{fontSize:"11px", color:TEXT3, borderLeft:`3px solid ${role.color}`, paddingLeft:"10px"}}>
                    {m.impact}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* OVERLAP */}
          {dView==="overlap" && (
            <div>
              <div style={{fontSize:"10px", color:TEXT3, marginBottom:"10px", fontFamily:"'Courier New', monospace", textTransform:"uppercase", letterSpacing:"0.08em"}}>
                Your past experience mapped against this role's core workflows
              </div>
              {role.overlap.map((o,i) => {
                const ms = MATCH_STYLE[o.match];
                return (
                  <div key={i} style={{background:CARD, border:`1px solid ${BORDER}`, borderRadius:"9px", padding:"13px 16px", marginBottom:"7px", boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"10px", marginBottom:"6px"}}>
                      <div style={{fontSize:"13px", color:TEXT, fontWeight:500, flex:1}}>{o.task}</div>
                      <span style={{padding:"3px 9px", borderRadius:"4px", background:ms.bg, color:ms.text, fontSize:"9px", fontWeight:700, border:`1px solid ${ms.dot}50`, whiteSpace:"nowrap"}}>
                        ● {o.match.toUpperCase()}
                      </span>
                    </div>
                    <div style={{fontSize:"11px", color:TEXT2, borderLeft:`3px solid ${ms.dot}`, paddingLeft:"10px"}}>
                      {o.note}
                    </div>
                  </div>
                );
              })}
              <div style={{background:"#F9FAFB", border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"13px 15px", marginTop:"14px"}}>
                <div style={{fontSize:"10px", color:TEXT3, marginBottom:"8px", fontFamily:"'Courier New', monospace", textTransform:"uppercase", letterSpacing:"0.06em"}}>Past roles used for this mapping</div>
                {[
                  ["Accenture – Data & AI Consulting","Stakeholder reports, Power BI dashboards, cross-functional delivery, process documentation"],
                  ["Bino Productions – Co-founder","Creative direction, photo/video production, client strategy presentations, pricing and packages"],
                  ["Wayfair Comet Externship","Built AI moodboard generator (n8n + Gemini), documented and published build on LinkedIn"],
                  ["Ghostwriting & Email Marketing","5-day email course, 30%+ opt-in rates, Nicolas Cole + Dickie Bush frameworks"],
                  ["35 AI Studio Apps","Built apps across content creation, productivity, career tools, education — published proof of work"],
                ].map(([role_name, detail]) => (
                  <div key={role_name} style={{marginBottom:"7px"}}>
                    <div style={{fontSize:"11px", fontWeight:700, color:TEXT2}}>{role_name}</div>
                    <div style={{fontSize:"10px", color:TEXT3, marginTop:"2px"}}>{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SENIORITY */}
          {dView==="seniority" && (
            <div>
              <div style={{display:"flex", gap:"7px", marginBottom:"14px"}}>
                {[["entry","Entry (0–2 yrs)"],["mid","Mid Level ← your zone"],["senior","Senior+ (5+ yrs)"]].map(([lvl,label])=>(
                  <button key={lvl} onClick={()=>setSenLevel(lvl)} style={{
                    padding:"7px 14px", borderRadius:"6px", cursor:"pointer",
                    border: senLevel===lvl ? `1.5px solid ${role.color}` : `1.5px solid ${BORDER}`,
                    background: senLevel===lvl ? role.color : CARD,
                    color: senLevel===lvl ? "#FFF" : TEXT2,
                    fontSize:"11px", fontWeight:600, transition:"all 0.12s",
                  }}>{label}</button>
                ))}
              </div>
              <div style={{background:CARD, border:`1.5px solid ${role.color}`, borderRadius:"10px", padding:"18px 20px", boxShadow:`0 2px 10px ${role.color}18`}}>
                {role.seniority[senLevel].map((item,i) => (
                  <div key={i} style={{display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:"11px"}}>
                    <div style={{width:"6px", height:"6px", borderRadius:"50%", background:role.color, marginTop:"6px", flexShrink:0}}/>
                    <div style={{fontSize:"13px", color:TEXT, lineHeight:1.5}}>{item}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:"12px", fontSize:"11px", color:TEXT3, padding:"10px 14px", background:"#F9FAFB", borderRadius:"7px", border:`1px solid ${BORDER}`, lineHeight:1.6}}>
                Inference: Accenture + MSBA positions you at strong entry or low-mid for most Tier 1 roles. Bino + ghostwriting + 35 apps = differentiated proof most applicants lack. The gap isn't credentials. It's live application history inside these specific roles.
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div style={{marginTop:"24px", padding:"12px 16px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", display:"flex", gap:"14px", flexWrap:"wrap", alignItems:"center"}}>
        <span style={{fontSize:"9px", color:TEXT3, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:"'Courier New', monospace"}}>Legend</span>
        {Object.entries(FREQ_STYLE).filter(([k])=>k!=="As needed").map(([f,s])=>(
          <div key={f} style={{display:"flex", alignItems:"center", gap:"5px"}}>
            <div style={{width:"6px", height:"6px", borderRadius:"50%", background:s.text}}/>
            <span style={{fontSize:"10px", color:TEXT3}}>{f}</span>
          </div>
        ))}
        {Object.entries(MATCH_STYLE).map(([m,s])=>(
          <div key={m} style={{display:"flex", alignItems:"center", gap:"5px"}}>
            <div style={{width:"6px", height:"6px", borderRadius:"50%", background:s.dot}}/>
            <span style={{fontSize:"10px", color:TEXT3}}>{m}</span>
          </div>
        ))}
        <span style={{marginLeft:"auto", fontSize:"9px", color:TEXT3, fontFamily:"'Courier New', monospace"}}>📊 Master Rank · 🔍 Role Detail · 5 tabs per role · 20 roles total</span>
      </div>
    </div>
  );
}
