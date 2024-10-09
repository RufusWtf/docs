"use client";

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import QuickSearchDialog from "@/components/navbar/search-dialog";
import Sidebar from "@/components/sidebar/sidebar";

const Navbar = ({ pages }: { pages: DocsContentMetadata[] }): ReactElement => (
    <nav className="fixed left-0 inset-x-0 bg-white/[0.007] backdrop-saturate-100 backdrop-blur-xl border-b z-50">
        <div className="px-3 md:px-7 max-w-screen-2xl mx-auto py-4 flex justify-between items-center transition-all transform-gpu">
            {/* Branding */}
            <Link
                className="flex gap-1 items-end hover:opacity-75 transition-all transform-gpu select-none"
                href="/"
                draggable={false}
            >
                <h1 className="text-lg font-semibold">docs.</h1>
                <Image
                    src="/media/logo.png"
                    alt="Pulse App Logo"
                    width={36}
                    height={36}
                    draggable={false}
                />
            </Link>

            {/* Right */}
            <div className="flex gap-5 sm:gap-7 items-center transition-all transform-gpu">
                {/* Search */}
                <div className="hidden xs:flex">
                    <QuickSearchDialog pages={pages} bindKeybind />
                </div>

                {/* Social */}
                <div className="flex gap-5 items-center">
                    <SocialLink
                        name="GitHub"
                        link="https://github.com/PulseAppCC"
                        icon="/media/github.svg"
                    />
                    <SocialLink
                        name="Discord"
                        link="https://discord.pulseapp.cc"
                        icon="/media/discord.svg"
                    />
                </div>

                {/* Mobile Sidebar */}
                <div className="flex xs:hidden">
                    <Sidebar pages={pages} />
                </div>
            </div>
        </div>
    </nav>
);

const SocialLink = ({
    name,
    link,
    icon,
}: {
    name: string;
    link: string;
    icon: string;
}): ReactElement => (
    <div className="relative w-6 h-6 hover:opacity-75 transition-all transform-gpu select-none">
        <Link href={link} target="_blank" draggable={false}>
            <Image src={icon} alt={`${name} Logo`} fill draggable={false} />
        </Link>
    </div>
);

export default Navbar;
