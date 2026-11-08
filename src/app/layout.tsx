import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// Self-hosted fonts (bundled at build time, no Google Fonts download needed)
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500-italic.css";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Olam Group",
    description: "Re-imagining global agriculture and food systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="ag-body">
                {children}
                <Toaster position="bottom-center" />
            </body>
        </html>
    );
}
