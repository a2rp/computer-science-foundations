// src/topics/loadBalancing/styled.js
import styled from "styled-components";

const TRANSITION_MS = 220;

export const Styled = {
    Wrapper: styled.section`
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 22px 16px 10px;

        .top {
            padding: 10px 2px 12px;
        }

        .title {
            font-size: 22px;
            font-weight: 950;
            color: var(--color-text-primary);
        }

        .sub {
            margin-top: 8px;
            max-width: 1050px;
            color: var(--color-text-secondary);
            line-height: 1.7;
            font-weight: 650;
        }

        .pillRow {
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 72%,
                transparent
            );
            color: var(--color-text-secondary);
            font-size: 12.5px;
            font-weight: 900;
        }

        .accordion {
            border: 1px solid var(--color-border);
            border-radius: 18px;
            overflow: hidden;
            background: var(--color-surface);
            box-shadow: 0 18px 42px var(--color-shadow);
        }

        .accBtn {
            width: 100%;
            padding: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 0;
            background: transparent;
            text-align: left;
        }

        .accLeft {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .accIcon {
            height: 40px;
            width: 40px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--color-border);
            background: var(--color-surface-2);
        }

        .accTitle {
            font-weight: 900;
        }

        .accHint {
            font-size: 12px;
            color: var(--color-text-muted);
        }

        .chev {
            transition: transform 160ms ease;
        }

        .chev.open {
            transform: rotate(180deg);
        }

        .panel {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            transition: grid-template-rows ${TRANSITION_MS}ms ease;
        }

        .panel.open {
            grid-template-rows: 1fr;
        }

        .panelInner {
            padding: 14px;
        }

        .sec {
            margin-bottom: 14px;
        }

        .h3 {
            font-weight: 900;
            margin-bottom: 6px;
        }

        .p {
            color: var(--color-text-secondary);
            line-height: 1.6;
        }

        .miniGrid,
        .twoCol,
        .qaGrid {
            display: grid;
            gap: 10px;
            margin-top: 10px;
        }

        .miniGrid {
            grid-template-columns: repeat(2, 1fr);
        }

        .twoCol {
            grid-template-columns: repeat(2, 1fr);
        }

        .qaGrid {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 900px) {
            .miniGrid,
            .twoCol,
            .qaGrid {
                grid-template-columns: 1fr;
            }
        }

        .miniCard,
        .box,
        .qa {
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 12px;
            background: var(--color-surface-2);
        }

        .miniTitle,
        .boxTitle,
        .q {
            font-weight: 900;
        }

        .miniText,
        .boxText,
        .a {
            color: var(--color-text-secondary);
            margin-top: 6px;
        }

        .exampleBlock {
            border: 1px solid var(--color-code-border);
            border-radius: 12px;
            margin-top: 10px;
            overflow: hidden;
        }

        .exTitle {
            padding: 8px 12px;
            background: var(--color-surface-2);
            font-weight: 900;
        }

        .code {
            padding: 12px;
            font-family: monospace;
            font-size: 12.5px;
            background: var(--color-code-bg);
            color: var(--color-text-secondary);
        }

        .callout {
            display: flex;
            gap: 10px;
            margin-top: 10px;
            padding: 12px;
            border: 1px solid var(--color-border);
            border-radius: 12px;
            background: var(--color-surface-2);
        }

        .cTitle {
            font-weight: 900;
        }

        .cSub {
            color: var(--color-text-secondary);
        }

        .abbrGrid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 10px;
        }

        @media (max-width: 700px) {
            .abbrGrid {
                grid-template-columns: 1fr;
            }
        }

        .abbr {
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 12px;
            background: var(--color-surface-2);
            font-weight: 700;
        }

        .mono {
            font-family: monospace;
            font-weight: 900;
        }

        .list {
            margin-top: 10px;
            padding-left: 16px;
            list-style: disc;
            color: var(--color-text-secondary);
        }
    `,
};
