import DesktopHeader from '@components/header/DesktopHeader';
import MobileHeader from '@components/header/MobileHeader';
import { Media, MediaContextProvider } from 'media';

export default function Header({ data }) {
  return (
    <>
      <MediaContextProvider>
        <Media at="xs">
          {(mediaClassNames, renderChildren) => {
            return <MobileHeader className={mediaClassNames} data={data} />;
          }}
        </Media>
        <Media greaterThan="xs">
          {(mediaClassNames, renderChildren) => {
            return <DesktopHeader className={mediaClassNames} data={data} />;
          }}
        </Media>
      </MediaContextProvider>
    </>
  );
}
