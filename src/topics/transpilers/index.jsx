// src/topics/transpilers/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiRefreshCw,
    FiCode,
    FiLayers,
    FiGitBranch,
    FiCpu,
    FiZap,
    FiCheckCircle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const Transpilers = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Transpilers",
            sub: "A transpiler is a source to source compiler. It converts code from one programming language to another programming language at a similar level. The goal is compatibility, readability, and tooling, not making machine code directly.",
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
        <Styled.Wrapper id="transpilers">
            <div className="top">
                <h2 className="title">Transpilers</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiRefreshCw /> Source to source
                    </span>
                    <span className="pill">
                        <FiLayers /> Keep meaning same
                    </span>
                    <span className="pill">
                        <FiCode /> Output is code
                    </span>
                    <span className="pill">
                        <FiZap /> Compatibility
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="transpilers-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiCpu />
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
                        id="transpilers-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    A <strong>transpiler</strong> converts one
                                    high level language into another high level
                                    language while keeping the same meaning.
                                    <br />
                                    It is used when you want to write in a
                                    modern or nicer language but need to run on
                                    an older or different environment.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What it produces
                                        </div>
                                        <p className="miniText">
                                            Output is still source code, not
                                            machine code.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Main goal
                                        </div>
                                        <p className="miniText">
                                            Compatibility and tooling, not raw
                                            speed.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Transpiler vs Compiler vs Interpreter
                                </h3>
                                <div className="triGrid">
                                    <div className="tri">
                                        <div className="tTop">
                                            <span className="tIcon">
                                                <FiRefreshCw />
                                            </span>
                                            <div className="tTitle">
                                                Transpiler
                                            </div>
                                        </div>
                                        <p className="tBody">
                                            Source language to source language.
                                            Example: TypeScript to JavaScript.
                                        </p>
                                    </div>

                                    <div className="tri">
                                        <div className="tTop">
                                            <span className="tIcon">
                                                <FiCpu />
                                            </span>
                                            <div className="tTitle">
                                                Compiler
                                            </div>
                                        </div>
                                        <p className="tBody">
                                            Source language to lower level
                                            output like machine code or
                                            bytecode.
                                        </p>
                                    </div>

                                    <div className="tri">
                                        <div className="tTop">
                                            <span className="tIcon">
                                                <FiZap />
                                            </span>
                                            <div className="tTitle">
                                                Interpreter
                                            </div>
                                        </div>
                                        <p className="tBody">
                                            Runs code line by line or node by
                                            node without producing a final
                                            binary output.
                                        </p>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    A transpiler is still a compiler, but it is
                                    a specific type called source to source.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Most common real world examples
                                </h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">TypeScript</div>
                                        <div className="a">
                                            Converts TypeScript to JavaScript so
                                            browsers can run it.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Babel</div>
                                        <div className="a">
                                            Converts modern JavaScript to older
                                            JavaScript for older browsers.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Sass</div>
                                        <div className="a">
                                            Converts Sass to CSS so browsers can
                                            use styles.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example - modern JavaScript to older
                                    </div>
                                    <pre className="code">{`Input (modern JavaScript)
const add = (a, b) => a + b

Output (older JavaScript)
var add = function (a, b) {
  return a + b
}`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What happens inside a transpiler (simple)
                                </h3>
                                <p className="p">
                                    Most transpilers follow a pipeline similar
                                    to compilers:
                                    <br />- parse input code into an AST
                                    <br />- transform the AST
                                    <br />- generate output code
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">Parse</div>
                                        <p className="flowText">
                                            Convert code into AST (Abstract
                                            Syntax Tree).
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Transform
                                        </div>
                                        <p className="flowText">
                                            Change AST nodes to match target
                                            language features.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Generate
                                        </div>
                                        <p className="flowText">
                                            Turn AST back into readable output
                                            code.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLayers />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">AST idea</div>
                                        <div className="cSub">
                                            AST is a tree representation of your
                                            code. Tools change the tree, then
                                            print a new code version.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Why front end and MERN devs use it
                                </h3>
                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Language features
                                        </div>
                                        <p className="miniText">
                                            Use modern syntax and still support
                                            older runtimes.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Safety and tooling
                                        </div>
                                        <p className="miniText">
                                            TypeScript adds types, better editor
                                            help, and safer refactors.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example - TypeScript to JavaScript
                                    </div>
                                    <pre className="code">{`Input (TypeScript)
type User = { id: number; name: string }

function greet(u: User) {
  return "Hello " + u.name
}

Output (JavaScript)
function greet(u) {
  return "Hello " + u.name
}`}</pre>
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
                                        <span className="mono">JS</span> -
                                        JavaScript
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TS</span> -
                                        TypeScript
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CSS</span> -
                                        Cascading Style Sheets
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">ES</span> -
                                        ECMAScript
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Transpilers are everywhere in modern web
                                    development. You write modern code, tools
                                    translate it into code your runtime can
                                    actually execute.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is TypeScript called a
                                            transpiled language?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because TypeScript is converted into
                                            JavaScript source code before
                                            running.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Is transpiling done at runtime?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Usually no. It is done in build
                                            time, then the output code runs.
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
                                        "A transpiler converts source code to
                                        source code. TypeScript to JavaScript is
                                        the classic example."
                                    </li>
                                    <li>
                                        "Most transpilers parse code into an
                                        AST, transform it, then generate new
                                        code."
                                    </li>
                                    <li>
                                        "The goal is compatibility and tooling,
                                        not producing machine code directly."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics nearby</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiGitBranch />
                                        <div className="nText">
                                            Compilation vs interpretation
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">AST basics</div>
                                    </div>
                                    <div className="next">
                                        <FiCode />
                                        <div className="nText">
                                            Compiler pipeline
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiCheckCircle />
                                        <div className="nText">
                                            Babel and build tools
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

export default Transpilers;
