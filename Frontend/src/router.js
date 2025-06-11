import { ROUTERS } from "./utils/router";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import MasterLayout from "./pages/themes/masterLayout";
import Booking from "./pages/booking";
import BookingHistory from "./pages/BookingHistoryPage";
import Tour from "./pages/tour";
import TourDetail from "./pages/tourDetail";
import Payment from "./pages/PaymentPage";
import Account from "./pages/AccountPage";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";


const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <Home />
        },
        {
            path: ROUTERS.USER.BOOKING,
            component: <Booking />
        },
        {
            path: ROUTERS.USER.TOUR,
            component: <Tour />
        },
        {
            // `${ROUTERS.USER.TOUR_DETAIL}/:id`
            path: ROUTERS.USER.TOUR_DETAIL,
            component: <TourDetail />
        },
        {
            path: ROUTERS.USER.BOOKINGHISTORY,
            component: <BookingHistory />
        },
        {
            path: ROUTERS.USER.PAYMENT,
            component: <Payment />
        },
        {
            path: ROUTERS.USER.ACCOUNT,
            component: <Account />
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <LogIn />
        },
        {
            path: ROUTERS.USER.SIGNUP,
            component: <SignUp />
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

