import { withTranslation } from 'react-i18next';

function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
Custom404.getInitialProps = ({ res, err }) => {
  return {};
};

export default withTranslation('common')(Custom404);
