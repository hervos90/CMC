import { Switch, Route } from 'react-router-dom'

//ExtarPages
//import Dashboard from '../AppDashboard'

import SignUp from '../views/backend/pages/auth/signup'
import Login from '../views/backend/pages/auth/login'
import Video from '../views/backend/pages/video'
import RecoverPswd from '../views/backend/pages/auth/recover-pswd'
import Register from '../views/backend/pages/extrapages/register'



{/* vues pour le tableau de bord*/ }




const ExtraPages = () => {
    return (
        <Switch>
            <Route path="/extra-pages/watch-video" component={Video} />
            <Route path="/extra-pages/sign-up" component={SignUp} />
            <Route path="/extra-pages/register" component={Register} />
            <Route path="/extra-pages/login" component={Login} />
            <Route path="/extra-pages/recover-pswd" component={RecoverPswd} />

            {/* routes pour le tableau de bord*/}


            {/* auth */}
            {/*<Route path="/dahsboard" component={Dashboard} />*/}
        </Switch>
    )
}

export default ExtraPages