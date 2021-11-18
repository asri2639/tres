import Modal from '@components/modal/Modal';
import { useState } from 'react';
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
import { comment, share } from '@utils/GoogleTagManager';
import { useRouter } from 'next/router';

const SocialMedia = ({ data, index }) => {
  const router = useRouter();

  const [isOpen, toggleOpen] = useState(0);
  const query = {
    amp: 'false',
    elementsIndex: `${index}`,
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
            toggleOpen(0);
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
                    onClick={() => toggleOpen(0)}
                  >
                    &#10005;
                  </button>
                </div>
              </div>

              {/*  <iframe className="w-full h-full" src={commentUrl} /> */}
              <div
                className="w-full h-full"
                id={`vuukle-comments-${isOpen}`}
              ></div>
              {/*   <script
                dangerouslySetInnerHTML={{
                  __html: `setTimeout(()=> {window.newVuukleWidgets(${JSON.stringify(
                    query
                  )});},500)`,
                }}
              ></script> */}
            </div>
          </>
        </Modal>
      ) : null}
      {
        <>
          <FacebookShareButton
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <FacebookIcon size={36} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <LinkedinIcon size={36} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <TwitterIcon size={36} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <WhatsappIcon size={36} round={true} />
          </WhatsappShareButton>
          <RedditShareButton
            title={data.title}
            url={`${baseUrl}/${url}`}
            beforeOnClick={() => {
              share(data);
            }}
          >
            <RedditIcon size={36} round={true} />
          </RedditShareButton>

          <img
            height="24"
            width="24"
            className="w-6 lg:mx-auto inline-block cursor-pointer"
            src="https://etvbharatimages.akamaized.net/etvbharat/static/assets/images/comment.png"
            alt=""
            onClick={() => {
              query.elementsIndex = +new Date();
              comment(data);
              setTimeout(() => {
                toggleOpen(query.elementsIndex);
              }, 100);

              setTimeout(() => {
                window.newVuukleWidgets && window.newVuukleWidgets(query);
              }, 500);
            }}
          ></img>
        </>
      }
    </>
  );
};

export default SocialMedia;
