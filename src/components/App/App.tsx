import { Navigate, Route, Routes } from "react-router";
import style from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar, { Endpoints } from "../Navbar/Navbar";
import { useState } from "react";
import LoginContainer from "../LoginContainer/LoginContainer";
import RestaurantPage from "../RestaurantPage/RestaurantPage";

function App() {
  const [isLogged, setLogged] = useState<boolean>(false);

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
      <RestaurantPage />
      <div className={style.main}>
        {!isLogged ? (
          <LoginContainer setLogged={() => setLogged(true)} />
        ) : (
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
        )}
      </div>
      {isLogged && <Navbar setLoggedOut={() => setLogged(false)} />}
    </>
  );
}

export default App;
