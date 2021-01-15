import NavLink from '@components/common/NavLink';
import DesktopSidebar from '@components/header/DesktopSidebar';
import Modal from '@components/modal/Modal';
import Constants from '@utils/Constants';
import GoogleTagManager from '@utils/GoogleTagManager';
import { I18nContext } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import footer from './Footer.module.scss';

import { withTranslation } from '@i18n';
import { WithTranslation } from 'next-i18next';
import { AMPContext } from '@pages/_app';
import AMPSidebar from '@components/header/AMPSidebar';

const MobileFooter = ({ data, menu, t }: IMobileFooter) => {
  const isAMP = useContext(AMPContext);

  const isiOS = false;
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const twitters = [
    { state: 'National', link: 'https://twitter.com/ETVBharatEng' },
    { state: 'goa', link: 'https://twitter.com/ETVBharatEng' },
    { state: 'punjab', link: 'https://twitter.com/ETVBharatPB' },
    { state: 'himachal-Pradesh', link: 'https://twitter.com/ETVBharatHP' },
    { state: 'Urdu', link: 'https://twitter.com/ETVBharatUrdu' },
    { state: 'telangana', link: 'https://twitter.com/ETVBharat_ts' },
    { state: 'andhra-pradesh', link: 'https://twitter.com/ETVBharatAP' },
    { state: 'hindi', link: 'https://twitter.com/ETVBharatHindi' },
    { state: 'tripura', link: 'https://twitter.com/ETVBharatHindi' },
    { state: 'Assam', link: 'https://twitter.com/ETVBharatAS' },
    { state: 'tamil-nadu', link: 'https://twitter.com/ETVBharatTN' },
    { state: 'maharashtra', link: 'https://twitter.com/ETVBharatMA' },
    { state: 'west-bengal', link: 'https://twitter.com/ETVBharatWB' },
    { state: 'karnataka', link: 'https://twitter.com/ETVBharatKA' },
    { state: 'odisha', link: 'https://twitter.com/ETVBharatOD' },
    { state: 'gujarat', link: 'https://twitter.com/ETVBharatGJ' },
    { state: 'rajasthan', link: 'https://twitter.com/ETVBharatRJ' },
    { state: 'haryana', link: 'https://twitter.com/ETVBharatHR' },
    { state: 'jharkhand', link: 'https://twitter.com/ETVBharatJH' },
    { state: 'bihar', link: 'https://twitter.com/ETVBharatBR' },
    { state: 'madhya-pradesh', link: 'https://twitter.com/ETVBharatMP' },
    { state: 'kerala', link: 'https://twitter.com/ETVBharatKL' },
    { state: 'chhattisgarh', link: 'https://twitter.com/ETVBharatCG' },
    { state: 'delhi', link: 'https://twitter.com/ETVBharatDelhi' },
    { state: 'uttar-pradesh', link: 'https://twitter.com/ETVBharatUP' },
    { state: 'uttarakhand', link: 'https://twitter.com/ETVBharatUK' },
    { state: 'jammu-and-kashmir', link: 'https://twitter.com/ETVBharatJK' },
  ];
  const [twitterHandler, setTwitterHandler] = useState(
    'https://twitter.com/ETVBharatEng'
  );
  const [searchBox, toggleSearchBox] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [openStateModal, setOpenStateModal] = useState([]);
  const [sidebar, toggleSidebar] = useState(false);

  const languageNStateSelect = (language, states) => {
    if (language === 'english') {
      setTimeout(() => {
        router.push(`/national`, `/${language}/national`);
      }, 100);
    } else {
      if (states.length === 1) {
        setTimeout(() => {
          router.push(`/${states[0].state}`, `/${language}/${states[0].state}`);
        }, 100);
      } else {
        setOpenStateModal(states);
      }
    }
  };

  const goToSelected = (selected) => {
    languageNStateSelect(selected.language, [{ state: selected.state }]);
    setOpenStateModal([]);
  };

  const backToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    GoogleTagManager.backToTop();
  };

  const changeState = () => {
    const states = data
      .filter(
        (v) => ['national', 'goa', 'tripura'].indexOf(v.state) === -1 && v.state
      )
      .map((v) => ({ label: v.state.replace(/-/gi, ' '), ...v }))
      .sort((a, b) => {
        let textA = a.label.toUpperCase();
        let textB = b.label.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    setOpenStateModal(states);
  };

  const searchitem = (e) => {
    const goTo = () => {
      toggleSearchBox(false);
      router.push(
        `/${router.query.state}/search/${searchInput}`,
        `/${options['localeSubpaths'][language]}/${router.query.state}/search/${searchInput}`
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
    const twitter = twitters.find(
      (v) => v.state.toLowerCase() === state.toLowerCase()
    );
    setTwitterHandler(twitter ? twitter.link : twitters[0].link);

    const handleRouteChange = (url) => {
      const splitPath = location.pathname.split('/');
      const state = splitPath[2];
      const twitter = twitters.find(
        (v) => v.state.toLowerCase() === state.toLowerCase()
      );
      setTwitterHandler(twitter ? twitter.link : twitters[0].link);
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
      {isAMP ? <AMPSidebar data={{ menu: menu }} /> : null}
      {openStateModal.length > 0 ? (
        <Modal
          title=""
          isMobile={true}
          open={!!openStateModal}
          onClose={() => {
            setOpenStateModal([]);
          }}
          width={null}
          height={null}
        >
          <>
            <div
              className="p-3 pb-4 rounded-md"
              style={{ background: '#f0f0f0' }}
            >
              <div className="flex justify-between pb-4">
                <div className="text-gray-700 text-md pl-2">Change State</div>
                <div>
                  <button
                    type="button"
                    className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                    onClick={() => setOpenStateModal([])}
                  >
                    &#10005;
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-full px-3 text-sm mx-auto">
                {openStateModal.map((v) => {
                  return (
                    <div
                      key={v.state}
                      onClick={() => {
                        goToSelected({
                          language: v.item_languages[0],
                          state: v.state,
                        });
                      }}
                      className="py-1 capitalize"
                      style={{ flexBasis: '50%' }}
                    >
                      {v.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        </Modal>
      ) : null}

      {sidebar ? (
        <DesktopSidebar
          data={{ menu: menu }}
          onClose={() => toggleSidebar(false)}
        />
      ) : null}
      <div className="mobile-footer w-full block md:hidden bg-mbg text-white absolute bottom-0">
        <div className="eb-navbar mb-12 pb-1">
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
            {t('back_to_top')}
          </button>
          <div className="bottom-section mx-8">
            <div className="text-center img-block">
              <div className="footer-icon"></div>
            </div>
            <div>
              <div className="pt-6 pb-4 text-tiny space-y-2">
                <div className="flex justify-between w-full">
                  <NavLink
                    href="/english/aboutUs"
                    as={`/english/about-us`}
                    passHref
                    title="About us"
                  />
                  <NavLink
                    href="/english/privacyPolicy"
                    as={`/english/privacy-policy`}
                    passHref
                    title="Privacy Policy"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <NavLink
                    href="/english/termsOfServices"
                    as={`/english/terms-of-services`}
                    passHref
                    title="Terms & Conditions"
                  />
                  <NavLink
                    href="/english/contactUs"
                    as={`/english/contact-us`}
                    passHref
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
                      alt="ETV"
                      src="/assets/images/apple_icon-2x.png"
                    />
                  </NavLink>
                </li>
                <li className="border-r"></li>
                <li>
                  <NavLink href={Constants.socialURLs.facebook} passHref>
                    <img
                      className="h-6"
                      alt="ETV"
                      src="/assets/images/facebook_icon-2x.png"
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink href={twitterHandler} passHref>
                    <img
                      className="h-6"
                      alt="ETV"
                      src="/assets/images/twitter_icon-2x.png"
                    />
                  </NavLink>
                </li>
              </ul>
              <hr className="custom-hr" />
            </div>
            <div className="copyright w-full px-6 py-2 opacity-75 text-tiny text-center">
              Copyright © 2019 Ushodaya Enterprises Pvt. Ltd., All Rights
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
              <div className="flex flex-col items-center justify-center whitespace-no-wrap">
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
                      alt="ETV"
                      src="/assets/images/applegrey.png"
                    />
                    <p className="whitespace-no-wrap">INSTALL APP</p>
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
                            tabindex="0"
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
                            return textA < textB ? -1 : textA > textB ? 1 : 0;
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
                tabindex="0"
                onClick={() => changeState()}
              >
                <img
                  className="h-6"
                  alt="ETV"
                  src="/assets/images/etv-grey.png"
                />
                <p className="whitespace-no-wrap">CHANGE STATE</p>
              </div>
            </div>
            <div className="item w-1/4">
              <div
                className="flex flex-col items-center justify-center"
                onClick={() => toggleSearchBox((searchBox) => !searchBox)}
              >
                <img
                  className="h-6"
                  alt="ETV"
                  src="/assets/images/search-grey.png"
                />
                <p className="whitespace-no-wrap">SEARCH</p>
              </div>
            </div>
            <div className="item w-1/4">
              <div
                className="flex flex-col items-center justify-center"
                onClick={openSideMenu}
                on="tap:sidebar1"
                role="button"
                tabindex="0"
              >
                <img
                  className="h-6"
                  alt="ETV"
                  src="/assets/images/hamburger-grey.png"
                />
                <p
                  className="whitespace-no-wrap"
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
  );
};

interface IMobileFooter extends WithTranslation {
  data: any;
  menu: any;
}

export default withTranslation('common')(MobileFooter);
