const axios=require('axios');


async function getIds(schemaUrl='http://0.0.0.0:5001/schemas/created',credUrl='http://0.0.0.0:5001/credential-definitions/created'){
    

    let ids={"schemaid":undefined,"credid":undefined};

    await axios.get(schemaUrl).then((response)=>{
        console.log("Got Schema Id....!!");
        let schema_id=response.data.schema_ids[0];
        ids.schemaid=schema_id;
    }).catch((err)=>{
        console.log("Error Occured...!!");
        console.log(err.response.data);
    })

    await axios.get(credUrl).then((response)=>{
        console.log("Got Cred Id...!!");

        let cred_id=response.data.credential_definition_ids[0];
        ids.credid=cred_id
    }).catch((err)=>{
        console.log("Error Occured...!!");
        console.log(err.response.data);
    })

    return ids;
}


async function start(){


    const ids=await getIds();

    return ids;

}


module.exports=start