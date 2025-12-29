import React from 'react';


import '../../../assets/dashboard/css/bootstrap.min.css'
import '../../../assets/dashboard/css/typography.css'
import '../../../assets/dashboard/css/styled.css';
import '../../../assets/dashboard/css/responsive.css'



// Partials
import HeaderStyle1 from '../../../components/dashboard/partials/backend/headerstyle/headerstyle1';
import SidebarStyle from '../../../components/dashboard/partials/backend/sidebarstyle/sidebarstyle'
import FooterStyle from '../../../components/dashboard/partials/backend/footerstyle/footerstyle'

//import '../../../assets/dashboard/css/styled.css';
// Router Component
import Layout1Route from '../../../router/dashboard/layout1-route'



const Layout1 = () => {
       
    return(
        <>
         <div className="wrapper">
            <SidebarStyle />
            <HeaderStyle1 />
            
                <div className="content-page" id="content-page">
                    <Layout1Route />
            </div>
         </div>
         <FooterStyle />
        </>
    )
}


export default Layout1;