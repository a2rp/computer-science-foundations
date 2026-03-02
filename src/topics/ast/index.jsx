// src/topics/ast/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCode,
    FiGitBranch,
    FiLayers,
    FiZap,
    FiFileText,
    FiCpu,
    FiSearch,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const AST = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "AST",
            sub: "AST means Abstract Syntax Tree. It is a tree representation of your code where each node represents a meaningful construct like an expression, statement, variable, or function. Compilers, interpreters, linters, and formatters use AST to understand code structure.",
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
        <Styled.Wrapper id="ast">
            <div className="top">
                <h2 className="title">AST</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiGitBranch /> Tree of code meaning
                    </span>
                    <span className="pill">
                        <FiLayers /> Used by compilers
                    </span>
                    <span className="pill">
                        <FiSearch /> Powers lint and format
                    </span>
                    <span className="pill">
                        <FiZap /> Enables transforms
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="ast-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiCode />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and real examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="ast-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    An <strong>Abstract Syntax Tree</strong> is
                                    a tree that represents the structure of code
                                    after parsing. It removes unnecessary text
                                    details (like extra spaces) and keeps only
                                    the real meaning.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it is called abstract
                                        </div>
                                        <p className="miniText">
                                            It ignores formatting and focuses on
                                            structure.
                                            <br />
                                            Example: spaces and line breaks do
                                            not change the AST.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it is a tree
                                        </div>
                                        <p className="miniText">
                                            Code has nested structure.
                                            <br />
                                            Expressions contain smaller
                                            expressions, so a tree fits
                                            naturally.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    From code to AST - the pipeline
                                </h3>
                                <p className="p">
                                    Most language tools follow a similar flow.
                                    The names can vary, but the idea is the
                                    same.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            1 - Lexing
                                        </div>
                                        <p className="flowText">
                                            Break code into tokens.
                                            <br />
                                            Token examples: identifiers,
                                            numbers, operators.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            2 - Parsing
                                        </div>
                                        <p className="flowText">
                                            Convert tokens into an AST.
                                            <br />
                                            This checks grammar rules.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            3 - Analysis
                                        </div>
                                        <p className="flowText">
                                            Validate meaning.
                                            <br />
                                            Types, scopes, variables, etc.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            4 - Transform
                                        </div>
                                        <p className="flowText">
                                            Change AST to optimize or rewrite.
                                            <br />
                                            Example: transpile modern syntax.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            5 - Generate
                                        </div>
                                        <p className="flowText">
                                            Produce output.
                                            <br />
                                            Machine code or bytecode or JS code.
                                        </p>
                                    </div>
                                </div>

                                <div className="abbrBox">
                                    <div className="abbrTitle">Key terms</div>
                                    <div className="abbrGrid">
                                        <div className="abbr">
                                            <span className="mono">Lexing</span>{" "}
                                            - converting text to tokens
                                        </div>
                                        <div className="abbr">
                                            <span className="mono">Token</span>{" "}
                                            - smallest meaningful unit
                                        </div>
                                        <div className="abbr">
                                            <span className="mono">
                                                Parsing
                                            </span>{" "}
                                            - building the AST from tokens
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Simple AST example</h3>
                                <p className="p">
                                    Consider this code. AST represents the
                                    "meaning" of this expression.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Code</div>
                                    <pre className="code">{`a = 2 + 3 * 4`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiCpu />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why AST helps
                                        </div>
                                        <div className="cSub">
                                            Multiplication has higher precedence
                                            than addition. AST stores this
                                            correctly, so tools do not get
                                            confused by plain text.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        AST shape (simplified)
                                    </div>
                                    <pre className="code">{`Assign
- left: Identifier(a)
- right: Add(+)
  - left: Number(2)
  - right: Multiply(*)
    - left: Number(3)
    - right: Number(4)`}</pre>
                                </div>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Without AST
                                        </div>
                                        <p className="miniText">
                                            A tool might read left to right and
                                            get wrong meaning.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            With AST
                                        </div>
                                        <p className="miniText">
                                            The tree clearly tells what happens
                                            first.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Where you see AST in real dev life
                                </h3>
                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Linting</div>
                                        <div className="a">
                                            ESLint parses code to AST to find
                                            patterns like unused variables.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Formatting</div>
                                        <div className="a">
                                            Prettier formats code by printing
                                            from AST, not by regex.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Transpiling</div>
                                        <div className="a">
                                            Babel reads AST and rewrites modern
                                            syntax into older syntax.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Minification</div>
                                        <div className="a">
                                            Tools rename variables safely using
                                            AST rules.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Compiler</div>
                                        <div className="a">
                                            C, C++, Java compilers use AST to
                                            analyze and optimize.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">IDE features</div>
                                        <div className="a">
                                            Autocomplete and go to definition
                                            often rely on AST.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">AST vs Parse tree</h3>
                                <p className="p">
                                    A <strong>parse tree</strong> shows every
                                    grammar step. An <strong>AST</strong> is a
                                    simplified tree that focuses on meaning.
                                    Most developer tooling talks about AST.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Parse tree
                                        </div>
                                        <p className="miniText">
                                            Very detailed, includes grammar
                                            rules and symbols.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">AST</div>
                                        <p className="miniText">
                                            Cleaner and easier for tools to
                                            transform and analyze.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">AST</span> -
                                        Abstract Syntax Tree
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">IDE</span> -
                                        Integrated Development Environment
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">JS</span> -
                                        JavaScript
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                </div>

                                <div className="finalNote">
                                    If you can explain AST, you automatically
                                    understand how linting, formatting, and
                                    transpilers work under the hood.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does Prettier need AST instead
                                            of regex?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because AST understands code meaning
                                            and nesting. Regex can break on
                                            complex syntax and edge cases.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Does spacing change AST?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            No. Spacing is formatting. AST keeps
                                            the same structure.
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
                                        "AST is a tree representation of code
                                        meaning created by parsing tokens."
                                    </li>
                                    <li>
                                        "Tools like ESLint, Prettier, and Babel
                                        work by reading and transforming AST."
                                    </li>
                                    <li>
                                        "AST encodes operator precedence and
                                        nesting, so transformations stay
                                        correct."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next in compiler basics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiFileText />
                                        <div className="nText">
                                            Compilation vs interpretation
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiZap />
                                        <div className="nText">
                                            Transpilers and why they exist
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiLayers />
                                        <div className="nText">
                                            Lexing, parsing, semantic analysis
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

export default AST;
