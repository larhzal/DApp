import { useState, useEffect } from "react";
import StringsManagmentContract from "../contracts/StringsManagment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
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
                    <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                </div>
            </div>

        </>
    )
}

export default StringsManagment;