import React, { useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { Styled } from "./App.styled";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";
import OperatingSystems from "./topics/operatingSystems";
import ProcessVsThread from "./topics/processVsThread";
import SchedulingAlgorithms from "./topics/schedulingAlgorithms";
import ContextSwitching from "./topics/contextSwitching";
import MemoryManagement from "./topics/memoryManagement";
import VirtualMemory from "./topics/virtualMemory";
import Paging from "./topics/paging";
import Deadlock from "./topics/deadlock";
import FileSystems from "./topics/fileSystems";
import ComputerNetworks from "./topics/computerNetworks";
import OsiModel from "./topics/osiModel";
import TcpVsUdp from "./topics/tcpVsUdp";
import HttpLifecycle from "./topics/httpLifecycle";
import HttpsAndSsl from "./topics/httpsAndSsl";
import DNS from "./topics/dns";
import LoadBalancing from "./topics/loadBalancing";
import WebSockets from "./topics/webSockets";
import DbmsConcepts from "./topics/dbmsConcepts";
import ACID from "./topics/acid";
import Transactions from "./topics/transactions";
import Indexing from "./topics/indexing";
import Normalization from "./topics/normalization";
import IsolationLevels from "./topics/isolationLevels";
import Locking from "./topics/locking";
import CompilerBasics from "./topics/compilerBasics";
import CompilationVsInterpretation from "./topics/compilationVsInterpretation";
import AST from "./topics/ast";
import Transpilers from "./topics/transpilers";

const topics = [
    ["about", "Overview", About], ["os", "Operating Systems", OperatingSystems], ["process", "Processes and Threads", ProcessVsThread], ["scheduling", "Scheduling", SchedulingAlgorithms], ["context", "Context Switching", ContextSwitching], ["memory", "Memory Management", MemoryManagement], ["virtual", "Virtual Memory", VirtualMemory], ["paging", "Paging", Paging], ["deadlock", "Deadlocks", Deadlock], ["files", "File Systems", FileSystems], ["networks", "Computer Networks", ComputerNetworks], ["osi", "OSI Model", OsiModel], ["tcp", "TCP vs UDP", TcpVsUdp], ["http", "HTTP Lifecycle", HttpLifecycle], ["https", "HTTPS and SSL", HttpsAndSsl], ["dns", "DNS", DNS], ["load", "Load Balancing", LoadBalancing], ["sockets", "WebSockets", WebSockets], ["dbms", "DBMS Concepts", DbmsConcepts], ["acid", "ACID", ACID], ["transactions", "Transactions", Transactions], ["indexing", "Indexing", Indexing], ["normalization", "Normalization", Normalization], ["isolation", "Isolation Levels", IsolationLevels], ["locking", "Locking", Locking], ["compiler", "Compiler Basics", CompilerBasics], ["compile", "Compilation vs Interpretation", CompilationVsInterpretation], ["ast", "AST", AST], ["transpilers", "Transpilers", Transpilers],
];

const App = () => {
    const [activeTopic, setActiveTopic] = useState("about");
    const mainRef = useRef(null);
    const ActiveTopic = topics.find(([id]) => id === activeTopic)?.[2] || About;
    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
        // Topic panels keep their detailed lesson collapsed internally; open the selected lesson on entry.
        requestAnimationFrame(() => {
            const collapsedToggle = mainRef.current?.querySelector('[aria-expanded="false"]');
            collapsedToggle?.click();
        });
    }, [activeTopic]);
    return <Styled.Wrapper><Styled.Header><Header /></Styled.Header><Styled.Main ref={mainRef}><div className="workspaceLayout"><aside className="sideMenu" aria-label="Computer science topics"><p className="menuLabel">Study guide</p><nav>{topics.map(([id, label]) => <button key={id} type="button" className={activeTopic === id ? "active" : ""} onClick={() => setActiveTopic(id)}>{label}</button>)}</nav></aside><section className="contentWrapper" aria-live="polite"><ActiveTopic /></section></div><button type="button" className="scrollTopButton" aria-label="Scroll content to top" title="Scroll to top" onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })}><FiArrowUp /></button><div className="footerWrapper"><Footer /></div></Styled.Main></Styled.Wrapper>;
};

export default App;
