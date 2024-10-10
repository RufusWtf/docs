import type { Metadata } from "next";
import "./styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getDocsContent } from "@/lib/mdx";

/**
 * The metadata for this app.
 */
// export const metadata: Metadata = config.metadata;
export const metadata: Metadata = { title: "test", description: "testing" };
// export const viewport: Viewport = config.viewport;

export const dynamic = "force-dynamic";

/**
 * The primary layout for this app.
 */
const RootLayout = async ({
    children,
}: Readonly<{
    children: ReactNode;
}>): Promise<ReactElement> => {
    const pages: DocsContentMetadata[] = await getDocsContent();
    return (
        <html lang="en">
            <body
                className="scroll-smooth antialiased"
                style={{
                    background: "var(--background-gradient)",
                }}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <TooltipProvider delayDuration={100}>
                        <div className="px-3 md:px-7 max-w-screen-2xl min-h-screen mx-auto flex flex-col transition-all">
                            <Navbar pages={pages} />
                            <div className="pt-[4.5rem] w-full h-full flex flex-grow gap-5 sm:gap-8 transition-all transform-gpu">
                                <div className="relative hidden xs:flex">
                                    <Sidebar pages={pages} />
                                </div>
                                {children}
                            </div>
                        </div>
                        <Footer />
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};
export default RootLayout;
