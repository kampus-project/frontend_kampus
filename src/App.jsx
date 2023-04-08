import './App.css'
import MainPage from "./Pages/MainPage/index.jsx";
import StudentPage from "./Pages/StudentPage/index.jsx";
import {Routes,Route} from "react-router-dom";
function App() {
    return(
      <>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/children" element={<StudentPage/>}/>
          </Routes>
      </>
    )
}

export default App
