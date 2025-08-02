import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";
import { AuthRoute } from "~/components/layouts/AuthRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Button } from "~/components/ui/button";
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
      <PageContainer>
        <SectionContainer
          padded
          minFullscreen
          className="items-center gap-y-6 py-8"
        >
          <div>
            <Button onClick={signOut}>Keluar</Button>
          </div>
        </SectionContainer>
      </PageContainer>
    </AuthRoute>
  );
};

export default DashboardPage;
