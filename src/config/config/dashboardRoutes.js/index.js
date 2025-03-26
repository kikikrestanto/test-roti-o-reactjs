import React, { lazy, Suspense } from "react";
import { pathnameCONFIG } from "../../../constant/pathnameConfig";
import FallbackComponent from "../../../components/FallbackComponent";

const Dashboard = lazy(() => import('container/pages/Dashboard'));

const dashboardRoutes = [
    {
        id: 101,
        path: pathnameCONFIG.DASHBOARD,
        component: (
            <Suspense fallback={<FallbackComponent minHeight = "100vh"/>}>
                <Dashboard/>
            </Suspense>
        ),
        exact: true
    }
]

export default dashboardRoutes;