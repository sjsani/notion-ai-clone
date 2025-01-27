"use client"

import { useSelf } from "@liveblocks/react/suspense";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import stringToColor from "@/lib/stringToColor";
import * as Y from "yjs";

type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info)
    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email)
            },
        },
    });

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                editor={editor}
                theme={darkMode ? "dark" : "light"}
            />
        </div>
    )
}

export default BlockNote;