// src/topics/locking/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLock,
    FiShield,
    FiShuffle,
    FiAlertTriangle,
    FiRepeat,
    FiCpu,
    FiSliders,
    FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Locking = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Locking",
            sub: "Locking is a coordination technique to protect shared data when multiple threads or processes run at the same time. A lock ensures only one worker enters a critical section at a time.",
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
        <Styled.Wrapper id="locking">
            <div className="top">
                <h2 className="title">Locking</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLock /> Mutual exclusion
                    </span>
                    <span className="pill">
                        <FiShield /> Protect shared state
                    </span>
                    <span className="pill">
                        <FiShuffle /> Prevent race conditions
                    </span>
                    <span className="pill">
                        <FiRepeat /> Avoid inconsistent reads
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="locking-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiLock />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and real examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="locking-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    A <strong>lock</strong> is like a key for a
                                    shared room. Only the thread holding the key
                                    can enter the room and modify shared data.
                                    <br />
                                    The protected code area is called the{" "}
                                    <strong>critical section</strong>.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            When you need locks
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Multiple threads update the same
                                                variable
                                            </li>
                                            <li>
                                                Shared cache, queue, map, or
                                                list
                                            </li>
                                            <li>
                                                Bank balance, inventory count,
                                                counters
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What locks prevent
                                        </div>
                                        <p className="miniText">
                                            Race conditions and corrupted state
                                            when two threads write at the same
                                            time.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Race condition example</h3>
                                <p className="p">
                                    A <strong>race condition</strong> happens
                                    when output depends on unpredictable timing
                                    of threads.
                                    <br />
                                    Example: two threads increment the same
                                    counter.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Without lock - wrong result possible
                                    </div>
                                    <pre className="code">{`counter = 0

Thread A reads counter -> 0
Thread B reads counter -> 0
Thread A writes counter -> 1
Thread B writes counter -> 1

Expected 2, got 1 -> race condition`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why this happens
                                        </div>
                                        <div className="cSub">
                                            Increment is not one operation. It
                                            is read, add, write. Threads can
                                            interleave between these steps.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    With lock - correct result
                                </h3>
                                <p className="p">
                                    With a lock, only one thread can enter the
                                    critical section at a time.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        With lock - safe
                                    </div>
                                    <pre className="code">{`lock(L)

Thread A:
- acquire L
- counter = counter + 1
- release L

Thread B:
- waits until L is released
- acquire L
- counter = counter + 1
- release L

Now you get correct counter value`}</pre>
                                </div>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Mutual exclusion
                                        </div>
                                        <p className="miniText">
                                            Only one thread can be inside the
                                            critical section.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Progress
                                        </div>
                                        <p className="miniText">
                                            Threads eventually enter, but might
                                            wait their turn.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Common lock types (concept)
                                </h3>
                                <p className="p">
                                    Locking shows up in OS, DBMS, and app code.
                                    Different locks solve different patterns.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Mutex</div>
                                        <div className="a">
                                            Mutual Exclusion lock. One owner at
                                            a time.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Semaphore</div>
                                        <div className="a">
                                            Allows up to N threads. Useful for
                                            limited resources.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Read Write lock</div>
                                        <div className="a">
                                            Many readers allowed, only one
                                            writer.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Small examples (mental)
                                    </div>
                                    <pre className="code">{`Mutex:
- Only 1 thread updates shared counter

Semaphore(3):
- Only 3 threads can access DB connection pool

Read Write lock:
- Many threads can read config
- Only 1 thread can update config`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Locking problems</h3>
                                <p className="p">
                                    Locks solve correctness, but can introduce
                                    new issues if used badly.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Deadlock
                                        </div>
                                        <p className="miniText">
                                            Two threads wait forever for each
                                            other due to conflicting lock order.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Starvation
                                        </div>
                                        <p className="miniText">
                                            A thread waits too long because
                                            others keep getting the lock.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Contention
                                        </div>
                                        <p className="miniText">
                                            Many threads fight for the same
                                            lock, slowing the program.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Priority inversion
                                        </div>
                                        <p className="miniText">
                                            Low priority thread holds a lock
                                            that a high priority thread needs.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Deadlock example
                                    </div>
                                    <pre className="code">{`Thread 1:
- lock(A)
- lock(B) waits

Thread 2:
- lock(B)
- lock(A) waits

Both stuck -> deadlock`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Best practices (beginner)
                                </h3>
                                <div className="bestGrid">
                                    <div className="best">
                                        <div className="bTop">
                                            <FiCheckCircle />
                                            <span>
                                                Keep critical section small
                                            </span>
                                        </div>
                                        <p className="bText">
                                            Lock only the minimum code that must
                                            be protected. This reduces
                                            contention.
                                        </p>
                                    </div>

                                    <div className="best">
                                        <div className="bTop">
                                            <FiSliders />
                                            <span>
                                                Use consistent lock order
                                            </span>
                                        </div>
                                        <p className="bText">
                                            If you must acquire multiple locks,
                                            always acquire them in the same
                                            order. This reduces deadlocks.
                                        </p>
                                    </div>

                                    <div className="best">
                                        <div className="bTop">
                                            <FiCpu />
                                            <span>
                                                Avoid locking around I O
                                            </span>
                                        </div>
                                        <p className="bText">
                                            Long waiting operations inside a
                                            lock block everyone. Do I O outside
                                            lock if possible.
                                        </p>
                                    </div>

                                    <div className="best">
                                        <div className="bTop">
                                            <FiShuffle />
                                            <span>
                                                Prefer immutability for reads
                                            </span>
                                        </div>
                                        <p className="bText">
                                            Read only data structures reduce
                                            need for locks in many situations.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">Mutex</span> -
                                        Mutual Exclusion
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RW</span> - Read
                                        Write
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CS</span> -
                                        Critical Section
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">OS</span> -
                                        Operating System
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Locks are about correctness first.
                                    Performance comes after. Fix correctness,
                                    then reduce lock time and contention.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is counter++ unsafe in
                                            multithreading?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because it is read, add, write.
                                            Threads can interleave and overwrite
                                            updates.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What is the simplest deadlock
                                            prevention?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Acquire locks in a consistent global
                                            order.
                                        </span>
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

export default Locking;
