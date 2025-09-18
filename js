//34 yarn add web3
 /*document.addEventListener("DOMContentLoaded",function(){
    if (window.ethereum){
        ethereum.request({method:"eth_requstAccount"}).then((accounts) => {
           let account = accounts[0];
			console.log(account)
        })
    }
})*/
const web3 = new Web3(window.ethereum);
var account;

const CONTRACT_ADDR = "0x805cd723E2361CC9744d1224B69BCEBd16690133"
const CONTRACT_ABI =
       [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDR)

document.addEventListener("DOMContentLoaded", function () {
    if (window.ethereum) {
        ethereum.request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                account = accounts[0];
                console.log("Connected account:", account);
            })
            .catch((err) => {
                console.error("Error connecting to MetaMask:", err);
            });
    } else {
        console.log("MetaMask not detected!");
    }

    contract.methods.candidateCount().call().then((e) => {
        for (var i = 1; i <= e; i++) {
            contract.methods.candidates(i).call().then((f) => {
                console.log(f);
                document.getElementById("name" + f.id).innerHTML = f.name;
                document.getElementById("candidate" + f.id).innerHTML = f.voteCount;
            });
        }
    });
});

// ✅ Make vote global so HTML button can call it
window.vote = function () {
    var candidateId = document.getElementById("Candidate").value;

    const transaction = {
        from: account,
        to: CONTRACT_ADDR,
        data: contract.methods.vote(candidateId).encodeABI(),
        gas: 320000
    };

    web3.eth.sendTransaction(transaction)
        .on("transactionHash", function (hash) {
            console.log("Transaction Hash", hash);
        })
        .on("error", function (error) {
            console.log(error);
        });
};

/*

document.addEventListener("DOMContentLoaded", function () {
    if (window.ethereum) {
        ethereum.request({ method: "eth_requestAccounts" })
            .then((accounts) => {
                 account = accounts[0];
                console.log("Connected account:", account);
            })
            .catch((err) => {
                console.error("Error connecting to MetaMask:", err);
            });
    } else {
        console.log("MetaMask not detected!");
    }





    contract.methods.candidateCount().call().then((e)=>{
        for (var i =1 ; i<= e; i++){
            contract.methods.candidates(i).call().then((f) =>{
              console.log(f)
              document.getElementById( "name" + f.id).innerHTML = f.name;
			  document.getElementById("candidate" + f.id).innerHTML = f.voteCount;
            })
        }
    })
    function vote(){
		var candidateId = document.getElementById("Candidate").value;

		const transaction = {
			from:account,
			to:CONTRACT_ADDR,
			data:contract.methods.vote(candidateId).encodeABI(),
			gas:320000
		}
		web3.eth.sendTransaction(transaction)
        .on("transactionHash", function(hash) {
         console.log("Transaction Hash", hash);
        })
		 .on("error", function(error) {
         console.log(error);
        })
	}
	
})



*/


/*
const web3 = new web3(window.ethereum);
var account;

const CONTRACT_ADDR = "0xD4Fc541236927E2EAf8F27606bD7309C1Fc2cbee"
const CONTRACT_ABI =[
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_candidateNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDR)


   document.addEventListener("DOMContentLoaded",function(){
    if (window.ethereum){
        ethereum.request({ method: "eth_requstAccount" }).then((accounts) => {
            account = accounts[0];
            console.log(account)
        })
    }
    else{
        console.log ("Please install metamsk")
    }*/

// Initialize Web3

/*
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR);

document.addEventListener("DOMContentLoaded", function () {
    if (window.ethereum) {
        ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
            account = accounts[0];
            console.log("Connected account:", account);
        })
        .catch((err) => {
            console.error("Error connecting to MetaMask:", err);
        });
    } else {
        console.log("Please install MetaMask");
        return;
    }

    // Fetch candidate count
    contract.methods.candidateCount().call().then((count) => {
        console.log("Total candidates:", count);

        for (let i = 1; i <= count; i++) {   // use 0 if contract IDs start at 0
            contract.methods.candidates(i).call().then((candidate) => {
                console.log("Candidate:", candidate);

                // update HTML
                const element = document.getElementById(candidate.id);
                if (element) {
                    element.innerHTML = candidate.name + " (" + candidate.voteCount + " votes)";
                }
            });
        }
    });
});
*/
