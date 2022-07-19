import "../styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import React from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
