import { useForm } from "react-hook-form";
import { GuestRoute } from "~/components/layouts/GuestRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { registerFormSchema, type RegisterFormSchema } from "../form/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { RegisterFormInner } from "~/features/auth/components/RegisterFormInner";
import { Button } from "~/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { api } from "~/utils/api";

const RegisterPage = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  const { mutate: registerUser, isPending: registerUserIsPending } =
    api.auth.register.useMutation({
      onSuccess: async () => {
        toast.success("Register berhasil");
        form.setValue("email", "");
        form.setValue("password", "");
        await router.push("/");
      },
      onError: (error) => {
        console.log("TRPC ERROR: ", error);

        toast.error("Sebuah kesalahan terjadi, coba lagi beberapa saat.");
      },
    });

  const heandleRregisterSubmit = async (values: RegisterFormSchema) => {
    registerUser(values);
  };

  const handleGoogleRegister = async () => {
    toast.info("Fitur register dengan google belum tersedia🙏");
  };
  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
          padded
          className="flex min-h-[calc(100vh-144px)] flex-col content-center justify-center"
        >
          <Card className="bg-background w-full max-w-sm self-center">
            <CardHeader>
              <CardTitle className="text-foreground text-3xl">
                Daftar Sekarang!!
              </CardTitle>
              <CardDescription>
                Dan manajemen tugas anda dengan mudah dan nyaman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <RegisterFormInner
                  isLoading={registerUserIsPending}
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

              <Button
                onClick={handleGoogleRegister}
                variant="default"
                className="w-full"
                size="lg"
              >
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
