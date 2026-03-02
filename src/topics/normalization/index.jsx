// src/topics/normalization/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiDatabase,
    FiLayers,
    FiGrid,
    FiShuffle,
    FiCheckCircle,
    FiAlertTriangle,
    FiBookOpen,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Normalization = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Normalization",
            sub: "Normalization is a database design method to reduce duplicate data and prevent update bugs. It organizes tables so each fact is stored in the right place, with clear relationships.",
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
        <Styled.Wrapper id="normalization">
            <div className="top">
                <h2 className="title">Normalization</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> Reduce redundancy
                    </span>
                    <span className="pill">
                        <FiShuffle /> Avoid anomalies
                    </span>
                    <span className="pill">
                        <FiGrid /> Clean relations
                    </span>
                    <span className="pill">
                        <FiDatabase /> Better schema
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="normalization-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="normalization-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Why normalization exists</h3>
                                <p className="p">
                                    When the same information is repeated in
                                    many rows, your database becomes harder to
                                    maintain. Normalization reduces repetition
                                    and prevents common data bugs called
                                    anomalies.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Redundancy
                                        </div>
                                        <p className="miniText">
                                            Redundancy means storing the same
                                            fact multiple times.
                                            <br />
                                            Example - saving a customer phone
                                            number in every order row.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Goal</div>
                                        <p className="miniText">
                                            Store each fact once, then connect
                                            tables using keys.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">The 3 classic anomalies</h3>
                                <p className="p">
                                    An anomaly is an unwanted side effect caused
                                    by poor table structure.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Update anomaly</div>
                                        <div className="a">
                                            Same value exists in many rows. You
                                            update one row but miss others.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Insert anomaly</div>
                                        <div className="a">
                                            You cannot add a fact without adding
                                            unrelated data.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Delete anomaly</div>
                                        <div className="a">
                                            Deleting a row removes useful facts
                                            accidentally.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout warn">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Real pain example
                                        </div>
                                        <div className="cSub">
                                            If customer address is stored in
                                            every order row, updating an address
                                            means updating many rows. Missing
                                            one row causes inconsistent data.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Before normalization - single wide table
                                </h3>
                                <p className="p">
                                    This table repeats customer data for every
                                    order.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Orders table - bad design
                                    </div>
                                    <pre className="code">{`orders
- orderId
- customerId
- customerName
- customerPhone
- productId
- productName
- productPrice

Row 1: orderId=101, customerId=1, customerName=Ash, customerPhone=9999...
Row 2: orderId=102, customerId=1, customerName=Ash, customerPhone=9999...`}</pre>
                                </div>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Problem</div>
                                        <p className="miniText">
                                            customerName and customerPhone are
                                            repeated in every order.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Impact</div>
                                        <p className="miniText">
                                            Updates become risky and slow. Data
                                            can drift.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    After normalization - split into related
                                    tables
                                </h3>
                                <p className="p">
                                    We store customer facts in one table, order
                                    facts in another, and connect them using
                                    keys.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            customers
                                        </div>
                                        <p className="flowText">
                                            customerId, name, phone
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">orders</div>
                                        <p className="flowText">
                                            orderId, customerId, createdAt
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            orderItems
                                        </div>
                                        <p className="flowText">
                                            orderId, productId, qty
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example - normalized schema
                                    </div>
                                    <pre className="code">{`customers
- customerId (PK)
- name
- phone

orders
- orderId (PK)
- customerId (FK)
- createdAt

orderItems
- orderId (FK)
- productId (FK)
- qty

PK: Primary Key
FK: Foreign Key`}</pre>
                                </div>

                                <div className="callout ok">
                                    <span className="cIcon">
                                        <FiCheckCircle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Benefit</div>
                                        <div className="cSub">
                                            Update customer phone in one row in
                                            customers table. All orders stay
                                            consistent automatically.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Normal forms - beginner view
                                </h3>
                                <p className="p">
                                    Normal forms are levels of rules. Most
                                    projects target up to 3NF because it gives a
                                    clean schema without overcomplication.
                                </p>

                                <div className="nfGrid">
                                    <div className="nf">
                                        <div className="nfHead">
                                            <span className="nfTitle">1NF</span>
                                            <span className="tag">Atomic</span>
                                        </div>
                                        <p className="nfBody">
                                            One cell has one value, no lists.
                                            Each row is unique.
                                            <br />
                                            Example - do not store "red,blue" in
                                            one column.
                                        </p>
                                    </div>

                                    <div className="nf">
                                        <div className="nfHead">
                                            <span className="nfTitle">2NF</span>
                                            <span className="tag">
                                                Full dependency
                                            </span>
                                        </div>
                                        <p className="nfBody">
                                            Non key columns depend on the whole
                                            primary key.
                                            <br />
                                            Mostly relevant when you have a
                                            composite key.
                                        </p>
                                    </div>

                                    <div className="nf">
                                        <div className="nfHead">
                                            <span className="nfTitle">3NF</span>
                                            <span className="tag">
                                                No transitive
                                            </span>
                                        </div>
                                        <p className="nfBody">
                                            Non key columns should not depend on
                                            other non key columns.
                                            <br />
                                            Example - city and state should not
                                            both depend on zipcode in the same
                                            table.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Tiny 1NF example
                                    </div>
                                    <pre className="code">{`Bad
- studentId
- phones = "9999,8888"

Good
studentPhones
- studentId
- phone`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Tradeoff - normalization vs performance
                                </h3>
                                <p className="p">
                                    Normalization often increases joins because
                                    data is split across tables. Sometimes for
                                    read heavy systems, teams use controlled
                                    denormalization to speed up reads.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Normalized
                                        </div>
                                        <p className="miniText">
                                            Less duplication, fewer anomalies,
                                            more joins.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Denormalized
                                        </div>
                                        <p className="miniText">
                                            Faster reads, more duplication, more
                                            update risk.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiShuffle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Practical rule
                                        </div>
                                        <div className="cSub">
                                            Normalize first for correctness.
                                            Only denormalize when a real
                                            performance bottleneck is proven.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">DBMS</span> -
                                        Database Management System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">NF</span> -
                                        Normal Form
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">1NF</span> -
                                        First Normal Form
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">2NF</span> -
                                        Second Normal Form
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">3NF</span> -
                                        Third Normal Form
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">PK</span> -
                                        Primary Key
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">FK</span> -
                                        Foreign Key
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">Join</span> -
                                        Combine rows from multiple tables using
                                        keys
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Normalization is mainly about correctness
                                    and maintainability. It makes your data
                                    easier to trust.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is storing customerPhone in
                                            every order row risky?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because updates must be done in many
                                            rows. Missing one row creates
                                            inconsistent data.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What is 1NF in one line?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Each column value is atomic and does
                                            not contain lists.
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
                                        "Normalization reduces redundancy and
                                        avoids update, insert, and delete
                                        anomalies."
                                    </li>
                                    <li>
                                        "1NF means atomic values, 2NF removes
                                        partial dependency, 3NF removes
                                        transitive dependency."
                                    </li>
                                    <li>
                                        "Normalize for correctness first, then
                                        denormalize only when a proven
                                        bottleneck exists."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next related DBMS topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiDatabase />
                                        <div className="nText">
                                            Indexing and B tree basics
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">
                                            Transactions and ACID
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiGrid />
                                        <div className="nText">
                                            Isolation levels and locking
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

export default Normalization;
