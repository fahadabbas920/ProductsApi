import { useState } from "react";
import Form from "./form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    questionVal: "FP",
    answerVal: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/signup", {
        ...credentials,
        answerVal: credentials.answerVal.toLowerCase(),
      });
      toast.success(data.data.message);
      navigate("/");
    } catch (error) {
      if (!error.response) {
        toast.error("No Response from the server");
      } else {
        const errA = error?.response?.data?.message.split(".");
        errA.forEach((err) => {
          toast.error(err);
        });
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
          name: "Signup",
          description: "Already have an account?",
          link: "/",
          linkto: "Login",
        }}
      />
    </div>
  );
};

export default Signup;
