import React, { Component } from 'react';
import {Segment, Container, Header, Button, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class mainPage extends Component {
    render() {
        return (
            <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                    <Header as='h1' inverted>
                        Currency Convertor
                    </Header>
                    <Header as='h2' inverted>
                        Let's convert!
                    </Header>
                    <Link to='/convertor'>
                        <Button size='huge' inverted>
                            Get started
                            <Icon name='right arrow' inverted />
                        </Button>
                    </Link>
                </Container>
            </Segment>
        )
    }
};

export default mainPage;
