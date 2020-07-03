import React from 'react';
import NavBar from './components/nav/Nav';
import MainPage from './components/currencyConvert/mainPage';
import CurrencyConvertor from './components/currencyConvert/currencyConvertor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <React.Fragment>
      <Router>
      <Route exact path='/' render={() => (
            <MainPage/>
          )}/> 
        
      <Route path='/(.+)' render={() => (
        <React.Fragment>
          <NavBar/>
          <Container>
            <Switch>
              <Route path='/convertor' render={() => (
                <CurrencyConvertor/>
              )}/>
            </Switch>
          </Container>
        </React.Fragment>
      )}/>  
      </Router>
    </React.Fragment>
  );
}

export default App;
