import "../styles/globals.css";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <WhatsAppFloat />
    </>
  );
}
