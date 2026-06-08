import { useState, useEffect } from "react";
import ParityContract from "../contracts/Parity.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function Parity() {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState("");

    const blockChainInfo = BlockChainInfos(ParityContract);

    async function handleParity() {
        if (!blockChainInfo.contract) return;

        const isEven = await blockChainInfo.contract.methods.isEven(number).call();
        setResult(isEven ? "Le nombre est pair" : "Le nombre est impair");

        // const isOdd = await blockChainInfo.contract.methods.isOdd(number).call();
        // setResult(isOdd ? "Le nombre est impair" : "Le nombre est pair");
    }

    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 5 · Parité</h1>
                    <span className="ex-filename">Parity.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">Nombre</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un entier"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleParity}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> isEven()
                                </button>
                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> isEven()
                                </span>
                                <span className="ex-ref-desc">Vérifie si un nombre est pair</span>
                            </div>
                        </section>
                    </div>
                    <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                    
                </div>
            </div>

        </>
    )
}


export default Parity;