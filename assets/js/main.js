(function () {
  const siteData = window.siteData;

  if (!siteData) {
    return;
  }

  const pageRoot = document.querySelector("[data-page-root]");
  const headerRoot = document.querySelector("[data-site-header]");
  const footerRoot = document.querySelector("[data-site-footer]");
  const currentPage = document.body.dataset.page || "home";

  const pageMeta = {
    home: { title: "Home", intro: "Research, publications, projects, and contact information.", eyebrow: "Research portfolio" },
    about: { title: "About", intro: "Biography, education, research interests, CV, and honors.", eyebrow: "Researcher profile" },
    publications: { title: "Publications", intro: "Selected journal articles, conference papers, workshops, and posters.", eyebrow: "Scholarly work" },
    projects: { title: "Projects", intro: "Research projects, design probes, outcomes, and related links.", eyebrow: "Selected work" },
    teaching: { title: "Teaching", intro: "Courses, workshops, and professional experience.", eyebrow: "Practice" },
    contact: { title: "Contact", intro: "Ways to get in touch for research conversations, collaborations, talks, and advising inquiries.", eyebrow: "" }
  };

  const scholarLink =
    siteData.profile.scholarUrl ||
    (siteData.contact.links.find((item) => item.label === "Google Scholar") || {}).url ||
    "https://scholar.google.com/citations?user=RWuM4NIAAAAJ&hl=en&oi=ao";

  /* ── Navigation: 6 items, CV and Resources removed ── */
  const navigation = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "publications", label: "Publications", href: "publications.html" },
    { key: "teaching", label: "Teaching", href: "teaching.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ];

  const categoryLabels = {
    all: "All",
    "journal article": "Journal articles",
    "conference paper": "Conference papers",
    "workshop paper": "Workshop papers",
    poster: "Posters"
  };

  const categoryClass = {
    "journal article": "is-journal",
    "conference paper": "is-conference",
    "workshop paper": "is-workshop",
    "poster": "is-poster"
  };

  const categoryLabel = {
    "journal article": "Journal article",
    "conference paper": "Conference paper",
    "workshop paper": "Workshop paper",
    "poster": "Poster"
  };

  const featuredProjects = siteData.projects
    .filter((item) => siteData.featuredProjectIds.includes(item.id))
    .slice(0, 4);

  const profileInitials = siteData.profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0].toUpperCase())
    .join("");

  renderChrome();
  renderPage();
  bindNavigation();
  bindPublications();

  /* ─────────────────────────────────────────────────────
     Chrome (header + footer)
  ───────────────────────────────────────────────────── */
  function renderChrome() {
    if (headerRoot) {
      headerRoot.innerHTML = `
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Go to home page">
            <span class="brand-media">
              ${siteData.profile.logoFile
          ? `<img class="brand-logo" src="${siteData.profile.logoFile}" alt="${siteData.profile.logoAlt || siteData.profile.name}">`
          : `<span class="brand-mark">${profileInitials}</span>`
        }
            </span>
            <span class="brand-copy">
              <span class="brand-name">${siteData.profile.name}</span>
              <span class="brand-subtitle">${siteData.profile.role}</span>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span class="sr-only">Toggle navigation</span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="Primary">
            ${navigation
          .map(
            (item) => `
                  <a href="${item.href}" ${item.key === currentPage ? 'aria-current="page"' : ""}>
                    ${item.label}
                  </a>
                `
          )
          .join("")}
          </nav>
        </div>
      `;
    }

    if (footerRoot) {
      footerRoot.innerHTML = `
        <div class="container footer-inner">
          <div class="footer-copy">
            <p class="footer-title">${siteData.profile.name}</p>
            <p>${siteData.profile.role} · ${siteData.profile.affiliation}</p>
            <p class="footer-license">Code licensed under <a href="LICENSE">GPL-3.0</a>.</p>
          </div>
          <div class="footer-links">
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
      `;
    }
  }

  /* ─────────────────────────────────────────────────────
     Router
  ───────────────────────────────────────────────────── */
  function renderPage() {
    if (!pageRoot) {
      return;
    }

    const renderer = {
      home: renderHomePage,
      about: renderAboutPage,
      publications: renderPublicationsPage,
      projects: renderProjectsPage,
      teaching: renderTeachingPage,
      resources: renderResourcesPage,
      cv: renderCvPage,
      contact: renderContactPage
    }[currentPage];

    if (!renderer) {
      pageRoot.innerHTML = renderSimplePage("Page not found", "The requested page could not be rendered.");
      return;
    }

    const meta = pageMeta[currentPage] || pageMeta.home;
    document.title = `${meta.title} | ${siteData.profile.name}`;
    pageRoot.innerHTML = renderer();
  }

  /* ─────────────────────────────────────────────────────
     Home
     · Bio + quick facts hero
     · Credibility strip
     · Featured publications (3 cards)
     · Featured projects
     · Contact band
  ───────────────────────────────────────────────────── */
  function renderHomePage() {
    return `
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <h1>${siteData.profile.name}</h1>
            <p class="hero-tagline">${siteData.profile.tagline}</p>
            <p class="hero-summary">${siteData.profile.bioShort}</p>
            <div class="button-row">
              <a class="button button-primary"   href="projects.html">Explore projects</a>
              <a class="button button-secondary" href="publications.html">Browse publications</a>
              <a class="button button-secondary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Download CV</a>
            </div>
          </div>
          <aside class="hero-panel" aria-label="Research snapshot">
            ${siteData.profile.logoFile ? `<img class="profile-photo" src="${siteData.profile.logoFile}" alt="${siteData.profile.logoAlt || siteData.profile.name}" loading="eager">` : ""}
            <h2>${siteData.profile.role}</h2>
            <p class="panel-affiliation">${siteData.profile.affiliation}</p>
            <ul class="detail-list">
              ${siteData.profile.quickFacts
        .map(
          (fact) => `
                    <li>
                      <strong>${fact.value}</strong>
                    </li>
                  `
        )
        .join("")}
            </ul>

          </aside>
        </div>
      </section>

      ${renderFeaturedPublications()}

      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Selected work</p>
              <h2>Featured projects</h2>
            </div>
            <a class="text-link" href="projects.html">See all projects</a>
          </div>
          <div class="card-grid card-grid-projects">
            ${featuredProjects.map(renderProjectCard).join("")}
          </div>
        </div>
      </section>

      <section class="page-section page-section-compact">
        <div class="container">
          <article class="card contact-band home-contact-band">
            <div>
              <p class="eyebrow">Next conversation</p>
              <h2>Open to collaborations around learning experience design and classroom technology.</h2>
            </div>
            <a class="button button-primary" href="contact.html">Get in touch</a>
          </article>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     About
     · Long bio + background
     · Sidebar: research interests chips, CV download,
                honors & awards, lab resource links
     · Education timeline
     · Research themes grid
  ───────────────────────────────────────────────────── */
  function renderAboutPage() {
    window.location.replace("index.html");
    return "";
  }

  /* ─────────────────────────────────────────────────────
     Publications
  ───────────────────────────────────────────────────── */
  function renderPublicationsPage() {
    return `
      ${renderPageHeader("publications")}
      <section class="page-section">
        <div class="container single-card-container">
          <article class="card scholar-card">
            <p class="eyebrow">Scholarly output</p>
            <h2>Research publications</h2>
            <p>All journal articles, conference papers, workshop papers, and posters are listed on Google Scholar, including citation metrics and full-text links.</p>
            <a class="button button-primary" href="${scholarLink}" target="_blank" rel="noopener">Open Google Scholar</a>
          </article>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Projects
  ───────────────────────────────────────────────────── */
  function renderProjectsPage() {
    const projectId = new URLSearchParams(window.location.search).get("project");

    if (projectId) {
      const project = siteData.projects.find((item) => item.id === projectId);

      if (!project) {
        return renderProjectNotFound();
      }

      document.title = `${project.title} | ${siteData.profile.name}`;
      return renderProjectDetail(project);
    }

    return `
      ${renderPageHeader("projects")}
      <section class="page-section">
        <div class="container">
          <div class="card-grid card-grid-projects">
            ${siteData.projects.map(renderProjectCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Teaching — honors section excluded (moved to About)
  ───────────────────────────────────────────────────── */
  function renderTeachingPage() {
    const teachingSections = (siteData.teaching.sections || []).filter(
      (section) => section.eyebrow !== "Recognition"
    );

    return `
      ${renderPageHeader("teaching")}
      <section class="page-section">
        <div class="container teaching-grid">
          ${teachingSections.map(renderTeachingSection).join("")}
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Redirect stubs (CV and Resources now live in About)
  ───────────────────────────────────────────────────── */
  function renderResourcesPage() {
    window.location.replace("about.html");
    return "";
  }

  function renderCvPage() {
    window.location.replace("about.html");
    return "";
  }

  /* ─────────────────────────────────────────────────────
     Contact
  ───────────────────────────────────────────────────── */
  function renderContactPage() {
    return `
      ${renderPageHeader("contact", "", siteData.contact.intro)}
      <section class="page-section">
        <div class="container single-card-container">
          <article class="card contact-card">
            <div class="contact-list">
              ${siteData.contact.links
        .map(
          (item) => `
                    <a class="contact-item" href="${item.url}" target="${item.url.startsWith("mailto:") ? "_self" : "_blank"}" rel="noopener">
                      <span>${item.label}</span>
                      <strong>${item.value}</strong>
                    </a>
                  `
        )
        .join("")}
            </div>
          </article>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Simple / error page
  ───────────────────────────────────────────────────── */
  function renderSimplePage(title, intro) {
    return `
      <section class="page-section simple-page">
        <div class="container">
          <h1>${title}</h1>
          <p>${intro}</p>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Featured publications strip (Home page)
  ───────────────────────────────────────────────────── */
  function renderFeaturedPublications() {
    const featured = siteData.publications.filter((pub) =>
      (siteData.featuredPublicationIds || []).includes(pub.id)
    );

    if (!featured.length) return "";

    return `
      <section class="page-section page-section-compact" aria-label="Recent publications">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Scholarly work</p>
              <h2>Recent publications</h2>
            </div>
            <a class="text-link" href="publications.html">All publications</a>
          </div>
          <div class="featured-pub-list">
            ${featured.map(renderFeaturedPubCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFeaturedPubCard(item) {
    const cls = categoryClass[item.category] || "is-conference";
    const label = categoryLabel[item.category] || item.category;
    const link = item.links && item.links[0];

    return `
      <article class="featured-pub-card">
        <div class="featured-pub-meta">
          <span class="publication-category ${cls}">${label}</span>
          <span class="featured-pub-year">${item.year}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="publication-venue">${item.venue}</p>
        ${link ? `<a class="text-link featured-pub-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>` : ""}
      </article>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Publication card (full listing page)
  ───────────────────────────────────────────────────── */
  function renderPublicationCard(item) {
    const cls = categoryClass[item.category] || "is-conference";
    const label = categoryLabel[item.category] || item.category;

    const linksHtml =
      item.links && item.links.length
        ? `<div class="link-row publication-links">
            ${item.links
          .map(
            (link) =>
              `<a class="button button-secondary publication-link-btn" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`
          )
          .join("")}
           </div>`
        : "";

    const tagsHtml =
      item.tags && item.tags.length
        ? `<div class="tag-list publication-tag-list">
            ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
           </div>`
        : "";

    return `
      <article class="card publication-card" data-publication-item data-category="${item.category}" data-search="${createPublicationSearchText(item)}">
        <span class="publication-category ${cls}">${label}</span>
        <h3>${item.title}</h3>
        <p class="publication-authors">${item.authors}</p>
        <p class="publication-venue">${item.venue} <span class="publication-year">(${item.year})</span></p>
        ${tagsHtml}
        <details class="publication-abstract">
          <summary>Abstract</summary>
          <p>${item.abstract}</p>
        </details>
        ${linksHtml}
      </article>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Project card (grid)
  ───────────────────────────────────────────────────── */
  function renderProjectCard(project) {
    const href = `projects.html?project=${encodeURIComponent(project.id)}`;

    return `
      <article class="card project-card" id="${project.id}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">
        </div>
        <div class="project-body">
          <h3><a class="project-card-heading-link" href="${href}">${project.title}</a></h3>
          <p>${project.summary}</p>
        </div>
      </article>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Project detail page
  ───────────────────────────────────────────────────── */
  function renderProjectDetail(project) {
    const detailParagraphs = ((project.details || {}).paragraphs || []).filter(Boolean);
    const detailImages = ((project.details || {}).images || []).filter((img) => img && img.src);
    const citation = project.citation ? `<p class="project-citation">${project.citation}</p>` : "";

    return `
      <section class="page-section">
        <div class="container project-detail">
          <article class="project-detail-shell">
            <div class="project-detail-hero">
              <div class="project-detail-image">
                <img src="${project.image}" alt="${project.alt}">
              </div>
              <div class="project-detail-copy">
                <h1>${project.title}</h1>
                <p class="project-period">${project.period}</p>
                <p>${project.summary}</p>
                ${detailParagraphs.map((p) => `<p>${p}</p>`).join("")}
                ${citation}
              </div>
            </div>
            ${renderProjectOutcomes(project)}
            ${renderProjectTags(project)}
            ${renderProjectLinks(project)}
            ${detailImages.length
        ? `
                  <section class="project-detail-section">
                    <h2>Photos</h2>
                    <div class="project-gallery">
                      ${detailImages.map(renderProjectDetailImage).join("")}
                    </div>
                  </section>
                `
        : ""
      }
          </article>
          <a class="text-link project-back-link" href="projects.html">Back to projects</a>
        </div>
      </section>
    `;
  }

  function renderProjectNotFound() {
    return `
      <section class="page-section simple-page">
        <div class="container">
          <h1>Project not found</h1>
          <p>The project link does not match an available project.</p>
          <a class="text-link" href="projects.html">Back to projects</a>
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Page header (inner pages)
  ───────────────────────────────────────────────────── */
  function renderPageHeader(pageKey, actions = "", introOverride = "") {
    const meta = pageMeta[pageKey] || pageMeta.home;
    const intro = introOverride || meta.intro;

    return `
      <section class="page-hero">
        <div class="container page-hero-inner">
          <p class="eyebrow">${meta.eyebrow || meta.title}</p>
          <h1>${meta.title}</h1>
          <p>${intro}</p>
          ${actions ? `<div class="page-actions">${actions}</div>` : ""}
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Credibility strip
  ───────────────────────────────────────────────────── */
  function renderCredibilityStrip() {
    const pubCount = siteData.publications.length;
    const stripItems = [
      { label: " ", value: " " },
      { label: " ", value: " " }
    ];

    return `
      <section class="credibility-strip" aria-label="Research output">
        <div class="container credibility-grid">
          ${stripItems
        .map(
          (item) => `
                <div class="credibility-item">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
              `
        )
        .join("")}
        </div>
      </section>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Project detail sub-sections
  ───────────────────────────────────────────────────── */
  function renderProjectOutcomes(project) {
    const outcomes = Array.isArray(project.outcomes) ? project.outcomes.filter(Boolean) : [];
    if (!outcomes.length) return "";

    return `
      <section class="project-subsection">
        <h4>Outcomes</h4>
        <ul class="bullet-list">
          ${outcomes.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;
  }

  function renderProjectTags(project) {
    const tags = Array.isArray(project.tags) ? project.tags.filter(Boolean) : [];
    if (!tags.length) return "";

    return `
      <section class="project-subsection">
        <h4>Tags</h4>
        <div class="tag-list">
          ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderProjectLinks(project) {
    const links = Array.isArray(project.links)
      ? project.links.map(normalizeProjectLink).filter((link) => link && link.url && link.label)
      : [];
    if (!links.length) return "";

    return `
      <section class="project-subsection">
        <h4>Links</h4>
        <div class="link-row">
          ${links.map(renderProjectLink).join("")}
        </div>
      </section>
    `;
  }

  function renderProjectLink(link) {
    return `<a class="text-link" href="${link.url}" target="_blank" rel="noopener" data-project-link>${link.label}</a>`;
  }

  function normalizeProjectLink(link) {
    return typeof link === "string" ? { label: "Open link", url: link } : link;
  }

  function renderProjectDetailImage(image) {
    return `
      <figure class="project-gallery-item">
        <img src="${image.src}" alt="${image.alt || ""}" loading="lazy">
        ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
      </figure>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Teaching section card
  ───────────────────────────────────────────────────── */
  function renderTeachingSection(section) {
    return `
      <article class="card teaching-section-card">
        <h2>${section.title}</h2>
        <div class="teaching-list">
          ${section.items
        .map(
          (item) => `
                <article class="teaching-item">
                  <h3>${item.title}</h3>
                  <p>${formatTeachingItemText(item)}</p>
                </article>
              `
        )
        .join("")}
        </div>
      </article>
    `;
  }

  function formatTeachingItemText(item) {
    const role = (item.role || "").trim();
    const term = (item.term || "").trim();
    const description = (item.description || "").trim();
    const metadata = [role, term].filter(Boolean).join(", ");
    if (metadata && description) return `${metadata}. ${description}`;
    return metadata || description;
  }

  /* ─────────────────────────────────────────────────────
     Theme card
  ───────────────────────────────────────────────────── */
  function renderThemeCard(theme, className) {
    const link =
      theme.link && theme.link.url
        ? ` <a class="inline-link" href="${theme.link.url}" target="_blank" rel="noopener">${theme.link.label || "Read more"}</a>`
        : "";

    return `
      <article class="${className}">
        <h3>${theme.title}</h3>
        <p>${theme.description}${link}</p>
      </article>
    `;
  }

  /* ─────────────────────────────────────────────────────
     Interaction: navigation (mobile toggle + Escape)
  ───────────────────────────────────────────────────── */
  function bindNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        toggle.focus();
      }
    });
  }

  /* ─────────────────────────────────────────────────────
     Interaction: publications search + filter
  ───────────────────────────────────────────────────── */
  function bindPublications() {
    const searchField = document.querySelector("[data-publication-search]");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const publicationItems = document.querySelectorAll("[data-publication-item]");
    const resultsCount = document.querySelector("[data-results-count]");
    const emptyState = document.querySelector("[data-publications-empty]");

    if (!searchField || !filterButtons.length || !publicationItems.length || !resultsCount || !emptyState) {
      return;
    }

    let activeFilter = "all";

    function updatePublicationFilters() {
      const query = searchField.value.trim().toLowerCase();
      let visibleCount = 0;

      publicationItems.forEach((item) => {
        const cat = item.getAttribute("data-category");
        const searchable = item.getAttribute("data-search") || "";
        const categoryMatch = activeFilter === "all" || activeFilter === cat;
        const queryMatch = !query || searchable.includes(query);
        const isVisible = categoryMatch && queryMatch;

        item.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      resultsCount.textContent = `${visibleCount} publication${visibleCount === 1 ? "" : "s"} shown`;
      emptyState.hidden = visibleCount !== 0;
    }

    searchField.addEventListener("input", updatePublicationFilters);

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-filter") || "all";
        filterButtons.forEach((item) => {
          item.classList.remove("is-active");
          item.setAttribute("aria-pressed", "false");
        });
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
        updatePublicationFilters();
      });
    });
  }

  /* ─────────────────────────────────────────────────────
     Utilities
  ───────────────────────────────────────────────────── */
  function createPublicationSearchText(item) {
    return [item.title, item.authors, item.venue, item.year, item.abstract, (item.tags || []).join(" ")]
      .join(" ")
      .toLowerCase();
  }
})();
