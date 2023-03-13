import "./App.css";

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import RoutesAll from "./Routes";
import SidebarMenu from "./components/SideBar";

function App() {
  
  return (
    <Router>
      <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
        <div className="p-0" style={{ maxWidth: "20%" }}>
          <SidebarMenu />
        </div>
        <div className="p-0" style={{flex: "1"}}>
          <RoutesAll/>
        </div>
      </div>
    </Router>
  );
}

export default App;
