"use client"

import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react"
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor";

type EditorProps = {
    doc:Y.Doc;
    provider: any;
    darkMode:boolean;
};
function BlockNote({doc, provider, darkMode}:EditorProps){ 
    const userInfo = useSelf((me)=> me.info)
    const editor:BlockNoteEditor = useCreateBlockNote({
        collaboration:{
            provider,

            fragment: doc.getXmlFragment("document-store"),

            user: {
                name:userInfo?.name,
                color:stringToColor(userInfo?.email)
            },
        },
    });
  return (
    <div className="relative max-w-6xl mx-auto">
        <BlockNoteView 
            editor = {editor}
            theme = {darkMode ? "dark" : "light"}
        />
    </div>
  )
}

const Editor = () => {
    const room = useRoom()
    const [ doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {

        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc)
        setDoc(yDoc)
        setProvider(yProvider)

        return () =>{
            yDoc.destroy();
            yProvider.destroy();
        }
    }, [room])
    if(!doc || !provider) return null

    const style = darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">





                <Button className={style} onClick={()=> setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
                
            </div>

            <BlockNote doc={doc} provider={provider} darkMode = {darkMode}/>
        </div>
    )
}
export default Editor