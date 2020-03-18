nearlib=require('nearlib')
nearsso=require('./nearsso.js')
prompt=require('prompt');

const account={
	name:"",
	network:'default'
}
	
const config={
	networkid:account.network,
	nodeUrl:"https://rpc.nearprotocol.com",
	deps:{
		keystore: new nearlib.keyStores.InMemoryKeyStore()
	}	
}

prompt.start();

test=async function(){

	let prm=new Promise((resolve,reject)=>{
		prompt.get(['nearaccount'],(err,ret)=>{resolve(ret.nearaccount)})	
	})
	
	account.name=await prm;

	console.log('Getting full access key, Close tab when complete');
	let keypair=nearsso.newFullAccessKey(account,config)
	prompt.get(['Press enter'],(err,res)=>{
		if(nearsso.checkFullAccess(account,config,keypair)==true)
		{
			console.log('Full access granted');
		}
		else{
			console.log('Full access not granted');	
		}	
	});
}

test();
