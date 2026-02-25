"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Magnetic button component
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3 px-8 py-4 bg-lime text-black font-semibold text-lg rounded-full hover:bg-lime-hover transition-colors"
    >
      {children}
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </motion.a>
  );
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden flex flex-col relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source
          src="https://cdn.midjourney.com/video/7b255d7a-8f03-4a28-8452-2fd10674ef70/0.mp4"
          type="video/mp4"
        />
      </video>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70 z-0" aria-hidden="true" />

      {/* Simple header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 relative z-10">
        <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
            <span className="text-black font-bold text-sm">CC</span>
          </div>
          <span className="text-white/80 font-medium hidden sm:block">
            Claude Code Masterclass
          </span>
        </div>
        <div className="px-4 py-2 border border-white/20 rounded-full text-white/60 text-sm">
          Barcelona 2026
        </div>
      </header>

      {/* Main content - split layout */}
      <main className="flex-1 flex items-center px-6 md:px-12 lg:px-20 relative z-10">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-lime/30 bg-lime/10 rounded-full text-lime text-sm">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                Setup complete
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                You&apos;re ready
                <br />
                <span className="text-lime">to build.</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-lg lg:text-xl max-w-md leading-relaxed"
            >
              Your development environment is set up. Claude Code is ready to
              help you build your first feature.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="https://docs.anthropic.com/en/docs/claude-code">
                Open Claude Code docs
              </MagneticButton>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/40 text-sm"
            >
              or type{" "}
              <code className="px-2 py-1 bg-white/10 rounded-lg text-lime font-mono text-xs">
                claude
              </code>{" "}
              in terminal to get started
            </motion.p>
          </div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract shape */}
              <div className="absolute inset-0 rounded-[60px] bg-gradient-to-br from-lime/20 via-lime/5 to-transparent rotate-12 blur-sm" />
              <div className="absolute inset-4 rounded-[50px] bg-gradient-to-br from-white/5 to-transparent -rotate-6" />

              {/* Content card */}
              <div className="absolute inset-8 bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-white/40 text-sm mb-2 font-medium uppercase tracking-wider">
                    What&apos;s included
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Next.js 15", detail: "App Router" },
                      { name: "TypeScript", detail: "Strict mode" },
                      { name: "Tailwind CSS", detail: "Utility-first" },
                      { name: "Claude Code", detail: "AI assistant" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-lime" />
                        <span className="text-white/80">{item.name}</span>
                        <span className="text-white/40 text-sm">
                          {item.detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Ready to code</span>
                    <span className="text-lime">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <p>© 2026 Like a Human AI</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:jasper@likeahuman.ai"
              className="hover:text-white/60 transition-colors"
            >
              Contact
            </a>
            <a
              href="https://likeahuman.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
