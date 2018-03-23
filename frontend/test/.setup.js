import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import App from '../src/components/App';
import Home from '../src/components/Home';
import RSAboutPage from '../src/components/RSAboutPage/RSAboutPage';
import RSContainer from '../src/components/RSContainer/RSContainer';
import RSLink from '../src/components/RSLink/RSLink';
import RSRedditCard from '../src/components/RSRedditCard/RSRedditCard';
import RSTeamMemeber from '../src/components/RSTeamMemeber/RSTeamMemeber';
import RSTool from '../src/components/RSTool/RSTool';
import RSVideoCard from '../src/components/RSVideoCard/RSVideoCard';
import RSVideoDetailPage from '../src/components/RSVideoDetailPage/RSVideoDetailPage';
import SkillDetailPage from '../src/components/SkillDetailPage/SkillDetailPage';
import ItemDetailPage from '../src/components/SkillDetailPage/SkillDetailPage';
import GitHubStats from '../src/components/SkillDetailPage/SkillDetailPage';
import CommunityGrid from '../src/components/SkillDetailPage/SkillDetailPage';


// App
describe('<App/>', function () {
    it('should render successfully', function () {
        shallow(<App />);
    });
    it('should render the navigation bar', function () {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.navbar').exists()).to.be.equal(true)
    });
    it ('should have 4 navigation items', function () {
        const wrapper = shallow(<App />);
        const tabs = wrapper.find('Nav').children();
        expect(tabs.to.have.length(4));

    });
});

// write tests below
describe('<Home />', () => {
  it('should render', () => {
    shallow(<Home />);
  });
  it('should render the carousel item', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find('.carousel').exists()).to.eql(true)
  });
});

describe('<RSAboutPage/>', function () {
    it('should render successfully', function () {
        shallow(<RSAboutPage />);
    })
});

describe('<RSContainer/>', function () {
    it('should render successfully', function () {
        shallow(<RSContainer />);
    })
});

describe('<RSLink/>', function () {
    it('should render successfully', function () {
        shallow(<RSLink />);
    })
});

describe('<RSRedditCard/>', function () {
    it('should render successfully', function () {
        shallow(<RSRedditCard />);
    })
});

describe('<RSTeamMemeber/>', function () {
    it('should render successfully', function () {
        shallow(<RSTeamMemeber />);
    })
});

describe('<RSTool/>', function () {
    it('should render successfully', function () {
        shallow(<RSTool />);
    })
});

describe('<RSVideoCard/>', function () {
    it('should render successfully', function () {
        shallow(<RSVideoCard />);
    })
});

describe('<RSVideoDetailPage/>', function () {
    it('should render successfully', function () {
       shallow(<RSVideoDetailPage />);
    })
});

describe('<SkillDetailPage/>', function () {
    it('should render successfully', function () {
        shallow(<SkillDetailPage />);
    })
});

describe('<ItemDetailPage/>', function () {
    it('should render successfully', function () {
        shallow(<ItemDetailPage />);
    })
});

describe('<GitHubStats/>', function () {
    it('should render successfully', function () {
        shallow(<GitHubStats />);
    })
});

describe('<CommunityGrid/>', function () {
    it('should render successfully', function () {
        shallow(<CommunityGrid />);
    })
});