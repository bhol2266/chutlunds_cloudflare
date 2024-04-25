import { useRouter } from "next/router";
import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import Head from 'next/head'
import Pagination from '../../../../components/Pagination';
import { scrapeVideos } from '../../../../config/spangbang';


function Category({ video_collection, pages }) {

    const router = useRouter();
    const { searchkey, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <>
            <Head>
                <title>{`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description"
                    content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos for free, here on Chutlunds.com. Discover the growing collection of high quality Most Relevant XXX movies and clips. No other sex tube is more popular and features more ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} scenes than Chutlunds! Browse through our impressive selection of porn videos in HD quality on any device you own.`} />
            </Head>

            <Header keyword={searchkey.replace("+", " ")} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

            <Pagination data={{ url: `/search/${searchkey.toLowerCase().trim()}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

        </>
    )
}

export default Category




export async function getServerSideProps(context) {

    const { searchkey, page } = context.query;
    var finalDataArray = []
    var pages = []


    const obj = await scrapeVideos(`https://spankbang.party/s/${searchkey.toLowerCase().trim()}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.party/s/${searchkey.toLowerCase().trim()}/${page}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}

export const runtime = "experimental-edge";