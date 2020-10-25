import API from "@services/api/API";
import APIEnum from "@services/api/APIEnum";
import useSWR from "swr";

const country = 'IN';
const auth_token = 'xBUKcKnXfngfrqGoF93y';
const access_token = 'TjeNsXehJqhh2DGJzBY9';
const selected_language = 'en';

export default function DesktopSubMenu({ category }) {
    const api = API(APIEnum.CatalogList);

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
                item_languages: selected_language,
            }
        }).then(res => {
            return res.data.data
        });
    }

    if (category) {
        if (category.catalog_list_items.length > 0) {
            response = { data: category };
        } else {
            response = useSWR(['CatalogList', 'getSubMenuDetails', JSON.stringify({ key: category.menu_link })], catalogFetcher, { dedupingInterval: 5 * 60 * 1000 });
        }
    }


    return <>
        {
            response && response.data && response.data.catalog_list_items ? (
                response.data.catalog_list_items.slice(0, 3).map(item => {
                    return (
                        <div key={item.content_id} className="p-3 flex-grow-0 flex-shrink-0 whitespace-pre-wrap" style={{ flexBasis: '27%' }}>
                            <div className="">
                                {item.thumbnails ?
                                    <img className="w-full rounded-md" src={item.thumbnails.web_3_2.url} alt={item.thumbnails.web_3_2.alt_tags} />
                                    :
                                    <img className="w-full rounded-md" src="/assets/images/placeholder.png" alt="placeholder image" />
                                }
                                <div className="text-sm mt-1 font-semibold">
                                    {item.ml_title[0].text}
                                </div>
                            </div>
                        </div>)
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