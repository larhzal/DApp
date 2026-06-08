import { useState, useEffect } from "react";
import PaymentContract from "../contracts/Payment.json";
import { loadContract } from "../utils/loadContract";
import BlockChainInfos from "../utils/blockChainInfos";
import BlcokChaintPanel from "../components/BlockchainInfoSide";
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
                    <BlcokChaintPanel blockChainInfo={blockChainInfo} />
                </div>
            </div>

        </>
    )
}


export default Payment;