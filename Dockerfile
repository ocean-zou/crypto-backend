FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package.json ./
RUN npm install

# Set environment variables
ARG PORT
ARG API_PREFIX
ARG NODE_ENV
ARG MONGO_URI
ENV PORT=${PORT}
ENV API_PREFIX=${API_PREFIX}
ENV MONGO_URI=${MONGO_URI}
ENV NODE_ENV=${NODE_ENV}

COPY . .
EXPOSE 8000
CMD ["npm","start"]