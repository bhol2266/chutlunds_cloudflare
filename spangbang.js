
import cheerio from 'cheerio';
import fs  from'fs';





 function Scrape_Video_Item($) {


    const finalDataArray = [];

    $('.main_results .video-item').each((i, el) => {

        const thumbnail = $(el).find('picture img').attr('data-src');
        const title = $(el).find('picture img').attr('alt');
        const duration = $(el).find('.l').text();

        const statsText = $(el).find('.stats').text();
        const likePercentage = statsText.substring(statsText.indexOf("%") - 4, statsText.indexOf("%") + 1).trim();
        const views = statsText.substring(0, statsText.indexOf("%") - 4).trim();

        const previewVideo = $(el).find('picture img').attr('data-preview');
        const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

        if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: duration,
                likePercentage: likePercentage,
                views: views,
                previewVideo: previewVideo,
                href: href,
            });
        }
    });

    return finalDataArray;
}





 const scrapeVideos = async () => {
    var finalDataArray = []
    var pages = []


    const response = await fetch("https://spankbang.party/s/chubby/")
    const body = await response.text();
    const $ = cheerio.load(body)

    fs.writeFile('index.html', body, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('HTML saved to index.html');
        }
    });


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


console.log(finalDataArray,pages);
}



scrapeVideos()
