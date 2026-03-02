// src/topics/webSockets/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiWifi,
    FiRepeat,
    FiZap,
    FiSend,
    FiServer,
    FiActivity,
    FiShield,
    FiClock,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const WebSockets = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "WebSockets",
            sub: "WebSockets is a protocol that creates a persistent, two way (full duplex) connection between client and server. After a one time handshake, both sides can send messages anytime without creating a new HTTP request each time.",
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
        <Styled.Wrapper id="websockets">
            <div className="top">
                <h2 className="title">WebSockets</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiRepeat /> Persistent connection
                    </span>
                    <span className="pill">
                        <FiZap /> Real time
                    </span>
                    <span className="pill">
                        <FiSend /> Two way messaging
                    </span>
                    <span className="pill">
                        <FiClock /> Low latency
                    </span>
                    <span className="pill">
                        <FiShield /> Works with WSS
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="ws-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiWifi />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and practical examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="ws-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What problem it solves</h3>
                                <p className="p">
                                    HTTP is request response. The browser asks,
                                    server replies, connection often closes or
                                    becomes idle. For real time apps, doing this
                                    again and again is wasteful and adds delay.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Without WebSockets
                                        </div>
                                        <p className="miniText">
                                            Chat app does polling every 2
                                            seconds using HTTP.
                                            <br />- extra requests
                                            <br />- higher latency
                                            <br />- more server load
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            With WebSockets
                                        </div>
                                        <p className="miniText">
                                            One connection stays open.
                                            <br />- server pushes messages
                                            instantly
                                            <br />- client can send anytime
                                            <br />- less overhead
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Core idea</h3>
                                <p className="p">
                                    WebSockets starts as an HTTP handshake, then
                                    upgrades to a WebSocket connection. After
                                    that, both sides exchange small "frames"
                                    (messages) over the same connection.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 1 - Handshake
                                        </div>
                                        <p className="flowText">
                                            Browser sends HTTP request with
                                            "Upgrade: websocket".
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 2 - Upgrade
                                        </div>
                                        <p className="flowText">
                                            Server replies "101 Switching
                                            Protocols".
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 3 - Messages
                                        </div>
                                        <p className="flowText">
                                            Both can send messages anytime until
                                            connection closes.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Handshake mental model
                                    </div>
                                    <pre className="code">{`Client -> Server (HTTP)
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade

Server -> Client
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade

Now protocol is WebSocket, not normal HTTP.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full form and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">WS</span> -
                                        WebSocket (ws scheme)
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">WSS</span> -
                                        WebSocket Secure (ws over TLS)
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">
                                            Full duplex
                                        </span>{" "}
                                        - two way communication at the same time
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiShield />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Security</div>
                                        <div className="cSub">
                                            Use{" "}
                                            <span className="mono">wss</span> in
                                            production so traffic is encrypted,
                                            similar to https.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Where WebSockets is used</h3>
                                <div className="useGrid">
                                    <div className="use">
                                        <FiActivity />
                                        <div className="uText">
                                            Live dashboards - logs, metrics,
                                            alerts
                                        </div>
                                    </div>
                                    <div className="use">
                                        <FiSend />
                                        <div className="uText">
                                            Chat and messaging apps
                                        </div>
                                    </div>
                                    <div className="use">
                                        <FiZap />
                                        <div className="uText">
                                            Multiplayer games and live
                                            collaboration
                                        </div>
                                    </div>
                                    <div className="use">
                                        <FiServer />
                                        <div className="uText">
                                            Notifications and server push
                                            updates
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Example - simple message flow
                                </h3>
                                <p className="p">
                                    Think of it like a phone call. Once
                                    connected, you do not dial again for every
                                    sentence.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Flow</div>
                                    <pre className="code">{`Client connects (ws or wss)
Server accepts
Client sends: "join room-1"
Server sends: "welcome"
Server sends: "user123 joined"
Client sends: "hello everyone"
Server broadcasts to room-1`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    WebSockets vs HTTP polling vs SSE
                                </h3>

                                <div className="compare">
                                    <div className="row">
                                        <span className="k">HTTP polling</span>
                                        <span className="v">
                                            Client repeatedly asks. Simple but
                                            wasteful.
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">SSE</span>
                                        <span className="v">
                                            Server Sent Events. One way server
                                            to client. Great for updates, not
                                            for two way chat.
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">WebSockets</span>
                                        <span className="v">
                                            Two way, persistent, best for real
                                            time interaction.
                                        </span>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Use WebSockets when you need two way real
                                    time messaging. Use SSE when you only need
                                    server to client updates. Use polling when
                                    you want the simplest fallback.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why is WebSockets faster than
                                            polling for chat messages?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because the connection stays open
                                            and the server can push messages
                                            instantly without creating a new
                                            HTTP request every time.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What should you use in production -
                                            ws or wss?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Use wss so traffic is encrypted
                                            using TLS.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Interview lines</h3>
                                <ul className="list">
                                    <li>
                                        "WebSockets upgrades an HTTP connection
                                        into a persistent full duplex channel."
                                    </li>
                                    <li>
                                        "After handshake, both client and server
                                        can push messages anytime."
                                    </li>
                                    <li>
                                        "Use wss in production because it is ws
                                        over TLS."
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

export default WebSockets;
