import { Page } from 'puppeteer';
import { getPage } from './puppeteer.service';
import { sleep } from './utils.service';

export const getAttributeValue = (selector: string, attribute: string, wait?: boolean): Promise<string | null> => {
    return new Promise(async (resolve)=>{
        try {
            const page = getPage(0);
            if(wait) {
                await waitForSelector(selector);
            } else {
                if(await page.$$eval(selector, item=>item.length<1)) resolve(null);
            }
            resolve(await page.$eval(selector, (item, attribute)=>item.getAttribute(attribute as string), attribute));
        } catch(e) {
            resolve(null);
        }
    });
}

export const waitForSelector = (selector: string): Promise<void> =>{
    return new Promise(async (resolve)=>{
        const page = getPage(0);
        let result: any = false;
        console.log(selector);
        while(!result){
            result = await page.$$eval(selector, item=>item.length>0);
            await sleep(200);
        }
        resolve();
    });
}