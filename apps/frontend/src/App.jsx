import './App.css'
import Signup from "@repo/ui/signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return<>
     <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}>
          
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </> 
    
}

export default App
