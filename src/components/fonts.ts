import { Noto_Sans, Noto_Sans_JP, Noto_Serif, Noto_Serif_JP, Raleway } from 'next/font/google';

export const noto_sans = Noto_Sans({ subsets: ['latin'] });
export const noto_sans_jp = Noto_Sans_JP({ weight: ['300', '400', '600'], subsets: ['latin'] });
export const noto_serif = Noto_Serif({ subsets: ['latin'] });
export const noto_serif_jp = Noto_Serif_JP({ weight: ['300', '400', '600'], subsets: ['latin'] });

export const raleway = Raleway({ subsets: ['latin'] });