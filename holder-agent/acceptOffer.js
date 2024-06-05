const axios=require('axios');
const delay=require('../lib/delay')

// Function to receive and process a credential from the holder's URL
async function receiveCred(holderUrl="http://0.0.0.0:6001/"){

    let credExId;

    // Fetching credential records from the holder's URL
    await axios.get(holderUrl+"issue-credential/records").then((response)=>{


    // Checking if the credential is for "Org1-CA"
    if(response.data.results[0].credential_proposal_dict.credential_proposal.attributes[0].value != "Org1-CA"){
        console.log("Accepting Certificate failed, because it is not for Org1-CA");
    }

    else{

        console.log("Records Fetched... !!");

        // Storing the credential exchange ID
        credExId=response.data.results[0].credential_exchange_id

        console.log(credExId);
    
    }

    }).catch((error)=>{

    console.log("Failed...!!");
    console.log(error);
    return error;

    })

    // Sending a request to receive the credential
    await axios.post(holderUrl+`issue-credential/records/${credExId}/send-request`).then((response)=>{

        console.log("Sent Cred Request... !!");
    
        }).catch((error)=>{
    
        console.log("Failed...!!");
        console.log(error);
        return error;
    
        })

        // Waiting for 5 seconds
        await delay(5000);

    await axios.get(holderUrl+'issue-credential/records').then((response)=>{

        console.log("Records Fetched... !!");

        // Updating the credential exchange ID
        credExId=response.data.results[0].credential_exchange_id
        
        }).catch((error)=>{
        
        console.log("Failed...!!");
        console.log(error.response.data);
        return error;
        
        })
        

        // Storing the received credential in the wallet
        await axios.post(holderUrl+`issue-credential/records/${credExId}/store`).then((response)=>{

            console.log("Storing to Wallet... !!");
        
            }).catch((error)=>{
        
            console.log("Failed...!!");
            console.log(error.response.data);
            return error;
        
            })
    

}

// Function to start the credential receiving process
async function start(){

    await receiveCred()

}


// Starting the process
start()