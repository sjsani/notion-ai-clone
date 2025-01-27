"use client"

import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react"
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor";

const BlockNote = dynamic(() => import("./BlockNote"), { ssr: false });

type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
};

const Editor = () => {
    const room = useRoom()
    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc)
        setDoc(yDoc)
        setProvider(yProvider)

        return () => {
            yDoc.destroy();
            yProvider.destroy();
        }
    }, [room])

    if (!doc || !provider) return null

    const style = darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    )
}

export default Editor