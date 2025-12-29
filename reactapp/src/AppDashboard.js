//router
import LayoutsRoute from './router/dashboard/layouts-route';

//scss files
import './assets/dashboard/css/bootstrap.min.css'
import './assets/dashboard/css/typography.css'
import './assets/dashboard/css/styled.css';
import './assets/dashboard/css/responsive.css'


// import  './assets/css/custom.css';

function AppDashboard() {
  return (
    <div className="App">
      <LayoutsRoute />
    </div>
  );
}

export default AppDashboard;
