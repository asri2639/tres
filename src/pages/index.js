import React from 'react'
import Head from 'next/head'
import { getInitialLocale } from '@i18n/getInitialLocale';
import { useRouter } from 'next/dist/client/router'
import { Router, withTranslation } from '@i18n'

const Index = () => {
  const router = useRouter()
  React.useEffect(() => {
  
   // router.replace('/[state]', `/national`)
  })
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}

export default withTranslation('common')(Index)