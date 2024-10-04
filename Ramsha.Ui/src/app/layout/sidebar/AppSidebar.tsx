// import { styled } from '@mui/material';
// import React from 'react'
// import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";

// const SidebarContent = styled(Sidebar)(({ theme }) => ({
//     height: 'calc(100vh - 64px)',  // Height of the viewport minus the height of the navbar (assuming 64px for the AppBar)
//     marginTop: '64px',  // Adjust margin to place the sidebar just below the navbar
//     overflowY: 'auto',  // Allow scrolling when the content overflows
//     backgroundColor: theme.palette.background.default, // Sidebar background
//     padding: theme.spacing(2),
//     position: 'fixed'
// }));


// const AppSidebar = () => {
//     return (
//         <SidebarContent open={false} variant='fixed' width={"270px"}>
//             <Logo img="https://adminmart.com/wp-content/uploads/2024/03/logo-admin-mart-news.png">
//                 AdminMart
//             </Logo>
//             <Menu subHeading="HOME">
//                 <MenuItem link="/" badge="true">
//                     Modern
//                 </MenuItem>
//                 <MenuItem>eCommerce</MenuItem>
//                 <MenuItem>Analytical</MenuItem>
//             </Menu>
//             <Menu subHeading="APPS">
//                 <MenuItem>Chat</MenuItem>
//                 <MenuItem>Calendar</MenuItem>
//             </Menu>
//             <Menu subHeading="OTHERS">
//                 <Submenu title="Menu Level">
//                     <MenuItem>Post</MenuItem>
//                     <MenuItem>Details</MenuItem>
//                     <Submenu title="Level 2">
//                         <MenuItem>new</MenuItem>
//                         <MenuItem>Hello</MenuItem>
//                     </Submenu>
//                 </Submenu>

//                 <MenuItem>Chip</MenuItem>
//                 <MenuItem target="_blank" link="google.com">
//                     External Link
//                 </MenuItem>
//             </Menu>
//         </SidebarContent>
//     )
// }

// export default AppSidebar