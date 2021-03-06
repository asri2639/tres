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
  const kooShare = () => {
    let kooShareurl =
      'https://www.kooapp.com/create?title=' +
      data.title +
      '&link=' +
      data.dynamic_url +
      '&language=' +
      data.item_languages[0] +
      '&handle=etvbharat&utm_source=acmeonkoo&utm_campaign=ac meonkoo_share';
    window.open(
      kooShareurl,
      'Popup',
      'toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=550, height=400, top=30'
    );
  };
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
          <button
            aria-label="koo"
            className="react-share__ShareButton"
            onClick={kooShare}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0px',
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            <svg
              id="Layer_1"
              height={36}
              width={36}
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html: '.cls-1{fill:#facd00;}.cls-2{fill:#383838;}',
                  }}
                />
              </defs>
              <title>Koo_Logo Versions</title>
              <circle className="cls-1" cx={250} cy={250} r={225} />
              <path
                className="cls-2"
                d="M331.41,234.67h0l0-.24a56,56,0,0,0-7.22-22.28,39,39,0,0,0-3.78-5.35,5.77,5.77,0,0,0-4.08-2c-.05-.48-.09-1-.14-1.42-.28-3-.59-5.86-.92-8.67l-.24-2.09h0c-.06-.51-.13-1-.19-1.5l-.06-.48c-.05-.34-.09-.67-.13-1s-.06-.38-.08-.56-.09-.61-.13-.91-.06-.39-.08-.58-.09-.59-.14-.88-.05-.38-.08-.56l-.15-.91c0-.17-.05-.34-.08-.5q-.09-.56-.18-1.08c0-.11,0-.21,0-.32l-.24-1.36c0-.12-.05-.25-.07-.37-.06-.33-.12-.65-.19-1l-.09-.49c-.06-.28-.11-.56-.17-.84s-.07-.35-.1-.52-.11-.53-.17-.8-.07-.34-.11-.52-.11-.53-.17-.8-.07-.32-.11-.48-.13-.59-.2-.88c0-.13-.05-.26-.08-.38l-.3-1.24a1.94,1.94,0,0,0-.05-.2c-.08-.34-.16-.68-.25-1,0-.15-.07-.29-.11-.44s-.13-.51-.2-.77-.08-.31-.13-.47-.12-.48-.19-.72-.09-.31-.13-.47l-.2-.71c0-.15-.09-.3-.13-.46s-.14-.49-.22-.73l-.12-.4c-.09-.32-.19-.63-.28-.94l-.06-.18c-.11-.37-.23-.73-.34-1.09l-.12-.35-.24-.73c-.05-.14-.09-.28-.14-.42s-.15-.43-.22-.65l-.15-.43-.23-.62-.15-.42-.23-.63-.15-.4-.27-.7c0-.1-.08-.2-.11-.3l-.39-1-.11-.27-.29-.69-.15-.37c-.08-.2-.17-.39-.25-.58l-.17-.39-.24-.55-.18-.39-.24-.54c-.06-.12-.12-.25-.17-.37l-.27-.57c0-.1-.1-.21-.16-.32l-.39-.81-.09-.18-.37-.72c0-.11-.11-.21-.16-.32s-.19-.35-.28-.52l-.18-.35c-.09-.16-.18-.32-.26-.48l-.19-.35-.27-.47c-.06-.11-.12-.23-.19-.34l-.27-.47-.18-.32-.33-.55a2.39,2.39,0,0,1-.13-.21l-.46-.74-.16-.26c-.1-.16-.2-.32-.31-.48l-.19-.3-.28-.43-.21-.31-.27-.4-.21-.31c-.09-.13-.19-.26-.28-.4l-.21-.28-.3-.43-.18-.25-.48-.64-.14-.18-.36-.46a2.56,2.56,0,0,0-.2-.26l-.29-.37-.22-.27-.29-.35-.22-.27-.29-.34-.22-.26-.3-.34-.21-.24-.38-.42-.16-.18-.47-.5-.21-.22-.31-.32-.23-.23-.3-.3-.23-.24-.29-.28-.24-.23-.3-.28-.23-.21-.34-.32-.19-.17-.51-.46-.19-.16-.35-.29-.23-.19a3.88,3.88,0,0,0-.31-.26l-.24-.2-.3-.24-.24-.19-.3-.23-.24-.19-.33-.24-.22-.16-.46-.34-.21-.15-.4-.28-.22-.15-.33-.22-.24-.16-.31-.2-.24-.16-.31-.19-.24-.16-.33-.19-.23-.14-.37-.22-.18-.1-.53-.31-.21-.11-.35-.19-.23-.12-.32-.17-.25-.13-.31-.15-.24-.13-.32-.15-.24-.12-.35-.16-.2-.09-.54-.25-.17-.07-.38-.16-.23-.1-.33-.13-.24-.1-.31-.13-.25-.09-.31-.12-.24-.09-.34-.12-.21-.08-.44-.15-.15,0-.5-.17-.14,0-.07,0,.07,0a22.77,22.77,0,0,0-4.32-18c-3.53-4.67-8.53-7.69-12.73-7.69h0a7.17,7.17,0,0,0-5.5,2.36,7.91,7.91,0,0,0-2,5,7.07,7.07,0,0,0-5.86,5.15,7.36,7.36,0,0,0,1,6.1,10.78,10.78,0,0,0-3.37,7.93,50.5,50.5,0,0,0-7.15,3.13c-.52.28-1,.57-1.57.88s-.88.51-1.32.79l-1,.61c-.95.63-1.91,1.31-2.85,2-.32.25-.63.49-.94.75-.59.47-1.17,1-1.75,1.47s-1.31,1.19-1.95,1.82c-.91.9-1.8,1.84-2.68,2.84-.42.49-.84,1-1.25,1.5s-.64.8-1,1.21l-.51.68c-.51.68-1,1.38-1.5,2.11s-1.06,1.63-1.58,2.48c-.37.62-.74,1.26-1.09,1.91-.27.48-.54,1-.8,1.47-.48.93-1,1.89-1.42,2.89q-1.31,2.82-2.45,6c-.46,1.29-.91,2.62-1.32,4-.29.93-.56,1.88-.82,2.85s-.48,1.86-.71,2.82l-.21.89q-.34,1.55-.66,3.15c-.18.92-.35,1.86-.5,2.81-.32,1.91-.6,3.87-.84,5.91-.28,2.35-.5,4.78-.66,7.31Q204,193,203.86,195c-.08,1.36-.14,2.7-.19,4s-.1,2.59-.13,3.85l0,.86h0c-1.21,0-4.91,0-14.8,16.19-5.72,9.37-10.51,19.39-12.49,26.16-.75,2.57-1.49,5.86-.72,8.26h-.07l-.39.08-.18,0-.35.09-.17,0-.38.11-.12,0-.49.16-.07,0-.4.16-.14.06-.31.14-.16.08-.3.16-.13.07c-.13.08-.27.16-.39.25h0l-.39.29-.11.08-.26.23-.13.11-.23.24-.11.12a3.47,3.47,0,0,0-.25.29l-.07.09c-.1.13-.2.27-.29.41l-.06.09-.21.35a.8.8,0,0,0-.08.16,3.18,3.18,0,0,0-.16.32,1.42,1.42,0,0,0-.08.18l-.15.35-.06.17c-.06.18-.12.36-.18.56a6,6,0,0,0-.14.69c0,.24-.05.5-.06.77a16.43,16.43,0,0,0,1.79,6.86,33.85,33.85,0,0,0,2.37,4.26c.38.59.79,1.2,1.23,1.8a56.19,56.19,0,0,0,9.87,10.33c1.14.94,2.35,1.86,3.63,2.78a75.26,75.26,0,0,0,7,4.42,96.62,96.62,0,0,0,32,10.78c2.14,5.93,4.77,13.21,5.5,15.16.25.65,0,1.46-1.2,1.46h-7.13s-2.14,4.74,3.68,4.56c16.11-.48,14.37,12.42,19.44,10,4.89-2.35-4.41-10-4.27-10,18.57,2.33,12.64-4.58,12.64-4.58s-9.41.08-13,0a5,5,0,0,1-4.6-3.27l-4.61-12.47a138.56,138.56,0,0,0,15,.79,104.05,104.05,0,0,0,17.45-1.38c1-.17,2-.36,3-.56-1,.2-2,.39-3,.56,1.22,3.39,2.92,8.08,3.07,8.53.33,1,.09,1.43-1.74,1.43h-6.89s-2,4.45,5.63,4.45c15.55,0,12.32,13.07,18.3,9.72,3.83-2.13-3.27-8.16-3.84-8.88-.33-.41-.06-1,.75-.85,15.89,2.42,12-4.44,12-4.44s-11,.06-15.64.06a2.26,2.26,0,0,1-2.11-1.43c-.85-2.13-2.46-6.68-3.59-9.81,12.33-3.06,21.54-8.65,28.36-15.92l.87-.95c.45-.52.9-1,1.34-1.57l.69-.85c.68-.87,1.33-1.74,1.95-2.64.34-.5.67-1,1-1.5a60.15,60.15,0,0,0,3.74-6.71c.28-.59.55-1.18.82-1.77l.49-1.15c.35-.83.68-1.66,1-2.5.23-.6.45-1.21.66-1.82s.38-1.11.56-1.67.33-1.06.49-1.59a6.66,6.66,0,0,0,.78,0,5.57,5.57,0,0,0,1.85-.31,24.76,24.76,0,0,0,8.67-5,20.92,20.92,0,0,0,6-9.4A29.21,29.21,0,0,0,331.41,234.67Zm-75.88-114.6a.15.15,0,0,0,.05-.29c-3.51-1.63-7.1-3.22-6.32-6.09.37-1.38,1.53-1.93,3.07-1.93a16.15,16.15,0,0,1,6.59,2l.07,0a.15.15,0,0,0,.11-.26c-2.55-2.61-5.32-5.38-2.91-8.12a2.63,2.63,0,0,1,2.07-.81c4.89,0,14.49,8.15,12.64,20h0l-.23-.05-.31-.06-.23,0-.32-.06-.21,0-.35-.07-.18,0-.52-.08-.1,0L268,124l-.19,0-.33,0-.21,0-.32,0-.21,0-.31,0-.21,0-.33,0-.18,0-.41,0h-.1l-.51,0h-.15l-.35,0H264l-.31,0h-.2l-.31,0H263l-.31,0h-.19l-.35,0h-2.59c-.34,0-.69,0-1,0h0l-1,0h-.07l-.92.06h-.1l-.86.07h-.11l-.83.08h-.1l-.83.1h-.06l-.86.11h0l-1.17.17-1.19.21-.32.06c-.74.14-1.5.3-2.26.48l-.39.09-.17,0C248.19,120.68,252.12,120.26,255.53,120.07Zm-72.67,121a146.42,146.42,0,0,1,11.41-21.47c5.12-8,8.11-10.68,9.14-11.24h0a.88.88,0,0,1,.19-.1c1.27.07,2.89,1.49,4.31,3.77l.15.24c4.2,7,5.8,19.35,1.22,28a24,24,0,0,1-3.14,4.57,26.42,26.42,0,0,1-10.89,7.32h0c-1,.35-1.84.62-2.6.82-6.08,1.6-11.07.94-12.82-.05C179.69,252.48,179.18,249.92,182.86,241.07Zm129.38-.58a100,100,0,0,1-3.18,17.94c-.44,1.6-.93,3.15-1.45,4.64A55.49,55.49,0,0,1,297,281.64a48.91,48.91,0,0,1-19,13c-8.45,3.32-18.65,5-30.31,5a134.6,134.6,0,0,1-16.73-1c-2.2-.28-4.36-.61-6.49-1a94.23,94.23,0,0,1-22.73-7.12c-9.87-4.59-18.27-11-23.67-18.1-5-6.52-5.3-10.66-5.11-11.33.41-1.47,1.27-2.6,8.16-2.6h3.71c5.11,0,9-.69,12.17-2.18a29.87,29.87,0,0,0,16.27-13.95c5.53-10.44,3.43-24.51-1.35-32.46a15.74,15.74,0,0,0-3.94-4.57c.11-4.42.29-9.17.62-14.24,1.39-21.77,7.38-38.27,17.78-49a44.8,44.8,0,0,1,17.88-11.35,49.11,49.11,0,0,1,9.09-2.16,53.21,53.21,0,0,1,7.26-.51A43.19,43.19,0,0,1,273.79,130,38.91,38.91,0,0,1,289,139.06c11.24,10.67,18.47,28.87,21.49,54.1.49,4.12,1,8.62,1.4,13.35A196,196,0,0,1,312.24,240.49ZM327,239c0,.87-.1,1.71-.2,2.52a21.25,21.25,0,0,1-.45,2.35,17.65,17.65,0,0,1-2.19,5.16,17.08,17.08,0,0,1-1.31,1.76c-.24.28-.49.55-.75.82s-.52.52-.8.77-.54.47-.81.69a18.93,18.93,0,0,1-2.6,1.73,19.85,19.85,0,0,1-1.79.89q-.92.41-1.83.72c.18-.74.34-1.47.5-2.22.4-1.86.74-3.74,1-5.64.07-.43.13-.86.19-1.29.16-1.1.3-2.2.43-3.31.09-.77.17-1.54.25-2.32s.14-1.55.2-2.32c.1-1.17.17-2.34.24-3.51,0-.78.08-1.56.11-2.35s.06-1.56.08-2.35c0-.39,0-.78,0-1.17l0-2.35c0-1.57,0-3.13,0-4.7q0-1.17-.06-2.34c0-.77-.05-1.55-.08-2.33s-.07-1.55-.11-2.32c-.11-2.12-.24-4.23-.4-6.31h0l0,0a.73.73,0,0,1,.18.17c.58.67,1.15,1.41,1.71,2.19.41.59.83,1.21,1.23,1.86l.39.66a44.41,44.41,0,0,1,2.41,4.66c.36.81.7,1.64,1,2.48.49,1.26.92,2.55,1.31,3.87s.73,2.64,1,4a52.84,52.84,0,0,1,.86,5.43h0c.05.48.09.94.12,1.4C327,237.22,327.05,238.12,327,239Z"
              />
              <path
                className="cls-2"
                d="M251.82,172.83a3.48,3.48,0,1,0,3.48,3.48A3.48,3.48,0,0,0,251.82,172.83Z"
              />
              <path
                className="cls-2"
                d="M288.55,172.83a3.48,3.48,0,1,0,3.48,3.48A3.48,3.48,0,0,0,288.55,172.83Z"
              />
              <path
                className="cls-2"
                d="M280.35,188.45l-8.8-3.65a2.69,2.69,0,0,0-.93-.17h0a2.7,2.7,0,0,0-.94.17l-8.8,3.65a1.5,1.5,0,0,0-.32,2.73l8.95,5.8a1.83,1.83,0,0,0,1.11.33h0a1.83,1.83,0,0,0,1.1-.33l8.95-5.8A1.5,1.5,0,0,0,280.35,188.45Z"
              />
              <path
                className="cls-2"
                d="M199.25,381.33v17.36a19.36,19.36,0,0,1-2.61.46,26.8,26.8,0,0,1-3.61.24c-2.72,0-4.6-.47-5.65-1.39s-1.57-2.58-1.57-5V352.06c.61-.11,1.51-.25,2.68-.43a23.44,23.44,0,0,1,3.54-.27q3.84,0,5.53,1.31t1.69,5.07v12.45l16-18.44c3.49,0,6,.65,7.49,2a6,6,0,0,1,2.27,4.65,7.48,7.48,0,0,1-1,3.76,19.62,19.62,0,0,1-3.22,4l-9.61,9.6q5,5.53,9.07,9.84t6.53,7a7,7,0,0,1-.62,3,6.89,6.89,0,0,1-4,3.61,8.22,8.22,0,0,1-2.77.47,8.09,8.09,0,0,1-5.15-1.58,27.38,27.38,0,0,1-3.84-3.73Z"
              />
              <path
                className="cls-2"
                d="M269.17,380.1a22.9,22.9,0,0,1-1.42,8.3,17.37,17.37,0,0,1-4.07,6.26,18.18,18.18,0,0,1-6.34,4A23.57,23.57,0,0,1,249,400a24.29,24.29,0,0,1-8.3-1.34,17.8,17.8,0,0,1-6.34-3.92,17.41,17.41,0,0,1-4.07-6.27,23.06,23.06,0,0,1-1.42-8.37,22.24,22.24,0,0,1,1.46-8.22,17.5,17.5,0,0,1,4.11-6.26,18,18,0,0,1,6.34-4,23.32,23.32,0,0,1,8.22-1.38,22.65,22.65,0,0,1,8.22,1.42,18.69,18.69,0,0,1,6.34,4,17.63,17.63,0,0,1,4.11,6.27A22,22,0,0,1,269.17,380.1ZM249,370.5a5.75,5.75,0,0,0-5,2.49q-1.77,2.5-1.77,7.11,0,4.84,1.77,7.26a6.32,6.32,0,0,0,10,0c1.18-1.64,1.77-4,1.77-7.22s-.59-5.44-1.77-7.11A5.76,5.76,0,0,0,249,370.5Z"
              />
              <path
                className="cls-2"
                d="M314.19,380.1a22.9,22.9,0,0,1-1.42,8.3,17.24,17.24,0,0,1-4.07,6.26,18.18,18.18,0,0,1-6.34,4,23.53,23.53,0,0,1-8.3,1.38,24.19,24.19,0,0,1-8.29-1.34,17.71,17.71,0,0,1-6.34-3.92,17.15,17.15,0,0,1-4.07-6.27,23.06,23.06,0,0,1-1.43-8.37,22.24,22.24,0,0,1,1.46-8.22,17.77,17.77,0,0,1,4.11-6.26,18,18,0,0,1,6.34-4,23.32,23.32,0,0,1,8.22-1.38,22.58,22.58,0,0,1,8.22,1.42,18.59,18.59,0,0,1,6.34,4,17.63,17.63,0,0,1,4.11,6.27A21.76,21.76,0,0,1,314.19,380.1Zm-20.13-9.6a5.76,5.76,0,0,0-5,2.49q-1.77,2.5-1.77,7.11,0,4.84,1.77,7.26a6.33,6.33,0,0,0,10,0c1.18-1.64,1.77-4,1.77-7.22s-.59-5.44-1.77-7.11A5.77,5.77,0,0,0,294.06,370.5Z"
              />
            </svg>
          </button>
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
            alt="etv comment image"
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
