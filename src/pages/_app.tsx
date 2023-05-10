// import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/modal.css";
import "@/styles/utils.css";
import "@/styles/card.css";
import "@/styles/profile.css";
import "@/styles/singleArt.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import Layout from "@/layout";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Kodchasan } from "@next/font/google";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const kodchasan = Kodchasan({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className={kodchasan.className}>
      {getLayout(
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </main>
  );
}
