(function () {
  const siteData = window.siteData;

  if (!siteData) return;

  const pageRoot = document.querySelector("[data-page-root]");
  const headerRoot = document.querySelector("[data-site-header]");
  const footerRoot = document.querySelector("[data-site-footer]");
  const currentPage = document.body.dataset.page || "home";

  const navigation = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "publications", label: "Publications", href: "publications.html" },
    { key: "teaching", label: "Teaching", href: "teaching.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ];

  const pageMeta = {
    home: {
      title: "Home",
      eyebrow: "Research portfolio",
      intro: "Educational technology, HCI in education, and learning experience design."
    },
    about: {
      title: "About",
      eyebrow: "Researcher profile",
      intro: "Biography, education, research interests, CV, and selected honors."
    },
    projects: {
      title: "Projects",
      eyebrow: "Selected work",
      intro: "Research projects, design probes, outcomes, and related links."
    },
    publications: {
      title: "Publications",
      eyebrow: "Scholarly work",
      intro: "Journal articles, conference papers, workshops, and posters."
    },
    teaching: {
      title: "Teaching",
      eyebrow: "Teaching and practice",
      intro: "Courses, instructional roles, academic service, and professional experience."
    },
    contact: {
      title: "Contact",
      eyebrow: "Research conversations",
      intro: "Ways to get in touch for collaborations, talks, and advising inquiries."
    },
    cv: {
      title: "CV",
      eyebrow: "Curriculum vitae",
      intro: "Downloadable CV and selected research highlights."
    },
    resources: {
      title: "Resources",
      eyebrow: "References",
      intro: "Selected institutional and research resources."
    }
  };

  const categoryLabels = {
    all: "All",
    "journal article": "Journal",
    "conference paper": "Conference",
    "workshop paper": "Workshop",
    poster: "Poster"
  };

  const categoryLongLabels = {
    "journal article": "Journal article",
    "conference paper": "Conference paper",
    "workshop paper": "Workshop paper",
    poster: "Poster"
  };

  const categoryClass = {
    "journal article": "is-journal",
    "conference paper": "is-conference",
    "workshop paper": "is-workshop",
    poster: "is-poster"
  };

  const scholarLink =
    siteData.profile.scholarUrl ||
    (siteData.contact.links.find((item) => item.label === "Google Scholar") || {}).url ||
    "https://scholar.google.com/";

  renderChrome();
  renderPage();
  bindNavigation();
  bindPublications();

  function renderChrome() {
    if (headerRoot) {
      headerRoot.innerHTML = `
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Go to home page">
            <span class="brand-mark" aria-hidden="true">${getInitials(siteData.profile.name)}</span>
            <span class="brand-copy">
              <span class="brand-name">${siteData.profile.name}</span>
              <span class="brand-subtitle">${siteData.profile.role} · IIT Bombay</span>
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
            <a href="publications.html">Publications</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
      `;
    }
  }

  function renderPage() {
    if (!pageRoot) return;

    const renderer = {
      home: renderHomePage,
      about: renderAboutPage,
      projects: renderProjectsPage,
      publications: renderPublicationsPage,
      teaching: renderTeachingPage,
      contact: renderContactPage,
      cv: renderCvPage,
      resources: renderResourcesPage
    }[currentPage];

    if (!renderer) {
      pageRoot.innerHTML = renderSimplePage("Page not found", "The requested page could not be rendered.");
      return;
    }

    const meta = pageMeta[currentPage] || pageMeta.home;
    document.title = `${meta.title} | ${siteData.profile.name}`;
    pageRoot.innerHTML = renderer();
  }

  function renderHomePage() {
    return `
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">EdTech / HCI in Education / LxD</p>
            <h1>${siteData.profile.name}</h1>
            <p class="hero-tagline">${siteData.profile.tagline}</p>
            <p class="hero-summary">${siteData.profile.bioShort}</p>
            <div class="button-row">
              <a class="button button-primary" href="publications.html">View publications</a>
              <a class="button button-secondary" href="projects.html">Explore projects</a>
              <a class="button button-secondary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Download CV</a>
            </div>
          </div>
          <aside class="hero-panel" aria-label="Research snapshot">
            <div class="portrait-frame">
              <img class="profile-photo" src="${siteData.profile.logoFile}" alt="${siteData.profile.logoAlt || siteData.profile.name}" loading="eager">
            </div>
            <div class="hero-panel-copy">
              <p class="panel-kicker">${siteData.profile.role}</p>
              <h2>${siteData.profile.affiliation}</h2>
            </div>
            ${renderFactList(siteData.profile.quickFacts)}
          </aside>
        </div>
      </section>

      ${renderCredibilityStrip()}
      ${renderFeaturedPublications()}
      ${renderFeaturedProjects()}

      <section class="page-section">
        <div class="container">
          <article class="editorial-callout">
            <div>
              <p class="eyebrow">Next conversation</p>
              <h2>Open to collaborations around classroom technology, active reading, and learning experience design.</h2>
            </div>
            <a class="button button-primary" href="contact.html">Get in touch</a>
          </article>
        </div>
      </section>
    `;
  }

  function renderAboutPage() {
    const honors = getHonorsItems();
    const resources = siteData.resources || [];

    return `
      ${renderPageHeader("about")}
      <section class="page-section">
        <div class="container prose-grid">
          <article class="prose-panel">
            <p class="lead">${siteData.about.pageIntro}</p>
            ${siteData.profile.bioLong.map((item) => `<p>${item}</p>`).join("")}
            <h2>Research Direction</h2>
            <p>${siteData.about.background}</p>
          </article>
          <aside class="sidebar-stack" aria-label="Research profile details">
            <section class="side-panel">
              <h2>Research Interests</h2>
              <div class="tag-list">
                ${siteData.profile.researchInterests.map((item) => `<span class="tag">${item}</span>`).join("")}
              </div>
            </section>
            <section class="side-panel">
              <h2>CV</h2>
              <p>${siteData.cv.note}</p>
              <a class="button button-secondary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Download CV</a>
            </section>
            ${honors.length ? `
              <section class="side-panel">
                <h2>Selected Recognition</h2>
                <div class="compact-list">
                  ${honors.map(renderCompactItem).join("")}
                </div>
              </section>
            ` : ""}
            ${resources.length ? `
              <section class="side-panel">
                <h2>Research Links</h2>
                <div class="compact-list">
                  ${resources.slice(0, 3).map(renderResourceCompactItem).join("")}
                </div>
              </section>
            ` : ""}
          </aside>
        </div>
      </section>

      <section class="page-section section-quiet">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Education</p>
              <h2>Academic Path</h2>
            </div>
          </div>
          <div class="timeline">
            ${siteData.about.education.map(renderEducationItem).join("")}
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Themes</p>
              <h2>Current Research Themes</h2>
            </div>
          </div>
          <div class="theme-list">
            ${siteData.about.themes.map(renderThemeItem).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderPublicationsPage() {
    const filters = Object.keys(categoryLabels);

    return `
      ${renderPageHeader(
        "publications",
        `<a class="button button-primary" href="${scholarLink}" target="_blank" rel="noopener">Open Google Scholar</a>`
      )}
      <section class="page-section page-section-compact">
        <div class="container">
          <div class="publication-summary-grid">
            ${renderStatItem(String(siteData.publications.length), "Publications listed")}
            ${renderStatItem(getPublicationYears(), "Publication span")}
            ${renderStatItem(getVenueSummary(), "Recent venues")}
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="container publication-layout">
          <aside class="publications-toolbar" aria-label="Publication filters">
            <label class="search-field">
              <span>Search publications</span>
              <input type="search" placeholder="Search title, venue, tag, year" data-publication-search>
            </label>
            <div class="filter-group" aria-label="Filter by publication type">
              ${filters
                .map(
                  (key) => `
                    <button class="filter-chip ${key === "all" ? "is-active" : ""}" type="button" data-filter="${key}" aria-pressed="${key === "all"}">
                      ${categoryLabels[key]}
                    </button>
                  `
                )
                .join("")}
            </div>
            <p class="results-note" data-results-count>${siteData.publications.length} publications shown</p>
          </aside>
          <div>
            <div class="publication-list">
              ${siteData.publications.map(renderPublicationItem).join("")}
            </div>
            <p class="empty-state" data-publications-empty hidden>No publications match this filter.</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderProjectsPage() {
    const projectId = new URLSearchParams(window.location.search).get("project");

    if (projectId) {
      const project = siteData.projects.find((item) => item.id === projectId);
      if (!project) return renderProjectNotFound();
      document.title = `${project.title} | ${siteData.profile.name}`;
      return renderProjectDetail(project);
    }

    return `
      ${renderPageHeader("projects")}
      <section class="page-section">
        <div class="container">
          <div class="project-list">
            ${siteData.projects.map(renderProjectCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTeachingPage() {
    return `
      ${renderPageHeader("teaching", "", siteData.teaching.intro)}
      <section class="page-section">
        <div class="container timeline">
          ${siteData.teaching.sections.map(renderTeachingSection).join("")}
        </div>
      </section>
    `;
  }

  function renderContactPage() {
    return `
      ${renderPageHeader("contact", "", siteData.contact.intro)}
      <section class="page-section">
        <div class="container contact-layout">
          <article class="prose-panel">
            <h2>Collaboration and Inquiries</h2>
            <p>${siteData.contact.intro}</p>
          </article>
          <div class="contact-list">
            ${siteData.contact.links.map(renderContactLink).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderCvPage() {
    return `
      ${renderPageHeader(
        "cv",
        `<a class="button button-primary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Download CV PDF</a>`
      )}
      <section class="page-section">
        <div class="container single-column">
          <article class="prose-panel">
            <p class="lead">${siteData.cv.note}</p>
            <ul class="bullet-list">
              ${siteData.cv.highlights.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function renderResourcesPage() {
    return `
      ${renderPageHeader("resources")}
      <section class="page-section">
        <div class="container resource-list">
          ${(siteData.resources || []).map(renderResourceItem).join("")}
        </div>
      </section>
    `;
  }

  function renderPageHeader(pageKey, actions = "", introOverride = "") {
    const meta = pageMeta[pageKey] || pageMeta.home;
    const intro = introOverride || meta.intro;

    return `
      <section class="page-hero">
        <div class="container page-hero-inner">
          <p class="eyebrow">${meta.eyebrow}</p>
          <h1>${meta.title}</h1>
          <p>${intro}</p>
          ${actions ? `<div class="page-actions">${actions}</div>` : ""}
        </div>
      </section>
    `;
  }

  function renderCredibilityStrip() {
    const facts = [
      { value: "PMRF", label: "Fellowship" },
      { value: "IIT Bombay", label: "Current institution" },
      { value: `${siteData.publications.length}`, label: "Publications listed" },
      { value: "EdTech + HCI", label: "Research focus" }
    ];

    return `
      <section class="credibility-strip" aria-label="Research credibility">
        <div class="container credibility-grid">
          ${facts.map((item) => renderStatItem(item.value, item.label)).join("")}
        </div>
      </section>
    `;
  }

  function renderFeaturedPublications() {
    const featured = siteData.publications.filter((pub) =>
      (siteData.featuredPublicationIds || []).includes(pub.id)
    );

    if (!featured.length) return "";

    return `
      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Scholarly work</p>
              <h2>Recent Publications</h2>
            </div>
            <a class="text-link" href="publications.html">All publications</a>
          </div>
          <div class="citation-list">
            ${featured.map(renderCitationItem).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFeaturedProjects() {
    const featured = siteData.projects
      .filter((item) => (siteData.featuredProjectIds || []).includes(item.id))
      .slice(0, 4);

    if (!featured.length) return "";

    return `
      <section class="page-section section-quiet">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Selected work</p>
              <h2>Research Projects</h2>
            </div>
            <a class="text-link" href="projects.html">See all projects</a>
          </div>
          <div class="project-list project-list-compact">
            ${featured.map(renderProjectCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFactList(facts) {
    if (!facts || !facts.length) return "";

    return `
      <dl class="fact-list">
        ${facts.map((fact) => `<div><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`).join("")}
      </dl>
    `;
  }

  function renderStatItem(value, label) {
    return `
      <div class="stat-item">
        <strong>${value}</strong>
        <span>${label}</span>
      </div>
    `;
  }

  function renderCitationItem(item) {
    const link = item.links && item.links[0];
    const label = categoryLongLabels[item.category] || item.category;
    const cls = categoryClass[item.category] || "is-conference";

    return `
      <article class="citation-item">
        <div class="citation-meta">
          <span class="publication-category ${cls}">${label}</span>
          <span>${item.year}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.authors}</p>
        <p><em>${item.venue}</em></p>
        ${link ? `<a class="text-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>` : ""}
      </article>
    `;
  }

  function renderPublicationItem(item) {
    const links = Array.isArray(item.links) ? item.links : [];
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const label = categoryLongLabels[item.category] || item.category;
    const cls = categoryClass[item.category] || "is-conference";

    return `
      <article class="publication-item" data-publication-item data-category="${item.category}" data-search="${createPublicationSearchText(item)}">
        <div class="publication-item-head">
          <span class="publication-category ${cls}">${label}</span>
          <span class="publication-year">${item.year}</span>
        </div>
        <h2>${item.title}</h2>
        <p class="publication-authors">${item.authors}</p>
        <p class="publication-venue">${item.venue}</p>
        ${tags.length ? `<div class="tag-list">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
        <details class="publication-abstract">
          <summary>Abstract</summary>
          <p>${item.abstract}</p>
        </details>
        ${links.length ? `<div class="link-row">${links.map(renderButtonLink).join("")}</div>` : ""}
      </article>
    `;
  }

  function renderProjectCard(project) {
    const href = `projects.html?project=${encodeURIComponent(project.id)}`;

    return `
      <article class="project-row" id="${project.id}">
        <a class="project-image" href="${href}" aria-label="Open ${project.title}">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">
        </a>
        <div class="project-body">
          <div class="project-meta">
            <span>${project.period}</span>
            ${project.tags && project.tags[0] ? `<span>${project.tags[0]}</span>` : ""}
          </div>
          <h3><a href="${href}">${project.title}</a></h3>
          <p>${project.summary}</p>
          <a class="text-link" href="${href}">Read project note</a>
        </div>
      </article>
    `;
  }

  function renderProjectDetail(project) {
    const detailParagraphs = ((project.details || {}).paragraphs || []).filter(Boolean);
    const detailImages = ((project.details || {}).images || []).filter((img) => img && img.src);

    return `
      <section class="page-section">
        <div class="container project-detail">
          <a class="text-link project-back-link" href="projects.html">Back to projects</a>
          <article class="project-detail-shell">
            <div class="project-detail-hero">
              <div class="project-detail-image">
                <img src="${project.image}" alt="${project.alt}">
              </div>
              <div class="project-detail-copy">
                <p class="eyebrow">${project.period}</p>
                <h1>${project.title}</h1>
                <p class="lead">${project.summary}</p>
                ${detailParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
                ${project.citation ? `<p class="project-citation">${project.citation}</p>` : ""}
                ${renderProjectLinks(project)}
              </div>
            </div>
            ${renderProjectOutcomes(project)}
            ${renderProjectTags(project)}
            ${detailImages.length ? `
              <section class="project-detail-section">
                <h2>Project Images</h2>
                <div class="project-gallery">
                  ${detailImages.map(renderProjectDetailImage).join("")}
                </div>
              </section>
            ` : ""}
          </article>
        </div>
      </section>
    `;
  }

  function renderProjectOutcomes(project) {
    const outcomes = Array.isArray(project.outcomes) ? project.outcomes.filter(Boolean) : [];
    if (!outcomes.length) return "";

    return `
      <section class="project-detail-section">
        <h2>Outcomes</h2>
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
      <section class="project-detail-section">
        <h2>Research Areas</h2>
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

    return `<div class="link-row">${links.map(renderButtonLink).join("")}</div>`;
  }

  function renderProjectDetailImage(image) {
    return `
      <figure class="project-gallery-item">
        <img src="${image.src}" alt="${image.alt || ""}" loading="lazy">
        ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderProjectNotFound() {
    return renderSimplePage(
      "Project not found",
      'The project link does not match an available project. <a class="inline-link" href="projects.html">Back to projects</a>.'
    );
  }

  function renderTeachingSection(section) {
    return `
      <section class="timeline-group">
        <div class="timeline-heading">
          ${section.eyebrow ? `<p class="eyebrow">${section.eyebrow}</p>` : ""}
          <h2>${section.title}</h2>
        </div>
        <div class="timeline-list">
          ${section.items.map(renderTeachingItem).join("")}
        </div>
      </section>
    `;
  }

  function renderTeachingItem(item) {
    const metadata = [item.role, item.term].map((part) => (part || "").trim()).filter(Boolean).join(" · ");

    return `
      <article class="timeline-item">
        <div class="timeline-period">${item.term || "Current"}</div>
        <div>
          <h3>${item.title}</h3>
          ${metadata ? `<p class="timeline-institution">${metadata}</p>` : ""}
          <p>${item.description}</p>
        </div>
      </article>
    `;
  }

  function renderEducationItem(item) {
    return `
      <article class="timeline-item">
        <div class="timeline-period">${item.period}</div>
        <div>
          <h3>${item.degree}</h3>
          <p class="timeline-institution">${item.institution}</p>
          <p>${item.detail}</p>
        </div>
      </article>
    `;
  }

  function renderThemeItem(theme) {
    const link =
      theme.link && theme.link.url
        ? `<a class="text-link" href="${theme.link.url}" target="_blank" rel="noopener">${theme.link.label || "Read more"}</a>`
        : "";

    return `
      <article class="theme-item">
        <h3>${theme.title}</h3>
        <p>${theme.description}</p>
        ${link}
      </article>
    `;
  }

  function renderCompactItem(item) {
    const meta = [item.role, item.term].map((part) => (part || "").trim()).filter(Boolean).join(" · ");

    return `
      <article class="compact-item">
        <h3>${item.title}</h3>
        ${meta ? `<p>${meta}</p>` : ""}
      </article>
    `;
  }

  function renderResourceCompactItem(item) {
    const link =
      item.url ? `<a class="text-link" href="${item.url}" target="_blank" rel="noopener">${item.linkLabel || "Open resource"}</a>` : "";

    return `
      <article class="compact-item">
        <h3>${item.title}</h3>
        <p>${item.value || item.description}</p>
        ${link}
      </article>
    `;
  }

  function renderResourceItem(item) {
    return `
      <article class="resource-item">
        <h2>${item.title}</h2>
        ${item.value ? `<p class="resource-value">${item.value}</p>` : ""}
        <p>${item.description}</p>
        ${item.url ? `<a class="text-link" href="${item.url}" target="_blank" rel="noopener">${item.linkLabel || "Open resource"}</a>` : ""}
      </article>
    `;
  }

  function renderContactLink(item) {
    const isMail = item.url.startsWith("mailto:");

    return `
      <a class="contact-item" href="${item.url}" target="${isMail ? "_self" : "_blank"}" ${isMail ? "" : 'rel="noopener"'}>
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </a>
    `;
  }

  function renderButtonLink(link) {
    return `<a class="button button-secondary" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`;
  }

  function renderSimplePage(title, intro) {
    return `
      <section class="page-section simple-page">
        <div class="container single-column">
          <h1>${title}</h1>
          <p>${intro}</p>
        </div>
      </section>
    `;
  }

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

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        toggle.focus();
      }
    });
  }

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
        const category = item.getAttribute("data-category");
        const searchable = item.getAttribute("data-search") || "";
        const isCategoryMatch = activeFilter === "all" || activeFilter === category;
        const isQueryMatch = !query || searchable.includes(query);
        const isVisible = isCategoryMatch && isQueryMatch;

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

  function getInitials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 3)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function getHonorsItems() {
    return (siteData.teaching.sections || [])
      .filter((section) => section.eyebrow === "Recognition")
      .flatMap((section) => section.items || []);
  }

  function getPublicationYears() {
    const years = siteData.publications.map((item) => Number(item.year)).filter(Boolean);
    return `${Math.min(...years)}-${Math.max(...years)}`;
  }

  function getVenueSummary() {
    return "Frontiers · ACM · ICCE";
  }

  function normalizeProjectLink(link) {
    return typeof link === "string" ? { label: "Open link", url: link } : link;
  }

  function createPublicationSearchText(item) {
    return [item.title, item.authors, item.venue, item.year, item.abstract, (item.tags || []).join(" ")]
      .join(" ")
      .toLowerCase();
  }
})();
