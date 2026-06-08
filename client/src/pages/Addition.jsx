import { useState, useEffect } from "react";
import AdditionContract from "../contracts/Addition.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function Addition() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");

    const [result, setResult] = useState("");
    const [contract, setContract] = useState(null);
    const [mode, setMode] = useState("view");

    const blockChainInfo = BlockChainInfos(AdditionContract);



    async function handleAddition1() {
        if (!blockChainInfo.contract) return;


        await blockChainInfo.contract.methods.setA(a).send({ from: blockChainInfo.account });
        await blockChainInfo.contract.methods.setB(b).send({ from: blockChainInfo.account });

        const sum = await blockChainInfo.contract.methods.addition1().call();
        setResult(sum);
    }

    async function handleAddition2() {
        if (!blockChainInfo.contract) return;


        const sum = await blockChainInfo.contract.methods.addition2(a, b).call();
        setResult(sum);
    }

    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 1 · Somme de deux variables</h1>
                    <span className="ex-filename">Addition.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">Uint a</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un entier"
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">Uint b</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un entier"
                                value={b}
                                onChange={(e) => setB(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleAddition1}
                                >
                                    <span className="ex-badge ex-badge--view">view</span> addition1()
                                </button>
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleAddition2}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> addition2(a, b)
                                </button>
                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">view</span> addition1()
                                </span>
                                <span className="ex-ref-desc">Somme des variables d'état</span>
                            </div>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> addition2(a, b)
                                </span>
                                <span className="ex-ref-desc">Somme de deux paramètres</span>
                            </div>
                        </section>
                    </div>

                       <BlcokChaintPanel blockChainInfo={blockChainInfo} />

                    
                </div>
            </div>

        </>
    )
}

export default Addition;