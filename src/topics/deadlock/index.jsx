// src/topics/deadlock/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLock,
    FiAlertTriangle,
    FiShield,
    FiRepeat,
    FiGitMerge,
    FiCpu,
    FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Deadlock = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Deadlock",
            sub: "Deadlock is a situation where two or more processes or threads are stuck forever because each one is waiting for a resource held by another. Nobody can move, so the system becomes stuck.",
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
        <Styled.Wrapper id="deadlock">
            <div className="top">
                <h2 className="title">Deadlock</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLock /> Locks and resources
                    </span>
                    <span className="pill">
                        <FiRepeat /> Circular waiting
                    </span>
                    <span className="pill">
                        <FiAlertTriangle /> System stuck
                    </span>
                    <span className="pill">
                        <FiShield /> Prevent and avoid
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="deadlock-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiLock />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms, conditions, and fixes
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="deadlock-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning in simple words</h3>
                                <p className="p">
                                    A deadlock happens when work cannot continue
                                    because each worker is waiting for something
                                    another worker will not release.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Real life analogy
                                        </div>
                                        <p className="miniText">
                                            Two people enter a narrow hallway
                                            from opposite sides and both refuse
                                            to step back. Nobody can pass.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            In software
                                        </div>
                                        <p className="miniText">
                                            Two threads each hold one lock and
                                            both wait for the other lock. Both
                                            threads freeze forever.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Classic deadlock example (two locks)
                                </h3>
                                <p className="p">
                                    Locks are used to protect shared data. But
                                    if locks are taken in the wrong order, you
                                    can create a circular wait.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Thread 1:
lock(A)
lock(B)  - waits because Thread 2 has B

Thread 2:
lock(B)
lock(A)  - waits because Thread 1 has A

Both threads wait forever - deadlock`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            What is the problem?
                                        </div>
                                        <div className="cSub">
                                            Thread 1 holds A and wants B. Thread
                                            2 holds B and wants A. No one can
                                            continue.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Four conditions for deadlock (must all hold)
                                </h3>
                                <p className="p">
                                    Deadlock is not random. It happens only if
                                    these four conditions are true at the same
                                    time. These are called the Coffman
                                    conditions.
                                </p>

                                <div className="condGrid">
                                    <div className="cond">
                                        <div className="cHead">
                                            <span className="mono">1</span>
                                            Mutual exclusion
                                        </div>
                                        <div className="cBody">
                                            At least one resource can be used by
                                            only one thread at a time.
                                            <br />
                                            Example - a lock.
                                        </div>
                                    </div>

                                    <div className="cond">
                                        <div className="cHead">
                                            <span className="mono">2</span>
                                            Hold and wait
                                        </div>
                                        <div className="cBody">
                                            A thread holds one resource and
                                            waits for another.
                                            <br />
                                            Example - holds A, waits for B.
                                        </div>
                                    </div>

                                    <div className="cond">
                                        <div className="cHead">
                                            <span className="mono">3</span>
                                            No preemption
                                        </div>
                                        <div className="cBody">
                                            Resources cannot be forcibly taken
                                            away. Only the owner releases them.
                                        </div>
                                    </div>

                                    <div className="cond">
                                        <div className="cHead">
                                            <span className="mono">4</span>
                                            Circular wait
                                        </div>
                                        <div className="cBody">
                                            A cycle exists.
                                            <br />
                                            Thread 1 waits for Thread 2 and
                                            Thread 2 waits for Thread 1.
                                        </div>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    If you break any one condition, deadlock
                                    cannot happen.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How to prevent deadlock (practical methods)
                                </h3>

                                <div className="fixGrid">
                                    <div className="fix">
                                        <div className="fTop">
                                            <FiGitMerge />
                                            <div className="fTitle">
                                                Lock ordering (most common)
                                            </div>
                                        </div>
                                        <p className="fText">
                                            Always acquire locks in the same
                                            order everywhere.
                                            <br />
                                            Example - always lock A then B.
                                        </p>

                                        <div className="exampleBlock">
                                            <div className="exTitle">
                                                Example rule
                                            </div>
                                            <pre className="code">{`Rule:
If you need locks A and B, always lock A first, then lock B.

Thread 1: lock(A) then lock(B)
Thread 2: lock(A) then lock(B)

No circular wait - no deadlock`}</pre>
                                        </div>
                                    </div>

                                    <div className="fix">
                                        <div className="fTop">
                                            <FiRepeat />
                                            <div className="fTitle">
                                                Timeout and retry
                                            </div>
                                        </div>
                                        <p className="fText">
                                            Try to acquire lock. If not possible
                                            within time, release what you have
                                            and retry later.
                                        </p>

                                        <div className="miniHint">
                                            Useful when you cannot enforce a
                                            strict order.
                                        </div>
                                    </div>

                                    <div className="fix">
                                        <div className="fTop">
                                            <FiShield />
                                            <div className="fTitle">
                                                Avoid holding locks during I O
                                            </div>
                                        </div>
                                        <p className="fText">
                                            I O operations can block for long
                                            time. If you hold locks while doing
                                            I O, you increase the chance of long
                                            waiting chains.
                                        </p>
                                    </div>

                                    <div className="fix">
                                        <div className="fTop">
                                            <FiCpu />
                                            <div className="fTitle">
                                                Minimize shared state
                                            </div>
                                        </div>
                                        <p className="fText">
                                            Less shared state means fewer locks.
                                            Fewer locks means fewer deadlocks.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Deadlock vs starvation (very important)
                                </h3>
                                <p className="p">
                                    People confuse these two. They are
                                    different.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Deadlock</div>
                                        <div className="a">
                                            Everyone in the cycle is stuck.
                                            Progress stops forever.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Starvation</div>
                                        <div className="a">
                                            One thread keeps getting denied
                                            resources because others keep
                                            winning.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Livelock</div>
                                        <div className="a">
                                            Threads keep changing state but
                                            still no progress, like endless
                                            retry loops.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">OS</span> -
                                        Operating System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">Mutex</span> -
                                        Mutual exclusion lock
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">Lock order</span>{" "}
                                        - A fixed rule for acquiring locks
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Deadlock prevention is mostly about being
                                    disciplined with locks - lock order, short
                                    lock duration, and avoiding I O inside
                                    locks.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Which Coffman condition does "lock
                                            ordering" break?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            It breaks circular wait because a
                                            cycle cannot form if everyone
                                            follows the same order.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is holding a lock during I O
                                            risky?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because I O can block for long time,
                                            increasing waiting chains and
                                            raising deadlock chances.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Interview lines (simple and strong)
                                </h3>
                                <ul className="list">
                                    <li>
                                        "Deadlock happens when threads wait
                                        forever due to a circular wait of
                                        locks."
                                    </li>
                                    <li>
                                        "Deadlock requires all four Coffman
                                        conditions. Break any one to prevent
                                        it."
                                    </li>
                                    <li>
                                        "The most common prevention is
                                        consistent lock ordering."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next related topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiLock />
                                        <div className="nText">
                                            Locking and synchronization
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCheckCircle />
                                        <div className="nText">
                                            Isolation levels in DBMS
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiShield />
                                        <div className="nText">
                                            Concurrency patterns
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCpu />
                                        <div className="nText">
                                            Scheduling and starvation
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

export default Deadlock;
