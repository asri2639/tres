import DesktopFooter from '@components/footer/DesktopFooter';
import MobileFooter from '@components/footer/MobileFooter';
import { Media, MediaContextProvider } from 'media';

export default function Footer({ data, menu }) {
  return (
    <MediaContextProvider>
      <Media at="xs">
        {' '}
        <MobileFooter data={data} menu={menu} />
      </Media>
      <Media greaterThan="xs">
        <DesktopFooter data={data} />
      </Media>
    </MediaContextProvider>
  );
}
