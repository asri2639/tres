import API from "@api/API";
import APIEnum from "@api/APIEnum";
import { useEffect, useState } from "react";
import useSWR from 'swr';

const country = 'IN';
const auth_token = 'xBUKcKnXfngfrqGoF93y';
const access_token = 'TjeNsXehJqhh2DGJzBY9';
const selected_language = 'en';

export default function Footer({ footerData }) {
    const api = API(APIEnum.Catalog);

    const [data, setData] = useState({ footer: [] });

    useEffect(() => {
        const getData = async () => {
            const result = await api.Catalog.getFooterDetails({
                query: {
                    region: country,
                    auth_token: auth_token,
                    access_token: access_token,
                    response: 'r2',
                    item_languages: selected_language,
                }
            });
            const requiredData = result.data.data.params_hash2.footer;
            setData({ footer: requiredData });
        }
        getData();
    }, []);

    function stateChangeGTM() { }

    return (<footer className="row eb-footer text-muted">
        <div className="eb-navbar upper-nav">
            <div className="container-fluid footerrow">
                <div className="footer-line"></div>
                <div className="container footerrow">
                    <div className="row sitemap">
                        <div className="col-md-1 col-sm-4 col-xs-3 footer-container">
                            <img
                                alt="ETV"
                                className="footer-link-logo"

                                src="src/assets/images/etvlogo/english.png"
                            />
                        </div>

                        <div
                            className="col-md-1 col-sm-4 col-xs-3 footer-container ng-scope"
                            ng-repeat="x in footerData"
                        >
                            <ul className="ml-list">
                                <a
                                    ng-href="hindi/haryana"
                                    onClick={stateChangeGTM}
                                    className="ng-binding"
                                    href="hindi/haryana"
                                >हरियाणा</a>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="footer-line"></div>
                <div className="main-footer-icons">
                    <ul
                        className="eb-footer-icons"
                        ng-social-buttons=""
                        data-url=""
                        data-title="'test'"
                        data-description="'test2'"
                        data-image=""
                    >
                        <li>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.etvbharat.android"
                            >
                                <p id="img2"></p>
                                <p id="img1">
                                </p></a>
                        </li>
                        <li>
                            <a
                                ng-href="https://itunes.apple.com/us/app/yourapp/id1453416186"
                                href="https://itunes.apple.com/us/app/yourapp/id1453416186"
                            ><p id="img4"></p>
                                <p id="img3">
                                </p>
                            </a>
                        </li>
                        <li>
                            <a
                                ng-href="https://www.facebook.com/ETVBharatEnglish"
                                href="https://www.facebook.com/ETVBharatEnglish"
                            ><p id="img6"></p>
                                <p id="img5">
                                </p></a>
                        </li>
                        <li>
                            <a
                                ng-href="https://twitter.com/eenadu_english"
                                href="https://twitter.com/eenadu_english"
                            ><p id="img8"></p>
                                <p id="img7"></p></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-line"></div>
        <div className="main-footer-links">
            <ul className="eb-footer-links">
                <li>
                    <a ng-href="english/about-us" href="english/about-us">About us</a>
                </li>
                <li>
                    <a ng-href="english/privacy-policy" href="english/privacy-policy"
                    >Privacy Policy</a
                    >
                </li>
                <li>
                    <a ng-href="english/terms-of-services" href="english/terms-of-services"
                    >Terms &amp; Conditions</a
                    >
                </li>
                <li>
                    <a ng-href="english/contact-us" href="english/contact-us">Contact us</a>
                </li>
                <li><a ng-click="openFeedback()">Feedback</a></li>
            </ul>
        </div>
        <div className="eb-navbar">
            <div className="container footerrow copyright text-center">
                Copyright © 2019 Ushodaya Enterprises Pvt. Ltd., All Rights Reserved.
    </div>
        </div>
    </footer>
    )
}


