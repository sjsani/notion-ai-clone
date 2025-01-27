"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Fragment, useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

const Directory = () => {
    const path = usePathname();
    const segments = path.split("/");
  return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {segments.map((segment, index) => {
                        if (!segment) {
                            return null;
                        }
                        
                        const href = `/${segments.slice(0, index + 1).join("/")}`;
                        const isLast = index === segments.length - 1;
                        const [title, setTitle] = useState(segment);

                        useEffect(() => {
                            if (isLast) {
                                const fetchTitle = async () => {
                                    const docRef = doc(db, "documents", segment);
                                    const docSnap = await getDoc(docRef);
                                    if (docSnap.exists()) {
                                        setTitle(docSnap.data().title);
                                    }
                                };
                                fetchTitle();
                            }
                        }, [segment, isLast]);

                        return (
                            <Fragment key={segment}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                {isLast ? (<BreadcrumbPage>{title}</BreadcrumbPage>) 
                                : (<BreadcrumbLink href={href}>{segment}</BreadcrumbLink>)}
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}
                    
                </BreadcrumbList>
            </Breadcrumb>

  )
}
export default Directory