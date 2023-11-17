import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, Component, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            navigate("/")
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
