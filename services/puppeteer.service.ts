import { getPackedSettings } from 'http2';
import pup from 'puppeteer';
import * as logger from './logger';

const configBrowser = {
    headless: false, 
    ignoreDefaultArgs:['--enable-automation'],
    args: ['--blink-settings=imagesEnabled=true','--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 30000,
};

let Browser: pup.Browser;
const Pages: pup.Page[] = [];

const userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0";

export const start = async (url?: string): Promise<void> =>{
    return new Promise(async (resolve, reject)=>{
        try{
            Browser = await pup.launch(configBrowser);

            if(url){
                const pos = Pages.push(await Browser.newPage());
                const res = await Pages[pos -1].goto(url);

                if(res.status() < 200 || res.status() > 299) {
                    await logger.error("Pagina offline ou sem conexão com internet!");
                    reject();
                }
                resolve();
            }
            resolve();
        } catch(e) {
            await logger.error(e);
            reject()
        }
    });
}

export const setNewPage = (): Promise<number> => {
    return new Promise(async (resolve, reject)=>{
        try{
            const page = await Browser.newPage();
            await page.setUserAgent(userAgent);
            resolve(Pages.push(page)-1);
        } catch(e) {
            reject("Falha ao criar nova pagina");
        }
    });
}

export const getPage = (index: number): pup.Page => {
    return Pages[index];
}