import { useEffect, useState } from "react";
import styles from './ThemeToggle.module.scss';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
    initialTheme?: Theme,
}

const ThemeToggle = ({ initialTheme = 'dark' }: ThemeToggleProps) => {
    
    const [ theme, setTheme ] = useState<Theme>(initialTheme);

    useEffect(() => {
        if(!document.documentElement.getAttribute('data-theme')){
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const handleToggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button className={styles.themeToggleButton} onClick={handleToggleTheme}>
             {theme === 'dark' ? '☀️' : '🌙' }
        </button>
    );
};

export default ThemeToggle;