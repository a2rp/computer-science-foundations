import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`height: 100vh; overflow: hidden; display: flex; flex-direction: column;`,
    Header: styled.header`height: 60px; flex-shrink: 0;`,
    Main: styled.main`
        flex: 1; overflow-y: auto; position: relative;
        .workspaceLayout { min-height: 100%; max-width: 1440px; margin: auto; display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 28px; padding: 18px 22px 42px; }
        .sideMenu { position: sticky; top: 18px; align-self: start; height: calc(100vh - 60px - 36px); max-height: calc(100vh - 60px - 36px); box-sizing: border-box; overflow-y: auto; padding: 16px 10px; border: 1px solid var(--color-border); border-radius: 16px; background: var(--color-surface); }
        .menuLabel { margin: 0 10px 12px; color: var(--color-text-muted); font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .sideMenu nav { display: grid; gap: 5px; }
        .sideMenu button { width: 100%; padding: 10px 12px; border: 1px solid transparent; border-radius: 10px; background: transparent; color: var(--color-text-secondary); text-align: left; cursor: pointer; font: inherit; }
        .sideMenu button:hover, .sideMenu button.active { background: var(--color-primary); border-color: var(--color-primary); color: #07111f; }
        .contentWrapper { min-width: 0; padding: 4px 0; }
        .contentWrapper .topicBody { max-height: 12000px; }
        .scrollTopButton { position: fixed; right: 24px; bottom: 24px; z-index: 10; width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid var(--color-border); border-radius: 50%; background: var(--color-surface); color: var(--color-text-primary); cursor: pointer; box-shadow: 0 8px 20px var(--color-shadow); }
        .scrollTopButton:hover { background: var(--color-primary); color: #07111f; }
        .footerWrapper { flex-shrink: 0; }
        @media (max-width: 820px) { .workspaceLayout { grid-template-columns: 1fr; padding: 14px; } .sideMenu { position: static; height: auto; max-height: none; } .sideMenu nav { grid-template-columns: repeat(2, minmax(0, 1fr)); } .scrollTopButton { right: 16px; bottom: 16px; } }
    `,
};
