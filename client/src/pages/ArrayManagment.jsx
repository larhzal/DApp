import { useState, useEffect } from "react";
import ArrayManagmentContract from "../contracts/ArrayManagment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
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
                    <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                    
                </div>
            </div>

        </>
    )
}


export default ArrayManagment;