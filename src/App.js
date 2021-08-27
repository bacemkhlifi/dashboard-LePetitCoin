
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import User from './components/users/User';
import Adsence from './components/adsences/Adsence';
import Categories from './components/categories/Category'
import Villes from './components/villes/Villes'
import ReadProduct from './components/dashboard/ReadProduct'
import reclamations from './components/reclamations/reclamations';

function App() {
  return (
    <>
  <Router>
    <Switch>
    <Route exact path="/"component={Login} />
    <Route exact path="/dashboard"component={Dashboard} />
    <Route exact path="/users" component={User}></Route>
    <Route exact path="/annonces" component={Adsence}></Route>
    <Route exact path="/ad" component={ReadProduct}></Route>
    <Route exact path="/categories" component={Categories}></Route>
    <Route exact path="/villes" component={Villes}></Route>
    <Route exact path="/reclamations" component={reclamations}></Route>
    </Switch>
    
  </Router>
    </>
  );
}

export default App;
