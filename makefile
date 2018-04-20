# Makefile specification
# ----------------------

# make issues   - prints link to current phase's issues
issues:
	@echo "https://github.com/benrandall/idb/issues"

# make github   - prints link to github repo
github:
	@echo "https://github.com/benrandall/idb"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://github.com/benrandall/idb/projects/6"

# make uml      - prints link to uml diagram
uml:
	@echo "https://benrandall.gitbooks.io/report/content/uml-diagram.html"

# make selenium - runs selenium tests
selenium:
	cd frontend \
	&& python guitests.py

yarn-install:
	@cd frontend    \
	&& yarn install

yarn-build-css:
	@cd frontend \
	&& yarn build-css

# make frontend - runs frontend tests
frontend: yarn-install yarn-build-css
	@cd frontend \
	&& yarn test

# make backend  - runs backend tests
backend:
	cd backend \
	&& python tests.py

# make website  - prints link to a website
website:
	@echo "http://www.runescrape.lol/"

# make report   - prints link to technical report
report:
	@echo "https://benrandall.gitbooks.io/report/content/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://benrandall.gitbooks.io/api/content/"

# make self     - prints link to self critique
self:
	@echo "https://benrandall.gitbooks.io/report/content/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "https://benrandall.gitbooks.io/report/content/other-critique.html"
