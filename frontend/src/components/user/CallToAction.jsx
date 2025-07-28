import React from "react";
import { motion } from "motion/react";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Gift,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { PHONE_NUMBERS, WHATSAPP_NUMBER } from "../../constants/contact";

const CallToAction = () => {
  const navigate = useNavigate();

  const phoneNumber = PHONE_NUMBERS[0];

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-primary rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-primary rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-purple-300 rounded-full animate-bounce delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-8 h-8 text-yellow-300" />
            <h2 className="text-4xl md:text-6xl font-bold">
              Ready to Create Magic?
            </h2>
            <Zap className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Let's turn your vision into reality! Contact us today and let's
            start planning your perfect celebration together.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Phone */}
          <motion.div
            className="group"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20 ">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Call Us</h3>
              <p className="font-semibold text-center">{phoneNumber}</p>
              <p className="text-muted-foreground text-sm text-center mt-2">
                Available 24/7
              </p>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            className="group"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20  cursor-pointer"
              onClick={handleWhatsApp}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">WhatsApp</h3>
              <p className="font-semibold text-center">Chat with us</p>
              <p className="text-muted-foreground text-sm text-center mt-2">
                Instant messaging
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Primary CTA */}
          <Button
            onClick={() => navigate("/catalog")}
            variant="default"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Browse Our Collection
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>

          {/* Secondary CTA */}
          <Button
            onClick={() => navigate("/contact")}
            variant="outline"
            className="group border border-primary bg-accent text-accent-foreground font-semibold text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Get Free Quote
            <Star className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
