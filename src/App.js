import "./App.css";

import {
  BrowserRouter as Router,
  Link,
  RouterProvider,
} from "react-router-dom";

import router from './Routes';

function App() {
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
