'use strict';

const {green,red,cyan,bold}=require('colors');
const log=a=>process.stderr.write(`${a}\n`);
const prelog=a=>process.stderr.write(a);
const msg=(a,b)=>log(`${bold(`{${green(a)}}`)} ${b}`);
const err=(a,b)=>log(`${bold(`{${red(a)}}`)} ${b}`);
const prompt=a=>prelog(cyan(a));
const default_perform=()=>{err('syn','`perform` is meant for composing tasks. specify tasks you want to run on the command line.'),process.exit();};

const {execSync,spawnSync}=require('child_process'); const rl=require('readline-sync');rl.setDefaultOptions({prompt:''});const register=(a,...b)=>{__synthesizer__tasks__.set(a,b);}; const run=(a,b=[],c={})=>{const d=spawnSync(a,b,Object.assign({stdio:'inherit'},c));if(0!==d.status)throw new Error(`${a}[${b.join(', ')}] exited with status ${d.status}`);return d}; const shell=(a,b={})=>execSync(a,Object.assign({stdio:'inherit'},b)); const ask=(a,b={})=>{return 0<a.length&&prompt(a),rl.prompt(b)};module.exports={register,perform:__synthesizer__perform__,run,shell,ask};
