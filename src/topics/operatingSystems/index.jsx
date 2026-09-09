// src/topics/operatingSystems/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCpu,
    FiLayers,
    FiShuffle,
    FiHardDrive,
    FiLock,
    FiBookOpen,
    FiZap,
    FiGitBranch,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const OperatingSystems = () => {
    const [open, setOpen] = useState(true);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Operating Systems",
            sub: "An Operating System (OS) is the core software that manages hardware and runs programs. It controls CPU time, memory, files, and input output (I O), so your apps do not have to talk to hardware directly.",
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
        <Styled.Wrapper id="operating-systems">
            <div className="top">
                <h2 className="title">Operating Systems</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiCpu /> CPU scheduling
                    </span>
                    <span className="pill">
                        <FiLayers /> Memory management
                    </span>
                    <span className="pill">
                        <FiHardDrive /> File systems
                    </span>
                    <span className="pill">
                        <FiShuffle /> Context switching
                    </span>
                    <span className="pill">
                        <FiLock /> Deadlock handling
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="os-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
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
                        id="os-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What an OS actually does</h3>
                                <p className="p">
                                    Think of the OS as a manager between
                                    hardware and apps. It provides safe
                                    "services" so programs can run without
                                    fighting each other or crashing the machine.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            OS responsibilities
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Run multiple programs safely
                                            </li>
                                            <li>Share CPU fairly</li>
                                            <li>Allocate memory (RAM)</li>
                                            <li>Read and write files</li>
                                            <li>Handle input output (I O)</li>
                                            <li>
                                                Protect and isolate processes
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Real example
                                        </div>
                                        <p className="miniText">
                                            When you open Chrome, VS Code, and a
                                            music player together, the OS keeps
                                            switching CPU time between them and
                                            keeps their memory separate.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Process vs Thread (quick mental model)
                                </h3>
                                <p className="p">
                                    A <strong>process</strong> is a running
                                    program with its own memory space. A{" "}
                                    <strong>thread</strong> is a smaller unit of
                                    execution inside a process. Threads share
                                    the same process memory, but each thread has
                                    its own stack.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">Process</div>
                                        <ul className="list">
                                            <li>Own address space (memory)</li>
                                            <li>Stronger isolation</li>
                                            <li>
                                                Heavier to create and switch
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">Thread</div>
                                        <ul className="list">
                                            <li>Shares process memory</li>
                                            <li>Lightweight execution</li>
                                            <li>
                                                Needs synchronization (locks)
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Browser (one process)
- Thread 1: UI rendering
- Thread 2: Network requests
- Thread 3: JavaScript execution

They share memory like cache and page data, but run in parallel (or time sliced).`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">CPU scheduling</h3>
                                <p className="p">
                                    CPU scheduling decides which process or
                                    thread runs next on the CPU (Central
                                    Processing Unit). The goal is good response
                                    time and fair usage.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">FCFS</div>
                                        <div className="a">
                                            First Come First Serve. Simple queue
                                            order.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">SJF</div>
                                        <div className="a">
                                            Shortest Job First. Minimizes
                                            average waiting time but needs job
                                            length estimate.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Round Robin</div>
                                        <div className="a">
                                            Each process gets a small time
                                            slice. Common in time sharing
                                            systems.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Quick intuition
                                        </div>
                                        <div className="cSub">
                                            Round Robin feels smooth for users
                                            because everyone gets CPU often.
                                            FCFS can feel "stuck" if a long job
                                            is first.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Context switching</h3>
                                <p className="p">
                                    A <strong>context switch</strong> happens
                                    when the CPU stops running one thread and
                                    starts another. The OS saves the current
                                    state (registers, program counter, stack
                                    pointer) and loads the next state.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it happens
                                        </div>
                                        <p className="miniText">
                                            Time slice ended, I O waiting,
                                            higher priority task arrived, or an
                                            interrupt occurred.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Cost</div>
                                        <p className="miniText">
                                            Context switching is not free. Too
                                            many switches can reduce throughput.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple scenario
                                    </div>
                                    <pre className="code">{`Thread A is running
- Time slice ends
OS saves A state to PCB or TCB
OS loads Thread B state
CPU runs Thread B

PCB: Process Control Block
TCB: Thread Control Block`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Memory management</h3>
                                <p className="p">
                                    Memory management is how the OS uses RAM
                                    (Random Access Memory) to run programs
                                    safely. Each process thinks it has its own
                                    continuous memory, but the OS maps it to
                                    real physical memory.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Virtual memory
                                        </div>
                                        <p className="boxText">
                                            An illusion of large, private memory
                                            per process. Backed by RAM plus
                                            disk.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">Paging</div>
                                        <p className="boxText">
                                            Splits memory into fixed size pages
                                            and frames to manage allocation and
                                            swapping.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example mental model
                                    </div>
                                    <pre className="code">{`Your app asks for memory address 0x1000 (virtual)
MMU maps it to some physical RAM location
If the page is not in RAM, a page fault happens
OS loads the page from disk into RAM, then continues

MMU: Memory Management Unit`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Deadlock</h3>
                                <p className="p">
                                    A <strong>deadlock</strong> is when two or
                                    more processes wait forever for each other
                                    to release resources. Nobody moves.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Real world example
                                        </div>
                                        <p className="miniText">
                                            Two threads each hold one lock and
                                            wait for the other lock. Both are
                                            stuck.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Common fix idea
                                        </div>
                                        <p className="miniText">
                                            Always acquire locks in the same
                                            order, or use timeouts.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Thread 1:
lock(A)
lock(B)  <- waits because Thread 2 has B

Thread 2:
lock(B)
lock(A)  <- waits because Thread 1 has A

Both wait forever -> deadlock`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">File systems</h3>
                                <p className="p">
                                    A <strong>file system</strong> organizes how
                                    data is stored and retrieved on disk (or
                                    SSD). It handles filenames, directories,
                                    metadata, and permissions.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">File</div>
                                        <p className="flowText">
                                            Bytes stored on disk with metadata
                                            like size and timestamps.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Directory
                                        </div>
                                        <p className="flowText">
                                            A mapping from names to files and
                                            subfolders.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Permissions
                                        </div>
                                        <p className="flowText">
                                            Who can read, write, execute.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiHardDrive />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Beginner tip
                                        </div>
                                        <div className="cSub">
                                            A database also stores data on disk,
                                            but it sits on top of the file
                                            system. The OS is still involved.
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
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MMU</span> -
                                        Memory Management Unit
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
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                </div>

                                <div className="finalNote">
                                    If you understand process, thread, context
                                    switch, paging, and deadlock, you can debug
                                    many "random" production issues faster.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does a context switch have a
                                            cost?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because the OS must save and restore
                                            CPU state and it can flush or
                                            disturb CPU caches, which wastes
                                            time.
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
                                            Threads share memory. Without locks,
                                            two threads can update the same data
                                            at the same time and corrupt it.
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
                                        "A process has its own memory space, a
                                        thread shares process memory but has its
                                        own stack."
                                    </li>
                                    <li>
                                        "Context switching saves and restores
                                        CPU state. Too many switches hurt
                                        throughput."
                                    </li>
                                    <li>
                                        "Paging maps virtual pages to physical
                                        frames using the MMU and page tables."
                                    </li>
                                    <li>
                                        "Deadlock happens when locks are
                                        acquired in conflicting orders. A common
                                        fix is consistent lock ordering."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics inside OS</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiGitBranch />
                                        <div className="nText">
                                            Process vs thread (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCpu />
                                        <div className="nText">
                                            Scheduling algorithms (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">
                                            Paging and virtual memory (deep)
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLock />
                                        <div className="nText">
                                            Deadlock conditions and prevention
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

export default OperatingSystems;
