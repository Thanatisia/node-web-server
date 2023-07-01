var http = require('http') // Import HTTP library
var fs = require('fs') // Import filesystem library

/*
 * Initialize Global variables
 */

// Constant values
const PROTOCOL = "http";
// const HOST = "localhost";
// const PORT = 8080;

// Mutable variables
// var INDEX_FILE = "index"

// Environment variables
var INDEX_FILE = process.env.INDEX_NAME;   // Webpage's index page name
var index_file_Extension = process.env.PAGE_EXT; // Webapp's Page extension; i.e. html, php etc
var project_Name = process.env.PROJECT_NAME; // Project name
var HOST = process.env.HTTP_HOST; // Server host domain
var PORT = process.env.HTTP_PORT; // Server port number

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

/* Server Functions */

// Read webapp index page and startup server
fs.readFile('./app/' + project_Name + '/' + INDEX_FILE + '.' + index_file_Extension, function(error, html) {
    // Check for error
    if (error) throw error; 

    // No error: Create the server event handler
    var server = http.createServer(function(request, response) {
        // Create server function object

        // Write page header
        response.writeHeader(200, {"Content-Type": "text/html"}); 

        // Write the html page
        response.write(html);

        // Close response
        response.end();
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
});



