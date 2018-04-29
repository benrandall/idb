import React from 'react';
import RSSearchCard from "../components/RSSearchCard/RSSearchCard";

const RSDataUtils = {
    groupItems(data, itemsPerPage, currentPage, rowSize = 4) {
        let numItems = itemsPerPage;
        let itemsLeft = Math.min(itemsPerPage, data.length - (currentPage * itemsPerPage));

        let rows = [];
        let index = currentPage * itemsPerPage;

        let numRows = Math.ceil(numItems / rowSize);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(data[index++]);
                --itemsLeft;
            }

            rows.push(row);
        }

        return rows;
    },

    createComponentFromData(data, query) {
        if (data.reddits && data.videos && data.skills) {
            return (<RSSearchCard id={data.id}
                                  title={data.name}
                                  body={data.examine_info}
                                  searchWords={query.split(' ')}
                                  imageURL={data.icon}
                                  type="items"
                                  key={`item${data.id}`}
                                    />)
        }
        // Is a Skill
        else if (data.reddits && data.videos && data.items) {
            return (<RSSearchCard id={data.id}
                                  key={`skill${data.id}`}
                                  imageURL={data.icon}
                                  searchWords={query.split(' ')}
                                  body={data.description}
                                  title={data.name}
                                  type="skills"/>)
        }
        else if (data.video_url) {
            return (<RSSearchCard id={data.id}
                                  key={`video${data.id}`}
                                  imageURL={data.icon}
                                  title={data.name}
                                  searchWords={query.split(' ')}
                                  type="community"/>);
        }
        // Is a reddit item
        else if (data.skills && data.items) {
            return (<RSSearchCard id={data.id}
                                  key={`reddit${data.id}`}
                                  imageURL={`${process.env.REACT_APP_API_HOST}/images/reddit-logo.jpg`}
                                  searchWords={query.split(' ')}
                                  title={data.title}
                                  externalURL={data.url}/>);
        } else {
            return (<h1>ERROR</h1>);
        }
    }
};

export default RSDataUtils;