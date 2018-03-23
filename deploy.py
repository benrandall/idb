#!/usr/bin/env python3

import os
import sys
from shutil import copyfile
from subprocess import call

def run(command: str) -> None:
    print("$", command)
    call(command.split())

def main():
    print('---- Deploying Runescrape ----')
    env = os.environ.get('STAGE')
    print('---- Using stage: %s ----' % env)

    if 'base' in sys.argv:
        print('---- Building Base Image ----')
        run('docker build --no-cache -f Dockerfile-Base -t runescrape-base:latest .')

    if 'app' in sys.argv:
        print('---- Building Application Image ----')
        run('docker build --no-cache -f Dockerfile-Runescrape -t runescrape:latest . --build-arg REACT_ENV=%s' % env)

    if 'install-schema' in sys.argv:
        print('---- Installing Database Schema ----')
        run('docker exec -it idb_web_1 sh -c "python3 import_fixture.py"')

if __name__ == "__main__":
    main()
