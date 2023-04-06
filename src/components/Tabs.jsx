import React from "react";

const Tabs = ({activeTab,setActiveTab,isMobile}) => {

  return (
    <ul
      className={`todo_tabs ${isMobile ? 'md' : ''}`}
      aria-label='Select a filter option'
      data-active={activeTab}>
      <li>
        <button
          className='tab_btn'
          data-value='all'
          onClick={() => setActiveTab("all")}>
          All
        </button>
      </li>
      <li>
        <button
          className='tab_btn'
          data-value='active'
          onClick={() => setActiveTab("active")}>
          Active
        </button>
      </li>
      <li>
        <button
          className='tab_btn'
          data-value='completed'
          onClick={() => setActiveTab("completed")}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
