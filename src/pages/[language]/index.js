const language = () => {
  return <div></div>;
};

language.getInitialProps = async ({ query, req, res, ...args }) => {
  return {
    pageType: 'listing',
  };
};

export default language;
