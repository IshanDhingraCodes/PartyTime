import React from "react";
import { motion } from "motion/react";
import { MAP_URL } from "../../constants/contact";
import { Heart, Sparkles } from "lucide-react";
import SectionDivider from "../ui/section-divider";

const About = () => {
  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 bg-background overflow-hidden">
      {/* Background decorative elements */}

      <div className="absolute top-0 left-0 w-full h-16">
        <SectionDivider variant="curveInverted" color="primary" height="h-16" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-200  rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-1/4 w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-300"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Turn Moments Into{" "}
              <span className="text-primary">Magical Memories</span>
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At <strong className="text-primary">PartyTime</strong>, we don't
            just decorate—we create experiences. Whether it's a cozy baby shower
            or a grand wedding, our team weaves creativity, quality, and joy
            into every detail to make your celebration one to remember.
          </p>
        </motion.div>

        {/* Right: Embedded Google Map */}
        <motion.div
          className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Map overlay decoration */}
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-foreground">
                Our Location
              </span>
            </div>
          </div>

          <iframe
            title="PartyTime Studio Location"
            src={MAP_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
