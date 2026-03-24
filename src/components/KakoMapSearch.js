import React from 'react';

const KakoMapSearch = () => {

    const addr = '';
    return (
        <div>

            
            <input type='text' placeholder='장소, 주소' style={{ margin: 'auto 20px'}} value={addr}></input>
        </div>
    );
};

export default KakoMapSearch;