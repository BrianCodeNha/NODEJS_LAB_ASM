import "./App.css";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import { store } from "../src/Redux/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </div>
  );
}

export default App;
