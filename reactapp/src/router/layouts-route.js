import {Switch,Route} from 'react-router-dom'
import Layout1 from '../layouts/backend/layout1'
import BlankLayout from '../layouts/blanklayout';
import Layout11 from '../layouts/dashboard/backend/layout1';
import BlankLayout1 from '../layouts/dashboard/blanklayout';
//import Layout11 from '../AppDashboard';


const LayoutsRoute = props => {
    return (
        <Switch>
            <Route path="/extra-pages" component={BlankLayout} />

            <Route path="/auth" component={BlankLayout1} />
            <Route path="/extra-pages-dashborad" component={BlankLayout1} />
            <Route path="/dashboard" component={Layout11} />
            <Route path="/" component={Layout1} />


        </Switch>
    )
}

export default LayoutsRoute