import { thumbnailExtractor } from '@utils/Helpers';
import GoogleTagManager from '@utils/GoogleTagManager';
import Modal from '@components/modal/Modal';
import { useContext, useState } from 'react';
import { withTranslation } from '@i18n';
import { WithTranslation } from 'next-i18next';
import { AMPContext } from '@pages/_app';

const MobileNextArticle = ({
  label,
  data,
  t,
  nextArticle,
  scrollToNextArticle,
}: IMobileNextArticle) => {
  const isAMP = useContext(AMPContext);

  const query = {
    amp: 'false',
    apiKey: '99a287d2-81b1-4013-8705-0805df9481e0',
    host: 'etvbharat.com',
    articleId: data.content_id,
    globalLang: 'en',
    img: thumbnailExtractor(data.thumbnails, '3_2', 's2b', ''),
    title: data.title,
    url: location.origin + data.web_url,
    darkMode: 'false',
    emotesEnabled: 'true',
    d: 'false',
    refHost: location.host,
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
  const [isOpen, toggleOpen] = useState(false);
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
              className="commentBox mobile rounded-md w-full h-full  overflow-y-auto"
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
      <div className="flex justify-end">
        {!isAMP ? (
          <div
            className="button px-4 py-2 m-3 border-2 border-red-700 text-red-700 rounded-md cursor-pointer focus:text-white focus:bg-red-700"
            onClick={() => {
              GoogleTagManager.comment(data);
              toggleOpen(true);
            }}
          >
            {t('add_comment')}
          </div>
        ) : null}
      </div>

      {isAMP && nextArticle ? (
        <a
          href={`/${nextArticle.web_url}`}
          className="flex flex-col py-4 px-5  bg-mbg text-white cursor-pointer"
        >
          <div className="flex items-center mb-1">
            <img
              alt="ETV"
              className="w-6"
              src="/assets/images/nextarticle.png"
            />
            <span className="text-lg font-thin pl-2">{t(label)}</span>
          </div>
          <div
            className="text-gray-500 tracking-tighter pl-2"
            onClick={scrollToNextArticle}
          >
            {nextArticle ? nextArticle.ml_title[0].text : ''}
          </div>
        </a>
      ) : (
        <div className="flex flex-col py-4 px-5  bg-mbg text-white cursor-pointer">
          <div className="flex items-center mb-1">
            <img
              alt="ETV"
              className="w-6"
              src="/assets/images/nextarticle.png"
            />
            <span className="text-lg font-thin pl-2">{t(label)}</span>
          </div>
          <div
            className="text-gray-500 tracking-tighter pl-2"
            onClick={scrollToNextArticle}
          >
            {nextArticle ? nextArticle.ml_title[0].text : ''}
          </div>
        </div>
      )}
    </>
  );
};

interface IMobileNextArticle extends WithTranslation {
  label: string;
  data: any;
  nextArticle: any;
  scrollToNextArticle: any;
}

export default withTranslation('common')(MobileNextArticle);
