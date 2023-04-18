import React from 'react';

const HeaderContainer = ({ onHeaderFilterClick, onTimeFilterClick, activeHeaderFilter, activeTimeFilter }) => {
    return (
        <div className="header-container">
            <div className="left-group">
                <h2 onClick={() => onHeaderFilterClick("top")} className={activeHeaderFilter === "top" ? "active-filter" : ""}>top</h2>
                <h2 onClick={() => onHeaderFilterClick("trending")} className={activeHeaderFilter === "trending" ? "active-filter" : ""}>trending</h2>
                <h2 onClick={() => onHeaderFilterClick("new")} className={activeHeaderFilter === "new" ? "active-filter" : ""}>new</h2>
            </div>
            <div className="right-group">
                <h3 id="3" onClick={() => onTimeFilterClick(3)} className={activeTimeFilter === 3 ? "active-filter" : ""}>3h</h3>
                <h3 id="6" onClick={() => onTimeFilterClick(6)} className={activeTimeFilter === 6 ? "active-filter" : ""}>6h</h3>
                <h3 id="12" onClick={() => onTimeFilterClick(12)} className={activeTimeFilter === 12 ? "active-filter" : ""}>12h</h3>
                <h3 id="24" onClick={() => onTimeFilterClick(24)} className={activeTimeFilter === 24 ? "active-filter" : ""}>1d</h3>
                <h3 id="168" onClick={() => onTimeFilterClick(168)} className={activeTimeFilter === 168 ? "active-filter" : ""}>7d</h3>
            </div>
        </div>
    );
};


export default HeaderContainer;
