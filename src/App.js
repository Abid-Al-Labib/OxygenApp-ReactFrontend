
import './App.css';
import ListBoothComponent from './components/ListBoothComponent';
import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateDistributorComponent from './components/CreateDistributorComponent';
import MakeOrderForm from './components/MakeOrderForm';
import DashboardComponent from './components/DashboardComponent'
import HistoryComponent from './components/HistoryComponent';
import CreateBoothComponent from './components/CreateBoothComponent';
function App() {
  return (
    <div>
      <Router>
          <div className = "Container">
              <HeaderComponent />
              <div className="container">
                <Switch>
                    <Route path = "/" exact component = {DashboardComponent}></Route>
                    <Route path = "/booths" component = {ListBoothComponent}></Route>
                    <Route path = "/add-distributor" component = {CreateDistributorComponent}></Route>
                    <Route path = "/place-order/:id" component = {MakeOrderForm}></Route>
                    <Route path = "/order-history/:id" component = {HistoryComponent}></Route>
                    <Route path = "/add-booth" component = {CreateBoothComponent}></Route>
                </Switch>
              </div>
          </div>
      </Router>
    </div>
  );
}

export default App;
