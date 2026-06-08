import { useState, useEffect } from "react";
import RectangleContract from "../contracts/Rectangle.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function Rectangle() {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [dx, setDx] = useState("");
    const [dy, setDy] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState("");

    const blockChainInfo = BlockChainInfos(RectangleContract);


    async function handleMove(dx, dy) {
        if (!blockChainInfo.contract) return;
        await blockChainInfo.contract.methods.move(dx, dy).send({ from: blockChainInfo.account });
        setResult("Position déplacée!");
    }

    async function handleDisplayXY() {
        if (!blockChainInfo.contract) return;

        const result = await blockChainInfo.contract.methods.displayXY().call();

        setResult(`x: ${result[0]}, y: ${result[1]}`);
    }

    async function handleDisplayInfo() {
        if (!blockChainInfo.contract) return;

        const result = await blockChainInfo.contract.methods.displayInfo().call();
        setResult(result);
    }

    async function handleArea() {
        if (!blockChainInfo.contract) return;

        const result = await blockChainInfo.contract.methods.area().call();
        console.log("AREA RESULT:", result);
        setResult(result);
    }

    async function handleWidthHeight() {
        if (!blockChainInfo.contract) return;

        const result = await blockChainInfo.contract.methods.displayWidthHeight().call();

        setResult(`Largeur: ${result[0]}, Longueur: ${result[1]}`);
    }


    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 7 · Rectagle</h1>
                    <span className="ex-filename">Rectangle.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">dx</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un nombre"
                                value={dx}
                                onChange={(e) => setDx(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">dy</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un nombre"
                                value={dy}
                                onChange={(e) => setDy(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={() => handleMove(dx, dy)}
                                >
                                    move()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleDisplayXY}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> displayXY()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleArea}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> area()
                                </button>

                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleDisplayInfo}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> displayInfo()
                                </button>
                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleWidthHeight}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> displayWidthHeight()
                                </button>
                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    move()
                                </span>
                                <span className="ex-ref-desc">Déplace le rectangle</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> displayXY()
                                </span>
                                <span className="ex-ref-desc">Affiche les coordonnées du rectangle</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> area()
                                </span>
                                <span className="ex-ref-desc">Affiche l'aire du rectangle</span>
                            </div>

                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> displayWidthHeight()
                                </span>
                                <span className="ex-ref-desc">Affiche la largeur et la hauteur du rectangle</span>
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


export default Rectangle;