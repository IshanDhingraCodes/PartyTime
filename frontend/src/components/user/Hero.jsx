import React from "react";
import { motion } from "motion/react";
import ImageCursorTrail from "../ui/image-cursortrail";
import { images } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import SectionDivider from "../ui/section-divider";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-center overflow-hidden h-[calc(100vh-9rem)]">
      <div className="absolute top-0 left-0 w-full h-16">
        <SectionDivider variant="curveInverted" color="primary" height="h-16" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16">
        <SectionDivider variant="curve" color="primary" height="h-16" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-pink-400/40 via-purple-400/30 to-yellow-300/30 rounded-full blur-3xl opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/3 w-[350px] h-[180px] bg-gradient-to-br from-blue-400/30 via-cyan-300/20 to-purple-400/20 rounded-full blur-2xl opacity-60 pointer-events-none z-0" />
      <div className="absolute top-10 left-1/4 w-[220px] h-[120px] bg-gradient-to-br from-green-300/30 via-lime-200/20 to-yellow-200/20 rounded-full blur-2xl opacity-50 pointer-events-none z-0" />
      {/* Top Left Confetti SVG */}
      <svg
        className="absolute top-6 left-6 w-32 h-32 z-10 pointer-events-none"
        viewBox="0 0 128 128"
        fill="none"
      >
        <circle cx="32" cy="32" r="12" fill="#F472B6" />
        <rect x="80" y="16" width="16" height="16" rx="4" fill="#FBBF24" />
        <ellipse cx="100" cy="100" rx="10" ry="16" fill="#A78BFA" />
        <rect x="20" y="90" width="12" height="24" rx="6" fill="#34D399" />
        <polygon
          points="64,18 68,30 82,30 71,38 75,50 64,42 53,50 57,38 46,30 60,30"
          fill="#FDE68A"
        />
      </svg>
      {/* Bottom Right Confetti SVG */}
      <svg
        className="absolute bottom-8 right-8 w-32 h-32 z-10 pointer-events-none"
        viewBox="0 0 128 128"
        fill="none"
      >
        <circle cx="96" cy="96" r="12" fill="#FBBF24" />
        <rect x="24" y="100" width="16" height="10" rx="5" fill="#F472B6" />
        <ellipse cx="40" cy="28" rx="10" ry="16" fill="#A78BFA" />
        <rect x="90" y="20" width="10" height="24" rx="5" fill="#34D399" />
        <path
          d="M110 110 Q120 120 126 100"
          stroke="#F472B6"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      {/* Top Right SVG */}
      <svg
        className="absolute top-8 right-8 w-28 h-28 z-10 pointer-events-none"
        viewBox="0 0 112 112"
        fill="none"
      >
        <ellipse cx="30" cy="30" rx="14" ry="20" fill="#60A5FA" />
        <ellipse cx="70" cy="20" rx="10" ry="14" fill="#F472B6" />
        <polygon
          points="90,14 94,22 104,22 96,28 98,36 90,32 82,36 84,28 76,22 86,22"
          fill="#FDE68A"
        />
      </svg>
      {/* Bottom Left SVG */}
      <svg
        className="absolute bottom-8 left-8 w-28 h-28 z-10 pointer-events-none"
        viewBox="0 0 112 112"
        fill="none"
      >
        <rect x="18" y="90" width="14" height="14" rx="4" fill="#A78BFA" />
        <circle cx="50" cy="90" r="8" fill="#34D399" />
        <path
          d="M28 104 Q56 96 84 104"
          stroke="#FBBF24"
          strokeWidth="3"
          fill="none"
        />
        <polygon
          points="65,87 67,93 73,93 68,97 70,103 65,99 60,103 62,97 57,93 63,93"
          fill="#F472B6"
        />
      </svg>
      {/* Right Center SVG */}
      <svg
        className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-32 z-10 pointer-events-none"
        viewBox="0 0 32 64"
        fill="none"
      >
        <path
          d="M16 0 Q32 16 16 32 Q0 48 16 64"
          stroke="#60A5FA"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      {/* Singleton SVGs */}
      {/* Sparkle to the left of main text */}
      <svg
        className="absolute left-[22%] top-1/2 -translate-y-1/2 w-8 h-8 z-10 pointer-events-none"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z"
          fill="#A78BFA"
        />
      </svg>
      {/* Streamer below the button */}
      <svg
        className="absolute left-1/2 bottom-[18%] -translate-x-1/2 w-24 h-8 z-10 pointer-events-none"
        viewBox="0 0 96 32"
        fill="none"
      >
        <path
          d="M8 24 Q32 8 48 24 Q64 40 88 24"
          stroke="#F472B6"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      <ImageCursorTrail
        items={images}
        className="h-full w-full"
        maxNumberOfImages={5}
        distance={25}
        imgClass="sm:w-40 w-28 sm:h-48 h-36 object-contain"
        fadeAnimation={true}
      >
        <motion.div
          className="z-100 flex flex-col items-center text-center gap-8 px-4"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-[4.5rem] text-foreground drop-shadow-xl mb-4 md:mb-7 select-none">
            Make Every Event{" "}
            <span className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent">
              Unforgettable
            </span>
          </h1>
          <p className="text-base md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed md:leading-9 flex items-center justify-center gap-2">
            Discover unique decorations for every occasion. Elevate your
            celebrations with our curated collection.
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 align-middle animate-pulse"></span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/catalog")}
            className="hero-cta flex items-center gap-3 px-6 py-3 rounded-xl text-md md:text-lg font-bold bg-accent border border-accent-foreground shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
            Browse Catalog
          </button>
        </motion.div>
      </ImageCursorTrail>
    </section>
  );
};

export default Hero;
