import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
  NavLink
} from 'reactstrap';

import './App.css';

import Home from '../Home/Home';  
import CardGrid from '../CardGrid/CardGrid';
import SkillDetailPage from '../SkillDetailPage/SkillDetailPage';
import ItemDetailPage from '../ItemDetailPage/ItemDetailPage';
import RSAboutPage from '../RSAboutPage/RSAboutPage';
import CommunityGrid from '../CommunityGrid/CommunityGrid';
import RSVideoDetailPage from '../RSVideoDetailPage/RSVideoDetailPage';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navHeight: 50
    };

    this.handleResize = this.handleResize.bind(this);
  }

  toggle() {
    this.setState({
        isOpen: !this.state.isOpen,
        navHeight: this.state.navHeight
    });
  }

  handleResize(e = null) {
    let node = ReactDOM.findDOMNode(this._navbar);

    this.setState({
        navHeight: (node && node.offsetHeight) || 0,
        isOpen: this.state.isOpen
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
    <div style={{paddingTop: this.state.navHeight}}>
      <HashRouter>
        <div>
          <Navbar color="dark" className="navbar-dark" ref={(e) => this._navbar = e} expand="md" fixed="top">
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
              <Route exact path="/community" component={CommunityGrid}/>
              <Route exact path="/community/:id" component={RSVideoDetailPage}/>
              <Route exact path="/about" component={RSAboutPage}/>
          </Switch>
        </div>
      </HashRouter>
    </div>
    );
  }
}

export default App;
