"use client";
import { NodeSelector } from "@/components/editor-node-selector";
import { TextButtons } from "@/components/editor-text-buttons";
import { suggestionItems } from "@/utils/editor/createSuggestions";
import {
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
  JSONContent,
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { useState } from "react";
import { defaultExtensions } from "./editor-extension";

const TailwindEditor = () => {
  const [content, setContent] = useState<JSONContent | undefined>();
  console.log(content);
  //   const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
  //     const json = editor.getJSON();
  //     setContent(json);
  //     setSaveStatus("Saved");
  //   }, 500);
  return (
    <EditorRoot>
      <EditorContent
        extensions={defaultExtensions}
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          {suggestionItems.map((item) => (
            <EditorCommandItem
              value={item.title}
              onCommand={(val) => item.command && item.command(val)}
              className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
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
        </EditorCommand>
        <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl">
          {/* <NodeSelector open={openNode} onOpenChange={setOpenNode} /> */}
          {/* <LinkSelector open={openLink} onOpenChange={setOpenLink} /> */}
          <TextButtons />
          {/* <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
};
export default TailwindEditor;
