// src/topics/fileSystems/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiHardDrive,
    FiFolder,
    FiFileText,
    FiLock,
    FiSearch,
    FiGrid,
    FiCpu,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const FileSystems = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "File systems",
            sub: "A file system is the method an Operating System (OS) uses to store, organize, find, and protect files on a storage device like HDD or SSD. It decides how files are named, where bytes live on disk, and how fast reads and writes happen.",
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
        <Styled.Wrapper id="file-systems">
            <div className="top">
                <h2 className="title">File systems</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiFolder /> Directories
                    </span>
                    <span className="pill">
                        <FiFileText /> Files and metadata
                    </span>
                    <span className="pill">
                        <FiGrid /> Blocks and allocation
                    </span>
                    <span className="pill">
                        <FiSearch /> Fast lookup
                    </span>
                    <span className="pill">
                        <FiLock /> Permissions
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="fs-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiHardDrive />
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
                        id="fs-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    What a file system solves
                                </h3>
                                <p className="p">
                                    Disks store raw bytes. A file system adds a
                                    structure so you can say "give me
                                    photos/cat.png" instead of manually
                                    searching billions of bytes.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Without a file system
                                        </div>
                                        <p className="miniText">
                                            Data is just a big empty space of
                                            bytes. You would not know where one
                                            file ends and another begins.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            With a file system
                                        </div>
                                        <p className="miniText">
                                            The OS maintains a map: names,
                                            folders, permissions, and where each
                                            file's blocks are stored.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Core terms</h3>
                                <div className="termGrid">
                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">File</span>
                                            <span className="tag">
                                                sequence of bytes
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            A file is data stored on disk, plus
                                            metadata like name, size, and time.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">
                                                Directory
                                            </span>
                                            <span className="tag">folder</span>
                                        </div>
                                        <p className="tBody">
                                            A directory maps names to files or
                                            other directories.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">Block</span>
                                            <span className="tag">
                                                storage unit
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            A block is the fixed size chunk used
                                            by the file system to store data.
                                            Example sizes: 4 KB or 8 KB.
                                        </p>
                                    </div>

                                    <div className="term">
                                        <div className="tHead">
                                            <span className="mono">
                                                Metadata
                                            </span>
                                            <span className="tag">
                                                info about file
                                            </span>
                                        </div>
                                        <p className="tBody">
                                            Metadata means file information like
                                            size, owner, permissions,
                                            timestamps, and where data blocks
                                            are located.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How reading a file works (simple view)
                                </h3>
                                <p className="p">
                                    When you open a file, the OS asks the file
                                    system: "where are the blocks for this
                                    file". Then it reads those blocks from disk
                                    and returns bytes to your program.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">Step 1</div>
                                        <p className="flowText">
                                            Find file entry using path:
                                            <span className="mono">
                                                {" /docs/a.txt"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">Step 2</div>
                                        <p className="flowText">
                                            Read metadata and block pointers
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">Step 3</div>
                                        <p className="flowText">
                                            Fetch blocks from disk into memory
                                            cache
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">Step 4</div>
                                        <p className="flowText">
                                            Return bytes to the program
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Small example (what you feel)
                                    </div>
                                    <pre className="code">{`Open a small file the first time -> may feel slightly slower
Open it again soon -> faster because data is in cache

Cache means the OS keeps recently used disk data in RAM.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Allocation and fragmentation
                                </h3>
                                <p className="p">
                                    A file system must decide where to place new
                                    file data blocks on disk. Over time, files
                                    can become scattered, which is called
                                    fragmentation.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Fragmentation
                                        </div>
                                        <p className="miniText">
                                            File blocks are not together. Disk
                                            head (on HDD) may move more, slowing
                                            reads.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why SSD feels different
                                        </div>
                                        <p className="miniText">
                                            SSD has no moving head, so scatter
                                            hurts less. Still, more random reads
                                            can reduce performance.
                                        </p>
                                    </div>
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
                                            Sequential reads are faster than
                                            many random reads. File systems try
                                            to keep blocks together when
                                            possible.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Permissions and protection
                                </h3>
                                <p className="p">
                                    File systems enforce access rules. This
                                    stops a random app from reading private
                                    files or overwriting system files.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Read</div>
                                        <div className="a">
                                            Can view file contents
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Write</div>
                                        <div className="a">
                                            Can modify file contents
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Execute</div>
                                        <div className="a">
                                            Can run the file as a program
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example (Linux style)
                                    </div>
                                    <pre className="code">{`rwxr-x--- 
Owner: read write execute
Group: read execute
Others: no access`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Journaling (why crashes do not destroy
                                    everything)
                                </h3>
                                <p className="p">
                                    Some file systems use journaling. Before
                                    changing important structures, they write an
                                    "intent log" so after a crash, they can
                                    recover quickly.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple journaling idea
                                    </div>
                                    <pre className="code">{`Before update:
Write to journal: "I will create file X and update directory Y"
Do the real changes
Mark journal entry as complete

After crash:
Replay incomplete journal entries to restore consistency`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why it matters
                                        </div>
                                        <div className="cSub">
                                            Without journaling, a crash in the
                                            middle of an update can leave the
                                            disk structure inconsistent.
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
                                        <span className="mono">HDD</span> - Hard
                                        Disk Drive
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SSD</span> -
                                        Solid State Drive
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">KB</span> -
                                        Kilobyte
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">4 KB</span> - 4
                                        Kilobytes (common block size)
                                    </div>
                                </div>

                                <div className="finalNote">
                                    A file system is not just folders. It is a
                                    performance and safety layer that decides
                                    how your bytes live on disk.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does opening a file again feel
                                            faster?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because the OS caches recently read
                                            disk blocks in RAM, so the second
                                            read avoids disk access.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What is fragmentation in simple
                                            words?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            A file is stored in scattered pieces
                                            across disk, so reading it may
                                            require more jumps.
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

export default FileSystems;
