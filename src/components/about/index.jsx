// src/components/about/index.jsx
import React, { useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCpu,
    FiHardDrive,
    FiWifi,
    FiDatabase,
    FiCode,
    FiShield,
    FiActivity,
} from "react-icons/fi";

const About = () => {
    const [open, setOpen] = useState(true);

    const content = useMemo(() => {
        return {
            title: "About this repo",
            sub: "Computer Science Foundations is a fast revision hub for the core system concepts that power real software. It focuses on clarity, correct mental models, and production intuition.",
        };
    }, []);

    const toggle = () => setOpen((v) => !v);

    return (
        <Styled.Wrapper id="about">
            <div className="frame">
                <div className="top">
                    <div className="left">
                        <div className="badge">
                            <FiActivity />
                            <span>systems core</span>
                        </div>

                        <h2 className="title">computer-science-foundations</h2>
                        <p className="sub">{content.sub}</p>

                        <div className="chips" aria-label="Focus areas">
                            <span className="chip">
                                <FiCpu /> OS
                            </span>
                            <span className="chip">
                                <FiWifi /> Networks
                            </span>
                            <span className="chip">
                                <FiDatabase /> DBMS
                            </span>
                            <span className="chip">
                                <FiCode /> Compiler basics
                            </span>
                            <span className="chip">
                                <FiShield /> Security basics
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="toggle"
                        onClick={toggle}
                        aria-expanded={open}
                        aria-controls="about-panel"
                        title={open ? "Collapse" : "Expand"}
                    >
                        <span className="tText">
                            {open ? "Collapse" : "Expand"}
                        </span>
                        <span className={`tIcon ${open ? "open" : ""}`}>
                            <FiChevronDown />
                        </span>
                    </button>
                </div>

                <div id="about-panel" className={`panel ${open ? "open" : ""}`}>
                    <div className="panelInner">
                        <div className="grid">
                            <div className="card">
                                <div className="cTop">
                                    <span className="cIcon">
                                        <FiHardDrive />
                                    </span>
                                    <div className="cTitle">
                                        What this teaches
                                    </div>
                                </div>

                                <ul className="list">
                                    <li>
                                        How processes, threads, memory, and file
                                        systems behave
                                    </li>
                                    <li>
                                        How requests move through DNS, TCP,
                                        HTTP, TLS, and load balancers
                                    </li>
                                    <li>
                                        How databases guarantee correctness with
                                        ACID and isolation
                                    </li>
                                    <li>
                                        How source code becomes runnable
                                        programs (compile, AST, transpile)
                                    </li>
                                </ul>
                            </div>

                            <div className="card">
                                <div className="cTop">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cTitle">Why it matters</div>
                                </div>

                                <div className="rows">
                                    <div className="row">
                                        <span className="k">Debugging</span>
                                        <span className="v">
                                            Know where latency and failures come
                                            from
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Performance</span>
                                        <span className="v">
                                            Make better trade-offs for speed and
                                            memory
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Interviews</span>
                                        <span className="v">
                                            Strong answers for system design and
                                            backend rounds
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Confidence</span>
                                        <span className="v">
                                            Build mental models, not just
                                            memorized lines
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="card wide">
                                <div className="cTop">
                                    <span className="cIcon">
                                        <FiActivity />
                                    </span>
                                    <div className="cTitle">
                                        How to use this repo
                                    </div>
                                </div>

                                <div className="steps">
                                    <div className="step">
                                        <div className="num">1</div>
                                        <div className="txt">
                                            Read one topic in 5 to 10 minutes
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="num">2</div>
                                        <div className="txt">
                                            Rebuild the idea using the examples
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="num">3</div>
                                        <div className="txt">
                                            Speak it out loud like an interview
                                            answer
                                        </div>
                                    </div>
                                    <div className="step">
                                        <div className="num">4</div>
                                        <div className="txt">
                                            Solve 1 small question to lock it in
                                        </div>
                                    </div>
                                </div>

                                <div className="note">
                                    Goal - build intuition that helps you ship,
                                    debug, and scale real products.
                                </div>
                            </div>
                        </div>

                        <div className="foot">
                            <div className="footLeft">
                                <span className="pill">Sections are short</span>
                                <span className="pill">Beginner-friendly</span>
                                <span className="pill">Production-focused</span>
                            </div>

                            <div className="footRight">
                                <span className="hint">
                                    Tip - keep notes in your own words and
                                    revisit weekly
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Wrapper>
    );
};

export default About;
