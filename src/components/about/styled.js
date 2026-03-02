// src/components/about/styled.js
import styled from "styled-components";

export const Styled = {
    Wrapper: styled.section`
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 18px 16px 10px;

        .frame {
            border: 1px solid var(--color-border);
            border-radius: 22px;
            overflow: hidden;

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
            );

            box-shadow: 0 22px 55px var(--color-shadow);
            position: relative;
        }

        .frame::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;

            background-image:
                radial-gradient(
                    1100px 420px at 12% 0%,
                    color-mix(in srgb, var(--color-primary) 10%, transparent),
                    transparent 62%
                ),
                radial-gradient(
                    900px 360px at 86% 14%,
                    color-mix(in srgb, var(--color-accent) 9%, transparent),
                    transparent 64%
                ),
                repeating-linear-gradient(
                    135deg,
                    color-mix(in srgb, var(--color-border) 26%, transparent) 0px,
                    color-mix(in srgb, var(--color-border) 26%, transparent) 1px,
                    transparent 1px,
                    transparent 18px
                );
            opacity: 0.75;

            mask-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.92),
                rgba(0, 0, 0, 0.15)
            );
        }

        .top {
            position: relative;
            z-index: 1;
            padding: 16px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
        }

        .left {
            min-width: 0;
            max-width: 980px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;

            padding: 8px 12px;
            border-radius: 999px;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 70%,
                transparent
            );

            color: var(--color-text-secondary);
            font-size: 12.5px;
            font-weight: 950;
            letter-spacing: 0.2px;
            text-transform: lowercase;

            svg {
                width: 14px;
                height: 14px;
                color: color-mix(
                    in srgb,
                    var(--color-primary) 84%,
                    var(--color-text-primary)
                );
            }
        }

        .title {
            margin-top: 10px;
            font-size: 22px;
            font-weight: 980;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .sub {
            margin-top: 8px;
            color: var(--color-text-secondary);
            font-weight: 650;
            line-height: 1.7;
        }

        .chips {
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .chip {
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
                    var(--color-accent) 72%,
                    var(--color-text-primary)
                );
            }
        }

        .toggle {
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 14px;

            border: 1px solid var(--color-border);
            background: linear-gradient(
                180deg,
                var(--color-surface),
                var(--color-surface-2)
            );

            color: var(--color-text-primary);
            box-shadow: 0 12px 26px var(--color-shadow);

            .tText {
                font-size: 13px;
                font-weight: 900;
                color: var(--color-text-secondary);
            }

            .tIcon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: transform 160ms ease;
                color: color-mix(
                    in srgb,
                    var(--color-primary) 84%,
                    var(--color-text-primary)
                );
            }

            .tIcon svg {
                width: 18px;
                height: 18px;
            }

            .tIcon.open {
                transform: rotate(180deg);
            }

            &:hover {
                border-color: var(--color-border-light);
            }

            &:active {
                transform: translateY(1px);
            }
        }

        .panel {
            position: relative;
            z-index: 1;

            display: grid;
            grid-template-rows: 0fr;
            overflow: hidden;
            border-top: 1px solid var(--color-border);
            transition: grid-template-rows 220ms ease;
        }

        .panel.open {
            grid-template-rows: 1fr;
        }

        .panelInner {
            min-height: 0;
            padding: 14px 16px 16px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;

            @media (width < 980px) {
                grid-template-columns: 1fr;
            }
        }

        .card {
            border: 1px solid var(--color-border);
            border-radius: 18px;
            padding: 14px;

            background: color-mix(in srgb, var(--color-surface-2) 55%, #000);
            box-shadow: 0 18px 40px var(--color-shadow);
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: radial-gradient(
                800px 250px at 12% 0%,
                color-mix(in srgb, var(--color-primary) 9%, transparent),
                transparent 60%
            );
            opacity: 0.9;
        }

        .card > * {
            position: relative;
            z-index: 1;
        }

        .card.wide {
            grid-column: 1 / -1;
        }

        .cTop {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cIcon {
            width: 38px;
            height: 38px;
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface) 60%,
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
            font-size: 14px;
            font-weight: 950;
            letter-spacing: 0.2px;
            color: var(--color-text-primary);
        }

        .list {
            margin-top: 12px;
            display: grid;
            gap: 10px;
            color: var(--color-text-secondary);
            font-weight: 650;
            line-height: 1.65;
        }

        .list li {
            padding-left: 12px;
            position: relative;
        }

        .list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: color-mix(
                in srgb,
                var(--color-accent) 78%,
                transparent
            );
        }

        .rows {
            margin-top: 12px;
            display: grid;
            gap: 10px;
        }

        .row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;

            padding: 12px;
            border-radius: 16px;
            border: 1px solid var(--color-border);

            background: linear-gradient(
                180deg,
                color-mix(in srgb, var(--color-surface) 92%, transparent),
                color-mix(in srgb, var(--color-surface-2) 86%, transparent)
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
            font-weight: 700;
            line-height: 1.6;
        }

        .steps {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;

            @media (width < 820px) {
                grid-template-columns: 1fr;
            }
        }

        .step {
            display: flex;
            align-items: center;
            gap: 10px;

            padding: 12px;
            border-radius: 16px;
            border: 1px solid var(--color-border);

            background: color-mix(in srgb, var(--color-surface) 70%, #000);
        }

        .num {
            width: 28px;
            height: 28px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 70%,
                transparent
            );
            color: color-mix(
                in srgb,
                var(--color-primary) 84%,
                var(--color-text-primary)
            );
            font-weight: 950;
        }

        .txt {
            color: var(--color-text-secondary);
            font-weight: 750;
            line-height: 1.55;
        }

        .note {
            margin-top: 12px;
            padding: 12px;
            border-radius: 16px;
            border: 1px solid var(--color-border);

            background: color-mix(in srgb, var(--color-surface-2) 62%, #000);
            color: var(--color-text-secondary);
            font-weight: 850;
            line-height: 1.65;
        }

        .foot {
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;

            @media (width < 880px) {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        .footLeft {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .pill {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;

            border: 1px solid var(--color-border);
            background: color-mix(
                in srgb,
                var(--color-surface-2) 68%,
                transparent
            );

            color: var(--color-text-secondary);
            font-size: 12.5px;
            font-weight: 900;
        }

        .hint {
            color: var(--color-text-muted);
            font-weight: 700;
            font-size: 12.5px;
        }
    `,
};
