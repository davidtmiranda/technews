"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Page() {
  const [isBot, setIsBot] = useState(false);

  // Add these functions at component scope
  const getUrlParams = () => {
    return new URLSearchParams(window.location.search);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const appendParamsToUrl = (baseUrl: string) => {
    const params = getUrlParams();
    const url = new URL(baseUrl);
    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  };

  useEffect(() => {
    // Enhanced bot detection
    const detectBot = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const botPatterns = [
        "facebookexternalhit",
        "facebookbot",
        "facebook",
        "bot",
        "crawler",
        "spider",
        "headless",
        "scraper",
        "whatsapp",
        "telegrambot",
        "slackbot",
        "linkedinbot",
        "twitterbot",
      ];

      // Check user agent
      if (botPatterns.some((pattern) => userAgent.includes(pattern))) {
        return true;
      }

      // Check for common bot behaviors
      if (
        !window.localStorage ||
        !window.sessionStorage ||
        !window.WebSocket ||
        !window.indexedDB ||
        !window.document.cookie ||
        !window.history
      ) {
        return true;
      }

      // Check for Facebook's specific properties
      if (
        (window as any).fb_bridge ||
        (window as any)._fb ||
        (window as any).FB ||
        document.referrer.includes("facebook.com")
      ) {
        return true;
      }

      return false;
    };

    setIsBot(detectBot());

    // URL parameter functions
    const getUrlParams = () => {
      return new URLSearchParams(window.location.search);
    };

    const appendParamsToUrl = (baseUrl: string) => {
      const params = getUrlParams();
      const url = new URL(baseUrl);
      params.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      return url.toString();
    };

    // Track Facebook pixel
    const trackElvianClick = () => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }
    };

    // Scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll("[data-animate]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("opacity-0");
              entry.target.classList.add("animate-fadeIn");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      elements.forEach((element) => observer.observe(element));
    };

    // Initialize stat cards
    const initStatCards = () => {
      const cards = document.querySelectorAll(".stat-card");
      const baseClasses = [
        "p-6",
        "rounded-lg",
        "bg-white",
        "border",
        "transition-all",
        "duration-200",
        "transform",
      ];

      cards.forEach((card) => {
        if (card.classList.contains("success")) {
          card.classList.add(
            ...baseClasses,
            "border-primary/10",
            "hover:border-primary/20",
            "hover:shadow-md",
            "hover:scale-102"
          );
        } else if (card.classList.contains("testimonial")) {
          card.classList.add(
            ...baseClasses,
            "border-gray-100",
            "hover:border-primary/20",
            "hover:shadow-md",
            "hover:scale-101",
            "p-8"
          );
        } else {
          card.classList.add(
            ...baseClasses,
            "border-gray-100",
            "hover:border-primary/20",
            "hover:shadow-md"
          );
        }
      });
    };

    // Update typography enforcement
    const enforceTypography = () => {
      // Headers
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
        const level = heading.tagName.toLowerCase();
        heading.classList.add(`text-${level}`, "font-sans");
      });

      // Base text
      document.querySelectorAll("p").forEach((p) => {
        if (!p.closest(".stat-card") && !p.closest("blockquote")) {
          p.classList.add("text-base", "font-sans", "text-body");
        }
      });

      // Quotes and testimonials
      document.querySelectorAll("blockquote").forEach((quote) => {
        quote.classList.add(
          "text-quote",
          "font-sans",
          "italic",
          "bg-blue-50/50",
          "p-6",
          "rounded-lg",
          "border-l-4",
          "border-blue-600",
          "my-8"
        );
      });
    };

    // Initialize everything
    animateOnScroll();
    initStatCards();
    enforceTypography();

    // Update all elvian.ai links
    document.querySelectorAll('a[href*="elvian.ai"]').forEach((link) => {
      (link as HTMLAnchorElement).addEventListener("click", (e) => {
        e.preventDefault();
        trackElvianClick();
        window.location.href = appendParamsToUrl(
          (link as HTMLAnchorElement).href
        );
      });
    });

    // Update all buttons that link to elvian.ai
    document
      .querySelectorAll('button[onclick*="elvian.ai"]')
      .forEach((button) => {
        (button as HTMLButtonElement).onclick = () => {
          trackElvianClick();
          window.location.href = appendParamsToUrl("https://elvian.ai");
        };
      });
  }, []);

  return (
    <>
      <Script src="https://cdn.tailwindcss.com" />
      {/* Facebook Pixel Code */}
      <Script id="facebook-pixel">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '879943117666166');
        fbq('track', 'PageView');
      `}</Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "p6zvja4qk6");
      `}</Script>

      {/* Header */}
      <header className="top-0 bg-black backdrop-blur-sm shadow-sm z-40">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-14 border-b border-gray-700 px-4">
            <a href="https://elvian.ai" className="text-white">
              <i className="fas fa-bars"></i>
            </a>
            <div className="font-medium text-lg tracking-wide uppercase text-white">
              Business
            </div>
            <a href="https://elvian.ai" className="text-white">
              <i className="fas fa-search"></i>
            </a>
          </div>
        </div>
      </header>

      {false ? (
        // Content for Facebook robots
        <main className="container mx-auto px-4 py-8">
          <article className="max-w-3xl mx-auto prose prose-lg">
            <h1>
              Silicon Valley CEO's Revolutionary AI Technology Transforms Sales
              Industry
            </h1>

            <p>
              A groundbreaking AI technology developed by a Silicon Valley
              startup is revolutionizing how businesses handle sales operations,
              leading to unprecedented growth and efficiency.
            </p>
            <p>This innovative system has demonstrated remarkable results:</p>
            <ul>
              <li>Revenue increases of up to 300%</li>
              <li>Cost reductions of 85%</li>
              <li>24/7 automated sales operations</li>
              <li>Enhanced customer satisfaction</li>
            </ul>
            <p>
              Industry experts predict this technology will become the new
              standard in sales operations, marking a significant shift in how
              businesses approach customer acquisition and revenue growth.
            </p>

            <div
              id="vid_674a939428086055729cc9b0"
              style={{
                position: "relative",
                width: "100%",
                padding: "64.67065868263472% 0 0",
              }}
            >
              <img
                id="thumb_674a939428086055729cc9b0"
                src="https://images.converteai.net/ef573175-9c9e-49bc-bf68-172f0b6f0005/players/674a939428086055729cc9b0/thumbnail.jpg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                alt="thumbnail"
              />
              <div
                id="backdrop_674a939428086055729cc9b0"
                style={{
                  WebkitBackdropFilter: "blur(5px)",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </div>
            <script type="text/javascript" id="scr_674a939428086055729cc9b0">
              {`var s=document.createElement("script"); s.src="https://scripts.converteai.net/ef573175-9c9e-49bc-bf68-172f0b6f0005/players/674a939428086055729cc9b0/player.js", s.async=!0,document.head.appendChild(s);`}
            </script>
            <style>
              {`.elementor-element:has(#smartplayer) { width: 100%; }`}
            </style>
          </article>
        </main>
      ) : (
        // Regular content for users
        <main className="container mx-auto px-4 md:grid md:grid-cols-[1fr_300px] md:gap-8 mt-8">
          <article className="max-w-reading mx-auto prose prose-lg max-w-none prose-p:text-base prose-p:font-normal prose-p:text-body">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-h1 font-extra-bold text-gray-900 mb-6">
                Silicon Valley CEO's AI Breakthrough Eliminates Need for Sales
                Teams, Triples Revenue
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                As Featured in Forbes, Business Insider, and TechCrunch: How a
                revolutionary AI system is replacing entire sales departments
                while cutting costs by 85% and increasing sales by 300%.
              </p>
            </div>

            {/* First Section */}
            <section className="space-y-8 opacity-0" data-animate>
              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://brasilpgs.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-29-at-15.08.18.jpeg"
                  className="object-cover w-full h-full"
                  alt="AI Technology Illustration"
                />
              </div>

              <div className="space-y-6">
                <p className="text-base font-sans text-body">
                  Michael Chen, founder and CEO of a fast-growing tech company,
                  reveals how he transformed his business from the brink of
                  collapse to explosive growth after discovering an AI solution
                  that's helping thousands of business owners eliminate their
                  dependency on traditional sales teams - while dramatically
                  increasing revenue without the astronomical costs and
                  headaches of managing human sales teams.
                </p>

                <p className="text-base font-sans text-body">
                  Before finding the technology that would transform his company
                  forever, Chen was trapped in what he calls "the modern
                  entrepreneur's nightmare" - a never-ending cycle of hiring,
                  training, and losing salespeople while watching his
                  competition grow faster.
                </p>

                <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                  "I couldn't sleep at night," Chen recalls. "Every morning, I'd
                  check my phone dreading another resignation email. Every
                  evening, I'd look at missed opportunities and leads that died
                  because we couldn't handle the volume. It was like watching
                  money burn while being powerless to stop it."
                </blockquote>
              </div>
            </section>

            {/* Sales Team Trap Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Sales Team Trap: A Silent Business Killer
              </h2>

              <p className="text-base font-sans text-body">
                "What truly exhausts business owners isn't just making sales -
                it's watching opportunities slip away while dealing with endless
                hiring, training, and team management," explains Dr. Alex
                Morrison.
              </p>

              <div className="my-8">
                <h3 className="text-h3 font-semibold text-gray-900 mb-3">
                  The real costs that every business owner knows:
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="stat-card group">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-sans text-gray-600">
                        Base salary + commission
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        $75,000-95,000
                      </span>
                    </div>
                    <span className="text-base font-sans text-gray-600">
                      per year
                    </span>
                  </div>

                  <div className="stat-card group">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-sans text-gray-600">
                        Benefits & overhead
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        $25,000-35,000
                      </span>
                    </div>
                    <span className="text-base font-sans text-gray-600">
                      per year
                    </span>
                  </div>

                  <div className="stat-card group">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-sans text-gray-600">
                        Training & onboarding
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        3-4 months
                      </span>
                    </div>
                    <span className="text-base font-sans text-gray-600">
                      lost productivity
                    </span>
                  </div>

                  <div className="stat-card group">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-sans text-gray-600">
                        Average turnover
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        28%
                      </span>
                    </div>
                    <span className="text-base font-sans text-gray-600">
                      yearly in sales roles
                    </span>
                  </div>

                  <div className="stat-card group md:col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-sans text-gray-600">
                        Coverage
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        Limited to 40-hour work week
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-base font-sans text-body">
                  "Most business owners are living this reality," explains Dr.
                  Morrison, AI Research Director at Stanford's Business
                  Innovation Lab.
                </p>

                <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                  "You invest months getting someone fully trained, and just
                  when they become effective, they leave - taking their
                  knowledge and your investment with them."
                </blockquote>
              </div>
            </section>

            {/* Traditional Solutions Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Traditional Solutions That Make Things Worse
              </h2>

              <p className="text-base font-sans text-body">
                Every business owner knows this story. You try everything:
              </p>

              <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                "First, you hire more people. Then you need better CRM systems
                to manage them. More training programs to keep them effective.
                Higher commissions to retain them. And finally, managers to
                manage the managers," Chen explains, shaking his head.
              </blockquote>

              <div className="my-8">
                <h3 className="text-h3 font-semibold text-gray-900 mb-3">
                  The real cost? It gets worse with each "solution":
                </h3>

                <div className="grid gap-4">
                  <div className="stat-card group hover:scale-[1.02]">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-base font-sans text-gray-600">
                        New sales rep cost before first sale
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        $100k+
                      </span>
                    </div>
                  </div>

                  <div className="stat-card group hover:scale-[1.02]">
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-base font-sans text-gray-600">
                        CRM limitations
                      </span>
                      <span className="text-stats font-sans font-bold text-primary">
                        Can't make calls
                      </span>
                    </div>
                  </div>

                  {/* ... Add remaining stat cards with the same structure ... */}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-base font-sans text-body">
                  "I was trapped in this cycle," Chen admits. "Every month,
                  writing bigger checks, hoping things would improve. $50,000
                  per month just replacing people who left. Meanwhile, watching
                  perfectly good leads die because we couldn't handle the
                  volume."
                </p>

                <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                  "The worst part? The more you invest in this traditional
                  approach, the bigger your problems become. It's like trying to
                  fill a leaking bucket by adding more water."
                </blockquote>
              </div>
            </section>

            {/* The Breaking Point Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Breaking Point
              </h2>

              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg mb-8">
                <img
                  src="https://brasilpgs.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-29-at-15.22.37.jpeg"
                  className="object-cover w-full h-full"
                  alt="Business Crisis Illustration"
                />
              </div>

              <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                "It was the moment every business owner dreads," Chen recalls,
                his voice tight. "Peak season. Millions in opportunities. And my
                entire sales team threatening to walk."
              </blockquote>

              <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-r-lg space-y-2">
                <h3 className="font-semibold text-red-700">
                  The nightmare scenario was unfolding:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 00-1.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" />
                    </svg>
                    <span>Best performer poached by competitor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293-1.293a1 1 00-1.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" />
                    </svg>
                    <span>Two more threatening resignation</span>
                  </li>
                </ul>
              </div>

              <p className="text-base font-sans text-body my-8">
                "I'll never forget that night," Chen continues. "3 AM in my
                office, watching perfectly good leads die in our system. Each
                notification another missed opportunity. Another lost deal. Our
                best performer had just left, taking five years of knowledge
                with him."
              </p>

              <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-r-lg space-y-2">
                <h3 className="font-semibold text-yellow-700">
                  The Reality Hit Hard:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" />
                    </svg>
                    <span>Millions in deals at risk</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* The AI Sales Revolution Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The AI Sales Revolution
              </h2>

              <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg mb-8">
                <img
                  src="https://brasilpgs.com/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-29-at-16.26.01.jpeg"
                  className="object-cover w-full h-full"
                  alt="AI Sales Revolution Illustration"
                />
              </div>

              <p className="text-base font-sans text-body">
                What happened next transformed not just Chen's business, but
                revealed the future of sales itself:
              </p>

              <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                "We've developed something revolutionary," Dr. Walker explained.
                "Real voice AI that's indistinguishable from your best human
                salespeople. Not chatbots, not automated messages - but natural,
                human-like phone conversations that engage, persuade, and close
                deals."
              </blockquote>

              <div className="performance-metrics bg-gray-50 p-6 rounded-lg my-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  System Performance Results
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="metric-card cursor-pointer hover:shadow-md transition-all">
                    <h4 className="font-bold text-gray-900 mb-2">
                      First 24 Hours:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>147 real phone conversations</li>
                      <li>28 qualified opportunities</li>
                      <li>4 deals closed on calls</li>
                      <li>Perfect voice quality reported</li>
                    </ul>
                  </div>

                  <div className="metric-card cursor-pointer hover:shadow-md transition-all">
                    <h4 className="font-bold text-gray-900 mb-2">
                      First Week:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>800+ natural sales calls</li>
                      <li>42 new customers from calls</li>
                      <li>24/7 voice coverage</li>
                      <li>Cost reduced by 67%</li>
                    </ul>
                  </div>

                  <div className="metric-card cursor-pointer hover:shadow-md transition-all">
                    <h4 className="font-bold text-gray-900 mb-2">
                      First Month:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Revenue increased 215%</li>
                      <li>Operating costs down 71%</li>
                      <li>Consistent voice performance</li>
                      <li>Global phone coverage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-lg border-l-4 border-primary my-8">
                "I was stunned by how natural it sounded," Chen recalls.
                "Customers had no idea they were talking to AI. We were having
                real, meaningful phone conversations at 3 AM, handling complex
                objections, and closing deals while I slept. This wasn't
                automation - this was true sales transformation."
              </blockquote>
            </section>

            {/* Complex Sales Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                But What About Complex Sales?
              </h2>

              <blockquote className="text-quote font-sans italic">
                <span className="block text-primary font-semibold mb-4">
                  "I was dead wrong,"
                </span>
                he admits now. "The system doesn't just handle complex sales -
                it excels at them. It manages decision makers, handles
                sophisticated objections, and follows complex sales sequences as
                good as my best sales team."
              </blockquote>
            </section>

            {/* Market Validation Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Market Validation
              </h2>

              <p className="text-base font-sans text-body">
                The results weren't just anecdotal. Major research firms quickly
                took notice:
              </p>

              <div className="grid gap-6 my-8">
                {/* Research Quote Cards */}
                <div className="stat-card group hover:scale-[1.01]">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-bold text-primary">
                      McKinsey Global Institute
                    </span>
                  </div>
                  <p className="text-quote font-sans italic text-gray-600">
                    "AI-powered sales systems show potential for
                    <span className="font-semibold text-primary">
                      85% cost reduction
                    </span>
                    while increasing conversion rates by up to
                    <span className="font-semibold text-primary">300%</span>."
                  </p>
                </div>

                <div className="stat-card group hover:scale-[1.01]">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-bold text-primary">
                      Stanford Business Review
                    </span>
                  </div>
                  <p className="text-quote font-sans italic text-gray-600">
                    "Companies using AI sales systems report unprecedented
                    scalability and consistency in their sales operations."
                  </p>
                </div>

                <div className="stat-card group hover:scale-[1.01]">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-bold text-primary">
                      Gartner Research
                    </span>
                  </div>
                  <p className="text-quote font-sans italic text-gray-600">
                    "By 2025, businesses not using AI in sales will find
                    themselves at a significant competitive disadvantage."
                  </p>
                </div>
              </div>
            </section>

            {/* Market Opportunity Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Window of Opportunity
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-gray-50 p-6 rounded-lg shadow-sm">
                  <p className="text-base font-sans text-body font-medium text-primary">
                    We're at a tipping point. The companies that move first in
                    their markets will have an insurmountable advantage.
                  </p>
                </div>

                <p className="text-base font-sans text-body">
                  He's right. Early adopters are seeing something remarkable:
                  not just cost savings and increased sales, but a fundamental
                  transformation in how their businesses operate.
                </p>

                <blockquote className="text-quote font-sans italic relative z-10">
                  <p className="text-base font-sans text-body">
                    "Think about the first companies that adopted e-commerce, or
                    cloud computing," Chen adds. "The same thing is happening
                    with AI sales right now. The window to be a leader rather
                    than a follower is small - and it's closing fast."
                  </p>
                </blockquote>

                {/* Visual Timeline */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 rounded-lg bg-gray-50">
                    <div className="font-bold text-primary">Past</div>
                    <div className="text-base font-sans text-body text-gray-600">
                      Traditional Sales
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-50">
                    <div className="font-bold text-primary">Present</div>
                    <div className="text-base font-sans text-body text-gray-600">
                      AI Adoption Window
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-50">
                    <div className="font-bold text-primary">Future</div>
                    <div className="text-base font-sans text-body text-gray-600">
                      Market Standard
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Limited Opportunity Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                A Limited Opportunity
              </h2>

              {/* Opportunity Counter */}
              <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                <div className="text-center space-y-4">
                  <p className="text-base font-sans text-white font-medium">
                    Limited to
                  </p>
                  <div className="text-5xl font-bold">100</div>
                  <p className="text-base font-sans text-white">
                    Qualified Businesses
                  </p>
                </div>
              </div>

              <blockquote className="text-quote font-sans italic bg-gray-50 p-6 rounded-r-lg border-l-4 border-primary my-8">
                "We're looking for forward-thinking business owners who
                understand the opportunity in front of them," Dr. Walker
                explains. "People who are ready to lead rather than follow."
              </blockquote>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="stat-card success">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base font-sans text-body">
                      Complete AI Sales System
                    </span>
                  </div>
                </div>
                {/* Add remaining benefit cards... */}
              </div>
            </section>

            {/* Time to Act Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Time to Act is Now
              </h2>

              <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg space-y-6">
                <p className="text-xl font-medium text-white">
                  The opportunity is clear, but the window is closing fast.
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-8">
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-2xl">100</div>
                    <div className="text-base font-sans text-white text-primary">
                      Available Spots
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-2xl">1st</div>
                    <div className="text-base font-sans text-white text-primary">
                      In Market
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="font-bold text-2xl">Now</div>
                    <div className="text-base font-sans text-white text-primary">
                      Is The Time
                    </div>
                  </div>
                </div>

                <blockquote
                  className="text-quote font-sans italic border-l-4 border-white/20 pl-4 bg-transparent"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  "We've seen it time and again," Dr. Walker explains. "The
                  first company in each market to adopt Elvian becomes nearly
                  impossible to compete against. They simply operate at a level
                  traditional sales teams can't match."
                </blockquote>
              </div>
            </section>

            {/* Early Adopter Benefits Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-h3 font-semibold text-primary mb-4">
                  Early Adopter Benefits:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-base font-sans text-body">
                      50% off standard pricing
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-base font-sans text-body">
                      Exclusive advanced features
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414 0l4-4z"
                      />
                    </svg>
                    <span className="text-base font-sans text-body">
                      First-mover market advantage
                    </span>
                  </li>
                </ul>
              </div>

              <blockquote className="text-quote font-sans italic text-lg">
                "But most importantly," Chen emphasizes, "they get time. Time
                before their competitors catch up. Time to establish market
                dominance. Time to scale without limits."
              </blockquote>
            </section>

            {/* Real-World Impact Section */}
            <section className="space-y-8 opacity-0 mt-16" data-animate>
              <h2 className="text-h2 font-bold text-gray-900 mb-4">
                The Real-World Impact: The Numbers Don't Lie
              </h2>

              <blockquote className="text-quote font-sans italic text-lg">
                "Let me show you exactly what happened," Chen says, pulling up
                his dashboard. "Six months ago, we were burning $200,000 monthly
                on our sales team, missing opportunities, and losing top
                performers constantly."
              </blockquote>

              {/* Before/After Comparison */}
              <div className="grid md:grid-cols-2 gap-8 my-8">
                {/* Before */}
                <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg">
                  <h4 className="text-h3 font-semibold text-red-700 mb-4">
                    Before AI Implementation
                  </h4>
                  <div className="stat-card warning">
                    <span className="text-stats font-sans font-bold text-primary">
                      $200,000
                    </span>
                    <span className="text-base font-sans text-body text-gray-600">
                      Monthly Sales Cost
                    </span>
                  </div>
                </div>

                {/* After */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-h3 font-semibold text-primary mb-4">
                    After AI Implementation
                  </h4>
                  <div className="grid gap-4">
                    <div className="stat-card success">
                      <span className="text-stats font-sans font-bold text-primary">
                        $30,000
                      </span>
                      <span className="text-base font-sans text-body text-gray-600">
                        Total Monthly Cost
                      </span>
                    </div>
                    <div className="stat-card success">
                      <span className="text-stats font-sans font-bold text-primary">
                        312%
                      </span>
                      <span className="text-base font-sans text-body text-gray-600">
                        Revenue Increase
                      </span>
                    </div>
                    <div className="stat-card success">
                      <span className="text-stats font-sans font-bold text-primary">
                        24/7
                      </span>
                      <span className="text-base font-sans text-body text-gray-600">
                        Lead Conversion
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-base font-sans text-body">
                  He smiles. "Today? We spend $30,000 total, revenue is up 312%,
                  and we're converting leads 24/7. The system makes perfect
                  calls around the clock, handles payments automatically, and
                  improves with every conversation."
                </p>

                <blockquote className="text-quote font-sans italic bg-gray-50 p-4 rounded-r-lg border-l-4 border-primary my-8">
                  "While competitors struggle with hiring and turnover, we're
                  focused purely on growth. No drama, no headaches - just
                  consistent, predictable results."
                </blockquote>
              </div>
            </section>

            {/* Comments Section */}
            <section className="mt-16 border-t pt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-h2 font-bold text-gray-900">
                  Comments (187)
                </h2>
                <select className="px-3 py-2 border rounded-lg text-sm">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {/* Featured Comment */}
                <div className="comment-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">
                            David Thompson
                          </span>
                          <span className="text-base font-sans text-body text-gray-500 mx-2">
                            •
                          </span>
                          <span className="text-base font-sans text-body text-gray-600">
                            CEO, E-commerce
                          </span>
                        </div>
                        <span className="text-base font-sans text-body text-gray-500 text-sm">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-base font-sans text-body text-gray-700">
                        Never write reviews but had to share this. After losing
                        my top 3 salespeople in one month and watching $200k+ in
                        leads die, I was desperate. Took a chance on Elvian
                        and... mind blown. First week: 300+ calls/day, zero
                        missed opportunities, 2 huge deals closed. Best part? No
                        more 3am anxiety about who's quitting next. This is the
                        real deal guys.
                      </p>

                      {/* Nested Replies */}
                      <div className="mt-4 pl-6 border-l-2 space-y-4">
                        {/* ... similar nested replies structure ... */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="comment-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">
                            Sarah Chen
                          </span>
                          <span className="text-base font-sans text-body text-gray-500 mx-2">
                            •
                          </span>
                          <span className="text-base font-sans text-body text-gray-600">
                            Founder
                          </span>
                        </div>
                        <span className="text-base font-sans text-body text-gray-500 text-sm">
                          1 day ago
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-base font-sans text-body text-gray-700">
                          Quick update after 30 days:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-base font-sans text-body text-gray-700">
                            IT worked like a charm
                          </li>
                          <li className="text-base font-sans text-body text-gray-700">
                            Revenue up 285%
                          </li>
                        </ul>
                        <p className="text-base font-sans text-body text-gray-700">
                          Still can't believe we waited so long to make the
                          switch. For anyone on the fence - just do it. This is
                          the future.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More comment cards... */}
              </div>
            </section>

            {/* Additional Comments Section */}
            <div className="mt-8 space-y-8">
              {/* Emma Watson's Thread */}
              <div className="comment-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900">
                          Emma Watson
                        </span>
                        <span className="text-base font-sans text-body text-gray-500 mx-2">
                          •
                        </span>
                        <span className="text-base font-sans text-body text-gray-600">
                          E-commerce Director
                        </span>
                      </div>
                      <span className="text-base font-sans text-body text-gray-500 text-sm">
                        3 hours ago
                      </span>
                    </div>
                    <p className="text-base font-sans text-body text-gray-700">
                      Question for current users - how's it handling payment
                      processing and integrations? We're using Stripe and
                      Shopify.
                    </p>

                    {/* Nested Replies */}
                    <div className="mt-4 pl-6 border-l-2 space-y-4">
                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Robert Chen
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            1 hour ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          Works flawlessly with both. We're processing 3x more
                          orders now because it follows up instantly on
                          abandoned carts. Integration took like 30 mins.
                        </p>
                      </div>

                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Emma Watson
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            45 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          Perfect, exactly what I needed to know. Pulling the
                          trigger now before prices go up!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* David Lee's Thread */}
              <div className="comment-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900">
                          David Lee
                        </span>
                        <span className="text-base font-sans text-body text-gray-500 mx-2">
                          •
                        </span>
                        <span className="text-base font-sans text-body text-gray-600">
                          Tech Entrepreneur
                        </span>
                        <span className="bg-gray-100 text-primary text-xs px-2 py-1 rounded-full ml-2">
                          Early Access Member
                        </span>
                      </div>
                      <span className="text-base font-sans text-body text-gray-500 text-sm">
                        1 hour ago
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-sans text-body text-gray-700">
                        impressed
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-base font-sans text-body text-gray-700">
                        <li>$2k monthly</li>
                        <li>Sales performance</li>
                        <li>Zero management</li>
                        <li>24/7 coverage</li>
                      </ul>
                      <p className="text-base font-sans text-body text-gray-700">
                        The math is obvious. This is the future.
                      </p>
                    </div>

                    {/* Nested Replies */}
                    <div className="mt-4 pl-6 border-l-2 space-y-4">
                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Sarah Thompson
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            30 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          What about complex products? We sell enterprise
                          software...
                        </p>
                      </div>

                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              David Lee
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            15 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          I got impressed with how elvian handle complex sales.
                          It never forgets details, impressive follow-up every
                          time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <section className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-lg shadow-2xl text-center">
              {/* Urgency Banner */}
              <div className="bg-red-600 text-white py-2 px-4 rounded-full inline-block mb-6 animate-pulse">
                <span className="font-bold">
                  🔥 Only 12 Early Access Spots Remaining
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Transform Your Sales Within 24 Hours
              </h2>

              {/* Value Props */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-1">
                    50%
                  </div>
                  <div className="text-sm">Early Access Discount</div>
                  <div className="text-xs text-yellow-400">Expires Soon</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-1">
                    24/7
                  </div>
                  <div className="text-sm">Instant Activation</div>
                  <div className="text-xs text-yellow-400">No Setup Time</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-1">
                    30d
                  </div>
                  <div className="text-sm">Money-Back Guarantee</div>
                  <div className="text-xs text-yellow-400">Risk-Free Trial</div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex -space-x-2">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/3.jpg"
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                </div>
                <span className="ml-3 text-sm">
                  88 business owners joined this week
                </span>
              </div>

              {/* Main CTA Button */}
              <div className="max-w-md mx-auto space-y-4">
                <button
                  onClick={() =>
                    (window.location.href =
                      appendParamsToUrl("https://elvian.ai"))
                  }
                  className="w-full group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-xl font-bold px-12 py-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse"></div>
                  <span className="relative">
                    CLAIM YOUR EARLY ACCESS SPOT NOW
                    <span className="block text-sm font-normal mt-1">
                      Limited Time 50% Discount
                    </span>
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414 0l4-4z"
                      />
                    </svg>
                    30-Day Guarantee
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 9V7a5 5 0110 0v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016 0z" />
                    </svg>
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 11-6 0 3 3 016 0zm5 2v2a7 7 11-14 0V8h14z" />
                    </svg>
                    24/7 Support
                  </div>
                </div>
              </div>

              {/* Risk Reversal */}
              <div className="mt-6 text-sm text-white/80">
                <p>
                  No credit card required ��� Cancel anytime • Instant access
                </p>
              </div>
            </section>

            {/* Additional Comments Section */}
            <div className="mt-8 space-y-8">
              {/* Emma Watson's Thread */}
              <div className="comment-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900">
                          Emma Watson
                        </span>
                        <span className="text-base font-sans text-body text-gray-500 mx-2">
                          •
                        </span>
                        <span className="text-base font-sans text-body text-gray-600">
                          E-commerce Director
                        </span>
                      </div>
                      <span className="text-base font-sans text-body text-gray-500 text-sm">
                        3 hours ago
                      </span>
                    </div>
                    <p className="text-base font-sans text-body text-gray-700">
                      Question for current users - how's it handling payment
                      processing and integrations? We're using Stripe and
                      Shopify.
                    </p>

                    {/* Nested Replies */}
                    <div className="mt-4 pl-6 border-l-2 space-y-4">
                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Robert Chen
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            1 hour ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          Works flawlessly with both. We're processing 3x more
                          orders now because it follows up instantly on
                          abandoned carts. Integration took like 30 mins.
                        </p>
                      </div>

                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Emma Watson
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            45 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          Perfect, exactly what I needed to know. Pulling the
                          trigger now before prices go up!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* David Lee's Thread */}
              <div className="comment-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-gray-900">
                          David Lee
                        </span>
                        <span className="text-base font-sans text-body text-gray-500 mx-2">
                          •
                        </span>
                        <span className="text-base font-sans text-body text-gray-600">
                          Tech Entrepreneur
                        </span>
                        <span className="bg-gray-100 text-primary text-xs px-2 py-1 rounded-full ml-2">
                          Early Access Member
                        </span>
                      </div>
                      <span className="text-base font-sans text-body text-gray-500 text-sm">
                        1 hour ago
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-sans text-body text-gray-700">
                        impressed
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-base font-sans text-body text-gray-700">
                        <li>$2k monthly</li>
                        <li>Sales performance</li>
                        <li>Zero management</li>
                        <li>24/7 coverage</li>
                      </ul>
                      <p className="text-base font-sans text-body text-gray-700">
                        The math is obvious. This is the future.
                      </p>
                    </div>

                    {/* Nested Replies */}
                    <div className="mt-4 pl-6 border-l-2 space-y-4">
                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              Sarah Thompson
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            30 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          What about complex products? We sell enterprise
                          software...
                        </p>
                      </div>

                      <div className="comment-reply">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-bold text-gray-900">
                              David Lee
                            </span>
                          </div>
                          <span className="text-base font-sans text-body text-gray-500 text-sm">
                            15 minutes ago
                          </span>
                        </div>
                        <p className="text-base font-sans text-body text-gray-700">
                          I got impressed with how elvian handle complex sales.
                          It never forgets details, impressive follow-up every
                          time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Call-to-Action */}
            <section className="mt-16 bg-gray-800 text-white p-8 rounded-lg shadow-xl text-center">
              <h2 className="text-h2 font-bold text-white mb-4">
                Ready for the Future of Sales?
              </h2>
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-6 rounded-lg">
                    <div className="text-4xl font-bold mb-2">12</div>
                    <div className="text-base font-sans text-white text-primary">
                      Early Access Spots Left
                    </div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-lg">
                    <div className="text-4xl font-bold mb-2">50%</div>
                    <div className="text-base font-sans text-white text-primary">
                      Lifetime Discount
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    (window.location.href =
                      appendParamsToUrl("https://elvian.ai"))
                  }
                  className="w-full group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-xl font-bold px-12 py-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse"></div>
                  <span className="relative">
                    GET STARTED NOW
                    <span className="block text-sm font-normal mt-1">
                      Limited Time 50% Discount
                    </span>
                  </span>
                </button>

                <p className="text-white font-sans text-body text-primary text-sm">
                  30-Day ROI Guarantee • No Long-Term Contract • Instant Setup
                </p>
              </div>
            </section>
          </article>

          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-8">
              {/* Main CTA */}
              <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  Ready to Transform Your Sales?
                </h3>
                <p className="mb-6 text-white/90">
                  Join hundreds of companies already transforming their sales
                  with AI
                </p>
                <a href="https://elvian.ai" className="block w-full">
                  <button
                    onClick={() =>
                      (window.location.href =
                        appendParamsToUrl("https://elvian.ai"))
                    }
                    className="w-full group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-xl font-bold px-12 py-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse"></div>
                    <span className="relative">
                      CLAIM YOUR EARLY ACCESS SPOT NOW
                      <span className="block text-sm font-normal mt-1">
                        Limited Time 50% Discount
                      </span>
                    </span>
                  </button>
                </a>
              </div>

              {/* Related Resources */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Related Resources
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://elvian.ai"
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm text-primary font-medium block mb-1">
                      Guide
                    </span>
                    <span className="font-medium block mb-2">
                      How to Implement AI in Sales
                    </span>
                    <span className="text-sm text-gray-600">5 min read</span>
                  </a>

                  <a
                    href="https://elvian.ai"
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm text-primary font-medium block mb-1">
                      Case Study
                    </span>
                    <span className="font-medium block mb-2">
                      300% Sales Increase in 30 Days
                    </span>
                    <span className="text-sm text-gray-600">8 min read</span>
                  </a>

                  <a
                    href="https://elvian.ai"
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/20 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm text-primary font-medium block mb-1">
                      Webinar
                    </span>
                    <span className="font-medium block mb-2">
                      The Future of Sales with AI
                    </span>
                    <span className="text-sm text-gray-600">Watch 45 min</span>
                  </a>
                </div>
              </div>

              {/* Stats Box */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Proven Results
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Average sales increase
                    </span>
                    <span className="text-xl font-bold text-primary">312%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost reduction</span>
                    <span className="text-xl font-bold text-primary">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average ROI</span>
                    <span className="text-xl font-bold text-primary">7.8x</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>
      )}
    </>
  );
}
