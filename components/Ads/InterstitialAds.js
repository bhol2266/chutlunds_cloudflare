import Head from 'next/head';
import Script from 'next/script';

function InterstitialAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="">


            <Head>
                <link rel="stylesheet" href="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.css" />
            </Head>

            <Script
                src="//cdn.tsyndicate.com/sdk/v1/interstitial.ts.js"
            // This ensures the script is loaded after the page is interactive
            />

            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: ` InterstitialTsAd({
                        spot: "ee9ab24036174503b1debe6c3ccc7fdf",
                        extid: "{extid}",
                   });`,
                }}

                strategy="lazyOnload"
            />





        </div>
    )
}

export default InterstitialAds;
