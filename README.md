# idb

## Backend (Flask App) Setup

### Install

```
$ virtualenv -p python3 venv
$ source venv/bin/activate
$ (venv) pip install -r requirements.txt
```

### Environment variables

In order to set the Github Token API in the environment
so that the About page can load, you must obtain
a token from Github and set it in your environment.

- Go to https://github.com/settings/tokens
- Click "Generate New Token"
- Give it repo permissions
- Copy the token

### Set up elasticsearch
```
$ brew install elasticsearch
$ brew services start elasticsearch
```

Elasticsearch should be running on http://localhost:9200. You can confirm this works with
```
$ curl localhost:9200
```

### Add `.flask_environment` to backend/ folder
```
DATABASE_URL=postgres://localhost/db_name
ELASTICSEARCH_URL=<url>
GITHUB_API_TOKEN=<token>
```

### Running the backend
```
$ cd backend/
$ export FLASK_APP=run.py
$ flask db_import
$ flask run
```

### Running the backend tests
You *must* have a Github API Token in your local environment
```
$ cd backend/
$ python tests.py
```

## Frontend (React App) Setup
If you want to run the application locally, you need to create the file `.env.development.local` in the frontend directory. 
This file is already within the gitignore as it should **never** be version controlled.
The file should contain the entry:
```
REACT_APP_API_HOST=http://127.0.0.1:5000
```

### Steps to build the React
In a new terminal window from your running backend app:
```
$ cd frontend/
$ yarn install
$ yarn build-css
$ yarn start
```

## Deployment

### Docker
Our application uses Docker images to create an easily deployable application. We have packaged the docker commands within our `deploy.py` script.

### deploy.py
In order to use this script, you must first set the `STAGE` environment variable. This can be done at call time.

#### base
Builds the base system for our application to run on. *NOTE* this does not need to be run every time. 
Unless part of the environment for the app changes, it will only need to be run once

#### app
Packages flask and react into an image that extends the base image. The compile time for app is significantly 
faster than the base image's compile time. Run this action when you are pulling from git to deploy updated frontend/backend

#### install-schema
Executes the `import_fixture.py` script within the docker image. 
*NOTE* this command must be run after the application has been started


### Docker-Compose
We also utilize Docker-Compose to handle both the database and application running/linking.

#### Starting the application
Once the deployment has been done, you can start the application with `sudo docker-compose up -d`
The `-d` option detatches the window from the new process

#### Stopping the application
To stop the application, use the command `sudo docker-compose down`

### Example: Fresh Build
If building a fresh instance of our application on a DEV server, you would run:
```
$ STAGE=DEV ./deploy.py base app
$ sudo docker-compose up -d
$ ./deploy.py install-schema
```
At this point, the application will be running with sample data

### Example: Update build
If the frontend gets updated or a python route gets changed, we can run a simplified and (much) faster deployment process
```
$ sudo docker-composer down
$ STAGE=DEV ./deploy.py app
$ sudo docker-composer up -d
```

### Valid Stages
`DEV` => http://dev.runescrape.lol
`PROD` => http://runescrape.lol
`LOCAL` => localhost:5000
