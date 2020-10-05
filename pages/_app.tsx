import { AppProps } from "next/app";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import initDb from "../helpers/initDb";
function App({ Component, pageProps }: AppProps) {
  // initDb();
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default App;
