import { Link, useNavigate } from "react-router-dom";
import { instagram, instagramDark, logo } from "../../assets";
import { useTheme } from "../ui/themeProvider";
import {
  PHONE_NUMBERS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "../../constants/contact";

export default function Footer() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="w-full border-t bg-accent text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Logo and Brand */}
        <div
          className="flex items-center justify-center md:justify-start md:items-start cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="PartyTime Logo" className="h-40 w-40" />
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-semibold text-foreground mb-1 md:mb-3">
            Navigation
          </span>
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/catalog" className="hover:text-primary transition-colors">
            Catalog
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        {/* Contact Info */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-semibold text-foreground mb-1 md:mb-3">
            Contact
          </span>
          {PHONE_NUMBERS.map((num) => (
            <span key={num}>
              📞{" "}
              <a
                href={`tel:${num}`}
                className="hover:text-primary transition-colors"
              >
                {num}
              </a>
            </span>
          ))}
          <span className="flex items-center gap-1">
            <img
              src={isDark ? instagram : instagramDark}
              alt="Instagram"
              className="w-4 h-4 mt-1"
            />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </span>
        </div>
      </div>
      <div className="text-center py-4 text-xs border-t bg-muted text-muted-foreground">
        © {new Date().getFullYear()} Party Time Chandigarh. All rights reserved.
      </div>
    </footer>
  );
}
