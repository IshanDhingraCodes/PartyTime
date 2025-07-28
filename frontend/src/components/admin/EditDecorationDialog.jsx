import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useDecorationStore from "../../store/useDecorationStore";
import useCategoryStore from "../../store/useCategoryStore";

const EditDecorationDialog = ({ trigger, decoration }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(decoration.title);
  const [description, setDescription] = useState(decoration.description);
  const [originalPrice, setOriginalPrice] = useState(decoration.originalPrice);
  const [discountedPrice, setDiscountedPrice] = useState(
    decoration.discountedPrice
  );
  const [categoryId, setCategoryId] = useState(decoration.categoryId);
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { editDecoration } = useDecorationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  React.useEffect(() => {
    if (open && categories.length === 0) fetchCategories();
  }, [open, categories.length, fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalPrice", originalPrice);
    formData.append("discountedPrice", discountedPrice);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);
    const discountPercentage = (
      ((parseFloat(originalPrice) - parseFloat(discountedPrice)) /
        parseFloat(originalPrice)) *
      100
    ).toFixed(2);
    formData.append("discountPercentage", discountPercentage);
    await editDecoration(decoration.id, formData);
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Decoration</DialogTitle>
          <DialogDescription>
            Update decoration details, image, and pricing information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            disabled={submitting}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            disabled={submitting}
            className="w-full min-h-[80px] rounded-md border bg-background p-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Original Price"
              required
              min={0}
              step="0.01"
              disabled={submitting}
            />
            <Input
              type="number"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              placeholder="Discounted Price"
              required
              min={0}
              step="0.01"
              disabled={submitting}
            />
          </div>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between cursor-pointer"
              onClick={() => setCategoryDropdownOpen((v) => !v)}
              disabled={submitting}
            >
              {categoryId
                ? categories.find((cat) => cat.id === categoryId)?.name ||
                  "Select Category"
                : "Select Category"}
              <span className="ml-2">▼</span>
            </Button>
            {categoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-popover border rounded-md shadow-lg max-h-48 overflow-auto">
                {categories.length === 0 ? (
                  <div className="p-2 text-muted-foreground text-sm">
                    No categories
                  </div>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`px-4 py-2 hover:bg-accent cursor-pointer ${
                        cat.id === categoryId
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                      onClick={() => {
                        setCategoryId(cat.id);
                        setCategoryDropdownOpen(false);
                      }}
                    >
                      {cat.name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            disabled={submitting}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={
                submitting ||
                !title.trim() ||
                !description.trim() ||
                !originalPrice ||
                !discountedPrice ||
                !categoryId
              }
              className="cursor-pointer"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDecorationDialog;
