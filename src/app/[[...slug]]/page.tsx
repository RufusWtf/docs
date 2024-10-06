import { ReactElement } from "react";
import { getDocsContent } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";

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

    return (
        <main>
            <CustomMDX source={content.content} />
        </main>
    );
};
export default DocsPage;
