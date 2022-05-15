FROM nginx:1.17.1-alpine
RUN npm install
RUN ng build
COPY /dist/gestaodeclientesweb /usr/share/nginx/html