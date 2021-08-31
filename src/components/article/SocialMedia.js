import Modal from '@components/modal/Modal';
import { useContext, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share';
import { thumbnailExtractor } from '@utils/Helpers';
import getConfig from 'next/config';
import { AMPContext } from '@pages/_app';
import { comment, share } from '@utils/GoogleTagManager';
import { useRouter } from 'next/router';

const SocialMedia = ({ data }) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();

  const isAMP = useContext(AMPContext);
  const [isOpen, toggleOpen] = useState(false);
  const query = {
    amp: 'false',
    apiKey: '99a287d2-81b1-4013-8705-0805df9481e0',
    host: 'etvbharat.com',
    articleId: data.content_id,
    globalLang: 'en',
    img: thumbnailExtractor(data.thumbnails, '3_2', 's2b', ''),
    title: data.title,
    url: 'https://www.etvbharat.com' + data.web_url,
    darkMode: 'false',
    emotesEnabled: 'true',
    d: 'false',
    refHost: 'www.etvbharat.com',
    l_d: 'false',
    totWideImg: 'false',
    link: 'https://[url]',
    hideArticles: 'false',
    maxChars: '3000',
    commentsToLoad: '5',
    spamLimit: '90',
    gr: 'false',
    hideCommentBox: 'false',
    hideCommentBoxWithButton: 'false',
    hideCommentsWidget: 'false',
    wpSync: 'false',
    isCustomText: 'false',
  };
  const commentUrl = `https://cdn.vuukle.com/widgets/index.html?${new URLSearchParams(
    query
  )}`;
  const baseUrl = `https://www.etvbharat.com`;

  const url = data.web_url ? data.web_url : router.asPath.slice(1);

  return (
    <>
      {isOpen ? (
        <Modal
          title=""
          isMobile={true}
          open={!!isOpen}
          onClose={() => {
            toggleOpen(true);
          }}
          width="100vw"
          height="100vh"
        >
          <>
            <div
              className="commentBox p-3 pb-4 rounded-md w-full h-full  overflow-y-auto"
              style={{ background: '#f0f0f0' }}
            >
              <div className="flex justify-between pb-4">
                <div className="text-gray-700 text-md pl-2"></div>
                <div>
                  <button
                    type="button"
                    className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                    onClick={() => toggleOpen(false)}
                  >
                    &#10005;
                  </button>
                </div>
              </div>

              <iframe className="w-full h-full" src={commentUrl} />
            </div>
          </>
        </Modal>
      ) : null}
      {isAMP ? (
        <>
          <a
            href={`https://www.facebook.com/sharer.php?u=${baseUrl}/${data.web_url}`}
            target="_blank"
            className="amp-social-share amp-social-share-facebook"
            style={{ width: '32px', height: '32px' }}
          ></a>
          <amp-social-share
            class="amp-social-share"
            type="linkedin"
            width="32"
            height="32"
            data-param-url={`${baseUrl}/${data.web_url}`}
            aria-label="Share on LinkedIn"
          ></amp-social-share>
          <amp-social-share
            class="amp-social-share"
            type="twitter"
            width="32"
            height="32"
            data-param-url={`${baseUrl}/${data.web_url}`}
            aria-label="Share on Twitter"
          ></amp-social-share>
          <amp-social-share
            class="amp-social-share"
            type="whatsapp"
            width="32"
            height="32"
            aria-label="Share on WhatsApp"
            data-param-text={`TITLE - ${baseUrl}/${data.web_url}`}
          ></amp-social-share>
        </>
      ) : (
        <>
          <FacebookShareButton
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <RedditShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <RedditIcon size={32} round={true} />
          </RedditShareButton>

          <img
            height="24"
            width="24"
            className="w-6 lg:mx-auto inline-block cursor-pointer"
            src="https://etvbharatimages.akamaized.net/etvbharat/static/assets/images/comment.png"
            alt=""
            onClick={() => {
              comment(data);
              toggleOpen(true);
            }}
          ></img>
        </>
      )}
    </>
  );
};

export default SocialMedia;
