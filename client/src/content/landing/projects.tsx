export const projects = [
  {
    title: "Iconic Talents",
    techstack: [
      "NodeJS",
      "PostgreSQL",
      "Remix.run",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Docker",
      "Nginx",
      "Linux",
    ],
    description: (
      <ul className="list-inside list-disc">
        <li>
          <strong>ERP System:</strong> Designed and developed a full-featured
          ERP system from scratch using
          <strong>
            NestJS, PostgreSQL, Prisma, Next.js, TypeScript, and Docker
          </strong>
          , supporting human resources, customer management, finance, and other
          core business operations.
        </li>
        <li>
          <strong>Iconic Pro:</strong> Built a CMS-driven landing page platform
          from scratch using
          <strong>
            Next.js, PostgreSQL, Prisma, TypeScript, Tailwind CSS, and shadcn/ui
          </strong>
          , enabling administrators to manage page content, blog posts, and
          customer registrations without code changes.
        </li>
        <li>
          <strong>Infrastructure:</strong> Optimized deployment infrastructure
          using
          <strong>
            Docker, Nginx, Linux, GitHub Actions, and DigitalOcean
          </strong>
          , improving application performance, reliability, and operational cost
          efficiency.
        </li>
      </ul>
    ),
    image: "/assets/image/home/logo-iconic-talents.png",
    repo: "https://github.com/iconic-inc/iconic-erp",
  },
  {
    title: "NienSuViet - Vietnamese History",
    techstack: [
      "Go",
      "NestJS",
      "PostgreSQL",
      "RabbitMQ",
      "gRPC",
      "Redis",
      "Next.js",
      "Docker",
      "Nginx",
      "Linux",
    ],
    description: (
      <>
        <p>
          <strong>Back-end</strong>:
        </p>
        <ul className="list-inside list-disc">
          <li>
            Built
            <strong>6 microservices</strong>
            communicating asynchronously through RabbitMQ and gRPC.
          </li>
          <li>
            Designed and implemented a subscription service (Go, NestJS,
            PostgreSQL) supporting multiple payment providers.
          </li>
          <li>
            Implemented
            <strong>idempotent payment</strong> APIs and asynchronous webhook
            processing.
          </li>
          <li>
            Built a transactional
            <strong>outbox pattern</strong> with RabbitMQ for reliable
            event-driven communication.
          </li>
          <li>
            Implemented retry mechanisms with
            <strong>exponential backoff</strong> and
            <strong>dead-letter exchanges</strong> (DLX) for resilient message
            processing.
          </li>
          <li>
            Integrated <strong>Redis caching</strong> to reduce database load
            and improve response latency.
          </li>
          <li>
            Wrote
            <strong>50+ unit and integration tests</strong>.
          </li>
        </ul>
        <p>
          <strong>Front-end</strong>: Developed the frontend using Next.js,
          TypeScript, Tailwind CSS, and shadcn/ui.
        </p>
      </>
    ),
    image: "/assets/image/home/logo-nsv.webp",
    demo: "https://niensuviet.app",
    repo: "https://github.com/phannd353/nien-su-viet",
  },
  {
    title: "Blockchain-based Reward System (Scientific research)",
    techstack: ["NodeJS", "ExpressJS", "Ethers.js", "Solidity", "ERC-777"],
    description: (
      <>
        <p>
          <strong>Back-end</strong>:
        </p>
        <ul className="list-inside list-disc">
          <li>
            Developed a RESTful API for an incentive and rewards platform with
            Role-Based Access Control (RBAC), JWT-based authentication (access
            and refresh tokens), and API key authorization.
          </li>
          <li>
            Built the backend using Node.js and Express.js, integrating with
            Ethereum smart contracts through Ethers.js.
          </li>
        </ul>
        <p>
          <strong>Smart Contract</strong>: Developed three reward token smart
          contracts based on the ERC-777 standard, extending ERC-20
          functionality with advanced token transfer features.
        </p>
      </>
    ),
    image: "/assets/image/home/project-reward-system.png",
    repo: "https://github.com/PhanhotboY/Blockchain-Based-Reward-System",
  },
  {
    repo: "https://github.com/PhanhotboY/Deep-Reinforcement-Learning-for-Automated-Stock-Trading",
    title: "Deep Reinforcement Learning for Automated Stock Trading",
    image: "/assets/image/home/project-stock-trading.png",
    techstack: ["Python", "PyTorch", "Pandas", "NumPy", "Jupyter Notebook"],
    description: (
      <>
        <p>
          A deep reinforcement learning-based stock trading system that uses
          historical stock data to train an agent to make buy, sell, or hold
          decisions.
        </p>
        <p>
          We show a workflow of applying RL in algorithmic trading, which is a
          reproduction and improvement of the process in the{" "}
          <a
            href="https://arxiv.org/abs/1811.07522"
            target="_blank"
            rel="noopener noreferer"
          >
            NeurIPS 2018 paper
          </a>
          .
        </p>
      </>
    ),
  },
  {
    repo: "https://github.com/PhanhotboY/profile-card",
    title: "Github Profile Card",
    image: "/assets/image/home/project-github-profile-card.png",
    techstack: ["HTML", "CSS", "JavaScript"],
    description: (
      <>
        <p>
          A simple web application that generates a profile card for a given
          Github username. The card displays the user's avatar, name, and other
          relevant information.
        </p>
        <p>
          Built with HTML, CSS, JavaScript. The app fetches data from the Github
          API and renders it in a visually appealing card format.
        </p>
      </>
    ),
  },
  {
    repo: "https://github.com/PhanhotboY/new-vn-provinces",
    title: "New Vietnam Provinces",
    image: "/assets/image/home/project-new-vn-provinces.png",
    techstack: ["JavaScript", "TypeScript", "NodeJS"],
    description: (
      <p>
        A high-performance JavaScript/TypeScript library that provides a
        comprehensive list of provinces, and wards in Vietnam.
      </p>
    ),
  },
];
