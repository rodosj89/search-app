FROM node:18 as build

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL
RUN echo $REACT_APP_BACKEND_URL

COPY . /usr/src/app 
WORKDIR /usr/src/app
#COPY package.json ./
#COPY . ./

ENV NODE_OPTIONS --openssl-legacy-provider

RUN npm install
RUN npm run build


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
COPY --from=build --chown=nginx:nginx /usr/src/app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx/nginx.conf /etc/nginx/conf.d/default.conf

# add permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

# switch to non-root user
USER nginx

EXPOSE 8080
# tells Nginx to stay in the foreground
CMD ["nginx", "-g", "daemon off;"]  
