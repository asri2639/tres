import NavLink from '@components/common/NavLink';
import DesktopSidebar from '@components/header/DesktopSidebar';
import Constants from '@utils/Constants';
import GoogleTagManager from '@utils/GoogleTagManager';
import { useContext, useEffect, useState } from 'react';
import footer from './Footer.module.scss';
import { AMPContext } from '@pages/_app';
import AMPSidebar from '@components/header/AMPSidebar';
import { getSocialLinks } from '@utils/Helpers';
import eventBus from '@utils/EventBus';
import { useRouter } from 'next/router';
import useTranslator from '@hooks/useTranslator';

const MobileFooter = ({ data, menu }) => {
  const isAMP = useContext(AMPContext);
  const router = useRouter();
  const { t } = useTranslator();

  const isiOS = false;

  const [socialHandlers, setSocialHandlers] = useState({
    twitter: 'https://twitter.com/ETVBharatEng',
    fb: 'https://www.facebook.com/ETVBharatEnglish',
  });
  const [searchBox, toggleSearchBox] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sidebar, toggleSidebar] = useState(false);

  const backToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    GoogleTagManager.backToTop();
  };

  const searchitem = (e) => {
    const goTo = () => {
      toggleSearchBox(false);
      router.push(
        `/${router.query.language}/${router.query.state}/search/${searchInput}`
      );
    };
    if (e) {
      if (e.key === 'Enter') {
        goTo();
      }
    } else {
      goTo();
    }
  };
  const openSideMenu = () => {};

  useEffect(() => {
    const splitPath = location.pathname.split('/');
    const state = splitPath[2];

    const socialLinks = getSocialLinks(state);
    setSocialHandlers(socialLinks);

    const handleRouteChange = (url) => {
      const splitPath = location.pathname.split('/');
      const state = splitPath[2];
      const socialLinks = getSocialLinks(state);
      setSocialHandlers(socialLinks);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      {menu && menu.mobile ? (
        <>
          {isAMP ? <AMPSidebar data={{ menu: menu }} /> : null}
          {sidebar ? (
            <DesktopSidebar
              data={{ menu: menu }}
              isMobile={true}
              onClose={() => toggleSidebar(false)}
            />
          ) : null}
          <div
            next-page-hide="1"
            className="mobile-footer w-full block md:hidden bg-mbg text-white absolute bottom-0"
          >
            <div className="eb-navbar mb-12 pb-1">
              {isAMP ? (
                <a
                  href="#"
                  className="btot text-center absolute bg-red-700 w-40 px-4 py-3 rounded-full"
                  style={{
                    top: '-2.5rem',
                    left: 'calc(50% - 5rem)',
                  }}
                >
                  {t('back_to_top')}
                </a>
              ) : (
                <button
                  className="btot text-center absolute bg-red-700 w-40 px-4 py-3 rounded-full"
                  style={{
                    top: '-2.5rem',
                    left: 'calc(50% - 5rem)',
                  }}
                  onClick={() => {
                    backToTop();
                  }}
                >
                  {router.query.language ? t('back_to_top') : 'BACK TO TOP'}
                </button>
              )}
              <div className="bottom-section mx-8">
                <div className="text-center img-block">
                  <div className="footer-icon"></div>
                </div>
                <div>
                  <div className="pt-6 pb-4 text-tiny space-y-2">
                    <div className="flex justify-between w-full">
                      <NavLink
                        href="/english/aboutUs"
                        as={`/english/aboutUs`}
                        passHref
                        prefetch={false}
                        title="About us"
                      />
                      <NavLink
                        href="/english/privacyPolicy"
                        as={`/english/privacyPolicy`}
                        passHref
                        prefetch={false}
                        title="Privacy Policy"
                      />
                    </div>
                    <div className="flex justify-between w-full">
                      <NavLink
                        href="/english/termsOfService"
                        as={`/english/termsOfService`}
                        passHref
                        prefetch={false}
                        title="Terms & Conditions"
                      />
                      <NavLink
                        href="/english/contactUs"
                        as={`/english/contactUs`}
                        passHref
                        prefetch={false}
                        title="Contact us"
                      />{' '}
                    </div>
                  </div>
                  <hr className="custom-hr" />
                  <ul className="flex w-48 mx-auto justify-around my-4">
                    <li>
                      <NavLink
                        onClick={() => GoogleTagManager.appInstall('Android')}
                        href={Constants.appURLs.android}
                        passHref
                      >
                        <img
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/android_icon-2x.png"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => GoogleTagManager.appInstall('IOS')}
                        href={Constants.appURLs.ios}
                        passHref
                      >
                        <img
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/apple_icon-2x.png"
                        />
                      </NavLink>
                    </li>
                    <li className="border-r"></li>
                    <li>
                      <NavLink href={socialHandlers.fb} passHref>
                        <img
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/facebook_icon-2x.png"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={socialHandlers.twitter} passHref>
                        <img
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/twitter_icon-2x.png"
                        />
                      </NavLink>
                    </li>
                  </ul>
                  <hr className="custom-hr" />
                </div>
                <div className="copyright w-full px-6 py-2 opacity-75 text-tiny text-center">
                  Copyright © 2021 Ushodaya Enterprises Pvt. Ltd., All Rights
                  Reserved.
                </div>
              </div>
            </div>

            {searchBox ? (
              <div
                className="fixed text-black w-full h-10 z-50"
                style={{ bottom: '47px' }}
              >
                <input
                  placeholder="Search stories"
                  value={searchInput}
                  onInput={(e) => setSearchInput(e.target['value'])}
                  onChange={(e) => setSearchInput(e.target['value'])}
                  type="text"
                  className="relative h-10 border border-gray-300 rounded-sm p-2 pr-12 w-full"
                />

                <button
                  onClick={() => searchitem(null)}
                  className="btn absolute right-0 top-0 h-10 p-0 m-0 bg-gray-300 text-lg w-12"
                  style={{
                    borderRadius: '0 3px 3px 0',
                    color: '#595959',
                    lineHeight: 1,
                  }}
                >
                  {/* ❱ */}
                  &#x25ba;
                </button>
              </div>
            ) : null}

            <div
              className={`${footer['action-menu']} w-full fixed bottom-0  z-20 pt-2 bg-white text-black`}
              style={{ boxShadow: '0px -3px 8px 0px rgb(128 128 128 / 53%)' }}
            >
              <div className="flex justify-around align-center">
                <div className="item w-1/4">
                  <div className="flex flex-col items-center justify-center whitespace-nowrap">
                    {!isiOS ? (
                      <NavLink
                        onClick={() => GoogleTagManager.appInstall('Android')}
                        href={Constants.appURLs.android}
                        passHref
                        style={
                          isAMP
                            ? {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                              }
                            : {}
                        }
                      >
                        <img
                          className="h-6 mx-auto"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/android-grey.png"
                        />
                        <p>INSTALL APP</p>
                      </NavLink>
                    ) : (
                      <NavLink
                        onClick={() => GoogleTagManager.appInstall('IOS')}
                        href={Constants.appURLs.ios}
                        passHref
                      >
                        <img
                          className="h-6 mx-auto"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="/assets/images/applegrey.png"
                        />
                        <p className="whitespace-nowrap">INSTALL APP</p>
                      </NavLink>
                    )}
                  </div>
                </div>
                <div className="item w-1/4">
                  {isAMP ? (
                    <amp-lightbox
                      id="my-lightbox"
                      layout="nodisplay"
                      className="lightbox"
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          className="p-3 pb-4 rounded-md"
                          style={{ background: '#f0f0f0' }}
                        >
                          <div className="flex justify-between pb-4">
                            <div
                              className="text-gray-700 text-md pl-2"
                              style={{ fontSize: '1rem' }}
                            >
                              Change State
                            </div>
                            <div>
                              <button
                                type="button"
                                role="button"
                                tabIndex={0}
                                className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                                on="tap:my-lightbox.close"
                              >
                                &#10005;
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap w-full px-3 text-sm mx-auto">
                            {data
                              .filter(
                                (v) =>
                                  ['national', 'goa', 'tripura'].indexOf(
                                    v.state
                                  ) === -1 && v.state
                              )
                              .map((v) => ({
                                label: v.state.replace(/-/gi, ' '),
                                ...v,
                              }))
                              .sort((a, b) => {
                                let textA = a.label.toUpperCase();
                                let textB = b.label.toUpperCase();
                                return textA < textB
                                  ? -1
                                  : textA > textB
                                  ? 1
                                  : 0;
                              })
                              .map((v) => {
                                return (
                                  <a
                                    key={v.state}
                                    href={`https://www.etvbharat.com/${
                                      v.item_languages[0]
                                    }/${
                                      v.item_languages[0] === 'english'
                                        ? 'national'
                                        : v.state
                                    }`}
                                    className="py-1 capitalize"
                                    style={{ flexBasis: '50%' }}
                                  >
                                    {v.label}
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </amp-lightbox>
                  ) : null}
                  <div
                    className="flex flex-col items-center justify-center"
                    on="tap:my-lightbox"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      eventBus.emit('state-selector', {
                        show: true,
                      });
                    }}
                  >
                    <img
                      className="h-6"
                      width="24"
                      height="24"
                      alt="ETV"
                      src="/assets/images/etv-grey.png"
                    />
                    <p className="whitespace-nowrap">CHANGE STATE</p>
                  </div>
                </div>
                <div className="item w-1/4">
                  <div
                    className="flex flex-col items-center justify-center"
                    onClick={() => toggleSearchBox((searchBox) => !searchBox)}
                  >
                    <img
                      className="h-6"
                      width="24"
                      height="24"
                      alt="ETV"
                      src="/assets/images/search-grey.png"
                    />
                    <p className="whitespace-nowrap">SEARCH</p>
                  </div>
                </div>
                <div className="item w-1/4">
                  <div
                    className="flex flex-col items-center justify-center"
                    onClick={openSideMenu}
                    on="tap:sidebar1"
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      className="h-6"
                      width="24"
                      height="24"
                      alt="ETV"
                      src="/assets/images/hamburger-grey.png"
                    />
                    <p
                      className="whitespace-nowrap"
                      onClick={() => toggleSidebar(true)}
                    >
                      MORE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MobileFooter;
