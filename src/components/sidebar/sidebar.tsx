import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import { getDocsContent } from "@/lib/mdx";
import SidebarLinks from "@/components/sidebar/sidebar-links";
import ThemeSwitcher from "@/components/theme-switcher";

const Sidebar = (): ReactElement => {
    const pages: DocsContentMetadata[] = getDocsContent();
    return (
        <div className="min-w-32 w-44 py-3 flex flex-col justify-between">
            {/* Links */}
            <div className="flex flex-col">
                <SidebarLinks pages={pages} />
            </div>

            {/* Theme Switcher */}
            <div className="flex flex-col">
                <Separator className="mb-3" />
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Sidebar;
