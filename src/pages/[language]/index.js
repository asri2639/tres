const language = () => {
  return null;
};

language.getInitialProps = async ({ query, req, res, ...args }) => {
  return {
    pageType: 'listing',
  };
};

export default language;
