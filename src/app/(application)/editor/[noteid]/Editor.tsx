"use client";
import TailwindEditor from "@/components/TailwindEditor";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ResizableText from "react-textarea-autosize";
import { NodeSelector } from "@/components/editor/editor-node-selector";
import { TextButtons } from "@/components/editor/editor-text-buttons";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/editor-suggestions";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  JSONContent,
  EditorCommandList,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import hljs from "highlight.js";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "@/lib/image-upload";
import { defaultExtensions } from "@/components/editor/editor-extension";
import { Separator } from "@/components/ui/separator";
import { LinkSelector } from "@/components/editor/editor-link-selector";
import { ColorSelector } from "@/components/editor/editor-color-selector";
const extensions = [...defaultExtensions, slashCommand];
const highlightCodeblocks = (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll("pre code").forEach((el) => {
    // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
    hljs.highlightElement(el as HTMLElement);
  });
  return new XMLSerializer().serializeToString(doc);
};
export const Editor = ({
  note,
}: {
  note: { title: string; content: string | null };
}) => {
  const router = useRouter();
  const [content, setContent] = useState<JSONContent | undefined>(
    note.content ? JSON.parse(note.content) : undefined
  );
  const [charsCount, setCharsCount] = useState();
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setCharsCount(editor.storage?.characterCount?.words());
      const json = editor.getJSON();
      setContent(json);
      console.log(editor.getHTML());
      // setSaveStatus("Saved");
      // window.localStorage.setItem(
      //   "html-content",
      //   highlightCodeblocks(editor.getHTML())
      // );
      // window.localStorage.setItem("novel-content", JSON.stringify(json));
      // window.localStorage.setItem(
      //   "markdown",
      //   editor.storage?.markdown?.getMarkdown()
      // );
    },
    500
  );
  return (
    <main className="px-10 py-8  space-y-12 container min-h-dvh">
      <div className=" sticky z-50 isolate top-8 flex w-full items-center justify-between ">
        <Button
          onClick={() => router.back()}
          className="pl-0 -ml-2 bg-background "
          variant={"ghost"}
        >
          <ChevronLeft />
          Back
        </Button>
        <Button>Save</Button>
      </div>
      <div className=" mx-auto max-w-4xl">
        <ResizableText
          placeholder={note.title}
          className=" w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <div className="relative w-full ">
          <div className="flex absolute right-0 -top-24 z-10 mb-5 gap-2">
            <div className="hidden rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
              {/* {saveStatus} */}
            </div>
            <div
              className={
                charsCount
                  ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
                  : "hidden"
              }
            >
              {charsCount} Words
            </div>
          </div>
          <EditorRoot>
            <EditorContent
              initialContent={content}
              extensions={extensions}
              className="relative  w-full min-h-[40vh]  bg-background   "
              editorProps={{
                handleDOMEvents: {
                  keydown: (_view, event) => handleCommandNavigation(event),
                },
                handlePaste: (view, event) =>
                  handleImagePaste(view, event, uploadFn),
                handleDrop: (view, event, _slice, moved) =>
                  handleImageDrop(view, event, moved, uploadFn),
                attributes: {
                  class:
                    "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
                },
              }}
              onUpdate={({ editor }) => {
                debouncedUpdates(editor);
                // setSaveStatus("Unsaved");
              }}
              slotAfter={<ImageResizer />}
            >
              <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                <EditorCommandEmpty className="px-2 text-muted-foreground">
                  No results
                </EditorCommandEmpty>
                <EditorCommandList>
                  {suggestionItems.map((item) => (
                    <EditorCommandItem
                      value={item.title}
                      onCommand={(val) => item.command && item.command(val)}
                      className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                      key={item.title}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </EditorCommandItem>
                  ))}
                </EditorCommandList>
              </EditorCommand>

              <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl">
                <Separator orientation="vertical" />
                <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                <Separator orientation="vertical" />

                <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                <Separator orientation="vertical" />
                <TextButtons />
                <Separator orientation="vertical" />
                <ColorSelector open={openColor} onOpenChange={setOpenColor} />
              </EditorBubble>
            </EditorContent>
          </EditorRoot>
        </div>
      </div>
    </main>
  );
};
