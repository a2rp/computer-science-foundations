// src/topics/indexing/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiSearch,
    FiDatabase,
    FiMap,
    FiTrendingUp,
    FiLayers,
    FiClock,
    FiAlertTriangle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Indexing = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Indexing",
            sub: "Indexing is a database technique that makes reads faster by keeping a special lookup structure. Without an index, the database often scans many rows. With an index, it can jump near the right rows quickly.",
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
        <Styled.Wrapper id="indexing">
            <div className="top">
                <h2 className="title">Indexing</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiSearch /> Faster queries
                    </span>
                    <span className="pill">
                        <FiMap /> Smart lookup
                    </span>
                    <span className="pill">
                        <FiTrendingUp /> Better performance
                    </span>
                    <span className="pill">
                        <FiLayers /> Extra storage
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="indexing-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiDatabase />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and real examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="indexing-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    An <strong>index</strong> is like a "table
                                    of contents" for your database table. It
                                    helps the database find rows quickly without
                                    reading every row.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Without index
                                        </div>
                                        <p className="miniText">
                                            Database performs a full scan
                                            (checks many rows) to find matches.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            With index
                                        </div>
                                        <p className="miniText">
                                            Database uses the index to jump near
                                            the matching rows fast.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Classic analogy - book vs page scanning
                                </h3>
                                <p className="p">
                                    Searching for a topic in a 500 page book:
                                    <br />- without a table of contents - you
                                    scan pages from start
                                    <br />- with a table of contents - you jump
                                    to the page number directly
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Real query example
                                    </div>
                                    <pre className="code">{`users table has 10,000,000 rows

Query:
SELECT * FROM users WHERE email = "ash@example.com";

- Without index on email:
  DB may scan many rows until it finds it

- With index on email:
  DB uses index structure to find the row quickly`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What a DB actually stores
                                </h3>
                                <p className="p">
                                    In most databases, an index stores:
                                    <br />- the indexed column value
                                    <br />- a pointer (reference) to the row
                                    location
                                </p>

                                <div className="termGrid">
                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">Key</span>
                                            <span className="tag">Value</span>
                                        </div>
                                        <p className="tBody">
                                            The column you index, like email or
                                            createdAt.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">
                                                Pointer
                                            </span>
                                            <span className="tag">
                                                Row link
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            A reference to where the full row is
                                            stored.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">
                                                Selectivity
                                            </span>
                                            <span className="tag">
                                                Uniqueness
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            If many rows share the same value,
                                            the index is less helpful.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Common index types</h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">B-Tree</div>
                                        <div className="a">
                                            Balanced tree used for range queries
                                            and sorting. Very common default in
                                            SQL.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">Hash index</div>
                                        <div className="a">
                                            Great for exact match lookups, not
                                            for range queries.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">Composite index</div>
                                        <div className="a">
                                            Index on multiple columns like
                                            (userId, createdAt). Useful for
                                            combined filters.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiClock />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Range queries
                                        </div>
                                        <div className="cSub">
                                            If you do queries like "price
                                            between 100 and 500", B-Tree indexes
                                            are often ideal.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Trade-offs</h3>
                                <p className="p">
                                    Indexing makes reads faster, but it has
                                    costs:
                                    <br />- more storage
                                    <br />- slower writes (insert update delete)
                                    <br />- maintenance overhead
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Reads</div>
                                        <p className="miniText">
                                            Faster for searches, joins, sorting.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Writes</div>
                                        <p className="miniText">
                                            Slightly slower because indexes also
                                            need updates.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout warn">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Too many indexes is bad
                                        </div>
                                        <div className="cSub">
                                            If you index everything, inserts and
                                            updates can become slow and storage
                                            increases.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Example - composite index rule
                                </h3>
                                <p className="p">
                                    Composite indexes follow a "left prefix"
                                    idea. If you create index (userId,
                                    createdAt):
                                    <br />- queries filtering by userId work
                                    well
                                    <br />- queries filtering only by createdAt
                                    may not
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Index: (userId, createdAt)

Good:
SELECT * FROM orders
WHERE userId = "u1"
ORDER BY createdAt DESC;

Maybe not good:
SELECT * FROM orders
WHERE createdAt > "2026-01-01";`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">DB</span> -
                                        Database
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SQL</span> -
                                        Structured Query Language
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">B-Tree</span> -
                                        Balanced Tree (used for ordered indexes)
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CRUD</span> -
                                        Create Read Update Delete
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">IO</span> - Input
                                        Output
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Indexes are not magic. They are a deliberate
                                    trade-off: faster reads in exchange for
                                    storage and slower writes.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            When is an index most useful?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            When you filter by a column with
                                            high uniqueness, like email or
                                            userId, and the table is large.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can indexing slow inserts?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because the DB must also insert the
                                            new key and update index structures.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Interview lines</h3>
                                <ul className="list">
                                    <li>
                                        "An index speeds up reads by reducing
                                        full table scans, but adds write
                                        overhead."
                                    </li>
                                    <li>
                                        "B-Tree indexes support range queries
                                        and ordering, hash indexes are best for
                                        exact matches."
                                    </li>
                                    <li>
                                        "Composite indexes follow left prefix,
                                        so column order matters."
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

export default Indexing;
