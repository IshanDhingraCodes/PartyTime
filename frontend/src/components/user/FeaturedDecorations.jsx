import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star, ShoppingCart, Gift, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import useDecorationStore from "../../store/useDecorationStore";
import DecorationDetailsModal from "./DecorationDetailsModal";

const FeaturedDecorations = () => {
  const { decorations, fetchDecorations } = useDecorationStore();
  const [loading, setLoading] = useState(true);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchDecorations();
      setLoading(false);
    };
    loadData();
  }, [fetchDecorations]);

  const featuredDecorations = decorations
    .filter(
      (decoration) => decoration.discountPercentage > 0 || decoration.featured
    )
    .slice(0, 6);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const handleDecorationClick = (decoration) => {
    setSelectedDecoration(decoration);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDecoration(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-pink-300  rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 -right-10 w-16 h-16 bg-purple-300  rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-10 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
      <div className="absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-pink-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Decorations
            </h2>
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and trending decorations that will make
            your celebrations unforgettable!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDecorations.map((decoration, index) => (
            <motion.div
              key={decoration.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleDecorationClick(decoration)}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/80 dark:bg-card/80 backdrop-blur-sm">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND_URL}${
                      decoration.imageUrl
                    }`}
                    alt={decoration.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {decoration.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      -{decoration.discountPercentage}% OFF
                    </div>
                  )}

                  {/* Featured Badge */}
                  {decoration.featured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      FEATURED
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => handleDecorationClick(decoration)}
                        className="w-full bg-background/90 hover:bg-background text-foreground font-semibold cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                    {decoration.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(decoration.discountedPrice)}
                      </span>
                      {decoration.originalPrice &&
                        decoration.originalPrice !==
                          decoration.discountedPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(decoration.originalPrice)}
                          </span>
                        )}
                    </div>
                  </div>
                  {decoration.discountPercentage > 0 && (
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                      Save{" "}
                      {formatPrice(
                        decoration.originalPrice - decoration.discountedPrice
                      )}
                      !
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <DecorationDetailsModal
        decoration={selectedDecoration}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default FeaturedDecorations;
