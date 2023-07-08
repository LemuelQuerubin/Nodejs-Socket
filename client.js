console.clear()
const net = require('net');
const client = net.createConnection({ port: 3000 }, () => {});


//Getting input from client
async function inputData(){
  console.log('You are now connected to the server');
  console.log("\n---CALCULATOR---\n")

  const prompt = require("prompt-sync")();     //npm install prompt-sync
  let input1 = parseInt(prompt("input 1: "));
  let operator = prompt("operator: ");
  let input2 = parseInt(prompt("input 2: "));

  const data = await { input1, operator, input2 };

  // Sendind data to the server
  client.write(JSON.stringify(data));
};


// Receiving data from the server
function receiveData(){
  client.on('data', (response) => {
    const { result } = JSON.parse(response.toString());
    console.log("\n----------------\n")
    console.log(`Result from server: ${result}\n\n`);
    
    setTimeout(() => {
      client.end();  // Ending the connection
    }, 2000);  
  });
}; 



inputData();
receiveData();

