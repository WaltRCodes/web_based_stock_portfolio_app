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
