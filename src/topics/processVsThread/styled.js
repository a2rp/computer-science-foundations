// src/topics/processVsThread/styled.js
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
            letter-spacing: 0.2px;
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

            svg {
                width: 14px;
                height: 14px;
                color: color-mix(
                    in srgb,
                    var(--color-primary) 82%,
                    var(--color-text-primary)
                );
            }
        }

        .accordion {
            border: 1px solid var(--color-border);
            border-radius: 18px;
            overflow: hidden;

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );

            box-shadow: 0 18px 42px var(--color-shadow);
        }

        .accBtn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 14px;

            border: 0;
            background: transparent;
            color: var(--color-text-primary);
            text-align: left;

            position: relative;
            overflow: hidden;

            &::before {
                content: "";
                position: absolute;
                inset: 0;
                pointer-events: none;

                background-image:
                    radial-gradient(
                        720px 260px at 18% 10%,
                        color-mix(
                            in srgb,
                            var(--color-primary) 10%,
                            transparent
                        ),
                        transparent 60%
                    ),
                    repeating-linear-gradient(
                        135deg,
                        color-mix(in srgb, var(--color-border) 26%, transparent)
                            0px,
                        color-mix(in srgb, var(--color-border) 26%, transparent)
                            1px,
                        transparent 1px,
                        transparent 18px
                    );
                opacity: 0.78;

                mask-image: linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0.92),
                    rgba(0, 0, 0, 0.15)
                );
            }

            &:hover {
                background: color-mix(
                    in srgb,
                    var(--color-surface-2) 24%,
                    transparent
                );
            }

            &:active {
                transform: translateY(1px);
            }
        }

        .accLeft {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 0;
            position: relative;
            z-index: 1;
        }

        .accIcon {
            height: 40px;
            width: 40px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 78%,
                transparent
            );
            box-shadow: 0 12px 26px var(--color-shadow);

            svg {
                width: 18px;
                height: 18px;
                color: color-mix(
                    in srgb,
                    var(--color-primary) 84%,
                    var(--color-text-primary)
                );
            }
        }

        .accText {
            min-width: 0;
        }

        .accTitle {
            font-size: 14px;
            font-weight: 950;
            letter-spacing: 0.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .accHint {
            margin-top: 3px;
            font-size: 12.5px;
            font-weight: 750;
            color: var(--color-text-muted);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .chev {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            width: 38px;
            height: 38px;
            border-radius: 14px;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 74%,
                transparent
            );

            color: var(--color-text-secondary);
            box-shadow: 0 12px 26px var(--color-shadow);

            transition: transform 160ms ease;

            svg {
                width: 18px;
                height: 18px;
            }
        }

        .chev.open {
            transform: rotate(180deg);
        }

        .panel {
            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            border-top: 1px solid var(--color-border);
            transition: grid-template-rows ${TRANSITION_MS}ms ease;
        }

        .panel.open {
            grid-template-rows: 1fr;
        }

        .panelInner {
            min-height: 0;
            padding: 14px;
        }

        .sec {
            border: 1px solid var(--color-border);
            border-radius: 16px;
            padding: 14px;
            background: color-mix(in srgb, var(--color-surface-2) 55%, #000);
            box-shadow: 0 18px 40px var(--color-shadow);
            margin-bottom: 12px;
            overflow: hidden;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                inset: 0;
                pointer-events: none;
                background-image: radial-gradient(
                    820px 260px at 10% 0%,
                    color-mix(in srgb, var(--color-primary) 9%, transparent),
                    transparent 62%
                );
                opacity: 0.9;
            }

            > * {
                position: relative;
                z-index: 1;
            }
        }

        .h3 {
            font-size: 15px;
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .p {
            margin-top: 8px;
            color: var(--color-text-secondary);
            line-height: 1.7;
            font-weight: 650;
        }

        .miniGrid {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;

            @media (width < 860px) {
                grid-template-columns: 1fr;
            }
        }

        .miniCard {
            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;
            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );
        }

        .miniTitle {
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .miniText {
            margin-top: 6px;
            color: var(--color-text-secondary);
            line-height: 1.65;
            font-weight: 650;
        }

        .compare {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;

            @media (width < 980px) {
                grid-template-columns: 1fr;
            }
        }

        .col {
            border: 1px solid var(--color-border);
            border-radius: 16px;
            padding: 12px;

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );
            overflow: hidden;
            position: relative;
        }

        .col::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: radial-gradient(
                700px 240px at 10% 0%,
                color-mix(in srgb, var(--color-primary) 8%, transparent),
                transparent 62%
            );
            opacity: 0.9;
        }

        .col > * {
            position: relative;
            z-index: 1;
        }

        .colHead {
            display: flex;
            align-items: center;
            gap: 10px;

            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);

            svg {
                width: 16px;
                height: 16px;
                color: color-mix(
                    in srgb,
                    var(--color-accent) 70%,
                    var(--color-text-primary)
                );
            }
        }

        .rows {
            margin-top: 10px;
            display: grid;
            gap: 10px;
        }

        .row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;

            padding: 12px;
            border-radius: 14px;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 62%,
                transparent
            );

            @media (width < 720px) {
                flex-direction: column;
            }
        }

        .k {
            font-weight: 950;
            color: var(--color-text-primary);
            white-space: nowrap;
        }

        .v {
            color: var(--color-text-secondary);
            font-weight: 750;
            line-height: 1.6;
        }

        .callout {
            margin-top: 12px;
            display: flex;
            align-items: flex-start;
            gap: 10px;

            padding: 12px;
            border-radius: 16px;
            border: 1px solid var(--color-border);
            background: color-mix(in srgb, var(--color-surface) 72%, #000);
            box-shadow: 0 18px 40px var(--color-shadow);
        }

        .callout.warn {
            background: color-mix(in srgb, var(--color-surface) 72%, #000);
            border-color: color-mix(
                in srgb,
                var(--color-warning) 40%,
                var(--color-border)
            );
        }

        .cIcon {
            width: 36px;
            height: 36px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 70%,
                transparent
            );

            svg {
                width: 18px;
                height: 18px;
                color: color-mix(
                    in srgb,
                    var(--color-primary) 84%,
                    var(--color-text-primary)
                );
            }
        }

        .cTitle {
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .cSub {
            margin-top: 4px;
            color: var(--color-text-secondary);
            font-weight: 650;
            line-height: 1.65;
        }

        .exampleBlock {
            margin-top: 12px;
            border: 1px solid var(--color-border);
            border-radius: 14px;
            overflow: hidden;
            background: var(--color-code-bg);
        }

        .exTitle {
            padding: 10px 12px;
            border-bottom: 1px solid var(--color-code-border);
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }

        .code {
            padding: 12px;
            margin: 0;
            font-family:
                ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
            font-size: 12.5px;
            line-height: 1.65;
            color: var(--color-text-secondary);
            white-space: pre-wrap;
        }

        .note {
            margin-top: 12px;
            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;

            background: color-mix(in srgb, var(--color-surface-2) 62%, #000);
            color: var(--color-text-secondary);
            font-weight: 850;
            line-height: 1.65;
            box-shadow: 0 18px 40px var(--color-shadow);
        }

        .qaGrid {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;

            @media (width < 980px) {
                grid-template-columns: 1fr;
            }
        }

        .qa {
            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;
            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );
        }

        .q {
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .a {
            margin-top: 6px;
            color: var(--color-text-secondary);
            line-height: 1.65;
            font-weight: 650;
        }

        .decision {
            margin-top: 12px;
            display: grid;
            gap: 10px;
        }

        .dRow {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 10px;

            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );

            @media (width < 720px) {
                flex-direction: column;
            }
        }

        .label {
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
            white-space: nowrap;
        }

        .value {
            color: var(--color-text-secondary);
            font-weight: 750;
            line-height: 1.6;
        }

        .abbrGrid {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;

            @media (width < 820px) {
                grid-template-columns: 1fr;
            }
        }

        .abbr {
            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;

            background: color-mix(
                in srgb,
                var(--color-surface-2) 60%,
                transparent
            );

            color: var(--color-text-secondary);
            font-weight: 800;
            line-height: 1.6;
        }

        .practice {
            margin-top: 10px;
            display: grid;
            gap: 8px;
        }

        .pRow {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 10px;

            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );

            @media (width < 720px) {
                flex-direction: column;
            }
        }

        .mono {
            font-family:
                ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
            font-weight: 900;
            letter-spacing: 0.1px;
            color: color-mix(
                in srgb,
                var(--color-primary) 76%,
                var(--color-text-primary)
            );
        }

        .lines {
            margin-top: 12px;
            display: grid;
            gap: 10px;
        }

        .line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            border: 1px solid var(--color-border);
            border-radius: 14px;
            padding: 12px;

            background: color-mix(in srgb, var(--color-surface-2) 62%, #000);

            color: var(--color-text-secondary);
            font-weight: 800;
            line-height: 1.55;
        }

        .ok {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: color-mix(
                in srgb,
                var(--color-success) 70%,
                var(--color-text-primary)
            );
        }

        .copyBtn {
            width: 36px;
            height: 36px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid var(--color-border);
            background: linear-gradient(
                180deg,
                var(--color-surface),
                var(--color-surface-2)
            );

            color: var(--color-text-primary);
            box-shadow: 0 10px 22px var(--color-shadow);

            svg {
                width: 16px;
                height: 16px;
            }

            &:hover {
                border-color: var(--color-border-light);
            }

            &:active {
                transform: translateY(1px);
            }

            &:focus-visible {
                outline: 2px solid var(--color-primary);
                outline-offset: 3px;
                box-shadow:
                    0 0 0 4px
                        color-mix(
                            in srgb,
                            var(--color-primary) 18%,
                            transparent
                        ),
                    0 10px 22px var(--color-shadow);
            }
        }
    `,
};
