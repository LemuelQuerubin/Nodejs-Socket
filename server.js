console.clear()
const net = require('net');


const server = net.createServer((socket) => {
    console.log('\nA client is connected to the server');


  // receiving data from the client
  socket.on('data', (data) => {
    console.log(`\nInput data from client: ${data}`);

    // Parse the data received from the client
    const { input1, operator, input2 } = JSON.parse(data);


    // Perform the operation
    switch (operator) {
      case '+':
        result = (input1 + input2);
        break;
      case '-':
        result = (input1 - input2);
        break;
      case '*':
        result = (input1 * input2);
        break;
      case '/':
        result = (input1 / input2);
        break;
      default:
        result = 'Invalid operation';
    }

    const response = {
      result: result
    };

    // Sending response to the client
    console.log(`\nSending result to the client`);
    socket.write(JSON.stringify(response));
  });


  // if the client connection terminate
  socket.on('end', () => {
    console.log('\nThe client is disconnected from the server');
  });

});


// Starting the server 
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server started`);
});