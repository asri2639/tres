import NavLink from '@components/common/NavLink';
import { RTLContext } from '@components/layout/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export function capSentence(text) {
  let wordsArray = text.toLowerCase().split(' ')
  let capsArray = wordsArray.map(word=>{
      return word[0].toUpperCase() + word.slice(1)
  })
  return capsArray.join(' ')
}

const Breadcrumbs = () => {
  const router = useRouter();
  const isRTL = useContext(RTLContext);

  const splitUrl = router.asPath.split('/');
  splitUrl.shift();
  let route = '';

  let crumbsMap = [
    {
      name: 'Home',
      label: 'HOME',
      href: `/${router.query.language}/${router.query.state}`,
    },
    ...splitUrl.slice(2, -1).map((v) => {
      route += '/' + v;
      return {
        name: capSentence(v.replace(/-/gi, ' ')),
        label: v.toUpperCase().replace(/-/gi, ' '),
        href: `/${router.query.language}/${router.query.state}${route}`, //
      };
    }),
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
 {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [${crumbsMap.map((v, i) => {
    return JSON.stringify({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@id': v.href, name: v.name },
    });
  })}
  ]
}`,
          }}
        ></script>
      </Head>
      <div
        className={`lg:container px-4 lg:px-0 mb-1 mt-1 md:mb-0 mx-auto md:flex text-xs text-gray-600 font-medium pt-1 ${
          isRTL ? 'flex-row-reverse rtl' : ''
        }`}
      >
        {crumbsMap.map((v, i) => {
          return i === crumbsMap.length - 1 ? (
            <span key={-1}>{v.label}</span>
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
