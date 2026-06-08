import { useState, useEffect } from 'react';
import Web3 from 'web3';

function BlockChainInfos(contractJson) {
    const [info, setInfo] = useState(null);

    useEffect(() => {

        async function init() {

            const web3 = new Web3("http://127.0.0.1:7545");
            const networkId = await web3.eth.net.getId();
            const accounts = await web3.eth.getAccounts();
            const deployedNetwork = contractJson.networks[networkId];
            const contract = new web3.eth.Contract(
                contractJson.abi,
                deployedNetwork.address
            );

            const blockNumber = await web3.eth.getBlockNumber();
            const block = await web3.eth.getBlock(blockNumber);

            const txDetails = await Promise.all(
                block.transactions.map(txHash => web3.eth.getTransaction(txHash))
            );

            setInfo({
                networkUrl: "http://127.0.0.1:7545",
                networkId,
                contract,
                contractAddress: deployedNetwork.address,
                account: accounts[0],
                block,
                transactions: txDetails,
                web3,
                status: "connected" 
            });

            console.log(networkId);
        }
        init();
    }, [contractJson]);

    // console.log(info);
    return info;
}
export default BlockChainInfos;