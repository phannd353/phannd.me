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
    <section id="education" className="lg:-mx-16">
      <Card
        // className="flex relative h-full w-full justify-around gap-8 rounded-xl p-4 max-lg:max-w-full max-lg:flex-col"
        className="relative flex-row w-full h-full justify-around bg-secondary-background"
      >
        <div className="reveal-up h-full w-[50%] place-content-center max-lg:w-full lg:sticky lg:top-[20%]">
          <h3 className="text-center text-6xl font-medium max-lg:text-3xl">
            Education & Certifications
          </h3>
        </div>

        <div className="reveal-up flex w-[30%] flex-col place-items-center gap-4 p-2 max-lg:w-full">
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
