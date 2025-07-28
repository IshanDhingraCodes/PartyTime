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
import useCategoryStore from "../../store/useCategoryStore";

const EditCategoryDialog = ({ trigger, category }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [submitting, setSubmitting] = useState(false);
  const { editCategory } = useCategoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await editCategory(category.id, name);
    setSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name and save changes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
            autoFocus
            disabled={submitting}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={submitting || !name.trim()}
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

export default EditCategoryDialog;
