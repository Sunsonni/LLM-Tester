import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Home from "./Components/HomePage/Home"
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import GeminiTextInput from "./Components/GeminiTextInput";
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
    }
    ]
}
])

export default router;
