"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  MessageCircleMore,
  ShieldCheck,
  Zap,
  Sparkles,
  Mail,
} from "lucide-react";

import Autoplay from "embla-carousel-autoplay";

import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";


export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)]">

        {/* ==========================================
            Background Glow
        ========================================== */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-violet-700/20 blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-indigo-700/10 blur-3xl" />
          <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-700/10 blur-3xl" />
        </div>

        {/* ==========================================
            Hero Section
        ========================================== */}

        <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Anonymous Messaging Platform
          </div>

          <h1 className="max-w-5xl bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl">
            Receive Honest Feedback
            <br />
            Without Revealing Identities
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            MysteryMessage lets anyone send completely anonymous messages to
            your personal profile. Collect honest opinions, feedback,
            confessions and suggestions in one beautiful place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link href="/sign-up">
              <Button className="h-12 cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-white transition-all duration-300 hover:scale-105 hover:from-violet-500 hover:to-indigo-500">
                Get Started
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button
                variant="outline"
                className="h-12 cursor-pointer rounded-xl border-slate-700 bg-slate-900/60 px-8 text-white hover:bg-slate-800"
              >
                Login
              </Button>
            </Link>

          </div>

        </section>

        {/* ==========================================
            Features Section
        ========================================== */}

        <section className="relative mx-auto max-w-7xl px-6 pb-24">

          <div className="mb-16 text-center">

            <h2 className="text-4xl font-bold text-white">
              Why Choose MysteryMessage?
            </h2>

            <p className="mt-4 text-slate-400">
              Built for privacy, simplicity and meaningful conversations.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Card 1 */}

            <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20">
                <ShieldCheck className="h-8 w-8 text-violet-400" />
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                100% Anonymous
              </h3>

              <p className="leading-7 text-slate-400">
                Every message stays anonymous. Senders never reveal their
                identity, making feedback more honest and meaningful.
              </p>

            </div>

            {/* Card 2 */}

            <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20">
                <Zap className="h-8 w-8 text-indigo-400" />
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                Instant Delivery
              </h3>

              <p className="leading-7 text-slate-400">
                Receive anonymous messages instantly without delays. Refresh
                your dashboard anytime to see the latest responses.
              </p>

            </div>

            {/* Card 3 */}

            <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-600/20">
                <MessageCircle className="h-8 w-8 text-cyan-400" />
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                Beautiful Dashboard
              </h3>

              <p className="leading-7 text-slate-400">
                Manage, delete and organize all your anonymous messages through
                a modern dashboard designed for the best experience.
              </p>

            </div>

          </div>

        </section>
                {/* ==========================================
            Testimonials Carousel
        ========================================== */}

        <section className="relative mx-auto max-w-7xl px-6 pb-28">

          <div className="mb-14 text-center">

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              Anonymous Messages
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">
              See What People Are Saying
            </h2>

            <p className="mt-4 text-slate-400">
              Experience how anonymous conversations look inside
              MysteryMessage.
            </p>

          </div>

          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >

            <CarouselContent>

              {messages.map((message, index) => (

                <CarouselItem
                  key={index}
                  className="md:basis-1/2 xl:basis-1/3"
                >

                  <Card className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40">

                    <CardHeader>

                      <div className="mb-5 flex items-center justify-between">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600">

                          <Mail className="h-7 w-7 text-white" />

                        </div>

                        <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                          Anonymous
                        </div>

                      </div>

                      <CardTitle className="line-clamp-2 min-h-[4rem] text-2xl text-white">
                        {message.title}
                      </CardTitle>

                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col">

                      <p className="line-clamp-3 min-h-[5.25rem] leading-7 text-slate-300">
                        "{message.content}"
                      </p>

                      <div className="mt-4 border-t border-slate-800 pt-4">

                        <p className="text-sm text-slate-500">
                          {message.received}
                        </p>

                      </div>

                    </CardContent>

                  </Card>

                </CarouselItem>

              ))}

            </CarouselContent>

            <CarouselPrevious className="hidden cursor-pointer border-slate-700 bg-slate-900 text-white hover:bg-slate-800 lg:flex" />

            <CarouselNext className="hidden cursor-pointer border-slate-700 bg-slate-900 text-white hover:bg-slate-800 lg:flex" />

          </Carousel>

        </section>
                {/* ==========================================
            Call To Action
        ========================================== */}

        <section className="relative mx-auto max-w-7xl px-6 pb-24">

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-cyan-600/20 p-10 backdrop-blur-xl">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-2xl">

                <MessageCircleMore className="h-10 w-10 text-white" />

              </div>

              <h2 className="text-4xl font-bold text-white">
                Start Receiving Anonymous Messages Today
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Create your profile, share your personal link, and let your
                friends, classmates, coworkers, or audience send completely
                anonymous messages. Honest feedback has never been this easy.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

                <Link href="/sign-up">

                  <Button className="h-12 cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base hover:from-violet-500 hover:to-indigo-500">

                    Create Free Account

                  </Button>

                </Link>

               <Link href="/sign-in">
              <Button
                variant="outline"
                className="h-12 cursor-pointer rounded-xl border-slate-700 bg-slate-900/60 px-8 text-white hover:bg-slate-800"
              >
                Login
              </Button>
            </Link>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ==========================================
          Footer
      ========================================== */}

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

          
    </>
  );
}