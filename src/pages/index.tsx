import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: "/gallery/all",
    });
  }, [router]);
  return (
    <>
      <Head>
        <title>Painterly</title>
        <meta name="description" content="A platform for Art Enthusiasts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
