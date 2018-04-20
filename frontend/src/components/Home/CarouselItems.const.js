const CarouselItems = [
    {
        src: `${process.env.REACT_APP_API_HOST}/images/sword_asset.svg`,
        caption: 'Inventory of all the items available within the game',
        color: 'yellow',
        buttonText: 'Explore Items',
        link: '/items'
    },
    {
        src: `${process.env.REACT_APP_API_HOST}/images/skills_asset.svg`,
        caption: 'Complete collection of skills and requirements for each',
        color: 'blue',
        buttonText: 'Explore Skills',
        link: '/skills'
    },
    {
        src: `${process.env.REACT_APP_API_HOST}/images/yt_reddit_asset.svg`,
        caption: 'Community engagement like never before',
        color: 'dark-blue',
        buttonText: 'Explore Community',
        link: '/community'
    }
];

export default CarouselItems;