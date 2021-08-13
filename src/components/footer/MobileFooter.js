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
                          loading="lazy"
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="data:image/png;base64,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"
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
                          loading="lazy"
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAuCAYAAABEbmvDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4QYeDCsFIUpHCQAABFJJREFUWMPFmetTW1UUxX+5XCykCa9SwNJaS2ut7YxTHR0d/38/qHVG0Tb4xDZAAQMNIRDI0w9rXZLGhIRObu6euRPIueecdfbeaz9OUq1WixhkClgB1oCPgYfADWAX+A74EdgGav0WCGMAFQIzwC3gQ+ADYBWYN5A0MDHMIqMGtQI8Br4CPgEWDTQE9oEWUAea4wKWAhYM6hvgKXC7Y7wJlIBDoDxOYGnkU18DX1pTnXIE/Ovn2JqLHdh7yIQPgUfActd4HdgCNoE9oDpowWBEwLLAfcTApR7jBSAHbCBTDpRRaWwWeGBwsx3fVw3qZ+AH4DfkX2MDlkZxagGRAKCBzPcr8D3wYlhtDQssBK4hP0ohNlWBM9rMqiDGFfz3OVAE/jawV567hJy+5nfO6EOCy4BNAJkOTWT9XRUx7BAx7Myb5K25ScS6ooGWEENvo4zQ8Pgbjx/QgwypHinpGorSy4hpKwaW8UEiYAfAjj9TnrMITPv/lj+ngTmPT1lbJQPbs7lfe52TfhqbAu4idj1G6eRGD1NGZih44V2DjQ5208+sDzTttUPPj0x5bE3/bpP/Y8CtTmBZg/oM+BTFpBUuz2v3PCfv09cMZhV435pKcbncQr634Pc3gHIELGMgX6CofdcbDIpzkwaQtXbr1lgGuM5wMu85UU6tAzuhASwDn6PE+5FVP6wEXnDmCnO6JQ3cQa4xB7wJUWkSmfDBFUGNUg4Qy4+A0xA5+j0DTCcAqG5A6yg7bEUae4T8Yy4BUE0UD3PAt8BPKP7VQhT4lomnmh0kFZQV1oFfUFwE5LhzDMfAOOQQhYcXqLq9kIB28By3NJDDbyK/eqsxCQwqCTNGiX7fAN8qtQOG6Fhikhpw6qfRPRgwOGXEJU0D6tmUJOHwkUyglNbTjQIGdCsxyhTKqRlEwP8BqycELkShagkl8p7AGldbcyQSoFJnDeXqTPdg1eCSkBlUzTxBddmFv4WIrhVk83FLGhUQpyimnaNg2whRn1cmmbQUIP+6b3ABKjCLISqJJ1Ftn0TZA+oPniIyLAK7IbpAC5EDJgUsROyMQsd2gDqTPGqpkpY00t5iYFB5VG8PvIWJWepIQaXolm8SlR9Rg5tEtQFi5p/AywAxch/4A5n1LEFtvUZF4/MQlR9FVEneRIEu866rv6M0kSttoouYfBS3qka74YHimIFVvG8O1f3FzoB6ZMTr6C7heIza2kZ3F8+tufOw64WCX8iiTLCGiBGXtFCAz3nfLRwZutl3CvyF8uY86gfuMBxLW7SvnoatigvIQs8QGy+s1GvDE2TSZ96ggQjRnRWqPsgJYnYFMSvwwa7TvlzpLhAqyI9z6Cec6Br0oi7sp4kD1BVHzcIT1K3PGGzZp91B/rGPAmPN4xnE8FXUUEfpJgpPW8iPo0Z3j67Sqx+w6FeMXdQpzyJfq3jjErpveOVnz2ao0q4Qyh2bNZDfdgJ76c8iPTLOfxa+Ny61hx8vAAAAAElFTkSuQmCC"
                        />
                      </NavLink>
                    </li>
                    <li className="border-r"></li>
                    <li>
                      <NavLink href={socialHandlers.fb} passHref>
                        <img
                          loading="lazy"
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="data:image/png;base64,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"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={socialHandlers.twitter} passHref>
                        <img
                          loading="lazy"
                          className="h-6"
                          width="24"
                          height="24"
                          alt="ETV"
                          src="data:image/png;base64,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"
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
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAQAAAChFKcoAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfiCBUPIhaY1UgJAAABbklEQVQoz5XSO2tUQRyG8d+cc0LYqGu8gCLxgCCSNNqLoIgWitiqKHaBYGFnYWdhoTZ+AVkLrSKLpBBEQQgpjHj5AhaSQwwhwQRBlL1buHt21RyJTze8z8z7Z2ZCRZfgpMPuIxE0BJf9UM26cdLzdMw65qYdDgoyi8ru5umAGJxwwUQ/knlnpreIcu28qi0+Dmg1VZN/invds81TT/JBXnokdjsdH6wOzjiEKe284aomdrvo1uCMY1Y0xVjPu4J1kZ29E0857bF5E777mxGv0wMmvU1U7HfEc+fy2t/57KwrFhJl7LPL1g21trI9iCNN1LUU0dZAK7JJ/lMMmxFHMPwPo6OE4cgbHS+sFYo1s9o+JS4Z995UoVhywyuLiWXLgi+F4mrWMNd7645pNWOuSdXdwXWjMg8sePbLD5X+3sico75JRT5IzTuunuVhn8QQ2G5UjCHloguPUUJL0l1tKDY9tKZqyZJpX83kfxM/AbbZXLDyNMN7AAAAAElFTkSuQmCC"
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
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAQAAABDyLxRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfiCBUPIhaY1UgJAAABQ0lEQVQoz4XTMUibURAA4C/PKEoGq5NacHIrFVpwUhGcnHQpiosggm2hNKMF59ougqOTbro4tiiIFNQhoxQXBVF+sRZKoJSQNhCNw2+KYPLnpse9j3t3By+1pkakDHjnpbcOIpCuiV5Z1SmvWE2la6B+6zIqjh1Vk+ERC7Iy+Oejm/qs1RDOTdt98MT9CF2G9ck7cGFes1PtXsjLOYxKcW/N3ljwFJTs2NNv0RNQsd/7Icql1oIlC5Lil7FgvAGq2PczLdsA7ZqJisGzRFayFBUJ963Wq3UpF+8t3aDaTczKCSilW0/M/iRW6zAbs+tEFrzvnaJp4rmBRNhmrL0z2FSRHBmDQc7XBqxsOSj7pJC4ux1fmia4EozWZdfmoh8Bt1ZsPLj47e//c0E2+l79CwWvXZl265stZ1qMmNTnxOdoG+4ADvdYaKfjIbgAAAAASUVORK5CYII="
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
                      src="data:image/png;base64,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"
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
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAAZtQTFRFAAAA////qqqqf39/mZmZf39/kZGRf39/f39/i4uLf39/f39/iIiIf39/h4eHf39/f39/hISEf39/f39/g4ODf39/g4ODf39/g4ODf39/f39/goKCgoKCgoKCgoKCgoKCf39/goKCf39/goKChISEgYGBgYGBg4ODg4ODgYGBgYGBgYGBgoKCgYGBgoKCgoKCgoKCgoKCgYGBgoKCgICAgoKCgoKCgoKCgoKCgoKCgICAgYGBg4ODgYGBgYGBgoKCgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgYGBgoKCgYGBgYGBgoKCgYGBgoKCgoKCgYGBgoKCgYGBgoKCgYGBgYGBgoKCgYGBgoKCgYGBgYGBgoKCgYGBgYGBgYGBgoKCgYGBgoKCgYGBgoKCgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgoKCgoKCgoKCgYGBgoKCgYGBgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKCgYGBgoKC1nVilgAAAIh0Uk5TAAEDBAUGBwgKCwwODxARFBgZGhwdHh8gISIkJSkrLS8wMTIzODs9PkJDSUtMTU5QUlRVVllaXGBiZGVsbW5wcXN0eXqBio+SlpeYmZqbnKChoqOkq62ur7Cxtba3u8nKy83Oz9HS09TV1tna293h4+Tn6Orr7O3u7/Dx8vP09fb3+Pn6+/z9/g/Flq0AAAI8SURBVEjH7ZdbV1JBFIBHorxEmWkmmhpdLTOUUjBMu2A3MipLCrAski4Y3aMMLNBz+H52D5ALZWbOiVqrh9yP861vnZnZe/bMEWIr/k44dzfV5bX5I0/ywFr6wYX+3zIbBuMGVZGabLbtHk+yOT4EHbbUpplSxTCzr98XfukLPTbczlRZnD/vaRRCONyjt3MALA9ZugfeApizXdVzufwFwPBbuB1vAB55Ng233gAwfPr1pgDuNNaSQAEoHNLJYYCQPAUrwFKLJkcl4K4C+krAtLo2ksDjHSocAlbdKnoKMA+qKz0N3FTRBDCr2ZER4IdLzvYaYHbpSj4JjMuZH5jXZnICmJOjCDChlfcD2QYpegp49AWYATqkJAdmo15OACekmQA+WZT+LeCMDLiAjIV8FQhIDwXwzkK+DoxKyRoULJrNfWBQSl4Bbr28CPRKyUPlnNa3xYC8/OBcBCJaeRiIy1E/8E3boKPAlII9By5p3D4TTFUHngS+tqrlGBBVweaPwDWlexLgiBIHUVWQEKI7C8TU83IsAMVjUrbrBZBt12xJzzKQl/X27pcAY9pMnjaAUmhbzXo/A5hefQEGDIAl34Z+0RerXJVFC3ukfKkmg52VgZ3DUbN8cdqwD6crn8kkZq6E7y1W3gjZMW/Rht0yvVrzMiDRLoQtW7jD3zeYZrRcG/Zs4To3l62YK/Gp9Xq2aQsh9g34xs8O9Tqrx+zbsviv7dyeP7GP1vuW9uZ45qz7Jd42sH3rd+QfxE8kSQ6OmTDhqgAAAABJRU5ErkJggg=="
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
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAABGdBTUEAALGPC/xhBQAAABVQTFRFAAAAg4ODgYGBgYGBgoKCgoKCgoKCa3EumAAAAAZ0Uk5TAEhJ3t/jWI1xhgAAACZJREFUOMtjYBjBQCUNAziCJcIwJVLxSwhjShiOhtVoWI2GFXUBALVoXG5OdgkvAAAAAElFTkSuQmCC"
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
