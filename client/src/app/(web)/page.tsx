import { getTranslations } from "next-intl/server";
import { getMetadata } from "@/content/landing/metadata";
import { CLIENT_HOST } from "@/lib/config";
import AboutSection from "@/components/website/AboutSection";
import PastWorksSection from "@/components/website/PastWorksSection";
import EducationSection from "@/components/website/EducationSection";
import TechStackSection from "@/components/website/TechStackSection";
import { projects } from "@/content/landing/projects";

export default async function HomeTimePage({
  params,
}: {
  params: Promise<{}>;
}) {
  const locale = "vi"; // Replace with your desired locale or retrieve it from params if needed
  const [t, metadata] = await Promise.all([
    getTranslations({ locale, namespace: "EventPage" }),
    getMetadata({ locale }),
  ]);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: metadata.title,
    url: `${CLIENT_HOST}`,
    description: metadata.description,
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${CLIENT_HOST}/${locale}/su-kien?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: metadata.title,
        item: `${CLIENT_HOST}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <main
        className="min-h-screen container space-y-8 lg:space-y-24 py-8 lg:py-24"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        {/* About Section */}
        <AboutSection />

        {/* Past Works */}
        <PastWorksSection projects={projects.slice(0, 3)} viewMore />

        {/* Education & Certifications */}
        <EducationSection certifications={certifications} />

        {/* Tech Stack */}
        <TechStackSection techStacks={techStacks} />
      </main>
    </>
  );
}

const certifications = [
  {
    description: (
      <>
        Bachelor of <b>Information Technology</b>
        <img
          src="/assets/image/home/logo-uit.svg"
          alt="toeic"
          className="w-1/2 rounded-lg mx-auto mt-4"
        />
      </>
    ),
    name: (
      <>
        University of
        <br />
        Information Technology - VNUHCM (UIT)
      </>
    ),
    startDate: "October 2021",
    endDate: "Present",
  },
  {
    name: "TOEIC Listening & Reading",
    startDate: "December 2024",
    endDate: "December 2026",
    description: (
      <>
        <p className="text-lg">
          Score: <b>850</b>/990
        </p>
        <img
          src="/assets/image/home/toeic-lr.jpeg"
          alt="toeic"
          className="w-full rounded-lg"
        />
      </>
    ),
  },
  {
    name: "TOEIC Speaking & Writing",
    startDate: "November 2024",
    endDate: "November 2026",
    description: (
      <>
        <p className="text-lg">
          Score: <b>250</b>/400
        </p>
        <img
          src="/assets/image/home/toeic-sw.jpeg"
          alt="toeic"
          className="w-full rounded-lg"
        />
      </>
    ),
  },
  {
    name: "[Udemy] NodeJS - Advanced Concepts",
    startDate: "March 2023",
    endDate: "March 2023",
    description: (
      <img
        src="/assets/image/home/udemy-node-advanced-concepts.jpg"
        alt="toeic"
        className="w-full rounded-lg"
      />
    ),
  },
  {
    name: "[F8] NodeJS & ExpressJS",
    startDate: "July 2022",
    endDate: "July 2022",
    description: (
      <img
        src="/assets/image/home/f8-node.png"
        alt="toeic"
        className="w-full rounded-lg"
      />
    ),
  },
  {
    name: "[F8] Ubuntu with WSL",
    startDate: "February 2023",
    endDate: "February 2023",
    description: (
      <img
        src="/assets/image/home/f8-ubuntu.png"
        alt="toeic"
        className="w-full rounded-lg"
      />
    ),
  },
];

const techStacks = [
  {
    name: "Golang",
    icon: "devicon-go-plain colored",
    description:
      "Proficient in Go for building high-performance backend services.",
  },
  {
    name: "Nest.js (ExpressJS)",
    icon: "devicon-nestjs-original colored",
    description:
      "Experienced with Nest.js framework for robust and scalable applications, leveraging ExpressJS.",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain colored",
    description:
      "Skilled in designing and managing relational databases with PostgreSQL.",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain colored",
    description: "Adept at working with NoSQL databases, specifically MongoDB.",
  },
  {
    name: "RabbitMQ",
    icon: "devicon-rabbitmq-original colored",
    description:
      "Experience in implementing message queues for inter-service communication.",
  },
  {
    name: "Redis",
    icon: "devicon-redis-plain colored",
    description: "Utilizing Redis for caching and real-time data processing.",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain colored",
    description:
      "Developing robust and type-safe applications with TypeScript.",
  },
  {
    name: "gRPC",
    icon: "devicon-grpc-plain colored",
    description: "Implementing high-performance RPC frameworks with gRPC.",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain colored",
    description:
      "Containerizing applications for efficient deployment and scalability.",
  },
  {
    name: "Git",
    icon: "devicon-git-plain colored",
    description: "Version control and collaborative development using Git.",
  },
];
