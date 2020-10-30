import NavLink from '@components/common/NavLink';
import { thumbnailExtractor } from '@utils/Helpers';
import grid from './GridList.module.scss';

const GridList = ({ data }) => {
    return (
        <div className="w-full">
            <div className="text-xl font-bold text-gray-600 border-b">{data.ml_title[0].text.toUpperCase()}</div>
            <div className={`flex flex-wrap w-full ${grid.list}`}>
                {data.catalog_list_items.map(v => {
                    const splitUrl = v.web_url.split('/');
                    const thumbnail = thumbnailExtractor(v.thumbnails, '3_2', 's2b')

                    return (
                        <NavLink key={v.friendly_id} className="w-1/2 cursor-pointer"
                            href={{
                                pathname: '/[state]/[...slug]',
                                query: { state: splitUrl[1], slug: splitUrl.slice(2).join('/') },
                            }}
                            as={`/${v.web_url}`}
                            passHref>
                            <img className="rounded-lg" src={thumbnail.url} alt={thumbnail.alt_tags} />
                            <div className="pt-2 leading-tight">{v.display_title}</div>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default GridList