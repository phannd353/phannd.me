import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function RoundedLinkButton({
  href,
  label,
  ...props
}: {
  href: string;
  label: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Button asChild>
      <Link href={href} className="flex w-fit rounded-full !pr-1" {...props}>
        <span>{label}</span>
        <div className="flex h-[30px] w-[30px] place-content-center place-items-center rounded-full bg-black font-semibold text-white">
          <ArrowUpRight size={16} />
        </div>
      </Link>
    </Button>
  );
}
