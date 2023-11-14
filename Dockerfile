FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY . /app

ARG PORT
ARG API_PREFIX
ARG MONGO_URI
ARG NODE_ENV
ENV PORT=${PORT}
ENV API_PREFIX=${API_PREFIX}
ENV MONGO_URI=${MONGO_URI}
ENV NODE_ENV=${NODE_ENV}

COPY . /app
EXPOSE 8000
CMD ["npm","start"]
