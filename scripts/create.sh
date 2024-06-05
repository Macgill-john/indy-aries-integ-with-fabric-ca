#!/bin/bash

mkdir certificate

pwd

openssl ecparam -name prime256v1 -genkey -noout -out ./certificate/rca.key
openssl req -config ../scripts/ca.cnf -new -x509 -sha256 -extensions v3_ca -key ./certificate/rca.key -out ./certificate/rca.cert -days 3650 -subj "/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server"

pwd
openssl x509 -text -in ./certificate/rca.cert -out ./certificate/cert_text.txt
cat ./certificate/rca.key > ./certificate/key_text.txt