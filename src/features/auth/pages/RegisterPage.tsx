import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GuestRoute } from "~/components/layouts/GuestRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { registerFormSchema, type RegisterFormSchema } from "../form/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { RegisterFormInner } from "~/features/components/RegisterFormInner";
import { Button } from "~/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { supabase } from "~/lib/supabase/client";
import { useRouter } from "next/router";
import type { AuthError } from "@supabase/supabase-js";
import { SupabaseAuthErrorCode } from "~/lib/supabase/authErrorCode";
import { toast } from "sonner";

const RegisterPage = () => {
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema)
    })

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const heandleRregisterSubmit = async ( values : RegisterFormSchema) => {
      try {
        setIsLoading(true);
        const res = supabase.auth.signUp({
          email: values.email,
          password: values.password
        })

        const error = (await res).error
        if (error) throw error

        await router.replace("/");
      } catch (error) {
        switch ((error as AuthError).code) {
          // email_address_invalid
          case SupabaseAuthErrorCode.email_exists:
            form.setError("email", { message: "Email sudah terdaftar" });
            break;
          case SupabaseAuthErrorCode.email_conflict_identity_not_deletable:
            form.setError("email", { message: "Email sudah terdaftar" });
            break;
          default:
            toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
        }
      }finally {
        setIsLoading(false);
      }
    }
  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
        padded
        className="flex min-h-[calc(100vh-144px)] content-center flex-col  justify-center"
        >
          <Card className="w-full max-w-sm self-center bg-background">
            <CardHeader>
              <CardTitle className="text-3xl text-foreground">Daftar Sekarang!!</CardTitle>
              <CardDescription>
                Dan manajemen tugas anda dengan mudah dan nyaman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  isLoading = {isLoading}
                  onRegisterSubmit={heandleRregisterSubmit}
                  buttonText="Daftar"
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
                Daftar dengan Google
              </Button>

              <p>
                Sudah punya akun?{" "}
                <Link href="/login" className="font-bold text-purple-600">
                  Login dong
                </Link>
              </p>
            </CardFooter>
          </Card>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
};

export default RegisterPage;
