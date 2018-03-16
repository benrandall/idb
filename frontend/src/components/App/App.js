import React, { Component } from 'react';
import {
  Route,
  Link,
  HashRouter,
  Switch
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import logo from './logo.svg';
import './App.css';

import Home from '../Home/Home';  
import CardGrid from '../CardGrid/CardGrid';
import SkillDetailPage from '../SkillDetailPage/SkillDetailPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const ItemsCardGrid = (props) => {
      return (
        <CardGrid 
          cardType="items"
        />
      );
    };

    const SkillsCardGrid = (props) => {
      return (
        <CardGrid 
          cardType="skills"
        />
      );
    };  

    return (
      <HashRouter>
        <div>
          <Navbar color="dark" className="navbar-dark" expand="md" fixed="top">
            <NavbarBrand href="/">RuneScrape</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/items">Items</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/skills">Skills</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/community">Community</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/about">About</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/items" component={ItemsCardGrid}/>
               <Route path="/items/:id" component={ItemDetailPage}/>
              <Route exact path="/skills" component={SkillsCardGrid}/>
              <Route path="/skills/:id" component={SkillDetailPage}/>
              {/*<Route exact path="/community" component={CommunityGrid}/>*/}
              {/*<Route exact path="/community/:id" component={IndividualCommunity}/>*/}
              {/*<Route exact path="/about" component={About}/>*/}
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
