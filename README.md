# Simple NodeJS docker

```
A simple NodeJS web server that will serve webapps to be accessed from the browser.

The aim is to make it simple for you to just place another project and start it up, even when the container is running

- For Example:
    - To use it in a docker container, mount your target webapp as a volume to '/web/app/[project-name]' and it will be available for you to run by specifying through the environment variable 'PROJECT_NAME'.
```

## Information
### Project
+ Web Server: NodeJS
- Filesystem Structure
    ```
    [project-root]/
        |
        |-- src/
            |
            |-- app/
                |
                |-- index.html : Default index page
                |
                |-- [your-project-webapp-folder] : This contains your custom project folder
                    |
                    |-- index.extension : The project's index page
    ```
- Networking
    - Defaults
        + HOST: 127.0.0.1
        + PORT: 8080
        + PROTOCOL: HTTP

### System Flow:
- The NodeJS server takes in an index file 'index.html'
- User is to place the webapp's project folder in the container's project directory
- The server will be accessing through port 8080
- Access the server from the port

### Features
+ Switch between projects whenever you want
+ Simple to use and understand
+ Customizable/Modifiable

## Setup
### Pre-Requisites
- Place your target webapp project folder in the 'app' folder (as shown in the filesystem structure in [Project](#Project))
    - You can also just place every file in the project to the 'app' folder
        + If you do this, you may just serve the web server normally

### Dependencies
- On Bare Metal
    + NodeJS            : If you are running this on bare metal
- Using Docker
    + docker
    + docker(-compose) : Optional; Not required if docker >= 24.0 as 'compose' has been added to docker CLI options
- Using NodeJS
    + mime-types

### Installing
- For information regarding Docker manual setup, please refer to the [docker folder's README](docker)
- using pre-built docker-compose
    ```console
    docker-compose up -d --build
    ```

## Documentation
### Serving webapp
- Start up webserver on Bare Metal
    - Using default folders, default project and default index file 'app/index.html'
        ```console
        node server.js
        ```
    - Using custom project and default index file type (.html)
        ```console
        PROJECT_NAME=[your-project-name] node server.js
        ```
    - Using custom project other than HTML
        ```console
        PAGE_EXT=php node server.js
        ```
    - Serving default port number, default project with the files in the same directory as the index page
        ```console
        PUBLIC_FOLDER=app node server.js
        ```
    - Serving specific project, with custom port number and custom static files directory set at the same directory as the index page
        ```console
        PUBLIC_FOLDER=app HTTP_PORT=[port] PROJECT_NAME=[project-folder-name] node server.js
        ```

### Usage

## Wiki
### Snippets and Examples

## Configuration
### Environment Variables
+ HTTP_HOST     : Server host domain
+ HTTP_PORT     : Server port number
+ INDEX_NAME    : Webpage's index page name
+ PAGE_EXT      : Specify the target web application's index page extension; Default: 'html'; Valid Values: ['html', 'php', 'aspx', etc]
+ PROJECT_NAME  : Specify the target project name you want to serve
+ PUBLIC_FOLDER : Specify the public/static files directory; Default: 'app/public/'

### docker-compose configuration
- Build definitions
    + Context: .
    + Dockerfile ./docker/Dockerfile
- entrypoint: node server.js

### TODO List/Pipeline

## Resources

## References
+ DigitalOcean - Tutorials - How to create a webserver in NodeJS with the http module: https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module
+ AbstractAPI - How to get a client IP address in NodeJS: https://www.abstractapi.com/guides/how-to-get-a-client-ip-address-in-node-js

## Remarks
