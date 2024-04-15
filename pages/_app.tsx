import type { AppProps } from 'next/app';
import '~/styles/globals.css';

function CHaiMundo({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CHaiMundo;
