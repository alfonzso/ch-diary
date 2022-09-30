# build environment
FROM node:16-alpine as build
ARG GIT_VERSION
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
# RUN mv .env.prod .env
RUN apk add --no-cache --upgrade grep bash
RUN npm run genEnv && npm run build
# RUN echo "window._env_ = { REACT_APP_GIT_VERSION: $GIT_VERSION }" > build/env.config.js
# RUN echo "window._env_ = { };" > build/localEnvs.js
# RUN echo " const localEnvs = { REACT_APP_GIT_VERSION: '$GIT_VERSION' } " > build/localEnvs.js

# production environment
FROM nginx:stable-alpine
ARG GIT_VERSION
ENV REACT_APP_GIT_VERSION ${GIT_VERSION:-".-undef-."}

RUN apk add --no-cache tzdata && \
    echo "Europe/Budapest" >  /etc/timezone && \
    cp /usr/share/zoneinfo/Europe/Budapest /etc/localtime

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY 99-replace-env.sh /docker-entrypoint.d/

RUN chmod +x /docker-entrypoint.d/99-replace-env.sh

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]