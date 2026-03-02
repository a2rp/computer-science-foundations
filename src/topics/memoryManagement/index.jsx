// src/topics/memoryManagement/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiCpu,
    FiHardDrive,
    FiAlertTriangle,
    FiActivity,
    FiGrid,
    FiBookOpen,
    FiZap,
    FiShield,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const MemoryManagement = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Memory management",
            sub: "Memory management is how an OS (Operating System) allocates, tracks, protects, and reclaims RAM (Random Access Memory) so multiple programs can run safely at the same time.",
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
        <Styled.Wrapper id="memory-management">
            <div className="top">
                <h2 className="title">Memory management</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> Virtual memory
                    </span>
                    <span className="pill">
                        <FiGrid /> Paging
                    </span>
                    <span className="pill">
                        <FiCpu /> MMU mapping
                    </span>
                    <span className="pill">
                        <FiHardDrive /> Swapping
                    </span>
                    <span className="pill">
                        <FiShield /> Protection
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="mm-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and strong examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="mm-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    What memory management solves
                                </h3>
                                <p className="p">
                                    Without memory management, programs would
                                    overwrite each other’s data, crash the
                                    machine, or read sensitive memory. The OS
                                    creates rules and tools so each process gets
                                    "its own memory world".
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Main jobs
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Allocate memory to processes
                                            </li>
                                            <li>
                                                Track which memory is free or
                                                used
                                            </li>
                                            <li>
                                                Protect processes from each
                                                other
                                            </li>
                                            <li>
                                                Share memory safely when needed
                                            </li>
                                            <li>
                                                Reclaim memory when a process
                                                ends
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Simple example
                                        </div>
                                        <p className="miniText">
                                            You open a browser, a game, and a
                                            code editor. Each thinks it has its
                                            own memory. The OS maps them to real
                                            RAM and keeps them isolated.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">RAM vs disk</h3>
                                <p className="p">
                                    RAM is fast, but limited. Disk (HDD or SSD)
                                    is slower, but larger. Memory management
                                    uses both to create the feeling of "enough
                                    memory".
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">RAM</div>
                                        <p className="boxText">
                                            Very fast, used for active program
                                            data. If RAM is full, performance
                                            drops.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">Disk</div>
                                        <p className="boxText">
                                            Slower storage. Used as backup for
                                            memory through swapping and paging.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Virtual memory</h3>
                                <p className="p">
                                    Virtual memory is a technique where each
                                    process gets its own virtual address space
                                    (private memory map), even if physical RAM
                                    is smaller.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLayers />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Key idea</div>
                                        <div className="cSub">
                                            Programs use virtual addresses.
                                            Hardware uses physical addresses.
                                            The OS connects them using a mapping
                                            system.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Beginner picture
                                    </div>
                                    <pre className="code">{`Process A (virtual)
0x0000 -> code
0x1000 -> heap
0x9000 -> stack

Process B (virtual)
0x0000 -> code
0x1000 -> heap
0x9000 -> stack

Both can use same virtual addresses
But OS maps them to different physical RAM locations`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Paging</h3>
                                <p className="p">
                                    Paging splits memory into fixed-size chunks:
                                    <br />
                                    - Virtual memory chunks are called pages
                                    <br />
                                    - Physical RAM chunks are called frames
                                    <br />
                                    The OS maintains a page table that maps
                                    pages to frames.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why paging helps
                                        </div>
                                        <p className="miniText">
                                            It avoids needing one big continuous
                                            block of RAM. Pages can be placed
                                            anywhere in physical memory.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Trade-off
                                        </div>
                                        <p className="miniText">
                                            Paging adds mapping overhead, but
                                            hardware (MMU) makes it fast enough.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Mapping example
                                    </div>
                                    <pre className="code">{`Page size = 4 KB

Virtual page 5 -> Physical frame 12
Virtual page 6 -> Physical frame 3

So virtual address (page 5, offset 200)
maps to physical address (frame 12, offset 200)`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">MMU and page tables</h3>
                                <p className="p">
                                    MMU (Memory Management Unit) is hardware
                                    that translates virtual addresses to
                                    physical addresses using page tables. This
                                    is what makes virtual memory work
                                    efficiently.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">Step 1</div>
                                        <p className="flowText">
                                            CPU creates a virtual address while
                                            executing code
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">Step 2</div>
                                        <p className="flowText">
                                            MMU looks up page table entry for
                                            that address
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">Step 3</div>
                                        <p className="flowText">
                                            MMU returns physical RAM address and
                                            access rules
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Protection</div>
                                        <div className="cSub">
                                            Page table entries store permissions
                                            like read, write, execute. That is
                                            how OS prevents one process from
                                            writing another process memory.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Page fault and swapping</h3>
                                <p className="p">
                                    If a process tries to use a page that is not
                                    currently in RAM, a page fault happens. The
                                    OS loads that page from disk into RAM, then
                                    resumes the process.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Page fault
                                        </div>
                                        <p className="miniText">
                                            Not an error always. It often means
                                            the OS needs to fetch a page into
                                            RAM.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Swapping
                                        </div>
                                        <p className="miniText">
                                            Moving pages between RAM and disk to
                                            manage limited memory.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Real feel example
                                    </div>
                                    <pre className="code">{`You open many apps
RAM fills up
OS moves rarely used pages to disk (swap)
When you come back to that app, it feels slow
Because OS must bring pages back into RAM`}</pre>
                                </div>

                                <div className="finalNote">
                                    Too much swapping causes thrashing - the
                                    system spends more time moving pages than
                                    doing real work.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Common issues developers see
                                </h3>
                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Out of memory</div>
                                        <div className="a">
                                            Process keeps allocating and OS
                                            cannot give more. Can crash the
                                            process or kill it.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Memory leak</div>
                                        <div className="a">
                                            Program holds references and memory
                                            never gets freed. Over time RAM
                                            usage keeps growing.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Thrashing</div>
                                        <div className="a">
                                            Too many page faults. System becomes
                                            slow because it is swapping
                                            constantly.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Developer example
                                    </div>
                                    <pre className="code">{`Node server memory keeps growing
- You store all requests in an array for logging
- You never clear it
RAM usage increases, OS starts swapping
Server becomes slow, then may crash or get killed`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">OS</span> -
                                        Operating System
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
                                        <span className="mono">HDD</span> - Hard
                                        Disk Drive
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SSD</span> -
                                        Solid State Drive
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">KB</span> -
                                        Kilobyte
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">4 KB</span> - 4
                                        Kilobytes (common page size)
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does virtual memory help
                                            isolation?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Each process has its own virtual
                                            address space and its own page table
                                            mapping, so one process cannot
                                            directly access another process
                                            memory.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does heavy swapping slow the
                                            system?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Disk is much slower than RAM. If the
                                            OS constantly moves pages between
                                            disk and RAM, real work pauses.
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
                                        "Virtual memory gives each process a
                                        private address space mapped to physical
                                        memory using page tables."
                                    </li>
                                    <li>
                                        "Paging splits memory into pages and
                                        frames, avoiding the need for contiguous
                                        allocation."
                                    </li>
                                    <li>
                                        "Page faults occur when a page is not in
                                        RAM and must be loaded from disk."
                                    </li>
                                    <li>
                                        "Too much swapping leads to thrashing
                                        and performance collapse."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Quick recap</h3>
                                <div className="recap">
                                    <div className="rRow">
                                        <span className="rKey">
                                            Virtual memory
                                        </span>
                                        <span className="rVal">
                                            Each process sees private memory
                                        </span>
                                    </div>
                                    <div className="rRow">
                                        <span className="rKey">Paging</span>
                                        <span className="rVal">
                                            Fixed-size pages mapped to frames
                                        </span>
                                    </div>
                                    <div className="rRow">
                                        <span className="rKey">MMU</span>
                                        <span className="rVal">
                                            Hardware that translates addresses
                                        </span>
                                    </div>
                                    <div className="rRow">
                                        <span className="rKey">Page fault</span>
                                        <span className="rVal">
                                            Page not in RAM, must load from disk
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

export default MemoryManagement;
