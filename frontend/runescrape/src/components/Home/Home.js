import React, { Component } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Button
  } from 'reactstrap';

  import { Link } from 'react-router-dom';

  import './Home.css';

const items = [
    {
        src: 'http://www.runescrape.lol/static/img/sword_asset.svg',
        caption: 'Inventory of all the items available within the game',
        color: 'yellow',
        buttonText: 'Explore Items',
        link: '/items'
    },
    {
        src: 'http://www.runescrape.lol/static/img/skills_asset.svg',
        caption: 'Complete collection of skills and requirements for each',
        color: 'blue',
        buttonText: 'Explore Videos',
        link: '/skills'
    },
    {
        src: 'http://www.runescrape.lol/static/img/yt_reddit_asset.svg',
        caption: 'Community engagement like never before',
        color: 'dark-blue',
        buttonText: 'Explore Community',
        link: '/community'
    }
];

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
      }
    
    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}
                className={ item.color }
              >
                <div className="item-content">
                    <img className='carousel-header-icon' src={item.src} alt={item.caption}/>
                    <CarouselCaption captionHeader={item.caption} />
                    <Link className='centered-button' to={item.link}>
                        <Button outline color="secondary">{item.buttonText}</Button>{' '}
                    </Link>
                </div>
              </CarouselItem>
            );
        });
      

        return (
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              className="carousel-fullscreen"
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
          );
    }
}