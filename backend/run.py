from main import create_app

app = create_app('postgresql://localhost/postgres', debug=True)

if __name__ == "__main__":
    app.run()
