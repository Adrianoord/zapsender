import { getAttributeValue } from './pupFunctions.service';
import { getPage } from './puppeteer.service';
import * as qrcodeTerminal from 'qrcode-terminal';
import { sleep } from './utils.service';

const filter = [
    {str: "*nome*", key:"nome"},
];

export const sendMessage = async (tel: any, message: string) => {
    const page = getPage(0);

    
}

export const getQrCode = async (): Promise<string | null> => {
    return new Promise(async (resolve)=>{
        let resultOld = await getAttributeValue('[data-ref]', 'data-ref', true);
        let resultNew = resultOld;
        qrcodeTerminal.generate(resultNew? resultNew : '', {small:true});
        let done  = false;
        while(!done) {
            resultOld = await getAttributeValue('[data-ref]', 'data-ref');
            if(resultOld && resultOld != resultNew) {
                resultNew = resultOld;
                qrcodeTerminal.generate(resultNew? resultNew : '', {small:true});
            }
            if(!resultOld) {
                done = true;
            }
            await sleep(200);
        }
        console.log("Conectado!");
        resolve(resultNew);
    });
}