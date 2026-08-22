import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Certification {
  name: ReactNode;
  description: ReactNode;
  startDate: string;
  endDate: string;
}

export default function EducationSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="education" className="lg:-mx-12 xl:-mx-16">
      <Card
        // className="flex relative h-full w-full justify-around gap-8 rounded-xl p-4 max-lg:max-w-full max-lg:flex-col"
        className="relative flex w-full flex-col justify-around gap-6 bg-secondary-background p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8"
      >
        <div className="reveal-up h-full w-full place-content-center lg:sticky lg:top-[20%] lg:w-3/5">
          <h3 className="text-center text-3xl font-medium sm:text-4xl lg:text-6xl">
            Education & Certifications
          </h3>
        </div>

        <div className="reveal-up flex w-full flex-col place-items-center gap-4 lg:w-2/5">
          {certifications.map((cert, i) => (
            <Card className="h-fit w-full bg-main" key={cert.name?.toString()}>
              <CardHeader>
                <CardTitle>{cert.name}</CardTitle>
                <CardDescription>
                  {`${cert.startDate} - ${cert.endDate}`}
                </CardDescription>
              </CardHeader>

              <CardContent>{cert.description}</CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
