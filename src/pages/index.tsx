import React from 'react'
import Head from 'next/head'
import { getInitialLocale } from '@i18n/getInitialLocale';
import { useRouter } from 'next/dist/client/router'
import { Router, withTranslation } from '@i18n'

const Index = () => {
  const router = useRouter()
  React.useEffect(() => {
    let init = getInitialLocale();
    if (init === 'english') {
      init += '/national';
    }
    // Router.replace('/[language]/[state]', `/${init}`)
  })
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}

export default withTranslation('common')(Index)