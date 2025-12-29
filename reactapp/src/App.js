//router
import LayoutsRoute from './router/layouts-route';

//scss files
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './assets/css/typography.css'
//import './assets/css/style.css';
//import './assets/css/responsive.css'

import './assets/dashboard/css/bootstrap.min.css'
import './assets/dashboard/css/typography.css'
import './assets/dashboard/css/styled.css';
import './assets/dashboard/css/responsive.css'


// import  './assets/css/custom.css';

function App() {

  return (
    <div className="App">
      <LayoutsRoute />
    </div>
  );
}

export default App;
