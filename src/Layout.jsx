import { Outlet } from 'react-router-dom';
import {} from './config/https';

function Layout() {
    return (
        <>
            <div >
                <Outlet />
            </div>
        </>
    )
}

export default Layout
