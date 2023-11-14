FROM alpine:latest
RUN apk add --no-cache nodejs yarn

WORKDIR /app
COPY package.json yarn.lock /app/
RUN npm install

COPY . /app
EXPOSE 8000
CMD ["npm","start"]