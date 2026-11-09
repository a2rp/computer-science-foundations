import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { Styled } from "./App.styled";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";

const OperatingSystems = lazy(() => import("./topics/operatingSystems"));
const ProcessVsThread = lazy(() => import("./topics/processVsThread"));
const SchedulingAlgorithms = lazy(() => import("./topics/schedulingAlgorithms"));
const ContextSwitching = lazy(() => import("./topics/contextSwitching"));
const MemoryManagement = lazy(() => import("./topics/memoryManagement"));
const VirtualMemory = lazy(() => import("./topics/virtualMemory"));
const Paging = lazy(() => import("./topics/paging"));
const Deadlock = lazy(() => import("./topics/deadlock"));
const FileSystems = lazy(() => import("./topics/fileSystems"));
const ComputerNetworks = lazy(() => import("./topics/computerNetworks"));
const OsiModel = lazy(() => import("./topics/osiModel"));
const TcpVsUdp = lazy(() => import("./topics/tcpVsUdp"));
const HttpLifecycle = lazy(() => import("./topics/httpLifecycle"));
const HttpsAndSsl = lazy(() => import("./topics/httpsAndSsl"));
const DNS = lazy(() => import("./topics/dns"));
const LoadBalancing = lazy(() => import("./topics/loadBalancing"));
const WebSockets = lazy(() => import("./topics/webSockets"));
const DbmsConcepts = lazy(() => import("./topics/dbmsConcepts"));
const ACID = lazy(() => import("./topics/acid"));
const Transactions = lazy(() => import("./topics/transactions"));
const Indexing = lazy(() => import("./topics/indexing"));
const Normalization = lazy(() => import("./topics/normalization"));
const IsolationLevels = lazy(() => import("./topics/isolationLevels"));
const Locking = lazy(() => import("./topics/locking"));
const CompilerBasics = lazy(() => import("./topics/compilerBasics"));
const CompilationVsInterpretation = lazy(() => import("./topics/compilationVsInterpretation"));
const AST = lazy(() => import("./topics/ast"));
const Transpilers = lazy(() => import("./topics/transpilers"));

const topics = [
    ["about", "Overview", About],
    ["os", "Operating Systems", OperatingSystems],
    ["process", "Processes and Threads", ProcessVsThread],
    ["scheduling", "Scheduling", SchedulingAlgorithms],
    ["context", "Context Switching", ContextSwitching],
    ["memory", "Memory Management", MemoryManagement],
    ["virtual", "Virtual Memory", VirtualMemory],
    ["paging", "Paging", Paging],
    ["deadlock", "Deadlocks", Deadlock],
    ["files", "File Systems", FileSystems],
    ["networks", "Computer Networks", ComputerNetworks],
    ["osi", "OSI Model", OsiModel],
    ["tcp", "TCP vs UDP", TcpVsUdp],
    ["http", "HTTP Lifecycle", HttpLifecycle],
    ["https", "HTTPS and SSL", HttpsAndSsl],
    ["dns", "DNS", DNS],
    ["load", "Load Balancing", LoadBalancing],
    ["sockets", "WebSockets", WebSockets],
    ["dbms", "DBMS Concepts", DbmsConcepts],
    ["acid", "ACID", ACID],
    ["transactions", "Transactions", Transactions],
    ["indexing", "Indexing", Indexing],
    ["normalization", "Normalization", Normalization],
    ["isolation", "Isolation Levels", IsolationLevels],
    ["locking", "Locking", Locking],
    ["compiler", "Compiler Basics", CompilerBasics],
    ["compile", "Compilation vs Interpretation", CompilationVsInterpretation],
    ["ast", "AST", AST],
    ["transpilers", "Transpilers", Transpilers],
];

const App = () => {
    const [activeTopic, setActiveTopic] = useState("about");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const mainRef = useRef(null);
    const ActiveTopic = topics.find(([id]) => id === activeTopic)?.[2] || About;

    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
        setShowScrollTop(false);
    }, [activeTopic]);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Header />
            </Styled.Header>
            <Styled.Main
                ref={mainRef}
                onScroll={(event) => setShowScrollTop(event.currentTarget.scrollTop > 160)}
            >
                <div className="workspaceLayout">
                    <aside className="sideMenu" aria-label="Computer science topics">
                        <p className="menuLabel">Study guide</p>
                        <nav>
                            {topics.map(([id, label]) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={activeTopic === id ? "active" : ""}
                                    aria-current={activeTopic === id ? "page" : undefined}
                                    onClick={() => setActiveTopic(id)}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </aside>
                    <section className="contentWrapper" aria-live="polite">
                        <Suspense
                            fallback={
                                <p className="topicLoading" role="status">
                                    Loading study notes...
                                </p>
                            }
                        >
                            <ActiveTopic />
                        </Suspense>
                    </section>
                </div>
                {showScrollTop && (
                    <button
                        type="button"
                        className="scrollTopButton"
                        aria-label="Scroll content to top"
                        title="Scroll to top"
                        onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <FiArrowUp />
                    </button>
                )}
                <div className="footerWrapper">
                    <Footer />
                </div>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default App;
