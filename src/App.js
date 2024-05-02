
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import PrivateRoute from './Component/PrivateRoute';
import Register from './Component/Register';
import Sidebar from './Component/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Component/Board';
import List from './Component/List';
import Card from './Component/Card';

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div>
      <div className="container-fluid homepage-bgimage">
        {pathname !== '/' && pathname !== '/register' && pathname !== '/login' && <Navbar />}

        <Routes>
          <Route path="/app" element={<PrivateRoute />}>
            <Route path="/app/home" element={<Home />} />
            <Route path="/app/board" element={<Board />} />
            <Route path="/app/list" element={<List />} />
            <Route path="/app/card" element={<Card />} />
            <Route path="/app/board/:id" element={<List />} />
          </Route>
          {/* public routes */}
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
