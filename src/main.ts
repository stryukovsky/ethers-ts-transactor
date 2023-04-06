import {getFundRequests} from "./server";
import {FundRequest} from "./types";
import {TransactionResponse, Wallet, JsonRpcProvider} from "ethers";

const performTransactions = async (wallet: Wallet, fundRequests: Array<FundRequest>) => {
    let promises: Array<Promise<TransactionResponse>> = [];
    let nonce = await wallet.provider.getTransactionCount(wallet.address);
    console.log(`Initially nonce is ${nonce}`);
    fundRequests.forEach(async (fundRequest: FundRequest) => {
        promises.push(wallet.sendTransaction({
            to: fundRequest.to,
            value: fundRequest.amount,
            nonce
        }));
        nonce += 1;
        console.log(`Nonce increased: ${nonce}`);
    });
    Promise.all(promises).then((responses) => {
        const txHashes = responses.map((response, _, __) => response.hash);
        console.log(txHashes);
    });
}

const cycle = async (wallet: Wallet) => {
    console.log("Fetching fund requests");
    const fundRequests = await getFundRequests();
    console.log(`There are ${fundRequests.length} fund requests to be proceeded`);
    performTransactions(wallet, fundRequests).catch(console.error);
}

const main = async () => {
    const provider = new JsonRpcProvider(process.env.RPC_URL as string);
    const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
    await cycle(wallet);
}

main().catch(console.error);
