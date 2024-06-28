import cheerio from 'cheerio';
import { NextResponse, NextRequest } from "next/server";
import { Scrape_Video_Item } from '@/config/Scrape_Video_Item';
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



    finalDataArray= Scrape_Video_Item($)


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


