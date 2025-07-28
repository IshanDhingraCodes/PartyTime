import { create } from "zustand";
import axiosInstance from "../api/axios";
import { toast } from "react-hot-toast";

const useAdminStore = create((set) => ({
  isLoggedIn: false,

  checkAuth: async () => {
    try {
      await axiosInstance.get("/admin/me");
      set({ isLoggedIn: true });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      set({ isLoggedIn: false });
    }
  },

  login: async (username, password) => {
    try {
      await axiosInstance.post("/admin/login", { username, password });
      set({ isLoggedIn: true });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/admin/logout");
      set({ isLoggedIn: false, admin: null });
      toast.success("Logged out!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  changePassword: async (oldPassword, newPassword) => {
    try {
      await axiosInstance.post("/admin/change-password", {
        oldPassword,
        newPassword,
      });
      toast.success("Password changed! Please log in again.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
      throw error;
    }
  },
}));

export default useAdminStore;
