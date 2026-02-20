"use client"

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";

export function UserNav() {
    return (
        <div className="flex items-center gap-4">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="default" size="sm">Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-8 w-8"
                        }
                    }}
                />
            </SignedIn>
        </div>
    )
}
