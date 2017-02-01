#!/usr/bin/env node

'use strict';

const {green,red,cyan,bold}=require('colors');
const log=a=>process.stderr.write(`${a}\n`);
const prelog=a=>process.stderr.write(a);
const msg=(a,b)=>log(`${bold(`{${green(a)}}`)} ${b}`);
const err=(a,b)=>log(`${bold(`{${red(a)}}`)} ${b}`);
const prompt=a=>prelog(cyan(a));
const default_perform=()=>{err('syn','`perform` is meant for composing tasks. specify tasks you want to run on the command line.'),process.exit();};

const {resolve}=require('path'); const {existsSync:exists}=require('fs'); const cwd=process.cwd(); const synfile=resolve(cwd,'syn.js');if(exists(synfile)){global.__synthesizer__tasks__=new Map,global.__synthesizer__perform__=()=>{},require(synfile);const a=require('tabtab')({name:'syn',cache:'false'});a.on('syn',(b,c)=>{c(null,Array.from(__synthesizer__tasks__.keys()));}),a.start();}
