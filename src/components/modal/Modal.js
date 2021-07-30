import ClientOnlyPortal from '@components/modal/ClientOnlyPortal';
import useTranslator from '@hooks/useTranslator';
import { AMPContext } from '@pages/_app';

const Modal = ({
  open,
  title,
  onClose,
  children,
  isMobile,
  width,
  height,
  on,
}) => {
  const { t } = useTranslator();
  const isAMP = useContext(AMPContext);

  return (
    <>
      {isAMP ? (
        <amp-lightbox
          id={on.split(':')[1]}
          layout="nodisplay"
          className="lightbox"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className="p-3 pb-4 rounded-md"
              style={{ background: '#f0f0f0' }}
            >
              <div className="flex justify-between pb-4">
                <div
                  className="text-gray-700 text-md pl-2"
                  style={{ fontSize: '1rem' }}
                >
                  {t(title) || ''}
                </div>
                <div>
                  <button
                    type="button"
                    role="button"
                    tabIndex={0}
                    className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                    on="tap:modal-lightbox.close"
                  >
                    &#10005;
                  </button>
                </div>
              </div>
            </div>
            {children}
          </div>
        </amp-lightbox>
      ) : null}

      {!isAMP && open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop flex justify-center items-center">
            <div
              className="modal"
              style={{ width: width || 'auto', height: height || 'auto' }}
            >
              {!isMobile ? (
                <div className="header text-xl flex justify-between bg-gray-300 p-4 items-center">
                  <div className="text-gray-600 font-semibold">
                    {t(title) || ''}
                  </div>
                  <button
                    type="button"
                    className="font-semibold text-gray-500 hover:text-gray-900 text-2xl"
                    onClick={onClose}
                  >
                    &#10005;
                  </button>
                </div>
              ) : null}
              {children}
            </div>
            <style jsx>{`
              :global(body) {
                overflow: hidden;
              }
              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1000;
              }
              .modal {
                background-color: white;
                width: 400px;
                max-width: 95vw;
                min-height: 200px;
                border-radius: 6px;
                position: relative;
              }
              .header {
                background: #e9e9e9;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
              }
            `}</style>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
};

export default Modal;
