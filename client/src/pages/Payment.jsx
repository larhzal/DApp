import { useState, useEffect } from "react";
import PaymentContract from "../contracts/Payment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function Payment() {
    const [eth, setEth] = useState("");
    const [result, setResult] = useState("");
    const [balance, setBalance] = useState("0");
    const blockChainInfo = BlockChainInfos(PaymentContract);

    async function loadBalance() {
        if (!blockChainInfo?.web3) return;

        const bal = await blockChainInfo.web3.eth.getBalance(
            blockChainInfo.contractAddress
        );

        setBalance(blockChainInfo.web3.utils.fromWei(bal, "ether"));
    }


    async function handlePayment() {
        if (!blockChainInfo.contract) return;

        await blockChainInfo.contract.methods
            .recievePayment()
            .send({
                from: blockChainInfo.account,
                value: blockChainInfo.web3.utils.toWei(eth, "ether")
            });

        setResult("Paiement reçu!");
        await loadBalance();
    }

    async function handleWithdraw() {
        if (!blockChainInfo.contract) return;

        try {
            await blockChainInfo.contract.methods
                .withdraw()
                .send({ from: blockChainInfo.account });

            setResult("Retrait réussi!");
            await loadBalance();
        } catch (err) {
            setResult("Retrait non autorisé");
        }
    }

    async function handleBalance() {
        if (!blockChainInfo.contract) return;

        const bal = await blockChainInfo.web3.eth.getBalance(
            blockChainInfo.contractAddress
        );

        setResult(
            `Balance: ${blockChainInfo.web3.utils.fromWei(bal, "ether")} ETH`
        );
    }

    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 8 · Payment</h1>
                    <span className="ex-filename">Payment.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">ETH</label>
                            <input
                                className="ex-input"
                                placeholder="valeur en ETH"
                                value={eth}
                                onChange={(e) => setEth(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--payable"
                                    onClick={() => handlePayment()}
                                >
                                    <span className="ex-badge ex-badge--payable">payable</span> receivePayment()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={() => handleWithdraw()}
                                >
                                    withdraw()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={() => handleBalance()}
                                >
                                    getBalance()
                                </button>


                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--payable">payable</span> receivePayment()
                                </span>
                                <span className="ex-ref-desc">Reçoit un paiement</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    withdraw()
                                </span>
                                <span className="ex-ref-desc">Retire des fonds du contrat</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    getBalance()
                                </span>
                                <span className="ex-ref-desc">Affiche le solde du contrat</span>
                            </div>

                        </section>
                    </div>

                    <div className="ex-right">
                        <p className="ex-label">INFORMATIONS BLOCKCHAIN</p>

                        <div className="ex-info-card">
                            <div className="ex-info-card-header">
                                <span className="ex-dot ex-dot--green" /> RÉSEAU
                            </div>
                            <div className="ex-info-row">
                                <span className="ex-info-key">URL</span>
                                <span className="ex-info-val ex-info-val--link">{blockChainInfo?.networkUrl}</span>
                            </div>
                            <div className="ex-info-row">
                                <span className="ex-info-key">ID</span>
                                <span className="ex-info-val">{blockChainInfo?.networkId}</span>
                            </div>
                            <div className="ex-info-row">
                                <span className="ex-info-key">Status</span>
                                <span className="ex-info-val">
                                    {blockChainInfo?.status || "Not loaded"}
                                </span>
                            </div>
                        </div>

                        <div className="ex-info-card">
                            <div className="ex-info-card-header">
                                <span className="ex-dot ex-dot--green" /> CONTRAT DÉPLOYÉ
                            </div>
                            <div className="ex-info-row">
                                <span className="ex-info-key">Adresse</span>
                                <span className="ex-info-val ex-info-val--link">{blockChainInfo?.contractAddress}</span>
                            </div>
                            <div className="ex-info-row">
                                <span className="ex-info-key">Compte</span>
                                <span className="ex-info-val ex-info-val--link">{blockChainInfo?.account}</span>
                            </div>
                        </div>

                        {blockChainInfo?.block && (
                            <div className="ex-info-card">
                                <div className="ex-info-card-header">
                                    <span className="ex-dot ex-dot--green" /> DERNIER BLOC
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">N°</span>
                                    <span className="ex-info-val ex-info-val--accent">#{blockChainInfo?.block.number}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Hash</span>
                                    <span className="ex-info-val ex-info-val--link">{blockChainInfo?.block.hash}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Parent Hash</span>
                                    <span className="ex-info-val ex-info-val--link">{blockChainInfo?.block.parentHash}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Timestamp</span>
                                    <span className="ex-info-val">{formatTimestamp(blockChainInfo?.block.timestamp)}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Nonce</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.nonce || 'N/A'}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Transactions</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.transactions.length}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Miner</span>
                                    <span className="ex-info-val ex-info-val--link">{blockChainInfo?.block.miner}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Difficulté</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.difficulty?.toString()}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Gas limit</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.gasLimit}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Gas Utilisé</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.gasUsed}</span>
                                </div>
                                <div className="ex-info-row">
                                    <span className="ex-info-key">Taille</span>
                                    <span className="ex-info-val">{blockChainInfo?.block.size?.toString()}</span>
                                </div>

                            </div>
                        )}

                        {blockChainInfo?.transactions?.length > 0 && (
                            <div className="ex-info-card">
                                <div className="ex-info-card-header">
                                    <span className="ex-dot ex-dot--green" /> TRANSACTIONS ({blockChainInfo.transactions.length})
                                </div>

                                {blockChainInfo.transactions.map((tx, i) => (
                                    <div key={tx.hash} className="ex-tx-block">
                                        <p className="ex-tx-title">Transaction #{i + 1}</p>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Numéro</span>
                                            <span className="ex-info-val">{i + 1}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Bloc</span>
                                            <span className="ex-info-val ex-info-val--accent">#{tx.blockNumber?.toString()}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Expéditeur</span>
                                            <span className="ex-info-val ex-info-val--link">{tx.from}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Destinataire</span>
                                            <span className="ex-info-val ex-info-val--link">{tx.to || "—"}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Hash</span>
                                            <span className="ex-info-val ex-info-val--link">{tx.hash}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Nonce</span>
                                            <span className="ex-info-val">{tx.nonce?.toString()}</span>
                                        </div>

                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Balance</span>
                                            <span className="ex-info-val">
                                                {balance} ETH
                                            </span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Montant</span>
                                            <span className="ex-info-val">
                                                {blockChainInfo.web3
                                                    ? blockChainInfo.web3.utils.fromWei(tx.value?.toString() || "0", "ether") + " ETH"
                                                    : tx.value?.toString()}
                                            </span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Frais (Gas)</span>
                                            <span className="ex-info-val">{tx.gasPrice}</span>
                                        </div>
                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Limite de gas</span>
                                            <span className="ex-info-val">{tx.gas?.toString()}</span>
                                        </div>

                                        <div className="ex-info-row">
                                            <span className="ex-info-key">Horodatage</span>
                                            <span className="ex-info-val">{formatTimestamp(blockChainInfo.block?.timestamp)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}


export default Payment;