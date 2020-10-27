import { useRouter } from "next/router"
import { useState } from "react";
import { I18nContext } from 'next-i18next'
import { useContext } from "react";

import header from './Header.module.scss'

import NavLink from "@components/common/NavLink"
import DesktopSidebar from "@components/header/DesktopSidebar";
import Modal from "@components/modal/Modal";
import DesktopSubMenu from '@components/header/DesktopSubMenu';

export default function DesktopHeader({ className, data }) {
    const router = useRouter();
    const { i18n: { language, options } } = useContext(I18nContext)

    const [openStateModal, setOpenStateModal] = useState(false);
    const [sidebar, toggleSidebar] = useState(false);

    const [category, setCategory] = useState(null);

    const setInitialCategory = (item) => {
        const subitem = item.catalog_list_items ? item.catalog_list_items[0] : {};
        setCategory({ ...subitem, title: item.ml_title[0].text })
    }
    const languageNStateSelect = () => {
        setOpenStateModal(true)
    }

    const containerOut = (ev) => {
        setCategory(null)
    }

    return <>
        {openStateModal ?
            <Modal title={'CHANGE STATE'} open={openStateModal} onClose={() => setOpenStateModal(false)}>
                <div>
                </div>
            </Modal> : null}

        {sidebar ?
            <DesktopSidebar onClose={() => toggleSidebar(false)} /> : null}


        <div className={`${className} divide-y md:block hidden bg-hbg px-2 font-english border-b`}>
            <div className="lg:container lg:mx-auto flex justify-between items-center py-1 overflow-x-auto">
                <div className="flex space-x-6">
                    {
                        data.languages ? Object.entries(data.languages).map(([language, states]) => {
                            return (
                                <div key={language} onClick={languageNStateSelect} className="flex-1 flex flex-col justify-center items-center cursor-pointer">
                                    <div className={`language-icon ${language}`}></div>
                                    <div className="text-white text-xs">{language.charAt(0).toUpperCase() + language.slice(1)}</div>
                                </div>
                            )
                        }) : null
                    }
                </div>

                <div className="text-white">search n social media</div>
            </div>
        </div>

        <div className={`${className} bg-hbg md:block hidden px-2 sticky top-0`} onMouseLeave={containerOut}>
            <div className="lg:container lg:mx-auto flex items-center py-1 overflow-x-auto space-x-3 ">
                <div className={header.hamburger} onClick={() => toggleSidebar(true)}></div>

                {
                    data.menu ? data.menu.map(item => {
                        return (<div key={item.list_id} className={`${header['header-menu-item']} text-white cursor-pointer whitespace-no-wrap hover:text-red-700`} >

                            <div className=" flex flex-col items-center relative" onMouseEnter={() => setInitialCategory(item)} >
                                <div>{item.ml_title[0].text.toUpperCase()}</div>
                                {item.total_items_count > 0 ? <div className={`${header['arrow-up']} absolute transform translate-y-5`}></div> : null}
                            </div>

                            {item.total_items_count > 0 ? <div className={`${header.submenu} lg:container absolute left-0 w-full z-10 text-black`} >
                                <div className="h-3 bg-transparent"></div>
                                <div className={`${header['submenu-container']} w-full bg-white shadow-md p-3`} onMouseLeave={() => setCategory(null)}>
                                    <div className="flex w-full h-full">
                                        <div className={`h-full p-3 overflow-y-scroll flex-grow-0 flex-shrink-0 whitespace-pre-wrap ${header['lhs-content']}`} style={{ flexBasis: '19%' }}>
                                            {item.catalog_list_items.map(subitem => {
                                                return (
                                                    <div key={subitem.list_id} className="p-1 font-bold text-lg hover:text-red-700"
                                                        onMouseEnter={() => setCategory({ ...subitem, title: item.ml_title[0].text })}>
                                                        {subitem.ml_title[0].text}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {category && item.ml_title[0].text === category.title ? <DesktopSubMenu key={item.ml_title[0].text} category={category} /> : null}

                                    </div>
                                </div>

                            </div> : null}
                        </div>)
                    }) : null
                }
            </div>


        </div>

        <div className={`${className} md:block hidden border-b`}>
            <div className="lg:container lg:mx-auto  flex justify-start px-2 py-1 self-center">
                <NavLink
                    href={{
                        pathname: '/[state]',
                        query: { state: router.query.state },
                    }}
                    as={`/${options['localeSubpaths'][language]}/${router.query.state}`}
                    passHref
                >
                    <div className={`logo ${options['localeSubpaths'][language]}`}></div>
                </NavLink>
                <div></div>
            </div>
        </div>
    </>

}