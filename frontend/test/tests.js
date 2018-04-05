// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import { expect } from 'chai';
// import * as sinon from 'sinon'
// import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import React from 'react';
import { expect, assert } from 'chai';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import App from '../src/components/App/App';
import Home from '../src/components/Home/Home';
import RSAboutPage from '../src/components/RSAboutPage/RSAboutPage';
import RSContainer from '../src/components/RSContainer/RSContainer';
import RSLink from '../src/components/RSLink/RSLink';
import RSRedditCard from '../src/components/RSRedditCard/RSRedditCard';
import RSTeamMember from '../src/components/RSTeamMember/RSTeamMember';
import RSTool from '../src/components/RSTool/RSTool';
import RSVideoCard from '../src/components/RSVideoCard/RSVideoCard';
import RSVideoDetailPage from '../src/components/RSVideoDetailPage/RSVideoDetailPage';
import SkillDetailPage from '../src/components/SkillDetailPage/SkillDetailPage';
import ItemDetailPage from '../src/components/SkillDetailPage/SkillDetailPage';
import GitHubStats from '../src/components/SkillDetailPage/SkillDetailPage';
import CommunityGrid from '../src/components/SkillDetailPage/SkillDetailPage';

// configure({ adapter: new Adapter() });

// App
describe('<App/>', function () {
    it('should render successfully', () => {
        shallow(<App />);
    });
    it('should render the navigation bar', () => {
        const wrapper = shallow(<App />);
        const navbar = wrapper.find('Nav');
        expect(navbar.exists()).to.equal(true);
    });
    it('should have 4 navigation items', () => {
        const wrapper = shallow(<App/>);
        const tabs = wrapper.find('Nav').children();
        expect(tabs).to.have.length(4);
    });
});

// Home
describe('<Home />', () => {
    it('should render successfully', () => {
        shallow(<Home />);
    });
    it('should render the carousel item', () => {
        const wrapper = shallow(<Home />);
        const carousel = wrapper.find('Carousel');
        expect(carousel.exists()).to.equal(true);
    });
    it('should render 3 carousel images', () => {
        const wrapper = shallow(<Home />);
        const carousel = wrapper.find('Carousel');
        expect(carousel.find('img')).to.have.length(3);
  })
});

describe('<RSAboutPage/>', function () {
    it('should render successfully', function () {
        shallow(<RSAboutPage />);
    });
});

describe('<RSContainer/>', function () {
    it('should render successfully', function () {
        shallow(<RSContainer />);
    });
});

describe('<RSLink/>', function () {
    it('should render successfully', function () {
        shallow(<RSLink />);
    });
});

describe('<RSRedditCard/>', function () {
    it('should render successfully', function () {
        shallow(<RSRedditCard />);
    });
});

describe('<RSTeamMember/>', function () {
    it('should render successfully', function () {
        shallow(<RSTeamMember />);
    });
});

describe('<RSTool/>', function () {
    it('should render successfully', function () {
        shallow(<RSTool />);
    });
});

describe('<RSVideoCard/>', function () {
    it('should render successfully', function () {
        shallow(<RSVideoCard />);
    });
});

describe('<RSVideoDetailPage/>', function () {
    it('should render successfully', function () {
        shallow(<RSVideoDetailPage name="a" category="a" id="1" url="a"/>);
    });
});

describe('<SkillDetailPage/>', function () {
    it('should render successfully', function () {
        shallow(<SkillDetailPage />);
    });
});

describe('<ItemDetailPage/>', function () {
    it('should render successfully', function () {
        shallow(<ItemDetailPage />);
    });
});

describe('<GitHubStats/>', function () {
    it('should render successfully', function () {
        shallow(<GitHubStats />);
    });
});

describe('<CommunityGrid/>', function () {
    it('should render successfully', function () {
        shallow(<CommunityGrid />);
    });
});