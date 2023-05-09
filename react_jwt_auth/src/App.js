import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useRefreshQuery } from "./redux/reducers/authApi";

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  const {} = useRefreshQuery();
  return (
    <div className="App">
      <BrowserRouter>
        {!isAuth ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
