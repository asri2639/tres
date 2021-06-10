import Modal from '@components/modal/Modal';
import { useRouter } from 'next/router';
import { useState } from 'react';

const StateSelectModal = ({ data, onClose }) => {
  const [isShowing, setIsShowing] = useState(true);
  const router = useRouter();

  const close = () => {
    onClose();
    setIsShowing(false);
  };
  const states = data
    .filter(
      (v) => ['national', 'goa', 'tripura'].indexOf(v.state) === -1 && v.state
    )
    .map((v) => ({ label: v.state.replace(/-/gi, ' '), ...v }))
    .sort((a, b) => {
      let textA = a.label.toUpperCase();
      let textB = b.label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

  const languageNStateSelect = (language, states) => {
    if (language === 'english') {
      location.href = location.origin + `/${language}/national`;
      // setTimeout(() => {
      //   router.push(`/national`, `/${language}/national`);
      // }, 100);
    } else {
      if (states.length === 1) {
        location.href = location.origin + `/${language}/${states[0].state}`;

        // setTimeout(() => {
        //   router.push(`/${states[0].state}`, `/${language}/${states[0].state}`);
        // }, 100);
      } else {
        close();
      }
    }
  };

  const goToSelected = (selected) => {
    languageNStateSelect(selected.language, [{ state: selected.state }]);
    close();
  };

  return (
    <Modal
      title=""
      isMobile={true}
      open={isShowing}
      onClose={() => {
        close();
      }}
      width={null}
      height={null}
    >
      <>
        <div className="p-3 pb-4 rounded-md" style={{ background: '#f0f0f0' }}>
          <div className="flex justify-between pb-4">
            <div className="text-gray-700 text-md pl-2">Change State</div>
            <div>
              <button
                type="button"
                className="font-semibold text-gray-500 hover:text-gray-900 text-md"
                onClick={() => {
                  close();
                }}
              >
                &#10005;
              </button>
            </div>
          </div>

          <div className="flex flex-wrap w-full px-3 text-sm mx-auto">
            {states.map((v) => {
              return (
                <div
                  key={v.state}
                  onClick={() => {
                    goToSelected({
                      language: v.item_languages[0],
                      state: v.state,
                    });
                  }}
                  className="py-1 capitalize cursor-pointer"
                  style={{ flexBasis: '50%' }}
                >
                  {v.label}
                </div>
              );
            })}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default StateSelectModal;
