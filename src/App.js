import './App.css';
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './pages/chatPage/ChatPage';
import Login from './pages/loginPage/Login'
import Register from './pages/registerPage/Register'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<h1>hello</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;