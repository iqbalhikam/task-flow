import z from "zod";

export const editProfileFormSchema = z.object({
    username: z
    .string()
    .min(3, {message : "Username minimal 3 karakter"})
    .max(15, {message : "Username maksimal 15 karakter"}),
})

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>