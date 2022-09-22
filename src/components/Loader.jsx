import { Spinner } from "reactstrap";

function Loader() {
  return (
    <div className="loader">
      <Spinner
        color="primary"
        style={{
          height: "3rem",
          width: "3rem",
        }}
      >
        Loading...
      </Spinner>
    </div>
  );
}

export default Loader;
