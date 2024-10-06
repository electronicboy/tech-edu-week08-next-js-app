import localFont from "next/font/local";
import {Ubuntu} from "next/font/google"
import "./globals.css";
import Header from "@/components/structure/Header";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const ubuntu = Ubuntu({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: "--ubuntu-font"
})


export const metadata = {
    title: "SofaTime",
    description: "Movie and TV show review",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable} antialiased`}
        >
        <Header/>
        {children}
        </body>
        </html>
    );
}
