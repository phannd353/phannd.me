import { Metadata } from "next";
import PastWorksSection from "@/components/website/PastWorksSection";
import { getMetadata } from "@/content/landing/metadata";
import { projects } from "@/content/landing/projects";
import { genMetadata } from "@/lib/metadata.lib";

export async function generateMetadata(): Promise<Metadata> {
  const path = "/projects";
  try {
    const locale = "vi"; // Default locale, you can change this based on your needs
    const metadata = await getMetadata({ locale });

    return genMetadata({
      title: `My Projects - ${metadata.title}`,
      description:
        "Here are some of my past works and projects that showcase my skills and expertise.",
      locale,
      path,
      logo: metadata.logo,
    });
  } catch (error) {
    const title = "My Projects";
    const description =
      "Here are some of my past works and projects that showcase my skills and expertise.";

    return genMetadata({ title, description, locale: "vi", path });
  }
}

export default function ProjectsPage() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <PastWorksSection projects={projects} />
    </main>
  );
}
