import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ETVDocument extends Document {
    render() {
        return (
            <Html>
                <Head></Head>
                
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}

