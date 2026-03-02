// src/topics/httpsAndSsl/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiLock,
    FiShield,
    FiKey,
    FiRefreshCw,
    FiWifi,
    FiCheckCircle,
    FiBookOpen,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const HttpsAndSsl = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "HTTPS and SSL",
            sub: "HTTPS (HyperText Transfer Protocol Secure) is HTTP + encryption. It uses TLS (Transport Layer Security, earlier called SSL) to protect data in transit so attackers cannot easily read or change it.",
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
        <Styled.Wrapper id="https-and-ssl">
            <div className="top">
                <h2 className="title">HTTPS and SSL</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiLock /> Encrypted
                    </span>
                    <span className="pill">
                        <FiShield /> Authentic
                    </span>
                    <span className="pill">
                        <FiCheckCircle /> Integrity
                    </span>
                    <span className="pill">
                        <FiKey /> Certificates
                    </span>
                    <span className="pill">
                        <FiRefreshCw /> Handshake
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="https-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiBookOpen />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                beginner explanation and examples
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="https-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">What HTTPS gives you</h3>
                                <p className="p">
                                    HTTPS protects data traveling between your
                                    browser and the server. It mainly provides 3
                                    guarantees:
                                </p>

                                <div className="triGrid">
                                    <div className="tri">
                                        <div className="tHead">
                                            <FiLock />
                                            <span>Confidentiality</span>
                                        </div>
                                        <p className="tBody">
                                            Data is encrypted so attackers
                                            cannot read it.
                                        </p>
                                    </div>

                                    <div className="tri">
                                        <div className="tHead">
                                            <FiCheckCircle />
                                            <span>Integrity</span>
                                        </div>
                                        <p className="tBody">
                                            Data cannot be silently modified in
                                            transit.
                                        </p>
                                    </div>

                                    <div className="tri">
                                        <div className="tHead">
                                            <FiShield />
                                            <span>Authentication</span>
                                        </div>
                                        <p className="tBody">
                                            You are connected to the real
                                            server, not an impersonator.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiWifi />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Real scenario
                                        </div>
                                        <div className="cSub">
                                            On public WiFi, HTTP traffic can be
                                            sniffed and modified. HTTPS blocks
                                            easy snooping and tampering.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">SSL vs TLS</h3>
                                <p className="p">
                                    SSL means "Secure Sockets Layer". TLS means
                                    "Transport Layer Security".
                                    <br />
                                    Today, real HTTPS uses TLS. People still say
                                    "SSL certificate" because the name stuck.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Simple rule
                                        </div>
                                        <p className="miniText">
                                            Say "TLS" for correctness. Use "SSL"
                                            only as a casual term.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Where it sits
                                        </div>
                                        <p className="miniText">
                                            HTTPS is HTTP on top of TLS, which
                                            is on top of TCP.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">Stack view</div>
                                    <pre className="code">{`Application: HTTP
Security: TLS (often called SSL)
Transport: TCP
Network: IP`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Certificates - what they do
                                </h3>
                                <p className="p">
                                    A certificate proves the server identity. It
                                    includes the domain name and the server
                                    public key, and it is signed by a trusted CA
                                    (Certificate Authority).
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Public key
                                        </div>
                                        <p className="boxText">
                                            Shared openly. Used to encrypt or
                                            verify signatures.
                                        </p>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            Private key
                                        </div>
                                        <p className="boxText">
                                            Kept secret on server. Used to
                                            decrypt or sign data.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiKey />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Beginner intuition
                                        </div>
                                        <div className="cSub">
                                            Certificate says: "This public key
                                            belongs to this domain". Browser
                                            trusts it because a trusted CA
                                            signed it.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    TLS handshake - the basic story
                                </h3>
                                <p className="p">
                                    A handshake is the setup phase before secure
                                    data transfer. The goal is to:
                                    <br />- verify server identity
                                    <br />- agree on encryption settings
                                    <br />- create a shared session key for fast
                                    symmetric encryption
                                </p>

                                <div className="steps">
                                    <div className="step">
                                        <div className="num">1</div>
                                        <div className="txt">
                                            ClientHello - browser proposes TLS
                                            version and ciphers
                                        </div>
                                    </div>

                                    <div className="step">
                                        <div className="num">2</div>
                                        <div className="txt">
                                            ServerHello - server picks cipher
                                            and sends certificate
                                        </div>
                                    </div>

                                    <div className="step">
                                        <div className="num">3</div>
                                        <div className="txt">
                                            Browser verifies certificate
                                            (domain, signature chain, expiry)
                                        </div>
                                    </div>

                                    <div className="step">
                                        <div className="num">4</div>
                                        <div className="txt">
                                            Key exchange creates shared session
                                            key
                                        </div>
                                    </div>

                                    <div className="step">
                                        <div className="num">5</div>
                                        <div className="txt">
                                            Encrypted HTTP starts using the
                                            session key
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Why not encrypt everything with public
                                        key?
                                    </div>
                                    <pre className="code">{`Public key crypto is slower.
So TLS uses public key crypto mainly for setup (handshake),
then uses a fast symmetric session key for the actual data.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Common myths and clarity</h3>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">
                                            "HTTPS means the site is safe"
                                        </div>
                                        <div className="a">
                                            HTTPS only secures transport. A site
                                            can still be malicious.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">
                                            "HTTPS hides everything"
                                        </div>
                                        <div className="a">
                                            It hides the path and query, but the
                                            domain can still be visible via DNS
                                            and SNI in many setups.
                                        </div>
                                    </div>

                                    <div className="qa">
                                        <div className="q">
                                            "SSL and TLS are different things"
                                        </div>
                                        <div className="a">
                                            TLS replaced SSL. People use SSL as
                                            a name, but modern traffic is TLS.
                                        </div>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiZap />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Practical dev takeaway
                                        </div>
                                        <div className="cSub">
                                            Use HTTPS always. Secure cookies
                                            need HTTPS. OAuth callbacks should
                                            be HTTPS. Production APIs should be
                                            HTTPS.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and key terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">HTTP</span> -
                                        HyperText Transfer Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">HTTPS</span> -
                                        HyperText Transfer Protocol Secure
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SSL</span> -
                                        Secure Sockets Layer
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLS</span> -
                                        Transport Layer Security
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CA</span> -
                                        Certificate Authority
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SNI</span> -
                                        Server Name Indication
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TCP</span> -
                                        Transmission Control Protocol
                                    </div>
                                </div>

                                <div className="finalNote">
                                    HTTPS is "secure transport". It is not a
                                    magic security shield for bad backend code,
                                    but it is a must-have foundation.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why does TLS use a session key?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because symmetric encryption with a
                                            session key is fast, while public
                                            key encryption is slow. TLS uses
                                            public key crypto mainly for
                                            handshake, then uses a session key
                                            for data.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What does a certificate prove?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            It proves that a public key belongs
                                            to a specific domain, because a
                                            trusted CA signed it.
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
                                        "HTTPS is HTTP over TLS. TLS provides
                                        confidentiality, integrity, and server
                                        authentication."
                                    </li>
                                    <li>
                                        "TLS handshake verifies the certificate
                                        and establishes a shared session key,
                                        then data is encrypted symmetrically."
                                    </li>
                                    <li>
                                        "People say SSL, but modern HTTPS uses
                                        TLS."
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

export default HttpsAndSsl;
