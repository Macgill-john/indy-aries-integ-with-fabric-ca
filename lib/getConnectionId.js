const axios = require('axios');

async function getConnectionId(issuerApiUrl,holderApiUrl){

    let issuerConnectionId,holderConnectionId;

    await axios.get(issuerApiUrl).then((response)=>{

        console.log("Got Holder Connection Id...Success !!");
        holderConnectionId=response.data.results[0].connection_id;

    }).catch((error)=>{

        console.log("Failed...!!");
        console.log(error.response.data);
        return error;

    })

    await axios.get(holderApiUrl).then((response)=>{

        console.log("Got Issuer Connection Id...Success !!");
        issuerConnectionId=response.data.results[0].connection_id;

    }).catch((error)=>{

        console.log("Failed...!!");
        console.log(error.response.data);
        return error;

    })

    return {issuerConnectionId:issuerConnectionId,holderConnectionId:holderConnectionId};

}

async function start(issuerApiUrl="http://0.0.0.0:5001/connections",holderApiUrl="http://0.0.0.0:6001/connections"){


    let connectionId=await getConnectionId(issuerApiUrl,holderApiUrl)


    return connectionId;

}



module.exports=start;