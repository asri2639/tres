import { withTranslation } from 'react-i18next';

function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}

Custom500.getInitialProps = ({ res, err }) => {
  return {};
};

export default withTranslation('common')(Custom500);
