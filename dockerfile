FROM node:20.9.0-alpine as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:20.9.0-alpine as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM nginx:1.23.3 as prod
EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY public/img/ /usr/share/nginx/html/public/img
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx","-g","daemon off;"]