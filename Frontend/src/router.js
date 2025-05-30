import { ROUTERS } from "./utils/router";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import MasterLayout from "./pages/themes/masterLayout";
import Booking from "./pages/booking";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.BOOKING,
            component: <Booking />
        }
    ]

    return (
        <MasterLayout>
            <Routes>
                {
                    userRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))}
            </Routes>
        </MasterLayout>
    )
}

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;

