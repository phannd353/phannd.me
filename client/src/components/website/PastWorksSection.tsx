import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { GitHub } from "@better-auth-ui/react";
import { ArrowUpRight, Badge } from "lucide-react";

interface Project {
  title: string;
  description: ReactNode;
  image: string;
  demo?: string;
  repo?: string;
  techstack: string[];
}

export default function PastWorksSection({
  projects,
  viewMore = false,
}: {
  projects: Project[];
  viewMore?: boolean;
}) {
  return (
    <section
      className="relative flex w-full max-w-[100vw] flex-col place-items-center"
      id="work"
    >
      <h2 className="reveal-up text-center text-4xl font-medium sm:text-5xl lg:text-6xl">
        Past works
      </h2>

      <div className="reveal-up my-4 border-b border-foreground w-full"></div>

      <div className="mt-8 gap-10 space-y-8 max-md:columns-1 lg:columns-2 xl:columns-3">
        {projects.map((project, index) => (
          <Card
            className="reveal-up h-fit w-full break-inside-avoid gap-2 bg-secondary-background"
            key={project.title}
          >
            <CardHeader>
              <div className="h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  className="h-auto object-contain"
                  alt="design"
                  width={450}
                  height={300}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <h3 className="text-xl font-heading dark:font-black">
                {project.title}
              </h3>
              <div className="">{project.description}</div>

              <div className="flex flex-wrap gap-2">
                {project.techstack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold bg-main"
                    style={{
                      border: "2px solid black",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>

            {(project.repo || project.demo) && (
              <CardFooter className="flex-col gap-3 sm:flex-row sm:gap-4">
                {project.repo && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={project.repo} target="_blank">
                      <GitHub className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                )}
                {project.demo && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={project.demo} target="_blank">
                      <ArrowUpRight className="mr-2 h-4 w-4" /> Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {viewMore && (
        <Button asChild className="mt-8">
          <Link href="/projects">Xem thêm</Link>
        </Button>
      )}
    </section>
  );
}
