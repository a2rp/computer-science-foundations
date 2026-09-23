import styled from "styled-components";

export const Styled = {
    Wrapper: styled.footer`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 0 4px;
        border-top: 1px solid var(--color-border);
        font-size: 12px;
        color: var(--color-text-muted);

        .copyright {
            line-height: 1.6;
        }

        .copyright a {
            color: var(--color-text-secondary);
            font-weight: 600;
        }

        .copyright a:hover {
            color: var(--color-text-primary);
        }

        .links {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 7px;
        }

        .links a {
            display: inline-grid;
            place-items: center;
            width: 30px;
            height: 30px;
            border: 1px solid var(--color-border);
            border-radius: 9px;
            color: var(--color-text-secondary);
            transition:
                color 160ms ease,
                border-color 160ms ease,
                box-shadow 160ms ease;
        }

        .links a:hover {
            color: var(--color-primary);
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 14%, transparent);
        }

        .links svg {
            width: 15px;
            height: 15px;
        }

        @media (width < 600px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;

            .links {
                justify-content: flex-start;
            }
        }
    `,
};
