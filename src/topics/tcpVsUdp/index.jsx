// src/topics/tcpVsUdp/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiWifi,
    FiShield,
    FiCheckCircle,
    FiZap,
    FiActivity,
    FiRepeat,
    FiSend,
    FiAlertTriangle,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const TcpVsUdp = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "TCP vs UDP",
            sub: "TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two transport layer protocols. TCP focuses on reliable, ordered delivery. UDP focuses on speed and low overhead.",
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
        <Styled.Wrapper id="tcp-vs-udp">
            <div className="top">
                <h2 className="title">TCP vs UDP</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiShield /> TCP - reliable
                    </span>
                    <span className="pill">
                        <FiZap /> UDP - fast
                    </span>
                    <span className="pill">
                        <FiRepeat /> TCP has retries
                    </span>
                    <span className="pill">
                        <FiSend /> UDP sends and moves on
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="tcpudp-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiWifi />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms and real examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="tcpudp-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Full forms</h3>
                                <div className="abbrGrid">
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
                                        <span className="mono">RTT</span> -
                                        Round Trip Time
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">One line difference</h3>
                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            TCP is like a phone call
                                        </div>
                                        <p className="miniText">
                                            Connection is established, messages
                                            are acknowledged, missing parts are
                                            re-sent, and order is maintained.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            UDP is like shouting messages
                                        </div>
                                        <p className="miniText">
                                            You send packets quickly without
                                            waiting. Some packets may be lost or
                                            arrive out of order.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Core properties</h3>
                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxHead">
                                            <span className="bIcon tcp">
                                                <FiShield />
                                            </span>
                                            <div className="boxTitle">TCP</div>
                                        </div>

                                        <ul className="list">
                                            <li>Connection oriented</li>
                                            <li>Reliable delivery</li>
                                            <li>Ordered bytes stream</li>
                                            <li>Retransmission on loss</li>
                                            <li>Flow control</li>
                                            <li>Congestion control</li>
                                        </ul>
                                    </div>

                                    <div className="box">
                                        <div className="boxHead">
                                            <span className="bIcon udp">
                                                <FiZap />
                                            </span>
                                            <div className="boxTitle">UDP</div>
                                        </div>

                                        <ul className="list">
                                            <li>Connectionless</li>
                                            <li>No guaranteed delivery</li>
                                            <li>No guaranteed order</li>
                                            <li>No retransmission built in</li>
                                            <li>Low overhead</li>
                                            <li>Lower latency</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What is connection oriented
                                </h3>
                                <p className="p">
                                    <strong>Connection oriented</strong> means
                                    TCP first creates a connection before data
                                    transfer. This is done using the{" "}
                                    <strong>3 way handshake</strong>.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        TCP 3 way handshake
                                    </div>
                                    <pre className="code">{`Client -> Server: SYN (I want to start)
Server -> Client: SYN-ACK (Ok, I agree)
Client -> Server: ACK (Confirmed)

Now connection is established, then data starts.`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiActivity />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Why handshake matters
                                        </div>
                                        <div className="cSub">
                                            It adds initial delay but gives
                                            reliability and correct ordering.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Reliability and ordering</h3>
                                <p className="p">
                                    TCP numbers data using sequence numbers and
                                    expects acknowledgements (ACK). If a packet
                                    is lost, TCP resends it. This keeps the
                                    final received stream complete and ordered.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            TCP - reliable stream
                                        </div>
                                        <p className="miniText">
                                            You always get the correct file
                                            content, in correct order, even if
                                            the network drops some packets.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            UDP - best effort packets
                                        </div>
                                        <p className="miniText">
                                            You may miss some updates. The app
                                            can choose to ignore missing ones or
                                            send again manually.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Small example</div>
                                    <pre className="code">{`TCP:
Send packets: 1 2 3 4
Packet 3 lost
Receiver ACKs 1 2, missing 3
Sender resends 3
Receiver finally gets 1 2 3 4 (ordered)

UDP:
Send packets: 1 2 3 4
Packet 3 lost
Receiver may see: 1 2 4 (no automatic resend)`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Where each is used</h3>
                                <div className="useGrid">
                                    <div className="useCard">
                                        <div className="useHead">
                                            <span className="tag tcp">TCP</span>
                                            <div className="useTitle">
                                                Use when correctness matters
                                            </div>
                                        </div>

                                        <ul className="list">
                                            <li>
                                                Web browsing - HTTP and HTTPS
                                            </li>
                                            <li>
                                                APIs and database connections
                                            </li>
                                            <li>File downloads</li>
                                            <li>Email and SSH</li>
                                        </ul>
                                    </div>

                                    <div className="useCard">
                                        <div className="useHead">
                                            <span className="tag udp">UDP</span>
                                            <div className="useTitle">
                                                Use when speed matters
                                            </div>
                                        </div>

                                        <ul className="list">
                                            <li>Live video and voice calls</li>
                                            <li>
                                                Online games (position updates)
                                            </li>
                                            <li>DNS queries (often)</li>
                                            <li>Streaming telemetry</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Many modern apps use UDP but build
                                    reliability at the application level when
                                    needed. Example - QUIC runs on UDP and is
                                    used for HTTP 3.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Common confusion points</h3>
                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">
                                            Is UDP always faster
                                        </div>
                                        <div className="a">
                                            Usually lower overhead, but if you
                                            need retries at app layer, you may
                                            lose the advantage.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">
                                            Why not use TCP for video calls
                                        </div>
                                        <div className="a">
                                            Retries and strict ordering can add
                                            delay. For calls, recent data is
                                            more important than perfect old
                                            data.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">
                                            Can UDP be reliable
                                        </div>
                                        <div className="a">
                                            UDP itself is not, but apps can add
                                            sequence numbers and ACK logic if
                                            needed.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            You are downloading a PDF. TCP or
                                            UDP and why
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            TCP, because the file must be
                                            complete and correct. Missing
                                            packets must be resent.
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            You are building a real time
                                            multiplayer game. TCP or UDP and why
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            UDP, because low latency updates
                                            matter more. If one update is
                                            missed, the next update can correct
                                            the state.
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
                                        "TCP is connection oriented and
                                        reliable, so it guarantees ordered
                                        delivery using sequence numbers and
                                        ACK."
                                    </li>
                                    <li>
                                        "UDP is connectionless and best effort,
                                        so it is lower overhead and great for
                                        low latency use cases."
                                    </li>
                                    <li>
                                        "If data correctness matters, pick TCP.
                                        If low latency matters and losing a
                                        little is ok, pick UDP."
                                    </li>
                                </ul>

                                <div className="warn">
                                    <span className="wIcon">
                                        <FiAlertTriangle />
                                    </span>
                                    <div className="wText">
                                        Important - TCP and UDP are transport
                                        protocols. IP handles routing. HTTP is
                                        an application layer protocol that
                                        usually uses TCP.
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

export default TcpVsUdp;
