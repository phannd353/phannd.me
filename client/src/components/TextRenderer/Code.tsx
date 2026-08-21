import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "./prism.css";

export default function Code({ data }: { data: { code: string } }) {
  const highlightedCode = Prism.highlight(
    data.code,
    Prism.languages.javascript,
    "javascript",
  );

  const lines = data.code.split("\n");

  return (
    <pre className="bg-secondary-background text-secondary-foreground p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono language-javascript line-numbers">
      <code
        className="block"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
      <span aria-hidden="true" className="line-numbers-rows">
        {lines.map((_, i) => (
          <span key={i}></span>
        ))}
      </span>
    </pre>
  );
}
