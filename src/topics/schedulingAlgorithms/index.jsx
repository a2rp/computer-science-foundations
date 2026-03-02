// src/topics/schedulingAlgorithms/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "./styled";
import {
    FiChevronDown,
    FiCpu,
    FiClock,
    FiShuffle,
    FiRepeat,
    FiFilter,
    FiTrendingUp,
    FiAlertCircle,
    FiLayers,
    FiZap,
} from "react-icons/fi";

const TRANSITION_MS = 220;

const SchedulingAlgorithms = () => {
    const [open, setOpen] = useState(false);

    // load on click
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const content = useMemo(() => {
        return {
            title: "Scheduling algorithms",
            sub: "Scheduling algorithms decide which process or thread gets CPU time next. The goal is to keep the system responsive, fair, and efficient while minimizing waiting time and maximizing throughput.",
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
        <Styled.Wrapper id="scheduling-algorithms">
            <div className="top">
                <h2 className="title">Scheduling algorithms</h2>
                <p className="sub">{content.sub}</p>

                <div className="pillRow" aria-label="At a glance">
                    <span className="pill">
                        <FiCpu /> Who runs next
                    </span>
                    <span className="pill">
                        <FiClock /> Response time
                    </span>
                    <span className="pill">
                        <FiRepeat /> Time slicing
                    </span>
                    <span className="pill">
                        <FiFilter /> Priority rules
                    </span>
                    <span className="pill">
                        <FiShuffle /> Preemptive vs non preemptive
                    </span>
                </div>
            </div>

            <div className="accordion">
                <button
                    type="button"
                    className="accBtn"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls="sched-panel"
                >
                    <div className="accLeft">
                        <span className="accIcon">
                            <FiCpu />
                        </span>
                        <div className="accText">
                            <div className="accTitle">{content.title}</div>
                            <div className="accHint">
                                Click to {open ? "collapse" : "expand"} with
                                clear terms, examples, and quick comparisons
                            </div>
                        </div>
                    </div>

                    <span className={`chev ${open ? "open" : ""}`}>
                        <FiChevronDown />
                    </span>
                </button>

                {isMounted && (
                    <div
                        id="sched-panel"
                        className={`panel ${isVisible ? "open" : ""}`}
                    >
                        <div className="panelInner">
                            <section className="sec">
                                <h3 className="h3">Why scheduling exists</h3>
                                <p className="p">
                                    CPU (Central Processing Unit) is limited.
                                    Many processes want CPU time at the same
                                    moment. The OS (Operating System) uses a
                                    scheduler to decide the next process to run.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            What scheduler tries to achieve
                                        </div>
                                        <ul className="list">
                                            <li>
                                                Good response time for users
                                            </li>
                                            <li>Fairness between tasks</li>
                                            <li>
                                                High throughput (more work done)
                                            </li>
                                            <li>Low waiting time</li>
                                            <li>
                                                Avoid starvation (never getting
                                                CPU)
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Simple example
                                        </div>
                                        <p className="miniText">
                                            You have Chrome, VS Code, and a
                                            video call. If one task hogs CPU,
                                            the system feels frozen. Scheduling
                                            prevents that.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Preemptive vs non preemptive
                                </h3>
                                <p className="p">
                                    <strong>Preemptive</strong> means the OS can
                                    interrupt a running process and give CPU to
                                    another process.{" "}
                                    <strong>Non preemptive</strong> means a
                                    running process keeps CPU until it finishes
                                    or blocks for I O (Input Output).
                                </p>

                                <div className="twoCol">
                                    <div className="box">
                                        <div className="boxTitle">
                                            Preemptive
                                        </div>
                                        <ul className="list">
                                            <li>Better responsiveness</li>
                                            <li>More context switches</li>
                                            <li>More complex</li>
                                        </ul>
                                    </div>
                                    <div className="box">
                                        <div className="boxTitle">
                                            Non preemptive
                                        </div>
                                        <ul className="list">
                                            <li>Simple to implement</li>
                                            <li>
                                                Can feel stuck with long jobs
                                            </li>
                                            <li>Less switching overhead</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiShuffle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Key term</div>
                                        <div className="cSub">
                                            <span className="mono">
                                                Context switch
                                            </span>{" "}
                                            happens when OS saves current task
                                            state and loads next task state. It
                                            costs time.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Core algorithms</h3>

                                <div className="algoGrid">
                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiLayers />
                                            </span>
                                            <div className="aTitle">FCFS</div>
                                        </div>
                                        <p className="aText">
                                            First Come First Serve - run jobs in
                                            arrival order. Non preemptive.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Simple, low overhead
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    Convoy effect - long job
                                                    blocks all
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiFilter />
                                            </span>
                                            <div className="aTitle">SJF</div>
                                        </div>
                                        <p className="aText">
                                            Shortest Job First - pick the
                                            smallest CPU burst next. Non
                                            preemptive.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Great average waiting time
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    Needs burst estimate, can
                                                    starve long jobs
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiZap />
                                            </span>
                                            <div className="aTitle">SRTF</div>
                                        </div>
                                        <p className="aText">
                                            Shortest Remaining Time First -
                                            preemptive version of SJF. If a
                                            shorter job arrives, it interrupts.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Very good average waiting
                                                    time
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    More context switches,
                                                    starvation possible
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiRepeat />
                                            </span>
                                            <div className="aTitle">
                                                Round Robin
                                            </div>
                                        </div>
                                        <p className="aText">
                                            Give each process a time quantum
                                            (time slice). Preemptive. Cycles
                                            through ready queue.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Fair, good for interactive
                                                    systems
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    Bad quantum choice hurts
                                                    performance
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiTrendingUp />
                                            </span>
                                            <div className="aTitle">
                                                Priority
                                            </div>
                                        </div>
                                        <p className="aText">
                                            Higher priority runs first. Can be
                                            preemptive or non preemptive.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Supports real time
                                                    importance
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    Starvation risk for low
                                                    priority
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="algoCard">
                                        <div className="aTop">
                                            <span className="aIcon">
                                                <FiLayers />
                                            </span>
                                            <div className="aTitle">
                                                MLQ and MLFQ
                                            </div>
                                        </div>
                                        <p className="aText">
                                            Multiple queues. MLQ (Multilevel
                                            Queue) has fixed queues. MLFQ
                                            (Multilevel Feedback Queue) moves
                                            processes between queues.
                                        </p>
                                        <div className="aProsCons">
                                            <div className="pc">
                                                <div className="pcT">Pros</div>
                                                <div className="pcB">
                                                    Balances interactive and
                                                    batch workloads
                                                </div>
                                            </div>
                                            <div className="pc">
                                                <div className="pcT">Cons</div>
                                                <div className="pcB">
                                                    Complex tuning, tricky
                                                    fairness rules
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="finalNote">
                                    Interview tip - Always mention whether the
                                    algorithm is preemptive or non preemptive,
                                    and what it optimizes.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Metrics you must know</h3>
                                <p className="p">
                                    These metrics compare scheduling algorithms.
                                    They show user experience and system
                                    efficiency.
                                </p>

                                <div className="rows">
                                    <div className="row">
                                        <span className="k">
                                            Turnaround time
                                        </span>
                                        <span className="v">
                                            Total time from arrival to
                                            completion
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Waiting time</span>
                                        <span className="v">
                                            Time spent waiting in ready queue
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Response time</span>
                                        <span className="v">
                                            Time until first CPU response after
                                            arrival
                                        </span>
                                    </div>
                                    <div className="row">
                                        <span className="k">Throughput</span>
                                        <span className="v">
                                            Number of processes completed per
                                            unit time
                                        </span>
                                    </div>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiAlertCircle />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">Important</div>
                                        <div className="cSub">
                                            Best algorithm depends on goal.
                                            Interactive systems care about
                                            response time. Batch systems care
                                            about throughput.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">
                                    Round Robin example (easy)
                                </h3>
                                <p className="p">
                                    Suppose time quantum is 2 units. Three
                                    processes arrive at time 0.
                                </p>

                                <div className="exampleBlock">
                                    <div className="exTitle">Input</div>
                                    <pre className="code">{`P1 burst = 5
P2 burst = 4
P3 burst = 2
Quantum = 2`}</pre>
                                </div>

                                <div className="exampleBlock">
                                    <div className="exTitle">
                                        Schedule timeline
                                    </div>
                                    <pre className="code">{`0-2  : P1 (remaining 3)
2-4  : P2 (remaining 2)
4-6  : P3 (remaining 0) done
6-8  : P1 (remaining 1)
8-10 : P2 (remaining 0) done
10-11: P1 (remaining 0) done`}</pre>
                                </div>

                                <div className="callout">
                                    <span className="cIcon">
                                        <FiClock />
                                    </span>
                                    <div className="cText">
                                        <div className="cTitle">
                                            What to notice
                                        </div>
                                        <div className="cSub">
                                            Smaller quantum improves
                                            responsiveness but increases context
                                            switching. Bigger quantum reduces
                                            switching but feels closer to FCFS.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Starvation and aging</h3>
                                <p className="p">
                                    <strong>Starvation</strong> means a process
                                    keeps waiting because other processes always
                                    get CPU. Priority scheduling and SJF style
                                    algorithms can cause starvation.
                                </p>

                                <div className="miniGrid">
                                    <div className="miniCard">
                                        <div className="miniTitle">Aging</div>
                                        <p className="miniText">
                                            Aging slowly increases priority of
                                            waiting processes over time, so they
                                            eventually run.
                                        </p>
                                    </div>
                                    <div className="miniCard">
                                        <div className="miniTitle">
                                            Simple rule
                                        </div>
                                        <p className="miniText">
                                            The longer you wait, the more
                                            priority you earn.
                                        </p>
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
                                        <span className="mono">OS</span> -
                                        Operating System
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">FCFS</span> -
                                        First Come First Serve
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SJF</span> -
                                        Shortest Job First
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">SRTF</span> -
                                        Shortest Remaining Time First
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">RR</span> - Round
                                        Robin
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MLQ</span> -
                                        Multilevel Queue
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">MLFQ</span> -
                                        Multilevel Feedback Queue
                                    </div>
                                    <div className="abbr">
                                        <span className="mono">I O</span> -
                                        Input Output
                                    </div>
                                </div>

                                <div className="finalNote">
                                    If you can explain Round Robin quantum
                                    tradeoff and starvation with aging, you are
                                    already ahead of many candidates.
                                </div>
                            </section>

                            <section className="sec">
                                <h3 className="h3">Mini practice</h3>
                                <div className="practice">
                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            Why can FCFS cause convoy effect?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            A long CPU heavy job at the front
                                            blocks many short jobs behind it, so
                                            everyone waits and the system feels
                                            slow.
                                        </span>
                                    </div>

                                    <div className="pRow">
                                        <span className="label">Q</span>
                                        <span className="value">
                                            What happens if Round Robin quantum
                                            is too small?
                                        </span>
                                    </div>
                                    <div className="pRow">
                                        <span className="label">A</span>
                                        <span className="value">
                                            Too many context switches, more
                                            overhead, lower throughput.
                                        </span>
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

export default SchedulingAlgorithms;
