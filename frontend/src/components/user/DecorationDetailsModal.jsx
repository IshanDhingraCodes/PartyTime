import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Badge } from "../ui/discountBadge";
import { Separator } from "../ui/separator";
import { Tag, Package } from "lucide-react";
import useCategoryStore from "../../store/useCategoryStore";
import { PHONE_NUMBERS, WHATSAPP_NUMBER } from "../../constants/contact";

const DecorationDetailsModal = ({ decoration, isOpen, onClose }) => {
  const { categories } = useCategoryStore();

  if (!decoration) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const getCategoryName = (categoryId) => {
    if (decoration.category) {
      return decoration.category.name;
    }
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="mx-2">
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {decoration.title}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            View details and pricing information for this decoration
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Section */}
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_APP_BACKEND_URL}${
                decoration.imageUrl
              }`}
              alt={decoration.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            {decoration.discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                -{decoration.discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row items-start gap-2 justify-between">
              <div className="flex items-center gap-5">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(decoration.discountedPrice)}
                </span>
                {decoration.originalPrice &&
                  decoration.originalPrice !== decoration.discountedPrice && (
                    <span className="text-md text-muted-foreground line-through">
                      {formatPrice(decoration.originalPrice)}
                    </span>
                  )}
              </div>
              {decoration.discountPercentage > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Save{" "}
                  {formatPrice(
                    decoration.originalPrice - decoration.discountedPrice
                  )}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          {decoration.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {decoration.description}
              </p>
            </div>
          )}

          {/* Category */}
          {decoration.categoryId && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Category
              </h3>
              <Badge variant="outline" className="text-sm">
                {getCategoryName(decoration.categoryId)}
              </Badge>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-accent/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Interested in this decoration?
            </h3>
            <p className="text-muted-foreground text-sm">
              Contact us for more information, customization options, or to
              place an order.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PHONE_NUMBERS.map((num) => (
                <a
                  key={num}
                  href={`tel:${num}`}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  📞 Call {num}
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DecorationDetailsModal;
