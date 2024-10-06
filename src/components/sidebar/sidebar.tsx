import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import { getDocsContent } from "@/lib/mdx";
import SidebarLinks from "@/components/sidebar/sidebar-links";

const Sidebar = (): ReactElement => {
    const pages: DocsContentMetadata[] = getDocsContent();
    return (
        <div className="w-52 py-3 flex flex-col justify-between">
            {/* Links */}
            <div className="flex flex-col">
                <SidebarLinks pages={pages} />
            </div>

            {/* Theme Switcher */}
            <div className="flex flex-col">
                <Separator className="mb-3" />
                <span>Theme Switcher</span>
            </div>
        </div>
    );
};

export default Sidebar;
