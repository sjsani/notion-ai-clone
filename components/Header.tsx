'use client'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Directory from "./Directory"
const Header = () => {
    const { user } = useUser()
    return (
        <div className="flex justify-between items-center p-5">
            {user && (
                <h1>{user?.firstName}{`'s`} Space</h1>
            )}
        <Directory />
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
        
        </div>
    )
}
export default Header