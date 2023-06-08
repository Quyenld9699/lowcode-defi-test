import { Inter } from 'next/font/google';
import Script from 'next/script';
import ChatBotWidget from 'src/components/ChatBotWidget/ChatBotWidget';
import Providers from 'src/contexts/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
                <ChatBotWidget button={{ bgcolor: 'rgb(78, 184, 214)' }} boxChat={{ name: 'Chat Bot', desc: 'botchat', headerBgColor: 'rgb(78, 184, 214)' }} />
            </body>
        </html>
    );
}
