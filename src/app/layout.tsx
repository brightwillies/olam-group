import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.scss";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["italic"],
    variable: "--font-playfair-display",
});

export const metadata: Metadata = {
    title: "Olam Group",
    description: "Re-imagining global agriculture and food systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`ag-body ${dmSans.variable} ${playfair.variable}`}>
                {children}
                <Toaster position="bottom-center" />
            </body>
        </html>
    );
}
