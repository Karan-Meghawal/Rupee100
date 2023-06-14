import AdminAuthGuard from "@/guards/AdminAuthGuard";
import AuthGuard from "@/guards/AuthGuard";
import React from "react";
import AdminDashboardLayout from "./admin";
import DashboardLayout from "./dashboard";
import LogoLayout from "./logo";
import MainLayout from "./main";

type Props = {
  variant: "main" | "logo" | "dashboard" | "admin";
  children: React.ReactNode;
};

const Layout = ({ variant, children }: Props) => {
  if (variant === "main") {
    return <MainLayout>{children}</MainLayout>;
  }

  if (variant === "logo") {
    return <LogoLayout> {children} </LogoLayout>;
  }

  if (variant === "admin") {
    return (
      <AdminAuthGuard>
        <AdminDashboardLayout> {children} </AdminDashboardLayout>
      </AdminAuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
