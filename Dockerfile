# syntax=docker/dockerfile:1
# Bazaarly storefront: build the React app, serve the static files with nginx.
# The API address is baked in at build time (Create React App reads REACT_APP_* while building).

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY public public
COPY src src
COPY tailwind.config.js ./
ARG REACT_APP_API_URL=http://localhost:5454
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
