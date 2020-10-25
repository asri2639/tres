import NavLink from "@components/common/NavLink"
import Link from "next/link"

export default function LanguageList({ languages }) {
    function stateChangeGTM(info) {
        console.log(info)
    }

    const listItems = languages.map((language, index) => {
        console.log(language)
        return (<li key={language.display_title}
            className="flex-1 text-sm text-center whitespace-no-wrap"
            style={{flexBasis: '10%'}}
        >
            <NavLink
                href={{
                    pathname: '/[language]/[state]',
                    query: { language: language.item_languages[0], state: language.state || 'national' },
                }}
                as={`/${language.item_languages[0]}/${language.state || 'national'}`}
                passHref
                onClick={() => stateChangeGTM(language)}
                title={language.display_title}
            />
        </li>)
    })
    return (<ul className="flex flex-wrap justify-center py-1">
        {listItems}
    </ul>)
}