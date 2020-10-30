import NavLink from '@components/common/NavLink';
import { I18nContext } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const {
    i18n: { language, options },
  } = useContext(I18nContext);

  const [crumbsMap, setCrumbsMap] = useState([]);

  /*     href={{
          pathname: '/[state]/[...slug]',
          query: { state: splitUrl[1], slug: splitUrl.slice(2).join('/') },
      }}
      as={`/${v.web_url}`} */
  useEffect(() => {
    const crumbs = Array.isArray(router.query.slug)
      ? router.query.slug
      : router.query.slug.split('/');

    let route = '';
    setCrumbsMap([
      {
        label: 'HOME',
        href: {
          pathname: '/[state]',
          query: { state: router.query.state },
        },
        as: `/${options['localeSubpaths'][language]}/${router.query.state}`,
      },
      ...crumbs.slice(0, -1).map((v) => {
        route += '/' + v;
        return {
          label: v.toUpperCase().replace(/-/gi, ' '),
          href: {
            pathname: '/[state]/[...slug]',
            query: { state: router.query.state, slug: route },
          },
          as: `/${options['localeSubpaths'][language]}/${router.query.state}${route}`, //
        };
      }),
    ]);

  }, [router]);

  return (
    <div className="lg:container mx-auto flex text-xs text-gray-600 font-medium pt-1">
      {crumbsMap.map((v, i) => {
        return i === crumbsMap.length - 1 ? (
          <div key={i} className="text-red-600">
            {v.label}
          </div>
        ) : (
          <NavLink
            key={i}
            href={{ pathname: v.href.pathname, query: v.href.query }}
            as={v.as}
            passHref
          >
            {v.label} <span className="px-2">/</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
