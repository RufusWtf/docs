import { ReactElement } from "react";
import { getDocsContent } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalizeWords } from "@/lib/string";

/**
 * The page to render the documentation markdown content.
 *
 * @param params the url params
 */
const DocsPage = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<ReactElement> => {
    const slug: string = (((await params).slug as string[]) || undefined)?.join(
        "/"
    );

    // Get the content to display based on the provided slug
    const content: DocsContentMetadata | undefined = getDocsContent().find(
        (metadata: DocsContentMetadata): boolean =>
            metadata.slug === (slug || "home")
    );
    if (!content) {
        notFound();
    }
    const splitSlug: string[] = content.slug?.split("/") || [];

    return (
        <main className="flex flex-col">
            {/* Breadcrumb */}
            <Breadcrumb className="pt-4 select-none">
                <BreadcrumbList>
                    {splitSlug.map(
                        (part: string, index: number): ReactElement => {
                            const slug: string = splitSlug
                                .slice(1, index + 1)
                                .join("/");
                            return (
                                <div className="flex items-center" key={part}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={slug}
                                            draggable={false}
                                        >
                                            {capitalizeWords(part)}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index < splitSlug.length - 1 && (
                                        <BreadcrumbSeparator className="pl-1.5" />
                                    )}
                                </div>
                            );
                        }
                    )}
                </BreadcrumbList>
            </Breadcrumb>

            {/* Content */}
            <CustomMDX source={content.content} />
        </main>
    );
};
export default DocsPage;
