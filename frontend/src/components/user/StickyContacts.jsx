import { Phone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { instagram } from "../../assets";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "../../constants/contact";

const instagramUrl = INSTAGRAM_URL;
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function StickyContacts() {
  return (
    <TooltipProvider>
      {/* Instagram - bottom left */}
      <div className="fixed left-6 bottom-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-bl from-pink-500 via-purple-500 to-orange-500 border shadow-lg rounded-full p-4 flex items-center justify-center hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transition-all duration-200"
              aria-label="Instagram"
            >
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Instagram</TooltipContent>
        </Tooltip>
      </div>
      {/* WhatsApp - bottom right */}
      <div className="fixed right-6 bottom-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 border shadow-lg rounded-full p-4 flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-6 h-6 text-white" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">WhatsApp</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
