import * as fs from 'fs';
import moment from 'moment';

const path = process.cwd();


export const getLogs = async (type: string)=>{
    try {
        return fs.readFileSync(path + '/logs/logger-'+ type +'.txt', 'utf8');
    } catch(e) {
        return '';
    }
}

export const info = async (message: string) => {
    const agora = moment().toLocaleString();
    let content = await getLogs('info');
    const log = agora + ' Info: ' + message;
    content = content != ''? `${content}\n${log}` : log;
    fs.writeFileSync(path + '/logs/logger-info.txt', content,'utf8');
    console.info(log);
}

export const error = async (message: string) => {
    const agora = moment().toLocaleString();
    let content = await getLogs('error');
    const log = agora + ' Error: ' + message;
    content = content != ''? `${content}\n${log}` : log;
    fs.writeFileSync(path + '/logs/logger-error.txt', content,'utf8');
    console.error(log);
}

export const debug = async (message: string) => {
    const agora = moment().toLocaleString();
    let content = await getLogs('debug');
    const log = agora + ' Debug: ' + message;
    content = content != ''? `${content}\n${log}` : log;
    fs.writeFileSync(path + '/logs/logger-debug.txt', content,'utf8');
    console.debug(log);
}

export const log = async (message: string) => {
    const agora = moment().toLocaleString();
    let content = await getLogs('log');
    const log = agora + ' Log: ' + message;
    content = content != ''? `${content}\n${log}` : log;
    fs.writeFileSync(path + '/logs/logger-log.txt', content,'utf8');
    console.log(log);
}