// src/topics/dbmsConcepts/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiShield,
    FiRepeat,
    FiLayers,
    FiLock,
    FiSearch,
    FiCheckCircle,
    FiZap,
    FiGitBranch,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const DbmsConcepts = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "DBMS Concepts",
            sub: "A DBMS (Database Management System) is software that stores data safely and helps you query and update it efficiently. The key ideas are correctness (ACID), concurrency (transactions, locks), and speed (indexes).",
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
        <Styled.Wrapper id="dbms-concepts">
            <div className="top">
                <h2 className="title">DBMS Concepts</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiShield /> ACID
                    </span>
                    <span className="pill">
                        <FiRepeat /> Transactions
                    </span>
                    <span className="pill">
                        <FiSearch /> Indexing
                    </span>
                    <span className="pill">
                        <FiLayers /> Normalization
                    </span>
                    <span className="pill">
                        <FiLock /> Isolation and locking
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="dbms-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiDatabase />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanations and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="dbms-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    What a DBMS solves in real life
                                </h3>
                                <p className="p">
                                    Without a DBMS, your data can get corrupted
                                    when multiple users update at the same time,
                                    queries can become slow as data grows, and
                                    crashes can cause lost updates.
                                    <br />
                                    DBMS gives you safe storage, fast querying,
                                    and controlled concurrency.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Example product
                                        </div>
                                        <p className="miniText">
                                            An ecommerce app needs correct stock
                                            counts. If two customers buy the
                                            last item at the same time, DBMS
                                            prevents negative stock.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Example banking
                                        </div>
                                        <p className="miniText">
                                            Money transfer must be correct. If
                                            the server crashes mid transfer, you
                                            cannot lose or duplicate money.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Transactions</h3>
                                <p className="p">
                                    A <strong>transaction</strong> is a group of
                                    queries that must be treated as one unit. It
                                    either fully completes or does not apply at
                                    all.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example - bank transfer
                                    </div>
                                    <pre className="code">{`Transaction:
1) deduct 500 from A
2) add 500 to B

If step 1 succeeds but step 2 fails, the transaction must roll back.
So the final state stays correct.`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiRepeat />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Simple rule
                                        </div>
                                        <div className="cSub">
                                            Use a transaction when multiple
                                            updates must stay consistent
                                            together.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">ACID properties</h3>
                                <p className="p">
                                    ACID are the guarantees provided by most
                                    relational databases during transactions.
                                    <br />
                                    ACID stands for Atomicity, Consistency,
                                    Isolation, Durability.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Atomicity</div>
                                        <div className="a">
                                            All or nothing. A transaction is
                                            fully applied or fully rolled back.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Consistency</div>
                                        <div className="a">
                                            Rules remain true. Constraints and
                                            invariants are not broken.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Isolation</div>
                                        <div className="a">
                                            Concurrent transactions do not
                                            corrupt each other. Results look
                                            like one after another.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Durability</div>
                                        <div className="a">
                                            Once committed, data survives
                                            crashes.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        ACID in one example
                                    </div>
                                    <pre className="code">{`Order placement:
- Reduce stock
- Create order row
- Create payment row

Atomicity: either all three happen or none happen
Consistency: stock cannot go below 0
Isolation: two users do not buy the same last unit
Durability: after commit, crash will not remove the order`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Indexing</h3>
                                <p className="p">
                                    An <strong>index</strong> is a data
                                    structure that makes reads faster by helping
                                    the DB jump to matching rows instead of
                                    scanning everything.
                                    <br />
                                    Most common index type is a B tree (balanced
                                    tree).
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Without index
                                        </div>
                                        <p className="boxText">
                                            Full table scan. Check every row.
                                            Slow on large tables.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            With index
                                        </div>
                                        <p className="boxText">
                                            Jump directly to matching rows. Much
                                            faster for lookups and filtering.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiSearch />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Trade-off</div>
                                        <div className="cSub">
                                            Indexes speed up reads but add extra
                                            cost on writes because indexes also
                                            must be updated.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example intuition
                                    </div>
                                    <pre className="code">{`users table with 10 million rows

Query:
SELECT * FROM users WHERE email = "x@y.com"

With index on email:
- find key fast
- fetch row fast

Without index:
- scan all rows until match is found`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Normalization</h3>
                                <p className="p">
                                    Normalization is a way to design tables to
                                    reduce duplication and avoid update bugs. It
                                    usually means splitting data into related
                                    tables and linking with keys.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it exists
                                        </div>
                                        <p className="miniText">
                                            If the same data is repeated in many
                                            places, updates become risky and
                                            inconsistent.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Common outcome
                                        </div>
                                        <p className="miniText">
                                            Separate entities into separate
                                            tables like users, orders, products,
                                            payments.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example - avoid duplicate user info
                                    </div>
                                    <pre className="code">{`Bad design:
orders table stores customerName and customerPhone in every row

Problem:
If phone changes, you must update many rows

Better design:
users table stores name and phone once
orders table stores userId
Join when needed`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Isolation levels (beginner view)
                                </h3>
                                <p className="p">
                                    Isolation decides how much one transaction
                                    can "see" the uncommitted work of another.
                                    Lower isolation means more concurrency but
                                    more anomalies.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">
                                            Read Uncommitted
                                        </div>
                                        <div className="a">
                                            Can see uncommitted changes. Risky.
                                            Dirty reads possible.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Read Committed</div>
                                        <div className="a">
                                            Only sees committed changes. Common
                                            default in many systems.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Repeatable Read</div>
                                        <div className="a">
                                            Same row reads stay stable inside a
                                            transaction.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Serializable</div>
                                        <div className="a">
                                            Strongest. Behaves like transactions
                                            ran one by one.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Dirty read example
                                    </div>
                                    <pre className="code">{`T1 updates balance to 0 but does not commit yet
T2 reads balance as 0
T1 rolls back
Now T2 used a value that never actually happened -> dirty read`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Locking</h3>
                                <p className="p">
                                    Locks prevent unsafe concurrent updates. A
                                    lock controls access to a row or range so
                                    two transactions do not write conflicting
                                    data.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Shared lock
                                        </div>
                                        <p className="miniText">
                                            Multiple readers allowed. Writers
                                            blocked.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Exclusive lock
                                        </div>
                                        <p className="miniText">
                                            Only one writer. Readers and writers
                                            blocked.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLock />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Watch out</div>
                                        <div className="cSub">
                                            Locks can reduce concurrency and can
                                            also lead to deadlocks if acquired
                                            in different orders.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Two transactions update same row:

T1: lock row 101, update, commit
T2: waits for lock, then updates, commit

This prevents lost updates.`}</pre>
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
                                        Atomicity, Consistency, Isolation,
                                        Durability
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SQL</span> -
                                        Structured Query Language
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">B tree</span> -
                                        Balanced tree used for indexes
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">T1 T2</span> -
                                        Transaction 1 Transaction 2
                                    </div>
                                </div>

                                <div className="finalNote">
                                    DBMS topics show up everywhere in backend
                                    interviews because they explain correctness
                                    under concurrency, and performance at scale.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why do indexes slow down writes?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because every insert, update, delete
                                            must also update the index
                                            structure.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What does Atomicity guarantee?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            A transaction is all or nothing. No
                                            partial updates remain.
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
                                        "A transaction groups multiple queries
                                        into one unit that commits or rolls
                                        back."
                                    </li>
                                    <li>
                                        "ACID guarantees correctness. Isolation
                                        controls anomalies under concurrency."
                                    </li>
                                    <li>
                                        "Indexes speed up reads but cost extra
                                        on writes because the index must be
                                        updated."
                                    </li>
                                    <li>
                                        "Normalization reduces duplication and
                                        avoids update anomalies."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiGitBranch />
                                        <div className="nText">
                                            Transactions and isolation (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiSearch />
                                        <div className="nText">
                                            Index types and query planning
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLock />
                                        <div className="nText">
                                            Locking, deadlocks, and MVCC
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCheckCircle />
                                        <div className="nText">
                                            Normal forms and practical schema
                                            design
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

export default DbmsConcepts;
