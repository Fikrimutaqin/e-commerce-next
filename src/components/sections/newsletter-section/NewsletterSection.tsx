"use client";

import { useState } from "react";
// Component
import EmailInput from "@/components/common/inputs/EmailInput"
import BasicButton from "@/components/common/buttons/BasicButton";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");

    // Handle subscribe email
    const handleSubscribeEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Open mail client default
        window.location.href = `mailto:[EMAIL_ADDRESS]?subject=Newsletter Subscription&body=Please subscribe me: ${email}`;
        setEmail(""); // Reset input after subscribe
    }

    return (
        <section className="w-full flex flex-col justify-center items-center bg-light-gray h-[284px] py-16 gap-y-3.5">
            <h2 className="text-primary text-2xl font-semibold">
                Stay Updated
            </h2>
            <p className="text-wrap text-secondary text-sm font-light text-center w-auto px-10 lg:px-0">
                Subscribe to receive notifications about new inventory and special offers
            </p>
            <form onSubmit={handleSubscribeEmail} className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-x-3 mt-2">
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                <BasicButton type="submit" disabled={!email} onClick={() => { }}>Subscribe</BasicButton>
            </form>
        </section>
    )
}