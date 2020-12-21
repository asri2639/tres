import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { I18nContext } from 'next-i18next';
import { useContext, useEffect, useState } from 'react';
import { withTranslation } from '@i18n';

import Constants from '@utils/Constants';

import footer from './Footer.module.scss';

import NavLink from '@components/common/NavLink';
import LanguageList from '@components/footer/LanguageList';
import { RTLContext } from '@components/layout/Layout';

const DesktopFooter = ({ data, t }: IDesktopFooter) => {
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);
  const isRTL = useContext(RTLContext);
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
  const openFeedback = () => {};
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
    <footer className="eb-footer footer">
      <div className="desktop-footer absolute bottom-0 w-full divide-y md:block hidden font-english mb-20">
        {/* {t('top_news')} */}
        <div className="border-t">
          <div
            className={`lg:container lg:mx-auto flex justify-center py-1 self-center ${
              isRTL ? 'flex-row-reverse rtl' : ''
            }`}
          >
            <NavLink
              href={{
                pathname: '/[state]',
                query: { state: router.query.state },
              }}
              as={`/${options['localeSubpaths'][language]}/${router.query.state}`}
              passHref
            >
              <div
                className={`logo ${options['localeSubpaths'][language]}`}
              ></div>
            </NavLink>

            <LanguageList languages={data} />
          </div>
        </div>
        <div>
          <div className="lg:container lg:mx-auto flex justify-center">
            <ul className={footer['eb-footer-icons']}>
              <li
                onClick={() => {
                  window.location.href = Constants.appURLs.android;
                }}
              >
                <a href={Constants.appURLs.android}>
                  <p className={footer.img2}></p>
                  <p className={footer.img1}></p>
                </a>
              </li>
              <li
                onClick={() => {
                  window.location.href = Constants.appURLs.ios;
                }}
              >
                <a href={Constants.appURLs.ios}>
                  <p className={footer.img4}></p>
                  <p className={footer.img3}></p>
                </a>
              </li>
              <li
                onClick={() => {
                  window.location.href = Constants.socialURLs.facebook;
                }}
              >
                <a href={Constants.socialURLs.facebook}>
                  <p className={footer.img6}></p>
                  <p className={footer.img5}></p>
                </a>
              </li>
              <li
                onClick={() => {
                  window.location.href = twitterHandler;
                }}
              >
                <a href={twitterHandler}>
                  <p className={footer.img8}></p>
                  <p className={footer.img7}></p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="lg:container lg:mx-auto ">
            <ul className="flex justify-around font-medium text-gray-600 w-full lg:w-6/12 mx-auto my-2">
              <li>
                <NavLink
                  href="/english/aboutUs"
                  as={`/english/about-us`}
                  passHref
                  title="About us"
                />
              </li>
              <li>
                <NavLink
                  href="/english/privacyPolicy"
                  as={`/english/privacy-policy`}
                  passHref
                  title="Privacy Policy"
                />
              </li>
              <li>
                <NavLink
                  href="/english/termsOfServices"
                  as={`/english/terms-of-services`}
                  passHref
                  title="Terms & Conditions"
                />
              </li>
              <li>
                <NavLink
                  href="/english/contactUs"
                  as={`/english/contact-us`}
                  passHref
                  title="Contact us"
                />
              </li>
              <li>
                <p onClick={openFeedback}>Feedback</p>
              </li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-500">
            Copyright © 2019 Ushodaya Enterprises Pvt. Ltd., All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

interface IDesktopFooter extends WithTranslation {
  data: any;
}

export default withTranslation('common')(DesktopFooter);
