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
    home: { title: "Home", intro: "Research, publications, projects, and contact information." },
    about: { title: "About", intro: "Biography, background, affiliation, and research themes." },
    publications: { title: "Publications", intro: "Selected journal articles, conference papers, workshops, and posters." },
    projects: { title: "Projects", intro: "Research projects, tags, outcomes, and related links." },
    teaching: { title: "Teaching", intro: "Courses, workshops, and mentoring." },
    resources: { title: "Resources", intro: "A small collection of books, websites, and courses worth returning to." },
    cv: { title: "CV", intro: "Curriculum vitae and downloadable materials." },
    contact: { title: "Contact", intro: "Ways to get in touch and connect." }
  };

  const scholarLink =
    (siteData.contact.links.find((item) => item.label === "Google Scholar") || {}).url ||
    "publications.html";

  const navigation = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "teaching", label: "Teaching", href: "teaching.html" },
    { key: "resources", label: "Resources", href: "resources.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
	    { key: "publications", label: "Publications", href: scholarLink, external: true }
  ];

  const categoryLabels = {
    all: "All",
    "journal article": "Journal articles",
    "conference paper": "Conference papers",
    "workshop paper": "Workshop papers",
    poster: "Posters"
  };

  const featuredProjects = siteData.projects.filter((item) =>
    siteData.featuredProjectIds.includes(item.id)
  );
  const profileInitials = siteData.profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0].toUpperCase())
    .join("");

  renderChrome();
  renderPage();
  bindNavigation();
  bindProjectCards();
  bindPublications();
  bindContactForm();

  function renderChrome() {
    if (headerRoot) {
      headerRoot.innerHTML = `
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Go to home page">
            <span class="brand-media">
              ${
                siteData.profile.logoFile
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
                  <a href="${item.href}" ${item.key === currentPage ? 'aria-current="page"' : ""} ${item.external ? 'target="_blank" rel="noopener"' : ""}>
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
            <p>${siteData.profile.role} / ${siteData.profile.affiliation}</p>
            <p class="footer-license">Code licensed under <a href="LICENSE">GPL-3.0</a>.</p>
          </div>
          <div class="footer-links">
            <a href="contact.html">Contact</a>
          </div>
        </div>
      `;
    }
  }

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

    document.title = `${pageMeta[currentPage].title} | ${siteData.profile.name}`;
    pageRoot.innerHTML = renderer();
  }

  function renderHomePage() {
    return `
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">PhD Researcher / IIT Bombay</p>
            <h1>${siteData.profile.name}</h1>
            <p class="hero-tagline">${siteData.profile.tagline}</p>
            <p class="hero-summary">${siteData.profile.bioShort}</p>
            <div class="button-row">
              <a class="button button-primary" href="projects.html">Explore projects</a>
              <a class="button button-secondary" href="${scholarLink}" target="_blank" rel="noopener">Browse publications</a>
              <a class="button button-tertiary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Download CV</a>
            </div>
            <div class="tag-list" aria-label="Research interests">
              ${siteData.profile.researchInterests.map((item) => `<span class="tag">${item}</span>`).join("")}
            </div>
          </div>
          <aside class="hero-panel" aria-label="Research snapshot">
            <p class="panel-kicker">Current profile</p>
            <h2>${siteData.profile.role}</h2>
            <p class="panel-affiliation">${siteData.profile.affiliation}</p>
            <ul class="detail-list">
              ${siteData.profile.quickFacts
                .map(
                  (fact) => `
                    <li>
                      <span>${fact.label}</span>
                      <strong>${fact.value}</strong>
                    </li>
                  `
                )
                .join("")}
            </ul>
            <div class="hero-contact-links">
              <a href="mailto:${siteData.profile.email}">${siteData.profile.email}</a>
              <span>${siteData.profile.location}</span>
            </div>
          </aside>
        </div>
      </section>

      <section class="page-section">
        <div class="container section-grid section-grid-home">
          <div class="section-intro">
            <p class="eyebrow">Research profile</p>
            <h2>Designing learning experiences that fit real classrooms.</h2>
            <p>${siteData.about.pageIntro}</p>
          </div>
          <div class="key-points">
            ${siteData.about.themes
              .map(
                (theme) => `
                  <article class="card subtle-card">
                    <h3>${theme.title}</h3>
                    <p>${theme.description}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

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
    `;
  }

  function renderAboutPage() {
    return `
      <section class="page-section">
        <div class="container prose-grid">
          <article class="prose-card">
            <h2>Biography</h2>
            ${siteData.profile.bioLong.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <p>${siteData.about.background}</p>
          </article>
          <aside class="prose-sidebar">
            <article class="card">
              <p class="eyebrow">Current affiliation</p>
              <h2>${siteData.profile.affiliation}</h2>
              <p>${siteData.about.currentAffiliation}</p>
            </article>
            <article class="card">
              <p class="eyebrow">Research interests</p>
              <div class="tag-list">
                ${siteData.profile.researchInterests.map((item) => `<span class="tag">${item}</span>`).join("")}
              </div>
            </article>
          </aside>
        </div>
      </section>

      <section class="page-section section-tinted">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Background</p>
              <h2>Education</h2>
            </div>
          </div>
          <div class="timeline">
            ${siteData.about.education
              .map(
                (item) => `
                  <article class="timeline-item">
                    <span class="timeline-period">${item.period}</span>
                    <div>
                      <h3>${item.degree}</h3>
                      <p class="timeline-institution">${item.institution}</p>
                      <p>${item.detail}</p>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">Themes</p>
              <h2>Core research directions</h2>
            </div>
          </div>
          <div class="card-grid">
            ${siteData.about.themes
              .map(
                (theme) => `
                  <article class="card">
                    <h3>${theme.title}</h3>
                    <p>${theme.description}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderPublicationsPage() {
    const categories = [
      "all",
      ...new Set(siteData.publications.map((item) => item.category))
    ];
    const sortedPublications = [...siteData.publications].sort((a, b) => b.year - a.year);

    return `
      <section class="page-section">
        <div class="container">
          <div class="publications-toolbar">
            <label class="search-field" for="publication-search">
              <span class="sr-only">Search publications</span>
              <input id="publication-search" type="search" placeholder="Search by title, author, venue, year, or tag" data-publication-search>
            </label>
            <div class="filter-group" aria-label="Publication categories">
              ${categories
                .map(
                  (category) => `
                    <button class="filter-chip${category === "all" ? " is-active" : ""}" type="button" data-filter="${category}" aria-pressed="${category === "all"}">
                      ${categoryLabels[category] || category}
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
          <p class="results-note" data-results-count aria-live="polite">${sortedPublications.length} publications shown</p>
          <div class="stack-list" data-publications-list>
            ${sortedPublications.map(renderPublicationCard).join("")}
          </div>
          <p class="empty-state" data-publications-empty hidden>No publications match the current search and filter.</p>
        </div>
      </section>
    `;
  }

  function renderProjectsPage() {
    const projectId = new URLSearchParams(window.location.search).get("project");

    if (projectId) {
      const project = siteData.projects.find((item) => item.id === projectId);

      if (!project) {
        return renderProjectNotFound();
      }

      return renderProjectDetail(project);
    }

    return `
      <section class="page-section">
        <div class="container">
          <div class="card-grid card-grid-projects">
            ${siteData.projects.map(renderProjectCard).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTeachingPage() {
    return `
      <section class="page-section">
        <div class="container teaching-grid">
          ${siteData.teaching.sections.map(renderTeachingSection).join("")}
        </div>
      </section>
    `;
  }

  function renderResourcesPage() {
    const resources = Array.isArray(siteData.resources) ? siteData.resources : [];

    return `
      <section class="page-section">
        <div class="container">
          ${
            resources.length
              ? `
                <div class="resources-grid">
                  ${resources.map(renderResourceItem).join("")}
                </div>
              `
              : `
                <article class="card resources-empty">
                  <p class="eyebrow">Coming soon</p>
                  <h2>Recommendations will live here.</h2>
                  <p>Add items to <code>assets/js/site-data.js</code> under <code>resources</code> to publish books, websites, and courses on this page.</p>
                </article>
              `
          }
        </div>
      </section>
    `;
  }

  function renderCvPage() {
    return `
      <section class="page-section">
        <div class="container cv-grid">
          <article class="card cv-panel">
            <p class="eyebrow">Download</p>
            <h2>Curriculum vitae</h2>
            <p>${siteData.cv.note}</p>
            <a class="button button-primary" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">Open CV PDF</a>
          </article>
          <article class="card">
            <p class="eyebrow">Highlights</p>
            <h2>At a glance</h2>
            <ul class="bullet-list">
              ${siteData.cv.highlights.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
      </section>
    `;
  }

  function renderContactPage() {
    return `
      <section class="page-section">
        <div class="container contact-grid">
          <article class="card contact-card">
            <p class="eyebrow">Reach out</p>
            <h2>Contact links</h2>
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

  function renderPublicationCard(item) {
    return `
      <article class="card publication-card" data-publication-item data-category="${item.category}" data-search="${createPublicationSearchText(item)}">
        <div class="publication-meta">
          <span class="publication-badge">${categoryLabels[item.category] || item.category}</span>
          <span class="publication-year">${item.year}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="publication-authors">${item.authors}</p>
        <p class="publication-venue">${item.venue}</p>
        <p>${item.abstract}</p>
        <div class="tag-list">
          ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="link-row">
          ${item.links.map((link) => `<a class="text-link" href="${link.url}">${link.label}</a>`).join("")}
        </div>
      </article>
    `;
  }

  function renderProjectCard(project) {
    const href = `projects.html?project=${encodeURIComponent(project.id)}`;

    return `
      <article class="card project-card project-card-clickable" id="${project.id}" role="link" tabindex="0" data-project-card data-project-href="${href}" aria-label="Open project: ${project.title}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.alt}">
        </div>
        <div class="project-body">
          <div class="project-meta">
            <span class="publication-badge">Research project</span>
            <span>${project.period}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          ${renderProjectOutcomes(project)}
          ${renderProjectTags(project)}
          ${renderProjectLinks(project)}
        </div>
      </article>
    `;
  }

  function renderProjectDetail(project) {
    const detailParagraphs = ((project.details || {}).paragraphs || []).filter(Boolean);
    const detailImages = ((project.details || {}).images || []).filter((image) => image && image.src);

    return `
      <section class="page-section">
        <div class="container project-detail">
          <article class="project-detail-shell">
            <div class="project-detail-hero">
              <div class="project-detail-image">
                <img src="${project.image}" alt="${project.alt}">
              </div>
              <div class="project-detail-copy">
                <div class="project-meta">
                  <span class="publication-badge">Research project</span>
                  <span>${project.period}</span>
                </div>
                <h1>${project.title}</h1>
                <p>${project.summary}</p>
                ${detailParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              </div>
            </div>
            ${renderProjectOutcomes(project)}
            ${renderProjectTags(project)}
            ${renderProjectLinks(project)}
            ${
              detailImages.length
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

  function renderProjectOutcomes(project) {
    const outcomes = Array.isArray(project.outcomes) ? project.outcomes.filter(Boolean) : [];

    if (!outcomes.length) {
      return "";
    }

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

    if (!tags.length) {
      return "";
    }

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
    const links = Array.isArray(project.links) ? project.links.filter((link) => link && link.url && link.label) : [];

    if (!links.length) {
      return "";
    }

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

  function renderProjectDetailImage(image) {
    return `
      <figure class="project-gallery-item">
        <img src="${image.src}" alt="${image.alt || ""}">
        ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderTeachingSection(section) {
    return `
      <section class="teaching-column">
        <div class="section-header section-header-compact">
          <div>
            <h2>${section.title}</h2>
          </div>
        </div>
        <div class="stack-list">
          ${section.items
            .map(
              (item) => `
                <article class="card teaching-card">
                  <h3>${item.title}</h3>
                  <p>${formatTeachingItemText(item)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function formatTeachingItemText(item) {
    const role = (item.role || "").trim();
    const term = (item.term || "").trim();
    const description = (item.description || "").trim();
    const metadata = [role, term].filter(Boolean).join(", ");

    if (metadata && description) {
      return `${metadata}. ${description}`;
    }

    return metadata || description;
  }

  function renderResourceItem(item) {
    const externalAttributes = isExternalResourceLink(item.url) ? 'target="_blank" rel="noopener"' : "";

    return `
      <a class="resource-item" href="${item.url}" ${externalAttributes}>
        <span class="publication-badge">Recommended</span>
        <h3>${item.title}</h3>
      </a>
    `;
  }

  function bindNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) {
      return;
    }

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
  }

  function bindProjectCards() {
    document.querySelectorAll("[data-project-card]").forEach((card) => {
      const href = card.getAttribute("data-project-href");

      if (!href) {
        return;
      }

      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }

        window.location.href = href;
      });

      card.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        if (event.target.closest("a")) {
          return;
        }

        event.preventDefault();
        window.location.href = href;
      });
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
        const searchableText = item.getAttribute("data-search") || "";
        const categoryMatch = activeFilter === "all" || activeFilter === category;
        const queryMatch = !query || searchableText.includes(query);
        const isVisible = categoryMatch && queryMatch;

        item.hidden = !isVisible;

        if (isVisible) {
          visibleCount += 1;
        }
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

  function bindContactForm() {
    const form = document.querySelector("[data-contact-form]");
    const formNote = document.querySelector("[data-form-note]");

    if (!form || !formNote) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      formNote.textContent = "Thanks for drafting a message. This demo form has no backend yet, so please reach out by email until you connect a form service.";
    });
  }

  function createPublicationSearchText(item) {
    return [item.title, item.authors, item.venue, item.year, item.abstract, item.tags.join(" ")]
      .join(" ")
      .toLowerCase();
  }

  function isExternalResourceLink(url) {
    return /^https?:\/\//.test(url) || url.startsWith("mailto:");
  }
})();
