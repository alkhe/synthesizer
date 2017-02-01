#!/usr/bin/env node

'use strict';

const {green,red,cyan: cyan$1,bold}=require('colors');
const log=a=>process.stderr.write(`${a}\n`);
const prelog=a=>process.stderr.write(a);
const msg=(a,b)=>log(`${bold(`{${green(a)}}`)} ${b}`);
const err=(a,b)=>log(`${bold(`{${red(a)}}`)} ${b}`);
const prompt=a=>prelog(cyan$1(a));
const default_perform=()=>{err('syn','`perform` is meant for composing tasks. specify tasks you want to run on the command line.'),process.exit();};

const requests=process.argv.slice(2);requests.includes('-v')&&(log(`synthesizer@${require('./package.json').version}`),process.exit());const {cyan,magenta}=require('colors'); const {join}=require('path'); const {existsSync:exists}=require('fs'); const cwd=process.cwd(); const synfile=join(cwd,'syn.js');msg('syn',`starting in ${cyan(cwd)}`),exists(synfile)||(err('syn',`syn.js not found`),process.exit());const tasks=new Map;let run_task=default_perform;global.__synthesizer__tasks__=tasks,global.__synthesizer__perform__=(...a)=>{a.forEach(run_task);},require(synfile),msg('syn',`using ${cyan(synfile)}`);const task_stack=[];tasks.set('#',requests),run_task=a=>{if(msg(`:${a}`,'init'),task_stack.push(a),!tasks.has(a))throw new Error(`task ${a} not found`);const b=tasks.get(a);for(let c=0;c<b.length;c++){const d=b[c];d.constructor===String?run_task(d):d();}task_stack.pop(),msg(`:${a}`,'done');};try{run_task('#');}catch(a){log(magenta(a.stack));for(let b=task_stack.length-1;0<=b;b--)err(`:${task_stack[b]}`,`fail`);}
