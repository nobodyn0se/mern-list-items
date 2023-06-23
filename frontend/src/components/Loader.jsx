const Loader = () => {
    return (
        <div style={
            {
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }>
            <h1 className="fw-bold">Loading...</h1>
          </div>
    );
}

export default Loader;