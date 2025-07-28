import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDecorationStore from "../store/useDecorationStore";
import useCategoryStore from "../store/useCategoryStore";
import { Skeleton } from "../components/ui/skeleton";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "../components/ui/minimal-card";
import { Search } from "lucide-react";
import DecorationDetailsModal from "../components/user/DecorationDetailsModal";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const CatalogPage = () => {
  const [decorations, setDecorations] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryId = searchParams.get("category");

  const {
    decorations: storeDecorations,
    loading,
    fetchDecorations,
  } = useDecorationStore();
  const { categories, fetchCategories } = useCategoryStore();

  // eslint-disable-next-line no-unused-vars
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Alphabetically, A-Z");

  const getFilteredSortedDecorations = () => {
    let result = [...storeDecorations];
    if (priceFilter === "Low to High") {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (priceFilter === "High to Low") {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }
    if (sortOption === "Alphabetically, A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Alphabetically, Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }
    return result;
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchDecorations(categoryId, searchQuery);
  }, [fetchDecorations, searchQuery, categoryId]);

  useEffect(() => {
    setDecorations(getFilteredSortedDecorations());
    // eslint-disable-next-line
  }, [storeDecorations, priceFilter, sortOption]);

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
      <div className="min-h-[calc(100vh-9rem)]">
        <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <MinimalCard key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="px-1 pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </MinimalCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden">
        {/* Filter & Sort Section */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <div className="flex items-center gap-4 flex-wrap justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-foreground">
                Sort by:
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[180px] justify-between"
                  >
                    {sortOption}
                    <span className="ml-2">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onSelect={() => setSortOption("Alphabetically, A-Z")}
                  >
                    Alphabetically, A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSortOption("Alphabetically, Z-A")}
                  >
                    Alphabetically, Z-A
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSortOption("Price: Low to High")}
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSortOption("Price: High to Low")}
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span className="text-muted-foreground text-base ml-2">
              {decorations.length} products
            </span>
          </div>
        </div>
        {/* End Filter & Sort Section */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : categoryId
              ? categories.find((cat) => cat.id === categoryId)?.name ||
                "Products"
              : "Products"}
          </h1>
          {(searchQuery || categoryId) && (
            <p className="text-muted-foreground">
              Found {decorations.length} result
              {decorations.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {decorations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
              <Search className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-foreground mb-4">
              No decorations available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {decorations.map((decoration) => {
              return (
                <div key={decoration.id} className="flex flex-col h-full">
                  <MinimalCard
                    className="group relative overflow-hidden rounded-xl border border-border/50 bg-accent/90 shadow-sm flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => handleDecorationClick(decoration)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted/20 rounded-2xl p-1">
                      <MinimalCardImage
                        src={`${import.meta.env.VITE_APP_BACKEND_URL}${
                          decoration.imageUrl
                        }`}
                        alt={decoration.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
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
                          <div className="text-xs text-green-600 font-medium">
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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Decoration Details Modal */}
      <DecorationDetailsModal
        decoration={selectedDecoration}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CatalogPage;
