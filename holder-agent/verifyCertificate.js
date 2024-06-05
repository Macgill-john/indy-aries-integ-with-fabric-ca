const axios=require('axios');


//Function to verify, the generated certificate is valid or not
async function verifyCertificate(issuerUrl="http://0.0.0.0:5001",rev_reg_id) {

        let status;

        await axios.get(issuerUrl+`/revocation/registry/${rev_reg_id}`).then((response)=>{

            
            // Getting the state of the certificate
            status=response.data.result.state;

            

            if(status=="active"){
                console.log("Certificate is active and Valid..!!");
            }
            else{
                console.log("Certificate not Valid..!!");
            }

        }).catch((error)=>{

            // Logging the error response in case of failure
            console.log("Failed!!..Failed to get the state or Certificate not valid...");
            console.log(error);
        });
}


async function start(issuerUrl="http://0.0.0.0:5001"){

    const rev_reg_id='<rev_reg_id generated in fetchCred program>';

    // Calling verifyCertificate function
    await verifyCertificate(issuerUrl,rev_reg_id);
}

// Starting the process
start();