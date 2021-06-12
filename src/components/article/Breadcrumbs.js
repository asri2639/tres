import NavLink from '@components/common/NavLink';
import { RTLContext } from '@components/layout/Layout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const isRTL = useContext(RTLContext);

  const [crumbsMap, setCrumbsMap] = useState([]);

  useEffect(() => {
    const crumbs = Array.isArray(router.query.slug)
      ? router.query.slug
      : router.query.slug.split('/');

    let route = '';
    setCrumbsMap([
      {
        label: 'HOME',
        href: '/[language]/[state]',
        as: `/${router.query.language}/${router.query.state}`,
      },
      ...crumbs.slice(0, -1).map((v) => {
        route += '/' + v;
        return {
          label: v.toUpperCase().replace(/-/gi, ' '),
          href: '[language]/[state]/[...slug]',
          as: `/${router.query.language}/${router.query.state}${route}`, //
        };
      }),
    ]);
  }, [router]);

  return (
    <div
      className={`lg:container mx-auto flex text-xs text-gray-600 font-medium pt-1 ${
        isRTL ? 'flex-row-reverse rtl' : ''
      }`}
    >
      {crumbsMap.map((v, i) => {
        return i === crumbsMap.length - 1 ? (
          <div key={i} className="text-red-600">
            {v.label}
          </div>
        ) : (
          <NavLink key={i} href={v.href} as={v.as} passHref>
            {isRTL ? <span className="px-2">/</span> : null}
            {v.label}
            {!isRTL ? <span className="px-2">/</span> : null}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
