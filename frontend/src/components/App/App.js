import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Route,
  Link,
  BrowserRouter,
  Switch,
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
import RSSearchDetailPage from "../RSSearchDetailPage/RSSearchDetailPage";
import RSSearchBar from "../RSSearchBar/RSSearchBar";
import DataVizPage from "../DataViz/DataVizPage";

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navHeight: 50
    };

    this.links = [
        { slug: 'items', title: 'Items' },
        { slug: 'skills', title: 'Skills' },
        { slug: 'community', title: 'Community' },
        { slug: 'about', title: 'About' },
    ];

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

  getNavigation() {
      return (
        <Navbar color="dark" className="navbar-dark" ref={(e) => this._navbar = e} expand="md" fixed="top">
            <NavbarBrand href="/" className="pl-4">RuneScrape</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto pr-4" navbar>
                {
                    this.links.map((link) => {
                        return (
                            <NavItem key={link.slug} >
                                <NavLink tag={Link} to={`/${link.slug}`}>{link.title}</NavLink>
                            </NavItem>
                        )
                    })
                }
                <NavItem>
                    <RSSearchBar onChange={() => {}} onClear={() => {}} />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
      );
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
      <BrowserRouter>
        <div>
            { this.getNavigation() }

          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/items" component={ItemsCardGrid}/>
               <Route path="/items/:id" component={ItemDetailPage}/>
              <Route exact path="/skills" component={SkillsCardGrid}/>
              <Route path="/skills/:id" component={SkillDetailPage}/>
              <Route exact path="/community" component={CommunityGrid}/>
              <Route exact path="/community/:id" component={RSVideoDetailPage}/>
              <Route exact path="/about" component={RSAboutPage}/>
              <Route exact path="/search" component={RSSearchDetailPage}/>
              <Route path="/search/:query" component={RSSearchDetailPage} />
              <Route exact path="/dataviz" component={DataVizPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
