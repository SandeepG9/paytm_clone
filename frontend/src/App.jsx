import { Dashboard} from "./Pages/Dashboard"
import {Send} from "./Pages/Send"
import {Signin} from "./Pages/Signin"
import {Signup} from "./Pages/Signup"
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/send" element={<Send/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
