import { Navigate, Route, Routes } from "react-router";
import style from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar, { Endpoints } from "../Navbar/Navbar";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
        style={{ zIndex: "999999999999" }}
      />
      <div className={style.main}>
        <Routes>
          {Endpoints.map((endpoint) => (
            <Route
              key={endpoint.path}
              path={endpoint.path}
              element={endpoint.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Navbar />
    </>
  );
}

export default App;
