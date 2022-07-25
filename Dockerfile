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
RUN npm run build
RUN echo "window._env_ = { REACT_APP_GIT_VERSION: $GIT_VERSION }" > build/env.config.js

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]