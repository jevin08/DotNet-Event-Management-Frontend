import { NavLink, } from "react-router-dom";

function Header({ user }) {
    const isLoggedIn = localStorage.getItem('token') ? true : false;

    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <NavLink className="navbar-brand col-md-2 col-lg-2 col-sm-3 col-6 me-0 px-3" href="/">Event Handling</NavLink>
                {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        {
                            isLoggedIn ?
                                <NavLink className="nav-link px-3" to="/logout">Sign out</NavLink>
                                :
                                <NavLink className="nav-link px-3" to="/login">Login</NavLink>
                        }
                    </div>
                </div>
            </header>

            <nav id="sidebarMenu" className="navbar-dark col-md-2 col-lg-2 col-sm-3 col-4 shadow d-md-block bg-light position-absolute sidebar pl-0">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        {/* <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to='/admin' >
                                <span data-feather="home"></span>
                                Dashboard
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/events">
                                <span data-feather="file"></span>
                                Events
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/users">
                                <span data-feather="users"></span>
                                Users
                            </NavLink>
                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Quick Links</span>
                        <NavLink className="link-secondary" to="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </NavLink>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/register'>
                                <span data-feather="file-text" ></span>
                                Register participant
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/event/new">
                                <span data-feather="file-text"></span>
                                Create Event
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/admin/register'>
                                <span data-feather="file-text" ></span>
                                Register new
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;