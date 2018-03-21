const AboutConstants = {
    about: {
        title: "About Us",
        subtitle: "Meet Me in Lumbridge",
        body: "Runescape is a game that was a hit in the early 2000s. This database is a collection of the skills, items, and associated youtube videos & reddit posts for attaining the desired skills/items.As of right now, there are plenty of websites that have information on the internal mechanics of the game, including skills, items, and activities. However, they're all written guides and lack a community around it. None of these websites have any curated multimedia content about the game. By merging Youtube and Reddit posts, users can now see see both the latest videos, tutorials, events AND the comments from the communities held within the Reddit posts to get a more wholesome view of the game. Intended users include all Runescape users, whether using the 2007 version or most recent version of the game. ",
    },
    github: {
        title: "GitHub",
        subtitle: "Stats"
    },
    data_sources: {
        title: "Data",
        subtitle: "Sources",
        data: [
            {
                title: "Runescape Secure API",
                desc: "Not scraped for phase #2"
            },
            {
                title: "Runescape Service API",
                desc: "Not scraped for phase #2"
            },
            {
                title: "Youtube API",
                desc: "Not scraped for phase #2"
            }
        ]
    },
    tools: {
        title: "Tools",
        subtitle: "Used",
        data: [
            {
                title: "Flask",
                desc: "Flask is a micro web framework written in Python and based on the Werkzeug toolkit and Jinja2 template engine. We used flask as the backend for our project. It provides a fast and minimal backing to our project and Jinja is a very robust templating engine. We were able to make use of the templating's repeat blocks and direct data injection from Flask -> Jinja to reduce code and HTML duplication."
            },
            {
                title: "Bootstrap",
                desc: "Bootstrap is a free and open-source front-end library for designing websites and web applications. We used the bootstrap column system, carousel, and navigation bar throughout the website. An issue that we had with Bootstrap was that we ended up using bootstrap 3 via the Flask-Bootstrap Python package, which does not have native cards. Because of this, we had to build our own card classes."
            },
            {
                title: "React",
                desc: "React is a JavaScript library for building user interfaces maintained by Facebook. It is written using a powerful JSX syntax which allows for pseudo-HTML elements within the javascript class itself. An issue we initially had was loading the main elements of the page. There is not a direct way to pass the data from Flask to React as the two do not know each other. Our initial solution was to asynchronously load the data from an endpoint upon page load, but that was not efficient and made the user wait extra time. What we ended up going with was storing the JSON used to create the components in a proprietary HTML property. This allowed instant rendering of our components and drastically sped up load times."
            },
            {
                title: "Postman",
                desc: "Postman is a popular and easy to use HTTP Request composer that makes it easy to call web services. We used Postman to help us generate API documentation and test the API with a variety of different use cases. We also are using it across our different environments by setting up shared environments within our team. The portability of the Postman tests, collections, and documentation has been very useful in our development cycle."
            }
        ]
    },
    extra_tools: {
        title: "Unrequired Tools",
        data: [
            {
                title: "Adobe XD",
                desc: "XD is one of Adobe's newer products. It is marketed as being a simple design platform to create mockups of both web and native apps. We used it to design our project and it has helped us all to understand how the product will look and feel once it is complete. XD also allows exporting to Zeplin, instantly creating useful comps for all of the developers on our team."
            },
            {
                title: "Zeplin",
                desc: "Zeplin is a team tool that allows the distribution of comps instantly. It allows the members of the team to comment on any piece of a comp, increasing the visibility of feedback. Another key feature is that it gives the frontend developers all of the padding, margins, color classes, and even complete CSS classes that they can then use in production code. It also ties into Slack, alerting everyone once a comp has been updated, added, or someone adds a comment. It has allowed us to develop rapidly on account of every developer having access to the designs."
            },
            {
                title: "Docker",
                desc: "Docker has allowed us to quickly and easily deploy to our AWS hosting instances. It generates the whole environment, including all of the Nginx configurations for the web server. By using Docker, we can deploy our app on the cloud with minimal configuration."
            }
        ]
    },
    links: {
        title: "GitHub",
        subtitle: "Links",
        data: [
            {
                title: "GitBook Report",
                url: "https://benrandall.gitbooks.io/report/content/"
            },
            {
                title: "GitBook API Report",
                url: "https://benrandall.gitbooks.io/api/content/"
            },
            {
                title: "GitHub Repository",
                url: "https://github.com/benrandall/idb"
            }
        ]
    },
    team: {
        title: "Our Team",
        members: {
            clairebingham: {
                name: "Claire Bingham",
                role: "Front End, Design",
                bio: "I'm a fourth year Computer Science major at UT. I love Runescape, wearing socks & sandals, and my dog.",
                icon: "http://www.runescrape.lol/static/img/claire.png"
            },
            benrandall: {
                name: "Benji Randall",
                role: "Data, Front End",
                bio: "I am a junior Computer Science student. I once fixed my mom's Lenovo.",
                icon: "http://www.runescrape.lol/static/img/ben.png"
            },
            elmdecoste: {
                name: "Liam DeCoste",
                role: "Front End, Design",
                bio: "I'm a second year CS major. I enjoy video games, reading, and finding new tea/coffee shops around Austin.",
                icon: "http://www.runescrape.lol/static/img/liam.jpg"
            },
            dylanlramage: {
                name: "Dylan Ramage",
                role: "React, Front End",
                bio: "I'm a second year Computer Science major. I like to drive with the windows down and go to scenic places with friends.",
                icon: "http://www.runescrape.lol/static/img/dylan.jpg"
            },
            stevendiaz: {
                name: "Steven Diaz",
                role: "Backend, Deployment",
                bio: "I'm a graduating senior in UTCS and a coffee enthusiast.\nSelling lobsters 150gp each.",
                icon: "http://www.runescrape.lol/static/img/steven.jpg"
            },
            simplyluke: {
                name: "Luke Wright",
                role: "API, Data",
                bio: "I'm a second year Computer Science major at UT. My hobbies include water skiing and hanging with my dog.",
                icon: "http://www.runescrape.lol/static/img/luke.jpg"
            }
        }
    }
};

export default AboutConstants;