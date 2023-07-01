# Dockerfile for NodeJS Web server

## Pull Base Image
FROM debian:latest

## Set Environment Variables
### ENV PAGE_EXT="html"
### ENV PROJECT_NAME="project"

## Copy dependencies and required files
COPY src/server.js /web/server.js

## Set Current working directory
WORKDIR /web/

## Update package manager and packages
RUN DEBIAN_FRONTEND=noninteractive apt update -y && \
    apt upgrade -y && \
    ## Install other dependencies \
    apt install -y vim git nodejs

## Expose Ports
EXPOSE 8080

## Set Entry Point 
ENTRYPOINT "/bin/bash"

## Set startup Command
## CMD ["node", "server.js"]

