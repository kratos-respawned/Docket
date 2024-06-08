"use client";
import { createClient } from "@/lib/supabase/client";
import Script from "next/script";

export const GoogleOneTap = () => {
  //   async function handleSignInWithGoogle(response: any) {
  //     console.log(response);
  //     const supabase = createClient();
  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: "google",
  //       token: response.credential,
  //     });
  //   }
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="crap_keys"
        data-context="use"
        data-ux_mode="popup"
        data-callback="googleauth"
        data-auto_select="true"
        data-itp_support="true"
      />

<div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
      {/* <div
        id="g_id_onload"
        data-client_id="crapkeys.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        //   data-callback="handleSignInWithGoogle()"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      /> */}
    </>
  );
};
