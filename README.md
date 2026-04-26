# Academic Researcher Website

This repository contains a complete static personal website for an HCI and learning sciences PhD researcher. It is designed to work directly on GitHub Pages with no build step and no backend.

## File structure

```text
.
|-- index.html
|-- about.html
|-- publications.html
|-- projects.html
|-- teaching.html
|-- cv.html
|-- contact.html
|-- LICENSE
|-- README.md
`-- assets
    |-- css
    |   `-- styles.css
    |-- files
    |   `-- researcher-cv.pdf
    |-- images
    |   |-- logo-sunny.png
    |   |-- project-learning-ecologies.svg
    |   |-- project-peer-mentors.svg
    |   `-- project-reflective-ai.svg
    `-- js
        |-- main.js
        `-- site-data.js
```

## How to edit text

Most of the site content lives in `assets/js/site-data.js`.

- Replace the profile details in the `profile` section for your name, affiliation, email, tagline, and biography.
- Replace `profile.logoFile` or the image at `assets/images/logo-sunny.png` if you want to change the brand image in the header.
- Update the `about` section for your background, education, and research themes.
- Edit `contact.links` to point to your actual GitHub, Google Scholar, ORCID, LinkedIn, and email.
- Change any page layout or visual styles in `assets/css/styles.css`.

The HTML files are lightweight page shells. In most cases, you will not need to edit them unless you want to add or remove pages.

## How to add publications

Open `assets/js/site-data.js` and find the `publications` array.

The main site navigation now sends visitors to your Google Scholar profile. The `publications` array is still used for featured publications shown on the homepage.

Each publication uses this structure:

```js
{
  id: "pub-example",
  category: "conference paper",
  title: "Title of the publication",
  authors: "Author One, Author Two",
  venue: "Conference or journal name",
  year: 2026,
  abstract: "Short abstract or summary.",
  links: [
    { label: "PDF", url: "#" },
    { label: "DOI", url: "#" }
  ],
  tags: ["HCI", "learning sciences"]
}
```

Valid categories used by the filter UI:

- `journal article`
- `conference paper`
- `workshop paper`
- `poster`

To feature an item on the homepage, add its `id` to `featuredPublicationIds`.

## How to add projects

Open `assets/js/site-data.js` and find the `projects` array.

Each project uses this structure:

```js
{
  id: "project-example",
  title: "Project title",
  period: "2025-present",
  summary: "Short project summary.",
  outcomes: ["Outcome 1", "Outcome 2"],
  tags: ["Tag 1", "Tag 2"],
  links: [
    { label: "Project page", url: "https://example.com" }
  ],
  details: {
    paragraphs: ["Longer text for the project detail view."],
    images: [
      {
        src: "assets/images/detail-image.jpg",
        alt: "Accessible description of the image",
        caption: "Optional caption"
      }
    ]
  },
  image: "assets/images/your-image-file.jpg",
  alt: "Accessible description of the project image"
}
```

- Add image files to `assets/images`.
- If you want a project featured on the homepage, add its `id` to `featuredProjectIds`.
- Project cards open a detail view at `projects.html?project=project-id`.
- Leave `links`, `details.paragraphs`, or `details.images` empty if you do not need them yet.

## How to replace the CV

The site currently links to:

```text
assets/files/researcher-cv.pdf
```

To replace it:

1. Put your own PDF at `assets/files/researcher-cv.pdf`.
2. Keep the same filename, or update `profile.cvFile` in `assets/js/site-data.js`.
3. Update the highlight bullets in the `cv` section if needed.

There is no separate CV tab in the main navigation. The CV is primarily surfaced through direct download links.

## How to replace the logo

The header logo currently points to:

```text
assets/images/logo-sunny.png
```

To replace it:

1. Put your new image at `assets/images/logo-sunny.png`.
2. Or keep a different filename and update `profile.logoFile` in `assets/js/site-data.js`.
3. Update `profile.logoAlt` so the image stays accessible.

## How to deploy on GitHub Pages

This site is ready for GitHub Pages as a plain static site.

1. Push the repository to GitHub.
2. In the repository on GitHub, open `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your default branch, usually `main`, and choose the `/ (root)` folder.
6. Save the settings.
7. GitHub Pages will publish the site from the root files in this repository.

No build command or package installation is required.

## License

The code in this repository is licensed under the GNU General Public License v3.0.

- See `LICENSE` for the full text.
- The site uses Lexend as its primary typeface and loads it from Google Fonts at runtime, with system sans-serif fallbacks if it is unavailable.

## Notes

- The contact form is UI only and does not submit anywhere.
- The publication page includes client-side search and category filters.
- The design is responsive and uses semantic HTML, accessible contrast, and lightweight JavaScript.
