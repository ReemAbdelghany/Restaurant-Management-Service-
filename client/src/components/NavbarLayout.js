import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLayout = ({ children }) => {
    return (
        <div>
            {/* Top bar */}
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* Navbar Brand*/}
                <a className="navbar-brand ps-3" href="#">Restaurant</a>
                {/* Sidebar Toggle*/}
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                {/* Navbar Search*/}
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form>
                {/* Navbar*/}
                {/* <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#!">Settings</a></li>
                            <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul> */}
            </nav>

            {/* Sidebar */}
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <Link to="/customer" className="nav-link">Customer</Link>
                                <Link to="/order" className="nav-link">Order</Link>
                                <Link to="/user" className="nav-link">User</Link>
                                <Link to="/userType" className="nav-link">User Type</Link>
                                <Link to="/feedback" className="nav-link">Customer Feedback</Link>
                                <Link to="/menu" className="nav-link">Edit Menu</Link>

                                {/* You can add more links as needed */}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Main content */}
                <div id="layoutSidenav_content">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default NavbarLayout;
