import NavLink from '@components/common/NavLink';
import { RTLContext } from '@components/layout/Layout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const isRTL = useContext(RTLContext);

  const [crumbsMap, setCrumbsMap] = useState([]);

  useEffect(() => {
    console.log(router.asPath);
    const splitUrl = router.asPath.split('/');
    splitUrl.shift();
    let crumbs = [];
    let route = '';

    crumbs = splitUrl.slice(2, -1).map((v, i) => {
      return {
        label: v.toUpperCase().replace(/-/gi, ' '),
        as: `/${router.query.language}/${router.query.state}${route}`, //
      };
    });

    setCrumbsMap([
      {
        label: 'HOME',
        href: `/${router.query.language}/${router.query.state}`,
      },
      ...splitUrl.slice(2, -1).map((v) => {
        route += '/' + v;
        return {
          label: v.toUpperCase().replace(/-/gi, ' '),
          href: `/${router.query.language}/${router.query.state}${route}`, //
        };
      }),
    ]);
  }, [router]);

  return (
    <>
      <div
        className={`lg:container px-4 lg:px-0 mb-1 md:mb-0 mx-auto md:flex text-xs text-gray-600 font-medium pt-1 ${
          isRTL ? 'flex-row-reverse rtl' : ''
        }`}
      >
        {crumbsMap.map((v, i) => {
          return i === crumbsMap.length - 1 ? (
            <span key={-1} className="text-red-600">
              {v.label}
            </span>
          ) : (
            <NavLink key={i} href={v.href} as={v.as} passHref>
              {isRTL ? <span className="px-2">/</span> : null}
              {v.label}
              {!isRTL ? <span className="px-2">/</span> : null}
            </NavLink>
          );
        })}
      </div>{' '}
    </>
  );
};

export default Breadcrumbs;
