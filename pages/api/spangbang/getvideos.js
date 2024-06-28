import cheerio from 'cheerio';
import { NextResponse, NextRequest } from "next/server";
export const config = {
    runtime: 'edge',
}



export default async function handler(req, res) {

    const body_object = await req.json();

    let url = body_object.url

    if (url.includes("https://spankbang.com/")) {
        url = url.replace("https://spankbang.com/", "https://spankbang.party/");
    }

    var finalDataArray = []
    var pages = []


   


    const response = await fetch(url)
    const body = await response.text();
    const $ = cheerio.load(body)



    $('.video-list.video-rotate.video-list-with-ads .video-item').each((i, el) => {
        const thumbnail = $(el).find('picture img').attr('data-src');
        const title = $(el).find('picture img').attr('alt');
        const duration = $(el).find('.l').text();

        const statsText = $(el).find('.stats').text();
        const likePercentage = statsText.substring(statsText.indexOf("%") - 4, statsText.indexOf("%") + 1).trim();
        const views = statsText.substring(0, statsText.indexOf("%") - 4).trim();

        const previewVideo = $(el).find('picture img').attr('data-preview');
        const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

        if (href != undefined && previewVideo != undefined && !thumbnail.includes("//assets.sb-cd.com")) {

            finalDataArray.push({
                thumbnailArray: thumbnail,
                TitleArray: title,
                durationArray: duration,
                likedPercentArray: likePercentage,
                viewsArray: views,
                previewVideoArray: previewVideo,
                hrefArray: href,

            })
        }
    });

    $('.paginate-bar .status').each((i, el) => {
        const data = $(el).text().replace("page", '')
        pages = data.split('/')
    })

    if (pages.length === 0) {
        //This is for pornstar page bacause the pornstar page is not updated to new 
        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })

        if (tempArray.length !== 0) {
            pages.push(tempArray[1])
            pages.push(tempArray[tempArray.length - 2])
        }
    }


    for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

            finalDataArray.push({
                thumbnailArray: thumbnailArray[index],
                TitleArray: TitleArray[index],
                durationArray: durationArray[index],
                likedPercentArray: likedPercentArray[index],
                viewsArray: viewsArray[index],
                previewVideoArray: previewVideoArray[index],
                hrefArray: hrefArray[index],

            })
        }
    }

    if (finalDataArray.length == 0) {

        let result = { finalDataArray: finalDataArray, pages: pages, noVideos: true }
        return NextResponse.json(result, {
            status: 200,
        });


    } else {

        let result = { finalDataArray: finalDataArray, pages: pages, noVideos: false }
        return NextResponse.json(result, {
            status: 200,
        });
    }
}


