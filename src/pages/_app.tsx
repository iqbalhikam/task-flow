import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >

    <div className={geist.className}>
      <Component {...pageProps} />
    </div>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
