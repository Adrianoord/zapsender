import * as logger from './services/logger';
import * as pupService from './services/puppeteer.service';
import { getQrCode } from './services/whats.service';

async function start() {
    pupService.start("https://web.whatsapp.com/").then(async ()=>{
        await getQrCode();
    }).catch(()=>{
        logger.error("Não foi possivel iniciar o whatsapp sender!")
    });
};

start();