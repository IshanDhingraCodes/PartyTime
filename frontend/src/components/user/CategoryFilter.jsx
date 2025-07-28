import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Skeleton } from "../ui/skeleton";
import useCategoryStore from "../../store/useCategoryStore";
import useDecorationStore from "../../store/useDecorationStore";

const CategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, loading, fetchCategories } = useCategoryStore();
  const { decorations, fetchDecorations } = useDecorationStore();
  const [categoryImages, setCategoryImages] = useState({});
  const [hasLoadedImages, setHasLoadedImages] = useState(false);

  const shouldShow =
    location.pathname === "/catalog" || location.pathname === "/";

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDecorations();
  }, [fetchDecorations]);

  useEffect(() => {
    if (decorations.length > 0 && categories.length > 0 && !hasLoadedImages) {
      const images = {};
      categories.forEach((category) => {
        const categoryDecoration = decorations.find(
          (dec) => dec.categoryId === category.id
        );
        if (categoryDecoration) {
          images[category.id] = categoryDecoration.imageUrl;
        }
      });
      setCategoryImages(images);
      setHasLoadedImages(true);
    }
  }, [decorations, categories, hasLoadedImages]);

  const handleCategoryClick = (category) => {
    navigate(`/catalog?category=${category.id}`);
  };

  if (!shouldShow) {
    return null;
  }

  if (loading) {
    return (
      <div className="border-b border-border/50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 min-w-[80px] flex-shrink-0"
              >
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="border-b border-border/50 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-none">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group my-0.5 flex-shrink-0"
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-16 w-16 flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-full border-2 border-dashed border-primary/60 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10 animate-spin-slow ${
                    categoryId === category.id
                      ? "border-primary bg-primary/20 animate-spin-fast"
                      : ""
                  }`}
                ></div>
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  {categoryImages[category.id] ? (
                    <img
                      src={`${import.meta.env.VITE_APP_BACKEND_URL}${
                        categoryImages[category.id]
                      }`}
                      alt={category.name}
                      className="h-full w-full object-cover rounded-full p-1"
                    />
                  ) : (
                    <span className="text-primary font-bold text-sm text-center leading-tight flex items-center justify-center h-full">
                      {category.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">
                {category.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
