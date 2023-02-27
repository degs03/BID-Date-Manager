import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Layout from '../layout/Layout'
import CompleteForm from "../pages/CompleteForm";
import Home from "../pages/Home";


export default createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Register />
            },
            {
                path:'/register/login',
                element: <Login/>
            },
            {
                path:'/date',
                element: <Home/>
            },
            {
                path:'/date/new',
                element: <CompleteForm/>
            }
        ]
    }
])