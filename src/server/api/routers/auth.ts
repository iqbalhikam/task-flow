import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { passwordSchema } from "~/schemas/auth";
import { supabaseAdminClient } from "~/lib/supabase/server";
import { generateFromEmail } from "unique-username-generator";

export const authRouter = createTRPCRouter({
  // ambil input dari user
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email().toLowerCase(),
        password: passwordSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // koneksui ke db supabase menggunakan prisma
      const { db } = ctx;

      // ambil input dari user
      const { email, password } = input;

      // buat transaksi untuk register
      await db.$transaction(async (tx) => {
        let userId = "";
        try {
          // buat user di scema auth supabase
          const { data, error } =
            await supabaseAdminClient.auth.admin.createUser({
              email,
              password,
            });

          if (data.user) {
            userId = data.user.id;
          }
          // jika ada error maka throw error
          if (error) throw error;

          // generate unique username dari email
          const generatedUserName = generateFromEmail(email);

          // lalu duplikat data user dari hasil register auth scema supabase ke public scema profile
          await tx.profile.create({
            data: {
              email,
              userId: data.user.id,
              username: generatedUserName,
            },
          });
        } catch (error) {
          console.log("error ini terjadi karena",error);
          await supabaseAdminClient.auth.admin.deleteUser(userId);
        }
      });
    }),
});
