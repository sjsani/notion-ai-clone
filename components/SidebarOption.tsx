
"use client"
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {

    const [data, loading, error]= useDocumentData(doc(db,"documents", id))
    const pathName = usePathname()
    const isAcive = href.includes(pathName) && pathName !== "/"

    if(!data) return null;

    return (
        <Link href={href} className={`relative border p-2 rounded-md ${isAcive ? "bg-gray-300 font bold border-black" : "border-gray-400"}`}>
        <p>{data?.title}</p>
        </Link>
  );
}

export default SidebarOption