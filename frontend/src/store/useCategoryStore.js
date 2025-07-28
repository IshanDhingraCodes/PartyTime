import { create } from "zustand";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/categories");
      set({ categories: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch categories", loading: false });
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  },

  addCategory: async (name) => {
    set({ error: null });
    try {
      const res = await axiosInstance.post("/categories", { name });
      toast.success("Category added!");
      if (res.data && res.data.id) {
        set((state) => ({
          categories: [...state.categories, res.data],
        }));
      } else {
        await get().fetchCategories();
      }
    } catch (error) {
      set({ error: "Failed to add category" });
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  },

  editCategory: async (id, name) => {
    set({ error: null });
    try {
      await axiosInstance.put(`/categories/${id}`, { name });
      toast.success("Category updated!");
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? { ...cat, name } : cat
        ),
      }));
    } catch (error) {
      set({ error: "Failed to update category" });
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  },

  deleteCategory: async (id) => {
    set({ error: null });
    try {
      await axiosInstance.delete(`/categories/${id}`);
      toast.success("Category deleted!");
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete category" });
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  },
}));

export default useCategoryStore;
