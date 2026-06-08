import { useState, useEffect } from "react";
import StringsManagmentContract from "../contracts/StringsManagment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function StringsManagment() {

    const [message, setMessage] = useState("");
    const [stringA, setStringA] = useState("");
    const [stringB, setStringB] = useState("");
    const [stringS, setStringS] = useState("");

    const [result, setResult] = useState("");
    const [contract, setContract] = useState(null);


    const blockChainInfo = BlockChainInfos(StringsManagmentContract);



    async function handleSetMessage() {
        if (!blockChainInfo.contract) return;

        await blockChainInfo.contract.methods.setMessage(message).send({ from: blockChainInfo.account });
        setResult(message);
    }

    async function handleGetMessage() {
        if (!blockChainInfo.contract) return;

        const message = await blockChainInfo.contract.methods.getMessage().call();
        setResult(message);
    }

    async function handleConcat() {
        const result = await blockChainInfo.contract.methods.concat(stringA, stringB).call();
        setResult(result);
    }

    async function handleConcatWith() {
        const result = await blockChainInfo.contract.methods.concatWith(stringS).call();
        setResult(result);
    }

    async function handleLength() {
        const result = await blockChainInfo.contract.methods.messageLength(message).call();
        setResult(result);
    }

    async function handleCompare() {
        const result = await blockChainInfo.contract.methods.compare(stringA, stringB).call();
        setResult(result ? "Les chaînes sont identiques" : "Les chaînes sont différentes");
    }


    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 1 · La gestion des chaînes de caractères</h1>
                    <span className="ex-filename">StringsManagment.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">Message</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">Chaîne A</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer une chaîne"
                                value={stringA}
                                onChange={(e) => setStringA(e.target.value)}
                            >

                            </input>

                            <label className="ex-field-label">Chaîne B</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer une chaîne"
                                value={stringB}
                                onChange={(e) => setStringB(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">Chaîne S</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer une chaîne"
                                value={stringS}
                                onChange={(e) => setStringS(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleSetMessage}
                                >
                                    setMessage(message)
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleGetMessage}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> getMessage()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleConcat}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> concat(a,b)
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleConcatWith}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> concatWith(s)
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleLength}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> length(message)
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleCompare}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> compare(a,b)
                                </button>

                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    setMessage(message)
                                </span>
                                <span className="ex-ref-desc">Définit le message</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> getMessage()
                                </span>
                                <span className="ex-ref-desc">Récupère le message</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> concat(a,b)
                                </span>
                                <span className="ex-ref-desc">Concatène deux chaînes de caractères</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> concatWith(s)
                                </span>
                                <span className="ex-ref-desc">Concatène une chaîne de caractères à la fin du message</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> length(message)
                                </span>
                                <span className="ex-ref-desc">Renvoie la longueur du message</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> compare(a,b)
                                </span>
                                <span className="ex-ref-desc">Compare deux chaînes de caractères</span>
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

export default StringsManagment;