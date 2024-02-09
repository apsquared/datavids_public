import * as cheerio from 'cheerio';


export async function extractTextFromURL(url: string): Promise<string> {
    try {
        // Fetching the HTML content of the webpage
        const response = await fetch(url);
        const html = await response.text();

        // Using cheerio to parse the HTML content
        const $ = cheerio.load(html);
        let text = '';

        // Extracting text from specific HTML elements
        $('body').find(' h1 ').each((index, element) => {
            text += $(element).text() + ' ';
        });

        $('body').find(' h2 ').each((index, element) => {
            text += $(element).text() + ' ';
        });

        $('body').find(' h3, h4, h5, h6').each((index, element) => {
            text += $(element).text() + ' ';
        });


        return text.trim();
    } catch (error) {
        console.error('Error fetching webpage:', error);
        return '';
    }
}

// Example usage
