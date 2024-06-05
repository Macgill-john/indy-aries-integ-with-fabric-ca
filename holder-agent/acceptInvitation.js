const axios = require('axios');

//function to accept invitation in holder agent
async function acceptInvitation(holderUrl="http://0.0.0.0:6001",body){

    await axios.post(holderUrl+"/connections/receive-invitation",body).then((response)=>{

        console.log("Connection Establishment Successful...!!");

        //logging the response
        return response.data;

    }).catch((error)=>{
        

        //logging the error
        console.log("Connection Establishment Failed...!!");
        console.log(error.response.data);
        return error;
    })
}


async function start(holderUrl="http://0.0.0.0:6001"){

    //calling acceptInvitation function
    const data= await acceptInvitation(holderUrl,invitation=//{
    //     '@type': 'https://didcomm.org/connections/1.0/invitation',
    //     '@id': '10131035-7125-426e-b14e-1baee5763809',
    //     label: 'Issuer',
    //     recipientKeys: [ '87YY8xc5UDgPC85aYf3XQT4oeRsVJgp3EPMq3jidPDuM' ],
    //     serviceEndpoint: 'http://192.168.0.244:5000'
    //   }
    );

}

//starting the process
start();