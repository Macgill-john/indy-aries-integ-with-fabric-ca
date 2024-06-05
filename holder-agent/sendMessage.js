const axios = require('axios');
const getConnectionId=require('../lib/getConnectionId');
const delay=require('../lib/delay');


// Function to send messages between issuer and holder
async function sendMessages(connectionId,issuerSendMessage="http://0.0.0.0:5001/connections",holderSendMessage="http://0.0.0.0:6001/connections"){

    // Loop to send messages 10 times
    for (let i = 0; i < 10; i++) {


        // Sending message from Issuer to Holder
        await axios.post(`${issuerSendMessage}/${connectionId.holderConnectionId}/send-message`,{"content":"Hello from Issuer"}).then((response)=>{

            console.log("Success!!..Message Sent from Issuer!!..");
            

        }).catch((error)=>{

            console.log("Failed!!..Message not sent !!...");
            console.log(error.response.data);
        });

        
        // Delay of 5 seconds
        await delay(5000);
        

        // Sending message from Holder to Issuer
        await axios.post(`${holderSendMessage}/${connectionId.issuerConnectionId}/send-message`,{"content":"Hello from Holder"}).then((response)=>{

            console.log("Success!!..Message Sent from Holder!!..");
            

        }).catch((error)=>{

            console.log("Failed!!...Message not sent!!...");
            console.log(error.response.data);
        });
        
    }
    
}

// Function to start the message sending process
async function start(){
    
    // Getting connection IDs
    connectionId=await getConnectionId();
    console.log(connectionId);

    // Sending messages
    await sendMessages(connectionId);
}

start()