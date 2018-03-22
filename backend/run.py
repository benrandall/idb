from main import create_app

user = os.environ['POSTGRES_USER']
pwd = os.environ['POSTGRES_PASSWORD']
db = os.environ['POSTGRES_DB']
host = 'dbpostgres'
port = '5432'

production_uri = 'postgresql://%s:%s@%s:%s/%s' % (user, pwd, host, port, db)

app = create_app(production_uri, debug=True)

if __name__ == "__main__":
    app.run()
