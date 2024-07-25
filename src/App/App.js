import React from "react";
import { Provider } from "react-redux";
import Landingpage from "../Components/LandigPage/landingPage";
import store from "../Store/Store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Landingpage />
      </Provider>
    </>
  );
}

export default App;
