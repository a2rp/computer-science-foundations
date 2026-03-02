// src/topics/compilationVsInterpretation/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCode,
    FiCpu,
    FiZap,
    FiLayers,
    FiPlay,
    FiPackage,
    FiBookOpen,
    FiGitBranch,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const CompilationVsInterpretation = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Compilation vs interpretation",
            sub: "Compilation converts source code into a runnable form before execution. Interpretation runs code by reading and executing it step by step. Many modern runtimes use a hybrid approach (compile plus interpret).",
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
        <Styled.Wrapper id="compilation-vs-interpretation">
            <div className="top">
                <h2 className="title">Compilation vs interpretation</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiPackage /> Build step
                    </span>
                    <span className="pill">
                        <FiPlay /> Run step
                    </span>
                    <span className="pill">
                        <FiCpu /> Machine execution
                    </span>
                    <span className="pill">
                        <FiLayers /> Hybrid runtimes
                    </span>
                    <span className="pill">
                        <FiZap /> Performance trade offs
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="cvi-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="cvi-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Simple meaning</h3>
                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Compilation
                                        </div>
                                        <p className="boxText">
                                            Convert your source code into a
                                            lower level runnable form first,
                                            then run it.
                                        </p>
                                        <div className="mini">
                                            Think - "prepare once, run many
                                            times"
                                        </div>
                                    </div>

                                    <div className="box">
                                        <div className="boxTitle">
                                            Interpretation
                                        </div>
                                        <p className="boxText">
                                            Run code by reading it and executing
                                            it directly, usually line by line or
                                            statement by statement.
                                        </p>
                                        <div className="mini">
                                            Think - "read and run as you go"
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Why these exist</h3>
                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why compile
                                        </div>
                                        <ul className="list">
                                            <li>Faster execution speed</li>
                                            <li>Errors caught earlier</li>
                                            <li>Distribute binaries easily</li>
                                            <li>
                                                Better optimizations possible
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why interpret
                                        </div>
                                        <ul className="list">
                                            <li>Fast edit and run cycle</li>
                                            <li>Portability via interpreter</li>
                                            <li>
                                                Great for scripting and tools
                                            </li>
                                            <li>Dynamic features easier</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Core pipeline (mental model)
                                </h3>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">Source</div>
                                        <p className="flowText">
                                            Code you write in a language like C,
                                            C++, Java, JavaScript.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            Translation
                                        </div>
                                        <p className="flowText">
                                            Compiler or interpreter converts it
                                            into something the machine can
                                            execute.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">Execute</div>
                                        <p className="flowText">
                                            CPU runs machine instructions, or a
                                            runtime runs bytecode.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Important truth
                                        </div>
                                        <div className="cSub">
                                            CPU only understands machine code.
                                            Everything else must be translated
                                            to machine instructions at some
                                            point.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Examples you already know
                                </h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">C and C++</div>
                                        <div className="a">
                                            Usually compiled ahead of time into
                                            a native binary (machine code).
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">Java</div>
                                        <div className="a">
                                            Compiled into bytecode, then
                                            executed by the JVM with JIT
                                            compilation.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">JavaScript</div>
                                        <div className="a">
                                            Executed by an engine (like V8) that
                                            parses, interprets, and JIT
                                            compiles.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Practical feel
                                    </div>
                                    <pre className="code">{`C program
- you build once
- you get an executable file
- it runs fast

JavaScript script
- you run it immediately in a browser or Node.js
- engine translates while running
- fast iteration, flexible runtime`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Hybrid approach (most modern)
                                </h3>
                                <p className="p">
                                    Modern systems often do both: compile some
                                    parts, interpret some parts, and use JIT
                                    (Just In Time) compilation for hot code.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">JIT</div>
                                        <p className="boxText">
                                            Just In Time compilation compiles
                                            code during execution when it
                                            becomes hot (runs many times).
                                        </p>
                                        <div className="mini">
                                            Hot code - frequently executed code
                                        </div>
                                    </div>

                                    <div className="box">
                                        <div className="boxTitle">AOT</div>
                                        <p className="boxText">
                                            Ahead Of Time compilation compiles
                                            before running. Faster startup, more
                                            predictable.
                                        </p>
                                        <div className="mini">
                                            AOT is common in native apps
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why JIT helps
                                        </div>
                                        <div className="cSub">
                                            Runtime sees real behavior and can
                                            optimize based on what actually
                                            happens (types, branches, hot
                                            loops).
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Trade offs (quick table)</h3>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Speed</div>
                                        <p className="miniText">
                                            Compiled is often faster after
                                            build. Interpreted can be slower
                                            unless JIT optimizes.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">Startup</div>
                                        <p className="miniText">
                                            Interpreted can start faster.
                                            Compiled may have build time but
                                            quick run.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Portability
                                        </div>
                                        <p className="miniText">
                                            Bytecode and interpreters can run on
                                            many platforms. Native binaries are
                                            platform specific.
                                        </p>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Debugging
                                        </div>
                                        <p className="miniText">
                                            Interpreters can give nicer runtime
                                            feedback. Compilers catch many
                                            errors early.
                                        </p>
                                    </div>
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
                                        <span className="mono">JIT</span> - Just
                                        In Time
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">AOT</span> -
                                        Ahead Of Time
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">JVM</span> - Java
                                        Virtual Machine
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">V8</span> -
                                        JavaScript engine used by Chrome and
                                        Node.js
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">Bytecode</span> -
                                        Intermediate code executed by a virtual
                                        machine
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Interviews love one line - compilation
                                    usually translates before running,
                                    interpretation translates while running, and
                                    modern runtimes often combine both using
                                    JIT.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can JIT make programs faster
                                            than plain interpretation?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because it compiles hot code into
                                            optimized machine code and avoids
                                            repeatedly interpreting the same
                                            instructions.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">AST basics</div>
                                    </div>
                                    <div className="next">
                                        <FiCode />
                                        <div className="nText">
                                            Transpilers and bundlers
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiGitBranch />
                                        <div className="nText">
                                            Compiler pipeline overview
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCpu />
                                        <div className="nText">
                                            Bytecode and virtual machines
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

export default CompilationVsInterpretation;
