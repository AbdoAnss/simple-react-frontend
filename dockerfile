# Build phase
FROM denoland/deno:latest as builder
WORKDIR /app
# Copy package files first for better caching
COPY package*.json deno.lock ./

COPY .env ./
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

# Créer un fichier mime.types personnalisé
RUN echo $'types {\n\
    text/html                                        html htm shtml;\n\
    text/css                                         css;\n\
    application/javascript                           js;\n\
    image/svg+xml                                    svg svgz;\n\
}\n' > /etc/nginx/mime.types

RUN echo $'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    include /etc/nginx/mime.types;\n\
    \n\
    location ~ \\.js$ {\n\
        add_header Content-Type application/javascript;\n\
        try_files $uri =404;\n\
    }\n\
    \n\
    location ~ \\.css$ {\n\
        add_header Content-Type text/css;\n\
        try_files $uri =404;\n\
    }\n\
    \n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]