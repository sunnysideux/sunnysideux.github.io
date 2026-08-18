(function () {
  const baseSiteData = window.siteData;

  if (!baseSiteData) return;

  const i18n = window.siteI18n || {};
  const currentLanguage = readLanguagePreference();
  const siteData = i18n.localize ? i18n.localize(baseSiteData, currentLanguage) : baseSiteData;
  const ui = (i18n.ui && i18n.ui[currentLanguage]) || (i18n.ui && i18n.ui.en) || {};

  document.documentElement.lang = currentLanguage;

  const pageRoot = document.querySelector("[data-page-root]");
  const headerRoot = document.querySelector("[data-site-header]");
  const currentPage = document.body.dataset.page || "about";

  const navigation = [
    { key: "about", label: ui.navigation.about, href: "index.html" },
    { key: "projects", label: ui.navigation.projects, href: "projects.html" },
    { key: "teaching", label: ui.navigation.teaching, href: "teaching.html" },
    { key: "resources", label: ui.navigation.resources, href: "resources.html" },
    { key: "contact", label: ui.navigation.contact, href: "contact.html" }
  ];

  const pageMeta = {
    about: {
      title: ui.pageTitles.about
    },
    projects: {
      title: ui.pageTitles.projects
    },
    teaching: {
      title: ui.pageTitles.teaching
    },
    contact: {
      title: ui.pageTitles.contact
    },
    resources: {
      title: ui.pageTitles.resources
    }
  };

  renderChrome();
  renderPage();
  bindNavigation();
  bindLanguageToggle();

  const skipLink = document.querySelector(".skip-link");
  if (skipLink) skipLink.textContent = ui.skipToContent;

  function renderChrome() {
    if (headerRoot) {
      const profileLinks = (siteData.contact && siteData.contact.links) || [];
      headerRoot.innerHTML = `
        <div class="sidebar-inner">
          <a class="sidebar-profile" href="index.html" aria-label="${ui.goHome}">
            <img class="sidebar-portrait" src="${siteData.profile.logoFile}" alt="">
            <span class="sidebar-name">${siteData.profile.name}</span>
            <span class="sidebar-role">${siteData.profile.role}</span>
            <span class="sidebar-affiliation">${siteData.profile.affiliation}</span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span class="sr-only">${ui.toggleNavigation}</span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="${ui.primaryNavigation}">
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
          <button class="language-toggle" type="button" data-language-toggle aria-label="${ui.switchLanguage}" aria-pressed="${currentLanguage === "hi"}">
            <span class="${currentLanguage === "en" ? "is-active" : ""}" lang="en">EN</span>
            <span aria-hidden="true">/</span>
            <span class="${currentLanguage === "hi" ? "is-active" : ""}" lang="hi">हिंदी</span>
          </button>
          <div class="sidebar-contact" aria-label="${ui.profileLinks}">
            ${profileLinks
              .map((item) => {
                const isMail = item.url.startsWith("mailto:");
                return `<a href="${item.url}" target="${isMail ? "_self" : "_blank"}" ${isMail ? "" : 'rel="noopener"'}>${item.label}</a>`;
              })
              .join("")}
          </div>
          <a class="sidebar-cv" href="${siteData.profile.cvFile}" target="_blank" rel="noopener">${ui.downloadCv}</a>
          <p class="sidebar-license">${ui.licensePrefix} <a href="LICENSE">GPL-3.0</a>.</p>
        </div>
      `;
    }
  }

  function renderPage() {
    if (!pageRoot) return;

    const renderer = {
      about: renderAboutPage,
      projects: renderProjectsPage,
      teaching: renderTeachingPage,
      contact: renderContactPage,
      resources: renderResourcesPage
    }[currentPage];

    if (!renderer) {
      pageRoot.innerHTML = renderSimplePage(ui.pageNotFound, ui.pageNotFoundMessage);
      return;
    }

    const meta = pageMeta[currentPage] || pageMeta.about;
    document.title = `${meta.title} | ${siteData.profile.name}`;
    pageRoot.innerHTML = renderer();
  }

  function renderAboutPage() {
    return `
      ${renderPageHeader("about")}
      <section class="page-section">
        <div class="container single-column">
          <article class="prose-panel">
            <p class="lead">${siteData.about.pageIntro}</p>
            ${siteData.profile.bioLong.filter((item) => item.trim()).map((item) => `<p>${item}</p>`).join("")}
            <h2>${ui.researchInterests}</h2>
            <div class="tag-list">
              ${siteData.profile.researchInterests.map((item) => `<span class="tag">${item}</span>`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="page-section section-quiet">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="eyebrow">${ui.education}</p>
              <h2>${ui.academicPath}</h2>
            </div>
          </div>
          <div class="timeline">
            ${siteData.about.education.map(renderEducationItem).join("")}
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
      ${renderPageHeader("teaching")}
      <section class="page-section">
        <div class="container timeline">
          ${siteData.teaching.sections.map(renderTeachingSection).join("")}
        </div>
      </section>
    `;
  }

  function renderContactPage() {
    return `
      ${renderPageHeader("contact")}
      <section class="page-section">
        <div class="container single-column contact-stack">
          <article class="prose-panel">
            <h2>${ui.collaboration}</h2>
            <p>${siteData.contact.intro}</p>
          </article>
          <div class="contact-list">
            ${siteData.contact.links.map(renderContactLink).join("")}
          </div>
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

  function renderPageHeader(pageKey, actions = "") {
    const meta = pageMeta[pageKey] || pageMeta.about;

    return `
      <section class="page-hero">
        <div class="container page-hero-inner">
          <h1>${meta.title}</h1>
          ${actions ? `<div class="page-actions">${actions}</div>` : ""}
        </div>
      </section>
    `;
  }

  function renderProjectCard(project) {
    const href = `projects.html?project=${encodeURIComponent(project.id)}`;

    return `
      <article class="project-row" id="${project.id}">
        <a class="project-image" href="${href}" aria-label="${ui.openProject} ${project.title}">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">
        </a>
        <div class="project-body">
          <div class="project-meta">
            <span>${project.period}</span>
            ${project.tags && project.tags[0] ? `<span>${project.tags[0]}</span>` : ""}
          </div>
          <h3><a href="${href}">${project.title}</a></h3>
          <p>${project.summary}</p>
          <a class="text-link" href="${href}">${ui.readProject}</a>
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
          <a class="text-link project-back-link" href="projects.html">${ui.backToProjects}</a>
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
                <h2>${ui.projectImages}</h2>
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
        <h2>${ui.outcomes}</h2>
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
        <h2>${ui.researchAreas}</h2>
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
      ui.projectNotFound,
      `${ui.projectNotFoundMessage} <a class="inline-link" href="projects.html">${ui.backToProjects}</a>.`
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
        <div class="timeline-period">${item.term || ui.current}</div>
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

  function renderResourceItem(item) {
    return `
      <article class="resource-item">
        <h2>${item.title}</h2>
        ${item.value ? `<p class="resource-value">${item.value}</p>` : ""}
        <p>${item.description}</p>
        ${item.url ? `<a class="text-link" href="${item.url}" target="_blank" rel="noopener">${item.linkLabel || ui.openResource}</a>` : ""}
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

  function readLanguagePreference() {
    try {
      return window.localStorage.getItem(i18n.storageKey) === "hi" ? "hi" : "en";
    } catch (error) {
      return "en";
    }
  }

  function bindLanguageToggle() {
    const toggle = document.querySelector("[data-language-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const nextLanguage = currentLanguage === "hi" ? "en" : "hi";

      try {
        window.localStorage.setItem(i18n.storageKey, nextLanguage);
      } catch (error) {
        return;
      }

      window.location.reload();
    });
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

  function normalizeProjectLink(link) {
    return typeof link === "string" ? { label: ui.openLink, url: link } : link;
  }

})();
