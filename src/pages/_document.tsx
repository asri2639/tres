import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ETVDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                </Head>
                <body>
                    <Main />
                    {/* Here we will mount our modal portal */}
                    <div id="modal" style={{ height: 'auto' }} />
                </body>
                <NextScript />
            </Html>
        )
    }
}

