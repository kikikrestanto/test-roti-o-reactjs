import React from 'react';
import { pathnameCONFIG } from '../constant/pathnameConfig';
import Login from '../container/pages/Login';
import Dashboard from '../container/pages/Dashboard';
import Add from '../container/pages/Add';
import Edit from '../container/pages/Edit';
import Detail from '../container/pages/Detaiil';

export const AppRoutes = [
    {
      id: 1,
      path: pathnameCONFIG.DASHBOARD,
      component: <Dashboard />,
      exact: true,
    },
    {
      id: 2,
      path: pathnameCONFIG.LOGIN,
      component: <Login />,
      exact: true,
    },
    {
      id: 3,
      path: pathnameCONFIG.ADD,
      component: <Add />,
      exact: true,
    },

    {
      id: 4,
      path: pathnameCONFIG.EDIT,
      component: <Edit />,
      exact: true,
    },

    {
      id: 5,
      path: pathnameCONFIG.DETAIL,
      component: <Detail />,
      exact: true,
    },

  ];