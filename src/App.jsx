import React, {useState} from "react";
import TodoHeader from "./components/TodoHeader";
import TodoBody from "./components/TodoBody";
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className='main-section' data-dark-theme={isDarkMode}>
      <div className='container'>
        <TodoHeader isDarkMode={isDarkMode}  toggleTheme = {toggleTheme}/>
        <TodoBody/>
        <span className='help_text'>Drag and drop to reorder list</span>
      </div>
    </main>
  );
};

export default App;
