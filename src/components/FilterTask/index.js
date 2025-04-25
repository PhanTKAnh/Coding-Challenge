import { useState } from "react";

function FilterTask({ onStatusChange }){
  const [status, setStatus] = useState(null);  

  const handleClick = (status) => {
    setStatus(status);
    if (onStatusChange) {
      onStatusChange(status);  
    }
  };

  return (
    <div className="search-filter">
      <div className="search-filter__header">Search Filter</div>
      <div className="search-filter__body">
        <div className="search-filter__row">
          <div className="search-filter__buttons">
            <button
              className={`search-filter__button ${status === null ? 'complete' : ''}`}
              onClick={() => handleClick(null)}  
            >
              All Tasks
            </button>
            <button
              className={`search-filter__button ${status === "complete" ? 'complete' : ''}`}
              onClick={() => handleClick("complete")}  
            >
              Completed Tasks
            </button>
            <button
              className={`search-filter__button ${status === "incomplete" ? 'complete' : ''}`}
              onClick={() => handleClick("incomplete")}  
            >
              Pending Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTask;
