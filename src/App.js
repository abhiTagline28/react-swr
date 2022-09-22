import "./App.css";
import User from "./components/User";
import UserForm from "./components/UserForm";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <UserForm />
      <br />
      <br />
      <User />

      <ToastContainer />
    </div>
  );
}

export default App;
