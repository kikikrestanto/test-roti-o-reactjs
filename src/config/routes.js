import React from 'react';
import { pathnameCONFIG } from '../constant/pathnameConfig';
import Login from '../Container/pages/Login';
import Dashboard from '../Container/pages/Dashboard';
import Add from '../Container/pages/Add';
import Edit from '../Container/pages/Edit';
import Detail from '../Container/pages/Detaiil';

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