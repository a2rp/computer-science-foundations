// src/topics/paging/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiGrid,
    FiHardDrive,
    FiCpu,
    FiAlertTriangle,
    FiBookOpen,
    FiHash,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Paging = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Paging",
            sub: "Paging is a memory management technique where virtual memory is split into fixed-size pages and physical memory is split into fixed-size frames. The OS maps pages to frames using a page table so programs get a clean illusion of continuous memory.",
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
        <Styled.Wrapper id="paging">
            <div className="top">
                <h2 className="title">Paging</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiGrid /> Pages and frames
                    </span>
                    <span className="pill">
                        <FiLayers /> Page table mapping
                    </span>
                    <span className="pill">
                        <FiCpu /> MMU translation
                    </span>
                    <span className="pill">
                        <FiAlertTriangle /> Page fault
                    </span>
                    <span className="pill">
                        <FiHardDrive /> Swap to disk
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="paging-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and practical examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="paging-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Why paging exists</h3>
                                <p className="p">
                                    Programs want memory like one smooth,
                                    continuous block. Real RAM is messy because
                                    many programs come and go. Paging fixes this
                                    by splitting memory into equal chunks and
                                    mapping them.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Problem without paging
                                        </div>
                                        <p className="miniText">
                                            You get fragmentation - free memory
                                            exists but in scattered pieces.
                                            Large contiguous allocations become
                                            hard.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Paging benefit
                                        </div>
                                        <p className="miniText">
                                            No need for contiguous physical
                                            memory. Any free frame can hold any
                                            page.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Core terms</h3>

                                <div className="termGrid">
                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">Page</span>
                                            <span className="tag">Virtual</span>
                                        </div>
                                        <p className="tBody">
                                            A fixed-size block of virtual memory
                                            used by a process.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">Frame</span>
                                            <span className="tag">
                                                Physical
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            A fixed-size block of physical RAM
                                            that holds one page.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">
                                                Page table
                                            </span>
                                            <span className="tag">Map</span>
                                        </div>
                                        <p className="tBody">
                                            A per-process mapping that says
                                            which page is stored in which frame.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">Offset</span>
                                            <span className="tag">Inside</span>
                                        </div>
                                        <p className="tBody">
                                            The position inside a page. Offset
                                            stays the same during translation.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How address translation works
                                </h3>
                                <p className="p">
                                    A virtual address is split into two parts -
                                    page number and offset. The MMU looks up the
                                    page number in the page table to find the
                                    frame number. Then it combines frame number
                                    and offset to get the physical address.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Step by step example
                                    </div>
                                    <pre className="code">{`Virtual address = [pageNumber | offset]

1) CPU generates virtual address
2) MMU reads pageNumber
3) MMU uses page table to get frameNumber
4) Physical address = [frameNumber | offset]

Offset does not change.
Only pageNumber becomes frameNumber.`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Beginner intuition
                                        </div>
                                        <div className="cSub">
                                            Think of a page table like an
                                            address book. You ask "where is page
                                            7" and it tells you "frame 21". Then
                                            you go to frame 21 and pick the
                                            exact byte using the offset.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Page fault</h3>
                                <p className="p">
                                    A page fault happens when a process tries to
                                    access a page that is not currently in RAM.
                                    The OS must bring that page into RAM from
                                    disk (swap area or file backing).
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What triggers it
                                        </div>
                                        <p className="miniText">
                                            Accessing a page not present in RAM,
                                            or accessing a page without
                                            permission.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it feels slow
                                        </div>
                                        <p className="miniText">
                                            Disk I O is much slower than RAM. So
                                            page faults can cause visible lag.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Page fault flow
                                    </div>
                                    <pre className="code">{`1) CPU accesses a page
2) Page table says "not present"
3) Trap to OS (page fault handler)
4) OS loads page from disk into a free frame
5) Page table updated
6) CPU instruction restarted`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Page replacement idea</h3>
                                <p className="p">
                                    If RAM is full, the OS must choose a victim
                                    page to evict (remove) to make room. This is
                                    called page replacement.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">FIFO</div>
                                        <div className="a">
                                            First In First Out - evict the
                                            oldest page in memory.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">LRU</div>
                                        <div className="a">
                                            Least Recently Used - evict the page
                                            that has not been used for the
                                            longest time.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Optimal</div>
                                        <div className="a">
                                            Evict the page that will not be used
                                            for the longest time in the future.
                                            Used as a theoretical benchmark.
                                        </div>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Most real systems use approximations of LRU
                                    because perfect LRU is expensive.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Quick numeric example</h3>
                                <p className="p">
                                    Let page size be 4 KB. A program accesses
                                    address 13 KB in its virtual space.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Compute</div>
                                    <pre className="code">{`pageSize = 4 KB

virtualAddress = 13 KB

pageNumber = floor(13 / 4) = 3
offset     = 13 - (3 * 4) = 1 KB

So address 13 KB means
pageNumber 3 and offset 1 KB inside that page.`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiHash />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            What you say in interviews
                                        </div>
                                        <div className="cSub">
                                            "Virtual address splits into page
                                            number and offset. Page table maps
                                            page to frame. Physical address is
                                            frame plus offset."
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
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MMU</span> -
                                        Memory Management Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">FIFO</span> -
                                        First In First Out
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">LRU</span> -
                                        Least Recently Used
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">KB</span> -
                                        KiloByte (commonly 1024 bytes in memory
                                        context)
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Paging is the backbone of virtual memory.
                                    Once paging clicks, context switching and
                                    process isolation also become easier to
                                    understand.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is paging better than allocating
                                            one large contiguous block in RAM?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because pages can be placed in any
                                            free frame, so physical memory does
                                            not need to be contiguous and
                                            fragmentation is reduced.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does a page fault cause
                                            slowness?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because fetching a page from disk is
                                            far slower than reading from RAM.
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

export default Paging;
