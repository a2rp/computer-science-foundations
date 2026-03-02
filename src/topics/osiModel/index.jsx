// src/topics/osiModel/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLayers,
    FiWifi,
    FiShield,
    FiGlobe,
    FiSend,
    FiServer,
    FiBox,
    FiGitBranch,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const OsiModel = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "OSI model",
            sub: "OSI model means Open Systems Interconnection model. It is a 7 layer framework that explains how data moves from one device to another over a network. It helps you understand where each networking concept fits.",
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
        <Styled.Wrapper id="osi-model">
            <div className="top">
                <h2 className="title">OSI model</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> 7 layers
                    </span>
                    <span className="pill">
                        <FiWifi /> Data travel map
                    </span>
                    <span className="pill">
                        <FiShield /> Debugging guide
                    </span>
                    <span className="pill">
                        <FiZap /> Interview must know
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="osi-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiLayers />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                layers, examples, and a real request walk
                                through
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="osi-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What is OSI used for</h3>
                                <p className="p">
                                    OSI is not a protocol you install. It is a
                                    learning and debugging model. When something
                                    breaks, you can ask "which layer is
                                    failing".
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why engineers love it
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Makes networking less confusing
                                            </li>
                                            <li>Helps locate issues quickly</li>
                                            <li>
                                                Explains where TCP, IP, HTTP fit
                                            </li>
                                            <li>
                                                Standard interview framework
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Quick example
                                        </div>
                                        <p className="miniText">
                                            If WiFi is off, it is a lower layer
                                            problem. If WiFi works but website
                                            does not load, it may be DNS or
                                            HTTP.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    The 7 layers - top to bottom
                                </h3>

                                <div className="layerGrid">
                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">7</span>
                                            <div className="lTitle">
                                                Application
                                            </div>
                                            <span className="tag">
                                                user level
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            What apps use to communicate.
                                            Examples: HTTP, HTTPS, WebSocket,
                                            FTP.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">6</span>
                                            <div className="lTitle">
                                                Presentation
                                            </div>
                                            <span className="tag">format</span>
                                        </div>
                                        <div className="lBody">
                                            Data format and encryption concepts.
                                            Examples: JSON, UTF-8, TLS idea.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">5</span>
                                            <div className="lTitle">
                                                Session
                                            </div>
                                            <span className="tag">
                                                conversation
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Manages a connection session and
                                            keeps it alive. Example idea: login
                                            session, connection control.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">4</span>
                                            <div className="lTitle">
                                                Transport
                                            </div>
                                            <span className="tag">
                                                end to end
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Reliable or fast delivery. Examples:
                                            TCP, UDP. Ports live here.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">3</span>
                                            <div className="lTitle">
                                                Network
                                            </div>
                                            <span className="tag">routing</span>
                                        </div>
                                        <div className="lBody">
                                            Finds a path across networks.
                                            Examples: IP, routers. Addresses
                                            live here.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">2</span>
                                            <div className="lTitle">
                                                Data Link
                                            </div>
                                            <span className="tag">
                                                local hop
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Moves data inside the same network.
                                            Examples: Ethernet, MAC address,
                                            switches.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">1</span>
                                            <div className="lTitle">
                                                Physical
                                            </div>
                                            <span className="tag">signals</span>
                                        </div>
                                        <div className="lBody">
                                            Actual bits over cable or air.
                                            Examples: fiber, copper, radio, WiFi
                                            signal.
                                        </div>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    In real life, internet uses TCP IP model
                                    more commonly, but OSI is still the best way
                                    to explain and debug.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Real example - opening a website
                                </h3>
                                <p className="p">
                                    When you open a site like "example.com",
                                    data travels down the layers on your
                                    machine, then across the network, then up
                                    the layers on the server.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            7 - Application
                                        </div>
                                        <p className="flowText">
                                            Browser creates an HTTP request.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            4 - Transport
                                        </div>
                                        <p className="flowText">
                                            TCP connects using port 443 (HTTPS).
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            3 - Network
                                        </div>
                                        <p className="flowText">
                                            IP routes packets to server address.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            2 - Data Link
                                        </div>
                                        <p className="flowText">
                                            Ethernet or WiFi delivers frames on
                                            local network.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            1 - Physical
                                        </div>
                                        <p className="flowText">
                                            Bits travel as signals.
                                        </p>
                                    </div>

                                    <div className="flow">
                                        <div className="flowTitle">
                                            Server side
                                        </div>
                                        <p className="flowText">
                                            Reverse happens. Server replies with
                                            HTTP response.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Tiny mapping</div>
                                    <pre className="code">{`URL -> DNS lookup (commonly placed around layer 7)
HTTP request -> layer 7
TLS encryption -> layer 6 idea
TCP connection -> layer 4
IP routing -> layer 3
WiFi or Ethernet -> layer 2
Signals -> layer 1`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Layer mapping table</h3>
                                <div
                                    className="tableWrap"
                                    role="region"
                                    aria-label="OSI quick map"
                                >
                                    <div className="table">
                                        <div className="tRow head">
                                            <div>Layer</div>
                                            <div>What it does</div>
                                            <div>Examples</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">7</div>
                                            <div>App protocols</div>
                                            <div>HTTP, HTTPS, WebSocket</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">6</div>
                                            <div>Format and encrypt</div>
                                            <div>UTF-8, JSON, TLS idea</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">5</div>
                                            <div>Session control</div>
                                            <div>Session keep alive</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">4</div>
                                            <div>Transport end to end</div>
                                            <div>TCP, UDP, ports</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">3</div>
                                            <div>Routing</div>
                                            <div>IP, routers</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">2</div>
                                            <div>Local delivery</div>
                                            <div>Ethernet, MAC, switches</div>
                                        </div>

                                        <div className="tRow">
                                            <div className="mono">1</div>
                                            <div>Signals</div>
                                            <div>Cables, radio, fiber</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Common interview and debugging lines
                                </h3>
                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">
                                            Website not loading
                                        </div>
                                        <div className="a">
                                            Check layer 1 to 3 first - WiFi, IP,
                                            routing - then DNS, then HTTP.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">
                                            TCP vs UDP belongs to
                                        </div>
                                        <div className="a">
                                            Transport layer (layer 4).
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">
                                            IP address belongs to
                                        </div>
                                        <div className="a">
                                            Network layer (layer 3).
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiGitBranch />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Easy memory trick
                                        </div>
                                        <div className="cSub">
                                            "Please Do Not Throw Sausage Pizza
                                            Away" - Physical, Data link,
                                            Network, Transport, Session,
                                            Presentation, Application.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">OSI</span> - Open
                                        Systems Interconnection
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TCP</span> -
                                        Transmission Control Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">UDP</span> - User
                                        Datagram Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">IP</span> -
                                        Internet Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MAC</span> -
                                        Media Access Control
                                    </div>
                                </div>

                                <div className="finalNote">
                                    OSI is your map. Protocols are the roads. If
                                    you can place a concept into a layer, you
                                    can explain it clearly.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Which layer handles routing between
                                            networks?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Network layer (layer 3).
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Which layer handles ports and
                                            reliable delivery?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Transport layer (layer 4) using TCP.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiSend />
                                        <div className="nText">TCP vs UDP</div>
                                    </div>
                                    <div className="next">
                                        <FiGlobe />
                                        <div className="nText">
                                            HTTP lifecycle
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiShield />
                                        <div className="nText">
                                            HTTPS and SSL
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiServer />
                                        <div className="nText">DNS</div>
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

export default OsiModel;
