import { React, useState } from 'react';
import SmallHeader from './SmallHeader';
import HeaderContainer from './HeaderContainer';
import ServerTable from './ServerTable';
import TotalMessageCount from './TotalMessageCount';

const Home = () => {
    const [headerFilter, setHeaderFilter] = useState("top");
    const [timeFilter, setTimeFilter] = useState(24);
    return (
        <div>
            <SmallHeader />
            <TotalMessageCount />
            <HeaderContainer
                onHeaderFilterClick={setHeaderFilter}
                activeHeaderFilter={headerFilter}
                onTimeFilterClick={setTimeFilter}
                activeTimeFilter={timeFilter}
            />
            <ServerTable headerFilter={headerFilter} timeFilter={timeFilter} />
        </div>
    );
};

export default Home;
