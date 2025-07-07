import {createBrowserRouter} from "react-router";
import Home from "../Pages/Home";
import Login from "../AuthLayOut/Login";
import Register from "../AuthLayOut/Register";
import AuthLayOut from "../AuthLayOut/AuthLayOut";
import MainLayOut from "../LayOut/MainLayOut";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children:[
        {
            index:true,
            Component:Home,
        },
      
       
     
    ]
  },
  {
     path: "/auth",
     Component:AuthLayOut,
     children:[
      {
        path:'login',
        Component:Login,
      },
      {
        path:'register',
        Component:Register
      },
     
     ]
   
  },
 
])
export default router;