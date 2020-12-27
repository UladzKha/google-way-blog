import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/header/Header";

import "../components/header/header.scss";
import "../sass/about.scss";
import "../sass/blog.scss";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default App;
