// "use client";

// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import { User } from "next-auth";
// import { Button } from "@/components/ui/button";
// import { useEffect, useRef, useState } from "react";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const user = session?.user as User;

//   const [open, setOpen] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
//         {/* ================= Logo ================= */}

//         <Link
//           href="/dashboard"
//           className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent transition hover:opacity-90"
//         >
//           MysteryMessage
//         </Link>

//         {/* ================= User ================= */}

//         {session ? (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-700/30 transition duration-300 hover:scale-105"
//             >
//               {(user.username || user.email || "U")
//                 .charAt(0)
//                 .toUpperCase()}
//             </button>

//             {open && (
//               <div className="absolute right-0 mt-4 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
//                 {/* Profile */}

//                 <div className="border-b border-slate-800 p-6">
//                   <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-2xl font-bold text-white">
//                     {(user.username || user.email || "U")
//                       .charAt(0)
//                       .toUpperCase()}
//                   </div>

//                   <h3 className="text-lg font-semibold text-white">
//                     {user.username}
//                   </h3>

//                   <p className="mt-1 truncate text-sm text-slate-400">
//                     {user.email}
//                   </p>
//                 </div>

//                 {/* Logout */}

//                 <div className="p-5">
//                   <Button
//                     onClick={() =>
//                       signOut({
//                         callbackUrl: "/sign-in",
//                       })
//                     }
//                     className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500"
//                   >
//                     Logout
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link href="/sign-in">
//             <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
//               Login
//             </Button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  Circle,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
    return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 backdrop-blur-xl p-1">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* ================= Logo ================= */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/30">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
              MysteryMessage
            </h1>

            
          </div>
        </Link>

        {/* ================= Right Side ================= */}

        {session ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-700/40 transition-all duration-300 hover:scale-105"
            >
              {(user.username || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </button>

            <div
              className={`absolute right-0 mt-4 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 transition-all duration-300 ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-3 opacity-0"
              }`}
            >
              {/* ================= Profile ================= */}

              <div className="flex flex-col items-center border-b border-slate-800 px-6 py-8">

                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-3xl font-bold text-white shadow-lg shadow-violet-700/40">
                  {(user.username || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h2 className="text-xl font-semibold text-white">
                  {user.username}
                </h2>

                <p className="mt-1 text-center text-sm text-slate-400">
                  {user.email}
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                  <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-400">
                    Online
                  </span>
                </div>

              </div>

              {/* ======== Part 3 starts here ======== */}
                            {/* ================= Menu ================= */}

              <div className="p-3">

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
                >
                  <LayoutDashboard className="h-5 w-5 text-violet-400" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
                >
                  <Settings className="h-5 w-5 text-indigo-400" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-slate-800 pt-3">
                  <Button
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="cursor-pointer rounded-xl p-5 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;