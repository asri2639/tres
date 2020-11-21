import NavLink from '@components/common/NavLink';
import { RTLContext } from '@components/layout/Layout';
import GoogleTagManager from '@utils/GoogleTagManager';
import { useContext } from 'react';

export default function LanguageList({ languages }) {
  const isRTL = useContext(RTLContext);
  const listItems = languages.map((language, index) => {
    return (
      <li
        key={language.display_title}
        className="flex-1 text-sm text-center whitespace-no-wrap"
        style={{ flexBasis: '10%' }}
      >
        <NavLink
          href={{
            pathname: '/[state]',
            query: {
              language: language.item_languages[0],
              state: language.state || 'national',
            },
          }}
          as={`/${language.item_languages[0]}/${language.state || 'national'}`}
          passHref
          onClick={() => {
            GoogleTagManager.stateChange(language);
          }}
          title={language.display_title}
        />
      </li>
    );
  });
  return (
    <ul
      className={`flex flex-wrap justify-center py-1 ${
        isRTL ? 'flex-row-reverse rtl' : ''
      }`}
    >
      {listItems}
    </ul>
  );
}
