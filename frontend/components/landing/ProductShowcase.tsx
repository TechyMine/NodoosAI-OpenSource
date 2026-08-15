"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Bot,
  Layers,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";

export function ProductShowcase() {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    if (!iframeRef.current?.contentWindow) return;

    if (isMuted) {
      // Unmute
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "unMute", args: [] }),
        "*"
      );
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
        "*"
      );
      setIsMuted(false);
    } else {
      // Mute
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "mute", args: [] }),
        "*"
      );
      setIsMuted(true);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Visual Workflow Canvas",
      description:
        "Connect APIs, webhooks, and AI triggers seamlessly without complex boilerplate code.",
    },
    {
      icon: Bot,
      title: "Autonomous Agent Orchestration",
      description:
        "Context-aware reasoning nodes that self-heal and resolve edge cases dynamically.",
    },
    {
      icon: Layers,
      title: "Unified Multi-Tool Integrations",
      description:
        "Direct bridge to Slack, Gmail, Google Workspace, CRM, and internal databases.",
    },
  ];

  return (
    <section id="product-showcase" className="relative overflow-hidden py-16 md:py-24">
      {/* Background ambient lighting glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[450px] w-[750px] rounded-full bg-gradient-to-tr from-accent/20 via-indigo-500/10 to-teal-400/15 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Product In Action</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
          >
            Experience The Power of{" "}
            <span className="bg-gradient-to-r from-accent to-indigo-600 bg-clip-text text-transparent">
              Autonomous Automation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm text-muted-foreground md:text-base"
          >
            Watch how Nodoos orchestrates complex, multi-modal workflows with real-time AI agents
            in a single, unified studio.
          </motion.p>
        </div>

        {/* Product Video Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 md:mt-14"
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/90 bg-surface shadow-2xl ring-1 ring-black/5 md:rounded-3xl">
            {/* Top Browser / App Window Chrome Bar */}
            <div className="flex h-11 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur-md">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80 ring-1 ring-red-500/20" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80 ring-1 ring-amber-500/20" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80 ring-1 ring-emerald-500/20" />
              </div>

              {/* URL / Studio Breadcrumb */}
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-inner">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-mono text-[11px] text-foreground/80">
                  app.nodoos.ai/studio/workflow-demo
                </span>
              </div>

              {/* Status Badge */}
              <div className="hidden items-center gap-2 sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  HD Live Demo
                </span>
              </div>
            </div>

            {/* Video Wrapper */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {/* Clean YouTube Video without controls */}
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/u2FlfKGDHS8?autoplay=1&mute=1&loop=1&playlist=u2FlfKGDHS8&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&modestbranding=1&enablejsapi=1"
                title="Nodoos AI Product Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="pointer-events-none absolute -inset-y-12 inset-x-0 h-[calc(100%+6rem)] w-full border-0"
              />

              {/* Clean Unmute / Mute Button Overlay */}
              <div className="absolute bottom-5 right-5 z-20">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="group flex items-center gap-2.5 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 hover:border-white/40 active:scale-95 focus:outline-none"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4 text-red-400 transition-transform group-hover:scale-110" />
                      <span className="font-semibold tracking-wide">Unmute Sound</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-emerald-400 transition-transform group-hover:scale-110" />
                      <span className="font-semibold tracking-wide">Mute Sound</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Grid Underneath Video */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i + 0.35 }}
                className="flex items-start gap-3.5 rounded-2xl border border-border/80 bg-surface/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-md"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-light text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

