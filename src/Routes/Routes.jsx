import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import LoginLayout from "../LoginPages/LoginLayout";
import Login from "../LoginPages/Login";
import Register from "../LoginPages/Register";
import DashBoardLayout from "../DashBoard/DashBoardLayOut";
import OrganizerPro from "../DashBoard/OrganizerPro";
import AddCamps from "../DashBoard/AddCamps";
import ManageCamp from "../DashBoard/ManageCamp";
import ManageRegister from "../DashBoard/ManageRegister";
import PriveteRoute from "./Priveteroute/PrivetRoute";
import AvailablePages from "../Pages/AvaileblePages";
import CampDetails from "../Pages/CampDetails";
import Payments from "../DashBoard/Payments";
import ParmentFrom from "../DashBoard/ParmentFrom";
import ParticipantLayout from "../Participant Dashboard/ParticipantLayout";
import Analytics from "../Participant Dashboard/Analytics";
import PaymentHistory from "../Participant Dashboard/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // ✅ component instance, not just JSX
    children: [
    {
      index:true,
      Component:Home
    },{
      path:'availecamp',
      Component:AvailablePages
    },
    {
         path: "/camp-details/:id", 
         Component:CampDetails
    }

    ],
    
  },
  {
    path:"/",
    Component:LoginLayout,
    children:[
      {
        path:'login',
        Component:Login
      },
    {
      path:'register',
      Component:Register
    }
    ]
  },
  {
    path:'/dashboard',
    element:<PriveteRoute><DashBoardLayout/></PriveteRoute>,
    children:[
      {
        path:'organizer',
        Component:OrganizerPro
      },
      {
        path:'addcamp',
        Component:AddCamps
      },
      {
        path:'managecamps',
        Component:ManageCamp
      },
      {
        path:'managereg',
        Component:ManageRegister
      },
      {
        path:'/dashboard/payment/:campId',
        Component:Payments
      },
     
    ]
  },
  {
     
path:'/participent',
element:<PriveteRoute><ParticipantLayout/></PriveteRoute>,
children:[
  {
    path:'analytics',
    Component:<Analytics/>
  },
  {
    path:"paymenthis",
    Component:PaymentHistory

  }
]
      
  }
]);
