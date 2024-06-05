const { Certificate } = require('crypto');
const fs=require('fs');
const { type } = require('os');

let fileData;

fileData=fs.readFileSync('./certificate/cert_text.txt').toString();
fileSecretData=fs.readFileSync('./certificate/key_text.txt').toString();


const x509={

    Certificate:{

        Data:{
            
            Version:fileData.substring(fileData.indexOf("Version:")+9,fileData.indexOf("Serial Number:")).trim(),
            Serial_Number:fileData.substring(fileData.indexOf("Serial Number:") + 14, fileData.indexOf("Signature Algorithm:")).trim(),
            Signature_Algorithm:fileData.substring(fileData.indexOf("Signature Algorithm:")+20, fileData.indexOf("Issuer:")).trim(),
            Issuer:fileData.substring(fileData.indexOf("Issuer:") + 7, fileData.indexOf("Validity")).trim(),
            Validity:{
                Not_Before:fileData.substring(fileData.indexOf("Not Before:") + 11, fileData.indexOf("Not After")).trim(),
                Not_After:fileData.substring(fileData.indexOf("Not After:") + 377, fileData.indexOf("Subject")).trim(),
            },

            Subject:fileData.substring(fileData.indexOf("Subject:") + 8, fileData.indexOf("Subject Public Key Info")).trim(),
            Subject_Public_Key_Info:{
                Public_Key_Algorithm: fileData.substring(fileData.indexOf("Public Key Algorithm:") + 20, fileData.indexOf("Public-Key")).trim(),
                Public_Key: fileData.substring(fileData.indexOf("Public-Key:") + 11, fileData.indexOf("pub:")).trim(),
                pub:fileData.substring(fileData.indexOf("pub:")+11, fileData.indexOf("ASN1 OID:")).trim(),
                ASN1_OID: fileData.substring(fileData.indexOf("ASN1 OID:") + 9, fileData.indexOf("NIST CURVE")).trim(),
                NIST_CURVE: fileData.substring(fileData.indexOf("NIST CURVE:") + 11, fileData.indexOf("X509v3 extensions")).trim(),
            },
            X509v3_extensions:{
                X509v3_Key_Usage: fileData.substring(fileData.indexOf("X509v3 Key Usage:") + 18, fileData.lastIndexOf("Signature Algorithm")).trim(),
                X509v3_Basic_Constraints: fileData.substring(fileData.indexOf("X509v3 Basic Constraints:") + 26, fileData.indexOf("X509v3 Key Usage:")).trim(),
                X509v3_Subject_Key_Identifier: fileData.substring(fileData.indexOf("X509v3 Subject Key Identifier:") + 30, fileData.indexOf("X509v3 Authority Key Identifier:")).trim(),
                X509v3_Authority_Key_Identifier: fileData.substring(fileData.indexOf("X509v3 Authority Key Identifier:") + 56, fileData.indexOf("X509v3 Basic Constraints:")).trim()
            },

        },

        Signature_Algorithm_: fileData.substring(fileData.lastIndexOf("Signature Algorithm:") + 20, fileData.indexOf("-----BEGIN CERTIFICATE-----")).trim(),

    },

    cert_pem:fileData.substring(fileData.indexOf("-----BEGIN CERTIFICATE-----") , fileData.length).trim(),
    key_pem:fileSecretData


}

function repair(){

    temp=x509.Certificate.Data.X509v3_extensions.X509v3_Key_Usage;
    temp=temp.replace(/[\n\r\s]+/gm," "); 
    temp=temp.replace(/(critical)(\s+)(Digital Signature)/, '$1,$2$3');

    x509.Certificate.Data.X509v3_extensions.X509v3_Key_Usage=temp;

    temp=x509.Certificate.Data.X509v3_extensions.X509v3_Basic_Constraints;

    temp=temp.replace(/[\n\r\s]+/," ")
    temp=temp.replace(/(critical)(\s+)(CA:TRUE)/, '$1,$2$3');

    x509.Certificate.Data.X509v3_extensions.X509v3_Basic_Constraints=temp;

    x509.Certificate.Data.Subject_Public_Key_Info.pub=x509.Certificate.Data.Subject_Public_Key_Info.pub.replace(/\s+/g, '')
}

repair();


module.exports=x509;