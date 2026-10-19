import Link from "next/link";

type LogoProps = {
  href?: string;
  inverted?: boolean;
};

export function Logo({ href = "/", inverted = false }: LogoProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 font-heading text-[1.05rem] font-semibold tracking-tight"
    >
      <span
        aria-hidden
        className={`grid size-8 place-items-center rounded-full shadow-[inset_0_-6px_10px_rgba(0,0,0,0.12)] ${
          inverted ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        <span className="block size-3 rounded-full bg-current/20 ring-2 ring-current/70" />
      </span>
      <span className={inverted ? "text-primary-foreground" : "text-foreground"}>
        Crumble
        <span className="ml-1 text-xs font-sans font-medium tracking-normal text-muted-foreground group-hover:text-foreground">
          lernen
        </span>
      </span>
    </Link>
  );
}
