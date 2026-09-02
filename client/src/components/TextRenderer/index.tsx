import Code from "./Code";
import "./index.css";
import remarkGfm from "remark-gfm";

import Markdown from "react-markdown";
import Table from "./Table";
import Image from "./Image";

export default function TextRenderer({ content }: { content: string }) {
  return (
    <section className="typography max-w-full text-pretty">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: Code,
          table: Table,
          img: Image,
        }}
      >
        {content}
      </Markdown>
    </section>
  );
}
