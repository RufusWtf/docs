import { ReactElement } from "react";
import { Separator } from "@/components/ui/separator";
import { getDocsContent } from "@/lib/mdx";
import SidebarLinks from "@/components/sidebar/sidebar-links";
import ThemeSwitcher from "@/components/theme-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import QuickSearchDialog from "@/components/navbar/search-dialog";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

const Sidebar = (): ReactElement => (
    <>
        {/* Mobile */}
        <div className="xs:hidden">
            <Sheet>
                <SheetTrigger className="flex items-center">
                    <Bars3BottomRightIcon className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent className="h-full px-11 pt-10" side="top">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop */}
        <div className="hidden xs:flex sticky top-[4.3rem] max-h-[calc(100vh-3.5rem)] overflow-y-auto min-w-32 w-40 sm:w-52 py-5 flex-col justify-between transition-all transform-gpu">
            <SidebarContent />
        </div>
    </>
);

const SidebarContent = (): ReactElement => {
    const pages: DocsContentMetadata[] = getDocsContent();
    return (
        <div className="h-full flex flex-col justify-between">
            {/* Top */}
            <div className="flex flex-col">
                <div className="xs:hidden pb-3">
                    <QuickSearchDialog pages={pages} />
                </div>
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
