const language = () => {
  return <></>;
};

language.getInitialProps = async ({ query, req, res, ...args }) => {
  return {
    pageType: 'listing',
  };
};

export default language;
