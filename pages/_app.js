import { Provider } from "react-redux";
import { wrapper } from "../store/store";
import Layout from "../components/Layouts/Layout";
import "/styles/globals.css";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
