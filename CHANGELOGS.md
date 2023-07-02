# CHANGELOGS

## Table of Contents
+ v0.1.0, 2023-07-01 1640H
+ v0.2.0, 2023-07-02 1409H

## Logs
### v0.1.0
+ Initial Commit
+ Added NodeJS custom webserver
+ Added Dockerfile and docker folder
+ Added docker-compose file

### v0.2.0
- Fixed NodeJS webserver of the following bugs
    - Issue loading static files on server-side: 
        - Webserver can now load static files from 
            + the same directory as the index page, 
            + the '/public' directory (recommended) and 
            + your custom public directory path
- Code Refactor
    - Imported library 'mime' to manage/handle all File extension detection issues
    - Server function has now been modified to utilise mime to autoload static files and page contents
- New Features
    - New Environment Variables
        + PUBLIC_FOLDER: Specify your custom static files directory; Default is 'app/public'

