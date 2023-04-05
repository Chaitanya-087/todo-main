import React from "react";
import Sun from '../assets/images/icon-sun.svg'
import Moon from '../assets/images/icon-moon.svg'

const TodoHeader = ({isDarkMode,toggleTheme}) => {
  return (
    <header className='header'>
      <h1 className='header_title'>TODO</h1>
      <button
        className='header_theme-btn'
        aria-label='toggle dark mode'
        onClick={toggleTheme}>
        {isDarkMode ? (
          <img src={Sun} alt='light-icon' />
        ) : (
          <img src={Moon} alt='dark-icon' />
        )}
      </button>
    </header>
  );
};

export default TodoHeader;
