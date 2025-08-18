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
import PaymentHistory from "../Participant Dashboard/PaymentHistory";
import RegisteredCamps from "../Participant Dashboard/RegisteredCamps";
import Analytics from "../Participant Dashboard/Analytics";
import PaymentFrom from "../Participant Dashboard/PaymentFrom";
import ParticipentProfile from "../Participant Dashboard/ParticipentProfile";
import NotFoundPages from "../Pages/NotFoundPages";
import PrivateRouteParticipant from "../Participant Dashboard/PrivateRouteParticipant";
import PrivateRouteOrganizer from "../DashBoard/PrivateRouteOrganizer";
import AboutMe from "../Animation/AboutMe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<NotFoundPages/>, // component instance, not just JSX
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
 element:<PriveteRoute><CampDetails></CampDetails></PriveteRoute>
    },
     {
        path:'aboutme',
        Component:AboutMe
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
    element:<PrivateRouteOrganizer><DashBoardLayout></DashBoardLayout></PrivateRouteOrganizer>,
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
   path:"/dashboard/managereg",
    element:<ManageRegister />
},

 

      {
        path:'/dashboard/payment/:campId',
        Component:Payments
      },
     
    ]
  },
  {
     
path:'/participent',
element:<PrivateRouteParticipant><ParticipantLayout></ParticipantLayout></PrivateRouteParticipant>,
children:[
  {
    path:'analytics',
    Component:Analytics
  },
  {
path:'Profile',
Component:ParticipentProfile
  },
  {
    path:'registered',
    Component:RegisteredCamps
  },
  {
    path:"paymenthis",
    Component:PaymentHistory

  },
    {
        path:'payments/:campId',
        Component:PaymentFrom
      }
     
]
      
  },

 
]);
