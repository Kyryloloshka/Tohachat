import  { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

function ThemeSwitch() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
    );
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    function onWindowMatch() {
        if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark")
        }
    }
    onWindowMatch()
    useEffect(() => {
        switch (theme) {
            case "dark":
                element.classList.add("dark");
                localStorage.setItem("theme", "dark");
                break;
            case "light":
                element.classList.remove("dark");
                localStorage.setItem("theme","light")
                break;
            default:
                onWindowMatch();
                localStorage.removeItem("theme")

        }
    }, [theme])
    const [enabled, setEnabled] = useState(theme !== "dark");

    const handleThemeChange = (enabled: boolean) => {
        
        setTheme(enabled ? 'light' : 'dark');
        console.log("theme", theme);
        
        setEnabled(enabled);
    };

    return (
        <Switch
        checked={enabled}
        onChange={handleThemeChange}
        className={`h-12 w-12 relative cursor-pointer transition-colors duration-200 ease-in-out`}
        >
        <div
            className="w-full h-full rounded-lg p-2 group hover:bg-primary-500 dark:hover:bg-light-1 transition-all">
            <svg className="fill-primary-500 group-hover:fill-light-1 block dark:hidden transition-all" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg className="fill-light-1 group-hover:fill-primary-500 transition-all hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"></path>
            </svg>
        </div>
        </Switch>
    );
}

export default ThemeSwitch;
