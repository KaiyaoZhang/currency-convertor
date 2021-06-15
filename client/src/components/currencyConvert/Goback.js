import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const ShowHOC = (props) => {
    return (
      <div>
        <p>
          This is a web based app that helps users to know the exchange rate of
          some foreign currencies to Canadian dollar.
        </p>
        <p>Let's go back to try it!</p>
        <Button size="huge" onClick={props.history.goBack}>
          Go Back
        </Button>
      </div>
    );
};

export default withRouter(ShowHOC);