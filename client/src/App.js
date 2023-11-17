import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
// import ProtectedRoute from "./components/protectedRoute";
import Panel from "./components/panel/panel";
import Main from "./components/panel/main";
import Product from "./components/panel/product";
import AddProduct from "./components/panel/addProduct";
import AccountRecovery from "./components/recoverAccount/accountRecovery";
import FindEmail from "./components/recoverAccount/findEmail";
import SecretQuestion from "./components/recoverAccount/secretQuestion";
import SetNewPassword from "./components/recoverAccount/setNewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedUser, setloggedUser] = useState("");
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login setloggedUser={setloggedUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account_recovery" element={<AccountRecovery />}>
          <Route path="find_email" element={<FindEmail />} />
          <Route path="secret_question" element={<SecretQuestion />} />
          <Route path="set_newpassword" element={<SetNewPassword />} />
        </Route>
        <Route path="/panel" element={<Panel loggedUser={loggedUser} />}>
          <Route path="products" element={<Main />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
