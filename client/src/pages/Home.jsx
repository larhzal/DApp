import React from 'react';
import '../styles/home.css';
import {exercises} from '../components/exercises'; 
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="home">
                <header className="home-header">
                    <h1 className="home-title">
                        Projet de Fin de Module
                        <span className="home-title-accent"> dApp pour le TP 3</span>
                    </h1>
                    <p className="home-subtitle mono">
                        Solidity · Truffle · ReactJS · Web3.js
                    </p>
                    <div className="home-net-bar">
                        <span className="live-dot" />
                        <span>Ganache · HTTP://127.0.0.1:7545 · ID: 5777</span>
                    </div>
                </header>
            </div>

            <div className="home-grid">
                {exercises.map((ex) => (
                    <Link
                        key={ex.id}
                        to={`/exercice/${ex.id}`}
                        className="ex-card"
                    >
                        <div className="ex-num mono">{String(ex.id).padStart(2, "0")}</div>
                        <div className="ex-info">
                            <h3 className="ex-title">{ex.title}</h3>
                            <p className="ex-desc">{ex.description}</p>
                        </div>
                        <span className="ex-arrow">›</span>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Home;