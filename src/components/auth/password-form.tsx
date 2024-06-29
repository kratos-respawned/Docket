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
import { newPassword } from "@/lib/auth/actions/new-password";
import { cn } from "@/lib/utils";
import { ResetPasswordSchema } from "@/validators/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  token: string;
}

export function ResetPasswordForm({
  token,
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const Reset = async (formdata: ResetPasswordSchema) => {
    const { password } = formdata;
    startTransition(async () => {
      const { error, success } = await newPassword({ password }, token);
      if (error) {
        toast("Error resetting password", {
          description: error,
        });
        return;
      }
      toast("Success", {
        description: success,
      });
      // router.push("/auth/login");
    });
  };
  return (
    <div className={cn("grid gap-10", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Reset)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="v3ryS3cr3tP@ssw0rd"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="v3ryS3cr3tP@ssw0rd"
                      type="password"
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
