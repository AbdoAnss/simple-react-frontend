# Build phase
FROM denoland/deno:latest as builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json deno.lock ./

# Copy configuration files
COPY vite.config.js postcss.config.js tailwind.config.js ./
COPY eslint.config.js ./

# Install dependencies
RUN deno install

# Copy source code
COPY index.html ./
COPY public/ public/
COPY src/ src/

# Build the application
RUN deno task build

# Production phase
FROM nginx:alpine

# Copy the built assets
COPY --from=builder /app/dist /usr/share/nginx/html


RUN echo '                                 \
server {                                   \
    listen 80;                             \
    root /usr/share/nginx/html;            \
    location / {                            \
        try_files $uri $uri/ /index.html;   \
    }                                       \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]