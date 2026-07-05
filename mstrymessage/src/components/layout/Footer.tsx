import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div>
          <h3 className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
            MysteryMessage
          </h3>

          <p className="mt-2 text-slate-500">
            Receive honest feedback while staying anonymous.
          </p>
        </div>

        <div className="flex items-center gap-8 text-slate-400">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-violet-400"
          >
            Home
          </Link>

          <Link
            href="/sign-in"
            className="cursor-pointer transition hover:text-violet-400"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="cursor-pointer transition hover:text-violet-400"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} MysteryMessage. Built with ❤️ using
        Next.js, TypeScript & Tailwind CSS.
      </div>
    </footer>
  );
}