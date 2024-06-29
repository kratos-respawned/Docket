"use client";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function SignInModal() {
  const [page, setPage] = useState<"login" | "signup">("login");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Login</Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          " max-w-none  lg:max-w-[1020px]  p-0 overflow-hidden flex  lg:grid border-0 grid-cols-2 gap-0 items-center h-full lg:max-h-[650px] w-full rounded-2xl",
          // " transition-all",
          page === "signup" && "lg:max-h-[650px]"
        )}
      >
        <div className="relative  items-center h-full hidden lg:flex ">
          {/* <Image
            alt="mountain trekking image modal"
            // src="https://illustrations.popsy.co/red/couple-hugging.svg"
            src={"/home/test2.jpg"}
            className="object-cover object-center"
            fill
          /> */}
        </div>
        <div className="p-6 space-y-4 flex-1 max-w-xl  lg:max-w-none mx-auto lg:mx-0 ">
          {page === "login" ? (
            <>
              <div>
                <h3 className="font-bold text-2xl">Sign in</h3>
                <p>Sign in to get started.</p>
              </div>
              <SignInForm />
              <div className="flex justify-center">
                <p className="text-sm ">
                  New User ?{" "}
                  <Button
                    onClick={() => setPage("signup")}
                    className="hover:underline px-0"
                    variant={"link"}
                  >
                    Create an Account
                  </Button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-2xl">Sign Up</h3>
                <p>Create an account to get started.</p>
              </div>
              <SignUpForm />
              <div className="flex justify-center">
                <p className="text-sm ">
                  ALready have an account ?{" "}
                  <Button
                    onClick={() => setPage("login")}
                    className="hover:underline px-0"
                    variant={"link"}
                  >
                    Login
                  </Button>
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
