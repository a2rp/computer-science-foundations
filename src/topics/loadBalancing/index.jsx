// src/topics/loadBalancing/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiShuffle,
    FiServer,
    FiGlobe,
    FiActivity,
    FiLayers,
    FiShield,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const LoadBalancing = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Load balancing",
            sub: "Load balancing distributes incoming traffic across multiple servers so no single server is overloaded. It improves scalability, reliability, and performance.",
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
        <Styled.Wrapper id="load-balancing">
            <div className="top">
                <h2 className="title">Load balancing</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiServer /> Multiple servers
                    </span>
                    <span className="pill">
                        <FiShuffle /> Traffic distribution
                    </span>
                    <span className="pill">
                        <FiShield /> High availability
                    </span>
                    <span className="pill">
                        <FiActivity /> Scalability
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="lb-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiGlobe />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                real world examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="lb-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    Why load balancing is needed
                                </h3>
                                <p className="p">
                                    If 10,000 users hit one server at the same
                                    time, that server may crash or slow down.
                                    Instead, we place a{" "}
                                    <strong>load balancer</strong> in front of
                                    multiple servers.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Simple architecture
                                    </div>
                                    <pre className="code">{`Users
   |
   v
Load Balancer
   |    |    |
   v    v    v
Server1 Server2 Server3

The load balancer decides which server handles each request.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What a load balancer does
                                </h3>
                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Distribute traffic
                                        </div>
                                        <p className="miniText">
                                            Spreads incoming requests across
                                            available servers.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Health checks
                                        </div>
                                        <p className="miniText">
                                            Stops sending traffic to servers
                                            that are down.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Failover
                                        </div>
                                        <p className="miniText">
                                            Automatically shifts traffic if a
                                            server crashes.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            SSL termination
                                        </div>
                                        <p className="miniText">
                                            Handles HTTPS decryption to reduce
                                            load on backend servers.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Load balancing algorithms
                                </h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">Round Robin</div>
                                        <div className="a">
                                            Sends requests one by one in order.
                                            Simple and common.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">
                                            Least Connections
                                        </div>
                                        <div className="a">
                                            Sends request to the server with the
                                            fewest active connections.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">IP Hash</div>
                                        <div className="a">
                                            Same client IP always goes to the
                                            same server.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Intuition</div>
                                        <div className="cSub">
                                            Round Robin is fair. Least
                                            Connections is smarter when some
                                            requests are heavy and long running.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Horizontal vs Vertical scaling
                                </h3>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Vertical scaling
                                        </div>
                                        <p className="boxText">
                                            Increase power of one server. More
                                            CPU, more RAM.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            Horizontal scaling
                                        </div>
                                        <p className="boxText">
                                            Add more servers and use load
                                            balancing.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Real example</div>
                                    <pre className="code">{`Vertical:
Upgrade from 8GB RAM to 32GB RAM.

Horizontal:
Add 3 more servers and place load balancer in front.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">L4 vs L7 load balancing</h3>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Layer 4</div>
                                        <p className="miniText">
                                            Works at transport layer (TCP or
                                            UDP). Routes based on IP and port.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Layer 7</div>
                                        <p className="miniText">
                                            Works at application layer (HTTP).
                                            Can route based on URL path or
                                            headers.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example routing
                                    </div>
                                    <pre className="code">{`example.com/api -> Server A
example.com/images -> Server B

This is Layer 7 load balancing.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Sticky sessions</h3>
                                <p className="p">
                                    Sticky sessions mean the same user always
                                    connects to the same backend server. Useful
                                    when session data is stored in memory.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLayers />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Better approach
                                        </div>
                                        <div className="cSub">
                                            Store session in Redis or database
                                            so any server can handle any user.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">CPU</span> -
                                        Central Processing Unit
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RAM</span> -
                                        Random Access Memory
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
                                        <span className="mono">HTTP</span> -
                                        HyperText Transfer Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">HTTPS</span> -
                                        HyperText Transfer Protocol Secure
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    How to explain in interviews
                                </h3>
                                <ul className="list">
                                    <li>
                                        "Load balancing distributes traffic
                                        across multiple servers to improve
                                        scalability and availability."
                                    </li>
                                    <li>
                                        "Round Robin is simple. Least
                                        Connections adapts better under uneven
                                        load."
                                    </li>
                                    <li>
                                        "Layer 7 load balancer can route based
                                        on URL paths."
                                    </li>
                                    <li>
                                        "Horizontal scaling combined with load
                                        balancing supports large traffic."
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

export default LoadBalancing;
