import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    return (
        <div className="mt-14 drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className="text-2xl font-bold text-purple-500">
                    Welcome to your Dashboard
                </h2>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}

                    {
                        admin ? <li>
                            <Link to="/dashboard">All Order</Link>
                        </li> : <li>
                            <Link to="/dashboard">My Order</Link>
                        </li>
                    }
                    {!admin && <li>
                        <Link to="/dashboard/myreview">My Reviews</Link>
                    </li>}
                    <li>
                        <Link to="/dashboard/profile">Profile</Link>
                    </li>
                    {admin && (
                        <li>
                            <Link to="/dashboard/alluser">All Users</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;