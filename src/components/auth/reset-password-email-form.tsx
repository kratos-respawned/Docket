"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { reset } from "@/lib/auth/actions/reset";
import { cn } from "@/lib/utils";
import { ResetSchema } from "@/validators/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordMailForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const Reset = async (formdata: ResetSchema) => {
    startTransition(async () => {
      const { error, success } = await reset({ email: formdata.email });
      if (error) {
        toast("Error resetting password", {
          description: error,
        });
        return;
      }
      toast("Success", {
        description: success,
      });
    });
  };
  return (
    <div className={cn("grid gap-10", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Reset)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="rick@morty.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="mt-3">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
