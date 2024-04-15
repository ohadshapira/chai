import dynamic from 'next/dynamic';
import { ThemeProvider } from '~/hooks/useTheme';
import Head from 'next/head';
import { PLACES } from '~/data/places';
import Sidebar from '~/components/Sidebar';
import Menu from '~/components/Menu';
import { useState } from 'react';

const Map = dynamic(() => import('~/components/Map'), { ssr: false });

export default function Home() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [mapRef, setMapRef] = useState(null);

  return (
    <div>
      <Head>
        <title>CH.ai</title>
        <meta
          name="description"
          content="Make Jewish stories last forever"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/chai.svg"
          color="#2E86C1"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2E86C1" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Menu isOpen={isOpen} setOpen={setOpen} />
      <Sidebar
        mapRef={mapRef}
        isOpen={isOpen}
        setOpen={setOpen}
        pins={PLACES}
      />
      <div className="map">
        <ThemeProvider>
          <Map setMapRef={setMapRef} pins={PLACES} />
        </ThemeProvider>
      </div>
    </div>
  );
}
