import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Navbar = (): ReactElement => (
    <nav
        className={cn(
            "py-4 flex justify-between items-center",
            "after:absolute after:inset-x-0 after:top-[4.2rem] after:h-0.5 after:bg-muted/55"
        )}
    >
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
            />
        </Link>

        {/* Right */}
        <div className="flex gap-7 items-center">
            {/* Search */}
            <Input
                className="hidden xs:flex rounded-lg"
                placeholder="Search the docs..."
                disabled
            />

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
