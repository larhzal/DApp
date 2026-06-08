import { useState, useEffect } from "react";
import RectangleContract from "../contracts/Rectangle.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
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
                        <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                </div>
            </div>

        </>
    )
}


export default Rectangle;