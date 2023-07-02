var http = require('http') // Import HTTP library
var fs = require('fs') // Import filesystem library
var url = require('url') // Import file URL library
var path = require("path") // Import file path library
var mime = require("mime-types") // Import mime (file type) library; Requires dependency 'mime-types'
// var express = require('express') // Import ExpressJS superset framework

/*
 * Initialize Global variables
 */

// Mutable variables
// var INDEX_FILE = "index"
var html_Contents = "";

// Environment variables
var INDEX_FILE = process.env.INDEX_NAME;   // Webpage's index page name
var index_file_Extension = process.env.PAGE_EXT; // Webapp's Page extension; i.e. html, php etc
var project_Name = process.env.PROJECT_NAME; // Project name
var HOST = process.env.HTTP_HOST; // Server host domain
var PORT = process.env.HTTP_PORT; // Server port number
var PUBLIC_FOLDER = process.env.PUBLIC_FOLDER; // Application 'public' folder location containing static files to serve

/* Check for empty values */

// Check if the webpage file name is provided
if (!INDEX_FILE)
{
    INDEX_FILE = "index"
}

// Check if the webapp file extension is provided
if (!index_file_Extension)
{
    index_file_Extension = "html"
}

// Check if project name is defined
if (!project_Name)
{
    project_Name = ""
}

// Check if port is defined
if (!PORT)
{
    PORT = 8080;
}

// Check if port is defined
if (!HOST)
{
    HOST = "localhost";
}

// Check if Public folder is defined
if (!PUBLIC_FOLDER)
{
    PUBLIC_FOLDER = "/public"
}

// Constant values
const lookup = require("mime-types").lookup;
// const app = express()
const PROTOCOL = "http";
// const HOST = "localhost";
// const PORT = 8080;
const PUBLIC_DIR_PATH = __dirname + '/' + PUBLIC_FOLDER + '/';
const INDEX_FILE_NAME = './app/' + project_Name + '/' + INDEX_FILE + '.' + index_file_Extension

/* Server Functions */

// Load static files
// app.use("/", express.static(path.join(__dirname, PUBLIC_FOLDER)))

// Create the server event handler
var server = http.createServer(function(request, response) {
    // Create server function object
    
    // Define variables

    // Write page header
    response.writeHeader(200, {"Content-Type": "text/html"}); 

    let parsedURL = url.parse(request.url, true); // Handle the request and send back a static file from a public folder (Default: called 'public')
    let filepath = parsedURL.path.replace(/^\/+|\/+$/g, ""); // Remove the leading and trailing slashes

    // Check path default
    if(filepath == "")
    {
        filepath = INDEX_FILE + '.' + index_file_Extension;
    }

    console.log(`Requested file: ${filepath}`);

    let file = PUBLIC_DIR_PATH + filepath; // Initialize public folder path
    var file_ext = path.extname(file) // Get extension of the file

    // DEBUGGING
    // console.log(`Checking file URL : ${file}`);

    // async read file function uses callback functions
    // To read static files to serve
    fs.readFile(file, function(err, content) {
        if(err)
        {
            /*
             * Error: File not found
             */
            console.log(`File not found ${file}`);
            response.writeHead(404);
            response.end();
        }
        else
        {
            // File found
            // Specify content type in the response
            
            console.log(`Returning ${filepath}`);

            // response.setHeader("X-Content-Type-Options", "nosniff");
            let mime = lookup(filepath);
            response.writeHead(200, {"Content-type": mime});

            response.write(content)
            response.end()
        }
    });
});

// Listen to the server
server.listen(PORT, () => {
    console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`);

    if(!project_Name)
    {
        project_Name = "default";
    }

    console.log(`Serving Web Application [${project_Name}]`);
});
