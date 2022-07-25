import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "vars/theme";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <React.StrictMode>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </SessionProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default MyApp;
