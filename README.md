# idb

## Install

```
$ virtualenv -p python3 venv
$ source venv/bin/activate
$ (venv) pip install -r requirements.txt
```

## Environment variables

In order to set the Github Token API in the environment
so that the About page can load, you must obtain
a token from Github and set it in your environment.

- Go to https://github.com/settings/tokens
- Click "Generate New Token"
- Give it repo permissions
- Copy the token

Run
```
$ export GITHUB_API_TOKEN=<insert token here>
```

## Run the React application
If you want to run the application locally, you need to create the file `.env.development.local` in the frontend directory. 
This file is already within the gitignore as it should **never** be version controlled.
The file should contain the entry:
```
REACT_APP_API_HOST=http://127.0.0.1:5000/api
```

### Steps to build the React
```
$ cd /static
$ yarn install
$ yarn build-css
$ yarn build
```

## Running the backend
```
$ (venv) python app.py
```

