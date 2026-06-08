import { useState, useEffect } from "react";
import ArrayManagmentContract from "../contracts/ArrayManagment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function ArrayManagment() {
    const [number, setNumber] = useState("");
    const [index, setIndex] = useState("");
    const [result, setResult] = useState("");

    const blockChainInfo = BlockChainInfos(ArrayManagmentContract);

    async function handleAddNumber() {
        if (!blockChainInfo.contract) return;

        await blockChainInfo.contract.methods.addNumber(number).send({ from: blockChainInfo.account });
        setResult(`Nombre ${number} ajouté au tableau!`);
    }

    async function handleGetElement() {
        if (!blockChainInfo.contract) return;

        try {
            const element = await blockChainInfo.contract.methods.getElement(Number(index)).call();

            setResult(`Element: ${element}`);
        } catch (error) {
            setResult("Index non trouvé!");
        }
    }

    async function handleDisplayArray() {
        if (!blockChainInfo.contract) return;

        const array = await blockChainInfo.contract.methods.displayArray().call();
        setResult(`Tableau: [${array.join(", ")}]`);
    }

    async function handleSum() {
        if (!blockChainInfo.contract) return;

        const sum = await blockChainInfo.contract.methods.sum().call();
        setResult(sum);
    }

    async function handleClear() {
        await blockChainInfo.contract.methods.clearArray().send({ from: blockChainInfo.account });

        const updated = await blockChainInfo.contract.methods.displayArray().call();
        setResult(`Tableau vidé!`);
    }

    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 6 · Gestion de tableau</h1>
                    <span className="ex-filename">ArrayManagment.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">Nombre</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un nombre"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">Index</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un index"
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleAddNumber}
                                >
                                    addNumber()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleGetElement}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> getElement()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleDisplayArray}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> displayArray()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleSum}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> sum()
                                </button>
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleClear}
                                >
                                    clearArray()
                                </button>
                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    addNumber()
                                </span>
                                <span className="ex-ref-desc">Ajoute un nombre au tableau</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> getElement()
                                </span>
                                <span className="ex-ref-desc">Récupère un nombre du tableau</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> displayArray()
                                </span>
                                <span className="ex-ref-desc">Affiche le contenu du tableau</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> sum()
                                </span>
                                <span className="ex-ref-desc">Calcule la somme des nombres du tableau</span>
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


export default ArrayManagment;