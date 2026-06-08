import { useState, useEffect } from "react";
import CryptoConvertContract from "../contracts/CryptoConvert.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
import "../styles/exercise.css";


function formatTimestamp(ts) {
    if (!ts) return "Date inconnue";
    return new Date(Number(ts) * 1000).toLocaleString("fr-FR");
}

function CryptoConvert() {

    const [ether, setEther] = useState("");
    const [wei, setWei] = useState("");

    const [result, setResult] = useState("");
    const [contract, setContract] = useState(null);


    const blockChainInfo = BlockChainInfos(CryptoConvertContract);



    async function handleEtherConvert() {
        if (!blockChainInfo.contract) return;

        const sum = await blockChainInfo.contract.methods.etherToWei(ether).call();
        setResult(sum);
    }

    async function handleWeiConvert() {
        if (!blockChainInfo.contract) return;


        const sum = await blockChainInfo.contract.methods.weiToEther(wei).call();
        setResult(sum);
    }

    return (
        <>
            <div className="ex-page">
                <header className="ex-header">
                    <button className="ex-back-btn" onClick={() => window.history.back()}>
                        ← Sommaire
                    </button>

                    <h1 className="ex-title">Exercice 1 · Conversion de crypto-monnaies</h1>
                    <span className="ex-filename">CryptoConvert.sol</span>
                </header>

                <div className="ex-body">
                    <div className="ex-left">
                        <section className="ex-section">
                            <p className="ex-label">Paramètre</p>
                            <label className="ex-field-label">Montant Ether</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un montant"
                                value={ether}
                                onChange={(e) => setEther(e.target.value)}
                            >
                            </input>

                            <label className="ex-field-label">Montant Wei</label>
                            <input
                                className="ex-input"
                                placeholder="Entrer un montant"
                                value={wei}
                                onChange={(e) => setWei(e.target.value)}
                            >
                            </input>
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Fonction</p>
                            <div className="ex-fn-row">
                                <button className="ex-fn-btn ex-fn-btn--view"
                                    onClick={handleEtherConvert}
                                >
                                    <span className="ex-badge ex-badge--view">pure</span> etherToWei()
                                </button>
                                <button className="ex-fn-btn ex-fn-btn--pure"
                                    onClick={handleWeiConvert}
                                >
                                    <span className="ex-badge ex-badge--pure">pure</span> weiToEther()
                                </button>
                            </div>
                            {result && <p className="ex-result">{result}</p>}
                        </section>

                        <section className="ex-section">
                            <p className="ex-label">Référence</p>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--view">pure</span> etherToWei(ether)
                                </span>
                                <span className="ex-ref-desc">Convertit un montant en Ether vers un montant en Wei</span>
                            </div>
                            <div className="ex-ref-row">
                                <span>
                                    <span className="ex-badge ex-badge--pure">pure</span> weiToEther(wei)
                                </span>
                                <span className="ex-ref-desc">Convertit un montant en Wei vers un montant en Ether</span>
                            </div>
                        </section>
                    </div>
                        <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                   
                </div>
            </div>

        </>
    )
}

export default CryptoConvert;