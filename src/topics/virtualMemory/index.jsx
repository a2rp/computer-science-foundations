// src/topics/virtualMemory/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiCpu,
    FiHardDrive,
    FiGrid,
    FiAlertCircle,
    FiBookOpen,
    FiZap,
    FiMap,
    FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const VirtualMemory = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Virtual memory",
            sub: "Virtual memory is a memory management technique where each process gets its own private address space. It lets programs behave as if they have a large continuous memory, even though the system uses RAM and disk together behind the scenes.",
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
        <Styled.Wrapper id="virtual-memory">
            <div className="top">
                <h2 className="title">Virtual memory</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiMap /> Private address space
                    </span>
                    <span className="pill">
                        <FiGrid /> Paging
                    </span>
                    <span className="pill">
                        <FiCpu /> MMU mapping
                    </span>
                    <span className="pill">
                        <FiAlertCircle /> Page faults
                    </span>
                    <span className="pill">
                        <FiHardDrive /> Disk as backup
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="vm-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and practical examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="vm-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning in simple words</h3>
                                <p className="p">
                                    Virtual memory means your program does not
                                    work with real RAM addresses directly.
                                    Instead, it uses{" "}
                                    <strong>virtual addresses</strong>.
                                    <br />
                                    The OS and hardware translate those virtual
                                    addresses to{" "}
                                    <strong>physical addresses</strong> in RAM.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Virtual address
                                        </div>
                                        <p className="miniText">
                                            The address your program thinks it
                                            is using, like address 0x1000.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Physical address
                                        </div>
                                        <p className="miniText">
                                            The real RAM location where the data
                                            actually lives.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Why virtual memory exists
                                </h3>
                                <p className="p">
                                    Virtual memory solves multiple problems at
                                    once:
                                    <br />- <strong>Isolation</strong> - one app
                                    cannot easily read another app memory
                                    <br />- <strong>Safety</strong> - prevents
                                    many crashes and attacks
                                    <br />- <strong>
                                        Simpler programming
                                    </strong>{" "}
                                    - each process feels like it has its own
                                    memory
                                    <br />-{" "}
                                    <strong>Bigger memory illusion</strong> -
                                    can use disk when RAM is limited
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCheckCircle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Key benefit
                                        </div>
                                        <div className="cSub">
                                            Two processes can both use the same
                                            virtual address 0x1000, but they map
                                            to different physical RAM. This is
                                            how isolation works.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Paging - the core technique
                                </h3>
                                <p className="p">
                                    Most systems implement virtual memory using{" "}
                                    <strong>paging</strong>.
                                    <br />
                                    Memory is split into fixed size blocks:
                                    <br />- <strong>Page</strong> - block in
                                    virtual memory
                                    <br />- <strong>Frame</strong> - block in
                                    physical RAM
                                    <br />
                                    The OS maintains a{" "}
                                    <strong>page table</strong> that stores
                                    which page maps to which frame.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Virtual memory
                                        </div>
                                        <p className="flowText">
                                            Page 0, Page 1, Page 2, Page 3...
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">RAM</div>
                                        <p className="flowText">
                                            Frame 0, Frame 1, Frame 2...
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Page table
                                        </div>
                                        <p className="flowText">
                                            Tells where each page is stored.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Tiny mapping example
                                    </div>
                                    <pre className="code">{`Virtual pages:
Page 0 -> Frame 5
Page 1 -> Frame 2
Page 2 -> not in RAM (on disk)
Page 3 -> Frame 9

Your program asks for an address in Page 2
Then a page fault happens`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    MMU and address translation
                                </h3>
                                <p className="p">
                                    The <strong>MMU</strong> (Memory Management
                                    Unit) is hardware that translates virtual
                                    addresses to physical addresses.
                                    <br />
                                    It uses the page table and often uses a fast
                                    cache called <strong>TLB</strong>.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">MMU</div>
                                        <p className="miniText">
                                            Memory Management Unit. Hardware
                                            that does address translation.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">TLB</div>
                                        <p className="miniText">
                                            Translation Lookaside Buffer. A fast
                                            cache for recent page table lookups.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        What happens on a memory access
                                    </div>
                                    <pre className="code">{`1) CPU generates a virtual address
2) MMU checks TLB for mapping
3) If hit -> get physical address quickly
4) If miss -> read page table (slower)
5) If page not present -> page fault -> OS loads page`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Page fault (very important)
                                </h3>
                                <p className="p">
                                    A <strong>page fault</strong> happens when a
                                    program accesses a page that is not
                                    currently in RAM.
                                    <br />
                                    The OS pauses the program, loads the needed
                                    page from disk into RAM, updates the page
                                    table, and resumes the program.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertCircle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why it feels slow
                                        </div>
                                        <div className="cSub">
                                            Disk access is much slower than RAM.
                                            So page faults can cause visible
                                            lag, like app freezing for a moment.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Real world feel
                                    </div>
                                    <pre className="code">{`You open a heavy app
RAM is almost full
OS moves some old pages to disk (swap)
When the app needs them again -> page faults happen
You feel the system stutter`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Swap and thrashing (danger zone)
                                </h3>
                                <p className="p">
                                    <strong>Swap</strong> is disk space used to
                                    store memory pages when RAM is full.
                                    <br />
                                    <strong>Thrashing</strong> is when the OS
                                    spends most time swapping pages in and out,
                                    and little time doing real work.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Swap</div>
                                        <p className="miniText">
                                            Disk area used as memory backup.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Thrashing
                                        </div>
                                        <p className="miniText">
                                            Too many page faults, system becomes
                                            slow and unresponsive.
                                        </p>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Virtual memory is powerful, but if RAM is
                                    too low and page faults are too frequent,
                                    the system can thrash.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">VM</span> -
                                        Virtual Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MMU</span> -
                                        Memory Management Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLB</span> -
                                        Translation Lookaside Buffer
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">OS</span> -
                                        Operating System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why do we need virtual memory if we
                                            already have RAM?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because virtual memory gives process
                                            isolation, safer memory access, and
                                            the ability to use disk as a backup
                                            when RAM is not enough.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What makes page faults expensive?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Disk is much slower than RAM.
                                            Loading a page from disk can take
                                            milliseconds, while RAM access is in
                                            nanoseconds.
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
                                        "Virtual memory gives each process its
                                        own private address space and maps it to
                                        physical RAM."
                                    </li>
                                    <li>
                                        "Paging splits memory into pages and
                                        frames, and the page table stores
                                        mappings."
                                    </li>
                                    <li>
                                        "A page fault happens when a needed page
                                        is not in RAM, so the OS loads it from
                                        disk."
                                    </li>
                                    <li>
                                        "Thrashing is excessive paging that
                                        makes the system slow."
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

export default VirtualMemory;
