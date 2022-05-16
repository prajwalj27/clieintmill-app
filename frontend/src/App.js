import logo from './logo.svg';
import './App.css';
import Home from './Home';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
