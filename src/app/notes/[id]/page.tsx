"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotePage() {
  const text = `<p>asdaksd</p><p>adbaksdjasd</p><p>asdjasdkja</p><h1>hiiiiii</h1><h2>asdasdsa</h2><h3>asdasdad</h3><div data-youtube-video=""><iframe class="rounded-lg border mx-auto border-muted" width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/mSUKMfmLAt0?si=g-C-rSzuDqjDgT9S" start="0"></iframe></div><p>asdsadasdasd</p>`;
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <main
        className="prose "
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </>
  );
}
