// src/topics/contextSwitching/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiShuffle,
    FiCpu,
    FiClock,
    FiZap,
    FiLayers,
    FiAlertCircle,
    FiBox,
    FiActivity,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const ContextSwitching = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Context switching",
            sub: "Context switching is when the CPU pauses one thread or process and resumes another. The Operating System saves the current execution state and restores the next one, so multitasking feels smooth.",
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
        <Styled.Wrapper id="context-switching">
            <div className="top">
                <h2 className="title">Context switching</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiShuffle /> Save and restore state
                    </span>
                    <span className="pill">
                        <FiCpu /> Enables multitasking
                    </span>
                    <span className="pill">
                        <FiClock /> Has overhead cost
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="context-switching-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiActivity />
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
                        id="context-switching-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    A CPU can run only one thread at a time per
                                    core. So the OS switches between tasks
                                    rapidly. This switch is called{" "}
                                    <strong>context switching</strong>.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Context means
                                        </div>
                                        <p className="miniText">
                                            The full "current state" of a
                                            running task - CPU registers,
                                            program counter, stack pointer, and
                                            more.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Switching means
                                        </div>
                                        <p className="miniText">
                                            Save the old state, load the new
                                            state, and continue as if nothing
                                            happened.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What gets saved and restored
                                </h3>
                                <p className="p">
                                    The OS saves execution details so it can
                                    pause and later resume exactly from the same
                                    point.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">
                                            Program Counter (PC)
                                        </div>
                                        <div className="a">
                                            The address of the next instruction
                                            to execute.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Registers</div>
                                        <div className="a">
                                            Fast CPU storage holding temporary
                                            values.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Stack Pointer</div>
                                        <div className="a">
                                            Points to the current location of
                                            the call stack.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">CPU flags</div>
                                        <div className="a">
                                            Status bits like zero, carry, sign,
                                            overflow.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Memory mappings</div>
                                        <div className="a">
                                            Page table pointers or memory map
                                            references, depending on OS.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">
                                            Kernel bookkeeping
                                        </div>
                                        <div className="a">
                                            The OS stores these in structures
                                            like PCB or TCB.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple instruction flow
                                    </div>
                                    <pre className="code">{`Thread A is running
PC = 1200
Registers hold values for calculations

Timer interrupt happens
OS saves A context to memory
OS loads Thread B context
PC becomes B's PC value
CPU continues from B's next instruction`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Why it happens</h3>
                                <p className="p">
                                    Context switching happens for multiple
                                    reasons. Some are planned (time slicing),
                                    some are forced (interrupts).
                                </p>

                                <div className="termGrid">
                                    <div className="term">
                                        <div className="tHead">
                                            <span className="tIcon">
                                                <FiClock />
                                            </span>
                                            <span className="tTitle">
                                                Time slice ended
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            In Round Robin scheduling, each task
                                            gets a small time. When time is
                                            over, the OS switches to another
                                            task.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="tIcon">
                                                <FiZap />
                                            </span>
                                            <span className="tTitle">
                                                Interrupts
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            Hardware events like keyboard input
                                            or network packet arrival can
                                            interrupt and trigger OS work.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="tIcon">
                                                <FiLayers />
                                            </span>
                                            <span className="tTitle">
                                                I O waiting
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            If a task waits for disk or network
                                            I O, the OS switches to another
                                            runnable task to avoid wasting CPU.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="tIcon">
                                                <FiAlertCircle />
                                            </span>
                                            <span className="tTitle">
                                                Higher priority arrives
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            A high priority task can preempt a
                                            low priority one, so urgent work
                                            runs first.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Context switch cost (why it is not free)
                                </h3>
                                <p className="p">
                                    A context switch takes time. During the
                                    switch, no "useful" app work is happening.
                                    Too many context switches reduce throughput.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Save and restore work
                                        </div>
                                        <p className="miniText">
                                            The OS must store registers and load
                                            new registers, update kernel
                                            structures, and update scheduling.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Cache disruption
                                        </div>
                                        <p className="miniText">
                                            CPU caches may no longer match the
                                            new task's data. This causes cache
                                            misses and slows down execution.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Real production vibe
                                        </div>
                                        <div className="cSub">
                                            If you create too many threads, the
                                            system may spend more time switching
                                            than doing useful work. This is one
                                            reason why thread pools exist.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Process switch vs thread switch
                                </h3>
                                <p className="p">
                                    Switching between threads of the same
                                    process is often cheaper than switching
                                    between different processes, because
                                    processes have separate memory maps.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Thread context switch
                                        </div>
                                        <ul className="list">
                                            <li>Switch stacks and registers</li>
                                            <li>Same address space</li>
                                            <li>Usually cheaper</li>
                                        </ul>
                                    </div>

                                    <div className="box">
                                        <div className="boxTitle">
                                            Process context switch
                                        </div>
                                        <ul className="list">
                                            <li>Switch memory mappings</li>
                                            <li>Flush TLB often</li>
                                            <li>Usually more expensive</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Practical example
                                    </div>
                                    <pre className="code">{`Same process threads:
- Browser UI thread -> Browser network thread
Less overhead

Different processes:
- Chrome process -> VS Code process
More overhead because memory mapping changes`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">OS</span> -
                                        Operating System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">PC</span> -
                                        Program Counter
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
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
                                        <span className="mono">TLB</span> -
                                        Translation Lookaside Buffer
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Context switching is the hidden cost behind
                                    "too many threads" and "too many runnable
                                    tasks". It enables multitasking, but it also
                                    adds overhead.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can too many threads hurt
                                            performance?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because the OS spends more time
                                            doing context switches and the CPU
                                            caches get disturbed more often.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What starts a context switch during
                                            Round Robin?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            The timer interrupt when the time
                                            slice ends.
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
                                        "A context switch saves CPU state of the
                                        current thread and restores the next, so
                                        execution can resume later."
                                    </li>
                                    <li>
                                        "Context switching has overhead because
                                        saving registers, scheduling, and cache
                                        or TLB effects take time."
                                    </li>
                                    <li>
                                        "Thread switches are usually cheaper
                                        than process switches because address
                                        space stays the same."
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

export default ContextSwitching;
