/* 
This is the portfolio page where the stock info is pulled from IEXCloud. I used the iexcloud_api_wrapper module to pull the stock info.
Then I draw its information out into an object for storing the symbols and pricing while an array stores the list that will be populated into the webpage.
First you can see the object creation.
*/

let object = {};
let array = [];
/*
Then I need to change enviroment variables in order for the module to acess IEXCloud. I know it is bad practice to put an API key in the code itself.
However, IEXCloud documentation states that one of the keys you get are publishable which is the one I am using below.
 */
process.env.IEXCLOUD_API_VERSION = "stable";
process.env.IEXCLOUD_PUBLIC_KEY = "pk_4e60ef6ed32f470b879c3afc392ebdec";
//Here I call the iexcloud_api_wrapper module
const  iex = require( 'iexcloud_api_wrapper' )
//asynchronous functions are used to properly call the stock data. None asynchronous functions return an incomplete variable/object
//this function draws the latest price of a share
const quote = async (sym) => {
    const quoteData = await iex.quote(sym);
    return quoteData['latestPrice'];
};
//this function populates and array with all the stock symbols drawn from IEXCloud
const getSymbols = async (arrParam) => {
    const arrayData = await iex.iexSymbols();
    let i = 0;
    for(let data of arrayData){
        arrParam.push(data['symbol']);
        i++;
    }
};
//this function populates the object with the stock names and prices while also populating the array with the list elements that will be displayed on the webpage.
const fillObject = async (objParam,arrayParam) =>{
    let symbols = [];
    await getSymbols(symbols);
    
    for(let symbol of symbols){
        objParam[symbol] = await quote(symbol);
        arrayParam.push(`<li tabindex="1" id=${symbol} value=${object[symbol]}>Buy ${symbol} at ${object[symbol]} per Share!</li><br>`);
    }
}
//Here is the call of the fill function and the creation of the server object that will display the webpage
fillObject(object,array);
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
          <title>Portfolio</title>
          <style>
             *{
                margin:0;
                padding:0;
                font-family: 'IBM Plex Serif';
                font-weight:bolder;
             }
             nav{
                font-size: larger;
                display: flex;
                flex-flow: row;
                justify-content: space-evenly;
                background-color: aquamarine;
                padding-top: 25px;
                border: #1A7E43 solid 2px;
                border-style: none none solid none;
             }
             body{
                background-size: 100vw 100vw;
                transition: all 2s;
                color:#1A7E43;
             }
             /*I'm still trying to get the above to transition properly. The idea is for the text to slide from 
             left to right depending on whether the user is viewing the portfolio or transactions. 
             If I get it to work, the transactions page content can be moved to this page. Also I still need to add a log out button somewhere on the page.*/
             .parent {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 80px 1fr;
                grid-template-areas:
                "nav nav"
                "article aside";
             }
             .parent > .nav {
                grid-area: nav;
             }
             .parent > .article {
                grid-area: article;
             }
             .parent > .aside {
                grid-area: aside;
             }
             article{
                display: flex;
                flex-flow: column;
                align-items: center;
                padding-top: 25px;
             }
             aside{
                display: flex;
                flex-flow: column;
                align-items: center;
                padding-top: 10px;
                margin-top: 15px;
                margin-right: 15px;
                border: #1A7E43 solid 2px;
                border-radius: 20px;
             }
             button{
                text-align: center;
                width: 100%;
             }
             form{
                padding: 20px;
             }
             li{
                list-style: none;
                border: 1px;
                border-style: solid none solid none;        
             }
             li:focus {
                background-color: yellow;
                outline: none;
             }
             ul{
                padding: 10px;
             }
             a:link, a:visited {
                text-decoration: none;
             }
             a:hover{
                text-decoration:underline;
             }
             h1{
                text-align: center;
             }
          </style>
       </head>
       <body>
          <div class="parent">
             <nav class="child nav">
                   <p>Portfolio</p>
                   <p><a href="transactions.html">Transactions</a></p>
                   <p><a href="..\login.html">Log Out</a></p>
             </nav>
             <article class="child article">
                <h1>Portfolio - $5,000.00</h1>
                <ul id="stocks">
                   ${array.join('')}
                </ul>
             </article>
             <aside class="child aside">
                <h1>Cash - Balance</h1>
                <form>
                   <input type="text" id="ticker" placeholder="Ticker">
                   <br />
                   <br />
                   <input type="text" id="qty" placeholder="Qty">
                   <br />
                   <br />
                   <button type="button" onclick="
                   let symbol = document.getElementById('ticker').value;
                   let qty = document.getElementById('qty').value;
                   alert('Congrats! You just bought '+ qty +' shares from ' + symbol +'!');
                   ">Buy</button>
                </form>
             </aside>
          </div>
       </body>
    </html>
    `);//in the above html text, I called the array.join function in order to display all list elements in the array as readable html.
}));
server.listen(process.env.PORT);
//process.env.PORT is the heroku port
