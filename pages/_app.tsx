import { Provider } from "react-redux";
import { store } from "../redux/store";
import "nprogress/nprogress.css";
import "../styles/styles.scss";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import "animate.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "boundless-checkout-react/dist/index.css";

import "@fortawesome/fontawesome-free/css/svg-with-js.css";

import { AppProps } from "next/app";
import RouterListener from "../components/RouterListener";
import LoadingLine from "../components/LoadingLine";
import AuthLayout from "../layouts/AuthLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthLayout>
        <RouterListener />
        <LoadingLine />
        <Component {...pageProps} />
      </AuthLayout>
    </Provider>
  );
}

export default MyApp;
