// src/topics/transactions/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiCheckCircle,
    FiLock,
    FiRepeat,
    FiAlertTriangle,
    FiLayers,
    FiActivity,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Transactions = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Transactions",
            sub: "A transaction is a single unit of work in a database. It groups multiple operations so they either all succeed together or all fail together. This prevents partial updates and keeps data consistent.",
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
        <Styled.Wrapper id="transactions">
            <div className="top">
                <h2 className="title">Transactions</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> Group operations
                    </span>
                    <span className="pill">
                        <FiCheckCircle /> All or nothing
                    </span>
                    <span className="pill">
                        <FiLock /> Isolation and locking
                    </span>
                    <span className="pill">
                        <FiRepeat /> Commit or rollback
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="tx-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiDatabase />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and beginner examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="tx-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    A transaction is a "safe box" for multiple
                                    database operations. It ensures your data is
                                    not left half updated if something fails in
                                    the middle.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why transactions exist
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Prevent partial updates when an
                                                error happens
                                            </li>
                                            <li>
                                                Keep multi step operations
                                                consistent
                                            </li>
                                            <li>
                                                Protect data when multiple users
                                                update at once
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Real world analogy
                                        </div>
                                        <p className="miniText">
                                            Like sending money between two bank
                                            accounts. Either debit and credit
                                            both happen, or nothing happens.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Classic example - transfer
                                </h3>
                                <p className="p">
                                    Suppose you transfer 500 from Account A to
                                    Account B.
                                    <br />
                                    Without a transaction, you can end up with
                                    money removed from A but not added to B if
                                    the server crashes in between.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example flow</div>
                                    <pre className="code">{`Start transaction

1) A balance = A balance - 500
2) B balance = B balance + 500

If both succeed -> COMMIT
If anything fails -> ROLLBACK`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            What a crash would do
                                        </div>
                                        <div className="cSub">
                                            Transactions protect you from "half
                                            done" states. If a crash happens
                                            before commit, rollback keeps data
                                            unchanged.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Transaction life cycle</h3>
                                <p className="p">
                                    Most databases follow a simple life cycle:
                                    begin, do operations, commit or rollback.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">BEGIN</div>
                                        <p className="flowText">
                                            Start a new transaction boundary.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            READ and WRITE
                                        </div>
                                        <p className="flowText">
                                            Queries run inside the transaction.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">COMMIT</div>
                                        <p className="flowText">
                                            Make changes permanent.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            ROLLBACK
                                        </div>
                                        <p className="flowText">
                                            Undo changes made in this
                                            transaction.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">SQL example</div>
                                    <pre className="code">{`BEGIN;

UPDATE accounts
SET balance = balance - 500
WHERE id = 'A';

UPDATE accounts
SET balance = balance + 500
WHERE id = 'B';

COMMIT;`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Commit vs rollback</h3>
                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">Commit</div>
                                        <p className="boxText">
                                            Confirms the transaction. Changes
                                            are saved and become visible to
                                            others.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">Rollback</div>
                                        <p className="boxText">
                                            Cancels the transaction. Any changes
                                            inside it are undone.
                                        </p>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Most real bugs happen when developers forget
                                    to commit, forget to rollback on error, or
                                    leave transactions open for too long.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Concurrency - why locking shows up
                                </h3>
                                <p className="p">
                                    When multiple users update the same row at
                                    the same time, databases use isolation and
                                    locks to avoid inconsistent results.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Locking</div>
                                        <p className="miniText">
                                            Locking blocks other transactions
                                            from modifying the same data until
                                            the lock is released.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Isolation level
                                        </div>
                                        <p className="miniText">
                                            Controls how much one transaction
                                            can see of another transaction's
                                            changes.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple conflict example
                                    </div>
                                    <pre className="code">{`Transaction 1:
Read balance = 1000
Update balance = 900 (not committed yet)

Transaction 2 at same time:
If it also reads 1000 and updates, final balance can be wrong

Isolation + locks prevent this kind of race condition`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLock />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Practical tip
                                        </div>
                                        <div className="cSub">
                                            Keep transactions short. Long
                                            transactions hold locks longer and
                                            slow down other users.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Terms and full forms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">DBMS</span> -
                                        Database Management System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SQL</span> -
                                        Structured Query Language
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">ACID</span> -
                                        Atomicity, Consistency, Isolation,
                                        Durability
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">BEGIN</span> -
                                        Start of a transaction
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">COMMIT</span> -
                                        Save changes permanently
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">ROLLBACK</span> -
                                        Undo changes in a transaction
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is "transfer money" a
                                            transaction problem?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because it has multiple dependent
                                            updates. If one update happens and
                                            the other fails, the system becomes
                                            inconsistent.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why should transactions be short?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Short transactions release locks
                                            quickly, improving concurrency and
                                            performance.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How to say it in interviews
                                </h3>
                                <ul className="list">
                                    <li>
                                        "A transaction groups operations so they
                                        either all succeed (commit) or all fail
                                        (rollback)."
                                    </li>
                                    <li>
                                        "Transactions protect consistency in
                                        multi step updates like money transfer."
                                    </li>
                                    <li>
                                        "Concurrency issues are handled using
                                        isolation levels and locking."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics in DBMS</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiCheckCircle />
                                        <div className="nText">
                                            ACID properties (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiActivity />
                                        <div className="nText">
                                            Isolation levels (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLock />
                                        <div className="nText">
                                            Locking and deadlocks (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiRepeat />
                                        <div className="nText">
                                            Indexing and performance (deep)
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </Styled.Wrapper>
    );
};

export default Transactions;
