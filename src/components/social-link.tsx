import { ReactElement } from "react";
import SimpleTooltip from "@/components/simple-tooltip";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type SocialLinkProps = {
    className?: string | undefined;
    name: string;
    tooltip: string;
    logo: string | ReactElement;
    href: string;
};

const SocialLink = ({
    className,
    name,
    tooltip,
    logo,
    href,
}: SocialLinkProps) => (
    <SimpleTooltip content={tooltip}>
        <Link
            className={cn(
                "w-6 h-6 hover:opacity-75 transition-all transform-gpu select-none",
                className
            )}
            href={href}
            target="_blank"
            draggable={false}
        >
            {typeof logo === "string" ? (
                <Image
                    src={`/media/${logo}`}
                    alt={`${name}'s Logo`}
                    fill
                    draggable={false}
                />
            ) : (
                logo
            )}
        </Link>
    </SimpleTooltip>
);
export default SocialLink;
