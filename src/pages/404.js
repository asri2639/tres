import ErrorPage from 'next/error'

function Custom404() {
return <div className="not-found"><ErrorPage statusCode={404} /></div>
}

export default Custom404;
