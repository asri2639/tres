import NavLink from "@components/common/NavLink";
import Constants from "@utils/Constants";
import footer from './Footer.module.scss';

export default function DesktopFooter() {

    const isiOS = true;

    const gtmBackToTop = () => { }

    const gtmlAppInstall = (ev) => { }

    const changeState = () => { }

    const goToSearch = () => { }

    const openSideMenu = () => { }

    return <div className="mobile-footer block md:hidden bg-mbg text-white absolute bottom-0">
        <div className="eb-navbar mb-12 pb-1">
            <button className="text-center absolute bg-red-700 w-40 px-4 py-3 rounded-full" style={{
                top: '-2.5rem',
                left: 'calc(50% - 5rem)'
            }}
                onClick={gtmBackToTop} >
                BACK TO TOP
     </button>
            <div className="bottom-section mx-8">
                <div className="text-center img-block">
                    <div className="footer-icon"></div>
                </div>
                <div>

                    <div className="pt-6 pb-4 text-tiny space-y-2">
                        <div className="flex justify-between w-full">
                            <NavLink
                                href='/english/aboutUs'
                                as={`/english/about-us`}
                                passHref
                                title='About us'
                            />
                            <NavLink
                                href='/english/privacyPolicy'
                                as={`/english/privacy-policy`} passHref
                                title='Privacy Policy'
                            />
                        </div>
                        <div className="flex justify-between w-full">
                            <NavLink
                                href='/english/termsOfServices'
                                as={`/english/terms-of-services`} passHref
                                title='Terms & Conditions'
                            />
                            <NavLink
                                href='/english/contactUs'
                                as={`/english/contact-us`} passHref
                                title='Contact us'
                            />                            </div>
                    </div>
                    <hr className="custom-hr" />
                    <ul className="flex w-48 mx-auto justify-around my-4">
                        <li>
                            <NavLink
                                onClick={() => gtmlAppInstall('Android')}
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
                                onClick={() => gtmlAppInstall('IOS')}
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

                            <NavLink
                                href={Constants.socialURLs.facebook}
                                passHref
                            >
                                <img
                                    className="h-6"
                                    alt="ETV"
                                    src="/assets/images/facebook_icon-2x.png"
                                />
                            </NavLink>

                        </li>
                        <li>

                            <NavLink
                                href={Constants.socialURLs.twitter}
                                passHref
                            >
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
                    Copyright © 2019 Ushodaya Enterprises Pvt. Ltd., All Rights Reserved.
         </div>
            </div>
        </div>



        <div className={`${footer['action-menu']} w-full fixed bottom-0 pt-2 bg-white text-black`} style={{boxShadow: '0px -3px 8px 0px rgb(128 128 128 / 53%)'}}>
            <div className="flex justify-around align-center">
                <div className="item w-1/4">
                    <div
                        className="flex flex-col items-center justify-center whitespace-no-wrap">
                        {!isiOS ?
                            <NavLink
                                onClick={() => gtmlAppInstall('Android')}
                                href={Constants.appURLs.android}
                                passHref
                            >
                                <img
                                    className="h-6 mx-auto"
                                    alt="ETV"
                                    src="/assets/images/android-grey.png"
                                />
                                <p>INSTALL APP</p>

                            </NavLink> :
                            <NavLink
                                onClick={() => gtmlAppInstall('IOS')}
                                href={Constants.appURLs.ios}
                                passHref
                            >
                                <img
                                    className="h-6 mx-auto"
                                    alt="ETV"
                                    src="/assets/images/applegrey.png"
                                />
                                <p>INSTALL APP</p>
                            </NavLink>
                        }
                    </div>
                </div>
                <div className="item w-1/4" >
                    <div
                        className="flex flex-col items-center justify-center"
                        onClick={changeState}>
                        <img
                            className="h-6"
                            alt="ETV"
                            src="/assets/images/etv-grey.png"
                        />
                        <p>CHANGE STATE</p>
                    </div>

                </div>
                <div className="item w-1/4" >
                    <div
                        className="flex flex-col items-center justify-center"
                        onClick={goToSearch}>
                        <img
                            className="h-6"
                            alt="ETV"
                            src="/assets/images/search-grey.png"
                        />
                        <p>SEARCH</p>
                    </div>
                </div>
                <div className="item w-1/4">
                    <div
                        className="flex flex-col items-center justify-center"
                        onClick={openSideMenu}>
                        <img
                            className="h-6"
                            alt="ETV"
                            src="/assets/images/hamburger-grey.png"
                        />
                        <p>MORE</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}