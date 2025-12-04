import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold text-uppercase" to="/">
                    <i className="fa-solid fa-futbol me-2"></i>Quản lý Cầu thủ
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add">Thêm mới</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;