from main import create_app


app = create_app('postgresql://pguser:pguser@dbpostgres:5432/runescrape', debug=True)

if __name__ == "__main__":
    app.run()
