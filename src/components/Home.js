import { React, useState } from 'react';
import SmallHeader from './SmallHeader';
import HeaderContainer from './HeaderContainer';
import ServerTable from './ServerTable';
import Cookies from 'js-cookie';

const Home = () => {

    const token = Cookies.get('authToken');
    const [headerFilter, setHeaderFilter] = useState("all");
    return (
        <div>
            <SmallHeader />
            <HeaderContainer
                onHeaderFilterClick={setHeaderFilter}
                activeHeaderFilter={headerFilter}
            />
            <ServerTable token={token} />
        </div>
    );
};

export default Home;
