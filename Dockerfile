FROM python:3.6.1

ARG REACT_ENV=PROD

RUN pip install uwsgi

# Set up Nginx
ENV NGINX_VERSION 1.9.11-1~jessie

RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
    && echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list \
    && apt-get update \
    && apt-get install -y ca-certificates nginx=${NGINX_VERSION} gettext-base \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get install sudo -y \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
    && sudo apt-get install apt-transport-https \
    && sudo apt-get update && sudo apt-get install yarn \
    && curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
    && sudo apt-get install -y nodejs \
    && sudo apt-get install tree \
    && sudo apt-get -y install postgresql postgresql-client

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80 443
# Finished setting up Nginx


# Make NGINX run on the foreground
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
# Remove default configuration from Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copy the modified Nginx conf
COPY config/nginx.conf /etc/nginx/conf.d/
# Copy the base uWSGI ini file to enable default dynamic uwsgi process number
COPY config/uwsgi.ini /etc/uwsgi/


# Install Supervisord
RUN apt-get update && apt-get install -y supervisor \
&& rm -rf /var/lib/apt/lists/*
# Custom Supervisord config
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./backend /backend
COPY ./frontend /frontend
WORKDIR /backend

CMD ["/usr/bin/supervisord"]

#########################################

RUN pip install flask
COPY config/nginx.conf /etc/nginx/conf.d/

COPY requirements.txt /tmp/

RUN pip install -U pip
RUN pip install -r /tmp/requirements.txt
WORKDIR /frontend
RUN python build.py $REACT_ENV;
#RUN cd static/; yarn install; yarn build

WORKDIR /backend
COPY ./backend /backend
