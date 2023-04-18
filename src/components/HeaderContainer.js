import React from 'react';

const HeaderContainer = ({ onHeaderFilterClick, activeHeaderFilter }) => {
    return (
        <div className="header-container">
            <div className="left-group">
                <h2 onClick={() => onHeaderFilterClick("all")} className={activeHeaderFilter === "all" ? "active-filter" : ""}>all</h2>
            </div>
        </div>
    );
};


export default HeaderContainer;
