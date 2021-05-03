import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../../styles/globals.css';
import Header from '../../UI/Header';


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact</h2>
  </div>
);

const Bot = () => {
    <div>
        <h2>Bot</h2>
    </div>
}

const Audio = () => {
    <div>
        <h2>Audio</h2>
    </div>
}

function SharedHeader() {
  return (
    <div className='headers'>
      <Router>
        <Route path='/:page' component={Header} />
        <Route exact path='/' component={Header} />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/bot' component={Bot} />
        <Route exact path='/audio' component={Audio} />
        <Link to={{ pathname: "https://dogegarden.net" }} target="_blank">DogeGarden</Link>
      </Router>
    </div>
  );
}

export default SharedHeader;