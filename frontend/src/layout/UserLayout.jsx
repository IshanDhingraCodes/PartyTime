import React from "react";
import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import StickyContacts from "../components/user/StickyContacts";
import CategoryFilter from "../components/user/CategoryFilter";

const UserLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <CategoryFilter />
    <main className="flex-1 w-full mx-auto">
      <Outlet />
    </main>
    <Footer />
    <StickyContacts />
  </div>
);

export default UserLayout;
