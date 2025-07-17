import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-border bg-background flex h-16 items-center justify-between border-b-2 px-4 md:h-20 md:px-8">
      <Link
        href={"/"}
        className="text-primary text-2xl font-bold hover:cursor-pointer md:text-3xl"
      >
        Task-Flow
      </Link>
    </header>
  );
};
