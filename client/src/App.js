import React from 'react';
import NavBar from './components/nav/Nav';
import MainPage from './components/currencyConvert/mainPage';
import CurrencyConvertor from './components/currencyConvert/currencyConvertor';
import ShowHOC from './components/currencyConvert/Goback';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" render={() => <MainPage />} />
        {/* <div>
          <NavBar />
          <Container>
            <Switch>
              <Route path="/convertor" component={CurrencyConvertor} />
              <Route path="/hoc" component={ShowHOC} />
            </Switch>
          </Container>
        </div> */}
        <Route path='/(.+)' render={() => (
          <React.Fragment>
            <NavBar/>
            <Container>
              <Switch>
                <Route path='/convertor' render={() => (
                  <CurrencyConvertor />
                )}/>
                <Route path='/hoc' render={() => (
                  <ShowHOC />
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
