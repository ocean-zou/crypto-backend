FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY package.json ./
RUN npm install

# Set environment variables
ARG PORT
ARG API_PREFIX
ARG MONGO_URI
ENV PORT=${PORT}
ENV API_PREFIX=${API_PREFIX}
ENV MONGO_URI=${MONGO_URI}

COPY . .
EXPOSE 3001
CMD ["npm","start"]