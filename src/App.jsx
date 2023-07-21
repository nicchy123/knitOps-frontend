import React from 'react';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Actions from './pages/actions/Actions';
import Signin from './pages/signin/Signin';
import PrivateRoute from './privateRoute/PrivateRoute';
import Signup from './pages/signup/Signup';
import Check from './pages/Check/Check';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute><Check/></PrivateRoute>
    },
    {
      path: '/check/:id',
      element: <PrivateRoute><Actions/></PrivateRoute>,
      loader: async ({ params }) => {
        return fetch(`http://localhost:2000/tools/${params.id}`);
      }
    },
    {
      path: "/signin",
      element: <Signin/>
    },
    {
      path: "/signup",
      element: <Signup/>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;