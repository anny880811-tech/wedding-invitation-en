import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/invite/:guestId" element={<App/>}/>
      </Routes>
    </BrowserRouter>
  )
}