"use client";

import { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { DateTime } from "luxon";
import SimpleTooltip from "@/components/simple-tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DocsFooter = ({
    pages,
}: {
    pages: DocsContentMetadata[];
}): ReactElement => {
    const path: string = decodeURIComponent(usePathname());

    const current: number = pages.findIndex(
        (page: DocsContentMetadata) =>
            (path === "/" && page.slug === "intro") || path === `/${page.slug}`
    );
    const previous: DocsContentMetadata | undefined =
        current > 0 ? pages[current - 1] : undefined;
    const next: DocsContentMetadata | undefined =
        current < pages.length - 1 ? pages[current + 1] : undefined;

    const [publicationDate, setPublicationDate] = useState<string | null>(
        DateTime.fromISO(pages[current]?.published).toRelative()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setPublicationDate(
                DateTime.fromISO(pages[current]?.published).toRelative()
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [current, pages]);

    return (
        <footer className="xs:mx-5 sm:mx-10 my-2 flex flex-col select-none transition-all transform-gpu">
            {/* Publish Date */}
            <div className="ml-auto pt-4">
                <SimpleTooltip
                    content={DateTime.fromISO(
                        pages[current]?.published
                    ).toLocaleString(DateTime.DATETIME_MED)}
                >
                    <span className="text-sm opacity-75">
                        Published {publicationDate}
                    </span>
                </SimpleTooltip>
            </div>

            {/* Pages */}
            {previous || next ? (
                <Separator className="my-4 bg-separator-gradient" />
            ) : undefined}
            <div className="flex justify-between">
                {/* Previous */}
                {previous && (
                    <Link
                        className="flex gap-2 items-end hover:opacity-75 transition-all transform-gpu group"
                        href={`/${previous.slug}` || "#"}
                        draggable={false}
                    >
                        <ChevronLeft className="pb-1 w-4 h-4 group-hover:-translate-x-0.5 transition-all transform-gpu" />
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
                        <ChevronRight className="pb-1 w-4 h-4 group-hover:translate-x-0.5 transition-all transform-gpu" />
                    </Link>
                )}
            </div>
        </footer>
    );
};
export default DocsFooter;
