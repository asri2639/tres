import NavLink from "@components/common/NavLink";
import API from "@services/api/API";
import APIEnum from "@services/api/APIEnum";
import { thumbnailExtractor } from "@utils/Helpers";
import { I18nContext } from "next-i18next";
import { useContext } from "react";
import useSWR from "swr";

const country = 'IN';
const auth_token = 'xBUKcKnXfngfrqGoF93y';
const access_token = 'TjeNsXehJqhh2DGJzBY9';

export default function DesktopSubMenu({ category }) {
    const api = API(APIEnum.CatalogList);
    const { i18n: { language, options } } = useContext(I18nContext)

    let response = null;
    const catalogFetcher = (...args) => {
        const [apiEnum, methodName, params] = args;
        return api[apiEnum][methodName]({
            params: JSON.parse(params),
            query: {
                region: country,
                auth_token: auth_token,
                access_token: access_token,
                response: 'r2',
                item_languages: language,
            }
        }).then(res => {
            return res.data.data
        });
    }

    if (category) {
        if (category.title==='State' && category.catalog_list_items.length > 0) {
            response = { data: category };
        } else {
            response = useSWR(['CatalogList', 'getSubMenuDetails', JSON.stringify({ key: category.menu_link })], catalogFetcher, { dedupingInterval: 5 * 60 * 1000 });
        }
    }


    return <>
        {
            response && response.data && response.data.catalog_list_items ? (
                response.data.catalog_list_items.slice(0, 3).map(item => {
                    const splitUrl = item.web_url ? item.web_url.split('/') : [];
                    const thumbnail = thumbnailExtractor(item.thumbnails, '3_2', 'b2s')

                    return (
                        !splitUrl.length ? <div></div>
                            :
                            <NavLink key={item.content_id} className="p-3 flex-grow-0 flex-shrink-0 whitespace-pre-wrap" style={{ flexBasis: '27%' }}
                                href={{
                                    pathname: '/[state]/[...slug]',
                                    query: { state: splitUrl[1], slug: splitUrl.slice(2).join('/') },
                                }}
                                as={`/${item.web_url}`}
                                passHref>
                                <div className="">
                                    {item.thumbnails ?
                                        <img className="w-full rounded-md" src={thumbnail.url} alt={thumbnail.alt_tags} />
                                        :
                                        <img className="w-full rounded-md" src="/assets/images/placeholder.png" alt="placeholder image" />
                                    }
                                    <div className="text-sm mt-1 font-semibold">
                                        {item.ml_title[0].text}
                                    </div>
                                </div>
                            </NavLink>)
                })
            ) :
                [0, 1, 2].map(item => {
                    return (
                        <div key={item} className="p-3 flex-grow-0 flex-shrink-0 whitespace-pre-wrap" style={{ flexBasis: '27%' }}>
                            <img className="w-full rounded-md" src="/assets/images/placeholder.png" alt="placeholder image" />
                            <div className="text-sm mt-1">
                            </div>
                        </div>
                    )
                })

        }
    </ >

}