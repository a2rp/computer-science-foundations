// src/topics/isolationLevels/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiLayers,
    FiLock,
    FiShield,
    FiAlertTriangle,
    FiCheckCircle,
    FiActivity,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const IsolationLevels = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Isolation levels",
            sub: "Isolation levels control how much one transaction can see the changes made by other concurrent transactions. They decide correctness vs performance trade-offs in a DBMS (Database Management System).",
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
        <Styled.Wrapper id="isolation-levels">
            <div className="top">
                <h2 className="title">Isolation levels</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> Concurrency control
                    </span>
                    <span className="pill">
                        <FiLock /> Locks or MVCC
                    </span>
                    <span className="pill">
                        <FiShield /> Correctness vs performance
                    </span>
                    <span className="pill">
                        <FiDatabase /> Transaction safety
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="isolation-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiDatabase />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear anomalies and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="isolation-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    In a database, many users do things at the
                                    same time. A <strong>transaction</strong> is
                                    one logical unit of work, like{" "}
                                    <span className="mono">transfer money</span>{" "}
                                    or <span className="mono">place order</span>
                                    .
                                    <br />
                                    Isolation decides what happens when two
                                    transactions run concurrently.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Goal of isolation
                                        </div>
                                        <p className="miniText">
                                            Make concurrent transactions behave
                                            as if they ran one by one, or close
                                            to it.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Trade-off
                                        </div>
                                        <p className="miniText">
                                            More isolation means fewer
                                            anomalies, but can reduce
                                            concurrency and throughput.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Common anomalies you must know
                                </h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Dirty read</div>
                                        <div className="a">
                                            You read data written by another
                                            transaction that has not committed
                                            yet. If it rolls back, you saw
                                            something that never happened.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">
                                            Non-repeatable read
                                        </div>
                                        <div className="a">
                                            You read the same row twice and get
                                            different values because another
                                            committed update happened in
                                            between.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">Phantom read</div>
                                        <div className="a">
                                            You run the same range query twice
                                            and the set of rows changes because
                                            another transaction inserted or
                                            deleted matching rows.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Quick mental example
                                    </div>
                                    <pre className="code">{`You: "Show all unpaid invoices over 10,000"
- You run query, get 3 rows

Another transaction inserts a new unpaid invoice of 12,000 and commits

You run same query again
- Now you get 4 rows

That new row is a phantom`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">The 4 isolation levels</h3>
                                <p className="p">
                                    These levels are usually listed from weakest
                                    to strongest. Stronger levels prevent more
                                    anomalies.
                                </p>

                                <div className="levels">
                                    <div className="level">
                                        <div className="lHead">
                                            <span className="lIcon">
                                                <FiAlertTriangle />
                                            </span>
                                            <div className="lTitle">
                                                Read Uncommitted
                                            </div>
                                        </div>
                                        <div className="lBody">
                                            Allows dirty reads. Fast, but unsafe
                                            for most real apps.
                                        </div>
                                        <div className="lTagRow">
                                            <span className="tag bad">
                                                Dirty read possible
                                            </span>
                                            <span className="tag bad">
                                                Non-repeatable possible
                                            </span>
                                            <span className="tag bad">
                                                Phantom possible
                                            </span>
                                        </div>
                                    </div>

                                    <div className="level">
                                        <div className="lHead">
                                            <span className="lIcon">
                                                <FiActivity />
                                            </span>
                                            <div className="lTitle">
                                                Read Committed
                                            </div>
                                        </div>
                                        <div className="lBody">
                                            Prevents dirty reads. You only see
                                            committed data. Still allows
                                            non-repeatable reads and phantoms.
                                        </div>
                                        <div className="lTagRow">
                                            <span className="tag good">
                                                Dirty read blocked
                                            </span>
                                            <span className="tag warn">
                                                Non-repeatable possible
                                            </span>
                                            <span className="tag warn">
                                                Phantom possible
                                            </span>
                                        </div>
                                    </div>

                                    <div className="level">
                                        <div className="lHead">
                                            <span className="lIcon">
                                                <FiLock />
                                            </span>
                                            <div className="lTitle">
                                                Repeatable Read
                                            </div>
                                        </div>
                                        <div className="lBody">
                                            If you read a row, you will keep
                                            seeing the same value for that row
                                            during the transaction. Phantom
                                            reads may still happen depending on
                                            the DB implementation.
                                        </div>
                                        <div className="lTagRow">
                                            <span className="tag good">
                                                Dirty read blocked
                                            </span>
                                            <span className="tag good">
                                                Non-repeatable blocked
                                            </span>
                                            <span className="tag warn">
                                                Phantom depends
                                            </span>
                                        </div>
                                    </div>

                                    <div className="level">
                                        <div className="lHead">
                                            <span className="lIcon">
                                                <FiShield />
                                            </span>
                                            <div className="lTitle">
                                                Serializable
                                            </div>
                                        </div>
                                        <div className="lBody">
                                            Strongest. Transactions behave like
                                            they ran one by one (serial order).
                                            Prevents dirty reads, non-repeatable
                                            reads, and phantom reads. Can reduce
                                            concurrency.
                                        </div>
                                        <div className="lTagRow">
                                            <span className="tag good">
                                                Dirty read blocked
                                            </span>
                                            <span className="tag good">
                                                Non-repeatable blocked
                                            </span>
                                            <span className="tag good">
                                                Phantom blocked
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCheckCircle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Most common default
                                        </div>
                                        <div className="cSub">
                                            Many systems use Read Committed as a
                                            default because it is a good balance
                                            for typical OLTP workloads (Online
                                            Transaction Processing).
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How databases implement isolation
                                </h3>
                                <p className="p">
                                    Isolation can be achieved using locks, or
                                    MVCC (Multi Version Concurrency Control), or
                                    a mix. The exact behavior can differ between
                                    databases.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">Locks</div>
                                        <p className="boxText">
                                            Prevent other transactions from
                                            reading or writing certain rows
                                            until you commit or rollback. Safer
                                            but can block.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">MVCC</div>
                                        <p className="boxText">
                                            Readers see a consistent snapshot
                                            while writers create new versions.
                                            More concurrency, but complexity.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example you can remember
                                    </div>
                                    <pre className="code">{`Transaction T1 starts
- reads balance = 100

Transaction T2 updates balance to 120 and commits

Under Read Committed
- if T1 reads again, it can see 120

Under Repeatable Read (snapshot style)
- T1 keeps seeing 100 for that row until it ends`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">DBMS</span> -
                                        Database Management System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">ACID</span> -
                                        Atomicity Consistency Isolation
                                        Durability
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MVCC</span> -
                                        Multi Version Concurrency Control
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">OLTP</span> -
                                        Online Transaction Processing
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">T1</span> -
                                        Transaction 1
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">T2</span> -
                                        Transaction 2
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Isolation level is not just theory. It
                                    decides bugs like double charges, wrong
                                    balances, and inconsistent reports.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Which isolation level prevents dirty
                                            reads?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Read Committed and above.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What is a phantom read in one line?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Same query returns different set of
                                            rows because of concurrent insert or
                                            delete.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Which level is strongest?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Serializable.
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
                                        "Isolation levels define visibility of
                                        concurrent changes between
                                        transactions."
                                    </li>
                                    <li>
                                        "Read Committed blocks dirty reads but
                                        allows non-repeatable reads and
                                        phantoms."
                                    </li>
                                    <li>
                                        "Repeatable Read guarantees stable reads
                                        for the same row, phantoms depend on
                                        DB."
                                    </li>
                                    <li>
                                        "Serializable makes transactions behave
                                        as if executed one by one, but reduces
                                        concurrency."
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </Styled.Wrapper>
    );
};

export default IsolationLevels;
