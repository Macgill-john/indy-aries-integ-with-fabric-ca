const axios=require('axios');
const fs=require('fs');


// Function to fetch credentials from the holder's URL
async function fetchCred(holderUrl='http://0.0.0.0:6001/'){

let cred={
    'certificate':undefined,
    'key':undefined
}

// Fetching credentials from the holder's wallet
await axios.get(holderUrl+'credentials').then((response)=>{

    console.log("Fetching Credentials from wallet... !!");

    // Storing the fetched certificate and key in the cred object
    console.log(response.data);
    cred.certificate=response.data.results[0].attrs['Certificate Pem'];
    cred.key=response.data.results[0].attrs['Key Pem'];
    console.log(response.data.results[0].attrs);
        
        }).catch((error)=>{
        
        console.log("Failed...!!");
        console.log(error.response.data);
        return error;
        
     })

     return cred

}

// Function to start the credential fetching and storing process
async function start(){
    
    // Fetching the credentials
    const cred=await fetchCred();

    fs.access("./fabric-certificate", (error) => { 
   
        // To check if the given directory  
        // already exists or not 
        if (error) { 
          // If current directory does not exist 
          // then create it 
          fs.mkdir("./fabric-certificate", (error) => { 
            if (error) { 
              console.log(error); 
            } else { 
              console.log("Directory not found..Creating Directory..Writing Certificate !!"); 
              
              // Writing the certificate and key to the created directory
              fs.writeFileSync('./fabric-certificate/rca.pem',cred.certificate);
              fs.writeFileSync('./fabric-certificate/key.pem',cred.key);
              console.log("Success !!");
            } 
          }); 
        } else { 

          // If the directory exists, write the certificate and key
          console.log("Directory already exists...Writing Certificate !!"); 
          fs.writeFileSync('./fabric-certificate/rca.pem',cred.certificate);
          fs.writeFileSync('./fabric-certificate/key.pem',cred.key);
          console.log("Success !!");
        } 
      }); 



    
}

// Starting the process
start()