// src/topics/dns/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiGlobe,
    FiSearch,
    FiList,
    FiServer,
    FiShield,
    FiClock,
    FiRepeat,
    FiWifi,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const DNS = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "DNS",
            sub: "DNS (Domain Name System) converts human friendly domain names like 'google.com' into IP addresses like '142.250.x.x'. Browsers and servers need IP addresses to talk on the internet.",
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
        <Styled.Wrapper id="dns">
            <div className="top">
                <h2 className="title">DNS</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiGlobe /> Name to IP
                    </span>
                    <span className="pill">
                        <FiClock /> Caching via TTL
                    </span>
                    <span className="pill">
                        <FiServer /> Records like A, AAAA, CNAME
                    </span>
                    <span className="pill">
                        <FiShield /> DNSSEC (optional)
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="dns-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiSearch />
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
                        id="dns-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Meaning</h3>
                                <p className="p">
                                    DNS is like the internet's phonebook. Humans
                                    type domain names, but networking needs IP
                                    addresses.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Domain name
                                        </div>
                                        <p className="miniText">
                                            A readable name like{" "}
                                            <span className="mono">
                                                example.com
                                            </span>
                                            .
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            IP address
                                        </div>
                                        <p className="miniText">
                                            A numeric address like{" "}
                                            <span className="mono">
                                                93.184.216.34
                                            </span>{" "}
                                            (IPv4) or{" "}
                                            <span className="mono">
                                                2606:2800:220:1:248:1893:25c8:1946
                                            </span>{" "}
                                            (IPv6).
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    What happens when you open a website
                                </h3>
                                <p className="p">
                                    When you type a domain in a browser, the
                                    browser needs the IP first. DNS resolution
                                    is the process of finding that IP.
                                </p>

                                <div className="flowGrid">
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 1 - check cache
                                        </div>
                                        <p className="flowText">
                                            Browser cache, OS cache, and local
                                            router cache.
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 2 - ask resolver
                                        </div>
                                        <p className="flowText">
                                            Recursive resolver (ISP or public
                                            like Cloudflare 1.1.1.1).
                                        </p>
                                    </div>
                                    <div className="flow">
                                        <div className="flowTitle">
                                            Step 3 - walk the DNS tree
                                        </div>
                                        <p className="flowText">
                                            Root servers - TLD servers -
                                            Authoritative servers.
                                        </p>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        DNS resolution flow (simple)
                                    </div>
                                    <pre className="code">{`You type: example.com

1) Browser checks cache
2) OS checks cache
3) Resolver asks:
   - Root DNS: where is .com?
   - TLD DNS (.com): where is example.com?
   - Authoritative DNS: here is the IP

Then the browser uses the IP to connect with TCP and HTTPS.`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">DNS record types</h3>
                                <p className="p">
                                    DNS stores different kinds of records. Each
                                    record answers a specific question.
                                </p>

                                <div className="qaGrid">
                                    <div className="qa">
                                        <div className="q">A</div>
                                        <div className="a">
                                            Maps name to IPv4 address.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">AAAA</div>
                                        <div className="a">
                                            Maps name to IPv6 address.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">CNAME</div>
                                        <div className="a">
                                            Alias to another domain name.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">MX</div>
                                        <div className="a">
                                            Mail server routing for email.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">TXT</div>
                                        <div className="a">
                                            Text record, used for verification
                                            and email security.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">NS</div>
                                        <div className="a">
                                            Name Server records for
                                            authoritative servers.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Example DNS records
                                    </div>
                                    <pre className="code">{`example.com   A      93.184.216.34
www           CNAME  example.com
example.com   MX     mail.example.com
example.com   TXT    "google-site-verification=..."
example.com   NS     ns1.provider.net`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">TTL and caching</h3>
                                <p className="p">
                                    TTL means Time To Live. It tells how long a
                                    DNS answer should be cached. Caching makes
                                    DNS fast, but can delay changes.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Fast</div>
                                        <p className="miniText">
                                            Cached DNS avoids repeated lookups.
                                            Page loads quicker.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">Delay</div>
                                        <p className="miniText">
                                            If you change an IP, some users may
                                            still get the old IP until TTL
                                            expires.
                                        </p>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiClock />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            Real production tip
                                        </div>
                                        <div className="cSub">
                                            Before big migrations, teams reduce
                                            TTL to a small value (like 60
                                            seconds) so changes propagate
                                            faster.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Recursive vs Authoritative servers
                                </h3>
                                <p className="p">
                                    A recursive resolver finds the answer for
                                    you. An authoritative server is the final
                                    source of truth for the domain.
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Recursive resolver
                                        </div>
                                        <ul className="list">
                                            <li>Does the lookup steps</li>
                                            <li>Caches answers</li>
                                            <li>Returns final IP</li>
                                        </ul>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            Authoritative DNS
                                        </div>
                                        <ul className="list">
                                            <li>Stores real DNS records</li>
                                            <li>Final answer source</li>
                                            <li>Managed by DNS provider</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    DNS problems you see in real life
                                </h3>
                                <div className="qaGrid two">
                                    <div className="qa">
                                        <div className="q">Wrong IP</div>
                                        <div className="a">
                                            Old cache or wrong A record.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">
                                            Propagation delay
                                        </div>
                                        <div className="a">
                                            TTL not expired yet.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">CNAME loops</div>
                                        <div className="a">
                                            Alias points back and never
                                            resolves.
                                        </div>
                                    </div>
                                    <div className="qa">
                                        <div className="q">DNS outage</div>
                                        <div className="a">
                                            Resolver or provider down, so no one
                                            can find your IP.
                                        </div>
                                    </div>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Quick debugging path
                                    </div>
                                    <pre className="code">{`If a site is not opening:

1) Check domain resolves:
   - nslookup example.com
   - dig example.com

2) Compare results across resolvers:
   - 1.1.1.1
   - 8.8.8.8
   - your ISP resolver

3) Verify TTL and records in DNS dashboard`}</pre>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Full forms and terms</h3>
                                <div className="abbrGrid">
                                    <div className="abbr">
                                        <span className="mono">DNS</span> -
                                        Domain Name System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">IP</span> -
                                        Internet Protocol
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TTL</span> - Time
                                        To Live
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TLD</span> - Top
                                        Level Domain
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">NS</span> - Name
                                        Server
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MX</span> - Mail
                                        Exchange
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">A</span> -
                                        Address (IPv4 record)
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">AAAA</span> -
                                        IPv6 Address record
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">CNAME</span> -
                                        Canonical Name
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">TXT</span> - Text
                                        record
                                    </div>
                                </div>

                                <div className="finalNote">
                                    DNS is the first step of almost every web
                                    request. If DNS fails, nothing else starts.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can DNS changes feel slow?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Because caches keep DNS answers for
                                            the TTL duration. Until TTL expires,
                                            some users see old records.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            When would you use CNAME?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            When you want a subdomain like 'www'
                                            to point to another domain name, not
                                            directly to an IP.
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
                                        "DNS resolves domain names to IP
                                        addresses using caches and a recursive
                                        resolver that queries root, TLD, and
                                        authoritative servers."
                                    </li>
                                    <li>
                                        "TTL controls caching. Lower TTL helps
                                        faster migrations, higher TTL reduces
                                        DNS load."
                                    </li>
                                    <li>
                                        "A is IPv4, AAAA is IPv6, CNAME is
                                        alias, MX is mail routing, TXT is
                                        verification."
                                    </li>
                                </ul>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Next topics around DNS</h3>
                                <div className="nextGrid">
                                    <div className="next">
                                        <FiWifi />
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
                                        <FiRepeat />
                                        <div className="nText">
                                            Load balancing
                                        </div>
                                    </div>
                                    <div className="next">
                                        <FiServer />
                                        <div className="nText">TCP vs UDP</div>
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

export default DNS;
