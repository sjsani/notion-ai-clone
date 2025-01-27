"use client"



import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { createNewDocument } from "@/actions/actions"

const NewDocument = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleCreateDocument =  () => {
        startTransition(async () => {
            const{docId} = await createNewDocument()
            router.push(`/doc/${docId}`)

        })

}
  return (
    <Button onClick={handleCreateDocument} disabled={isPending}>{isPending? "Creating..." : "NewDocument"}</Button>
  )
}
export default NewDocument