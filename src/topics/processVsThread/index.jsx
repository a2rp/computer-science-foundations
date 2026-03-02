// src/topics/processVsThread/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCpu,
    FiLayers,
    FiBox,
    FiShare2,
    FiLock,
    FiGitBranch,
    FiZap,
    FiAlertTriangle,
    FiCopy,
    FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const ProcessVsThread = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Process vs Thread",
            sub: "A process is a running program with its own memory and resources. A thread is a smaller execution unit inside a process. Threads share the process memory, but each thread has its own stack and CPU state.",
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

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // ignore
        }
    };

    return (
        <Styled.Wrapper id="process-vs-thread">
            <div className="top">
                <h2 className="title">Process vs thread</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiBox /> Process - isolated
                    </span>
                    <span className="pill">
                        <FiShare2 /> Thread - shared memory
                    </span>
                    <span className="pill">
                        <FiCpu /> Runs on CPU
                    </span>
                    <span className="pill">
                        <FiLayers /> Separate stack per thread
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="pvt-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiGitBranch />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="pvt-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Simple meaning</h3>
                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Process</div>
                                        <p className="miniText">
                                            A running program.
                                            <br />- own memory space
                                            <br />- own resources (files,
                                            sockets)
                                            <br />- safer isolation
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Thread</div>
                                        <p className="miniText">
                                            A worker inside a process.
                                            <br />- shares process memory
                                            <br />- has its own stack
                                            <br />- needs sync for shared data
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Analogy</div>
                                        <div className="cSub">
                                            Process is a house. Threads are
                                            people working inside the same
                                            house. People share the kitchen
                                            (shared memory), but each person has
                                            their own backpack (stack).
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What is shared and what is separate
                                </h3>

                                <div className="compare">
                                    <div className="col">
                                        <div className="colHead">
                                            <FiBox />
                                            <span>Process</span>
                                        </div>

                                        <div className="rows">
                                            <div className="row">
                                                <span className="k">
                                                    Memory
                                                </span>
                                                <span className="v">
                                                    Separate address space
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">Crash</span>
                                                <span className="v">
                                                    One process crash usually
                                                    does not crash others
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">
                                                    Creation
                                                </span>
                                                <span className="v">
                                                    Heavier, slower than threads
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">
                                                    Switch
                                                </span>
                                                <span className="v">
                                                    Context switch cost is
                                                    higher
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="colHead">
                                            <FiShare2 />
                                            <span>Thread</span>
                                        </div>

                                        <div className="rows">
                                            <div className="row">
                                                <span className="k">
                                                    Memory
                                                </span>
                                                <span className="v">
                                                    Shared heap and globals
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">Crash</span>
                                                <span className="v">
                                                    Thread crash can kill the
                                                    whole process
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">
                                                    Creation
                                                </span>
                                                <span className="v">
                                                    Lightweight and faster
                                                </span>
                                            </div>
                                            <div className="row">
                                                <span className="k">
                                                    Switch
                                                </span>
                                                <span className="v">
                                                    Usually cheaper than
                                                    processes
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="note">
                                    Shared memory is powerful, but it can create
                                    race conditions if two threads update the
                                    same data at the same time.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Why each thread has its own stack
                                </h3>
                                <p className="p">
                                    A <strong>stack</strong> stores function
                                    call frames: local variables, return
                                    addresses, and temporary values.
                                    <br />
                                    If threads shared a single stack, function
                                    calls would overwrite each other and
                                    everything would break.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example (why separate stacks matter)
                                    </div>
                                    <pre className="code">{`Thread 1 calls: handleRequest()
- local vars: userId, token

Thread 2 calls: renderUI()
- local vars: width, height

If both used one shared stack:
Thread 2 would overwrite Thread 1 local vars
So each thread must have its own stack`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Synchronization (locks) - why needed
                                </h3>
                                <p className="p">
                                    Because threads share memory, they can
                                    update the same variable at the same time.
                                    <br />A <strong>lock</strong> (mutex) forces
                                    only one thread to enter a critical section
                                    at a time.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Race condition
                                        </div>
                                        <p className="miniText">
                                            Output depends on timing. The bug
                                            appears randomly.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Critical section
                                        </div>
                                        <p className="miniText">
                                            Code that reads or writes shared
                                            data.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example race (bank balance)
                                    </div>
                                    <pre className="code">{`balance = 100

Thread A: withdraw 60
- reads balance (100)
- computes new balance (40)
- writes balance (40)

Thread B: withdraw 60
- reads balance (100)
- computes new balance (40)
- writes balance (40)

Final balance becomes 40
But correct result should be -20 or block the second withdraw
This happened because both read the same old value`}</pre>
                                </div>

                                <div className="callout warn">
                                    <span className="cIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Lock ordering matters
                                        </div>
                                        <div className="cSub">
                                            Incorrect lock order can cause
                                            deadlock. One common rule is: always
                                            lock A then B, in every place in
                                            your codebase.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Real world examples (what uses what)
                                </h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Browser tabs</div>
                                        <div className="a">
                                            Often separate processes for
                                            isolation. One tab crash should not
                                            kill the whole browser.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Web server</div>
                                        <div className="a">
                                            Can use threads to handle many
                                            requests inside one process for
                                            speed.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Node.js</div>
                                        <div className="a">
                                            Single main thread event loop, but
                                            uses background threads for some
                                            tasks via libuv.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Tiny example (request handling)
                                    </div>
                                    <pre className="code">{`Approach A: Process per request
- safer isolation
- heavy and slower

Approach B: Thread per request
- faster creation
- must handle shared memory with locks

Approach C: Event loop (single thread)
- avoids locks for most user code
- relies on async I O and callbacks`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Quick decision guide</h3>

                                <div className="decision">
                                    <div className="dRow">
                                        <span className="label">
                                            Use processes
                                        </span>
                                        <span className="value">
                                            When isolation and safety matter, or
                                            when you want separate memory per
                                            task.
                                        </span>
                                    </div>

                                    <div className="dRow">
                                        <span className="label">
                                            Use threads
                                        </span>
                                        <span className="value">
                                            When you need parallel work inside
                                            one program and shared data is
                                            helpful.
                                        </span>
                                    </div>
                                </div>

                                <div className="note">
                                    In interviews, always mention trade-off:
                                    processes are safer but heavier, threads are
                                    faster but need synchronization.
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
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">PCB</span> -
                                        Process Control Block
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TCB</span> -
                                        Thread Control Block
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">Mutex</span> -
                                        Mutual Exclusion lock
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why are threads usually faster than
                                            processes?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because they share the same address
                                            space, so creation and switching
                                            usually needs less setup and less
                                            memory mapping work.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why do threads need locks?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because shared memory can be updated
                                            by multiple threads at the same
                                            time, causing race conditions and
                                            corrupted data.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Interview lines</h3>
                                <div className="lines">
                                    <div className="line">
                                        <span className="ok">
                                            <FiCheckCircle />
                                        </span>
                                        <span>
                                            "Process has its own address space,
                                            thread shares process memory but has
                                            its own stack."
                                        </span>
                                        <button
                                            type="button"
                                            className="copyBtn"
                                            onClick={() =>
                                                handleCopy(
                                                    "Process has its own address space, thread shares process memory but has its own stack.",
                                                )
                                            }
                                            title="Copy"
                                            aria-label="Copy line"
                                        >
                                            <FiCopy />
                                        </button>
                                    </div>

                                    <div className="line">
                                        <span className="ok">
                                            <FiCheckCircle />
                                        </span>
                                        <span>
                                            "Processes are safer but heavier,
                                            threads are faster but require
                                            synchronization."
                                        </span>
                                        <button
                                            type="button"
                                            className="copyBtn"
                                            onClick={() =>
                                                handleCopy(
                                                    "Processes are safer but heavier, threads are faster but require synchronization.",
                                                )
                                            }
                                            title="Copy"
                                            aria-label="Copy line"
                                        >
                                            <FiCopy />
                                        </button>
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

export default ProcessVsThread;
