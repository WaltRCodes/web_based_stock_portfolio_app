/*
This is the first page of the web-based stock portfolio app. 
The design was supposed to feature functions ready to call a database to check if the user's email and password were found in the user table. 
However, I was not able to setup the database properly in time.
The code starts by calling the http module in order to create a web server instance for the code to run.
 */
let http=require('http')
/* 
Then I call the createServer function in order to create the web page.
*/
let server=http.createServer((function(request,response)
{
	response.writeHead(200,
	{"Content-Type" : "text/html"});
    response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif&display=swap" rel="stylesheet">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <style>
                #main{
                    display: flex;
                    flex-direction: column;
                    border:solid 2px silver;
                    align-items: center;
                    font-family: 'IBM Plex Serif';
                }
                button, input{
                    width: 100%;
                }
                form{
                    padding-top: 20px;
                    padding-bottom: 20px;
                }
                p{
                    display:none;
                }
            </style>
        </head>
        <body>
            <div id="main">
                <h1>Login</h1>
                <form>
                    <label for="user">Login:</label>
                    <input type="text" id="email" placeholder="email">
                    <br />
                    <label for="password">Password:</label>
                    <input type="password" id="password"  placeholder="password">
                    <br />
                    <p id="success">Success!</p>
                    <p id="fail">The corresponding login and password were not found.</p>
                    <br />
                    <button type="button" id="login">Submit</button>
                    <br />
                    <br />
                    <button type="submit" formaction="./pages/registration.html">Dont have an account yet? We can help with that!</button>
                </form>
            </div>
        </body>
        </html>
    `);
}));
server.listen(7000);