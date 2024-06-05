
const axios = require('axios');

// Function to create an invitation from the issuer
async function createInvitation(issuerUrl="http://0.0.0.0:5001") {

        let invitation;

        await axios.post(issuerUrl+"/connections/create-invitation",{}).then((response)=>{

            console.log("Success!!..Invitation Generated !!..");
            
            // Storing the generated invitation from the response
            invitation=response.data.invitation;

        }).catch((error)=>{
            // Logging the error response in case of failure
            console.log("Failed!!..Invitation Generation Failed...");
            console.log(error.response);
        });

    // Returning the generated invitation
        return invitation;
}



async function start(issuerUrl="http://0.0.0.0:5001"){

    // Creating an invitation using the createInvitation function
    const invitation= await createInvitation(issuerUrl);

    // Logging the created invitation to the console
    console.log("Invitation: ",invitation);


    

}

// Starting the process
start();











