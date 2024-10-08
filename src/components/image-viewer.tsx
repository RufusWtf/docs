"use client";

import { ReactElement, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ImageViewerProps = {
    className?: string | undefined;
    children: ReactNode;
};

const ImageViewer = ({
    className,
    children,
}: ImageViewerProps): ReactElement => {
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    "hover:scale-[1.005] transition-all transform-gpu",
                    className
                )}
            >
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 min-w-[20rem] max-w-screen-xl">
                {children}
            </DialogContent>
        </Dialog>
    );
};
export default ImageViewer;
