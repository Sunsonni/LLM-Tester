import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Home from "./Components/HomePage/Home"
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import GeminiTextInput from "./Components/GeminiTextInput";
import SignUp from "./Components/SignUp";
import Login from "./Components/LoginPage/Login";

const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/Input',
        element: <GeminiTextInput/>
    },
    {
        path: '/SignUp',
        element: <SignUp />
    },
    {
        path: '/Login',
        element: <Login/>
    },
    {
        path: '/Success',
        element: <p>Account successfully created</p>
    }
    ]
}
])

export default router;
