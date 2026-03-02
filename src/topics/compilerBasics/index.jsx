// src/topics/compilerBasics/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCode,
    FiLayers,
    FiCpu,
    FiShuffle,
    FiFileText,
    FiGitBranch,
    FiZap,
    FiBox,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const CompilerBasics = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Compiler basics",
            sub: "Compiler basics explains how your source code becomes something a machine can run. It covers compilation vs interpretation, Abstract Syntax Tree (AST), and transpilers, which are common in modern JavaScript and frontend tooling.",
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
        <Styled.Wrapper id="compiler-basics">
            <div className="top">
                <h2 className="title">Compiler basics</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> Parse and AST
                    </span>
                    <span className="pill">
                        <FiCpu /> Machine runnable output
                    </span>
                    <span className="pill">
                        <FiShuffle /> Transpile languages
                    </span>
                    <span className="pill">
                        <FiCode /> Tooling foundation
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="compiler-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiCode />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                simple pipeline and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="compiler-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    What is a compiler (simple meaning)
                                </h3>
                                <p className="p">
                                    A <strong>compiler</strong> is a program
                                    that converts source code into another form,
                                    usually a lower level form that a machine
                                    can run.
                                    <br />- Example: C code compiled into
                                    machine code binary
                                    <br />- Example: TypeScript compiled into
                                    JavaScript
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why compilers exist
                                        </div>
                                        <p className="miniText">
                                            Computers understand machine code.
                                            Humans write high level code. The
                                            compiler bridges that gap.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What you get
                                        </div>
                                        <p className="miniText">
                                            Faster execution, error checking
                                            before running, and optimized
                                            output.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Compilation vs interpretation
                                </h3>
                                <p className="p">
                                    These two are common ways to run code.
                                    <br />- <strong>Compilation</strong>{" "}
                                    converts the full program to an output
                                    first, then runs it.
                                    <br />- <strong>Interpretation</strong> runs
                                    code step by step without producing a full
                                    binary upfront.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Compilation
                                        </div>
                                        <ul className="list">
                                            <li>Translate first, run later</li>
                                            <li>
                                                Errors are caught before
                                                execution
                                            </li>
                                            <li>Output can be very fast</li>
                                        </ul>
                                    </div>

                                    <div className="box">
                                        <div className="boxTitle">
                                            Interpretation
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Run line by line or node by node
                                            </li>
                                            <li>
                                                Errors may appear during
                                                execution
                                            </li>
                                            <li>Easier to be interactive</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Real world note
                                        </div>
                                        <div className="cSub">
                                            Many modern systems are hybrid.
                                            JavaScript engines use JIT which is
                                            Just In Time compilation.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple example
                                    </div>
                                    <pre className="code">{`C language:
- Write hello.c
- Compile to a binary
- Run the binary

JavaScript:
- Write hello.js
- The engine parses and runs it
- It can also optimize hot code using JIT`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    The compilation pipeline (big picture)
                                </h3>
                                <p className="p">
                                    Most compilers follow a pipeline. You do not
                                    need all details now, but you should know
                                    the major steps.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            1 - Lexing
                                        </div>
                                        <p className="flowText">
                                            Break source code into tokens. Token
                                            example: keyword, identifier,
                                            number.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            2 - Parsing
                                        </div>
                                        <p className="flowText">
                                            Build a tree structure from tokens.
                                            This tree is the AST.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            3 - Semantic checks
                                        </div>
                                        <p className="flowText">
                                            Validate meaning, types, scope
                                            rules, and variable declarations.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">4 - IR</div>
                                        <p className="flowText">
                                            Convert to Intermediate
                                            Representation for optimization and
                                            portability.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            5 - Optimize
                                        </div>
                                        <p className="flowText">
                                            Remove dead code, simplify
                                            expressions, improve performance.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            6 - Codegen
                                        </div>
                                        <p className="flowText">
                                            Generate machine code or target
                                            language output.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Token and AST intuition
                                    </div>
                                    <pre className="code">{`Code:
a = b + 1

Tokens:
- identifier a
- equals =
- identifier b
- plus +
- number 1

AST (simplified):
Assign(
  left: Identifier(a),
  right: Add(Identifier(b), Number(1))
)`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    AST - Abstract Syntax Tree
                                </h3>
                                <p className="p">
                                    An <strong>AST</strong> is a tree that
                                    represents the structure of code in a clean,
                                    meaningful way. It removes unnecessary
                                    characters like spaces and focuses on the
                                    syntax structure.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why AST matters
                                        </div>
                                        <p className="miniText">
                                            Tools like linters, formatters, and
                                            transpilers work by reading and
                                            editing AST.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Frontend example
                                        </div>
                                        <p className="miniText">
                                            ESLint checks code rules using AST.
                                            Prettier formats code using AST.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLayers />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            AST is not a parse tree
                                        </div>
                                        <div className="cSub">
                                            A parse tree contains more grammar
                                            detail. AST is simplified and
                                            focuses on meaning.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Transpilers (why they exist)
                                </h3>
                                <p className="p">
                                    A <strong>transpiler</strong> converts code
                                    from one high level language to another high
                                    level language. It is used to support older
                                    runtimes or add syntax features.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Common examples
                                        </div>
                                        <ul className="list">
                                            <li>TypeScript - to JavaScript</li>
                                            <li>
                                                Babel - modern JavaScript to
                                                older JavaScript
                                            </li>
                                            <li>
                                                JSX - to JavaScript function
                                                calls
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="box">
                                        <div className="boxTitle">
                                            Why it is useful
                                        </div>
                                        <ul className="list">
                                            <li>Use new syntax safely</li>
                                            <li>Support older browsers</li>
                                            <li>Add build time checks</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        JSX transpile intuition
                                    </div>
                                    <pre className="code">{`JSX:
<button>Save</button>

After transpile (idea):
React.createElement("button", null, "Save")`}</pre>
                                </div>

                                <div className="finalNote">
                                    A transpiler is like translation between
                                    human languages. A compiler is like
                                    translation into machine language or a lower
                                    level form.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">AST</span> -
                                        Abstract Syntax Tree
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">IR</span> -
                                        Intermediate Representation
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">JIT</span> - Just
                                        In Time (compilation)
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">JSX</span> -
                                        JavaScript XML (syntax extension used by
                                        React)
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why do tools like ESLint need an
                                            AST?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because an AST represents code
                                            structure reliably. It lets tools
                                            understand meaning, not just raw
                                            text.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            TypeScript compilation is closer to
                                            which idea?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Transpiling, because it converts
                                            high level TypeScript to high level
                                            JavaScript.
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
                                        "Compilation translates a whole program
                                        to an output first. Interpretation runs
                                        step by step."
                                    </li>
                                    <li>
                                        "AST is a simplified tree representation
                                        of code structure used by linters,
                                        formatters, and transpilers."
                                    </li>
                                    <li>
                                        "Transpilers convert one high level
                                        language to another, like TypeScript to
                                        JavaScript."
                                    </li>
                                    <li>
                                        "Many modern runtimes are hybrid, like
                                        JavaScript engines using JIT
                                        compilation."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiFileText />
                                        <div className="nText">
                                            Lexing and parsing deeper
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">
                                            IR and optimizations
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiBox />
                                        <div className="nText">
                                            Bytecode and virtual machines
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCpu />
                                        <div className="nText">
                                            JIT and runtime optimizations
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

export default CompilerBasics;
