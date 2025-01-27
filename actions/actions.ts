'use server'

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server"
import { create } from "domain";

export async function createNewDocument() {
    auth.protect();
    const {sessionClaims} = await auth()
    const docCollectionRef = adminDb.collection('documents')
    const docRef = await docCollectionRef.add({
        title:"New Document"
    })

    await adminDb.collection('users').doc(sessionClaims?.email!) .collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    })
    return {docId: docRef.id}
}