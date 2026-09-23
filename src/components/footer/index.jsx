import React from "react";
import {
    FiCoffee,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiStar,
} from "react-icons/fi";
import { FaCodepen, FaYoutube } from "react-icons/fa";
import { Styled } from "./styled";

const links = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: FiLinkedin,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        icon: FiFacebook,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        icon: FaYoutube,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: FiHeart,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/a2rp",
        icon: FiCoffee,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/a2rp",
        icon: FiStar,
    },
];

const Footer = () => {
    return (
        <Styled.Wrapper>
            <div className="copyright">
                &copy; {new Date().getFullYear()} All rights reserved. By{" "}
                <a
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ashish Ranjan
                </a>
            </div>

            <nav className="links" aria-label="Social and support links">
                {links.map(({ label, href, icon: Icon }) => (
                    <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        aria-label={label}
                        title={label}
                    >
                        <Icon aria-hidden="true" />
                    </a>
                ))}
            </nav>
        </Styled.Wrapper>
    );
};

export default Footer;
