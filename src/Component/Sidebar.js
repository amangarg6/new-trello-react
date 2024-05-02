// Sidebar.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiHome, FiList, FiLock } from 'react-icons/fi';
import './Sidebar.css';

function Sidebar({ boards }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getIconForBoard = (visibility) => {
    switch (visibility) {
      case 'Public':
        return <FiList />;
      case 'Private':
        return <FiLock />;
      case 'Workspace':
        return <FiBriefcase />;
      default:
        return null;
    }
  };

  const id = location.state?.id;
  const board = (id) => {
    navigate("/app/list", { state: { id: id } });
  };

  return (
    <div className="sidebar col-2">
      <div className="text-center">
        <h2>Your Board</h2>
        <ul>
          <li className="nav-item">
            <Link to="/app/home" className="nav-link">
              <FiHome className="text-primary mr-2" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/app/board" className="nav-link">
              <FiList className="text-primary mr-2" /> Board
            </Link>
            {boards && boards.length > 0 && (
              <ul>
                {boards.map((board) => (
                  <li key={board.id} className="nav-item">
                    <Link
                      to={`/app/board/${board.id}`}
                      className={`nav-link ${
                        location.pathname === `/app/board/${board.id}` ? 'active' : ''
                      }`}
                    >
                      {getIconForBoard(board.visibility)} {board.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
