import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthRoute } from "~/components/layouts/AuthRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import EditProfileFormInner from "../components/EditProfileFormInner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
// import type { EditProfileFormSchema } from "../form/edit-profile";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileFormSchema,
  type EditProfileFormSchema,
} from "../form/edit-profile";
import { Form } from "~/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { icons } from "lucide-react";
import SideNav from "~/components/layouts/SideNav";

const ProfilePage = () => {
  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | undefined | null>(
    null,
  );

  const apiUtils = api.useUtils();

  const { data: getProfileData } = api.profile.getProfile.useQuery();

  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: async ({ username }) => {
      form.reset({ username });
      toast.success("Berhasil update profile");
    },
    onError: (err) => {
      if (err instanceof TRPCClientError) {
        if (err.message === "USERNAME_USED") {
          form.setError("username", {
            message: "Username sudah digunakan",
          });
        }
      }

      toast.error("Gagal update profile");
    },
  });

  const updateProfilePicture = api.profile.updateProfilePicture.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil ganti foto profil");
      setSelectedImage(null);
      await apiUtils.profile.getProfile.invalidate();
    },
    onError: async () => {
      // TODO: Handle image upload errors
      toast.error("Gagal ganti foto profil");
    },
  });

  const handleUpdateProfileSubmit = (values: EditProfileFormSchema) => {
    const payload: {
      username?: string;
    } = {};

    if (values.username !== getProfileData?.username) {
      payload.username = values.username;
    }

    updateProfile.mutate({
      ...payload,
    });
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const selectedProfilePicturePreview = useMemo(() => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
  }, [selectedImage]);

  const handleOpenFileExplorer = () => {
    inputFileRef.current?.click();
  };

  const handleRemoveSelectedImage = () => {
    return;
  };

  const handleUpdateProfilePicture = () => {
    return;
  };

  const onPickProfilePicture = () => {
    return;
  };

  return (
    <AuthRoute>
      <SideNav>

      {/* <PageContainer> */}
        <SectionContainer
          padded
          minFullscreen
          className="items-center gap-y-6 py-8"
        >
          <h1 className="w-full text-xl font-semibold lg:max-w-1/2 lg:text-3xl">
            Profile Settings
          </h1>

          <Card className="w-full bg-gradient-to-t from-zinc-800/5 to-violet-600/20 lg:max-w-1/2">
            <CardContent className="flex gap-8">
              <div className="flex flex-col gap-2">
                <Avatar className="size-24">
                  <AvatarFallback>VF</AvatarFallback>
                  <AvatarImage
                    src={
                      selectedProfilePicturePreview ??
                      getProfileData?.profilePictureUrl ??
                      ""
                    }
                  />
                </Avatar>

                <Button
                  variant="default"
                  onClick={handleOpenFileExplorer}
                  size="sm"
                >
                  Ganti Foto
                </Button>
                {!!selectedImage && (
                  <>
                    <Button
                      onClick={handleRemoveSelectedImage}
                      variant="default"
                      size="sm"
                    >
                      Hapus
                    </Button>
                    <Button onClick={handleUpdateProfilePicture} size="sm">
                      Simpan
                    </Button>
                  </>
                )}
                <input
                  accept="image/*"
                  onChange={onPickProfilePicture}
                  className="hidden"
                  type="file"
                  ref={inputFileRef}
                />
              </div>

              <div className="min-h-[8rem] border border-slate-300 opacity-10"></div>

              <div className=" w-full grid flex-1 gap-y-4">
                {/* TODO: Skeleton when loading data */}

                <div className="flex flex-col gap-4">
                  {getProfileData && (
                    <div className="flex h-fit w-fit items-center gap-4">
                      <h1 className="text-lg lg:text-2xl">
                        {getProfileData?.username}
                      </h1>
                      <Dialog>
                        <Form {...form}>
                          <DialogTrigger asChild>
                            <FaRegEdit size={20} cursor={"pointer"} />
                            {/* <Button></Button> */}
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Profile</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <EditProfileFormInner
                                  defaultValues={{
                                    username: getProfileData?.username,
                                  }}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="default">Cancel</Button>
                              </DialogClose>
                              <Button
                                disabled={!form.formState.isDirty}
                                onClick={form.handleSubmit(
                                  handleUpdateProfileSubmit,
                                )}
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Form>
                      </Dialog>
                    </div>
                  )}
                  <hr className="w-full bg-amber-50" />

                  <p className="text-muted-foreground text-sm">
                    {getProfileData?.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex w-full justify-end gap-4 lg:max-w-1/2">
            <Button
              disabled={!form.formState.isDirty}
              onClick={form.handleSubmit(handleUpdateProfileSubmit)}
            >
              Simpan
            </Button>
          </div>
        </SectionContainer>
      {/* </PageContainer> */}
      </SideNav>
    </AuthRoute>
  );
};

export default ProfilePage;
