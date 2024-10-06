"use client";

import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";

const DocsFooter = ({
    pages,
}: {
    pages: DocsContentMetadata[];
}): ReactElement => {
    const path: string = usePathname();

    const current: number = pages.findIndex(
        (page: DocsContentMetadata) => `/${page.slug}` === path
    );
    const previous: DocsContentMetadata | undefined =
        current > 0 ? pages[current - 1] : undefined;
    const next: DocsContentMetadata | undefined =
        current < pages.length - 1 ? pages[current + 1] : undefined;

    return (
        <footer className="mx-14 my-5 flex flex-col">
            <Separator className="mb-4" />
            <div className="flex justify-between">
                {previous && (
                    <Link
                        className="flex gap-2 items-center hover:opacity-75 transition-all transform-gpu group"
                        href={`/${previous.slug}` || "#"}
                    >
                        <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-all transform-gpu" />
                        {previous.title}
                    </Link>
                )}
                {next && (
                    <Link
                        className="ml-auto flex gap-2 items-center hover:opacity-75 transition-all transform-gpu group"
                        href={`/${next.slug}` || "#"}
                    >
                        {next.title}
                        <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-all transform-gpu" />
                    </Link>
                )}
            </div>
        </footer>
    );
};
export default DocsFooter;
