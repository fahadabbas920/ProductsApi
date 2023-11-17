import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/login", credentials);

      if (data.data.token) {
        localStorage.setItem("token", `Bearer ${data.data.token}`);
        localStorage.setItem("user", data.data.email);
        setCredentials({ email: "", password: "" });
        navigate("/panel/products", { state: { email: data.data.email } });
      }
    } catch (error) {
      if (!error.response) {
        toast.error("No Response from the server");
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="login-container">
      <Form
        credentials={credentials}
        setCredentials={setCredentials}
        submit={submit}
        details={{
          name: "Login",
          description: "Don't have an account?",
          link: "/signup",
          linkto: "Sign up",
        }}
      />
    </div>
  );
};

export default Login;
