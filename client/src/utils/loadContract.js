import Web3 from "web3";

export async function loadContract(contractJson) {

    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
    );

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    const deployedNetwork =
        contractJson.networks[networkId];

    const contract = new web3.eth.Contract(
        contractJson.abi,
        deployedNetwork.address
    );

    const accounts =
        await web3.eth.getAccounts();

    return {
        web3,
        contract,
        networkId,
        account: accounts[0]
    };
}