import type { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { GuestRoute } from "~/components/layouts/GuestRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Button } from "~/components/ui/button";
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCode";
import { supabase } from "~/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  const headleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if(error) throw error
      await router.replace("/login");
    } catch (error) {
      switch ((error as AuthError).code) {
        case SupabaseAuthErrorCode.session_not_found:
          toast.error("Anda sudah berhasil logout, coba refresh halaman ini.");
          break;
        default:
          toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
      }
    }finally {
      toast.success("Anda berhasil logout.");
    }
  };

  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
          padded
          className="flex min-h-[calc(100vh-144px)] flex-col content-center justify-center"
        >
          <h1>Hello</h1>
          <Button onClick={headleLogout}>Logout</Button>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
}











