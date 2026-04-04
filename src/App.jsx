import React, { useState, useRef } from "react";

const APP_VERSION = "2.4";

const G = "#c9a84c";
const GL = "#e8d48a";
const BG = "#07070f";
const S1 = "#0f0f1e";
const S2 = "#17172a";
const TX = "#f0ede8";
const MU = "#787896";
const HC = "#d4d4e2";
const FC = "#f4a0b5";
const MC = "#7ec89a";
const RD = "#e05050";

const DEMO_PERFUMES = [
  { id:1,   name:"One Million",          brand:"P. Rabanne",          ref:"001", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:2,   name:"Acqua Di Gio",         brand:"G. Armani",           ref:"002", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:3,   name:"Fahrenheit",           brand:"C. Dior",             ref:"003", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:4,   name:"The One",              brand:"D&G",                 ref:"004", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:5,   name:"Opium",                brand:"Y. Saint Laurent",    ref:"006", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:6,   name:"J'Adore",              brand:"C. Dior",             ref:"007", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:7,   name:"Alien",                brand:"T. Mugler",           ref:"010", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:8,   name:"Light Blue femme",     brand:"D&G",                 ref:"011", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:9,   name:"Eau Sauvage",          brand:"C. Dior",             ref:"012", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:10,  name:"Manifesto",            brand:"Y. Saint Laurent",    ref:"014", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:11,  name:"Roma",                 brand:"L. Biagiotti",        ref:"015", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:12,  name:"Le Male",              brand:"JP. Gaultier",        ref:"016", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:13,  name:"Declaration",          brand:"Cartier",             ref:"018", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:14,  name:"Lady Million",         brand:"P. Rabanne",          ref:"019", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:15,  name:"La Nuit de l'Homme",   brand:"Y. Saint Laurent",    ref:"020", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:16,  name:"Light Blue homme",     brand:"D&G",                 ref:"021", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:17,  name:"Terre d'Hermes",       brand:"Hermes",              ref:"022", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:18,  name:"Hypnotic Poison",      brand:"C. Dior",             ref:"023", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:19,  name:"Chanel n5",            brand:"Chanel",              ref:"024", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:20,  name:"For Her",              brand:"N. Rodriguez",        ref:"025", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:21,  name:"Flower",               brand:"Kenzo",               ref:"026", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:22,  name:"Tresor",               brand:"Lancome",             ref:"027", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:23,  name:"Angel",                brand:"T. Mugler",           ref:"028", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:24,  name:"Eau D'Issey",          brand:"I. Miyake",           ref:"029", gender:"femme", sizes:["100ml","30ml","15ml"],prices:{"100ml":35,"30ml":18,"15ml":11.90} },
  { id:25,  name:"Black XS",             brand:"P. Rabanne",          ref:"030", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:26,  name:"Spice Bomb",           brand:"Viktor & Rolf",       ref:"032", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:27,  name:"Black Code",           brand:"G. Armani",           ref:"033", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:28,  name:"Man",                  brand:"Bvlgari",             ref:"037", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:29,  name:"Bleu",                 brand:"Chanel",              ref:"038", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:30,  name:"Miss Dior Cherie",     brand:"C. Dior",             ref:"039", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:31,  name:"Hypnose",              brand:"Lancome",             ref:"040", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:32,  name:"La Vie est Belle",     brand:"Lancome",             ref:"042", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:33,  name:"Silver Montain Water", brand:"Creed",               ref:"044", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:34,  name:"Crystal Noir",         brand:"Versace",             ref:"047", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:35,  name:"Allure homme",         brand:"Chanel",              ref:"048", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:36,  name:"Dolce",                brand:"D&G",                 ref:"049", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:37,  name:"Coco Mademoiselle",    brand:"Chanel",              ref:"051", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:38,  name:"Pasha 150",            brand:"Cartier",             ref:"052", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:39,  name:"Narciso",              brand:"N. Rodriguez",        ref:"053", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:40,  name:"Black Orchid",         brand:"T. Ford",             ref:"054", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:41,  name:"Black Opium",          brand:"Y. Saint Laurent",    ref:"055", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:42,  name:"Ange ou Demon",        brand:"Givenchy",            ref:"056", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:43,  name:"Omnia Amethyste",      brand:"Bvlgari",             ref:"057", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:44,  name:"Invictus",             brand:"P. Rabanne",          ref:"061", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:45,  name:"Intenso",              brand:"D&G",                 ref:"062", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:46,  name:"Omnia Indian Garnet",  brand:"Bvlgari",             ref:"064", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:47,  name:"Olympea",              brand:"P. Rabanne",          ref:"067", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:48,  name:"Aventus",              brand:"Creed",               ref:"068", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:49,  name:"Acqua di Sale",        brand:"P. Roma",             ref:"069", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:50,  name:"The One femme",        brand:"D&G",                 ref:"070", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:51,  name:"Allure femme",         brand:"Chanel",              ref:"071", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:52,  name:"Patchouli",            brand:"Reminiscence",        ref:"072", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:53,  name:"Himalaya",             brand:"Creed",               ref:"073", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:54,  name:"Black Afgano",         brand:"Nasomatto",           ref:"074", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:55,  name:"X for Men",            brand:"Clive Christian",     ref:"075", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:56,  name:"Acqua di Gioia",       brand:"G. Armani",           ref:"076", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:57,  name:"Myslf",                brand:"Y. Saint Laurent",    ref:"079", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:58,  name:"Si",                   brand:"G. Armani",           ref:"080", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:59,  name:"Classique Essence",    brand:"JP. Gaultier",        ref:"081", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:60,  name:"Signorina",            brand:"S. Ferragamo",        ref:"082", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:61,  name:"Dylan Blue",           brand:"Versace",             ref:"084", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:62,  name:"Chance",               brand:"Chanel",              ref:"085", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:63,  name:"Legend",               brand:"Mont Blanc",          ref:"086", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:64,  name:"Wanted",               brand:"Azzaro",              ref:"087", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:65,  name:"Man in Black",         brand:"Bvlgari",             ref:"088", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:66,  name:"Mon Paris",            brand:"Y. Saint Laurent",    ref:"089", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:67,  name:"Poison Girl",          brand:"C. Dior",             ref:"090", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:68,  name:"Chrome",               brand:"Azzaro",              ref:"091", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:69,  name:"Aventus for Her",      brand:"Creed",               ref:"093", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:70,  name:"Sauvage",              brand:"C. Dior",             ref:"094", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:71,  name:"Gabrielle",            brand:"Chanel",              ref:"095", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:72,  name:"Amo Ferragamo",        brand:"S. Ferragamo",        ref:"097", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:73,  name:"Joy",                  brand:"C. Dior",             ref:"098", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:74,  name:"Mandarino di Amalfi",  brand:"T. Ford",             ref:"099", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:75,  name:"White Aoud",           brand:"Montale",             ref:"100", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:76,  name:"Velvet Amber Skin",    brand:"D&G",                 ref:"101", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:77,  name:"Velvet Amber Sun",     brand:"D&G",                 ref:"102", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:78,  name:"Intense Cafe",         brand:"Montale",             ref:"105", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:79,  name:"Fucking Fabulous",     brand:"T. Ford",             ref:"106", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:80,  name:"J'Adore l'Or",         brand:"C. Dior",             ref:"109", gender:"femme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:81,  name:"Kirke",                brand:"T. Terenzi",          ref:"110", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:82,  name:"Lost Cherry",          brand:"T. Ford",             ref:"111", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:83,  name:"Neroli Portofino",     brand:"T. Ford",             ref:"112", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:84,  name:"Sur la Route",         brand:"L. Vuitton",          ref:"113", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:85,  name:"Ombre Nomade",         brand:"L. Vuitton",          ref:"114", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:86,  name:"Idole",                brand:"Lancome",             ref:"115", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:87,  name:"Yes I Am",             brand:"Cacharel",            ref:"116", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:88,  name:"Tobacco Vanille",      brand:"T. Ford",             ref:"117", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:89,  name:"Baccarat Rouge 540",   brand:"Maison Francis K.",   ref:"118", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:90,  name:"Scandal",              brand:"JP. Gaultier",        ref:"119", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:91,  name:"La Petite Robe Noire", brand:"Guerlain",            ref:"120", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:92,  name:"L'Interdit",           brand:"Givenchy",            ref:"121", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:93,  name:"Libre",                brand:"Y. Saint Laurent",    ref:"122", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:94,  name:"Good Girl Gone Bad",   brand:"Kilian",              ref:"123", gender:"femme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:95,  name:"Zeta",                 brand:"Morph",               ref:"124", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:96,  name:"Sole di Positano Aqua",brand:"T. Ford",             ref:"125", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:97,  name:"Soleil Blanc",         brand:"T. Ford",             ref:"126", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:98,  name:"Oud Wood",             brand:"T. Ford",             ref:"127", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:99,  name:"Vanille Fatale",       brand:"T. Ford",             ref:"128", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:100, name:"Erba Pura",            brand:"Xerjoff",             ref:"129", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:101, name:"Megamare",             brand:"Orto Parisi",         ref:"130", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:102, name:"Good Girl",            brand:"C. Herrera",          ref:"131", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:103, name:"My Way",               brand:"G. Armani",           ref:"132", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:104, name:"Prada Paradoxe",       brand:"Prada",               ref:"133", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:105, name:"Bitter Peach",         brand:"T. Ford",             ref:"134", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:106, name:"Bois d'Argent",        brand:"C. Dior",             ref:"135", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:107, name:"Dior Homme Intense",   brand:"C. Dior",             ref:"136", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:108, name:"XJ 1861 Naxos",        brand:"Xerjoff",             ref:"137", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:109, name:"Whood Whisper",        brand:"Ojar",                ref:"138", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:110, name:"Les Sables Roses",     brand:"Louis Vuitton",       ref:"139", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:111, name:"Eros",                 brand:"Versace",             ref:"140", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:112, name:"Turath",               brand:"The Spirit of Dubai", ref:"141", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:113, name:"Ombre Leather",        brand:"Tom Ford",            ref:"142", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:114, name:"Vanille Powder",       brand:"Matiere Premiere",    ref:"143", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:115, name:"Bianco Latte",         brand:"Giardini di Toscana", ref:"144", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:116, name:"Devotion",             brand:"D&G",                 ref:"145", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:117, name:"Rouge",                brand:"Balmain",             ref:"146U",gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:118, name:"BOSS Bottled Absolu",  brand:"H. Boss",             ref:"147M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:119, name:"Goddess",              brand:"Burberry",            ref:"148W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:120, name:"Hugo homme",           brand:"H. Boss",             ref:"150M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:121, name:"Guilty femme",         brand:"Gucci",               ref:"151W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:122, name:"Guilty homme",         brand:"Gucci",               ref:"152M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:123, name:"Chloe",                brand:"Chloe",               ref:"153W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:124, name:"Love Chloe",           brand:"Chloe",               ref:"154W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:125, name:"CK One",               brand:"C. Klein",            ref:"155U",gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:126, name:"Hugo femme",           brand:"H. Boss",             ref:"156W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:127, name:"The Scent",            brand:"H. Boss",             ref:"157W",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:128, name:"Flora",                brand:"Gucci",               ref:"158W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:129, name:"Burberry femme",       brand:"Burberry",            ref:"159W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:130, name:"Burberry for Men",     brand:"Burberry",            ref:"160M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:131, name:"Born In Roma Intense femme",brand:"Valentino",      ref:"161W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:132, name:"Born In Roma Intense homme",brand:"Valentino",      ref:"162M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
];

const CHECKLIST0 = [
  { id:1,  text:"Inscription Limitless" },
  { id:2,  text:"Module : Demarrage" },
  { id:3,  text:"Module : Les bases du succes" },
  { id:4,  text:"Module : Marketing d'action" },
  { id:5,  text:"Module : L'art de mieux vendre" },
  { id:6,  text:"Module : Gammes Chogan" },
  { id:7,  text:"Module : TikTok Academy" },
  { id:8,  text:"Module : Marketing d'attraction en MLM" },
  { id:9,  text:"Liste de contacts" },
  { id:10, text:"Effectuer ta premiere vente" },
].map(i => ({ ...i, done: false }));

const SCRIPTS = [
  { id:1, title:"Contact naturel", ctx:"Personne que tu connais",
    text:"Salut [Prenom] ! J'ai pense a toi — je viens de commencer quelque chose de super avec les parfums Chogan. Des fragrances de qualite luxe a prix accessible, livrees a domicile. Tu voudrais qu'on en parle 5 min ?",
    tip:"Toujours personnaliser avec le prenom. Finir par une question ouverte." },
  { id:2, title:"Relance douce", ctx:"Prospect sans reponse",
    text:"Coucou [Prenom] ! Je repasse te voir car j'avais pense a toi. Est-ce que c'est encore un bon moment pour en parler ? Pas de pression du tout !",
    tip:"Ne pas relancer plus de 2 fois. Rester leger et bienveillant." },
  { id:3, title:"Invitation atelier parfum", ctx:"Decouverte produit",
    text:"Hey [Prenom] ! J'organise un petit atelier parfum chez moi [Date]. On teste les fragrances — c'est sympa et sans obligation d'achat. Tu passes ?",
    tip:"L'atelier cree la confiance et facilite les ventes naturellement." },
  { id:4, title:"Opportunite business", ctx:"Recrutement consultant",
    text:"[Prenom], je sais que tu cherches a arrondir tes fins de mois. Est-ce que tu es ouverte a decouvrir comment certaines personnes gagnent 300 a 1500 euros/mois en recommandant des parfums ?",
    tip:"Cibler des profils entrepreneur ou en recherche de revenus complementaires." },
];

const QUIZ = [
  { id:1,  q:"Quelle est la difference entre les familles Fougere et Chypree ?",
    opts:["Fougere = boise aquatique, Chypree = floral oriental","Fougere = lavande/geranium/viril, Chypree = bergamote/jasmin/caractere","Fougere = femme, Chypree = homme","Aucune difference notable"],
    correct:1 },
  { id:2,  q:"Une cliente aime les parfums chauds, sensuels et qui laissent un sillage. Quelle famille lui recommandes-tu ?",
    opts:["Hesperidee","Fleurie","Ambree/Orientale","Fougere"],
    correct:2 },
  { id:3,  q:"Ton lien de parrainage CLIENT genere des CP. A quoi servent ces CP ?",
    opts:["A payer tes commandes personnelles","A debloquer des remises sur les prochaines commandes de tes clientes","A calculer ta commission mensuelle","A acceder aux catalogues exclusifs"],
    correct:1 },
  { id:4,  q:"Dans le Programme Ambassadeur, a partir de quel niveau accedes-tu aux voyages et recompenses exclusives ?",
    opts:["Des l'inscription","A partir du statut Silver","A partir du statut Gold","A partir du statut Platinium"],
    correct:3 },
  { id:5,  q:"Une cliente veut un parfum dynamique et sportif. Quelle famille olfactive convient le mieux ?",
    opts:["Orientale/Ambree","Aromatique","Boisee","Fleurie"],
    correct:1 },
  { id:6,  q:"Combien de modules de formation sont disponibles sur Limitless ?",
    opts:["4 modules","6 modules","7 modules","10 modules"],
    correct:2 },
  { id:7,  q:"Quelle est la bonne demarche pour creer ton espace consultant Chogan ?",
    opts:["Demander a Marie de le faire","S'inscrire sur mylimitless.be","S'inscrire sur chogan.eu avec son lien de parrainage","Envoyer un email a Chogan"],
    correct:2 },
  { id:8,  q:"Que contient obligatoirement la mallette de demarrage ?",
    opts:["Uniquement des catalogues papier","Des flacons testeurs pour presenter les parfums a tes clientes","Seulement des documents administratifs","Des bons de commande pre-remplis"],
    correct:1 },
  { id:9,  q:"Quelle est l'ERREUR a ne pas faire lors de l'envoi du lien parrainage ?",
    opts:["L'envoyer par WhatsApp","Envoyer le lien CONSULTANT a la place du lien CLIENT","Preciser que c'est sans engagement","Personnaliser le message"],
    correct:1 },
  { id:10, q:"Un homme de 45 ans cherche un parfum sur de lui, mature et precieux. Quelle famille ?",
    opts:["Hesperidee","Aromatique","Boisee","Fougere"],
    correct:2 },
  { id:11, q:"Dans le Programme Ambassadeur, que se passe-t-il si tu n'atteins pas ton objectif mensuel ?",
    opts:["Tu perds definitivement ton statut","Tu repasses au niveau inferieur pour le mois suivant","Tu es exclue de l'equipe","Rien, le programme est sans condition"],
    correct:1 },
  { id:12, q:"La famille Hesperidee est SURTOUT adaptee a quel type de cliente ?",
    opts:["Femme mature qui aime les parfums intenses","Personne de tout age recherchant fraicheur et legerete","Homme cherchant un parfum viril","Femme elegante appreciant les fleurs"],
    correct:1 },
  { id:13, q:"Quelle est la concentration des parfums Chogan par rapport aux grandes marques ?",
    opts:["Inferieure (10-15%)","Equivalente (20-30% concentration luxe)","Superieure (50%)","Variable selon les references"],
    correct:1 },
  { id:14, q:"Pour maximiser tes ventes, dans quel ordre dois-tu utiliser tes outils Limitless ?",
    opts:["Quiz - Scripts - Modules","Modules - Scripts - Quiz","Scripts - Modules - Quiz","L'ordre n'a pas d'importance"],
    correct:1 },
  { id:15, q:"Une cliente hesite entre deux parfums Chypres. Comment l'orienter efficacement ?",
    opts:["Lui donner les deux et voir","Lui demander si elle prefere fruite (Chypre Fruite) ou floral (Chypre Floral)","Lui recommander toujours le plus cher","Lui dire de consulter le catalogue seule"],
    correct:1 },
];

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzOBoyWxfPgf_8r37SmXAd4fQVGwAFlyW0bUu1LVgWHGkpWe_rvosJSHppKa3M3UFYaCg/exec";

function trackAction(prenom, onglet, action) {
  try {
    const params = new URLSearchParams({ prenom: prenom||"Anonyme", onglet, action });
    fetch(SHEET_URL + "?" + params.toString(), { method:"GET", mode:"no-cors" });
  } catch(e) {}
}

async function getMurs() {
  try {
    const res = await fetch(SHEET_URL + "?action=getMurs");
    return await res.json();
  } catch(e) { return null; }
}

async function saveMurs(anns, sucs) {
  try {
    const params = new URLSearchParams({ action:"saveMurs", anns:JSON.stringify(anns), sucs:JSON.stringify(sucs) });
    fetch(SHEET_URL + "?" + params.toString(), { method:"GET", mode:"no-cors" });
  } catch(e) {}
}

const gc = g => g === "homme" ? HC : g === "femme" ? FC : MC;
const gc2 = g => g==="homme" ? "#d4d4e2" : g==="femme" ? "#f4a0b5" : "#7ec89a";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{background:#07070f;color:#f0ede8;font-family:'DM Sans',system-ui,sans-serif;min-height:100vh;-webkit-tap-highlight-color:transparent;}
.app{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:row;overflow-x:hidden;}
.lnav{width:52px;min-height:100vh;background:#0a0a1a;border-right:0.5px solid rgba(201,168,76,.12);display:flex;flex-direction:column;align-items:center;padding:8px 0;position:fixed;left:0;top:0;z-index:200;overflow-y:auto;}
.lnav-inner{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;}
.nb{width:52px;border:none;background:transparent;color:#787896;padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;transition:color .15s;font-family:'DM Sans',sans-serif;}
.nb.on{color:#c9a84c;}
.nic{font-size:18px;line-height:1;}
.nlbl{font-size:7px;letter-spacing:.3px;text-transform:uppercase;text-align:center;line-height:1.2;}
.content-wrap{flex:1;margin-left:52px;min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden;max-width:378px;}
.hdr{background:#0a0a1a;border-bottom:0.5px solid rgba(201,168,76,.18);padding:12px 14px;display:flex;align-items:center;position:sticky;top:0;z-index:100;}
.logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-weight:700;color:#c9a84c;letter-spacing:3px;text-transform:uppercase;}
.hdr-sub{margin-left:auto;font-size:9px;color:#787896;letter-spacing:2px;text-transform:uppercase;}
.main{flex:1;overflow-y:auto;}
.card{background:#0f0f1e;border:0.5px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:10px;}
.cardg{background:#0f0f1e;border:0.5px solid rgba(201,168,76,.22);border-radius:12px;padding:14px;margin-bottom:10px;}
.sh{padding:18px 18px 0;display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;}
.shtitle{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:600;color:#c9a84c;}
.sb{padding:12px 18px;}
.btn-p{background:linear-gradient(135deg,#c9a84c,#a8872e);color:#07070f;border:none;border-radius:50px;padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;letter-spacing:.8px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 20px rgba(201,168,76,.25);transition:opacity .15s;}
.btn-p:hover{opacity:.88;}
.btn-o{background:transparent;color:#c9a84c;border:0.5px solid rgba(201,168,76,.4);border-radius:8px;padding:7px 14px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .15s;}
.btn-o:hover{background:rgba(201,168,76,.07);}
.btn-d{background:transparent;color:#e05050;border:0.5px solid rgba(224,80,80,.28);border-radius:8px;padding:5px 12px;font-size:11px;font-family:'DM Sans',sans-serif;cursor:pointer;}
.ftabs{display:flex;gap:6px;padding:10px 18px;overflow-x:auto;scrollbar-width:none;}
.ftabs::-webkit-scrollbar{display:none;}
.ftab{background:#0f0f1e;border:0.5px solid rgba(255,255,255,.07);color:#787896;border-radius:20px;padding:5px 13px;font-size:12px;white-space:nowrap;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;}
.ftab.on{background:rgba(201,168,76,.1);border-color:#c9a84c;color:#c9a84c;}
.srch{width:calc(100% - 36px);margin:0 18px 10px;background:#0f0f1e;border:0.5px solid rgba(255,255,255,.07);color:#f0ede8;border-radius:10px;padding:9px 13px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;}
.srch:focus{border-color:rgba(201,168,76,.32);}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 18px 14px;}
.pcrd{background:#0f0f1e;border-radius:10px;padding:11px;border-left:3px solid;transition:transform .12s;}
.pcrd:hover{transform:scale(1.015);}
.ci{display:flex;align-items:flex-start;gap:11px;padding:11px;border-radius:10px;background:#0f0f1e;margin-bottom:7px;cursor:pointer;transition:background .12s;}
.ci:hover{background:#17172a;}
.cbox{width:21px;height:21px;border-radius:6px;border:1.5px solid rgba(201,168,76,.38);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .15s;}
.cbox.ck{background:#c9a84c;border-color:#c9a84c;}
.pbar-w{height:6px;background:rgba(255,255,255,.05);border-radius:10px;overflow:hidden;margin:6px 0;}
.pbar{height:100%;background:linear-gradient(90deg,#c9a84c,#e8d48a);border-radius:10px;transition:width .3s ease;}
.scrd{background:#0f0f1e;border-radius:12px;margin-bottom:9px;border:0.5px solid rgba(255,255,255,.06);overflow:hidden;}
.shdr{padding:13px 15px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;}
.upz{margin:0 18px 10px;border:1.5px dashed rgba(201,168,76,.28);border-radius:14px;padding:22px;text-align:center;cursor:pointer;background:rgba(201,168,76,.02);transition:all .15s;}
.upz:hover{border-color:#c9a84c;background:rgba(201,168,76,.05);}
.qopt{background:#0f0f1e;border:0.5px solid rgba(255,255,255,.07);border-radius:8px;padding:9px 13px;margin-bottom:5px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;color:#f0ede8;width:100%;text-align:left;transition:all .12s;}
.qopt:hover{border-color:rgba(201,168,76,.28);}
.qopt.sel{border-color:#c9a84c;background:rgba(201,168,76,.08);color:#c9a84c;}
.qopt.ok{border-color:#7ec89a;background:rgba(126,200,154,.08);color:#7ec89a;}
.qopt.ko{border-color:#e05050;background:rgba(224,80,80,.07);color:#e05050;}
.div{height:0.5px;background:rgba(255,255,255,.05);margin:4px 0 12px;}
.inp{background:#0f0f1e;border:0.5px solid rgba(255,255,255,.09);color:#f0ede8;border-radius:8px;padding:9px 12px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;width:100%;}
.inp:focus{border-color:rgba(201,168,76,.32);}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10px;font-weight:500;}
.rlink{display:flex;align-items:center;gap:13px;padding:13px 15px;background:#0f0f1e;border-radius:12px;margin-bottom:8px;border:0.5px solid rgba(255,255,255,.06);cursor:pointer;transition:background .12s;color:#f0ede8;text-decoration:none;}
.rlink:hover{background:#17172a;}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.fi{animation:fi .24s ease forwards;}
`;

const FAMILLES = [
  { id:"ambree", emoji:"🟠", nom:"Ambree / Orientale", couleur:"#c97c3a", style:"CHAUD - SENSUEL - ENVOUTANT",
    notes:"Vanille, ambroxan, amande, patchouli, benjoin, resines...",
    pourQui:"Toute personne qui aime seduire, plaire, laisser un sillage.",
    sousFamilles:[
      { n:"Ambre Epice",    refs:["6 - Opium","33 - Black Code","117 - Tobacco Vanille"] },
      { n:"Ambre Aquatique",refs:["130 - Megamare"] },
      { n:"Ambre Boise",    refs:["10 - Alien","15 - Roma","30 - Black XS","37 - Man","48 - Allure","72 - Patchouli","73 - Himalaya","102 - Velvet Amber Sun","114 - Ombre Nomade","127 - Oud Wood","141 - Turath"] },
      { n:"Ambre",          refs:["83 - Uomo","101 - Velvet Amber Skin","124 - Zeta","129 - Erba Pura"] },
      { n:"Ambre Floral",   refs:["13 - Guilty","14 - Manifesto","26 - Flower","27 - Tresor","41 - Chloe","47 - Crystal Noir","51 - Coco Mademoiselle","56 - Ange ou Demon","64 - Omnia Indian Garnet","67 - Olympea","70 - The One","81 - Classique Essence"] },
      { n:"Oriental Vanille",refs:["23 - Hypnotic Poison","28 - Angel","40 - Hypnose","55 - Black Opium","71 - Allure","90 - Poison Girl","111 - Lost Cherry","116 - Yes I Am","118 - Baccarat Rouge","121 - L'Interdit","126 - Soleil Blanc","128 - Vanille Fatale","131 - Good Girl","133 - Paradoxe","134 - Bitter Peach","139 - Les Sables Roses","143 - Vanilla Powder","144 - Bianco Latte","54 - Black Orchid","88 - Man in Black"] },
    ]},
  { id:"fleurie", emoji:"🌸", nom:"Fleurie", couleur:"#d45c8a", style:"ELEGANCE - FEMINITE",
    notes:"Rose, jasmin, fleur d'oranger, tubereuse, geranium...",
    pourQui:"Principalement pour les femmes, feminines, elegantes.",
    sousFamilles:[
      { n:"Floral Aldehydee",   refs:["24 - Chanel N5"] },
      { n:"Floral Boise Musque",refs:["25 - For Her","43 - Love Chloe","53 - Narciso","57 - Omnia Amethyste","98 - Joy","100 - White Aoud"] },
      { n:"Floral",             refs:["49 - Dolce","77 - Flora","96 - Gabrielle","132 - My Way"] },
      { n:"Floral Fruite",      refs:["7 - J'Adore","11 - Light Blue","19 - Lady Million","42 - La Vie est Belle","82 - Signorina","95 - Burberry","120 - La Petite Robe Noire","123 - Good Girl Gone Bad"] },
      { n:"Floral Aquatique",   refs:["29 - Eau d'Issey","76 - Acqua di Gioia"] },
    ]},
  { id:"boisee", emoji:"🪵", nom:"Boisee", couleur:"#8b6242", style:"LUXUEUX - CHALEUREUX - PRECIEUX",
    notes:"Essences, mousses de bois, cedre, bois de santal, tabac...",
    pourQui:"Principalement des hommes, surs d'eux, ayant une certaine maturite.",
    sousFamilles:[
      { n:"Boise Aromatique",   refs:["17 - Guilty","38 - Bleu","50 - Burberry for Men","52 - Pasha","62 - Intenso","74 - Black Afgano"] },
      { n:"Boise Floral Musque",refs:["3 - Fahrenheit","18 - Declaration","136 - Dior Homme Intense"] },
      { n:"Boise",              refs:["138 - Wood Whisper"] },
      { n:"Boise Epice",        refs:["1 - One Million","4 - The One","20 - La Nuit de l'Homme","22 - Terre d'Hermes","32 - Spice Bomb","87 - Wanted"] },
      { n:"Boise Chypre",       refs:["135 - Bois d'Argent"] },
      { n:"Boise Aquatique",    refs:["61 - Invictus","69 - Acqua di Sale"] },
    ]},
  { id:"aromatique", emoji:"🌿", nom:"Aromatique", couleur:"#5a8a5a", style:"SOBRE - VIF - MASCULIN",
    notes:"Sauge, laurier, lavande, romarin, menthe...",
    pourQui:"Femmes dynamiques/sportives. Hommes charismatiques, actifs.",
    sousFamilles:[
      { n:"Aromatique Fougere",  refs:["140 - Eros"] },
      { n:"Aromatique Vert",     refs:["63 - Hugo femme","5 - Hugo homme"] },
      { n:"Aromatique",          refs:["44 - Silver Mountain Water"] },
      { n:"Aromatique Epice",    refs:["65 - The Scent","137 - XJ 1861 Naxos"] },
      { n:"Aromatique Aquatique",refs:["2 - Acqua di Gio"] },
    ]},
  { id:"chypree", emoji:"🍃", nom:"Chypree", couleur:"#4a7a4a", style:"CHARISMATIQUE - AFFIRME - CARACTERE",
    notes:"Bergamote, jasmin, mousse de chene, patchouli...",
    pourQui:"Femmes et hommes avec de forte personnalite.",
    sousFamilles:[
      { n:"Chypre Fruite",refs:["39 - Miss Dior Cherie","68 - Aventus","80 - Si","93 - Aventus for Her","110 - Kirke"] },
      { n:"Chypre Floral",refs:["85 - Chance","89 - Mon Paris","115 - Idole","119 - Scandal"] },
    ]},
  { id:"hesperidee", emoji:"🍋", nom:"Hesperidee", couleur:"#b8a030", style:"FRAIS - LEGER - FRUITE",
    notes:"Agrumes, citron, mandarine, orange, bergamote...",
    pourQui:"Personnes de tout age en quete de fraicheur et de legerete.",
    sousFamilles:[
      { n:"Hesperides Aromatiques",refs:["12 - Eau Sauvage","21 - Light Blue","46 - CK One","91 - Chrome","99 - Mandarino di Amalfi","112 - Neroli Portofino","113 - Sur la Route"] },
      { n:"Hesperides",            refs:["125 - Sole di Positano"] },
    ]},
  { id:"fougere", emoji:"🫧", nom:"Fougere", couleur:"#6a6aba", style:"VIRIL - PUISSANT - VIVIFIANT",
    notes:"Lavande, geranium, mousse de chene, labdanum, vetiver...",
    pourQui:"Des hommes essentiellement, degageant une certaine virilite.",
    sousFamilles:[
      { n:"Fougere Ambre/Oriental",refs:["16 - Le Male","75 - X for Men","122 - Libre"] },
      { n:"Fougere Aromatique",    refs:["84 - Blue Dylan","86 - Legend","94 - Sauvage"] },
      { n:"Cuire",                 refs:["106 - Fucking Fabulous","142 - Ombre Leather"] },
    ]},
];

const CATALOGUES = [
  { ic:"🌸", titre:"Parfums",              url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1739360788_documents", desc:"Collection complete 15ml - 30ml - 50ml - 70ml" },
  { ic:"🏠", titre:"Parfums d'ambiance",   url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736340849_documents", desc:"Diffuseurs & senteurs maison" },
  { ic:"💧", titre:"Les Huiles",           url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1732103472_documents", desc:"Huiles essentielles & concentrees" },
  { ic:"🌿", titre:"LOLUM (huiles)",       url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1728551530_documents", desc:"Gamme huiles LOLUM" },
  { ic:"💄", titre:"Maquillage",           url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1741095206_documents", desc:"Rouge a levres, fond de teint, yeux..." },
  { ic:"🕶", titre:"Lunettes de soleil",   url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740996419_documents", desc:"Collection lunettes tendance" },
  { ic:"🧹", titre:"Produits menagers",    url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1738679717_documents", desc:"Nettoyants & entretien maison" },
  { ic:"🌱", titre:"Bien-etre (Aurodhea)", url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736256904_documents", desc:"Complements & soins bien-etre" },
  { ic:"💊", titre:"Peptilux",             url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740410027_documents", desc:"Gamme Peptilux" },
  { ic:"💪", titre:"Supplefit",            url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1733905272_documents", desc:"Nutrition sportive & forme" },
];

const PRODUITS_PROMO = [
  { id:"etuis", nom:"Etuis Simple",  prixEur:9.10,  transportDzd:1.80, emballage:0    },
  { id:"cuir",  nom:"Etui Cuire",    prixEur:10.50, transportDzd:1.80, emballage:0    },
  { id:"15ml",  nom:"15 ML",         prixEur:5.95,  transportDzd:1.80, emballage:0.48 },
  { id:"30ml",  nom:"30 ML",         prixEur:9.00,  transportDzd:1.80, emballage:0.48 },
  { id:"70ml",  nom:"70 ML",         prixEur:17.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux1",  nom:"Luxury 22,50",  prixEur:22.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux2",  nom:"Luxury 23",     prixEur:23.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux3",  nom:"Luxury 24",     prixEur:24.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux4",  nom:"Luxury 26",     prixEur:26.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux5",  nom:"Luxury 28,50",  prixEur:28.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux6",  nom:"Luxury 32,50",  prixEur:32.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux7",  nom:"Luxury 35,50",  prixEur:35.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux8",  nom:"Luxury 38,75",  prixEur:38.75, transportDzd:1.80, emballage:0.48 },
];

const CODES_VALIDES = [
  "SHAC7CB8F","TRAEB240A","MIL1B11E0","SEL2D06DE","YASD2F154",
  "ISA98670B","BLABC677B","BAY2CAEB0","SOPB7D832","NAD7354BF",
  "SAR0E4537","NAD93A481","MELB42DE5","CAS04EBF2","SOU36AE1C",
  "ADA7DBE89","KAR96A897","MER2105D7","NO81BN48","YAS2794C9",
  "KHAE674E2",  // Khayra Benyoucef
];

// ── COMPOSANTS ────────────────────────────────────────────────────

function UpdateBanner() {
  const key = "chogan_version";
  const [visible, setVisible] = useState(localStorage.getItem(key) !== APP_VERSION);
  if (!visible) return null;
  return (
    <div style={{ position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"linear-gradient(135deg,#c9a84c,#a8872e)",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,boxShadow:"0 2px 12px rgba(201,168,76,.4)" }}>
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
        <span style={{ fontSize:18 }}>✨</span>
        <div>
          <p style={{ fontSize:12,fontWeight:700,color:"#07070f" }}>Nouvelle mise a jour disponible !</p>
          <p style={{ fontSize:10,color:"rgba(0,0,0,.6)" }}>Ferme et rouvre l'app — v{APP_VERSION}</p>
        </div>
      </div>
      <button onClick={()=>{ localStorage.setItem(key,APP_VERSION); setVisible(false); }}
        style={{ background:"rgba(0,0,0,.15)",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,color:"#07070f",cursor:"pointer" }}>
        OK ✓
      </button>
    </div>
  );
}

function LoginView({ onLogin }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = () => {
    if (!prenom.trim()||!nom.trim()) { setErr("Merci d'entrer ton prenom et nom."); return; }
    if (!code.trim()) { setErr("Merci d'entrer ton code sponsor."); return; }
    const c = code.trim().toUpperCase();
    const isAdmin = c==="MAR74B59D";
    if (!isAdmin && !CODES_VALIDES.includes(c)) { setErr("Code sponsor incorrect. Contacte Marie."); return; }
    onLogin(prenom.trim(), nom.trim(), c);
  };
  return (
    <div style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 24px",background:"radial-gradient(ellipse at 50% 20%, rgba(201,168,76,.09) 0%, transparent 65%)",fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ width:80,height:80,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"2px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14 }}>
        <span style={{ fontFamily:"serif",fontSize:32,color:"#c9a84c",fontWeight:700 }}>C</span>
      </div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:G,marginBottom:4,letterSpacing:2,textAlign:"center" }}>Team Marie</div>
      <p style={{ fontSize:13,color:G,marginBottom:28,letterSpacing:2,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic" }}>Equipe Chogan Succes 🌷</p>
      <div style={{ width:"100%",maxWidth:340,background:S1,borderRadius:16,padding:"28px 22px",border:"0.5px solid rgba(201,168,76,.22)" }}>
        <p style={{ fontSize:14,color:G,fontWeight:600,marginBottom:18,textAlign:"center" }}>Connexion a l'application</p>
        <label style={{ fontSize:11,color:MU,display:"block",marginBottom:5 }}>Prenom</label>
        <input className="inp" placeholder="Ton prenom..." value={prenom} onChange={e=>setPrenom(e.target.value)} style={{ marginBottom:12 }} />
        <label style={{ fontSize:11,color:MU,display:"block",marginBottom:5 }}>Nom</label>
        <input className="inp" placeholder="Ton nom..." value={nom} onChange={e=>setNom(e.target.value)} style={{ marginBottom:12 }} />
        <label style={{ fontSize:11,color:MU,display:"block",marginBottom:5 }}>Code Sponsor</label>
        <input className="inp" placeholder="Code sponsor" value={code} type="password"
          onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ marginBottom:18 }} />
        {err && <p style={{ fontSize:11,color:RD,marginBottom:12,textAlign:"center" }}>{err}</p>}
        <button className="btn-p" style={{ width:"100%" }} onClick={handleLogin}>🚀 Acceder a l'application</button>
      </div>
      <p style={{ fontSize:10,color:MU,marginTop:16,letterSpacing:1 }}>© Chogan Elite — Espace prive</p>
    </div>
  );
}

function AccueilView({ prenom, isAdmin }) {
  const [started, setStarted] = useState(false);
  const [inputPrenom, setInputPrenom] = useState("");
  const [anns, setAnns] = useState([
    { id:1, text:"🎉 Bienvenue dans l'equipe ! Ton aventure Chogan commence aujourd'hui.", date:new Date().toLocaleDateString("fr-FR") },
    { id:2, text:"🌸 Promo du mois : -20% sur la gamme 50ml jusqu'a fin du mois !", date:new Date().toLocaleDateString("fr-FR") },
  ]);
  const [sucs, setSucs] = useState([
    { id:1, name:"Amira B.", ach:"Premiere vente ✨" },
    { id:2, name:"Nour K.",  ach:"Statut Gold atteint 🥇" },
  ]);
  const [newA, setNewA] = useState("");
  const [newSName, setNewSName] = useState("");
  const [newSAch, setNewSAch] = useState("");
  const displayName = inputPrenom.trim() || prenom || "Consultante";

  React.useEffect(() => {
    getMurs().then(data => {
      if (data?.anns?.length) setAnns(data.anns);
      if (data?.sucs?.length) setSucs(data.sucs);
    }).catch(()=>{});
  }, []);

  const updateAnns = (n) => { setAnns(n); if(isAdmin) saveMurs(n, sucs); };
  const updateSucs = (n) => { setSucs(n); if(isAdmin) saveMurs(anns, n); };

  if (!started) return (
    <div className="fi" style={{ minHeight:"calc(100vh - 60px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 18px",textAlign:"center",background:"radial-gradient(ellipse at 50% 25%, rgba(201,168,76,.07) 0%, transparent 65%)" }}>
      <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"2px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14 }}>
        <span style={{ fontFamily:"serif",fontSize:28,color:"#c9a84c",fontWeight:700 }}>C</span>
      </div>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,fontWeight:700,color:G,lineHeight:1.2,marginBottom:18 }}>Bienvenue chez Chogan</div>
      <div style={{ background:"rgba(255,255,255,.025)",border:"0.5px solid rgba(201,168,76,.2)",borderRadius:14,padding:"18px 18px 14px",marginBottom:22 }}>
        <p style={{ fontSize:13,lineHeight:1.85,color:"#ccc",textAlign:"center" }}>
          ✨ Bienvenue dans ton espace Chogan ✨<br/><br/>
          Cette application a ete pensee pour t'accompagner simplement dans ton activite.<br/><br/>
          🤍 bien demarrer · 🤍 organiser tes ventes · 🤍 avancer etape par etape ✨
        </p>
        <p style={{ fontSize:22,color:G,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",marginTop:14,textAlign:"center",fontWeight:600 }}>Marie</p>
      </div>
      <div style={{ width:"100%",maxWidth:320,marginBottom:16 }}>
        <label style={{ fontSize:11,color:MU,display:"block",marginBottom:6,textAlign:"left" }}>👤 Ton prenom</label>
        <input className="inp" placeholder="Ton prenom..." value={inputPrenom} onChange={e=>setInputPrenom(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setStarted(true)} style={{ textAlign:"center",fontSize:16 }} />
      </div>
      <button className="btn-p" onClick={()=>setStarted(true)}>🚀 Demarrer mon aventure</button>
    </div>
  );

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Bonjour {displayName} 👋</span>
        <button className="btn-d" onClick={()=>{if(window.confirm("Reinitialiser l'accueil ?")) setStarted(false);}}>↺ Reset</button>
      </div>
      <div className="sb">
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>📣 Mur d'Annonces</p>
        {anns.map(a=>(
          <div key={a.id} className="cardg" style={{ position:"relative" }}>
            <p style={{ fontSize:13,lineHeight:1.55 }}>{a.text}</p>
            <p style={{ fontSize:10,color:MU,marginTop:5 }}>{a.date}</p>
            {isAdmin && <button onClick={()=>updateAnns(anns.filter(x=>x.id!==a.id))} style={{ position:"absolute",top:10,right:10,background:"none",border:"none",color:MU,cursor:"pointer",fontSize:17 }}>×</button>}
          </div>
        ))}
        {isAdmin && (
          <div style={{ display:"flex",gap:8,marginTop:8,alignItems:"center" }}>
            <input className="inp" placeholder="Nouvelle annonce..." value={newA} onChange={e=>setNewA(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&newA.trim()){ updateAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]); setNewA(""); }}}
              style={{ flex:1 }} />
            <button className="btn-o" style={{ flexShrink:0,padding:"9px 16px",fontSize:18 }}
              onClick={()=>{ if(!newA.trim())return; updateAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]); setNewA(""); }}>+</button>
          </div>
        )}
        {!isAdmin && <p style={{ fontSize:10,color:MU,textAlign:"center",fontStyle:"italic",marginTop:6 }}>Seule Marie peut modifier les annonces</p>}
      </div>
      <div className="div" />
      <div className="sb">
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>🏆 Mur des Succes</p>
        {sucs.map(s=>(
          <div key={s.id} className="card" style={{ display:"flex",alignItems:"center",gap:12,position:"relative" }}>
            <span style={{ fontSize:24 }}>🌟</span>
            <div><p style={{ fontSize:13,fontWeight:600 }}>{s.name}</p><p style={{ fontSize:12,color:MU }}>{s.ach}</p></div>
            {isAdmin && <button onClick={()=>updateSucs(sucs.filter(x=>x.id!==s.id))} style={{ position:"absolute",top:10,right:10,background:"none",border:"none",color:MU,cursor:"pointer",fontSize:17 }}>×</button>}
          </div>
        ))}
        {isAdmin && (
          <div style={{ display:"flex",flexDirection:"column",gap:6,marginTop:8 }}>
            <input className="inp" placeholder="Prenom de la consultante" value={newSName} onChange={e=>setNewSName(e.target.value)} />
            <div style={{ display:"flex",gap:8 }}>
              <input className="inp" placeholder="Son succes..." value={newSAch} onChange={e=>setNewSAch(e.target.value)} style={{ flex:1 }} />
              <button className="btn-o" style={{ flexShrink:0,padding:"9px 16px",fontSize:18 }}
                onClick={()=>{ if(!newSName.trim())return; updateSucs([...sucs,{id:Date.now(),name:newSName,ach:newSAch||"Nouveau succes 🎉"}]); setNewSName(""); setNewSAch(""); }}>+</button>
            </div>
          </div>
        )}
        {!isAdmin && <p style={{ fontSize:10,color:MU,textAlign:"center",fontStyle:"italic",marginTop:6 }}>Seule Marie peut modifier les succes</p>}
      </div>
    </div>
  );
}

function ChecklistView({ checklist, setChecklist }) {
  const done = checklist.filter(i=>i.done).length;
  const pct = Math.round((done/checklist.length)*100);
  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Checklist</span>
        <button className="btn-d" onClick={()=>{if(window.confirm("Reinitialiser ?")) setChecklist(CHECKLIST0);}}>↺ Reset</button>
      </div>
      <div className="sb">
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5 }}>
          <span style={{ fontSize:12,color:MU }}>{done}/{checklist.length} etapes</span>
          <span className="badge" style={{ background:pct===100?"rgba(126,200,154,.16)":"rgba(201,168,76,.14)",color:pct===100?MC:G }}>{pct}%</span>
        </div>
        <div className="pbar-w"><div className="pbar" style={{ width:`${pct}%` }} /></div>
        {pct===100 && <div className="cardg" style={{ textAlign:"center",padding:20,marginTop:12 }}><p style={{ fontSize:24,marginBottom:6 }}>🎓</p><p style={{ color:G,fontWeight:600,fontSize:14 }}>Onboarding complete !</p></div>}
        <div style={{ marginTop:10 }}>
          {checklist.map(item=>(
            <div key={item.id} className="ci" onClick={()=>setChecklist(p=>p.map(i=>i.id===item.id?{...i,done:!i.done}:i))}>
              <div className={`cbox ${item.done?"ck":""}`}>{item.done&&<span style={{ color:"#07070f",fontSize:11,fontWeight:700 }}>✓</span>}</div>
              <span style={{ fontSize:13,lineHeight:1.4,flex:1,textDecoration:item.done?"line-through":"none",color:item.done?MU:TX }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CataloguesView() {
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Catalogues</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:16 }}>
          <p style={{ fontSize:12,color:G,fontWeight:500,marginBottom:3 }}>📖 Catalogues officiels Chogan</p>
          <p style={{ fontSize:11,color:MU,lineHeight:1.6 }}>Appuie sur un catalogue pour l'ouvrir sur le site officiel.</p>
        </div>
        {CATALOGUES.map((c,i)=>(
          <a key={i} className="rlink" href={c.url} target="_blank" rel="noreferrer">
            <span style={{ fontSize:26,flexShrink:0 }}>{c.ic}</span>
            <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:600 }}>{c.titre}</p><p style={{ fontSize:11,color:MU,marginTop:2 }}>{c.desc}</p></div>
            <span style={{ color:G,fontSize:16,flexShrink:0 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FamilleView() {
  const [openFam, setOpenFam] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Familles Olfactives</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:14 }}>
          <p style={{ fontSize:12,color:G,fontWeight:500,marginBottom:4 }}>💐 Les 7 Familles Olfactives</p>
          <p style={{ fontSize:12,color:MU,lineHeight:1.65 }}>Guide pour orienter tes clientes vers le parfum qui leur correspond.</p>
        </div>
        {FAMILLES.map(f=>(
          <div key={f.id} className="scrd" style={{ borderLeft:"3px solid "+f.couleur }}>
            <div className="shdr" onClick={()=>{ setOpenFam(openFam===f.id?null:f.id); setOpenSub(null); }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:22 }}>{f.emoji}</span>
                <div><p style={{ fontSize:13,fontWeight:600,color:f.couleur }}>{f.nom}</p><p style={{ fontSize:10,color:MU,marginTop:1 }}>{f.style}</p></div>
              </div>
              <span style={{ color:f.couleur }}>{openFam===f.id?"▲":"▼"}</span>
            </div>
            {openFam===f.id && (
              <div style={{ padding:"0 14px 14px",borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                <div style={{ background:"rgba(255,255,255,.03)",borderRadius:8,padding:"10px 12px",margin:"10px 0" }}>
                  <p style={{ fontSize:11,color:MU,marginBottom:3 }}>🎵 Notes</p>
                  <p style={{ fontSize:12,color:"#ccc",lineHeight:1.5 }}>{f.notes}</p>
                </div>
                <div style={{ background:"rgba(255,255,255,.03)",borderRadius:8,padding:"10px 12px",marginBottom:12 }}>
                  <p style={{ fontSize:11,color:MU,marginBottom:3 }}>👤 Pour qui</p>
                  <p style={{ fontSize:12,color:"#ccc",lineHeight:1.5 }}>{f.pourQui}</p>
                </div>
                <p style={{ fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>Sous-familles</p>
                {f.sousFamilles.map((sf,si)=>{
                  const subKey=f.id+"-"+si; const isOpen=openSub===subKey;
                  return (
                    <div key={si} style={{ marginBottom:6 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(255,255,255,.04)",borderRadius:8,padding:"8px 12px",cursor:"pointer",border:"0.5px solid "+(isOpen?f.couleur:"transparent") }}
                        onClick={()=>setOpenSub(isOpen?null:subKey)}>
                        <p style={{ fontSize:12,fontWeight:500,color:isOpen?f.couleur:TX }}>{sf.n}</p>
                        <span style={{ fontSize:10,color:MU }}>{sf.refs.length} ref.</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding:"8px 12px",background:"rgba(255,255,255,.02)",borderRadius:"0 0 8px 8px",marginTop:-4 }}>
                          {sf.refs.map((r,ri)=>(<span key={ri} style={{ display:"inline-block",fontSize:10,padding:"2px 8px",margin:"2px 3px",background:"rgba(120,120,120,.15)",borderRadius:20,color:"#ccc" }}>{r}</span>))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvertisseurView() {
  const [eur, setEur] = useState("");
  const [rate, setRate] = useState("245");
  const dzd = eur&&!isNaN(+eur) ? Math.round(+eur*(+rate||245)) : null;
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Convertisseur</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:20 }}>
          <p style={{ fontSize:12,color:G,fontWeight:500,marginBottom:4 }}>💱 Convertisseur EUR → DZD</p>
          <p style={{ fontSize:12,color:MU,lineHeight:1.65 }}>Calcule instantanement le prix en Dinars algeriens.</p>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11,color:MU,display:"block",marginBottom:6 }}>Taux du jour (1€ = ? DA)</label>
          <input className="inp" type="number" placeholder="245" value={rate} onChange={e=>setRate(e.target.value)} style={{ fontSize:18,fontWeight:600,textAlign:"center" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11,color:MU,display:"block",marginBottom:6 }}>Montant en Euros (€)</label>
          <input className="inp" type="number" placeholder="0.00" value={eur} onChange={e=>setEur(e.target.value)} style={{ fontSize:22,fontWeight:700,textAlign:"center" }} />
        </div>
        {dzd!==null && (
          <div className="cardg" style={{ textAlign:"center",padding:"24px 16px" }}>
            <p style={{ fontSize:13,color:MU,marginBottom:8 }}>{eur} € =</p>
            <p style={{ fontSize:42,fontWeight:700,color:G,lineHeight:1 }}>{dzd.toLocaleString("fr-FR")}</p>
            <p style={{ fontSize:16,color:G,marginTop:4 }}>Dinars algeriens</p>
            <p style={{ fontSize:11,color:MU,marginTop:8 }}>Taux : 1€ = {rate} DA</p>
          </div>
        )}
        <div className="div" style={{ margin:"20px 0" }} />
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:12 }}>Conversions rapides</p>
        {[11.90,18,25.50,35,45,48,52,57,65].map(p=>(
          <div key={p} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 14px",background:"rgba(255,255,255,.03)",borderRadius:8,marginBottom:6,border:"0.5px solid rgba(255,255,255,.05)" }}>
            <span style={{ fontSize:13,color:TX,fontWeight:500 }}>{p.toFixed(2)} €</span>
            <span style={{ fontSize:13,color:G,fontWeight:700 }}>{Math.round(p*(+rate||245)).toLocaleString("fr-FR")} DA</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogueView({ perfumes, setPerfumes }) {
  const [sizeF, setSizeF] = useState("tous");
  const [genF, setGenF] = useState("tous");
  const [srch, setSrch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const fref = useRef();

  const filtered = perfumes.filter(p => {
    if (sizeF!=="tous"&&!(p.sizes||[]).includes(sizeF)) return false;
    if (genF!=="tous"&&p.gender!==genF) return false;
    if (srch) { const q=srch.toLowerCase(); if (!p.name.toLowerCase().includes(q)&&!(p.brand||"").toLowerCase().includes(q)&&!(p.ref||"").includes(srch)) return false; }
    return true;
  });

  const handleFile = async e => {
    const file=e.target.files[0]; if(!file) return;
    setUploading(true); setMsg("✨ Extraction IA en cours...");
    try {
      const b64=await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result.split(",")[1]); r.onerror=rej; r.readAsDataURL(file); });
      const isImg=file.type.startsWith("image/");
      const resp=await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000,
          messages:[{ role:"user", content:[
            { type:isImg?"image":"document", source:{ type:"base64", media_type:file.type, data:b64 }},
            { type:"text", text:`Extrais TOUS les parfums Chogan visibles. NOIR=homme|ROSE=femme|VERT=mixte. Reponds UNIQUEMENT en JSON: [{"name":"...","brand":"...","ref":"...","gender":"homme|femme|mixte","sizes":["70ml","30ml","15ml"]}]` }
          ]}]
        })
      });
      const data=await resp.json();
      const raw=(data.content||[]).map(b=>b.text||"").join("").replace(/\`\`\`json|\`\`\`/g,"").trim();
      const list=JSON.parse(raw);
      if (Array.isArray(list)&&list.length>0) {
        setPerfumes(prev=>{ const names=new Set(prev.map(p=>p.name.toLowerCase())); const add=list.filter(p=>!names.has((p.name||"").toLowerCase())).map((p,i)=>({...p,id:Date.now()+i,name:p.name||`Parfum ${i+1}`,gender:p.gender||"mixte",sizes:p.sizes||["70ml","15ml"]})); return [...prev,...add]; });
        setMsg(`✅ ${list.length} inspirations extraites !`);
      } else { setMsg("⚠️ Aucun parfum detecte."); }
    } catch(err) { setMsg("❌ Erreur extraction. Reessaie."); }
    finally { setUploading(false); setTimeout(()=>setMsg(""),5000); e.target.value=""; }
  };

  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Liste Inspirations</span><span style={{ fontSize:11,color:MU }}>{perfumes.length} parfums</span></div>
      <div className="upz" onClick={()=>fref.current.click()}>
        {uploading ? <p style={{ color:G,fontSize:13 }}>⏳ Analyse IA en cours...</p>
          : <div style={{display:"contents"}}><p style={{ fontSize:24,marginBottom:6 }}>📷</p><p style={{ fontSize:13,color:G,fontWeight:500 }}>Mettre a jour la liste</p><p style={{ fontSize:11,color:MU,marginTop:3 }}>Upload photo ou PDF → extraction automatique</p></div>}
      </div>
      <input ref={fref} type="file" accept="image/*,application/pdf" style={{ display:"none" }} onChange={handleFile} />
      {msg&&<div style={{ textAlign:"center",fontSize:12,padding:"4px 18px 10px",color:msg.startsWith("✅")?MC:msg.startsWith("❌")?RD:G }}>{msg}</div>}
      <div className="ftabs">
        {[["tous","Tous"],["homme","♂ Homme"],["femme","♀ Femme"],["mixte","⚧ Mixte"]].map(([v,l])=>(
          <button key={v} className={`ftab ${genF===v?"on":""}`} style={genF===v&&v!=="tous"?{borderColor:gc(v),color:gc(v)}:{}} onClick={()=>setGenF(v)}>{l}</button>
        ))}
      </div>
      <div className="ftabs" style={{ paddingTop:0 }}>
        {[["tous","Toutes"],["15ml","15 ml"],["30ml","30 ml"],["50ml","50 ml"],["70ml","70 ml"]].map(([v,l])=>(
          <button key={v} className={`ftab ${sizeF===v?"on":""}`} onClick={()=>setSizeF(v)}>{l}</button>
        ))}
      </div>
      <input className="srch" placeholder="🔍 Nom, marque ou reference..." value={srch} onChange={e=>setSrch(e.target.value)} />
      <div className="pgrid">
        {filtered.length===0
          ? <div style={{ gridColumn:"1/-1",textAlign:"center",padding:36,color:MU }}><p style={{ fontSize:28,marginBottom:8 }}>🌸</p><p style={{ fontSize:13 }}>Aucun parfum trouve</p></div>
          : filtered.map(p=>(
              <div key={p.id} className="pcrd" style={{ borderLeftColor:gc2(p.gender) }}>
                <p style={{ fontSize:12,fontWeight:600,color:gc2(p.gender),lineHeight:1.3,marginBottom:2 }}>{p.name}</p>
                <p style={{ fontSize:10,color:MU,marginBottom:2 }}>{p.brand}</p>
                <p style={{ fontSize:10,color:MU,marginBottom:7 }}>Ref. {p.ref}</p>
                <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
                  {(p.sizes||[]).map(s=>(
                    <div key={s} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2px 6px",borderRadius:6,background:sizeF===s?`rgba(${p.gender==="homme"?"212,212,226":p.gender==="femme"?"244,160,181":"126,200,154"},.15)`:"rgba(255,255,255,.04)",border:sizeF===s?`0.5px solid ${gc2(p.gender)}`:"0.5px solid transparent" }}>
                      <span style={{ fontSize:10,color:sizeF===s?gc2(p.gender):MU,fontWeight:sizeF===s?600:400 }}>{s}</span>
                      <span style={{ fontSize:10,color:G,fontWeight:600 }}>{p.prices?.[s]?`${p.prices[s].toFixed(2).replace(".",",")} €`:"—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
      <div style={{ textAlign:"center",paddingBottom:16 }}>
        <button className="btn-d" onClick={()=>{if(window.confirm("Reinitialiser la liste ?")) setPerfumes(DEMO_PERFUMES);}}>↺ Reinitialiser la liste</button>
      </div>
    </div>
  );
}

function BonCommandeView({ perfumes }) {
  const [pays, setPays] = useState("fr");
  const [taux, setTaux] = useState("245");
  const [frais, setFrais] = useState("");
  const [autresFrais, setAutresFrais] = useState("");
  const [cart, setCart] = useState([]);
  const [srch, setSrch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [nomClient, setNomClient] = useState("");
  const [exported, setExported] = useState(false);

  const filtered = perfumes.filter(p => { if(!srch) return true; const q=srch.toLowerCase(); return p.name.toLowerCase().includes(q)||(p.brand||"").toLowerCase().includes(q)||(p.ref||"").includes(srch); });
  const addToCart = (p,size) => { const key=`${p.id}-${size}`; setCart(prev=>{ const ex=prev.find(c=>c.key===key); if(ex) return prev.map(c=>c.key===key?{...c,qty:c.qty+1}:c); return [...prev,{key,id:p.id,name:p.name,ref:p.ref,brand:p.brand,size,price:p.prices?.[size]||35,qty:1}]; }); };
  const removeFromCart = key => setCart(prev=>prev.filter(c=>c.key!==key));
  const updateQty = (key,delta) => setCart(prev=>prev.map(c=>c.key===key?{...c,qty:Math.max(1,c.qty+delta)}:c).filter(c=>c.qty>0));
  const totalEur = cart.reduce((s,c)=>s+c.price*c.qty,0);
  const tauxN=parseFloat(taux)||245; const fraisN=parseFloat(frais)||0; const autresN=parseFloat(autresFrais)||0;
  const totalDzd=Math.round(totalEur*tauxN+(pays==="dz"?fraisN+autresN:0));
  const exportText = () => {
    const lines=[`📋 BON DE COMMANDE — CHOGAN`,`👤 Client : ${nomClient||"—"}`,`📅 Date : ${new Date().toLocaleDateString("fr-FR")}`,`🌍 Pays : ${pays==="fr"?"France 🇫🇷":"Algerie 🇩🇿"}`,``,`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`];
    cart.forEach(c=>lines.push(`• N°${c.ref} ${c.name} — ${c.size} × ${c.qty} = ${(c.price*c.qty).toFixed(2)}€`));
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    if(pays==="dz"){lines.push(`💱 Taux : 1€ = ${taux} DA`);lines.push(`💰 TOTAL DZD : ${totalDzd.toLocaleString("fr-FR")} DA`);}
    else {lines.push(`💰 TOTAL : ${(totalEur+fraisN+autresN).toFixed(2)} €`);}
    navigator.clipboard?.writeText(lines.join("\n")).then(()=>setExported(true));
    setTimeout(()=>setExported(false),3000);
  };

  if (showCart) return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <button onClick={()=>setShowCart(false)} style={{ background:"none",border:"none",color:G,cursor:"pointer",fontSize:18,marginRight:10,padding:0 }}>←</button>
        <span className="shtitle">Recapitulatif</span>
        <button className="btn-d" onClick={()=>setCart([])}>Vider</button>
      </div>
      <div className="sb">
        <div style={{ display:"flex",gap:8,marginBottom:14 }}>
          {[["fr","🇫🇷 France"],["dz","🇩🇿 Algerie"]].map(([v,l])=>(
            <button key={v} onClick={()=>setPays(v)} style={{ flex:1,padding:"10px",borderRadius:10,border:`1.5px solid ${pays===v?G:"rgba(255,255,255,.1)"}`,background:pays===v?"rgba(201,168,76,.1)":"transparent",color:pays===v?G:MU,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        {pays==="dz"&&(<div style={{ display:"flex",gap:8,marginBottom:14 }}><div style={{ flex:1 }}><label style={{ fontSize:10,color:MU,display:"block",marginBottom:4 }}>💱 Taux (1€=?DA)</label><input className="inp" type="number" value={taux} onChange={e=>setTaux(e.target.value)} placeholder="245" /></div><div style={{ flex:1 }}><label style={{ fontSize:10,color:MU,display:"block",marginBottom:4 }}>🚚 Frais envoi (DA)</label><input className="inp" type="number" value={frais} onChange={e=>setFrais(e.target.value)} placeholder="0" /></div></div>)}
        {pays==="fr"&&(<div style={{ marginBottom:14 }}><label style={{ fontSize:10,color:MU,display:"block",marginBottom:4 }}>🚚 Frais de port (€)</label><input className="inp" type="number" value={frais} onChange={e=>setFrais(e.target.value)} placeholder="2.5" /></div>)}
        <div style={{ marginBottom:14 }}><label style={{ fontSize:10,color:MU,display:"block",marginBottom:4 }}>👤 Nom du client (optionnel)</label><input className="inp" placeholder="Prenom Nom..." value={nomClient} onChange={e=>setNomClient(e.target.value)} /></div>
        {cart.length===0 ? <div style={{ textAlign:"center",padding:32,color:MU }}><p style={{ fontSize:28,marginBottom:8 }}>🛒</p><p>Aucun produit selectionne</p></div>
          : <div style={{display:"contents"}}>
              {cart.map(c=>(<div key={c.key} className="card" style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:7 }}>
                <div style={{ flex:1 }}><p style={{ fontSize:12,fontWeight:600 }}>{c.name}</p><p style={{ fontSize:10,color:MU }}>Ref. {c.ref} · {c.size}</p><p style={{ fontSize:11,color:G,fontWeight:600,marginTop:2 }}>{(c.price*c.qty).toFixed(2)} €{pays==="dz"?` = ${Math.round(c.price*c.qty*tauxN).toLocaleString("fr-FR")} DA`:""}</p></div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <button onClick={()=>updateQty(c.key,-1)} style={{ width:26,height:26,borderRadius:6,background:"rgba(255,255,255,.07)",border:"none",color:TX,cursor:"pointer",fontSize:16 }}>−</button>
                  <span style={{ fontSize:13,fontWeight:600,minWidth:16,textAlign:"center" }}>{c.qty}</span>
                  <button onClick={()=>updateQty(c.key,1)} style={{ width:26,height:26,borderRadius:6,background:"rgba(201,168,76,.15)",border:"none",color:G,cursor:"pointer",fontSize:16 }}>+</button>
                  <button onClick={()=>removeFromCart(c.key)} style={{ width:26,height:26,borderRadius:6,background:"rgba(224,80,80,.1)",border:"none",color:RD,cursor:"pointer",fontSize:14 }}>×</button>
                </div>
              </div>))}
              <div className="cardg" style={{ marginTop:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}><span style={{ fontSize:12,color:MU }}>Total produits</span><span style={{ fontSize:13,fontWeight:600 }}>{totalEur.toFixed(2)} €</span></div>
                <div style={{ height:"0.5px",background:"rgba(201,168,76,.2)",margin:"8px 0" }} />
                {pays==="fr"&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ fontSize:13,fontWeight:600 }}>TOTAL</span><span style={{ fontSize:22,fontWeight:700,color:G }}>{(totalEur+fraisN+autresN).toFixed(2)} €</span></div>}
                {pays==="dz"&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ fontSize:13,fontWeight:600 }}>TOTAL DZD</span><span style={{ fontSize:22,fontWeight:700,color:G }}>{totalDzd.toLocaleString("fr-FR")} DA</span></div>}
              </div>
              <button className="btn-p" style={{ width:"100%",marginTop:12 }} onClick={exportText}>{exported?"✅ Copie !":"📋 Copier le bon de commande"}</button>
            </div>}
      </div>
    </div>
  );

  return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <span className="shtitle">Bon de Commande</span>
        <button className="btn-p" style={{ padding:"6px 14px",fontSize:11,position:"relative" }} onClick={()=>setShowCart(true)}>
          🛒 Panier {cart.length>0?`(${cart.reduce((s,c)=>s+c.qty,0)})`:""}
        </button>
      </div>
      <div style={{ padding:"8px 18px 4px" }}><input className="srch" style={{ width:"100%",margin:0 }} placeholder="🔍 Rechercher un parfum..." value={srch} onChange={e=>setSrch(e.target.value)} /></div>
      <div className="pgrid">
        {filtered.map(p=>(
          <div key={p.id} className="pcrd" style={{ borderLeftColor:gc2(p.gender) }}>
            <p style={{ fontSize:11,fontWeight:700,color:gc2(p.gender),lineHeight:1.3,marginBottom:2 }}>{p.name}</p>
            <p style={{ fontSize:9,color:MU,marginBottom:6 }}>{p.brand} · Ref.{p.ref}</p>
            {(p.sizes||[]).map(s=>(
              <button key={s} onClick={()=>addToCart(p,s)} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"4px 7px",marginBottom:3,borderRadius:6,background:"rgba(201,168,76,.06)",border:"0.5px solid rgba(201,168,76,.2)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif" }}>
                <span style={{ fontSize:10,color:MU }}>{s}</span>
                <span style={{ fontSize:10,color:G,fontWeight:600 }}>{p.prices?.[s]?.toFixed(2)||"35.00"}€ +</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PromoView({ onBack }) {
  const [devise, setDevise] = useState("eur");
  const [txDA, setTxDA] = useState("290");
  const [fraisPort, setFraisPort] = useState("");
  const [promos, setPromos] = useState({});
  const [qtes, setQtes] = useState({});
  const [selected, setSelected] = useState(null);
  const tx=parseFloat(txDA)||290;
  const calc = (p) => {
    const totalEur=p.prixEur+p.emballage; const totalDzd=p.prixEur+(p.transportDzd||0)+p.emballage;
    const prixDA=Math.round(totalDzd*tx); const minEur=parseFloat((totalEur*1.04).toFixed(2)); const minDA=Math.round(prixDA*1.04);
    const promoVal=parseFloat(promos[p.id])||0; const qte=parseInt(qtes[p.id])||0;
    if(devise==="eur"){const margeEur=promoVal>0&&promoVal>=minEur?parseFloat(((promoVal-totalEur)*qte).toFixed(2)):0;return{totalEur,prixDA,minEur,minDA,promoVal,qte,marge:margeEur,ok:promoVal>=minEur};}
    else{const margeDA=promoVal>0&&promoVal>=minDA?Math.round((promoVal-prixDA)*qte):0;return{totalEur,prixDA,minEur,minDA,promoVal,qte,marge:margeDA,ok:promoVal>=minDA};}
  };
  const fmt = val => devise==="eur"?val.toFixed(2)+" €":val.toLocaleString("fr-FR")+" DA";
  const totalMarge=PRODUITS_PROMO.reduce((s,p)=>s+calc(p).marge,0);
  const produitActif=selected?PRODUITS_PROMO.find(p=>p.id===selected):null;
  const calcActif=produitActif?calc(produitActif):null;
  const minLabel=calcActif?(devise==="eur"?calcActif.minEur.toFixed(2)+" €":calcActif.minDA.toLocaleString("fr-FR")+" DA"):"";

  if(produitActif&&calcActif) return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <button onClick={()=>setSelected(null)} style={{ background:"none",border:"none",color:G,cursor:"pointer",fontSize:18,marginRight:10,padding:0 }}>←</button>
        <span className="shtitle">{produitActif.nom}</span>
      </div>
      <div className="sb">
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>📦 Prix de revient</p>
        <div className="card" style={{ marginBottom:14 }}>
          {[["Prix d'achat",produitActif.prixEur.toFixed(2)+"€"],["Emballage",produitActif.emballage>0?produitActif.emballage.toFixed(2)+"€":"Inclus"]].map(([l,v],i)=>(
            <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"0.5px solid rgba(255,255,255,.05)" }}><span style={{ fontSize:12,color:MU }}>{l}</span><span style={{ fontSize:12,color:TX }}>{v}</span></div>
          ))}
          <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 0 4px" }}><span style={{ fontSize:13,fontWeight:600 }}>Total PA</span><span style={{ fontSize:15,fontWeight:700,color:G }}>{calcActif.totalEur.toFixed(2)} €{devise==="dzd"?` / ${calcActif.prixDA.toLocaleString("fr-FR")} DA`:""}</span></div>
        </div>
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>🚫 Prix minimum</p>
        <div style={{ background:"rgba(74,222,128,.08)",border:"1.5px solid #4ade80",borderRadius:12,padding:"14px 16px",marginBottom:14,textAlign:"center" }}>
          <p style={{ fontSize:11,color:"#4ade80",marginBottom:4 }}>PA × 1,04 = marge minimale 4%</p>
          <p style={{ fontSize:30,fontWeight:700,color:"#4ade80" }}>{minLabel}</p>
          <p style={{ fontSize:10,color:"rgba(74,222,128,.7)",marginTop:4 }}>En dessous de ce prix = perte</p>
        </div>
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>🏷 Simuler une promo</p>
        <div className="card" style={{ marginBottom:14 }}>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11,color:MU,display:"block",marginBottom:5 }}>Mon prix promo {devise==="eur"?"(€)":"(DA)"}</label>
            <input className="inp" type="number" placeholder={"Min : "+minLabel} value={promos[produitActif.id]||""}
              onChange={e=>setPromos(p=>({...p,[produitActif.id]:e.target.value}))}
              style={{ borderColor:calcActif.promoVal>0?(calcActif.ok?"#4ade80":"#e05050"):"rgba(255,255,255,.09)" }} />
            {calcActif.promoVal>0&&!calcActif.ok&&<p style={{ fontSize:11,color:RD,marginTop:5 }}>⚠️ Prix trop bas ! Minimum : {minLabel}</p>}
            {calcActif.promoVal>0&&calcActif.ok&&<p style={{ fontSize:11,color:"#4ade80",marginTop:5 }}>✅ Prix valide</p>}
          </div>
          <div><label style={{ fontSize:11,color:MU,display:"block",marginBottom:5 }}>Quantite vendue</label><input className="inp" type="number" placeholder="0" value={qtes[produitActif.id]||""} onChange={e=>setQtes(p=>({...p,[produitActif.id]:e.target.value}))} /></div>
        </div>
        {calcActif.promoVal>0&&calcActif.ok&&calcActif.qte>0&&(
          <div style={{ background:"rgba(201,168,76,.1)",border:"1.5px solid "+G,borderRadius:12,padding:"14px 16px",textAlign:"center" }}>
            <p style={{ fontSize:28,fontWeight:700,color:G }}>{fmt(calcActif.marge)}</p>
            <p style={{ fontSize:11,color:MU,marginTop:4 }}>Marge generee sur cette promo</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        {onBack&&<button onClick={onBack} style={{ background:"none",border:"none",color:G,cursor:"pointer",fontSize:18,marginRight:10,padding:0 }}>←</button>}
        <span className="shtitle">Calculateur Promo</span>
      </div>
      <div className="sb">
        <div style={{ display:"flex",gap:8,marginBottom:14 }}>
          {[["eur","🇫🇷 Euros (€)"],["dzd","🇩🇿 Dinars (DA)"]].map(([v,l])=>(
            <button key={v} onClick={()=>{ setDevise(v); setPromos({}); setQtes({}); }}
              style={{ flex:1,padding:"10px",borderRadius:10,border:"1.5px solid "+(devise===v?G:"rgba(255,255,255,.1)"),background:devise===v?"rgba(201,168,76,.1)":"transparent",color:devise===v?G:MU,fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        {devise==="dzd"&&(<div className="cardg" style={{ marginBottom:14 }}><label style={{ fontSize:11,color:G,fontWeight:600,display:"block",marginBottom:8 }}>💱 Taux du jour (1€ = ? DA)</label><input className="inp" type="number" value={txDA} onChange={e=>setTxDA(e.target.value)} placeholder="290" style={{ fontSize:18,fontWeight:700,textAlign:"center" }} /></div>)}
        {totalMarge>0&&(<div style={{ background:"rgba(201,168,76,.1)",border:"1px solid "+G,borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center" }}><span style={{ fontSize:12,color:MU }}>Total marge promo</span><span style={{ fontSize:20,fontWeight:700,color:G }}>{fmt(totalMarge)}</span></div>)}
        <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>Appuie sur un produit pour simuler</p>
        {PRODUITS_PROMO.map(p=>{
          const c=calc(p);
          const paDisp=devise==="eur"?c.totalEur.toFixed(2)+" €":c.prixDA.toLocaleString("fr-FR")+" DA";
          const minDisp=devise==="eur"?c.minEur.toFixed(2)+" €":c.minDA.toLocaleString("fr-FR")+" DA";
          return (
            <div key={p.id} onClick={()=>setSelected(p.id)} className="card" style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:8,borderLeft:c.marge>0?"3px solid "+G:"3px solid rgba(255,255,255,.1)" }}>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13,fontWeight:600 }}>{p.nom}</p>
                <div style={{ display:"flex",gap:10,marginTop:3,flexWrap:"wrap" }}><span style={{ fontSize:11,color:MU }}>PA : {paDisp}</span><span style={{ fontSize:11,color:"#4ade80" }}>Min : {minDisp}</span></div>
                {c.marge>0&&<p style={{ fontSize:11,color:G,fontWeight:600,marginTop:3 }}>Marge : {fmt(c.marge)} ({c.qte} pcs)</p>}
              </div>
              <span style={{ color:G,fontSize:18 }}>›</span>
            </div>
          );
        })}
        <button className="btn-d" style={{ width:"100%",marginTop:8 }} onClick={()=>{ setPromos({}); setQtes({}); setFraisPort(""); }}>↺ Reinitialiser</button>
      </div>
    </div>
  );
}

// ── FORMATION VIEW — avec les 4 nouveaux documents ────────────────
function LancementView() {
  const [sub, setSub] = useState("lancement");
  const [openSc, setOpenSc] = useState(null);
  const [openPays, setOpenPays] = useState(false);
  const [qa, setQa] = useState({});
  const [qdone, setQdone] = useState(false);
  const score = QUIZ.filter(q=>qa[q.id]===q.correct).length;

  const PAYS = [
    {flag:"🇦🇱",name:"Albanie"},{flag:"🇩🇿",name:"Algerie"},{flag:"🇦🇴",name:"Angola",test:true},
    {flag:"🇦🇺",name:"Australie",test:true},{flag:"🇦🇹",name:"Autriche"},{flag:"🇧🇪",name:"Belgique"},
    {flag:"🇧🇬",name:"Bulgarie"},{flag:"🇨🇦",name:"Canada",test:true},{flag:"🇭🇷",name:"Croatie"},
    {flag:"🇩🇰",name:"Danemark"},{flag:"🇪🇬",name:"Egypte",test:true},{flag:"🇫🇷",name:"France"},
    {flag:"🇩🇪",name:"Allemagne"},{flag:"🇬🇷",name:"Grece"},{flag:"🇮🇹",name:"Italie"},
    {flag:"🇱🇺",name:"Luxembourg"},{flag:"🇳🇱",name:"Pays-Bas"},{flag:"🇵🇱",name:"Pologne"},
    {flag:"🇵🇹",name:"Portugal"},{flag:"🇬🇧",name:"Royaume-Uni"},{flag:"🇷🇴",name:"Roumanie"},
    {flag:"🇪🇸",name:"Espagne"},{flag:"🇸🇪",name:"Suede"},{flag:"🇨🇭",name:"Suisse"},{flag:"🇭🇺",name:"Hongrie"},
  ];

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Formation</span>
        {sub==="quiz"&&<button className="btn-d" onClick={()=>{if(window.confirm("Reset quiz ?")){setQa({});setQdone(false);}}}>↺ Reset</button>}
      </div>
      <div className="ftabs">
        {[["lancement","🚀 Lancement"],["scripts","💬 Scripts"],["quiz","📝 Quiz"]].map(([v,l])=>(
          <button key={v} className={`ftab ${sub===v?"on":""}`} onClick={()=>setSub(v)}>{l}</button>
        ))}
      </div>

      {sub==="lancement" && (
        <div className="sb">
          <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>🔓 Plateforme</p>
          <a href="https://mylimitless.be/" target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.06)",borderColor:"rgba(201,168,76,.22)" }}>
            <span style={{ fontSize:22 }}>🔓</span>
            <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:600,color:G }}>Inscription Limitless</p><p style={{ fontSize:11,color:MU,marginTop:2 }}>Accede a la plateforme de formation</p></div>
            <span style={{ color:G,fontSize:16 }}>↗</span>
          </a>

          <div className="div" style={{ margin:"14px 0" }} />
          <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>🎬 Videos</p>
          {[
            { t:"Video Mallette",            d:"Presentation de ta mallette de demarrage", url:"https://drive.google.com/file/d/1s3EKcodYivoV1wVBnkWlG3Uk4gGWkp48/view" },
            { t:"Lien de parrainage client", d:"Comment envoyer ton lien a tes clientes",  url:"https://drive.google.com/file/d/1XLsJsyvHPe7GHSrRHvxScbligxILIcvH/view" },
          ].map((v,i)=>(
            <a key={i} href={v.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.04)",borderColor:"rgba(201,168,76,.15)" }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:G,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><span style={{ fontSize:18,marginLeft:3 }}>▶</span></div>
              <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:600,color:G }}>{v.t}</p><p style={{ fontSize:11,color:MU,marginTop:2 }}>{v.d}</p></div>
              <span style={{ color:G,fontSize:16 }}>↗</span>
            </a>
          ))}

          <div className="div" style={{ margin:"14px 0" }} />
          <p style={{ fontSize:11,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:10 }}>📚 Documents</p>
          {[
            { ic:"📖", t:"Book 1",                     url:"https://drive.google.com/file/d/1wrZCau12O-JQ3Pfkmu2Mu2qHQCP9_cdb/view" },
            { ic:"📗", t:"Book 2",                     url:"https://drive.google.com/file/d/1V4JLCN7rIqWnd7UYTH8MTLzsN0UKybzQ/view" },
            { ic:"🌟", t:"Programme Ambassadeur",      url:"https://drive.google.com/file/d/1d952VZyjBs6XM7rVmpr1K07GnP0is1U2/view" },
            { ic:"💰", t:"Remuneration chez Chogan",   url:"https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/remuneration-chogan.pdf" },
            { ic:"🛍", t:"Conseils premiere commande", url:"https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/conseils-premiere-commande.pdf" },
            { ic:"🎫", t:"Comment realiser un ticket SAV", url:"https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/comment-realiser-un-ticket.pdf" },
            { ic:"💌", t:"Ce que je propose a mon equipe", url:"https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/ce-que-je-propose.pdf" },
          ].map((r,i)=>(
            <a key={i} href={r.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(66,133,244,.06)",borderColor:"rgba(66,133,244,.2)" }}>
              <span style={{ fontSize:22 }}>{r.ic}</span>
              <div style={{ flex:1 }}><p style={{ fontSize:13,fontWeight:600,color:"#4285f4" }}>{r.t}</p><p style={{ fontSize:11,color:MU,marginTop:2 }}>Ouvrir le document</p></div>
              <span style={{ color:"#4285f4",fontSize:16 }}>↗</span>
            </a>
          ))}

          <div className="div" style={{ margin:"14px 0" }} />
          <div className="scrd" style={{ borderLeft:"3px solid #4285f4" }}>
            <div className="shdr" onClick={()=>setOpenPays(!openPays)}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:22 }}>🌍</span>
                <div><p style={{ fontSize:13,fontWeight:600,color:"#4285f4" }}>Pays ouverts Chogan</p><p style={{ fontSize:10,color:MU,marginTop:1 }}>Zones de livraison disponibles</p></div>
              </div>
              <span style={{ color:"#4285f4" }}>{openPays?"▲":"▼"}</span>
            </div>
            {openPays&&(
              <div style={{ padding:"0 14px 14px",borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                <div style={{ background:"rgba(224,80,80,.07)",border:"0.5px solid rgba(224,80,80,.25)",borderRadius:8,padding:"8px 12px",margin:"10px 0" }}>
                  <p style={{ fontSize:11,color:RD }}>⚠️ Phase de test : autorisation du Leader Emerald+ requise.</p>
                </div>
                {PAYS.map((p,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:10,padding:"6px 8px",background:p.test?"rgba(224,80,80,.04)":"rgba(255,255,255,.02)",borderRadius:6,marginBottom:3,border:"0.5px solid "+(p.test?"rgba(224,80,80,.12)":"rgba(255,255,255,.04)") }}>
                    <span style={{ fontSize:16 }}>{p.flag}</span>
                    <span style={{ fontSize:12,flex:1,color:p.test?MU:TX }}>{p.name}</span>
                    {p.test&&<span style={{ fontSize:9,color:RD,border:"0.5px solid rgba(224,80,80,.35)",borderRadius:10,padding:"1px 6px" }}>test</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {sub==="scripts"&&(
        <div className="sb">
          <div className="cardg" style={{ marginBottom:14 }}>
            <p style={{ fontSize:12,color:G,fontWeight:500,marginBottom:4 }}>💬 Scripts de contact</p>
            <p style={{ fontSize:12,color:MU,lineHeight:1.65 }}>4 scripts eprouves. Personnalise toujours avec le prenom.</p>
          </div>
          {SCRIPTS.map(s=>(
            <div key={s.id} className="scrd">
              <div className="shdr" onClick={()=>setOpenSc(openSc===s.id?null:s.id)}>
                <div><p style={{ fontSize:13,fontWeight:600 }}>{s.title}</p><p style={{ fontSize:11,color:MU,marginTop:2 }}>{s.ctx}</p></div>
                <span style={{ color:G }}>{openSc===s.id?"▲":"▼"}</span>
              </div>
              {openSc===s.id&&(
                <div style={{ padding:"0 15px 15px",borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                  <div style={{ background:"rgba(201,168,76,.05)",border:"0.5px solid rgba(201,168,76,.14)",borderRadius:10,padding:13,fontSize:13,lineHeight:1.7,margin:"12px 0",color:"#ddd",fontStyle:"italic" }}>{s.text}</div>
                  <div style={{ fontSize:11,color:MC,padding:"7px 11px",background:"rgba(126,200,154,.07)",borderRadius:8,marginBottom:10 }}>💡 {s.tip}</div>
                  <button className="btn-o" style={{ width:"100%" }} onClick={()=>navigator.clipboard?.writeText(s.text).then(()=>alert("Script copie ! 📋"))}>📋 Copier le script</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {sub==="quiz"&&(
        <div className="sb">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <p style={{ fontSize:13,fontWeight:500 }}>Quiz de Certification</p>
            <span className="badge" style={{ background:"rgba(201,168,76,.14)",color:G }}>12/15 requis</span>
          </div>
          {!qdone?(
            <div style={{display:"contents"}}>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:10 }}>
                  <p style={{ fontSize:13,fontWeight:500,marginBottom:10,lineHeight:1.45 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(<button key={oi} className={`qopt ${qa[q.id]===oi?"sel":""}`} onClick={()=>setQa(p=>({...p,[q.id]:oi}))}>{opt}</button>))}
                </div>
              ))}
              <button className="btn-p" style={{ width:"100%",marginTop:8 }} onClick={()=>{ if(Object.keys(qa).length<QUIZ.length){alert("Reponds a toutes les questions !");return;} setQdone(true); }}>Valider le quiz</button>
            </div>
          ):(
            <div style={{display:"contents"}}>
              <div className={score>=12?"cardg":"card"} style={{ textAlign:"center",padding:24,marginBottom:16 }}>
                <p style={{ fontSize:40,marginBottom:8 }}>{score>=12?"🎓":"📚"}</p>
                <p style={{ fontSize:30,fontWeight:700,color:score>=12?G:RD }}>{score}/15</p>
                <p style={{ fontSize:13,marginTop:8,color:"#ccc" }}>{score>=12?"Certification obtenue ! Felicitations ! 🎉":"Score insuffisant — revise et reessaie (12/15 requis)"}</p>
              </div>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:8 }}>
                  <p style={{ fontSize:12,fontWeight:500,marginBottom:8,lineHeight:1.4 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(<button key={oi} className={`qopt ${oi===q.correct?"ok":qa[q.id]===oi&&oi!==q.correct?"ko":""}`}>{opt}</button>))}
                </div>
              ))}
              <button className="btn-o" style={{ width:"100%",marginTop:8 }} onClick={()=>{setQa({});setQdone(false);}}>Reprendre le quiz</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────────
export default function ChoganApp() {
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("accueil");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [perfumes, setPerfumes] = useState(DEMO_PERFUMES);
  const [checklist, setChecklist] = useState(CHECKLIST0);
  const [showPromo, setShowPromo] = useState(false);

  const handleLogin = (p,n,code) => {
    const admin=code==="MAR74B59D";
    setPrenom(p); setNom(n); setIsAdmin(admin);
    const key="chogan_seen_"+(p+n).toLowerCase().replace(/\s/g,"");
    const isNew=!localStorage.getItem(key);
    if(isNew&&!admin){ localStorage.setItem(key,new Date().toLocaleDateString("fr-FR")); trackAction(p+" "+n,"accueil","premiere-connexion"); }
    else { trackAction(p+" "+n,"accueil",admin?"connexion-admin":"connexion"); }
    setScreen("app");
  };

  const changeTab = (newTab) => { setShowPromo(false); setTab(newTab); trackAction(prenom+" "+nom,newTab,"navigation"); };

  const TABS = [
    { id:"accueil",      lbl:"Accueil",     ic:"🏠" },
    { id:"formation",    lbl:"Formation",   ic:"🚀" },
    { id:"inspirations", lbl:"Inspirations",ic:"🌹" },
    { id:"familles",     lbl:"Familles",    ic:"💐" },
    { id:"catalogues",   lbl:"Catalogue",   ic:"💄" },
    { id:"commande",     lbl:"Commande",    ic:"💶" },
    { id:"checklist",    lbl:"Check-list",  ic:"✨" },
    { id:"promo",        lbl:"Promo",       ic:"%" },
    { id:"convertisseur",lbl:"Convertis.",  ic:"💱" },
  ];

  const activeLabel = TABS.find(t=>t.id===tab)?.lbl||"";

  if(screen==="login") return (
    <div style={{ background:BG,minHeight:"100vh" }}>
      <style>{CSS}</style>
      <LoginView onLogin={handleLogin} />
    </div>
  );

  return (
    <div style={{ background:BG,minHeight:"100vh" }}>
      <style>{CSS}</style>
      <UpdateBanner />
      <div className="app">
        <nav className="lnav">
          <div style={{ width:40,height:40,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"1.5px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10,marginTop:4,flexShrink:0 }}>
            <span style={{ fontFamily:"serif",fontSize:18,color:"#c9a84c",fontWeight:700 }}>C</span>
          </div>
          <div className="lnav-inner">
            {TABS.map(t=>(
              <button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>changeTab(t.id)}>
                <span className="nic">{t.ic}</span>
                <span className="nlbl">{t.lbl}</span>
              </button>
            ))}
          </div>
        </nav>
        <div className="content-wrap">
          <header className="hdr">
            <div style={{ width:30,height:30,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"1.5px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginRight:8,flexShrink:0 }}>
              <span style={{ fontFamily:"serif",fontSize:14,color:"#c9a84c",fontWeight:700 }}>C</span>
            </div>
            <span className="logo">Team Marie 🌷</span>
            <span className="hdr-sub">{activeLabel}</span>
            <button onClick={()=>{ if(window.confirm("Se deconnecter ?")) setScreen("login"); }}
              style={{ marginLeft:"auto",background:"none",border:"0.5px solid rgba(224,80,80,.35)",color:RD,borderRadius:8,padding:"4px 10px",fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:.5 }}>
              ⏻ Quitter
            </button>
          </header>
          <main className="main">
            {showPromo
              ? <PromoView onBack={()=>setShowPromo(false)} />
              : <div style={{display:"contents"}}>
                  {tab==="accueil"       && <AccueilView prenom={prenom} isAdmin={isAdmin} />}
                  {tab==="formation"     && <LancementView />}
                  {tab==="inspirations"  && <CatalogueView perfumes={perfumes} setPerfumes={setPerfumes} />}
                  {tab==="familles"      && <FamilleView />}
                  {tab==="catalogues"    && <CataloguesView />}
                  {tab==="commande"      && <BonCommandeView perfumes={perfumes} />}
                  {tab==="convertisseur" && <ConvertisseurView />}
                  {tab==="checklist"     && <ChecklistView checklist={checklist} setChecklist={setChecklist} />}
                  {tab==="promo"         && <PromoView />}
                </div>
            }
          </main>
        </div>
      </div>
    </div>
  );
}
