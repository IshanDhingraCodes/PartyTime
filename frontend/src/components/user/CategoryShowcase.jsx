import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "../ui/minimal-card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import useCategoryStore from "../../store/useCategoryStore";
import useDecorationStore from "../../store/useDecorationStore";
import DecorationDetailsModal from "./DecorationDetailsModal";

const CategoryShowcase = () => {
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();
  const { decorations, fetchDecorations } = useDecorationStore();
  const [loading, setLoading] = useState(true);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchDecorations()]);
      setLoading(false);
    };
    loadData();
  }, [fetchCategories, fetchDecorations]);

  const getDecorationsByCategory = (categoryId) => {
    return decorations
      .filter((decoration) => decoration.categoryId === categoryId)
      .slice(0, 4);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const handleViewMore = (categoryId) => {
    navigate(`/catalog?category=${categoryId}`);
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
      <>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="space-y-12">
            {[...Array(3)].map((_, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="text-center">
                  <Skeleton className="h-8 w-48 mx-auto mb-2" />
                  <Skeleton className="h-4 w-64 mx-auto" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, itemIndex) => (
                    <MinimalCard key={itemIndex} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </MinimalCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Explore Our Collections
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover unique decorations organized by category. Find the perfect
          items for your special occasions.
        </p>
      </motion.div>

      <div className="space-y-20">
        {categories.map((category, categoryIndex) => {
          const categoryDecorations = getDecorationsByCategory(category.id);

          return (
            <motion.section
              key={category.id}
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {category.name}
                  </h3>
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Decorations Grid */}
              {categoryDecorations.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {categoryDecorations.map((decoration) => (
                    <motion.div
                      key={decoration.id}
                      className="flex flex-col h-full"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MinimalCard
                        className="group relative overflow-hidden rounded-xl border border-border/50 bg-accent/90 shadow-sm flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200"
                        onClick={() => handleDecorationClick(decoration)}
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted/20 rounded-2xl p-1">
                          <MinimalCardImage
                            src={`${import.meta.env.VITE_APP_BACKEND_URL}${
                              decoration.imageUrl
                            }`}
                            alt={decoration.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
                            loading="lazy"
                          />
                          {/* Discount Badge */}
                          {decoration.discountPercentage > 0 && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              -{decoration.discountPercentage}%
                            </div>
                          )}
                        </div>
                        <div className="p-4 space-y-3 flex-1 flex flex-col">
                          <MinimalCardTitle className="font-semibold text-sm leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 flex-shrink-0 text-center">
                            {decoration.title}
                          </MinimalCardTitle>

                          <div className="space-y-2 mt-auto">
                            {/* Price Section */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-md font-bold text-primary">
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
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse hidden sm:block" />
                            </div>

                            {/* Savings Info */}
                            {decoration.discountPercentage > 0 && (
                              <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                You save{" "}
                                {formatPrice(
                                  decoration.originalPrice -
                                    decoration.discountedPrice
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </MinimalCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    No decorations available in this category yet.
                  </p>
                </div>
              )}

              {/* View More Button */}
              <div className="text-center pt-4">
                <Button
                  onClick={() => handleViewMore(category.id)}
                  className="group px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  View All {category.name}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </motion.section>
          );
        })}
      </div>

      <DecorationDetailsModal
        decoration={selectedDecoration}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CategoryShowcase;
