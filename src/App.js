
import './App.scss';
import 'swiper/swiper.min.css';
import './assest/boxicons-2.1.2/boxicons-2.1.2/css/boxicons.min.css'
import './App.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Routes from './config/Routes';

function App() {
  return (
    <Router>
      <Route render={props => (
        <>
          <Header {...props} />
          <Routes />
          <Footer />
        </>
      )} />
    </Router>
  );
}

export default App;