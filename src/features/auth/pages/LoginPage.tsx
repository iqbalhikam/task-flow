import { zodResolver } from "@hookform/resolvers/zod";
import { type AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { GuestRoute } from "~/components/layouts/GuestRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { supabase } from "~/lib/supabase/client";
import { registerFormSchema, type RegisterFormSchema } from "../form/register";
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCode";
import { toast } from "sonner";
import { RegisterFormInner } from "~/features/components/RegisterFormInner";

const LoginPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  const handleLoginSubmit = async (values: RegisterFormSchema) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      await router.replace("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case SupabaseAuthErrorCode.invalid_credentials:
          form.setError("email", { message: "Email atau password salah" });
          form.setError("password", {
            message: "Email atau password salah",
          });
          break;
        case SupabaseAuthErrorCode.email_not_confirmed:
          form.setError("email", { message: "Email belum diverifikasi" });
          break;
        default:
          toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
      }
    }
  };
  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
          padded
          className="flex min-h-[calc(100vh-144px)] w-full flex-col justify-center"
        >
          <Card className="w-full max-w-[480px] self-center">
            <CardHeader className="flex flex-col items-center justify-center ">
              <CardTitle className="text-primary text-3xl font-bold">
                Selamat Datang Kembali 👋
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manajement tugas ada dengan mudah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  // isLoading={registerUserIsPending}
                  onRegisterSubmit={handleLoginSubmit}
                  buttonText="Masuk"
                />
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between gap-x-4">
                <div className="h-[2px] w-full border-t-2" />
                <p className="text-muted-foreground flex-1 text-sm text-nowrap">
                  Atau lanjut dengan
                </p>
                <div className="h-[2px] w-full border-t-2" />
              </div>

              <Button variant="default" className="w-full" size="lg">
                <FcGoogle />
                Masuk dengan Google
              </Button>

              <p>
                Belum punya akun?{" "}
                <Link href="/register" className="font-bold text-purple-600">
                  Daftar dong
                </Link>
              </p>
            </CardFooter>
          </Card>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
};

export default LoginPage;
