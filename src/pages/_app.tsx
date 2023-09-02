import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Dynamically import Bootstrap JavaScript to ensure it's only run on the client-side
    import('bootstrap');
  }, []);
  
  return <Component {...pageProps} />
}
