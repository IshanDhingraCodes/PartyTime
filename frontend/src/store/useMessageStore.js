import { create } from "zustand";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const useMessageStore = create((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/messages");
      set({ messages: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch messages", loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    }
  },

  deleteMessage: async (id) => {
    set({ error: null });
    try {
      await axiosInstance.delete(`/messages/${id}`);
      toast.success("Message deleted!");
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete message" });
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  sendMessage: async (payload) => {
    set({ error: null });
    try {
      await axiosInstance.post("/messages", payload);
      toast.success("Message sent!");
    } catch (error) {
      set({ error: "Failed to send message" });
      toast.error(error.response?.data?.message || "Failed to send message");
      throw error;
    }
  },
}));

export default useMessageStore;
