import { Link } from "react-router-dom";

export const NoMatch = () => {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Go to the home page.</Link>
      </p>
    </>
  );
};
