import { isValidElement, ReactElement, ReactNode } from "react";
import { MDXRemote } from "remote-mdx/rsc";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import {
    Activity,
    CircleAlert,
    Lightbulb,
    MessageSquareWarning,
    OctagonAlert,
    TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { capitalizeWords } from "@/lib/string";

const blockquoteStyles: { [key: string]: any } = {
    NOTE: {
        icon: <CircleAlert className="w-4 h-4" />,
        style: "text-[#1F6FEB] border-[#1F6FEB]",
    },
    TIP: {
        icon: <Lightbulb className="w-4 h-4" />,
        style: "text-[#4A8BD5] border-[#4A8BD5]",
    },
    IMPORTANT: {
        icon: <MessageSquareWarning className="w-4 h-4" />,
        style: "text-[#8957E5] border-[#8957E5]",
    },
    WARNING: {
        icon: <TriangleAlert className="w-4 h-4" />,
        style: "text-[#9E6A03] border-[#9E6A03]",
    },
    CAUTION: {
        icon: <OctagonAlert className="w-4 h-4" />,
        style: "text-[#DA3633] border-[#DA3633]",
    },
};

/**
 * The MDX components to style.
 */
const components = {
    // Headings
    h1: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h1" size={1} className="text-4xl">
            {children}
        </Heading>
    ),
    h2: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h2" size={2} className="text-3xl">
            {children}
        </Heading>
    ),
    h3: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h3" size={3} className="text-2xl">
            {children}
        </Heading>
    ),
    h4: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h4" size={4} className="text-xl">
            {children}
        </Heading>
    ),
    h5: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h5" size={5} className="text-lg">
            {children}
        </Heading>
    ),
    h6: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading as="h6" size={6} className="text-md">
            {children}
        </Heading>
    ),

    // Text
    a: ({
        href,
        children,
    }: {
        href: string;
        children: ReactNode;
    }): ReactElement => (
        <Link
            className="text-primary cursor-pointer hover:opacity-75 transition-all transform-gpu"
            href={href}
            draggable={false}
        >
            {children}
        </Link>
    ),
    p: ({ children }: { children: ReactNode }): ReactElement => (
        <p className="leading-5 select-none">{children}</p>
    ),

    // Media
    img: ({ src, alt }: { src: string; alt: string }): ReactElement => (
        <img
            className="m-2 my-2.5 rounded-2xl ring-1 ring-muted/45 select-none"
            src={src}
            alt={alt}
            draggable={false}
        />
    ),

    // Lists
    ul: ({ children }: { children: ReactNode }): ReactElement => (
        <ul className="px-3 list-disc list-inside select-none">{children}</ul>
    ),

    // Blockquotes
    blockquote: ({ children }: { children: ReactNode }): ReactElement => {
        const match = extractBlockQuoteText(children).match(
            /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\s*(.*)/i
        );
        let style: any;
        if (!match || !(style = blockquoteStyles[match[1]])) {
            return <blockquote>{children}</blockquote>;
        }
        return (
            <blockquote
                className={cn(
                    "my-2 pl-3 py-1.5 flex flex-col gap-2 border-l-[3px] select-none",
                    style.style
                )}
            >
                <h1 className="flex gap-2 items-center">
                    {style.icon}
                    {capitalizeWords(match[1])}
                </h1>
                <p className="text-foreground opacity-85">{match[2]}</p>
            </blockquote>
        );
    },
};

/**
 * The custom render for MDX.
 *
 * @param props the props for the MDX
 * @return the custom mdx
 */
export const CustomMDX = (props: any): ReactElement => (
    <MDXRemote
        {...props}
        components={{
            ...components,
            ...(props.components || {}),
            Link,
            Activity,
        }}
        options={{
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        }}
    />
);

/**
 * A heading component.
 *
 * @param as the type of heading
 * @param className the class name of the heading
 * @param size the size of the heading
 * @param children the children within the heading
 * @return the heading jsx
 */
const Heading = ({
    as: Component,
    className,
    size,
    children,
}: {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className: string;
    size: number;
    children: ReactNode;
}): ReactElement => {
    const id: string | undefined =
        typeof children === "string" ? slugify(children) : undefined;
    return (
        <Component
            id={id}
            className={cn(
                "py-3 font-bold select-none",
                size >= 2 && "pt-7",
                className
            )}
        >
            {children}
        </Component>
    );
};

const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .trim();

const extractBlockQuoteText = (node: ReactNode): string => {
    if (typeof node === "string") {
        return node;
    }
    if (Array.isArray(node)) {
        return node.map(extractBlockQuoteText).join("");
    }
    if (isValidElement(node)) {
        return extractBlockQuoteText(node.props.children);
    }
    return "";
};
