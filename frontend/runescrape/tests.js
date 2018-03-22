import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import { App } from './src/components/App';
import { Home } from './src/components/Home';
import { RSAboutPage } from './src/components/RSAboutPage/RSAboutPage';
import { RSContainer } from './src/components/RSContainer/RSContainer';
import { RSLink } from './src/components/RSLink/RSLink';
import { RSRedditCard } from './src/components/RSRedditCard/RSRedditCard';
import { RSTeamMemeber } from './src/components/RSTeamMemeber/RSTeamMemeber';
import { RSTool } from './src/components/RSTool/RSTool';
import { RSVideoCard } from './src/components/RSVideoCard/RSVideoCard';
import { RSVideoDetailPage } from './src/components/RSVideoDetailPage/RSVideoDetailPage';
import { SkillDetailPage } from './src/components/SkillDetailPage/SkillDetailPage';
import { ItemDetailPage } from './src/components/SkillDetailPage/SkillDetailPage';
import { GitHubStats } from './src/components/SkillDetailPage/SkillDetailPage';
import { CommunityGrid } from './src/components/SkillDetailPage/SkillDetailPage';

// import test data

// App
describe('<App/>', function () {
    it('should render without crashing', function () {
        shallow(<App />);
    });
});

// write tests below