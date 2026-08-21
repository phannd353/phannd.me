import PastWorksSection from "@/components/website/PastWorksSection";
import { projects } from "@/content/landing/projects";

export default function ProjectsPage() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">All Projects</h1>
      <PastWorksSection projects={projects} />
    </main>
  );
}
