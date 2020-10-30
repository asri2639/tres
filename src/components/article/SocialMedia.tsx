import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon,

} from "react-share";
const SocialMedia = (data) => {
    return (
        <>
            <FacebookShareButton url={`https://www.etvbharat.com/${data.web_url}`} >
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton title={data.title} url={`https://www.etvbharat.com/${data.web_url}`} >
                <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton title={data.title} url={`https://www.etvbharat.com/${data.web_url}`} >
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton title={data.title} url={`https://www.etvbharat.com/${data.web_url}`} >
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <RedditShareButton title={data.title} url={`https://www.etvbharat.com/${data.web_url}`} >
                <RedditIcon size={32} round={true} />
            </RedditShareButton>
        </>
    )

}

export default SocialMedia;