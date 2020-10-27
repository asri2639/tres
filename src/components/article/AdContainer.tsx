import GridList from "@components/article/GridList"
import PopularList from "@components/article/PopularList"

const AdContainer = ({ data }) => {
    return (
        <>
            {
                data.map(val => {
                    if (val.list_type === 'ad_unit') {
                        const [width, height] = val.ad_url.split('/').slice(-1)[0].split('x').map(v => parseInt(v))
                        return (
                            <iframe className="mx-auto" key={val.list_id} width={width + 50} height={height + 50} src={val.ad_url} />)
                    } else {

                        switch (val.layout_type) {
                            case "most_popular":
                                return <PopularList key={val.list_id} data={val} />
                            case "four_plus_four_list":
                                return <GridList key={val.list_id} data={val} />


                        }
                    }
                })
            }
        </>
    )
}

export default AdContainer;