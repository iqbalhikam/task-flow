import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
type PropsHeader = {
  className?: string | null;
};
export const Header = ( props: PropsHeader) => {
  return (
    <header
      className={`border-border bg- flex h-16 items-center justify-between border-b-2 px-4 md:h-20 md:px-8 ${props.className}`}
    >
      <Link
        href={"/"}
        className="text-primary text-2xl font-bold hover:cursor-pointer md:text-3xl"
      >
        <Image
          width={150}
          height={50}
          src={"/assets/logo/taskflow.png"}
          alt="logo"
          className="sm:w-[200px]"
        />
      </Link>
      <ThemeToggle />
    </header>
  );
};
