/*
This is the transactions page that would have hosted the orders that the user had placed. The databased housed an
orders table with user email as the primary key, which stock they bought, how much it cost, and how many shares were purchased with the order.
Functions would have queried the table and populated the below page with the order information.
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
                <title>Transactions</title>
                <style>
                    *{
                        margin:0;
                        padding:0;
                        font-family: 'IBM Plex Serif';
                        font-weight:bolder;
                    }
                    nav{
                        display: flex;
                        flex-direction: row;
                        font-size: larger;
                        justify-content: space-evenly;
                        padding-top: 25px;
                        padding-bottom: 30px;
                        border: #1A7E43 solid 2px;
                        border-style: none none solid none;
                        background-color: aquamarine;
                    }
                    body {
                        background-size: 100vw 100vw;
                        transition: all 2s;
                        color:#1A7E43;
                    }
                    li{
                        list-style: none;
                        border: 1px;
                        border-style: solid none solid none;
                        
                    }
                    ul{
                        padding: 10px;
                    }
                    a{
                        text-align: left;
                    }
                    main{
                        padding-top: 20px;
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    a:link, a:visited {
                        text-decoration: none;
                    }
                    a:hover{
                        text-decoration:underline;
                    }
                </style>
            </head>
            <body>
                <nav>
                    <p><a href="portfolio.html">Portfolio</a></p> 
                        <p>Transactions</p>  
                        <p><a href="..\login.html">Log Out</a></p>
                </nav>
                <main>
                    <h1>Transactions</h1>
                    <ul id="stocks">
                        <li>BUY (AAPL) - 6 Shares @ 300.00</li>
                    </ul>
                </main>
            </body>
            </html>
    `);
}));
server.listen(7000);