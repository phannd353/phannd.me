import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface Project {
  title: string;
  description: ReactNode;
  image: string;
  link?: string;
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
      <h3 className="reveal-up text-6xl font-medium max-lg:text-3xl">
        Past works
      </h3>

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
            </CardContent>

            {project.link && (
              <CardFooter>
                Link:
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-main"
                >
                  {project.link}
                </Link>
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
