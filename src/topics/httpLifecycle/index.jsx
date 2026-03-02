// src/topics/httpLifecycle/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGlobe,
    FiSearch,
    FiShield,
    FiRepeat,
    FiSend,
    FiServer,
    FiClock,
    FiLayers,
    FiZap,
    FiLink,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const HttpLifecycle = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "HTTP lifecycle",
            sub: "HTTP lifecycle means the full journey of a web request from your browser to a server and back - including DNS, connection setup, request, response, caching, and connection reuse.",
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
        <Styled.Wrapper id="http-lifecycle">
            <div className="top">
                <h2 className="title">HTTP lifecycle</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiSearch /> DNS lookup
                    </span>
                    <span className="pill">
                        <FiLink /> TCP connect
                    </span>
                    <span className="pill">
                        <FiShield /> TLS handshake
                    </span>
                    <span className="pill">
                        <FiSend /> HTTP request
                    </span>
                    <span className="pill">
                        <FiServer /> HTTP response
                    </span>
                    <span className="pill">
                        <FiRepeat /> Keep alive
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="http-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiGlobe />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                step by step flow and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="http-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">
                                    What happens when you open a site
                                </h3>
                                <p className="p">
                                    When you type a URL in the browser and press
                                    Enter, your browser must find the server,
                                    connect to it, send an HTTP request, and
                                    receive an HTTP response. That full journey
                                    is the HTTP lifecycle.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example URL</div>
                                    <pre className="code">{`https://example.com/products?page=2

Protocol: https
Host: example.com
Path: /products
Query: page=2`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 0 - Cache checks (fast path)
                                </h3>
                                <p className="p">
                                    Before doing any network work, the browser
                                    checks if it already has a usable response.
                                    This can be from memory cache, disk cache,
                                    or a service worker cache.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Why it matters
                                        </div>
                                        <p className="miniText">
                                            If cache is valid, browser can skip
                                            most steps and load instantly.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Common headers
                                        </div>
                                        <p className="miniText">
                                            Cache-Control, ETag, If-None-Match,
                                            Last-Modified.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Step 1 - DNS lookup</h3>
                                <p className="p">
                                    DNS (Domain Name System) converts the domain
                                    name into an IP address. The browser asks a
                                    DNS resolver for the IP of example.com.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiSearch />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Simple analogy
                                        </div>
                                        <div className="cSub">
                                            DNS is like a phonebook - name to
                                            number mapping.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Example</div>
                                    <pre className="code">{`example.com -> 93.184.216.34 (example IP)

Browser asks:
- browser DNS cache
- OS DNS cache
- router DNS cache
- ISP or public DNS resolver`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Step 2 - TCP connection</h3>
                                <p className="p">
                                    After the IP is known, the browser opens a
                                    TCP (Transmission Control Protocol)
                                    connection to the server. TCP ensures
                                    reliable delivery using a handshake.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Handshake
                                        </div>
                                        <p className="miniText">
                                            TCP typically uses a 3 step
                                            handshake to start communication.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Why TCP</div>
                                        <p className="miniText">
                                            It guarantees ordered delivery and
                                            retransmits lost packets.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        3 way handshake
                                    </div>
                                    <pre className="code">{`Client -> Server: SYN
Server -> Client: SYN-ACK
Client -> Server: ACK

Now the connection is established`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 3 - TLS handshake (for HTTPS)
                                </h3>
                                <p className="p">
                                    If the URL is HTTPS, TLS (Transport Layer
                                    Security) runs on top of TCP to create a
                                    secure encrypted channel. It also verifies
                                    server identity using certificates.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiShield />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            What you get
                                        </div>
                                        <div className="cSub">
                                            Encryption, integrity, and
                                            authentication.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Beginner view</div>
                                    <pre className="code">{`Browser and server agree on:
- cipher suite
- encryption keys

Then all HTTP data is encrypted in transit`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 4 - Send HTTP request
                                </h3>
                                <p className="p">
                                    The browser sends an HTTP request with a
                                    method, path, headers, and optional body.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">GET</div>
                                        <div className="a">
                                            Read data. Usually no body.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">POST</div>
                                        <div className="a">
                                            Create data. Body contains payload.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">PUT</div>
                                        <div className="a">
                                            Replace data fully.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">PATCH</div>
                                        <div className="a">
                                            Update partially.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">DELETE</div>
                                        <div className="a">Remove data.</div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">Headers</div>
                                        <div className="a">
                                            Metadata like auth, content type,
                                            caching rules.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        HTTP request example
                                    </div>
                                    <pre className="code">{`GET /products?page=2 HTTP/1.1
Host: example.com
Accept: text/html
User-Agent: Chrome
Cookie: sid=abc123

Body: (usually empty for GET)`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 5 - Server processing
                                </h3>
                                <p className="p">
                                    The server receives the request, runs
                                    application logic, may talk to a database,
                                    and produces a response. If there is a load
                                    balancer, the request may be routed to one
                                    server among many.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Reverse proxy
                                        </div>
                                        <p className="flowText">
                                            Nginx or similar routes requests,
                                            handles TLS, and forwards to app.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            App server
                                        </div>
                                        <p className="flowText">
                                            Node, Java, Go, etc processes
                                            routes, auth, business logic.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            DB and cache
                                        </div>
                                        <p className="flowText">
                                            Reads and writes data, may use Redis
                                            or memory cache.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Step 6 - HTTP response</h3>
                                <p className="p">
                                    The server sends back a response with a
                                    status code, headers, and body.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Status codes
                                        </div>
                                        <p className="miniText">
                                            200 OK, 301 Redirect, 404 Not Found,
                                            500 Server Error.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Body</div>
                                        <p className="miniText">
                                            HTML, JSON, images, CSS, JS, or any
                                            binary data.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        HTTP response example
                                    </div>
                                    <pre className="code">{`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=60
Set-Cookie: sid=abc123; HttpOnly; Secure

<html>...</html>`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 7 - Browser rendering
                                </h3>
                                <p className="p">
                                    For a page load, the browser parses HTML,
                                    downloads CSS and JS, builds the DOM,
                                    applies styles, and paints pixels to the
                                    screen. It may also make more HTTP requests
                                    for images, fonts, and APIs.
                                </p>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiLayers />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Common surprise
                                        </div>
                                        <div className="cSub">
                                            One page can trigger dozens or
                                            hundreds of extra HTTP requests.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Step 8 - Connection reuse and HTTP versions
                                </h3>
                                <p className="p">
                                    Modern browsers reuse connections using
                                    keep-alive so they do not open a new TCP
                                    connection for every request. HTTP versions
                                    also matter for performance.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">HTTP 1.1</div>
                                        <div className="a">
                                            Keep-alive possible, but many
                                            requests can still block each other.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">HTTP 2</div>
                                        <div className="a">
                                            Multiplexing - many streams on one
                                            connection, better performance.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">HTTP 3</div>
                                        <div className="a">
                                            Uses QUIC over UDP, reduces
                                            handshake latency in many cases.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Keep-alive idea
                                    </div>
                                    <pre className="code">{`Without keep-alive:
Request 1 -> open TCP -> close
Request 2 -> open TCP -> close

With keep-alive:
Open TCP once
Send many requests on the same connection`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Where time goes (latency breakdown)
                                </h3>
                                <p className="p">
                                    If a page feels slow, it is usually one of
                                    these parts. This section helps you debug
                                    performance like a grown up.
                                </p>

                                <div className="latencyGrid">
                                    <div className="lat">
                                        <div className="latTop">
                                            <FiSearch />
                                            <span>DNS</span>
                                        </div>
                                        <div className="latText">
                                            DNS lookup delay if not cached.
                                        </div>
                                    </div>

                                    <div className="lat">
                                        <div className="latTop">
                                            <FiLink />
                                            <span>TCP</span>
                                        </div>
                                        <div className="latText">
                                            Handshake and network RTT.
                                        </div>
                                    </div>

                                    <div className="lat">
                                        <div className="latTop">
                                            <FiShield />
                                            <span>TLS</span>
                                        </div>
                                        <div className="latText">
                                            Certificate validation and key
                                            setup.
                                        </div>
                                    </div>

                                    <div className="lat">
                                        <div className="latTop">
                                            <FiServer />
                                            <span>Server</span>
                                        </div>
                                        <div className="latText">
                                            Backend processing and DB queries.
                                        </div>
                                    </div>

                                    <div className="lat">
                                        <div className="latTop">
                                            <FiClock />
                                            <span>TTFB</span>
                                        </div>
                                        <div className="latText">
                                            Time To First Byte - first response
                                            byte arrival time.
                                        </div>
                                    </div>

                                    <div className="lat">
                                        <div className="latTop">
                                            <FiLayers />
                                            <span>Render</span>
                                        </div>
                                        <div className="latText">
                                            DOM, CSS, JS parsing and painting.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
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
                                        <span className="mono">IP</span> -
                                        Internet Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TCP</span> -
                                        Transmission Control Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">URL</span> -
                                        Uniform Resource Locator
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TTFB</span> -
                                        Time To First Byte
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RTT</span> -
                                        Round Trip Time
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">DOM</span> -
                                        Document Object Model
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">QUIC</span> -
                                        Quick UDP Internet Connections
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">UDP</span> - User
                                        Datagram Protocol
                                    </div>
                                </div>

                                <div className="finalNote">
                                    The HTTP lifecycle is not just "send request
                                    and get response". It is a chain of
                                    dependencies. When you know the chain, you
                                    can debug slow apps and random failures with
                                    confidence.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can HTTPS be slower than HTTP on
                                            the first request?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because it adds a TLS handshake on
                                            top of TCP. After the connection is
                                            established, keep-alive and session
                                            reuse reduce the overhead.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What is TTFB and what usually
                                            increases it?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Time To First Byte. It increases due
                                            to slow server work, slow DB
                                            queries, network RTT, or cold
                                            starts.
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
                                        "Browser checks cache, then does DNS,
                                        then TCP connect, then TLS for HTTPS,
                                        then sends HTTP request and receives
                                        response."
                                    </li>
                                    <li>
                                        "Keep-alive reduces repeated TCP
                                        handshakes. HTTP 2 multiplexing reduces
                                        blocking and improves performance."
                                    </li>
                                    <li>
                                        "Latency is often DNS, handshake, server
                                        processing, or render time. TTFB is a
                                        key metric."
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

export default HttpLifecycle;
