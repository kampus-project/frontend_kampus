import './App.css'
import MainPage from "./Pages/MainPage/index.jsx";
import StudentPage from "./Pages/StudentPage/index.jsx";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/index.jsx";
import PrivateRoute from "./Pages/PrivateRoute/index.jsx";
function App() {
    return(
      <>
          <Routes>
              <Route path="login" element={<LoginPage/>}/>
              <Route path="/" element={
                  <PrivateRoute>
                     <MainPage/>
                  </PrivateRoute>
              }/>
              <Route path="children" element={
                  <PrivateRoute>
                    <StudentPage/>
                  </PrivateRoute>
              }/>
          </Routes>
      </>
    )
}

export default App
