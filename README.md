# idb

# Install

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

## Compile the frontend
```
$ cd /static
$ yarn install
$ yarn build
```

## Run
```
$ (venv) python app.py
```

