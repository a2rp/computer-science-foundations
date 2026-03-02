// src/topics/acid/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiShield,
    FiLock,
    FiDatabase,
    FiLayers,
    FiCheckCircle,
    FiAlertTriangle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const ACID = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "ACID in DBMS",
            sub: "ACID is a set of four properties that guarantee reliable database transactions. It ensures your data remains correct even during crashes, errors, or concurrent access.",
        };
    }, []);

    const toggle = () => setOpen((v) => !v);

    useEffect(() => {
        let tId = null;

        if (open) {
            setIsMounted(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            tId = window.setTimeout(() => setIsMounted(false), TRANSITION_MS);
        }

        return () => {
            if (tId) window.clearTimeout(tId);
        };
    }, [open]);

    return (
        <Styled.Wrapper id="acid">
            <div className="top">
                <h2 className="title">ACID</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiCheckCircle /> Atomicity
                    </span>
                    <span className="pill">
                        <FiLayers /> Consistency
                    </span>
                    <span className="pill">
                        <FiLock /> Isolation
                    </span>
                    <span className="pill">
                        <FiShield /> Durability
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="acid-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiDatabase />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                proper examples and clear explanation
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="acid-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What is a Transaction</h3>
                                <p className="p">
                                    A <strong>transaction</strong> is a group of
                                    database operations treated as a single unit
                                    of work.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Bank transfer example
                                    </div>
                                    <pre className="code">{`Transfer 100 from Account A to Account B

1. Subtract 100 from A
2. Add 100 to B

Both must succeed together.
If one fails, everything must roll back.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">A - Atomicity</h3>
                                <p className="p">
                                    Atomicity means "all or nothing". Either the
                                    whole transaction completes, or none of it
                                    does.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            If failure happens
                                        </div>
                                        <p className="miniText">
                                            Database performs a rollback to undo
                                            partial changes.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Example</div>
                                        <p className="miniText">
                                            If system crashes after subtracting
                                            money but before adding it, the
                                            subtraction must be undone.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">C - Consistency</h3>
                                <p className="p">
                                    Consistency means the database moves from
                                    one valid state to another valid state. All
                                    constraints must be satisfied.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div>
                                        <div className="cTitle">
                                            Example constraint
                                        </div>
                                        <div className="cSub">
                                            Account balance cannot be negative.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Before transaction:
Total money in system = 1000

After transfer:
Total money must still be 1000

No money should magically appear or disappear.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">I - Isolation</h3>
                                <p className="p">
                                    Isolation means multiple transactions
                                    running at the same time should not
                                    interfere with each other in a harmful way.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Problem without isolation
                                        </div>
                                        <p className="miniText">
                                            Dirty reads, lost updates, phantom
                                            reads.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Isolation levels
                                        </div>
                                        <p className="miniText">
                                            Read Uncommitted, Read Committed,
                                            Repeatable Read, Serializable.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Lost update example
                                    </div>
                                    <pre className="code">{`Initial balance = 500

Transaction 1 reads 500
Transaction 2 reads 500

T1 adds 100 -> 600
T2 adds 200 -> 700

Final value should be 800 but becomes 700.
Isolation prevents this.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">D - Durability</h3>
                                <p className="p">
                                    Durability means once a transaction is
                                    committed, it will not be lost even if the
                                    system crashes.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            How achieved
                                        </div>
                                        <p className="miniText">
                                            Write Ahead Logging (WAL) and
                                            storing data safely on disk.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Example</div>
                                        <p className="miniText">
                                            If power fails after commit, data
                                            still exists when system restarts.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full Forms and Key Terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">ACID</span> -
                                        Atomicity Consistency Isolation
                                        Durability
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">DBMS</span> -
                                        Database Management System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">WAL</span> -
                                        Write Ahead Logging
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How to explain in interview
                                </h3>
                                <ul className="list">
                                    <li>
                                        Atomicity means all or nothing
                                        execution.
                                    </li>
                                    <li>
                                        Consistency means constraints remain
                                        valid.
                                    </li>
                                    <li>
                                        Isolation prevents concurrent
                                        corruption.
                                    </li>
                                    <li>
                                        Durability ensures committed data
                                        survives crashes.
                                    </li>
                                </ul>

                                <div className="finalNote">
                                    ACID is what makes relational databases
                                    reliable for banking, finance, and critical
                                    systems.
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </Styled.Wrapper>
    );
};

export default ACID;
