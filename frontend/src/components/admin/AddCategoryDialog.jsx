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

const AddCategoryDialog = ({ trigger, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { addCategory } = useCategoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await addCategory(name);
    setSubmitting(false);
    setName("");
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category for organizing decorations
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
              {submitting ? "Adding..." : "Add Category"}
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

export default AddCategoryDialog;
