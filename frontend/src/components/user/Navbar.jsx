import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ModeToggleIcon } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { Menu, X, Search, LogIn } from "lucide-react";
import { logo } from "../../assets";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "../../constants";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.nav
      className="sticky top-0 z-300 w-full bg-card/80 backdrop-blur border-b border-border shadow-sm flex items-center h-[6rem] md:h-[9rem]"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative hidden md:flex items-center justify-between">
        <motion.div
          className="flex items-center gap-8 min-w-[300px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.2 },
            },
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to !== "/" && location.pathname.startsWith(link.to));
            return (
              <motion.div
                key={link.name}
                variants={{
                  hidden: { x: -40, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 80, damping: 16 },
                  },
                }}
                className="relative"
              >
                <Link
                  to={link.to}
                  className={`font-medium text-base transition-colors px-2 py-1 rounded-md ${
                    isActive ? "text-primary font-bold" : "hover:text-primary"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary rounded-full"
                      initial={{ opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.7 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center cursor-pointer h-[6rem] md:h-[9rem]"
          onClick={() => navigate("/")}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: 0.35,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <img src={logo} alt="logo" className="h-36 w-36 object-contain" />
        </motion.div>
        <motion.div
          className="flex items-center gap-2 min-w-[120px] justify-end ml-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.45 },
            },
          }}
        >
          <motion.button
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Search"
            variants={{
              hidden: { x: 40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 80, damping: 16 },
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Admin Login"
            variants={{
              hidden: { x: 40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 80, damping: 16 },
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/login")}
          >
            <LogIn className="w-5 h-5" />
          </motion.button>
          <motion.div
            variants={{
              hidden: { x: 40, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 80, damping: 16 },
              },
            }}
            initial={false}
            animate={true}
            transition={{ delay: 0.5 }}
          >
            <ModeToggleIcon />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-between w-full h-full px-4 relative">
        <div
          className="flex items-center cursor-pointer h-[6rem] md:h-[9rem]"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-16 w-16 object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggleIcon />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed top-[6rem] md:top-[9rem] left-0 w-full bg-card border-b border-border shadow-lg z-40 px-4 pb-6 pt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-4 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`font-medium text-lg transition-colors px-2 py-2 rounded-md ${
                    location.pathname === link.to ||
                    (link.to !== "/" && location.pathname.startsWith(link.to))
                      ? "text-primary font-bold"
                      : "hover:text-primary"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                variant="outline"
                size="lg"
                className="mt-2 w-full"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/admin/login");
                }}
              >
                <LogIn className="w-5 h-5 mr-2" /> Admin Login
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSearch={(query) => {
          navigate(`/catalog?search=${encodeURIComponent(query)}`);
        }}
      />
    </motion.nav>
  );
};

export default Navbar;
