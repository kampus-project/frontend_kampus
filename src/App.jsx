import './App.css'
import MainPage from "./Pages/MainPage/index.jsx";
import StudentPage from "./Pages/StudentPage/index.jsx";
import {Routes,Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/index.jsx";
function App() {
    return(
      <>
          <Routes>
              <Route path="login" element={<LoginPage/>}/>
              <Route path="/" element={<MainPage/>}/>
              <Route path="children" element={<StudentPage/>}/>
          </Routes>
      </>
    )
}

export default App
