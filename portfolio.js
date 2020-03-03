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
