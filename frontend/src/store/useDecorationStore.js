import { create } from "zustand";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const useDecorationStore = create((set, get) => ({
  decorations: [],
  loading: false,
  error: null,

  fetchDecorations: async (categoryId, search) => {
    set({ loading: true, error: null });
    try {
      const params = {};
      if (categoryId) params.categoryId = categoryId;
      if (search) params.search = search;

      const res = await axiosInstance.get("/decorations", { params });
      set({ decorations: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch decorations", loading: false });
      toast.error(
        error.response?.data?.message || "Failed to fetch decorations"
      );
    }
  },

  addDecoration: async (data) => {
    set({ error: null });
    try {
      const res = await axiosInstance.post("/decorations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Decoration added!");
      if (res.data && res.data.id) {
        set((state) => ({
          decorations: [...state.decorations, res.data],
        }));
      } else {
        await get().fetchDecorations();
      }
    } catch (error) {
      set({ error: "Failed to add decoration" });
      toast.error(error.response?.data?.message || "Failed to add decoration");
    }
  },

  editDecoration: async (id, data) => {
    set({ error: null });
    try {
      const res = await axiosInstance.put(`/decorations/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Decoration updated!");
      if (res.data && res.data.id) {
        set((state) => ({
          decorations: state.decorations.map((dec) =>
            dec.id === id ? res.data : dec
          ),
        }));
      } else {
        await get().fetchDecorations();
      }
    } catch (error) {
      set({ error: "Failed to update decoration" });
      toast.error(
        error.response?.data?.message || "Failed to update decoration"
      );
    }
  },

  deleteDecoration: async (id) => {
    set({ error: null });
    try {
      await axiosInstance.delete(`/decorations/${id}`);
      toast.success("Decoration deleted!");
      set((state) => ({
        decorations: state.decorations.filter((dec) => dec.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete decoration" });
      toast.error(
        error.response?.data?.message || "Failed to delete decoration"
      );
    }
  },
}));

export default useDecorationStore;
