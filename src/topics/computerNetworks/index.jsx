// src/topics/computerNetworks/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiWifi,
    FiLayers,
    FiSend,
    FiShield,
    FiGlobe,
    FiShuffle,
    FiServer,
    FiLink2,
    FiZap,
    FiBookOpen,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const ComputerNetworks = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Computer Networks",
            sub: "Computer Networks is the study of how devices communicate. It explains how data moves from your browser to a server and back using IP, TCP, HTTP, DNS, and more.",
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
        <Styled.Wrapper id="computer-networks">
            <div className="top">
                <h2 className="title">Computer Networks</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLayers /> OSI model
                    </span>
                    <span className="pill">
                        <FiSend /> TCP vs UDP
                    </span>
                    <span className="pill">
                        <FiGlobe /> DNS
                    </span>
                    <span className="pill">
                        <FiShield /> HTTPS and SSL
                    </span>
                    <span className="pill">
                        <FiServer /> Load balancing
                    </span>
                    <span className="pill">
                        <FiLink2 /> WebSockets
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="net-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and beginner examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="net-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What networks solve</h3>
                                <p className="p">
                                    Networks let one machine talk to another.
                                    The hard part is making it reliable, secure,
                                    and fast across millions of devices.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Real life
                                        </div>
                                        <p className="miniText">
                                            You type a URL, hit Enter, and the
                                            page loads. Under the hood, your
                                            device finds the server IP using
                                            DNS, opens a connection, sends an
                                            HTTP request, and receives an HTTP
                                            response.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it matters
                                        </div>
                                        <p className="miniText">
                                            Debugging slow APIs, random
                                            timeouts, and connection errors
                                            becomes easier when you understand
                                            the flow.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    OSI model (full form and layers)
                                </h3>
                                <p className="p">
                                    <strong>OSI</strong> means{" "}
                                    <strong>
                                        Open Systems Interconnection
                                    </strong>
                                    . It is a conceptual model of networking in
                                    7 layers. Most real stacks follow the same
                                    idea, even if they combine layers.
                                </p>

                                <div className="layersGrid">
                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">7</span>
                                            <span className="name">
                                                Application
                                            </span>
                                            <span className="tag">
                                                HTTP, DNS
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            User level protocols. Your browser
                                            and apps.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">6</span>
                                            <span className="name">
                                                Presentation
                                            </span>
                                            <span className="tag">
                                                Encoding
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Data format, compression, encryption
                                            style.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">5</span>
                                            <span className="name">
                                                Session
                                            </span>
                                            <span className="tag">
                                                Sessions
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Starts, manages, and ends sessions.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">4</span>
                                            <span className="name">
                                                Transport
                                            </span>
                                            <span className="tag">
                                                TCP, UDP
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            End to end delivery - reliability
                                            and ordering.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">3</span>
                                            <span className="name">
                                                Network
                                            </span>
                                            <span className="tag">IP</span>
                                        </div>
                                        <div className="lBody">
                                            Routing between networks - chooses
                                            the path.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">2</span>
                                            <span className="name">
                                                Data Link
                                            </span>
                                            <span className="tag">
                                                Ethernet, WiFi
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Local network delivery - frames and
                                            MAC addresses.
                                        </div>
                                    </div>

                                    <div className="layer">
                                        <div className="lHead">
                                            <span className="num">1</span>
                                            <span className="name">
                                                Physical
                                            </span>
                                            <span className="tag">
                                                Cables, radio
                                            </span>
                                        </div>
                                        <div className="lBody">
                                            Bits as signals on wire or air.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Beginner shortcut
                                        </div>
                                        <div className="cSub">
                                            For web dev, remember - HTTP on top
                                            of TCP on top of IP.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">TCP vs UDP</h3>
                                <p className="p">
                                    <strong>TCP</strong> means{" "}
                                    <strong>
                                        Transmission Control Protocol
                                    </strong>
                                    . It is reliable and ordered.
                                    <br />
                                    <strong>UDP</strong> means{" "}
                                    <strong>User Datagram Protocol</strong>. It
                                    is faster but does not guarantee delivery or
                                    ordering.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">TCP</div>
                                        <ul className="list">
                                            <li>
                                                Connection based (handshake)
                                            </li>
                                            <li>Reliable delivery</li>
                                            <li>Ordered packets</li>
                                            <li>Congestion control</li>
                                        </ul>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">UDP</div>
                                        <ul className="list">
                                            <li>No handshake</li>
                                            <li>Best effort delivery</li>
                                            <li>No ordering guarantee</li>
                                            <li>Lower overhead</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Examples</div>
                                    <pre className="code">{`TCP use cases
- HTTP and HTTPS web traffic
- File downloads
- Email

UDP use cases
- Video calls and live streaming
- Online gaming
- DNS queries (often UDP)

Reason - some apps prefer speed over perfect reliability.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    HTTP lifecycle (a web request)
                                </h3>
                                <p className="p">
                                    <strong>HTTP</strong> means{" "}
                                    <strong>Hypertext Transfer Protocol</strong>
                                    . It is the request response protocol of the
                                    web.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            1 - DNS lookup
                                        </div>
                                        <p className="flowText">
                                            Find the server IP for the domain.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            2 - Connect
                                        </div>
                                        <p className="flowText">
                                            TCP handshake (and TLS handshake for
                                            HTTPS).
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            3 - Request
                                        </div>
                                        <p className="flowText">
                                            Send HTTP method, path, headers,
                                            body.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            4 - Response
                                        </div>
                                        <p className="flowText">
                                            Server returns status code, headers,
                                            body.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            5 - Render
                                        </div>
                                        <p className="flowText">
                                            Browser parses HTML, downloads
                                            assets, executes JS.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            6 - Keep alive
                                        </div>
                                        <p className="flowText">
                                            Connection can be reused for more
                                            requests.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Mini example</div>
                                    <pre className="code">{`GET /api/users HTTP/1.1
Host: example.com
Accept: application/json

Response
HTTP/1.1 200 OK
Content-Type: application/json
{ "users": [ ... ] }`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">HTTPS and SSL</h3>
                                <p className="p">
                                    <strong>HTTPS</strong> means{" "}
                                    <strong>HTTP Secure</strong>. It is HTTP
                                    over <strong>TLS</strong> (Transport Layer
                                    Security). People often say SSL, but modern
                                    security uses TLS.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What HTTPS gives
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Encryption - nobody can read
                                                your traffic
                                            </li>
                                            <li>
                                                Integrity - data cannot be
                                                changed silently
                                            </li>
                                            <li>
                                                Authentication - you are talking
                                                to the real server
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Simple mental model
                                        </div>
                                        <p className="miniText">
                                            Browser checks certificate, agrees
                                            on keys, then encrypts everything in
                                            the connection.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiShield />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">SSL vs TLS</div>
                                        <div className="cSub">
                                            SSL means Secure Sockets Layer. TLS
                                            replaced SSL. People still say SSL
                                            as a habit.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">DNS</h3>
                                <p className="p">
                                    <strong>DNS</strong> means{" "}
                                    <strong>Domain Name System</strong>. It
                                    converts a domain name into an IP address.
                                    Humans remember names, machines route using
                                    IP.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`example.com -> 93.184.216.34

If DNS fails, you get errors like
- DNS_PROBE_FINISHED_NXDOMAIN
- Could not resolve host`}</pre>
                                </div>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Common records
                                        </div>
                                        <ul className="list">
                                            <li>A - points to IPv4 address</li>
                                            <li>
                                                AAAA - points to IPv6 address
                                            </li>
                                            <li>
                                                CNAME - alias to another name
                                            </li>
                                            <li>
                                                TXT - verification and policies
                                            </li>
                                            <li>MX - mail server routing</li>
                                        </ul>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Caching</div>
                                        <p className="miniText">
                                            DNS responses are cached for a TTL
                                            (Time To Live). This is why changes
                                            can take time.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Load balancing</h3>
                                <p className="p">
                                    A <strong>load balancer</strong> sits in
                                    front of servers and distributes incoming
                                    requests so one server does not get
                                    overloaded.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Why it is used
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Scale traffic across many
                                                servers
                                            </li>
                                            <li>
                                                Improve reliability (failover)
                                            </li>
                                            <li>Enable rolling deployments</li>
                                        </ul>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            Strategies
                                        </div>
                                        <ul className="list">
                                            <li>Round robin</li>
                                            <li>Least connections</li>
                                            <li>IP hash (sticky sessions)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`Client -> Load Balancer -> Server A
                         -> Server B
                         -> Server C

If Server B is down, traffic goes to A and C.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">WebSockets</h3>
                                <p className="p">
                                    <strong>WebSockets</strong> is a protocol
                                    that keeps a persistent connection between
                                    client and server. It allows two way
                                    communication, not just request response.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Use cases
                                        </div>
                                        <ul className="list">
                                            <li>Chat apps</li>
                                            <li>Live dashboards</li>
                                            <li>Real time notifications</li>
                                            <li>Multiplayer games</li>
                                        </ul>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why not HTTP
                                        </div>
                                        <p className="miniText">
                                            HTTP is request response. WebSockets
                                            keeps one connection open so server
                                            can push updates instantly.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple example
                                    </div>
                                    <pre className="code">{`HTTP
Client: request
Server: response
Connection often closes

WebSocket
Client and server stay connected
Both can send messages any time`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
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
                                        <span className="mono">HTTP</span> -
                                        Hypertext Transfer Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">HTTPS</span> -
                                        Hypertext Transfer Protocol Secure
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">DNS</span> -
                                        Domain Name System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TTL</span> - Time
                                        To Live
                                    </div>
                                </div>

                                <div className="finalNote">
                                    When something fails in production, ask this
                                    - DNS, TCP, TLS, HTTP, server, or database.
                                    Networks gives you that map.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does HTTPS feel slower than HTTP
                                            sometimes?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because HTTPS adds a TLS handshake
                                            and encryption work, especially for
                                            new connections. Reusing connections
                                            helps.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is UDP used for live streaming?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Dropping some packets is better than
                                            waiting. Speed matters more than
                                            perfect delivery.
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
                                        "HTTP works on top of TCP, which
                                        provides reliable ordered delivery."
                                    </li>
                                    <li>
                                        "DNS resolves a domain to an IP and is
                                        heavily cached using TTL."
                                    </li>
                                    <li>
                                        "HTTPS is HTTP over TLS, providing
                                        encryption, integrity, and
                                        authentication."
                                    </li>
                                    <li>
                                        "WebSockets keeps a persistent
                                        connection for two way real time
                                        messaging."
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </Styled.Wrapper>
    );
};

export default ComputerNetworks;
