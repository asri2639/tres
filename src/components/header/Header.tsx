import React from 'react';


// export const getServerSideProps = async () => {
//     const res = await fetch(
//         `https://prod.api.etvbharat.com/catalogs/city-state/items/india/languages?region=IN&auth_token=xBUKcKnXfngfrqGoF93y&access_token=TjeNsXehJqhh2DGJzBY9`
//     );
//     const data = await res.json();
//     console.log(data)
//     // Pass data to the page via props
//     return { props: { data } };
//     // 
// }

const Header = (props) => {
    return (<div>{JSON.stringify(props)}</div>)
}

export default Header;