// src/topics/acid/styled.js
import styled from "styled-components";

const TRANSITION_MS = 220;

export const Styled = {
    Wrapper: styled.section`
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 22px 16px 10px;

        .title {
            font-size: 22px;
            font-weight: 950;
            color: var(--color-text-primary);
        }

        .sub {
            margin-top: 8px;
            color: var(--color-text-secondary);
            line-height: 1.7;
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
            background: var(--color-surface-2);
            font-size: 12px;
            font-weight: 800;
        }

        .accordion {
            border: 1px solid var(--color-border);
            border-radius: 16px;
            margin-top: 12px;
            overflow: hidden;
        }

        .accBtn {
            width: 100%;
            padding: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            border: none;
            cursor: pointer;
        }

        .panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows ${TRANSITION_MS}ms ease;
        }

        .panel.open {
            grid-template-rows: 1fr;
        }

        .panelInner {
            overflow: hidden;
            padding: 14px;
        }

        .sec {
            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 12px;
            background: var(--color-surface-2);
        }

        .h3 {
            font-weight: 900;
        }

        .p {
            margin-top: 8px;
            line-height: 1.6;
        }

        .miniGrid {
            margin-top: 12px;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, 1fr);
        }

        .miniCard {
            border: 1px solid var(--color-border);
            padding: 10px;
            border-radius: 12px;
        }

        .exampleBlock {
            margin-top: 12px;
            border: 1px solid var(--color-border);
            border-radius: 12px;
            overflow: hidden;
        }

        .code {
            padding: 10px;
            font-size: 12px;
            font-family: monospace;
            white-space: pre-wrap;
        }

        .list {
            margin-top: 10px;
            display: grid;
            gap: 6px;
        }

        .abbrGrid {
            display: grid;
            gap: 8px;
            margin-top: 10px;
        }

        .finalNote {
            margin-top: 10px;
            font-weight: 700;
        }
    `,
};
