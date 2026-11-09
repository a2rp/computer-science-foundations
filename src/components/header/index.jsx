// src/components/header/index.jsx
import React, { useEffect, useState } from "react";
import { Styled } from "./styled";
import { FiMoon, FiSun } from "react-icons/fi";

const THEME_LS_KEY = "computer-science-foundations-theme";
const logo = `${import.meta.env.BASE_URL}logo.png`;

const getInitialTheme = () => {
    try {
        const storedTheme = window.localStorage.getItem(THEME_LS_KEY);
        if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    } catch {
        // Storage can be unavailable in private or restricted browser contexts.
    }

    return window.matchMedia?.("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
};

const Header = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);


    // Apply theme + persist
    useEffect(() => {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }

        try {
            window.localStorage.setItem(THEME_LS_KEY, theme);
        } catch {
            // Theme switching remains available when storage is blocked.
        }
    }, [theme]);

    const nextTheme = theme === "light" ? "dark" : "light";

    const handleToggle = () => {
        setTheme(nextTheme);
    };

    return (
        <Styled.Wrapper>
            <Styled.Main>
                <div className="leftSide">
                    <div className="logoNameWrapper">
                        <div className="logoWrapper">
                            {!logoLoaded && <div className="logoSkeleton" />}
                            <img
                                src={logo}
                                alt="computer-science-foundations"
                                onLoad={() => setLogoLoaded(true)}
                                style={{ opacity: logoLoaded ? 1 : 0 }}
                            />
                        </div>

                        <div className="nameWrapper">
                            <div className="title">
                                computer-science-foundations
                            </div>
                            <div className="subTitle">
                                At-a-glance systems revision - OS, networks,
                                DBMS, compiler basics
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <button
                        type="button"
                        className="themeToggleBtn"
                        onClick={handleToggle}
                        aria-label={`Switch to ${nextTheme} theme`}
                        title={`Switch to ${nextTheme}`}
                    >
                        <span className="icon">
                            {theme === "light" ? <FiMoon /> : <FiSun />}
                        </span>
                        <span className="label">
                            {theme === "light" ? "Light" : "Dark"}
                        </span>
                    </button>
                </div>
            </Styled.Main>
        </Styled.Wrapper>
    );
};

export default Header;
