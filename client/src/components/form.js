import { Link } from "react-router-dom";

const Form = ({ credentials, setCredentials, submit, details }) => {
  return (
    <form onSubmit={submit}>
      <h3>{details.name}</h3>
      <label>
        Email:
        <input
          name="email"
          type="text"
          onChange={(e) => {
            setCredentials((state) => {
              return { ...state, email: e.target.value };
            });
          }}
          value={credentials.email}
          autoComplete="off"
        />
      </label>

      <label>
        Password:{" "}
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setCredentials((state) => {
              return { ...state, password: e.target.value };
            });
          }}
          value={credentials.password}
          autoComplete="off"
        />
      </label>
      <button onClick={submit}>{details.name}</button>
      <div>
        <pre>
          {details.description} <Link to={details.link}>{details.linkto}</Link>
        </pre>
        <pre>
          Forgot Password?{" "}
          <Link to={"/account_recovery/find_email"}>Recover Account</Link>
        </pre>
      </div>
    </form>
  );
};

export default Form;
