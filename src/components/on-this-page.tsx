"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import {
    ArrowLongRightIcon,
    Bars3CenterLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { truncateText } from "@/lib/string";
import { motion, useInView } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type Header = {
    id: string;
    text: string;
    level: number;
};

const OnThisPage = ({ page }: { page: DocsContentMetadata }): ReactElement => {
    const [headers, setHeaders] = useState<Header[]>([]);
    const [activeHeader, setActiveHeader] = useState<string | undefined>(
        undefined
    );
    const observerRef = useRef<IntersectionObserver | undefined>(undefined);

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);

    useEffect(() => {
        // Regular expression to match markdown headers
        const headerRegex: RegExp = /^(#{1,6})\s+(.*)$/gm;
        const extractedHeaders: Header[] = [];

        let match;
        while ((match = headerRegex.exec(page.content)) !== null) {
            const level: number = match[1].length; // The number of # symbols determines the header level
            const text: string = match[2].trim();
            const id: string = text
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

            extractedHeaders.push({ id, text, level });
        }

        setHeaders(extractedHeaders);
    }, [page.content]);

    useEffect(() => {
        // Cleanup existing observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry: IntersectionObserverEntry) => {
                    if (entry.isIntersecting) {
                        setActiveHeader(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
        );
        observerRef.current = observer;

        // Observe all header elements
        headers.forEach((header: Header) => {
            const element: HTMLElement | null = document.getElementById(
                header.id
            );
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headers]);

    return (
        <motion.div
            ref={ref}
            className="w-44 flex flex-col gap-2 text-sm select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* Title */}
            <div className="flex gap-2.5 items-center">
                <Bars3CenterLeftIcon className="w-5 h-5" />
                <h1>On This Page</h1>
            </div>

            {/* Headers */}
            <ul className="relative">
                {headers.map((header: Header) => (
                    <li
                        key={header.id}
                        className={cn(
                            "hover:opacity-80 transition-all transform-gpu relative",
                            activeHeader === header.id
                                ? "font-semibold text-primary"
                                : "opacity-65"
                        )}
                        style={{ paddingLeft: `${(header.level - 1) * 16}px` }}
                    >
                        {/* Indentation */}
                        {header.level > 1 && (
                            <div
                                className="absolute left-0 top-0 bottom-0 border-l border-muted"
                                style={{
                                    left: `${(header.level - 2) * 16 + 4}px`,
                                }}
                            />
                        )}

                        {/* Header */}
                        <Link
                            href={`#${header.id}`}
                            draggable={false}
                            className="block py-1"
                        >
                            {truncateText(header.text, 26)}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <div>
                <Separator className="mt-1 mb-3.5" />
                <Footer page={page} />
            </div>
        </motion.div>
    );
};

const Footer = ({ page }: { page: DocsContentMetadata }): ReactElement => (
    <footer className="flex flex-col text-xs opacity-75">
        {/* Edit on Git */}
        <Link
            className="flex gap-1.5 items-center hover:opacity-75 transition-all transform-gpu group"
            href={`https://git.rainnny.club/PulseApp/docs/src/branch/master/docs/${page.slug}.md`}
            target="_blank"
            draggable={false}
        >
            <Image
                src="/media/github.svg"
                alt="GitHub Logo"
                width={13}
                height={13}
            />
            <span>Edit this page on GitHub</span>
            <ArrowLongRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-all transform-gpu" />
        </Link>
    </footer>
);

export default OnThisPage;
