FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package.json ./
RUN npm install

ENV PORT=$PORT
ENV API_PREFIX=$API_PREFIX
ENV MONGO_URI=$MONGO_URI
ENV NODE_ENV=$NODE_ENV

COPY . .
EXPOSE 8000
CMD ["npm", "start"]
