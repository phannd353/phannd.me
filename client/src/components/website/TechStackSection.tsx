import RoundedLinkButton from "./RoundedLinkButton";

interface TechStack {
  name: string;
  description: string;
  icon: string;
}

export default function TechStackSection({
  techStacks,
}: {
  techStacks: TechStack[];
}) {
  return (
    <section id="tech-stack">
      <div className="mt-8 flex flex-col place-items-center gap-5">
        <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-semibold">My Tech Stack</h2>
        </div>
        <div className="mt-6 flex flex-wrap place-content-center gap-2 max-lg:flex-col">
          {techStacks.map((tech, index) => (
            <div
              className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4"
              key={tech.name}
            >
              <div className="flex gap-2">
                <i className={`${tech.icon} colored text-2xl`}></i>

                <h3 className="text-2xl font-semibold">{tech.name}</h3>
              </div>
              <div className="text-foreground/70">{tech.description}</div>
            </div>
          ))}
        </div>

        <RoundedLinkButton
          href="https://www.linkedin.com/in/phannd"
          target="_blank"
          rel="noopener noreferrer"
          label="Get in touch"
        />
      </div>
    </section>
  );
}
