import type { Metadata } from 'next';
import { Space_Grotesk, Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://martin.dev'),
  title: 'MARTIN.DEV — Full Stack Developer',
  description:
    'Portfolio de Martín — Full Stack Developer en Villavicencio, Colombia. Backend, APIs y despliegue real.',
  openGraph: {
    title: 'MARTIN.DEV — Full Stack Developer',
    description:
      'Portfolio de Martín — Full Stack Developer en Villavicencio, Colombia. Backend, APIs y despliegue real.',
  },
};

const themeBootstrap = `try{var d=localStorage.getItem('dark')==='1';if(d){document.documentElement.dataset.theme='dark';}var l=localStorage.getItem('lang');if(l)document.documentElement.lang=l;}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
