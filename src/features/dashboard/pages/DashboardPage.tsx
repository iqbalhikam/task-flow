import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";
import { AppSidebar } from "~/components/app-sidebar";
import { AuthRoute } from "~/components/layouts/AuthRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import SideNav from "~/components/layouts/SideNav";
import { Button } from "~/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { supabase } from "~/lib/supabase/client";

const DashboardPage = () => {
  const router = useRouter();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Gagal keluar");
      throw error;
    }

    await router.push("/login");
  };

  return (
    <AuthRoute>
      <SideNav >
        
          <div>
            <Button onClick={signOut}>Keluar</Button>
          </div>
      </SideNav>
    </AuthRoute>
  );
};

export default DashboardPage;
