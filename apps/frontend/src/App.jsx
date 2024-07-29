import Signup from "@repo/ui/signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "@repo/ui/chatRoom";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        {/* <Route path="*" element={<NoPage />} /> */}
        <Route path="/chatroom" element={<ChatRoom />}></Route>
      </Routes>
    </BrowserRouter>
  </>

}

export default App
