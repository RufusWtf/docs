"use client";

import { ReactElement, useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UseThemeProps } from "next-themes/dist/types";
import { capitalizeWords } from "@/lib/string";

/**
 * The theme switcher component.
 *
 * @return the switcher jsx
 */
const ThemeSwitcher = (): ReactElement => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme }: UseThemeProps = useTheme();
    const isLight = theme === "light";

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? (
        <Button
            className="p-1.5 flex gap-7 items-center hover:opacity-85"
            variant="ghost"
            onClick={() => setTheme(isLight ? "dark" : "light")}
        >
            <div className="relative flex items-center">
                <motion.div
                    className="absolute"
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{
                        rotate: isLight ? 0 : -90,
                        scale: isLight ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <Sun className="w-[1.2rem] h-[1.2rem]" />
                </motion.div>
                <motion.div
                    className="absolute"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{
                        rotate: isLight ? 90 : 0,
                        scale: isLight ? 0 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <MoonStar className="w-[1.2rem] h-[1.2rem]" />
                </motion.div>
            </div>
            <span className="font-semibold">{capitalizeWords(theme)}</span>
        </Button>
    ) : (
        <></>
    );
};

export default ThemeSwitcher;
