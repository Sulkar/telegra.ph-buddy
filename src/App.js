import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./components/MyNavbar";
import Page from "./components/Page";
import { MyContextProvider } from "./components/MyContext";

function App() {

  return (
    <MyContextProvider>
      <div className="App">
        <header className="App-header">
          <h2>telegra.ph <span>buddy</span></h2>
          <MyNavbar />
          <Page />
        </header>
      </div>
    </MyContextProvider>
  );
}

export default App;
