import { Route, Routes } from "react-router";
import style from "./App.module.css";
import Feed from "../Feed/Feed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/" element={<Feed />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
