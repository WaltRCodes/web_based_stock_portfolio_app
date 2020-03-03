/*
This is the registration page. Had the database been set up, there would be functions querying the database in order to
check if the email addres in the registration form had been used. If the email was valid and not found in the database, the
end result would have had the success paragraph appear. Otherwise, the fail paragraph would appear instead. The user table would house
 email, name, balance, and a salted hashed password.
*/
let http=require('http')
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
                <title>Registration</title>
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
                    a:link, a:visited {
                        text-decoration: none;
                    }
                    a:hover{
                        text-decoration:underline;
                    }
                    p{
                        display:none;
                    }
                </style>
            </head>
            <body>
                <div id="main">
                    <h1>Registration Page</h1>
                    <form>
                        <label for="user">Name:</label>
                        <input type="text" id="user" placeholder="name">
                        <br />
                        <label for="email">Email:</label>
                        <input type="email" id="email" placeholder="email">
                        <br />
                        <label for="password">Password:</label>
                        <input type="password" id="password" placeholder="password">
                        <br />
                        <p id="success">Success! An email has been sent to your account for confirmation.<a href="..\login.html">Click here to head back to the login page</a></p>
                        <p id="fail">Oh no! There was an issue with your submission. Try checking that your email fits the criteria and has an '@' symbol followed by a domain.</p>
                        <br />
                        <button id="registration" type="button">Submit</button>
                    </form>
                </div>
            </body>
            </html>
    `);
}));
server.listen(7000);