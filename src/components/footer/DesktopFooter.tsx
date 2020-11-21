import { WithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { I18nContext } from 'next-i18next';
import { useContext } from 'react';
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

  const openFeedback = () => {};

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
              <li>
                <a href={Constants.appURLs.android}>
                  <p className={footer.img2}></p>
                  <p className={footer.img1}></p>
                </a>
              </li>
              <li>
                <a href={Constants.appURLs.ios}>
                  <p className={footer.img4}></p>
                  <p className={footer.img3}></p>
                </a>
              </li>
              <li>
                <a href={Constants.socialURLs.facebook}>
                  <p className={footer.img6}></p>
                  <p className={footer.img5}></p>
                </a>
              </li>
              <li>
                <a href={Constants.socialURLs.twitter}>
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
