const axios=require('axios');


// Schema for x509 certificates
schema={
    "attributes": [
      "Organization",
      "Version",
      "Serial Number",
      "Signature Algorithm",
      "Issuer",
      "Validity Not Before",
      "Validity Not After",
      "Subject",
      "Public Key Algorithm",
      "Public Key",
      "pub",
      "ASN1 OID",
      "NIST CURVE",
      "x509v3 Key Usage",
      "X509v3_Basic_Constraints",
      "X509v3_Subject_Key_Identifier",
      "X509v3_Authority_Key_Identifier",
      "Certificate Pem",
      "Key Pem"


    ],
    "schema_name": "x509",
    "schema_version": "1.0"
  }

let schema_id  // Variable to hold the schema ID after creation

// Credential definition for x509 certificates
credentialDefinition={
    "revocation_registry_size": 1000,
    "schema_id": schema_id,
    "support_revocation": true,
    "tag": "x509"
  }

  

// Function to create a schema on the given URL
  async function createSchema(schemaUrl="http://0.0.0.0:5001/schemas"){

    
    await axios.post(schemaUrl,schema).then((response)=>{
        console.log("Schema Generation Successful...!!");
        
        // Storing the schema ID from the response
        schema_id=response.data.schema_id;
    }).catch((err)=>{
        console.log("Error Occured...!!");

        // Logging the error response in case of failure
        console.log(err.response.data);
    })


    // Returning the created schema ID
    return schema_id;
  }


  async function createCredentialDefinition(definitionUrl="http://0.0.0.0:5001/credential-definitions"){

    let definitionId;

    await axios.post(definitionUrl,credentialDefinition).then((response)=>{
        console.log("Credential Definitions Successfully Created...!!");

        // Storing the credential definition ID from the response
        definitionId=response.data.credential_definition_id;
    }).catch((err)=>{
        console.log("Error Occured While creating Definitons");
        
        // Logging the error response in case of failure
        console.log(err.response.data);
    })

    // Returning the created credential definition ID
    return definitionId;

  }


  async function start(){
    
    // Creating the schema and storing the schema ID 
    schema_id= await createSchema();
   
    // Setting the schema ID in the credential definition
    credentialDefinition.schema_id=schema_id;

    // Creating the credential definition and storing the definition ID
    definitionId=await createCredentialDefinition()

    // Logging the created schema ID and credential definition ID
    console.log("schema_id: ",schema_id);
    console.log("Credential Definition id: ", definitionId);
  }

 
  start()

