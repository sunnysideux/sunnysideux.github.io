		/* Replace the content in this file to personalize the site.
   The layout and interactions live in assets/js/main.js. */
window.siteData = {
  profile: {
    name: "Sunny Prakash Prajapati",
    tagline:
      "I create funcitonal Edtech solutions for real world contexts.",
    affiliation: "Centre for Educational Technology, Indian Institute of Technology Bombay",
    role: "PhD Candidate",
    location: "Mumbai, India",
    email: "22d1201@iitb.ac.in",
    logoFile: "assets/images/logo-sunny.png",
    logoAlt: "Stylized portrait logo of Sunny Prakash Prajapati",
    bioShort:
      "Sunny Prakash Prajapati is a PhD researcher whose work sits at the intersection of educational technology, HCI in education, and learning experience design. He studies how phygital textbooks, AI-supported tools, and carefully designed classroom interfaces can strengthen active and collaborative learning.",
    bioLong: [
      "Sunny Prakash Prajapati is a PhD Research Scholar in Educational Technology at the Centre for Educational Technology, Indian Institute of Technology Bombay, where he is advised by Prof. Syaamantak Das. His research focuses on designing and evaluating phygital learning environments that connect print textbooks, smartphone companions, AI support, and collaborative classroom practice.",
      "Before beginning his PhD in 2022, Sunny completed an M.Des in Product Design and Engineering at the Indian Institute of Science and a B.Tech in Mechanical Engineering at MANIT Bhopal. His academic and professional experience spans design education, engineering, and teaching, including roles at PES University, National Institute of Design Bengaluru, Sardar Patel College of Engineering, Kendriya Vidyalaya IIT Powai, and TATA Advanced Systems."
    ],
    researchInterests: [
      "HCI in Education",
      "Educational Technology",
      "Learning Experience Design",
      "Phygital Learning Environments",
      "AI-augmented learning",
      "Design research",
      "Agent-based Modelling",
	  "Complexity"
    ],
    quickFacts: [
      {
        label: "Current focus",
        value: "Developing LLM integrated tools to support academic reading"
      },
      {
        label: "An unusual skill",
        value: "I know how to make bath soaps"
      },
      {
        label: "Awards & Grants",
        value: "Prime Minister's Research Fellowship, LOTUS Grant 2025, GMTA for ACM IUI 2023, and ACM SIGMM Travel Grant for IMX 2025"
      }
    ],
    cvFile: "assets/files/researcher-cv.pdf"
  },
  about: {
    pageIntro:
      "My research explores how learning solutions can be designed for authentic learning settings using technologies like LLMs and design of learning experiences. Currently for my PhD, I am investigating the phygital reading behaviors of school students. Please refer to my publications to know more about the research in that area",
    currentAffiliation:
      "I am currently a PhD Research Scholar at the Centre for Educational Technology, IIT Bombay",
    background:
      "My background combines engineering, product design, and educational technology. That path continues to shape how I approach research as in I try to conciously create systems for learning such that they are useful and have the potential for real world use.",
    education: [
      {
        degree: "PhD in Educational Technology",
        institution: "Indian Institute of Technology Bombay",
        period: "2022-present",
        detail: "Advisor: Prof. Syaamantak Das"
      },
      {
        degree: "M.Des in Product Design and Engineering",
        institution: "Indian Institute of Science Bangalore",
        period: "2016-2018",
        detail: "Dissertation project supervisor: Prof. Satish Vasu Kailas"
      },
      {
        degree: "B.Tech in Mechanical Engineering",
        institution: "Maulana Azad National Institute of Technology, Bhopal",
        period: "2012-2016",
        detail: "Major project supervisor: Prof. R. K. Dwivedi"
      }
    ],
    themes: [
      {
        title: "Phygital textbooks and active reading",
        description:
          "I study how printed textbooks can be extended with smartphone companions, interactive layers, and collaborative workflows to support active learning in classrooms."
      },
      {
        title: "AI-augmented learning interfaces",
        description:
          "My recent work explores how AI and retrieval-based support can help learners navigate content, ask questions, and receive guidance in ways that remain grounded in real educational contexts."
      },
      {
        title: "Usability and learning experience evaluation",
        description:
          "I am interested in how learning technologies are evaluated in practice, especially how usability methods can better account for classroom dynamics and learning goals."
      }
    ]
  },
  featuredPublicationIds: [
    "pub-frontiers-2025",
    "pub-imx-2025",
    "pub-icce-mr-2025"
  ],
  featuredProjectIds: [
    "project-phygital-textbooks",
    "project-active-reading",
    "project-robotub"
  ],
  publications: [
    {
      id: "pub-frontiers-2025",
      category: "journal article",
      title:
        "Understanding Students' Active Reading in Phygital Learning Environments: A Study of Smartphone-Based Textbook Companions in Indian Classrooms",
      authors: "Sunny Prakash Prajapati and Syaamantak Das",
      venue: "Frontiers in Education",
      year: 2025,
      abstract:
        "This journal article examines how students engage in active reading when textbook companions on smartphones are introduced into Indian classrooms, with attention to design, interaction patterns, and classroom use.",
      links: [
        { label: "Article", url: "https://doi.org/10.3389/feduc.2025.1660133" }
      ],
      tags: ["phygital learning", "active reading", "classroom technology", "journal"]
    },
    {
      id: "pub-imx-2025",
      category: "conference paper",
      title:
        "Is 'quick and dirty' good enough? An analysis of the usability evaluation practices for learning environment design",
      authors: "Sunny Prakash Prajapati and Syaamantak Das",
      venue: "ACM International Conference on Interactive Media Experiences (IMX)",
      year: 2025,
      abstract:
        "This paper analyzes how usability evaluation is commonly conducted for learning environments and questions when lightweight methods are adequate for educational design decisions.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3706370.3727857" }
      ],
      tags: ["usability", "learning environment design", "evaluation", "IMX"]
    },
    {
      id: "pub-icce-mr-2025",
      category: "conference paper",
      title:
        "Extending the Textbook: Co-designing AI-Augmented Interfaces for Mixed Reality Learning in Indian Classrooms",
      authors: "Ganesh Beniwal, Sunny Prakash Prajapati, Syaamantak Das, and Rwitajit Majumdar",
      venue: "Proceedings of the 33rd International Conference on Computers in Education, Volume II",
      year: 2025,
      abstract:
        "This paper presents co-designed AI-augmented mixed reality interfaces that extend textbook-based learning for Indian classrooms and discusses design possibilities for future classroom adoption.",
      links: [
        { label: "Proceedings", url: "https://library.apsce.net/index.php/ICCE/article/view/5938" }
      ],
      tags: ["AI", "mixed reality", "co-design", "ICCE"]
    },
    {
      id: "pub-robotub-2025",
      category: "conference paper",
      title: "RoboTuB: Retrieval-Augmented Tutoring for Adaptive Learning in STEM MOOCs",
      authors: "A. Pandey, G. Mishra, Sunny Prakash Prajapati, and Syaamantak Das",
      venue: "Proceedings of the 33rd International Conference on Computers in Education, Volume I",
      year: 2025,
      abstract:
        "RoboTuB explores a retrieval-augmented tutoring approach for adaptive support in STEM MOOCs, combining question answering with course-grounded assistance.",
      links: [
        { label: "Proceedings", url: "https://library.apsce.net/index.php/ICCE/article/view/5606" }
      ],
      tags: ["RAG", "tutoring", "MOOCs", "adaptive learning"]
    },
    {
      id: "pub-teachers-2024",
      category: "conference paper",
      title:
        "From textbooks to classroom implementation: Experience report of middle school science teachers' pedagogy for activity-based learning",
      authors: "Z. Mo, Sunny Prakash Prajapati, Vasudevan Sheeja, and Sahana Murthy",
      venue: "International Conference on Computers in Education (ICCE)",
      year: 2024,
      abstract:
        "This experience report looks at how middle school science teachers move from textbook materials to classroom implementation when supporting activity-based learning.",
      links: [
        { label: "Proceedings", url: "https://library.apsce.net/index.php/ICCE/article/view/5528" }
      ],
      tags: ["teachers", "activity-based learning", "science education", "ICCE"]
    },
    {
      id: "pub-biovarse-2023",
      category: "conference paper",
      title:
        "Supporting Learning Through Affordance Based Design: A Comparative Analysis of BioVARse and a Standard Textbook Companion Application in Biology Education",
      authors: "D. Saindane, Sunny Prakash Prajapati, and Syaamantak Das",
      venue: "31st International Conference on Computers in Education, Volume I",
      year: 2023,
      abstract:
        "This comparative study examines how affordance-based design shapes learning support in BioVARse relative to a more standard textbook companion application for biology education.",
      links: [
        { label: "DOI", url: "https://doi.org/10.58459/icce.2023.1020" }
      ],
      tags: ["biology education", "affordances", "textbook companion", "ICCE"]
    },
    {
      id: "pub-dhh-2023",
      category: "conference paper",
      title:
        "Design and Development of a Sentence Construction Game for Deaf and Hard of Hearing (DHH) Users: A Qualitative Usability Study",
      authors: "A. Prasad, Sunny Prakash Prajapati, Utkarsh, and V. Badhe",
      venue: "31st International Conference on Computers in Education, Volume I",
      year: 2023,
      abstract:
        "This paper presents a sentence-construction game for Deaf and Hard of Hearing users and reports a qualitative usability study of the design.",
      links: [
        { label: "DOI", url: "https://doi.org/10.58459/icce.2023.1094" }
      ],
      tags: ["accessibility", "DHH", "usability", "game design"]
    },
    {
      id: "pub-itextbooks-2023",
      category: "workshop paper",
      title:
        "Converting Physical Textbooks into Interactive and Immersive 'Phygital' Textbooks: A Proposed System Architecture Design for Textbook Companion Apps",
      authors: "D. Saindane, Sunny Prakash Prajapati, and Syaamantak Das",
      venue: "iTextbooks@AIED",
      year: 2023,
      abstract:
        "This workshop paper proposes a system architecture for transforming physical textbooks into interactive and immersive phygital textbook companion applications.",
      links: [
        { label: "PDF", url: "https://ceur-ws.org/Vol-3444/itb23_s4p2.pdf" }
      ],
      tags: ["phygital textbooks", "system architecture", "AIED", "workshop"]
    },
    {
      id: "pub-iui-poster-2023",
      category: "poster",
      title: "Designing a Phygital Interface for Textbooks to Support Active Collaborative Learning",
      authors: "Sunny Prakash Prajapati and Syaamantak Das",
      venue: "Companion of the 28th International Conference on Intelligent User Interfaces",
      year: 2023,
      abstract:
        "This IUI companion paper introduces a phygital interface concept for textbooks aimed at supporting active and collaborative learning in classroom settings.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3581754.3584117" }
      ],
      tags: ["IUI", "phygital interface", "collaborative learning", "poster"]
    },
    {
      id: "pub-iui-dc-2023",
      category: "conference paper",
      title:
        "Designing an immersive collaborative active learning experience through Phygital textbooks: Envisioning the artefact and its impact in the classrooms",
      authors: "Sunny Prakash Prajapati",
      venue: "Companion of the 28th International Conference on Intelligent User Interfaces",
      year: 2023,
      abstract:
        "This companion paper outlines a vision for immersive collaborative active learning through phygital textbooks and reflects on the impact such systems could have in classrooms.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1145/3581754.3584108" }
      ],
      tags: ["IUI", "design vision", "active learning", "phygital textbooks"]
    },
    {
      id: "pub-procedia-smart-cities-2023",
      category: "journal article",
      title:
        "An Intelligent ABM-based Framework for Developing Pandemic-Resilient Urban Spaces in Post-COVID Smart Cities",
      authors: "Sunny Prakash Prajapati, R. Bhaumik, and T. Kumar",
      venue: "Procedia Computer Science",
      year: 2023,
      abstract:
        "This article proposes an agent-based modeling framework for exploring pandemic-resilient urban spaces in post-COVID smart city contexts.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1016/j.procs.2023.01.205" }
      ],
      tags: ["agent-based modeling", "smart cities", "urban systems", "journal"]
    },
    {
      id: "pub-procedia-vernacular-2023",
      category: "journal article",
      title:
        "Smart Vernacular Architecture: A Framework for Assessment and Virtual Reality-based Visualisation of Indigenous Toda Dwellings",
      authors: "R. Bhaumik, Sunny Prakash Prajapati, T. Kumar, K. Bhalla, and S. S. Ashok",
      venue: "Procedia Computer Science",
      year: 2023,
      abstract:
        "This journal paper presents a framework for assessing and visualizing indigenous Toda dwellings through virtual reality-based representations of vernacular architecture.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1016/j.procs.2023.01.047" }
      ],
      tags: ["virtual reality", "architecture", "visualization", "journal"]
    },
    {
      id: "pub-covid-multimodal-2021",
      category: "journal article",
      title:
        "A deep-learning based multimodal system for Covid-19 diagnosis using breathing sounds and chest X-ray images",
      authors:
        "U. Sait, G. L. K. V., S. Shivakumar, T. Kumar, R. Bhaumik, Sunny Prakash Prajapati, K. Bhalla, and A. Chakrapani",
      venue: "Applied Soft Computing",
      year: 2021,
      abstract:
        "This paper presents a multimodal deep-learning approach to COVID-19 diagnosis using breathing sounds together with chest X-ray images.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1016/j.asoc.2021.107522" }
      ],
      tags: ["deep learning", "multimodal systems", "health AI", "journal"]
    },
    {
      id: "pub-pedagogical-tool-2021",
      category: "conference paper",
      title:
        "An AI-Based Pedagogical Tool for Creating Sketched Representation of Emotive Product Forms in the Conceptual Design Stages",
      authors: "Sunny Prakash Prajapati, R. Bhaumik, T. Kumar, and U. Sait",
      venue: "ICT Systems and Sustainability",
      year: 2021,
      abstract:
        "This publication introduces an AI-based pedagogical tool for generating sketched representations of emotive product forms during conceptual design.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1007/978-981-15-8289-9_63" }
      ],
      tags: ["AI", "design education", "pedagogy", "conceptual design"]
    },
    {
      id: "pub-emergency-kit-2020",
      category: "conference paper",
      title:
        "A Pandemic-specific 'Emergency Essentials Kit' for Children in the Migrant BoP communities",
      authors:
        "A. Chakrapani, T. Kumar, S. Shivakumar, R. Bhaumik, K. Bhalla, and Sunny Prakash Prajapati",
      venue: "IEEE International Smart Cities Conference (ISC2)",
      year: 2020,
      abstract:
        "This paper proposes a pandemic-specific emergency essentials kit designed for children in migrant base-of-the-pyramid communities.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1109/ISC251055.2020.9239078" }
      ],
      tags: ["design for social impact", "children", "smart cities", "conference"]
    },
    {
      id: "pub-water-2019",
      category: "conference paper",
      title:
        "An Inclusive Community Based Water Purification and Monitoring System for the Base of the Pyramid",
      authors: "R. Bhaumik, Sunny Prakash Prajapati, T. Kumar, V. Mishra, and K. Bhalla",
      venue: "IEEE Global Humanitarian Technology Conference (GHTC)",
      year: 2019,
      abstract:
        "This paper presents an inclusive community-based system for water purification and monitoring designed for base-of-the-pyramid settings.",
      links: [
        { label: "DOI", url: "https://doi.org/10.1109/GHTC46095.2019.9033102" }
      ],
      tags: ["inclusive design", "water systems", "humanitarian technology", "conference"]
    }
  ],
  projects: [
    {
      id: "project-phygital-textbooks",
      title: "Conceptualization of Phygital Textbooks for Learning",
      period: "2022-2023",
      summary:
        "A research program on extending printed textbooks with smartphone companions and interactive layers to support active, collaborative, and classroom-grounded learning.",
      tags: [
        "Learning experience design",
        "Usability evaluation",
        "HCI for Educational Technology"
      ],
      outcomes: [
        "Design Conceptualization for phygital textbooks in classroom learning context",
		"Presented the initial research explorations and investigation plan at ACM IUI Conference 2023"
        //""
      ],
      image: "assets/images/iui_1.png",
      alt: "Source: Prajapati, S. P., & Das, S. (2023). Designing a Phygital Interface for Textbooks to Support Active Collaborative Learning. Companion Proceedings of the 28th International Conference on Intelligent User Interfaces, 1–4. https://doi.org/10.1145/3581754.3584117 ",
      links: [],
      details: {
        paragraphs: ["Image source: Prajapati, S. P., & Das, S. (2023). Designing a Phygital Interface for Textbooks to Support Active Collaborative Learning. Companion Proceedings of the 28th International Conference on Intelligent User Interfaces, 1–4."],
        images: [
		    {
				src: "assets/images/iui_2.png",
				alt: "Affordances of print media",
				caption: "Concept diagram from the IUI 2023 companion paper."
			},
			{
				src: "assets/images/iui_3.png",
				alt: "Affordances of digital media",
				caption: "Concept diagram from the IUI 2023 companion paper."
			}
    	]
      }
    },
    {
      id: "project-active-reading",
      title: "Active Reading in Smartphone-Based Textbook Companions",
      period: "2024-2025",
      summary:
        "This project investigates how students read with smartphone-based textbook companions. The insights are based on a study conducted in Indian classroom settings. It was also a comparison with reading on a Laptop.",
      tags: [
        "Classroom research", "Academic Reading", "Educational technology evaluation"
      ],
      outcomes: [
        "Design insights on active reading and companion interfaces",
        "Evidence for how phygital support changes reading behavior in class"
      ],
      image: "assets/images/Picture1.png",
      alt: "Abstract illustration representing mobile reading and classroom learning activity",
      links: [],
      details: {
        paragraphs: ["Here, the comparative analysis showed significantly lower percieved cognitive load in students who read the textbook with the smartphone-based companion application than the ones who read on the laptop. More insights are available on the related publication."],
        images: [
			{
				src: "assets/images/using_app.jpeg",
				alt: "Affordances of print media",
				caption: "Snapshots from the pilot study of a learner reading a textbook with a smartphone-based application"
			},
		]
      }
    },
    {
      id: "project-robotub",
      title: "RoboTuB for Adaptive STEM MOOC Support",
      period: "2025",
      summary:
        "A collaborative project exploring retrieval-augmented tutoring for adaptive support in STEM MOOCs and digitally mediated learning environments.",
      tags: [
        "Retrieval Augmented Generation (RAG)",
        "Learning Analytics",
        "Adaptive tutoring design of EdTech"
      ],
      outcomes: [
        "Prototype tutoring workflow for course-grounded support",
        "Design direction for AI tutoring in scalable learning settings"
      ],
      image: "assets/images/project-peer-mentors.svg",
      alt: "Abstract illustration representing an adaptive tutoring network for online learning",
      links: ["https://library.apsce.net/index.php/ICCE/article/view/5938"],
      details: {
        paragraphs: [],
        images: []
      }
    },
    /*{
      id: "project-mixed-reality",
      title: "AI-Augmented Mixed Reality Learning Interfaces",
      period: "2025-present",
      summary:
        "This work explores how AI-augmented and mixed reality interfaces can extend the textbook as a learning platform in Indian classrooms.",
      tags: [
        "Co-design",
        "Mixed reality prototyping",
        "AI-supported interface design"
      ],
      outcomes: [
        "ICCE 2025 publication on co-designing mixed reality learning interfaces",
        "New interaction concepts for textbook-centered classroom learning",
        "Design guidance for future classroom deployment"
      ],
      image: "assets/images/project-reflective-ai.svg",
      alt: "Abstract illustration representing mixed reality educational interface concepts",
      links: [],
      details: {
        paragraphs: [],
        images: []
      }
    }*/
  ],
  teaching: {
    intro:
      "My teaching and instructional work spans higher education, school education, and design-oriented coursework. Across these roles, I have focused on making complex ideas approachable through structured activities, design practice, and research-informed teaching.",
    sections: [
      {
        title: "Instruction and courses",
        eyebrow: "Teaching roles",
        items: [
          {
            title: "Quantitative Research Methods",
            role: "",
            term: "Jan 2025",
            description:
              "Module Instructor, M.Des Interaction Design: National Institute of Design Bengaluru. Taught quantitative research methods for interaction design students."
          },
          {
            title: "Design Thinking and Innovation",
            role: "",
            term: "Oct 2024 - Dec 2024",
            description:
              "Course Instructor, B.Tech, Sardar Patel College of Engineering Mumbai. Led instruction for an undergraduate course focused on design thinking and innovation."
          },
          {
            title: "Maths and Science",
            role: "",
            term: "Nov 2023 - Oct 2024",
            description:
              "Subject Instructor, Kendriya Vidyalaya IIT Powai, Mumbai. Taught school-level mathematics and science."
          }
        ]
      },
      {
        title: "Academic and professional experience",
        eyebrow: " ",
        items: [
          {
            title: "Faculty of Architecture and Design",
            role: " ",
            term: "2019 - 2022",
            description:
              "Assistant Professor at PES University, Bengaluru. Worked across design education, curriculum delivery, and academic support in architecture and design contexts."
          },
          {
            title: "Engineering and Systems Practice",
            role: " ",
            term: "2018 - 2019",
            description:
              "TATA Advanced Systems Limited, Hyderabad. Early professional experience in engineering and product development."
          }
        ]
      },
      {
        title: "Honors and academic service",
        eyebrow: "Recognition",
        items: [
          {
            title: "Prime Minister's Research Fellowship (PMRF)",
            role: "Fellowship",
            term: "Current",
            description:
              "Recipient of the Prime Minister's Research Fellowship supporting doctoral research in educational technology."
          },
          {
            title: "LOTUS Grant 2025",
            role: "Research grant",
            term: "2025",
            description:
              "Awarded research funding in 2025 alongside travel support including the Gary Marsden Travel Award and ACM SIGMM Travel Grant."
          }
        ]
      }
    ]
  },
  cv: {
    note:
      "The site now includes the uploaded CV PDF. Replace assets/files/researcher-cv.pdf whenever you have a newer version, and the download button will keep working.",
    highlights: [
      "PMRF Fellow and PhD Research Scholar in Educational Technology at IIT Bombay",
      "Research on phygital textbooks, active reading, AI-augmented learning interfaces, and usability evaluation",
      "Publications in Frontiers in Education, ACM IMX, ACM IUI, ICCE, Procedia Computer Science, and IEEE venues",
      "Teaching and instructional experience across IIT-linked school education, design education, and university-level courses"
    ]
  },
  resources: [
        {
        label: "Educational Technology, IIT Bombay",
        value: "22d1201@iitb.ac.in"
		}

		],
  contact: {
    intro:
      "I welcome conversations about educational technology research, learning experience design, HCI in education, and collaborations around classroom technology or design-led research.",
    links: [
      {
        label: "Email",
        value: "22d1201@iitb.ac.in",
        url: "mailto:22d1201@iitb.ac.in"
      },
     /* {
        label: "Google Scholar",
        value: "Scholar profile",
        url: "https://scholar.google.com/citations?user=RWuM4NIAAAAJ&hl=en&oi=ao"
      },*/
      {
        label: "LinkedIn",
        value: "sunny-prakash-prajapati",
        url: "https://www.linkedin.com/in/sunny-prakash-prajapati/"
      },
      {
        label: "ORCID",
        value: "0000-0002-2051-1866",
        url: "https://orcid.org/0000-0002-2051-1866"
      },
    ]
  }
};
