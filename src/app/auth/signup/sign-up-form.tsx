"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Github, KeyRound, Loader } from "lucide-react";
import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/validators/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const supabase = createClient();
  const githubSignIn = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      // provider: "google",
      provider: "github",
      options: {
        // redirectTo: "/",
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
      },
    });
    setIsLoading(false);
    if (error) {
      console.error("Error signing in with Google", error);
    }
    console.log(data);
  };
  async function signUp(formdata: signUpSchema) {
    setIsLoading(false);
    const { email, password } = formdata;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: formdata.name },
      },
    });
    setIsLoading(false);
    if (error) {
      console.error("Error signing up with email and password", error);
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signUp)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rick Astley" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="rick@morty.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button onClick={githubSignIn} variant="outline" disabled={isLoading}>
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
