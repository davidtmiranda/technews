// Add these functions at the beginning of the file
function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

function appendParamsToUrl(baseUrl) {
  const params = getUrlParams();
  const url = new URL(baseUrl);
  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

// Add Facebook Pixel tracking to elvian.ai clicks
function trackElvianClick() {
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }
}

// Lazy loading images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

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
    {
      threshold: 0.1,
    }
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

// Update quote styling
document.querySelectorAll("blockquote").forEach((quote) => {
  quote.classList.add(
    "bg-[#F6F6F6]",
    "border-l-4",
    "border-primary",
    "p-6",
    "my-8",
    "italic"
  );
});

// Add hover effects to buttons
document.querySelectorAll("button").forEach((button) => {
  if (button.classList.contains("bg-primary")) {
    button.classList.add("hover:scale-102", "transition-all", "duration-200");
  }
});

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

  // Stats
  document.querySelectorAll(".stat-number, .stat-value").forEach((stat) => {
    stat.classList.add("text-stats", "font-sans", "font-medium");
  });

  // CTAs
  document
    .querySelectorAll('.cta-button, button[class*="bg-blue-600"]')
    .forEach((button) => {
      button.classList.add("text-cta", "font-sans", "font-medium");
    });

  // Comment text
  document.querySelectorAll(".comment-card p").forEach((p) => {
    p.classList.add("text-base", "font-sans", "text-gray-700");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
  animateOnScroll();
  initStatCards();
  enforceTypography();

  // Update all elvian.ai links
  document.querySelectorAll('a[href*="elvian.ai"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      trackElvianClick();
      window.location.href = appendParamsToUrl(link.href);
    });
  });

  // Update all buttons that link to elvian.ai
  document
    .querySelectorAll('button[onclick*="elvian.ai"]')
    .forEach((button) => {
      button.onclick = () => {
        trackElvianClick();
        window.location.href = appendParamsToUrl("https://elvian.ai");
      };
    });

  // Make specific images clickable with proper cursor indication
  document
    .querySelectorAll(".aspect-video img, .hero-image img")
    .forEach((img) => {
      const wrapper = document.createElement("a");
      wrapper.href = appendParamsToUrl("https://elvian.ai");
      wrapper.classList.add(
        "block",
        "cursor-pointer",
        "transition-opacity",
        "hover:opacity-95"
      );
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });

  // Make testimonial cards clickable
  document.querySelectorAll(".stat-card.testimonial").forEach((card) => {
    card.classList.add("cursor-pointer");
    card.addEventListener("click", () => {
      trackElvianClick();
      window.location.href = appendParamsToUrl("https://elvian.ai");
    });
  });

  // Make performance metric cards clickable
  document
    .querySelectorAll(".performance-metrics .metric-card")
    .forEach((card) => {
      card.classList.add("cursor-pointer", "transition-all", "hover:scale-102");
      card.addEventListener("click", () => {
        trackElvianClick();
        window.location.href = appendParamsToUrl("https://elvian.ai");
      });
    });
});
