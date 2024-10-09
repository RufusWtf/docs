import type { Metadata, Viewport } from "next";

export type Config = {
    /**
     * The name of this app.
     */
    siteName: string;

    /**
     * The metadata for this app.
     */
    metadata: Metadata;

    /**
     * The viewport for this app.
     */
    viewport: Viewport;

    /**
     * The source to get the content from.
     * This can either be a local source, or
     * a remote Git repository.
     */
    contentSource: string;

    /**
     * Social links for this app.
     */
    socialLinks: SocialLinkType[];
};

export type SocialLinkType = {
    /**
     * The name of this social link.
     */
    name: string;

    /**
     * The tooltip for this social link.
     */
    tooltip: string;

    /**
     * The logo for this social link.
     * This can either be an image URL, or
     * the name of an icon from <a href="https://lucide.dev/icons">Lucide Icons</a>
     */
    logo: string;

    /**
     * The href for this social link.
     */
    href: string;

    /**
     * Whether to show this social link in the navbar.
     */
    navbar: boolean;
};
