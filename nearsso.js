/*
A convenient NEAR Signon module in NodeJS

Copyright Daniel Iwo, 2020
*/


let nearlib=require('nearlib')
let open=require('open')
//let prompt=require('prompt')


var exports=module.exports={}

exports.newFullAccessKey=async function(account,config){
	
		const keyPair=nearlib.utils.key_pair.KeyPairEd25519.fromRandom();
	
		const near=await nearlib.connect(config);
	
		let loginurl='https://wallet.nearprotocol.com/login/?title=My+App&public_key=ed25519%3A';
		loginurl+=keyPair.publicKey.toString().slice(8);
		open(loginurl,{wait:'true'});
		return keyPair;
}

exports.checkFullAccess=async function(account,config,keypair)
{
	const near=await nearlib.connect(config);
	const keys=await near.connection.provider.query(`access_key/${account.name}`, '');
	const key=keys.keys.filter(k=>k.public_key===keypair.publicKey.toString())[0]
	if(key.access_key.permission!='FullAccess')
	{			
		return false;
	}
	return true;
}

