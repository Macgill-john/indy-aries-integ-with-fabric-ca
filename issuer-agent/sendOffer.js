const axios=require('axios')
const x509=require('../lib/reader')
const getConnectionId=require('../lib/getConnectionId')
const getSchemaCredId=require('../lib/getSchemaIdCredId')

// Getting data from reader and embedding with Schema for issuing a credential
schema={
    "auto_remove": true,
    "comment": "string",
    "connection_id": undefined,
    "cred_def_id": undefined,
    "credential_proposal": {
      "@type": "issue-credential/1.0/credential-preview",
      "attributes": [
        {
           "name":"Organization",
           "value":"Org1-CA"
        },
        {
          "name":"Version",
          "value": x509.Certificate.Data.Version
        },
        {
            "name":"Serial Number",
            "value":x509.Certificate.Data.Serial_Number
        },
        {
            "name":"Signature Algorithm",
            "value":x509.Certificate.Data.Signature_Algorithm
        },
        {
            "name":"Issuer",
            "value":x509.Certificate.Data.Issuer
        },
        {
            "name":"Validity Not Before",
            "value":x509.Certificate.Data.Validity.Not_Before
        },
        {
            "name":"Validity Not After",
            "value":x509.Certificate.Data.Validity.Not_After           
        },
        {
            "name":"Subject",
            "value":x509.Certificate.Data.Subject
        },
        {
            "name":"Public Key Algorithm",
            "value":x509.Certificate.Data.Subject_Public_Key_Info.Public_Key_Algorithm
        },
        {
            "name":"Public Key",
            "value":x509.Certificate.Data.Subject_Public_Key_Info.Public_Key
        },
        {
            "name":"pub",
            "value":x509.Certificate.Data.Subject_Public_Key_Info.pub
        },
        {
            "name":"ASN1 OID",
            "value":x509.Certificate.Data.Subject_Public_Key_Info.ASN1_OID
        },
        {
            "name":"NIST CURVE",
            "value":x509.Certificate.Data.Subject_Public_Key_Info.NIST_CURVE
        },
        {
            "name":"x509v3 Key Usage",
            "value":x509.Certificate.Data.X509v3_extensions.X509v3_Key_Usage
        },
        {
            "name":"X509v3_Basic_Constraints",
            "value":x509.Certificate.Data.X509v3_extensions.X509v3_Basic_Constraints
        },
        {
            "name":"X509v3_Subject_Key_Identifier",
            "value":x509.Certificate.Data.X509v3_extensions.X509v3_Subject_Key_Identifier
        },
        {
            "name":"X509v3_Authority_Key_Identifier",
            "value":x509.Certificate.Data.X509v3_extensions.X509v3_Authority_Key_Identifier
        },
        {
            "name":"Certificate Pem",
            "value":x509.cert_pem
        },
        {
            "name":"Key Pem",
            "value":x509.key_pem
        }
      ]
    },
    "issuer_did": undefined,
    "schema_id": undefined,
    "schema_issuer_did": undefined,
    "schema_name": "x509",
    "schema_version": "1.0",
    "trace": true
  }

// Function to send a credential offer
async function sendOffer(credentials,issuerApiUrl='http://0.0.0.0:5001/issue-credential/send'){

    await axios.post(issuerApiUrl='http://0.0.0.0:5001/issue-credential/send',credentials).then((response)=>{

        console.log("Credential Offer Sent...Success !!");
        console.log(response.data);

    }).catch((error)=>{
        
        // Logging the error response in case of failure
        console.log("Failed...!!");
        console.log(error.response.data);
        return error;

    })

}


async function start(){

    // Getting the connection ID
    const connId= await getConnectionId();

    // Getting the schema and credential definition IDs
    const schemaCredId= await getSchemaCredId();

    // Setting the schema fields with the obtained IDs
    schema.connection_id=connId.holderConnectionId;
    schema.cred_def_id=schemaCredId.credid;
    schema.issuer_did=schemaCredId.schemaid.substr(0,22);
    schema.schema_id=schemaCredId.schemaid;
    schema.schema_issuer_did=schemaCredId.schemaid.substr(0,22);
    
    // Sending the credential offer
    await sendOffer(schema)


}

// Starting the process
start()

