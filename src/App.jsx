// App.jsx
import React from "react";
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

const App = () => {
    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Header />
            </Styled.Header>
            <Styled.Main>
                <div className="contentWrapper">
                    <About />

                    <OperatingSystems />
                    <ProcessVsThread />
                    <SchedulingAlgorithms />
                    <ContextSwitching />
                    <MemoryManagement />
                    <VirtualMemory />
                    <Paging />
                    <Deadlock />
                    <FileSystems />
                    <ComputerNetworks />
                    <OsiModel />
                    <TcpVsUdp />
                    <HttpLifecycle />
                    <HttpsAndSsl />
                    <DNS />
                    <LoadBalancing />
                    <WebSockets />
                    <DbmsConcepts />
                    <ACID />
                    <Transactions />
                    <Indexing />
                    <Normalization />
                    <IsolationLevels />
                    <Locking />
                    <CompilerBasics />
                    <CompilationVsInterpretation />
                    <AST />
                    <Transpilers />
                </div>

                <div className="footerWrapper">
                    <Footer />
                </div>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default App;
