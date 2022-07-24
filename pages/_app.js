import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <React.StrictMode>
      <ChakraProvider>
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
