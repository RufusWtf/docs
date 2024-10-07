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
        <footer className="xs:mx-5 sm:mx-10 my-2 flex flex-col select-none transition-all transform-gpu">
            <Separator className="mb-4" />
            <div className="flex justify-between">
                {/* Previous */}
                {previous && (
                    <Link
                        className="flex gap-2 items-end hover:opacity-75 transition-all transform-gpu group"
                        href={`/${previous.slug}` || "#"}
                        draggable={false}
                    >
                        <ChevronLeftIcon className="pb-1 w-4 h-4 group-hover:-translate-x-0.5 transition-all transform-gpu" />
                        <div className="flex flex-col">
                            <h1 className="text-sm opacity-75">Previous</h1>
                            <p>{previous.title}</p>
                        </div>
                    </Link>
                )}

                {/* Next */}
                {next && (
                    <Link
                        className="ml-auto flex gap-2 items-end hover:opacity-75 transition-all transform-gpu group"
                        href={`/${next.slug}` || "#"}
                        draggable={false}
                    >
                        <div className="flex flex-col">
                            <h1 className="text-sm opacity-75">Next</h1>
                            <p>{next.title}</p>
                        </div>
                        <ChevronRightIcon className="pb-1 w-4 h-4 group-hover:translate-x-0.5 transition-all transform-gpu" />
                    </Link>
                )}
            </div>
        </footer>
    );
};
export default DocsFooter;
