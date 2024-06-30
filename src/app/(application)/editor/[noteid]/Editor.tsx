"use client";
import { NodeSelector } from "@/components/editor/editor-node-selector";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/editor-suggestions";
import { TextButtons } from "@/components/editor/editor-text-buttons";
import { Button } from "@/components/ui/button";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  JSONContent,
  type EditorInstance,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useState, useTransition } from "react";
import ResizableText from "react-textarea-autosize";
import { useDebouncedCallback } from "use-debounce";

import { ColorSelector } from "@/components/editor/editor-color-selector";
import { defaultExtensions } from "@/components/editor/editor-extension";
import { LinkSelector } from "@/components/editor/editor-link-selector";
import { Separator } from "@/components/ui/separator";
import { uploadFn } from "@/lib/image-upload";

import { NoteSchema } from "@/validators/note-schema";
import { $Enums, Prisma } from "@prisma/client";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { toast } from "sonner";
import { saveNoteAction } from "../../noteActions";
const hljs = require("highlight.js");
const extensions = [...defaultExtensions, slashCommand];
const highlightCodeblocks = (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll("pre code").forEach((el) => {
    // @ts-ignore
    // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
    hljs.highlightElement(el);
  });
  return new XMLSerializer().serializeToString(doc);
};

export const Editor = ({
  note,
}: {
  note: {
    id: string;
    notebookId: string;
    title: string;
    content: Prisma.JsonValue;
    visibility: $Enums.visibility;
  };
}) => {
  const router = useRouter();
  const [content, setContent] = useState<JSONContent | undefined>(
    note.content as JSONContent
  );
  const [Html, setHtml] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [charsCount, setCharsCount] = useState();
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved" | "Saving">(
    "Unsaved"
  );
  const [loading, startTransition] = useTransition();
  const saveNote = async () => {
    startTransition(async () => {
      setSaveStatus("Saving");
      const newNote: NoteSchema = {
        id: note.id,
        title,
        content: content,
        Html,
        placeholder,
        visibility: note.visibility,
        notebookId: note.notebookId,
      };
      const { success, error } = await saveNoteAction(JSON.stringify(newNote));
      if (success) {
        setSaveStatus("Saved");
      } else {
        setSaveStatus("Unsaved");
        toast("Error", {
          description: error,
        });
      }
    });
  };
  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      setCharsCount(editor.storage?.characterCount?.words());
      const json = editor.getJSON();
      setContent(json);
      setHtml(highlightCodeblocks(editor.getHTML()));
      setPlaceholder(editor.getText().slice(0, 100));
      setSaveStatus("Unsaved");
    },
    500
  );
  return (
    <main className="px-5 sm:px-9 md:px-10 py-8  space-y-12 container min-h-dvh">
      <div className=" sticky z-50 isolate top-8 flex w-full items-center justify-between ">
        <Button
          disabled={loading}
          onClick={() => router.back()}
          className="pl-0 -ml-2 bg-background "
          variant={"ghost"}
        >
          <ChevronLeft />
          Back
        </Button>
        <form action={saveNote}>
          <Button disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </form>
      </div>
      <div className=" mx-auto max-w-4xl space-y-5">
        <ResizableText
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={note.title}
          className=" w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <div className="relative w-full ">
          <div className="flex absolute right-0 -top-24 z-10 mb-5 gap-2">
            <div className=" rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
              {saveStatus}
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
            // editable={false}
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
