import * as React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/configureStore";
import Main from './components/MainComponent';
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

