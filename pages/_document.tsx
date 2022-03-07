import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@archiethedev" />
          <meta name="twitter:title" content="Archie Edwards" />
          <meta
            name="twitter:description"
            content="Web engineer application for Daybridge"
          />
          <meta
            name="twitter:image"
            content="https://daybridge-portfolio.vercel.app/card.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
