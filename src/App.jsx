import React, { useState, useRef } from "react";

const APP_VERSION = "3.0";
const G = "#c9a84c", GL = "#e8d48a", BG = "#07070f", S1 = "#0f0f1e", S2 = "#17172a";
const TX = "#f0ede8", MU = "#787896", HC = "#d4d4e2", FC = "#f4a0b5", MC = "#7ec89a", RD = "#e05050";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzOBoyWxfPgf_8r37SmXAd4fQVGwAFlyW0bUu1LVgWHGkpWe_rvosJSHppKa3M3UFYaCg/exec";
function trackAction(p,o,a){try{fetch(SHEET_URL+"?"+new URLSearchParams({prenom:p||"Anonyme",onglet:o,action:a}),{method:"GET",mode:"no-cors"});}catch(e){}}
async function getMurs(){try{const r=await fetch(SHEET_URL+"?action=getMurs");return await r.json();}catch(e){return null;}}
async function saveMurs(a,s){try{fetch(SHEET_URL+"?"+new URLSearchParams({action:"saveMurs",anns:JSON.stringify(a),sucs:JSON.stringify(s)}),{method:"GET",mode:"no-cors"});}catch(e){}}

const CODES_VALIDES=["SHAC7CB8F","TRAEB240A","MIL1B11E0","SEL2D06DE","YASD2F154","ISA98670B","BLABC677B","BAY2CAEB0","SOPB7D832","NAD7354BF","SAR0E4537","NAD93A481","MELB42DE5","CAS04EBF2","SOU36AE1C","ADA7DBE89","KAR96A897","MER2105D7","NO81BN48","YAS2794C9","NAD5B1TAR","KHAE674E2"];
const gc=g=>g==="homme"?HC:g==="femme"?FC:MC;

// ── 132 INSPIRATIONS ──
const DEMO_PERFUMES=[
{id:1,name:"One Million",brand:"P. Rabanne",ref:"001",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:2,name:"Acqua Di Gio",brand:"G. Armani",ref:"002",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:3,name:"Fahrenheit",brand:"C. Dior",ref:"003",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:4,name:"The One",brand:"D&G",ref:"004",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:5,name:"Opium",brand:"Y. Saint Laurent",ref:"006",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:6,name:"J'Adore",brand:"C. Dior",ref:"007",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:7,name:"Alien",brand:"T. Mugler",ref:"010",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:8,name:"Light Blue F",brand:"D&G",ref:"011",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:9,name:"Eau Sauvage",brand:"C. Dior",ref:"012",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:10,name:"Manifesto",brand:"YSL",ref:"014",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:11,name:"Roma",brand:"L. Biagiotti",ref:"015",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:12,name:"Le Mâle",brand:"JP. Gaultier",ref:"016",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:13,name:"Déclaration",brand:"Cartier",ref:"018",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:14,name:"Lady Million",brand:"P. Rabanne",ref:"019",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:15,name:"La Nuit de l'Homme",brand:"YSL",ref:"020",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:16,name:"Light Blue H",brand:"D&G",ref:"021",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:17,name:"Terre d'Hermès",brand:"Hermès",ref:"022",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:18,name:"Hypnotic Poison",brand:"C. Dior",ref:"023",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:19,name:"Chanel n°5",brand:"Chanel",ref:"024",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:20,name:"For Her",brand:"N. Rodriguez",ref:"025",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:21,name:"Flower",brand:"Kenzo",ref:"026",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:22,name:"Trésor",brand:"Lancôme",ref:"027",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:23,name:"Angel",brand:"T. Mugler",ref:"028",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:24,name:"Eau D'Issey",brand:"I. Miyake",ref:"029",gender:"femme",sizes:["100ml","30ml","15ml"],prices:{"100ml":35,"30ml":18,"15ml":11.90}},{id:25,name:"Black XS",brand:"P. Rabanne",ref:"030",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:26,name:"Spice Bomb",brand:"Viktor & Rolf",ref:"032",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:27,name:"Black Code",brand:"G. Armani",ref:"033",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:28,name:"Man",brand:"Bvlgari",ref:"037",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:29,name:"Bleu",brand:"Chanel",ref:"038",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:30,name:"Miss Dior Chérie",brand:"C. Dior",ref:"039",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:31,name:"Hypnose",brand:"Lancôme",ref:"040",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:32,name:"La Vie est Belle",brand:"Lancôme",ref:"042",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:33,name:"Silver Montain Water",brand:"Creed",ref:"044",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:34,name:"Crystal Noir",brand:"Versace",ref:"047",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:35,name:"Allure H",brand:"Chanel",ref:"048",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:36,name:"Dolce",brand:"D&G",ref:"049",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:37,name:"Coco Mademoiselle",brand:"Chanel",ref:"051",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:38,name:"Pasha",brand:"Cartier",ref:"052",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:39,name:"Narciso",brand:"N. Rodriguez",ref:"053",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:40,name:"Black Orchid",brand:"T. Ford",ref:"054",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:41,name:"Black Opium",brand:"YSL",ref:"055",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:42,name:"Ange ou Démon",brand:"Givenchy",ref:"056",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:43,name:"Omnia Améthyste",brand:"Bvlgari",ref:"057",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:44,name:"Invictus",brand:"P. Rabanne",ref:"061",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:45,name:"Intenso",brand:"D&G",ref:"062",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:46,name:"Olympéa",brand:"P. Rabanne",ref:"067",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:47,name:"Aventus",brand:"Creed",ref:"068",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":57,"30ml":29.50,"15ml":17.90}},{id:48,name:"Acqua di Sale",brand:"P. Roma",ref:"069",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:49,name:"The One F",brand:"D&G",ref:"070",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:50,name:"Allure F",brand:"Chanel",ref:"071",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:51,name:"Patchouli",brand:"Reminiscence",ref:"072",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:52,name:"Himalaya",brand:"Creed",ref:"073",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:53,name:"Black Afgano",brand:"Nasomatto",ref:"074",gender:"homme",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:54,name:"X for Men",brand:"Clive Christian",ref:"075",gender:"homme",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:55,name:"Acqua di Gioia",brand:"G. Armani",ref:"076",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:56,name:"Myslf",brand:"YSL",ref:"079",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:57,name:"Si",brand:"G. Armani",ref:"080",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:58,name:"Classique Essence",brand:"JP. Gaultier",ref:"081",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:59,name:"Signorina",brand:"S. Ferragamo",ref:"082",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:60,name:"Dylan Blue",brand:"Versace",ref:"084",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:61,name:"Chance",brand:"Chanel",ref:"085",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:62,name:"Legend",brand:"Mont Blanc",ref:"086",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:63,name:"Wanted",brand:"Azzaro",ref:"087",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:64,name:"Man in Black",brand:"Bvlgari",ref:"088",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:65,name:"Mon Paris",brand:"YSL",ref:"089",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:66,name:"Poison Girl",brand:"C. Dior",ref:"090",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:67,name:"Chrome",brand:"Azzaro",ref:"091",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:68,name:"Aventus for Her",brand:"Creed",ref:"093",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":57,"30ml":29.50,"15ml":17.90}},{id:69,name:"Sauvage",brand:"C. Dior",ref:"094",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:70,name:"Gabrielle",brand:"Chanel",ref:"095",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:71,name:"Amo Ferragamo",brand:"S. Ferragamo",ref:"097",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:72,name:"Joy",brand:"C. Dior",ref:"098",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:73,name:"Mandarino Amalfi",brand:"T. Ford",ref:"099",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":45,"30ml":23.50,"15ml":13.90}},{id:74,name:"White Aoud",brand:"Montale",ref:"100",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:75,name:"Velvet Amber Skin",brand:"D&G",ref:"101",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:76,name:"Velvet Amber Sun",brand:"D&G",ref:"102",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:77,name:"Intense Café",brand:"Montale",ref:"105",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:78,name:"Fucking Fabulous",brand:"T. Ford",ref:"106",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:79,name:"J'Adore l'Or",brand:"C. Dior",ref:"109",gender:"femme",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:80,name:"Kirké",brand:"T. Terenzi",ref:"110",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},
{id:81,name:"Lost Cherry",brand:"T. Ford",ref:"111",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:82,name:"Neroli Portofino",brand:"T. Ford",ref:"112",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:83,name:"Sur la Route",brand:"L. Vuitton",ref:"113",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":57,"30ml":29.50,"15ml":17.90}},{id:84,name:"Ombre Nomade",brand:"L. Vuitton",ref:"114",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:85,name:"Idôle",brand:"Lancôme",ref:"115",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:86,name:"Yes I Am",brand:"Cacharel",ref:"116",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:87,name:"Tobacco Vanille",brand:"T. Ford",ref:"117",gender:"homme",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:88,name:"Baccarat Rouge 540",brand:"Maison Francis K.",ref:"118",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:89,name:"Scandal",brand:"JP. Gaultier",ref:"119",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:90,name:"La Petite Robe Noire",brand:"Guerlain",ref:"120",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:91,name:"L'Interdit",brand:"Givenchy",ref:"121",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:92,name:"Libre",brand:"YSL",ref:"122",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:93,name:"Good Girl Gone Bad",brand:"Kilian",ref:"123",gender:"femme",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:94,name:"Zeta",brand:"Morph",ref:"124",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:95,name:"Sole di Positano",brand:"T. Ford",ref:"125",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:96,name:"Soleil Blanc",brand:"T. Ford",ref:"126",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:97,name:"Oud Wood",brand:"T. Ford",ref:"127",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:98,name:"Vanille Fatale",brand:"T. Ford",ref:"128",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:99,name:"Erba Pura",brand:"Xerjoff",ref:"129",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:100,name:"Megamare",brand:"Orto Parisi",ref:"130",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":65,"15ml":22.90}},
{id:101,name:"Good Girl",brand:"C. Herrera",ref:"131",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":48,"30ml":25.50,"15ml":14.90}},{id:102,name:"My Way",brand:"G. Armani",ref:"132",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":45,"30ml":23.50,"15ml":13.90}},{id:103,name:"Prada Paradoxe",brand:"Prada",ref:"133",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:104,name:"Bitter Peach",brand:"T. Ford",ref:"134",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:105,name:"Bois d'Argent",brand:"C. Dior",ref:"135",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":57,"30ml":29.50,"15ml":17.90}},{id:106,name:"Dior Homme Intense",brand:"C. Dior",ref:"136",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":45,"30ml":23.50,"15ml":13.90}},{id:107,name:"XJ 1861 Naxos",brand:"Xerjoff",ref:"137",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:108,name:"Wood Whisper",brand:"Ojar",ref:"138",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:109,name:"Les Sables Roses",brand:"L. Vuitton",ref:"139",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":65,"15ml":22.90}},{id:110,name:"Éros",brand:"Versace",ref:"140",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:111,name:"Turath",brand:"Spirit of Dubaï",ref:"141",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":65,"15ml":22.90}},{id:112,name:"Ombré Leather",brand:"T. Ford",ref:"142",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":57,"30ml":29.50,"15ml":17.90}},{id:113,name:"Vanille Powder",brand:"Matière Première",ref:"143",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:114,name:"Bianco Latte",brand:"Giardini Toscana",ref:"144",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:115,name:"Dévotion",brand:"D&G",ref:"145",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:116,name:"Rouge",brand:"Balmain",ref:"146U",gender:"mixte",sizes:["50ml","15ml"],prices:{"50ml":52,"15ml":19.90}},{id:117,name:"BOSS Bottled Absolu",brand:"H. Boss",ref:"147M",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:118,name:"Goddess",brand:"Burberry",ref:"148W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:119,name:"Hugo H",brand:"H. Boss",ref:"150M",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:120,name:"Guilty F",brand:"Gucci",ref:"151W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:121,name:"Guilty H",brand:"Gucci",ref:"152M",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:122,name:"Chloé",brand:"Chloé",ref:"153W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:123,name:"Love Chloé",brand:"Chloé",ref:"154W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:124,name:"CK One",brand:"C. Klein",ref:"155U",gender:"mixte",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:125,name:"Hugo F",brand:"H. Boss",ref:"156W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:126,name:"The Scent",brand:"H. Boss",ref:"157W",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:127,name:"Flora",brand:"Gucci",ref:"158W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:128,name:"Burberry F",brand:"Burberry",ref:"159W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:129,name:"Burberry H",brand:"Burberry",ref:"160M",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:130,name:"Born Roma F",brand:"Valentino",ref:"161W",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
{id:131,name:"Born Roma H",brand:"Valentino",ref:"162M",gender:"homme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},{id:132,name:"Omnia Indian",brand:"Bvlgari",ref:"064",gender:"femme",sizes:["70ml","30ml","15ml"],prices:{"70ml":35,"30ml":18,"15ml":11.90}},
];

// ── VAMP + SONCAS + MÉTHODES + TECHNIQUES + OBJECTIONS ──
const VAMP={V:{label:"Vente",color:"#e74c3c",icon:"🎯",q:["Je propose systématiquement les parfums Chogan","Je fais des ventes complémentaires","Je propose un choix au client","J'incite à découvrir les promos","Je continue après un refus"]},A:{label:"Accueil",color:"#3498db",icon:"😊",q:["J'accueille avec courtoisie et sourire","Je suis à l'aise avec les nouveaux contacts","Je crée une bonne ambiance","Je varie mes approches","Je remercie même sans achat"]},M:{label:"Méthodes",color:"#27ae60",icon:"📐",q:["Je connais parfaitement mes produits","Je détecte les motivations (SONCAS)","Je reformule pour comprendre","Je sais conclure avec les hésitants","Je suis attentive aux détails"]},P:{label:"Personnalité",color:"#9b59b6",icon:"💎",q:["J'ai de l'enthousiasme","Je suis confiante et rassurante","J'argumente pour tout produit","Je maîtrise ma timidité","J'utilise l'humour"]}};

const SONCAS=[{l:"S",w:"Sécurité",c:"#2980b9",ic:"🛡️",app:"Certifié bio, Grasse",ph:["C'est garanti, des milliers de clients fidèles.","Essences de Grasse, la référence mondiale."]},{l:"O",w:"Orgueil",c:"#8e44ad",ic:"👑",app:"Extrait de Parfum noble",ph:["La catégorie la plus noble.","Le choix des connaisseurs."]},{l:"N",w:"Nouveauté",c:"#e74c3c",ic:"✨",app:"Nouveau catalogue",ph:["Tout nouveau, ça vient de sortir !","Concept unique."]},{l:"C",w:"Confort",c:"#27ae60",ic:"🛋️",app:"Simple, livré, sans engagement",ph:["Vous testez chez vous, zéro engagement.","Je m'occupe de tout."]},{l:"A",w:"Argent",c:"#f39c12",ic:"💰",app:"Prix 3x inférieurs",ph:["29€ au lieu de 90€, même qualité.","Vous payez le produit, pas la pub."]},{l:"S2",w:"Sympathie",c:"#e67e22",ic:"😊",app:"Conseil personnalisé",ph:["Je conseille, pas de pression.","On trouve LE parfum."]}];

const METH=[{code:"P",name:"Promotionnelle",c:"#e74c3c",ic:"🏷️",d:"Promo en cours",ex:["2 achetés = le 3e à -50% !","Livraison offerte avant fin du mois.","Offre spéciale coffrets !"]},{code:"C",name:"Complémentaire",c:"#3498db",ic:"➕",d:"En complément",ex:["Le lait corporel assorti.","Notre crème de nuit bio.","Le coffret gel douche."]},{code:"A",name:"Additionnelle",c:"#27ae60",ic:"🎁",d:"Sans lien direct",ex:["Nos parfums d'intérieur !","Échantillons cosmétiques bio.","Produits ménagers écologiques."]}];

const TECH=[{code:"Q?",name:"Question",c:"#9b59b6",ic:"❓",ex:["Vous connaissez les Extraits ?","Qu'est-ce que vous portez ?"]},{code:"PA",name:"Alternative",c:"#e67e22",ic:"🔄",ex:["Florale ou boisée ?","Format 30 ou 70ml ?"]},{code:"Si",name:"Méthode du Si",c:"#1abc9c",ic:"💡",ex:["Si vous aimez les notes fraîches…","Si vous voulez profiter de la promo…"]},{code:"Arg",name:"Argument",c:"#e74c3c",ic:"🎯",ex:["30% d'essence, le double du standard.","Même fournisseur que les grandes marques."]},{code:"Cl",name:"Conclusion",c:"#27ae60",ic:"✅",ex:["Je vous mets le floral et le boisé ?","Je vous envoie le lien."]}];

const OBJ=[{o:"C'est de la contrefaçon ?",t:"réelle",r:"Une odeur ne se brevète pas. Essences de Grasse. Inspiration légale.",k:"Reformulation"},{o:"C'est trop cher !",t:"réelle",r:"29€ pour 30% d'essence vs 90€ pour 15%. Vous payez le produit.",k:"Comparaison"},{o:"Ça ne tient pas",t:"réelle",r:"30% d'essence, tenue 8 à 24h. Testez l'échantillon.",k:"Preuve"},{o:"Ça sent pas pareil",t:"réelle",r:"Alcools naturels. Laissez 10 min, le fond se révèle.",k:"Explication"},{o:"J'ai pas le temps",t:"prétexte",r:"Un échantillon + ma carte. L'odeur fait le travail !",k:"Trace"},{o:"Ça m'intéresse pas",t:"prétexte",r:"Tenez cet échantillon, sans engagement !",k:"Sourire"},{o:"J'ai pas de place (pro)",t:"pro",r:"3 flacons < une pile de magazines. Vous encaissez, je gère.",k:"Solution"},{o:"Je suis pas vendeuse",t:"pro",r:"Clientes testent en autonomie. Vous encaissez. C'est tout.",k:"Facilité"}];

const BAD=[{b:"T'as pas besoin d'autre chose ?",g:"Puis-je vous faire découvrir autre chose ?"},{b:"Ça vous intéresse ou pas ?",g:"Je vous laisse un échantillon pour tester."},{b:"C'est pas cher pour ce que c'est",g:"30% d'essence, c'est du premium."},{b:"Vous voulez rien d'autre ?",g:"Vous connaissez notre gamme bio ?"},{b:"C'est pas une copie !",g:"Essences de Grasse, inspiration légale."},{b:"Le chef est pas là",g:"Je me renseigne et je reviens vers vous."}];

const SCRIPTS=[{id:1,t:"Contact naturel",ctx:"Quelqu'un que tu connais",txt:"Salut [Prénom] ! J'ai pensé à toi — je travaille avec les parfums Chogan. Qualité luxe, prix accessible. On en parle 5 min ?",tip:"Personnaliser."},{id:2,t:"Relance douce",ctx:"Sans réponse",txt:"Coucou [Prénom] ! C'est encore un bon moment ? Pas de pression !",tip:"Max 2 relances."},{id:3,t:"Atelier parfum",ctx:"Découverte",txt:"Hey ! J'organise un atelier parfum [Date]. On teste, sans obligation. Tu passes ?",tip:"Crée la confiance."},{id:4,t:"Opportunité",ctx:"Recrutement",txt:"[Prénom], tu voudrais découvrir comment gagner 300 à 1500€/mois en recommandant des parfums ?",tip:"Profils entrepreneur."},{id:5,t:"Approche B2B",ctx:"Pros",txt:"Bonjour ! Je suis [Prénom], partenaire Chogan. J'aide les pros à générer un revenu sans stock. 2 minutes ?",tip:"PARTENARIAT."},{id:6,t:"Suivi 48h",ctx:"Après échantillon",txt:"Bonjour ! Vous avez testé le parfum ? Qu'en pensez-vous ?",tip:"Moment CLÉ."}];

const QUIZ=[{q:"Concentration Chogan ?",o:["Eau Toilette 5-10%","Eau Parfum 12-15%","Extrait 30%","Cologne 3%"],c:2},{q:"Origine des essences ?",o:["Chine","Grasse, France","Italie","Allemagne"],c:1},{q:"Pourquoi prix bas ?",o:["Qualité inférieure","Zéro pub/égérie","Périmés","Contrefaçon"],c:1},{q:"Tenue ?",o:["1-3h","4-6h","8-24h","48h"],c:2},{q:"SONCAS : le O ?",o:["Originalité","Orgueil","Optimisme","Occasion"],c:1},{q:"Réponse contrefaçon ?",o:["Oui mais ça sent pareil","Inspiration légale, Grasse","Secret","Je sais pas"],c:1},{q:"Vente complémentaire ?",o:["Un 2e parfum","Lait corporel assorti","Un téléphone","Rien"],c:1},{q:"Technique du Si ?",o:["Si vous voulez rien…","Si vous aimez les notes fraîches…","Si c'est trop cher…","Si vous partez…"],c:1},{q:"Suivi après échantillon ?",o:["Jamais","48-72h","2 semaines","Tous les jours"],c:1},{q:"J'ai pas le temps ?",o:["Insister","Échantillon + carte","S'énerver","Abandonner"],c:1},{q:"VAMP : le A ?",o:["Argument","Accueil","Action","Ambition"],c:1},{q:"Phrase MAUVAISE ?",o:["Gamme bio ?","Besoin d'autre chose ?","Notes boisées ?","Échantillon ?"],c:1},{q:"B2B = on parle de ?",o:["Vente","Partenariat","Démarchage","Business"],c:1},{q:"Règle d'or accueil ?",o:["Vendre sans accueillir","Pas vendre sans accueillir","Accueil secondaire","Vendre d'abord"],c:1},{q:"3 méthodes = ?",o:["P, C, A","V, A, M","S, O, N","Q, Si, Cl"],c:0}];

const CHECKLIST0=[{id:1,text:"Inscription Limitless"},{id:2,text:"Module : Démarrage"},{id:3,text:"Module : Les bases du succès"},{id:4,text:"Module : Marketing d'action"},{id:5,text:"Module : L'art de mieux vendre"},{id:6,text:"Module : Gammes Chogan"},{id:7,text:"Module : TikTok Academy"},{id:8,text:"Module : Marketing d'attraction"},{id:9,text:"Liste de contacts"},{id:10,text:"Première vente"},{id:11,text:"Autodiagnostic VAMP"},{id:12,text:"Quiz certification (12/15)"}].map(i=>({...i,done:false}));

const FAMILLES=[
{id:"ambree",emoji:"🟠",nom:"Ambrée/Orientale",couleur:"#c97c3a",style:"CHAUD·SENSUEL",notes:"Vanille, ambroxan, patchouli, résines",pourQui:"Séduire, plaire, laisser un sillage",sf:[{n:"Ambré Épicé",r:["006","033","117"]},{n:"Ambré Boisé",r:["010","015","030","037","048","072","073","114","127","141"]},{n:"Oriental Vanillé",r:["023","028","055","090","105","111","118","121","128","134","144"]}]},
{id:"fleurie",emoji:"🌸",nom:"Fleurie",couleur:"#d45c8a",style:"ÉLÉGANCE·FÉMINITÉ",notes:"Rose, jasmin, fleur d'oranger",pourQui:"Femmes élégantes, délicatesse",sf:[{n:"Floral Fruité",r:["007","011","019","042","082","120"]},{n:"Floral Boisé",r:["025","053","057","098"]},{n:"Floral Aquatique",r:["029","076"]}]},
{id:"boisee",emoji:"🪵",nom:"Boisée",couleur:"#8b6242",style:"LUXUEUX·CHALEUREUX",notes:"Cèdre, santal, tabac",pourQui:"Hommes sûrs d'eux, maturité",sf:[{n:"Boisé Épicé",r:["001","004","020","022","032","087"]},{n:"Boisé Aromatique",r:["038","052","136"]},{n:"Boisé Aquatique",r:["061","069"]}]},
{id:"chypree",emoji:"🍃",nom:"Chyprée",couleur:"#4a7a4a",style:"CARACTÈRE",notes:"Bergamote, mousse de chêne",pourQui:"Forte personnalité",sf:[{n:"Chypré Fruité",r:["039","068","080","093","110"]},{n:"Chypré Floral",r:["085","089","115","119"]}]},
{id:"hesperidee",emoji:"🍋",nom:"Hespéridée",couleur:"#b8a030",style:"FRAIS·LÉGER",notes:"Agrumes, citron, bergamote",pourQui:"Fraîcheur, tout âge",sf:[{n:"Hespéridés",r:["012","021","091","099","112","113"]}]},
{id:"fougere",emoji:"🫧",nom:"Fougère",couleur:"#6a6aba",style:"VIRIL·PUISSANT",notes:"Lavande, vétiver",pourQui:"Hommes virils",sf:[{n:"Fougère Aromatique",r:["084","086","094"]},{n:"Cuiré",r:["106","142"]}]},
];

const CATALOGUES=[{ic:"🌸",t:"Parfums",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1739360788_documents"},{ic:"🏠",t:"Ambiance",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736340849_documents"},{ic:"💧",t:"Huiles",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1732103472_documents"},{ic:"🌿",t:"LOLUM",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1728551530_documents"},{ic:"💄",t:"Maquillage",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1741095206_documents"},{ic:"🕶",t:"Lunettes",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740996419_documents"},{ic:"🧹",t:"Ménager",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1738679717_documents"},{ic:"🌱",t:"Bien-être",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736256904_documents"},{ic:"💊",t:"Peptilux",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740410027_documents"},{ic:"💪",t:"Supplefit",u:"https://www.chogangroup.com/dflip/page_flip.php?doc=1733905272_documents"}];

const TELEGRAMS=[{ic:"📸",t:"Story",u:"https://t.me/+FlsHgrOtL64wOGFk"},{ic:"📅",t:"Calendly",u:"https://t.me/+ICxJuEEFHg04MzJk"},{ic:"🖼️",t:"Pictures",u:"https://t.me/+1zWQawmuayo0ZTc0"},{ic:"🗓️",t:"90 Jours",u:"https://t.me/+AAX6DoGpg48wZTdk"},{ic:"💰",t:"Pro Vente",u:"https://t.me/+akYPbYLQ3kcxYzdk"},{ic:"⭐",t:"Preuve Sociale",u:"https://t.me/+Ylo19O_dBQ01ODE0"}];

// ── PRODUITS PROMO ──
const PRODUITS_PROMO=[{id:"15ml",nom:"15 ML",prixEur:5.95,transport:1.80,emb:0.48},{id:"30ml",nom:"30 ML",prixEur:9.00,transport:1.80,emb:0.48},{id:"70ml",nom:"70 ML",prixEur:17.50,transport:1.80,emb:0.48},{id:"lux1",nom:"Luxury 22,50€",prixEur:22.50,transport:1.80,emb:0.48},{id:"lux2",nom:"Luxury 26€",prixEur:26.00,transport:1.80,emb:0.48},{id:"lux3",nom:"Luxury 32,50€",prixEur:32.50,transport:1.80,emb:0.48},{id:"lux4",nom:"Luxury 38,75€",prixEur:38.75,transport:1.80,emb:0.48}];

// ── STYLES ──
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html,body,#root{background:${BG};color:${TX};font-family:'DM Sans',system-ui,sans-serif;min-height:100vh;-webkit-tap-highlight-color:transparent}
.app{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:row;overflow-x:hidden}
.lnav{width:52px;min-height:100vh;background:#0a0a1a;border-right:0.5px solid rgba(201,168,76,.12);display:flex;flex-direction:column;align-items:center;padding:8px 0;position:fixed;left:0;top:0;z-index:200;overflow-y:auto}
.nb{width:52px;border:none;background:transparent;color:${MU};padding:7px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;transition:color .15s;font-family:'DM Sans',sans-serif}
.nb.on{color:${G}}
.nic{font-size:16px;line-height:1}
.nlbl{font-size:6.5px;letter-spacing:.2px;text-transform:uppercase;text-align:center;line-height:1.1}
.cw{flex:1;margin-left:52px;min-height:100vh;display:flex;flex-direction:column;max-width:378px}
.hdr{background:#0a0a1a;border-bottom:0.5px solid rgba(201,168,76,.18);padding:10px 14px;display:flex;align-items:center;position:sticky;top:0;z-index:100}
.logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;font-weight:700;color:${G};letter-spacing:2px;text-transform:uppercase}
.main{flex:1;overflow-y:auto}
.card{background:${S1};border:0.5px solid rgba(255,255,255,.07);border-radius:12px;padding:13px;margin-bottom:9px}
.cardg{background:${S1};border:0.5px solid rgba(201,168,76,.22);border-radius:12px;padding:13px;margin-bottom:9px}
.sh{padding:16px 16px 0;display:flex;align-items:center;justify-content:space-between;margin-bottom:2px}
.sht{font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:600;color:${G}}
.sb{padding:10px 16px}
.btn-p{background:linear-gradient(135deg,${G},#a8872e);color:#07070f;border:none;border-radius:50px;padding:12px 24px;font-family:'DM Sans';font-weight:600;font-size:13px;cursor:pointer;text-transform:uppercase;letter-spacing:.5px}
.btn-o{background:transparent;color:${G};border:0.5px solid rgba(201,168,76,.4);border-radius:8px;padding:7px 14px;font-size:12px;font-family:'DM Sans';cursor:pointer}
.btn-d{background:transparent;color:${RD};border:0.5px solid rgba(224,80,80,.28);border-radius:8px;padding:5px 12px;font-size:11px;font-family:'DM Sans';cursor:pointer}
.ftabs{display:flex;gap:5px;padding:8px 16px;overflow-x:auto;scrollbar-width:none}.ftabs::-webkit-scrollbar{display:none}
.ftab{background:${S1};border:0.5px solid rgba(255,255,255,.07);color:${MU};border-radius:20px;padding:5px 12px;font-size:11px;white-space:nowrap;cursor:pointer;font-family:'DM Sans';transition:all .15s}
.ftab.on{background:rgba(201,168,76,.1);border-color:${G};color:${G}}
.srch{width:calc(100% - 32px);margin:0 16px 8px;background:${S1};border:0.5px solid rgba(255,255,255,.07);color:${TX};border-radius:10px;padding:8px 12px;font-size:13px;font-family:'DM Sans';outline:none}
.srch:focus{border-color:rgba(201,168,76,.32)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:4px 16px 12px}
.pcrd{background:${S1};border-radius:10px;padding:10px;border-left:3px solid}
.rlink{display:flex;align-items:center;gap:12px;padding:12px 14px;background:${S1};border-radius:10px;margin-bottom:7px;border:0.5px solid rgba(255,255,255,.06);cursor:pointer;color:${TX};text-decoration:none}
.rlink:hover{background:${S2}}
.ci{display:flex;align-items:flex-start;gap:10px;padding:10px;border-radius:10px;background:${S1};margin-bottom:6px;cursor:pointer}
.cbox{width:20px;height:20px;border-radius:6px;border:1.5px solid rgba(201,168,76,.38);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.cbox.ck{background:${G};border-color:${G}}
.pbar-w{height:5px;background:rgba(255,255,255,.05);border-radius:10px;overflow:hidden;margin:5px 0}
.pbar{height:100%;background:linear-gradient(90deg,${G},${GL});border-radius:10px;transition:width .3s}
.scrd{background:${S1};border-radius:10px;margin-bottom:8px;border:0.5px solid rgba(255,255,255,.06);overflow:hidden}
.shdr{padding:12px 14px;display:flex;align-items:center;justify-content:space-between;cursor:pointer}
.inp{background:${S1};border:0.5px solid rgba(255,255,255,.09);color:${TX};border-radius:8px;padding:8px 12px;font-size:13px;font-family:'DM Sans';outline:none;width:100%}
.inp:focus{border-color:rgba(201,168,76,.32)}
.qopt{background:${S1};border:0.5px solid rgba(255,255,255,.07);border-radius:8px;padding:8px 12px;margin-bottom:4px;cursor:pointer;font-size:12px;font-family:'DM Sans';color:${TX};width:100%;text-align:left}
.qopt.sel{border-color:${G};background:rgba(201,168,76,.08);color:${G}}
.qopt.ok{border-color:${MC};background:rgba(126,200,154,.08);color:${MC}}
.qopt.ko{border-color:${RD};background:rgba(224,80,80,.07);color:${RD}}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.fi{animation:fi .24s ease forwards}`;

// ── TABS NAV ──
const TABS=[
{id:"accueil",ic:"🏠",l:"Accueil"},{id:"formation",ic:"🎓",l:"Formation"},{id:"inspirations",ic:"🌹",l:"Inspirat."},{id:"familles",ic:"💐",l:"Familles"},{id:"catalogues",ic:"💄",l:"Catalogue"},{id:"commande",ic:"💶",l:"Commande"},{id:"checklist",ic:"✨",l:"Check"},{id:"promo",ic:"%",l:"Promo"},{id:"convertisseur",ic:"💱",l:"Convert."}];

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function ChoganApp(){
  const[screen,setScreen]=useState("login");
  const[tab,setTab]=useState("accueil");
  const[prenom,setPrenom]=useState("");
  const[nom,setNom]=useState("");
  const[isAdmin,setIsAdmin]=useState(false);
  const[perfumes,setPerfumes]=useState(DEMO_PERFUMES);
  const[checklist,setChecklist]=useState(CHECKLIST0);
  // Formation state
  const[fSub,setFSub]=useState("accueil");
  const[scores,setScores]=useState({V:{},A:{},M:{},P:{}});
  const[qa,setQa]=useState({});
  const[qDone,setQDone]=useState(false);
  const[openItems,setOpenItems]=useState({});
  const[openSc,setOpenSc]=useState(null);
  // Accueil state  
  const[started,setStarted]=useState(false);
  const[inputP,setInputP]=useState("");
  const[anns,setAnns]=useState([{id:1,text:"🎉 Bienvenue ! Ton aventure Chogan commence.",date:new Date().toLocaleDateString("fr-FR")},{id:2,text:"🌸 Promo du mois : -20% sur la gamme 50ml !",date:new Date().toLocaleDateString("fr-FR")}]);
  const[sucs,setSucs]=useState([{id:1,name:"Amira B.",ach:"Première vente ✨"},{id:2,name:"Nour K.",ach:"Statut Gold 🥇"}]);
  const[newA,setNewA]=useState("");
  // Other state
  const[genF,setGenF]=useState("tous");
  const[srch,setSrch]=useState("");
  const[openFam,setOpenFam]=useState(null);
  const[openSubF,setOpenSubF]=useState(null);
  // Convertisseur
  const[eur,setEur]=useState("");
  const[rate,setRate]=useState("245");
  // Login state (must be top-level for React hooks rules)
  const[lP,setLP]=useState("");
  const[lN,setLN]=useState("");
  const[lC,setLC]=useState("");
  const[loginErr,setLoginErr]=useState("");

  const toggle=k=>setOpenItems(p=>({...p,[k]:!p[k]}));
  const setScore=(cat,qi,val)=>setScores(p=>({...p,[cat]:{...p[cat],[qi]:val}}));
  const catScore=cat=>{const v=Object.values(scores[cat]);return v.length===0?0:Math.round((v.reduce((s,x)=>s+x,0)/(VAMP[cat].q.length*2))*20)};
  const totalVamp=Math.round((catScore("V")+catScore("A")+catScore("M")+catScore("P"))/4);
  const quizScore=QUIZ.filter((q,i)=>qa[i]===q.c).length;
  const displayName=inputP.trim()||prenom||"Consultante";

  const handleLogin=(p,n,code)=>{
    const admin=code==="MAR74B59D";
    setPrenom(p);setNom(n);setIsAdmin(admin);
    trackAction(p+" "+n,"accueil",admin?"connexion-admin":"connexion");
    setScreen("app");
  };

  const filtered=perfumes.filter(p=>{
    if(genF!=="tous"&&p.gender!==genF)return false;
    if(srch){const q=srch.toLowerCase();if(!p.name.toLowerCase().includes(q)&&!(p.brand||"").toLowerCase().includes(q)&&!(p.ref||"").includes(srch))return false;}
    return true;
  });

  const Lnk=({href,icon,title,desc,color=G})=><a href={href} target="_blank" rel="noreferrer" className="rlink"><span style={{fontSize:20}}>{icon}</span><div style={{flex:1}}><p style={{fontSize:12,fontWeight:600,color}}>{title}</p><p style={{fontSize:10,color:MU,marginTop:1}}>{desc}</p></div><span style={{color,fontSize:14}}>↗</span></a>;

  const FSUBS=[{id:"accueil",l:"🏠 Accueil"},{id:"vamp",l:"📊 VAMP"},{id:"soncas",l:"🧠 SONCAS"},{id:"methodes",l:"🎯 3 Méth."},{id:"techniques",l:"⚡ 5 Tech."},{id:"objections",l:"🛡️ Object."},{id:"phrases",l:"💬 Phrases"},{id:"scripts",l:"📝 Scripts"},{id:"quiz",l:"🎓 Quiz"},{id:"ressources",l:"📚 Ressourc."}];

  // ══════ LOGIN ══════
  if(screen==="login"){
    const doLogin=()=>{
      if(!lP.trim()||!lN.trim()){setLoginErr("Prénom et nom requis.");return;}
      if(!lC.trim()){setLoginErr("Code sponsor requis.");return;}
      const c=lC.trim().toUpperCase();
      const valid=c==="MAR74B59D"||CODES_VALIDES.includes(c);
      if(!valid){setLoginErr("Code incorrect. Contacte Marie.");return;}
      handleLogin(lP.trim(),lN.trim(),c);
    };
    return(<div style={{background:BG,minHeight:"100vh"}}><style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"28px 24px",background:"radial-gradient(ellipse at 50% 20%,rgba(201,168,76,.09) 0%,transparent 65%)"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"2px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><span style={{fontFamily:"serif",fontSize:32,color:G,fontWeight:700}}>C</span></div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:G,marginBottom:4,letterSpacing:2}}>Team Marie</div>
        <p style={{fontSize:13,color:G,marginBottom:24,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic"}}>Équipe Chogan Succès 🌷</p>
        <div style={{width:"100%",maxWidth:340,background:S1,borderRadius:16,padding:"24px 20px",border:"0.5px solid rgba(201,168,76,.22)"}}>
          <p style={{fontSize:14,color:G,fontWeight:600,marginBottom:16,textAlign:"center"}}>Connexion</p>
          <input className="inp" placeholder="Prénom" value={lP} onChange={e=>setLP(e.target.value)} style={{marginBottom:10}}/>
          <input className="inp" placeholder="Nom" value={lN} onChange={e=>setLN(e.target.value)} style={{marginBottom:10}}/>
          <input className="inp" placeholder="Code Sponsor" type="password" value={lC} onChange={e=>setLC(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={{marginBottom:14}}/>
          {loginErr&&<p style={{fontSize:11,color:RD,marginBottom:10,textAlign:"center"}}>{loginErr}</p>}
          <button className="btn-p" style={{width:"100%"}} onClick={doLogin}>🚀 Accéder</button>
        </div>
      </div></div>);
  }

  // ══════ MAIN APP ══════
  return(<div style={{background:BG,minHeight:"100vh"}}><style>{CSS}</style>
  <div className="app">
    <nav className="lnav">
      <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(201,168,76,.15)",border:"1.5px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8,marginTop:4,flexShrink:0}}><span style={{fontFamily:"serif",fontSize:16,color:G,fontWeight:700}}>C</span></div>
      {TABS.map(t=><button key={t.id} className={`nb ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}><span className="nic">{t.ic}</span><span className="nlbl">{t.l}</span></button>)}
    </nav>
    <div className="cw">
      <header className="hdr">
        <span className="logo">Team Marie 🌷</span>
        <span style={{marginLeft:"auto",fontSize:9,color:MU}}>{TABS.find(t=>t.id===tab)?.l}</span>
        <button onClick={()=>{if(confirm("Déconnexion ?"))setScreen("login")}} style={{marginLeft:8,background:"none",border:"0.5px solid rgba(224,80,80,.35)",color:RD,borderRadius:8,padding:"3px 8px",fontSize:9,cursor:"pointer",fontFamily:"'DM Sans'"}}>⏻</button>
      </header>
      <main className="main">

{/* ═══ ACCUEIL ═══ */}
{tab==="accueil"&&<div className="fi">
  {!started?<div style={{minHeight:"calc(100vh - 60px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",textAlign:"center"}}>
    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:G,marginBottom:16}}>Bienvenue chez Chogan</div>
    <div className="cardg" style={{marginBottom:20}}><p style={{fontSize:12,color:"#ccc",lineHeight:1.8,textAlign:"center"}}>✨ Cette application t'accompagne simplement : bien démarrer, organiser tes ventes, guider tes clientes, avancer étape par étape ✨</p><p style={{fontSize:20,color:G,fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",marginTop:10,fontWeight:600}}>Marie</p></div>
    <input className="inp" placeholder="Ton prénom…" value={inputP} onChange={e=>setInputP(e.target.value)} style={{textAlign:"center",fontSize:16,maxWidth:280,marginBottom:14}}/>
    <button className="btn-p" onClick={()=>setStarted(true)}>🚀 Démarrer</button>
  </div>:<div>
    <div className="sh"><span className="sht">Bonjour {displayName} 👋</span></div>
    <div className="sb">
      <p style={{fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>📣 Annonces</p>
      {anns.map(a=><div key={a.id} className="cardg" style={{position:"relative"}}><p style={{fontSize:12,lineHeight:1.5}}>{a.text}</p><p style={{fontSize:9,color:MU,marginTop:4}}>{a.date}</p>{isAdmin&&<button onClick={()=>setAnns(anns.filter(x=>x.id!==a.id))} style={{position:"absolute",top:8,right:8,background:"none",border:"none",color:MU,cursor:"pointer",fontSize:16}}>×</button>}</div>)}
      {isAdmin&&<div style={{display:"flex",gap:6,marginTop:6}}><input className="inp" placeholder="Nouvelle annonce…" value={newA} onChange={e=>setNewA(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newA.trim()){setAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]);setNewA("");}}} style={{flex:1}}/><button className="btn-o" onClick={()=>{if(!newA.trim())return;setAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]);setNewA("");}}>+</button></div>}
      <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"12px 0"}}/>
      <p style={{fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🏆 Succès</p>
      {sucs.map(s=><div key={s.id} className="card" style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>🌟</span><div><p style={{fontSize:12,fontWeight:600}}>{s.name}</p><p style={{fontSize:11,color:MU}}>{s.ach}</p></div></div>)}
    </div>
  </div>}
</div>}

{/* ═══ FORMATION (VENDRE PLUS ET MIEUX) ═══ */}
{tab==="formation"&&<div className="fi">
  <div className="sh"><span className="sht">Formation</span></div>
  <div className="ftabs">{FSUBS.map(s=><button key={s.id} className={`ftab ${fSub===s.id?"on":""}`} onClick={()=>setFSub(s.id)}>{s.l}</button>)}</div>

  {/* Formation > Accueil */}
  {fSub==="accueil"&&<div className="sb">
    <div className="cardg"><p style={{fontSize:12,color:G,fontWeight:600}}>🎓 Vendre Plus et Mieux × Chogan</p><p style={{fontSize:11,color:MU,lineHeight:1.6,marginTop:4}}>Formation complète : VAMP, SONCAS, 3 Méthodes, 5 Techniques, Objections, Scripts, Quiz</p></div>
    <div className="card" style={{borderLeft:`4px solid #e74c3c`}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontWeight:600,color:"#e74c3c",fontStyle:"italic",textAlign:"center",lineHeight:1.5}}>« On peut bien accueillir sans vendre, mais on ne peut pas vendre sans bien accueillir. »</p></div>
    {totalVamp>0&&<div className="cardg"><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:MU}}>Score VAMP</span><span style={{fontSize:18,fontWeight:700,color:G}}>{totalVamp}/20</span></div><div className="pbar-w"><div className="pbar" style={{width:`${totalVamp*5}%`}}/></div></div>}
    <p style={{fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,marginBottom:8,marginTop:10}}>🔓 Plateforme & Documents</p>
    <Lnk href="https://mylimitless.be/" icon="🔓" title="Limitless" desc="Plateforme de formation"/>
    <Lnk href="https://chogan.eu" icon="🌐" title="Chogan Officiel" desc="Espace consultant"/>
    <Lnk href="https://drive.google.com/file/d/1d952VZyjBs6XM7rVmpr1K07GnP0is1U2/view" icon="🌟" title="Programme Ambassadeur" desc="Google Drive" color="#4285f4"/>
    <Lnk href="https://drive.google.com/file/d/1wrZCau12O-JQ3Pfkmu2Mu2qHQCP9_cdb/view" icon="📖" title="Book 1" desc="Google Drive" color="#4285f4"/>
    <Lnk href="https://drive.google.com/file/d/1V4JLCN7rIqWnd7UYTH8MTLzsN0UKybzQ/view" icon="📗" title="Book 2" desc="Google Drive" color="#4285f4"/>
    <p style={{fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,margin:"10px 0 8px"}}>🎬 Vidéos</p>
    <Lnk href="https://drive.google.com/file/d/1s3EKcodYivoV1wVBnkWlG3Uk4gGWkp48/view" icon="👜" title="Vidéo Mallette" desc="Présentation démarrage"/>
    <Lnk href="https://drive.google.com/file/d/1XLsJsyvHPe7GHSrRHvxScbligxILIcvH/view" icon="🔗" title="Lien parrainage" desc="Comment envoyer ton lien"/>
    <p style={{fontSize:10,color:MU,textTransform:"uppercase",letterSpacing:1,margin:"10px 0 8px"}}>📲 Telegram</p>
    {TELEGRAMS.map((t,i)=><Lnk key={i} href={t.u} icon={t.ic} title={t.t} desc="Canal Telegram" color="#2AABEE"/>)}
  </div>}

  {/* Formation > VAMP */}
  {fSub==="vamp"&&<div className="sb">
    <p style={{fontSize:11,color:MU,marginBottom:10}}>Évaluez : Faible (−) · Moyen (=) · Fort (+)</p>
    {Object.entries(VAMP).map(([cat,data])=><div key={cat} style={{marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><span style={{fontSize:16}}>{data.icon}</span><span style={{fontSize:13,fontWeight:700,color:data.color}}>{data.label}</span><span style={{marginLeft:"auto",fontSize:14,fontWeight:700,color:data.color}}>{catScore(cat)}/20</span></div>
      <div className="pbar-w"><div className="pbar" style={{width:`${catScore(cat)*5}%`,background:data.color}}/></div>
      {data.q.map((q,i)=><div key={i} className="card" style={{padding:"8px 10px",marginBottom:5}}>
        <p style={{fontSize:11,color:"#ccc",marginBottom:5}}>{q}</p>
        <div style={{display:"flex",gap:5}}>{[["−",0],["=",1],["+",2]].map(([lbl,val])=><button key={val} onClick={()=>setScore(cat,i,val)} style={{flex:1,padding:"5px",borderRadius:6,border:`1px solid ${scores[cat][i]===val?data.color:"rgba(255,255,255,.1)"}`,background:scores[cat][i]===val?`${data.color}22`:"transparent",color:scores[cat][i]===val?data.color:MU,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans'"}}>{lbl}</button>)}</div>
      </div>)}
    </div>)}
  </div>}

  {/* Formation > SONCAS */}
  {fSub==="soncas"&&<div className="sb">
    <p style={{fontSize:11,color:MU,marginBottom:10}}>Occupons-nous du client… SON CAS</p>
    {SONCAS.map((s,i)=><div key={i} style={{marginBottom:7}}>
      <div onClick={()=>toggle("s"+i)} style={{background:S1,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",border:`0.5px solid ${openItems["s"+i]?s.c:"rgba(255,255,255,.06)"}`}}>
        <span style={{fontSize:18}}>{s.ic}</span><div style={{flex:1}}><p style={{fontSize:13,fontWeight:700,color:s.c}}>{s.l} — {s.w}</p><p style={{fontSize:10,color:MU}}>{s.app}</p></div><span style={{color:s.c,fontSize:12}}>{openItems["s"+i]?"▲":"▼"}</span>
      </div>
      {openItems["s"+i]&&<div style={{background:`${s.c}11`,borderRadius:"0 0 10px 10px",padding:"8px 12px",marginTop:-3}}>
        {s.ph.map((p,j)=><p key={j} style={{fontSize:11,color:"#ccc",fontStyle:"italic",padding:"3px 0"}}>« {p} »</p>)}
      </div>}
    </div>)}
  </div>}

  {/* Formation > 3 Méthodes */}
  {fSub==="methodes"&&<div className="sb">
    <p style={{fontSize:11,color:MU,marginBottom:10}}>Promotionnelle · Complémentaire · Additionnelle</p>
    {METH.map((m,i)=><div key={i} style={{marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:`${m.c}22`,border:`2px solid ${m.c}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{m.ic}</div>
        <div><p style={{fontSize:13,fontWeight:700,color:m.c}}>{m.code} — {m.name}</p><p style={{fontSize:10,color:MU}}>{m.d}</p></div>
      </div>
      {m.ex.map((e,j)=><div key={j} className="card" style={{borderLeft:`4px solid ${m.c}`,padding:"8px 12px"}}><p style={{fontSize:12,fontStyle:"italic",color:"#ccc"}}>« {e} »</p></div>)}
    </div>)}
  </div>}

  {/* Formation > 5 Techniques */}
  {fSub==="techniques"&&<div className="sb">
    <p style={{fontSize:11,color:MU,marginBottom:10}}>Question · Alternative · Si · Argument · Conclusion</p>
    {TECH.map((t,i)=><div key={i} style={{marginBottom:7}}>
      <div onClick={()=>toggle("t"+i)} style={{background:S1,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",border:`0.5px solid ${openItems["t"+i]?t.c:"rgba(255,255,255,.06)"}`}}>
        <div style={{width:28,height:28,borderRadius:6,background:`${t.c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:t.c}}>{t.code}</div>
        <p style={{fontSize:12,fontWeight:600,color:t.c,flex:1}}>{t.name}</p><span style={{color:t.c,fontSize:11}}>{openItems["t"+i]?"▲":"▼"}</span>
      </div>
      {openItems["t"+i]&&<div style={{padding:"6px 12px",background:`${t.c}08`,borderRadius:"0 0 10px 10px",marginTop:-3}}>
        {t.ex.map((e,j)=><p key={j} style={{fontSize:11,fontStyle:"italic",color:"#ccc",padding:"3px 0"}}>« {e} »</p>)}
      </div>}
    </div>)}
  </div>}

  {/* Formation > Objections */}
  {fSub==="objections"&&<div className="sb">
    <div className="cardg" style={{marginBottom:10}}><p style={{fontSize:11,color:G}}>Méthode : Écouter → Respecter → Reformuler → Argument positif</p></div>
    {OBJ.map((o,i)=><div key={i} onClick={()=>toggle("o"+i)} style={{marginBottom:6,cursor:"pointer"}}>
      <div style={{background:o.t==="prétexte"?`${RD}09`:o.t==="pro"?"rgba(139,98,66,.08)":"rgba(52,152,219,.06)",borderRadius:10,padding:"10px 12px",border:`0.5px solid ${o.t==="prétexte"?RD+"33":o.t==="pro"?"#8b624233":"#3498db33"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><p style={{fontSize:12,fontWeight:600,color:o.t==="prétexte"?RD:o.t==="pro"?"#8b6242":"#3498db"}}>« {o.o} »</p><p style={{fontSize:9,color:MU}}>{o.t} · {o.k}</p></div>
          <span style={{color:MU,fontSize:11}}>{openItems["o"+i]?"▲":"▼"}</span>
        </div>
        {openItems["o"+i]&&<div style={{background:`${MC}09`,border:`0.5px solid ${MC}33`,borderRadius:8,padding:"8px 10px",marginTop:8}}><p style={{fontSize:11,color:MC,fontWeight:600}}>✅ Réponse :</p><p style={{fontSize:12,color:"#ccc",fontStyle:"italic",lineHeight:1.5,marginTop:3}}>« {o.r} »</p></div>}
      </div>
    </div>)}
  </div>}

  {/* Formation > Phrases */}
  {fSub==="phrases"&&<div className="sb">
    {BAD.map((p,i)=><div key={i} className="card" style={{borderLeft:`4px solid ${RD}`}}>
      <div style={{display:"flex",gap:6,alignItems:"flex-start",marginBottom:6}}><span>❌</span><p style={{fontSize:12,color:RD,textDecoration:"line-through",flex:1}}>« {p.b} »</p></div>
      <div style={{display:"flex",gap:6,alignItems:"flex-start"}}><span>✅</span><p style={{fontSize:12,color:MC,fontStyle:"italic",flex:1}}>« {p.g} »</p></div>
    </div>)}
  </div>}

  {/* Formation > Scripts */}
  {fSub==="scripts"&&<div className="sb">
    {SCRIPTS.map(s=><div key={s.id} className="scrd">
      <div className="shdr" onClick={()=>setOpenSc(openSc===s.id?null:s.id)}>
        <div><p style={{fontSize:12,fontWeight:600}}>{s.t}</p><p style={{fontSize:10,color:MU}}>{s.ctx}</p></div>
        <span style={{color:G}}>{openSc===s.id?"▲":"▼"}</span>
      </div>
      {openSc===s.id&&<div style={{padding:"0 14px 14px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
        <div style={{background:"rgba(201,168,76,.05)",border:"0.5px solid rgba(201,168,76,.14)",borderRadius:10,padding:12,fontSize:12,lineHeight:1.6,margin:"10px 0",color:"#ddd",fontStyle:"italic"}}>{s.txt}</div>
        <p style={{fontSize:10,color:MC}}>💡 {s.tip}</p>
        <button className="btn-o" style={{width:"100%",marginTop:8}} onClick={()=>navigator.clipboard?.writeText(s.txt).then(()=>alert("Copié ! 📋"))}>📋 Copier</button>
      </div>}
    </div>)}
  </div>}

  {/* Formation > Quiz */}
  {fSub==="quiz"&&<div className="sb">
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><p style={{fontSize:13,fontWeight:500}}>Quiz Certification</p><span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:"rgba(201,168,76,.14)",color:G}}>12/15</span></div>
    {!qDone?<>{QUIZ.map((q,i)=><div key={i} className="card" style={{marginBottom:8}}>
      <p style={{fontSize:12,fontWeight:500,marginBottom:6}}>{i+1}. {q.q}</p>
      {q.o.map((o,j)=><button key={j} className={`qopt ${qa[i]===j?"sel":""}`} onClick={()=>setQa(p=>({...p,[i]:j}))}>{o}</button>)}
    </div>)}
    <button className="btn-p" style={{width:"100%"}} onClick={()=>{if(Object.keys(qa).length<QUIZ.length){alert("Réponds à tout !");return;}setQDone(true);}}>Valider</button>
    </>:<>
    <div className={quizScore>=12?"cardg":"card"} style={{textAlign:"center",padding:20,marginBottom:12}}>
      <p style={{fontSize:36}}>{quizScore>=12?"🎓":"📚"}</p>
      <p style={{fontSize:28,fontWeight:700,color:quizScore>=12?G:RD}}>{quizScore}/15</p>
      <p style={{fontSize:12,color:"#ccc"}}>{quizScore>=12?"Certification obtenue ! 🎉":"Révise et réessaie"}</p>
    </div>
    {QUIZ.map((q,i)=><div key={i} className="card" style={{marginBottom:6}}><p style={{fontSize:11,marginBottom:5}}>{i+1}. {q.q}</p>
      {q.o.map((o,j)=><p key={j} className={`qopt ${j===q.c?"ok":qa[i]===j?"ko":""}`} style={{padding:"4px 8px",marginBottom:2,fontSize:11}}>{o}</p>)}
    </div>)}
    <button className="btn-o" style={{width:"100%"}} onClick={()=>{setQa({});setQDone(false);}}>↺ Reprendre</button>
    </>}
  </div>}

  {/* Formation > Ressources */}
  {fSub==="ressources"&&<div className="sb">
    <Lnk href="https://mylimitless.be/" icon="🔓" title="Limitless" desc="Formation complète"/>
    <Lnk href="https://chogan.eu" icon="🌐" title="Chogan Officiel" desc="Commandes & espace consultant"/>
    <Lnk href="https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/Liste%20inspirations.pdf" icon="📋" title="132 Inspirations PDF" desc="Liste complète avec prix"/>
    {CATALOGUES.map((c,i)=><Lnk key={i} href={c.u} icon={c.ic} title={c.t} desc="Catalogue officiel"/>)}
  </div>}
</div>}

{/* ═══ INSPIRATIONS ═══ */}
{tab==="inspirations"&&<div className="fi">
  <div className="sh"><span className="sht">Inspirations</span><span style={{fontSize:10,color:MU}}>{perfumes.length}</span></div>
  <div className="ftabs">{[["tous","Tous"],["homme","♂"],["femme","♀"],["mixte","⚧"]].map(([v,l])=><button key={v} className={`ftab ${genF===v?"on":""}`} onClick={()=>setGenF(v)}>{l}</button>)}</div>
  <input className="srch" placeholder="🔍 Nom, marque, réf…" value={srch} onChange={e=>setSrch(e.target.value)}/>
  <div className="pgrid">{filtered.map(p=><div key={p.id} className="pcrd" style={{borderLeftColor:gc(p.gender)}}>
    <p style={{fontSize:11,fontWeight:600,color:gc(p.gender),lineHeight:1.3}}>{p.name}</p>
    <p style={{fontSize:9,color:MU}}>{p.brand} · {p.ref}</p>
    <div style={{marginTop:4}}>{(p.sizes||[]).map(s=><div key={s} style={{display:"flex",justifyContent:"space-between",fontSize:9,padding:"1px 0"}}><span style={{color:MU}}>{s}</span><span style={{color:G,fontWeight:600}}>{p.prices?.[s]?.toFixed(2)||"—"}€</span></div>)}</div>
  </div>)}</div>
</div>}

{/* ═══ FAMILLES ═══ */}
{tab==="familles"&&<div className="fi">
  <div className="sh"><span className="sht">Familles Olfactives</span></div>
  <div className="sb">{FAMILLES.map(f=><div key={f.id} className="scrd" style={{borderLeft:"3px solid "+f.couleur}}>
    <div className="shdr" onClick={()=>{setOpenFam(openFam===f.id?null:f.id);setOpenSubF(null);}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{f.emoji}</span><div><p style={{fontSize:12,fontWeight:600,color:f.couleur}}>{f.nom}</p><p style={{fontSize:9,color:MU}}>{f.style}</p></div></div>
      <span style={{color:f.couleur}}>{openFam===f.id?"▲":"▼"}</span>
    </div>
    {openFam===f.id&&<div style={{padding:"0 12px 12px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
      <div style={{background:"rgba(255,255,255,.03)",borderRadius:8,padding:"8px 10px",margin:"8px 0"}}><p style={{fontSize:10,color:MU}}>🎵 {f.notes}</p><p style={{fontSize:10,color:MU,marginTop:3}}>👤 {f.pourQui}</p></div>
      {f.sf.map((sf,si)=>{const k=f.id+"-"+si;return<div key={si} style={{marginBottom:4}}>
        <div onClick={()=>setOpenSubF(openSubF===k?null:k)} style={{display:"flex",justifyContent:"space-between",padding:"6px 10px",background:"rgba(255,255,255,.04)",borderRadius:6,cursor:"pointer",border:`0.5px solid ${openSubF===k?f.couleur:"transparent"}`}}>
          <span style={{fontSize:11,color:openSubF===k?f.couleur:TX}}>{sf.n}</span><span style={{fontSize:9,color:MU}}>{sf.r.length}</span>
        </div>
        {openSubF===k&&<div style={{padding:"4px 10px"}}>{sf.r.map((r,ri)=><span key={ri} style={{display:"inline-block",fontSize:9,padding:"1px 6px",margin:"1px 2px",background:"rgba(120,120,120,.15)",borderRadius:20,color:"#ccc"}}>{r}</span>)}</div>}
      </div>})}
    </div>}
  </div>)}</div>
</div>}

{/* ═══ CATALOGUES ═══ */}
{tab==="catalogues"&&<div className="fi">
  <div className="sh"><span className="sht">Catalogues</span></div>
  <div className="sb">{CATALOGUES.map((c,i)=><Lnk key={i} href={c.u} icon={c.ic} title={c.t} desc="Catalogue officiel Chogan"/>)}</div>
</div>}

{/* ═══ BON DE COMMANDE (simplifié) ═══ */}
{tab==="commande"&&<div className="fi">
  <div className="sh"><span className="sht">Bon de Commande</span></div>
  <div className="sb">
    <div className="cardg"><p style={{fontSize:12,color:G}}>🛒 Sélectionne un parfum dans l'onglet Inspirations, note la référence, et utilise le bon de commande papier ou le site chogan.eu</p></div>
    <Lnk href="https://chogan.eu" icon="🌐" title="Commander sur Chogan.eu" desc="Espace consultant — commandes en ligne"/>
  </div>
</div>}

{/* ═══ CHECKLIST ═══ */}
{tab==="checklist"&&<div className="fi">
  <div className="sh"><span className="sht">Checklist</span><button className="btn-d" onClick={()=>{if(confirm("Reset ?"))setChecklist(CHECKLIST0)}}>↺</button></div>
  <div className="sb">
    {(()=>{const d=checklist.filter(i=>i.done).length;const pct=Math.round((d/checklist.length)*100);return<>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:MU}}>{d}/{checklist.length}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:pct===100?"rgba(126,200,154,.16)":"rgba(201,168,76,.14)",color:pct===100?MC:G}}>{pct}%</span></div>
      <div className="pbar-w"><div className="pbar" style={{width:`${pct}%`}}/></div>
      {pct===100&&<div className="cardg" style={{textAlign:"center",padding:16,marginTop:8}}><p style={{fontSize:20}}>🎓</p><p style={{color:G,fontWeight:600,fontSize:13}}>Onboarding complété !</p></div>}
    </>;})()}
    <div style={{marginTop:8}}>{checklist.map(item=><div key={item.id} className="ci" onClick={()=>setChecklist(p=>p.map(i=>i.id===item.id?{...i,done:!i.done}:i))}>
      <div className={`cbox ${item.done?"ck":""}`}>{item.done&&<span style={{color:"#07070f",fontSize:10,fontWeight:700}}>✓</span>}</div>
      <span style={{fontSize:12,flex:1,textDecoration:item.done?"line-through":"none",color:item.done?MU:TX}}>{item.text}</span>
    </div>)}</div>
  </div>
</div>}

{/* ═══ PROMO ═══ */}
{tab==="promo"&&<div className="fi">
  <div className="sh"><span className="sht">Calculateur Promo</span></div>
  <div className="sb">
    <div className="cardg"><p style={{fontSize:11,color:G}}>Appuie sur un produit pour calculer ta marge</p></div>
    {PRODUITS_PROMO.map(p=>{
      const pa=p.prixEur+p.emb;const min=parseFloat((pa*1.04).toFixed(2));
      return<div key={p.id} className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div><p style={{fontSize:12,fontWeight:600}}>{p.nom}</p><p style={{fontSize:10,color:MU}}>PA: {pa.toFixed(2)}€ · Min: {min.toFixed(2)}€</p></div>
      </div>;
    })}
  </div>
</div>}

{/* ═══ CONVERTISSEUR ═══ */}
{tab==="convertisseur"&&<div className="fi">
  <div className="sh"><span className="sht">Convertisseur</span></div>
  <div className="sb">
    <div style={{marginBottom:12}}><label style={{fontSize:10,color:MU,display:"block",marginBottom:4}}>Taux (1€ = ? DA)</label><input className="inp" type="number" placeholder="245" value={rate} onChange={e=>setRate(e.target.value)} style={{fontSize:16,fontWeight:600,textAlign:"center"}}/></div>
    <div style={{marginBottom:16}}><label style={{fontSize:10,color:MU,display:"block",marginBottom:4}}>Montant (€)</label><input className="inp" type="number" placeholder="0.00" value={eur} onChange={e=>setEur(e.target.value)} style={{fontSize:20,fontWeight:700,textAlign:"center"}}/></div>
    {eur&&!isNaN(+eur)&&<div className="cardg" style={{textAlign:"center",padding:20}}><p style={{fontSize:12,color:MU}}>{eur} € =</p><p style={{fontSize:36,fontWeight:700,color:G}}>{Math.round(+eur*(+rate||245)).toLocaleString("fr-FR")}</p><p style={{fontSize:14,color:G}}>Dinars algériens</p></div>}
    <div style={{height:1,background:"rgba(255,255,255,.05)",margin:"14px 0"}}/>
    <p style={{fontSize:10,color:MU,marginBottom:8}}>Conversions rapides</p>
    {[11.90,18,25.50,35,45,48,52,57,65].map(p=><div key={p} style={{display:"flex",justifyContent:"space-between",padding:"7px 12px",background:"rgba(255,255,255,.03)",borderRadius:8,marginBottom:4}}><span style={{fontSize:12}}>{p.toFixed(2)} €</span><span style={{fontSize:12,color:G,fontWeight:700}}>{Math.round(p*(+rate||245)).toLocaleString("fr-FR")} DA</span></div>)}
  </div>
</div>}

      </main>
    </div>
  </div></div>);
}
