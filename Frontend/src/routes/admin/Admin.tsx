import { ThemeContext } from '../../context/ThemeContext';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DARK_THEME, LIGHT_THEME } from '../../constants/themeConstants';
import MoonIcon from '../../assets/icons/moon.svg';
import SunIcon from '../../assets/icons/sun.svg';

const Admin = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(theme);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Outlet />
      <button
        type="button" 
        className="theme-toggle-btn"
        onClick={toggleTheme}
      >
        <img
          src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          alt=""
          className="theme-icon"
        />
      </button>
    </>
  );
};
export default Admin;