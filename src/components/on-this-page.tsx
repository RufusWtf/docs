"use client";

import { ReactElement, useEffect, useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Header = {
    id: string;
    text: string;
    level: number;
};

const OnThisPage = ({ page }: { page: DocsContentMetadata }): ReactElement => {
    const [headers, setHeaders] = useState<Header[]>([]);

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

    return (
        <div className="flex flex-col gap-2 text-sm">
            {/* Title */}
            <div className="flex gap-2.5 items-center select-none">
                <Bars3CenterLeftIcon className="w-5 h-5" />
                <h1>On This Page</h1>
            </div>

            {/* Headers */}
            <ul>
                {headers.map((header: Header) => (
                    <li
                        key={header.id}
                        className="opacity-65 hover:opacity-80 transition-all transform-gpu"
                        style={{ marginLeft: `${(header.level - 1) * 16}px` }}
                    >
                        <Link href={`#${header.id}`}>{header.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default OnThisPage;
