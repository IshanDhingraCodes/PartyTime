import React from "react";
import { logo } from "../../assets";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import { LogOut, ChevronsUpDown } from "lucide-react";
import { ModeToggleFull, ModeToggleIcon } from "../ui/mode-toggle";
import { adminMenuItems } from "../../constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { Lock } from "lucide-react";

function Avatar({ children, className }) {
  return (
    <span
      className={
        "inline-flex items-center justify-center rounded-full bg-muted text-primary font-bold " +
        (className || "")
      }
    >
      {children}
    </span>
  );
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAdminStore();
  const { state, isMobile } = useSidebar();

  return (
    <ShadCnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 my-3 cursor-pointer">
            <div
              className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="logo" className="size-8" />
            </div>
            <span
              className="truncate font-bold flex-1 text-left text-2xl leading-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              PartyTime
            </span>
            {state === "expanded" ? (
              <SidebarTrigger className="cursor-pointer hidden md:block" />
            ) : null}
          </SidebarMenuItem>
          <SidebarMenuItem>
            {state === "collapsed" ? (
              <SidebarTrigger className="cursor-pointer hidden md:block ml-1.5" />
            ) : null}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2 mt-6 justify-center">
            {adminMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                    className={`cursor-pointer ${
                      isActive ? "bg-muted text-primary py-5" : "py-5"
                    }`}
                  >
                    {item.icon && <item.icon className="!w-4 !h-4" />}
                    <span className="text-md font-semibold">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="my-2">
            {state === "expanded" ? (
              <ModeToggleFull />
            ) : (
              <>
                <div className="hidden md:block">
                  <ModeToggleIcon />
                </div>
                <div className="md:hidden">
                  <ModeToggleFull />
                </div>
              </>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="sm"
                  className="flex items-center gap-2 w-full py-5 px-2 rounded-md hover:bg-muted/70 transition-colors cursor-pointer"
                >
                  <Avatar className="w-6 h-6  text-base">A</Avatar>
                  <span className="truncate font-medium text-sm">Admin</span>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-44 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="w-6 h-6 text-base">A</Avatar>
                    <span className="truncate font-medium">Admin</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ChangePasswordDialog
                  trigger={
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuItem
                  onClick={() => logout(navigate)}
                  className="cursor-pointer"
                >
                  <LogOut />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadCnSidebar>
  );
};

export default Sidebar;
