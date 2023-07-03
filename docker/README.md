# Node Web Server with Docker

## Setup
### Dependencies
+ docker

### Pre-Requisites
- Symlink/copy your Dockerfile image of choice to be the primary Dockerfile
    - Using symlink
        ```console
        ln -sf Dockerfile.<image> Dockerfile
        ```
    - Copying
        ```console
        cp Dockerfile.<image> Dockerfile
        ```

## Documentation
### Usage
- Build Dockerfile image
    - Using `docker build`
        - Pre-Requisite
            + cd to project root (in this case, `cd ..`)
        - Build
            ```console
            docker build --tag thanatisia/node-web-server -f docker/Dockerfile .
            ```
- Startup docker container
    - Using `docker run`
        ```console
        docker run -itd --name node-web-server -v "/path/to/web-app/[project-name]:/web/app/[project-name]" -p "8080:8080" thanatisia/node-web-server
        ```
    - Using `docker-compose`
        ```console
        docker-compose up -d {--build}
        ```
- Start a stopped docker container
    - Using `docker container`
        ```console
        docker start node-web-server
        ```
    - Using `docker-compose`
        ```console
        docker-compose start node-web-server
        ```
- Stop a running docker container
    - Using `docker container`
        ```console
        docker stop node-web-server
        ```
    - Using `docker-compose`
        ```console
        docker-compose stop node-web-server
        ```
- Restart a running docker container
    - Using `docker container`
        ```console
        docker restart node-web-server
        ```
    - Using `docker-compose`
        ```console
        docker-compose down && docker-compose up -d {--build}
        ```
- Remove/Delete/Teardown a docker container
    - Using `docker container`
        ```console
        docker rm node-web-server
        ```
    - Using `docker-compose`
        ```console
        docker-compose down
        ```

## Wiki
### Snippets and Examples
- Startup container with server
    ```console
    docker run -itd --name node-web-server -v "$PWD/src/app/:/web/app/" -p "8084:8080" thanatisia/node-web-server && \
    docker exec -it node-web-server node server.js
    ```

- Order of Operation
    ```console
    # Build Dockerfile image
    docker build --tag thanatisia/node-web-server -f docker/Dockerfile .

    # Startup container
    docker run -itd --name node-web-server -v "$PWD/src/app/:/web/app/" -p "8084:8080" thanatisia/node-web-server && \
        # Perform in-container command execution
        docker exec -it node-web-server node server.js

    # Stop container
    docker stop node-web-server

    # Delete/Remove/Shut/Teardown container
    docker rm node-web-server
    ```

- To execute commands with environment variable
    ```console
    docker exec -it node-web-server /bin/bash -c "PROJECT_NAME=[project-name] node server.js
    ```

### Configuration
- Docker 
    - Container filesystem structure
        ```
        /
        |
        |-- web/
            |
            |-- server.js : The NodeJS Webserver
            |-- app/
                |
                |-- [project-name]/
                    |
                    |-- index.extension
        ```
    - Volume Mount Points
        - Container:
            + Web Server: /web/server.js
            + Project application Root folder: /web/app/[project-name]/

- docker-compose
    - docker-compose configuration file
        ```yaml
        version: "3.7"
        services:
            node-web-server:
                image: thanatisia/node-server:latest
                container_name: node-web-server
                build: .
                restart: unless-stopped
                ports:
                    # Port mapping/forwarding from host system into container
                    # - [host-domain]:[host-system-port]:[container-port]
                    - "8080:8080"
                volumes:
                    # Mount volumes from host system into container
                    # - [host-system-volume]:[container-volume]:[permission]
                    - "./path/to/webapp/[project-name]:/web/app/[project-name]
        ```


