export default function Article({ data, html }) {
    return (
        <div className="lg:container lg:mx-auto px-3 md:px-0 ">
            <div className="flex flex-col md:flex-col-reverse">
                <div className="-mx-3 md:mx-0">
                    <img src={data.thumbnails.web_3_2.url} alt={data.thumbnails.web_3_2.alt_tags} />
                </div>
                <h1 className="pt-4 pb-3 md:pt-0 md:pb-0 leading-tight text-xl md:text-2xl font-bold">{data.title}</h1>

            </div>
            <div

                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />

        </div>)
}