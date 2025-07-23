import { useFormContext } from "react-hook-form";
import type { EditProfileFormSchema } from "../form/edit-profile";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type EditProfileFormInnerProps = {
  defaultValues: {
    username?: string;
  };
};

const EditProfileFormInner = (props: EditProfileFormInnerProps) => {
  const form = useFormContext<EditProfileFormSchema>();
  return (
    <>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default EditProfileFormInner;
