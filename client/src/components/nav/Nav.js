import React, { Component } from 'react';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    state = {
        activeItem: ''
    }
    render() {
        const { activeItem } = this.state;
        return (
            <Segment inverted color={'blue'}>
                <Container>
                    <Menu inverted secondary>
                        <Menu.Item 
                            name='Main Page'
                            active={activeItem === 'Main Page'}
                            as={NavLink}
                            exact
                            to='/'
                        />
                        <Menu.Item
                            name='Convertor'
                            active={activeItem === 'Convertor'}
                            as={NavLink}
                            to='/convertor'
                        />
                        <Menu.Item
                            name='About this App'
                            active={activeItem === 'HOC'}
                            as={NavLink}
                            to='/hoc'
                        />
                    </Menu>
                </Container>
            </Segment>
        )
    }
};

export default Nav;
