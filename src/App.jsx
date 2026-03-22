import React, { useState, useRef } from "react";

// ── VERSION ────────────────────────────────────────────────────────
const APP_VERSION = "2.2";
const LOGO = "data:image/jpeg;base64,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"; // ← changer ce numéro à chaque mise à jour

// ── THEME ─────────────────────────────────────────────────────────
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

// ── DATA ──────────────────────────────────────────────────────────
// ── LISTE COMPLÈTE 132 INSPIRATIONS CHOGAN (source PDF officiel) ──
// Couleur texte PDF : NOIR = homme | ROSE = femme | VERT = mixte
// prices : prix par taille en €
const DEMO_PERFUMES = [
  // ── Page 1 ───────────────────────────────────────────────────────
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
  { id:12,  name:"Le Mâle",              brand:"JP. Gaultier",        ref:"016", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:13,  name:"Déclaration",          brand:"Cartier",             ref:"018", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:14,  name:"Lady Million",         brand:"P. Rabanne",          ref:"019", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:15,  name:"La Nuit de l'Homme",   brand:"Y. Saint Laurent",    ref:"020", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:16,  name:"Light Blue homme",     brand:"D&G",                 ref:"021", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:17,  name:"Terre d'Hermès",       brand:"Hermès",              ref:"022", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:18,  name:"Hypnotic Poison",      brand:"C. Dior",             ref:"023", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:19,  name:"Chanel n°5",           brand:"Chanel",              ref:"024", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:20,  name:"For Her",              brand:"N. Rodriguez",        ref:"025", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:21,  name:"Flower",               brand:"Kenzo",               ref:"026", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:22,  name:"Trésor",               brand:"Lancôme",             ref:"027", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:23,  name:"Angel",                brand:"T. Mugler",           ref:"028", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  // ✅ CORRIGÉ : ref 029 → ROSE = femme
  { id:24,  name:"Eau D'Issey",          brand:"I. Miyake",           ref:"029", gender:"femme", sizes:["100ml","30ml","15ml"],prices:{"100ml":35,"30ml":18,"15ml":11.90} },
  // ── Page 2 ───────────────────────────────────────────────────────
  { id:25,  name:"Black XS",             brand:"P. Rabanne",          ref:"030", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:26,  name:"Spice Bomb",           brand:"Viktor & Rolf",       ref:"032", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:27,  name:"Black Code",           brand:"G. Armani",           ref:"033", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:28,  name:"Man",                  brand:"Bvlgari",             ref:"037", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:29,  name:"Bleu",                 brand:"Chanel",              ref:"038", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:30,  name:"Miss Dior Chérie",     brand:"C. Dior",             ref:"039", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:31,  name:"Hypnose",              brand:"Lancôme",             ref:"040", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:32,  name:"La Vie est Belle",     brand:"Lancôme",             ref:"042", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:33,  name:"Silver Montain Water", brand:"Creed",               ref:"044", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:34,  name:"Crystal Noir",         brand:"Versace",             ref:"047", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:35,  name:"Allure homme",         brand:"Chanel",              ref:"048", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:36,  name:"Dolce",                brand:"D&G",                 ref:"049", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:37,  name:"Coco Mademoiselle",    brand:"Chanel",              ref:"051", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:38,  name:"Pasha 150",            brand:"Cartier",             ref:"052", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:39,  name:"Narciso",              brand:"N. Rodriguez",        ref:"053", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:40,  name:"Black Orchid",         brand:"T. Ford",             ref:"054", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:41,  name:"Black Opium",          brand:"Y. Saint Laurent",    ref:"055", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:42,  name:"Ange ou Démon",        brand:"Givenchy",            ref:"056", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:43,  name:"Omnia Améthyste",      brand:"Bvlgari",             ref:"057", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:44,  name:"Invictus",             brand:"P. Rabanne",          ref:"061", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:45,  name:"Intenso",              brand:"D&G",                 ref:"062", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:46,  name:"Omnia Indian Garnet",  brand:"Bvlgari",             ref:"064", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:47,  name:"Olympéa",              brand:"P. Rabanne",          ref:"067", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:48,  name:"Aventus",              brand:"Creed",               ref:"068", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  // ── Page 3 ───────────────────────────────────────────────────────
  // ✅ CORRIGÉ : ref 069 → NOIR = homme
  { id:49,  name:"Acqua di Sale",        brand:"P. Roma",             ref:"069", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:50,  name:"The One femme",        brand:"D&G",                 ref:"070", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:51,  name:"Allure femme",         brand:"Chanel",              ref:"071", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:52,  name:"Patchouli",            brand:"Reminiscence",        ref:"072", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:53,  name:"Himalaya",             brand:"Creed",               ref:"073", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:54,  name:"Black Afgano",         brand:"Nasomatto",           ref:"074", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:55,  name:"\"X\" for Men",        brand:"Clive Christian",     ref:"075", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
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
  // ── Page 4 ───────────────────────────────────────────────────────
  { id:73,  name:"Joy",                  brand:"C. Dior",             ref:"098", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:74,  name:"Mandarino di Amalfi",  brand:"T. Ford",             ref:"099", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:75,  name:"White Aoud",           brand:"Montale",             ref:"100", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:76,  name:"Velvet Amber Skin",    brand:"D&G",                 ref:"101", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:77,  name:"Velvet Amber Sun",     brand:"D&G",                 ref:"102", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:78,  name:"Intense Café",         brand:"Montale",             ref:"105", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:79,  name:"Fucking Fabulous",     brand:"T. Ford",             ref:"106", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:80,  name:"J'Adore l'Or",         brand:"C. Dior",             ref:"109", gender:"femme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:81,  name:"Kirké",                brand:"T. Terenzi",          ref:"110", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:82,  name:"Lost Cherry",          brand:"T. Ford",             ref:"111", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:83,  name:"Neroli Portofino",     brand:"T. Ford",             ref:"112", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:84,  name:"Sur la Route",         brand:"L. Vuitton",          ref:"113", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:85,  name:"Ombre Nomade",         brand:"L. Vuitton",          ref:"114", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:86,  name:"Idôle",                brand:"Lancôme",             ref:"115", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:87,  name:"Yes I Am",             brand:"Cacharel",            ref:"116", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  // ✅ CORRIGÉ : ref 117 → NOIR = homme
  { id:88,  name:"Tobacco Vanille",      brand:"T. Ford",             ref:"117", gender:"homme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:89,  name:"Baccarat Rouge 540",   brand:"Maison Francis K.",   ref:"118", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:90,  name:"Scandal",              brand:"JP. Gaultier",        ref:"119", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:91,  name:"La Petite Robe Noire", brand:"Guerlain",            ref:"120", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:92,  name:"L'Interdit",           brand:"Givenchy",            ref:"121", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:93,  name:"Libre",                brand:"Y. Saint Laurent",    ref:"122", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:94,  name:"Good Girl Gone Bad",   brand:"Kilian",              ref:"123", gender:"femme", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:95,  name:"Zeta",                 brand:"Morph",               ref:"124", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:96,  name:"Sole di Positano Aqua",brand:"T. Ford",             ref:"125", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  // ── Page 5 ───────────────────────────────────────────────────────
  { id:97,  name:"Soleil Blanc",         brand:"T. Ford",             ref:"126", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:98,  name:"Oud Wood",             brand:"T. Ford",             ref:"127", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:99,  name:"Vanille Fatale",       brand:"T. Ford",             ref:"128", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:100, name:"Erba Pura",            brand:"Xerjoff",             ref:"129", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:101, name:"Megamare",             brand:"Orto Parisi",         ref:"130", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:102, name:"Good Girl",            brand:"C. Herrera",          ref:"131", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":48,"30ml":25.50,"15ml":14.90} },
  { id:103, name:"My Way",               brand:"G. Armani",           ref:"132", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:104, name:"Prada Paradoxe",       brand:"Prada",               ref:"133", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:105, name:"Bitter Peach",         brand:"T. Ford",             ref:"134", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  // ✅ CORRIGÉ : ref 135 → VERT = mixte
  { id:106, name:"Bois d'Argent",        brand:"C. Dior",             ref:"135", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:107, name:"Dior Homme Intense",   brand:"C. Dior",             ref:"136", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":45,"30ml":23.50,"15ml":13.90} },
  { id:108, name:"XJ 1861 Naxos",        brand:"Xerjoff",             ref:"137", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:109, name:"Whood Whisper",        brand:"Ojar",                ref:"138", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:110, name:"Les Sables Roses",     brand:"Louis Vuitton",       ref:"139", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:111, name:"Éros",                 brand:"Versace",             ref:"140", gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:112, name:"Turath",               brand:"The Spirit of Dubaï", ref:"141", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":65,"15ml":22.90} },
  { id:113, name:"Ombré Leather",        brand:"Tom Ford",            ref:"142", gender:"mixte", sizes:["70ml","30ml","15ml"], prices:{"70ml":57,"30ml":29.50,"15ml":17.90} },
  { id:114, name:"Vanille Powder",       brand:"Matière Première",    ref:"143", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:115, name:"Bianco Latte",         brand:"Giardini di Toscana", ref:"144", gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:116, name:"Dévotion",             brand:"D&G",                 ref:"145", gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:117, name:"Rouge",                brand:"Balmain",             ref:"146U",gender:"mixte", sizes:["50ml","15ml"],        prices:{"50ml":52,"15ml":19.90} },
  { id:118, name:"BOSS Bottled Absolu",  brand:"H. Boss",             ref:"147M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:119, name:"Goddess",              brand:"Burberry",            ref:"148W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  // ── Page 6 ───────────────────────────────────────────────────────
  { id:120, name:"Hugo homme",           brand:"H. Boss",             ref:"150M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:121, name:"Guilty femme",         brand:"Gucci",               ref:"151W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:122, name:"Guilty homme",         brand:"Gucci",               ref:"152M",gender:"homme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:123, name:"Chloé",                brand:"Chloé",               ref:"153W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
  { id:124, name:"Love Chloé",           brand:"Chloé",               ref:"154W",gender:"femme", sizes:["70ml","30ml","15ml"], prices:{"70ml":35,"30ml":18,"15ml":11.90} },
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
  { id:2,  text:"Module : Démarrage" },
  { id:3,  text:"Module : Les bases du succès" },
  { id:4,  text:"Module : Marketing d'action" },
  { id:5,  text:"Module : L'art de mieux vendre" },
  { id:6,  text:"Module : Gammes Chogan" },
  { id:7,  text:"Module : TikTok Academy" },
  { id:8,  text:"Module : Marketing d'attraction en MLM" },
  { id:9,  text:"Liste de contacts" },
  { id:10, text:"Effectuer ta première vente" },
].map(i => ({ ...i, done: false }));

const SCRIPTS = [
  { id:1, title:"Contact naturel",         ctx:"Personne que tu connais",
    text:"Salut [Prénom] ! 😊 J'ai pensé à toi — je viens de commencer quelque chose de super avec les parfums Chogan. Des fragrances de qualité luxe à prix accessible, livrées à domicile. Tu voudrais qu'on en parle 5 min ?",
    tip:"Toujours personnaliser avec le prénom. Finir par une question ouverte." },
  { id:2, title:"Relance douce",            ctx:"Prospect sans réponse",
    text:"Coucou [Prénom] ! Je repasse te voir car j'avais pensé à toi 😊 Est-ce que c'est encore un bon moment pour en parler ? Pas de pression du tout !",
    tip:"Ne pas relancer plus de 2 fois. Rester léger et bienveillant." },
  { id:3, title:"Invitation atelier parfum", ctx:"Découverte produit",
    text:"Hey [Prénom] ! J'organise un petit atelier parfum chez moi [Date]. On teste les fragrances — c'est sympa et sans obligation d'achat. Tu passes ?",
    tip:"L'atelier crée la confiance et facilite les ventes naturellement." },
  { id:4, title:"Opportunité business",     ctx:"Recrutement consultant",
    text:"[Prénom], je sais que tu cherches à arrondir tes fins de mois. Est-ce que tu es ouverte à découvrir comment certaines personnes gagnent 300 à 1 500 €/mois en recommandant des parfums qu'on porte tous les jours ?",
    tip:"Cibler des profils entrepreneur ou en recherche de revenus complémentaires." },
];

const QUIZ = [
  { id:1,  q:"Quelle est la différence entre les familles Fougère et Chyprée ?",
    opts:["Fougère = boisé aquatique, Chyprée = floral oriental","Fougère = lavande/géranium/viril, Chyprée = bergamote/jasmin/caractère","Fougère = femme, Chyprée = homme","Aucune différence notable"],
    correct:1 },
  { id:2,  q:"Une cliente aime les parfums 'chauds, sensuels et qui laissent un sillage'. Quelle famille lui recommandes-tu ?",
    opts:["Hespéridée","Fleurie","Ambrée/Orientale","Fougère"],
    correct:2 },
  { id:3,  q:"Ton lien de parrainage CLIENT génère des CP. À quoi servent ces CP ?",
    opts:["À payer tes commandes personnelles","À débloquer des remises sur les prochaines commandes de tes clientes","À calculer ta commission mensuelle","À accéder aux catalogues exclusifs"],
    correct:1 },
  { id:4,  q:"Dans le Programme Ambassadeur, à partir de quel niveau accèdes-tu aux voyages et récompenses exclusives ?",
    opts:["Dès l'inscription","À partir du statut Silver","À partir du statut Gold","À partir du statut Platinium"],
    correct:3 },
  { id:5,  q:"Une cliente veut un parfum 'dynamique et sportif'. Quelle famille olfactive convient le mieux ?",
    opts:["Orientale/Ambrée","Aromatique","Boisée","Fleurie"],
    correct:1 },
  { id:6,  q:"Combien de modules de formation sont disponibles sur Limitless ?",
    opts:["4 modules","6 modules","7 modules","10 modules"],
    correct:2 },
  { id:7,  q:"Quelle est la bonne démarche pour créer ton espace consultant Chogan ?",
    opts:["Demander à Marie de le faire","S'inscrire sur mylimitless.be","S'inscrire sur chogan.eu avec son lien de parrainage","Envoyer un email à Chogan"],
    correct:2 },
  { id:8,  q:"Que contient obligatoirement la mallette de démarrage ?",
    opts:["Uniquement des catalogues papier","Des flacons testeurs pour présenter les parfums à tes clientes","Seulement des documents administratifs","Des bons de commande pré-remplis"],
    correct:1 },
  { id:9,  q:"Quelle est l'ERREUR à ne pas faire lors de l'envoi du lien parrainage ?",
    opts:["L'envoyer par WhatsApp","Envoyer le lien CONSULTANT à la place du lien CLIENT","Préciser que c'est sans engagement","Personnaliser le message"],
    correct:1 },
  { id:10, q:"Un homme de 45 ans cherche un parfum 'sûr de lui, mature et précieux'. Quelle famille ?",
    opts:["Hespéridée","Aromatique","Boisée","Fougère"],
    correct:2 },
  { id:11, q:"Dans le Programme Ambassadeur, que se passe-t-il si tu n'atteins pas ton objectif mensuel ?",
    opts:["Tu perds définitivement ton statut","Tu repasses au niveau inférieur pour le mois suivant","Tu es exclue de l'équipe","Rien, le programme est sans condition"],
    correct:1 },
  { id:12, q:"La famille Hespéridée est SURTOUT adaptée à quel type de cliente ?",
    opts:["Femme mature qui aime les parfums intenses","Personne de tout âge recherchant fraîcheur et légèreté","Homme cherchant un parfum viril","Femme élégante appréciant les fleurs"],
    correct:1 },
  { id:13, q:"Quelle est la concentration des parfums Chogan par rapport aux grandes marques ?",
    opts:["Inférieure (10-15%)","Équivalente (20-30% concentration luxe)","Supérieure (50%)","Variable selon les références"],
    correct:1 },
  { id:14, q:"Pour maximiser tes ventes, dans quel ordre dois-tu utiliser tes outils Limitless ?",
    opts:["Quiz → Scripts → Modules","Modules → Scripts → Quiz","Scripts → Modules → Quiz","L'ordre n'a pas d'importance"],
    correct:1 },
  { id:15, q:"Une cliente hésite entre deux parfums Chyprés. Comment l'orienter efficacement ?",
    opts:["Lui donner les deux et voir","Lui demander si elle préfère fruité (Chypré Fruité) ou floral (Chypré Floral)","Lui recommander toujours le plus cher","Lui dire de consulter le catalogue seule"],
    correct:1 },
];

// ── GOOGLE SHEET TRACKER ─────────────────────────────────────────
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
    const data = await res.json();
    return data;
  } catch(e) { return null; }
}

async function saveMurs(anns, sucs) {
  try {
    const params = new URLSearchParams({
      action: "saveMurs",
      anns: JSON.stringify(anns),
      sucs: JSON.stringify(sucs)
    });
    fetch(SHEET_URL + "?" + params.toString(), { method:"GET", mode:"no-cors" });
  } catch(e) {}
}


const gc = g => g === "homme" ? HC : g === "femme" ? FC : MC;
const gl = g => g === "homme" ? "♂ Homme" : g === "femme" ? "♀ Femme" : "⚧ Mixte";

// ── CSS ───────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{background:${BG};color:${TX};font-family:'DM Sans',system-ui,sans-serif;min-height:100vh;-webkit-tap-highlight-color:transparent;}
.app{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:row;overflow-x:hidden;}
.lnav{width:52px;min-height:100vh;background:#0a0a1a;border-right:0.5px solid rgba(201,168,76,.12);display:flex;flex-direction:column;align-items:center;padding:8px 0;position:fixed;left:0;top:0;z-index:200;overflow-y:auto;}
.lnav-inner{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;}
.nb{width:52px;border:none;background:transparent;color:${MU};padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;transition:color .15s;font-family:'DM Sans',sans-serif;}
.nb.on{color:${G};}
.nic{font-size:18px;line-height:1;}
.nlbl{font-size:7px;letter-spacing:.3px;text-transform:uppercase;text-align:center;line-height:1.2;}
.content-wrap{flex:1;margin-left:52px;min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden;max-width:378px;}
.hdr{background:#0a0a1a;border-bottom:0.5px solid rgba(201,168,76,.18);padding:12px 14px;display:flex;align-items:center;position:sticky;top:0;z-index:100;}
.logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-weight:700;color:${G};letter-spacing:3px;text-transform:uppercase;}
.hdr-sub{margin-left:auto;font-size:9px;color:${MU};letter-spacing:2px;text-transform:uppercase;}
.main{flex:1;overflow-y:auto;}
.card{background:${S1};border:0.5px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;margin-bottom:10px;}
.cardg{background:${S1};border:0.5px solid rgba(201,168,76,.22);border-radius:12px;padding:14px;margin-bottom:10px;}
.sh{padding:18px 18px 0;display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;}
.shtitle{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;font-weight:600;color:${G};}
.sb{padding:12px 18px;}
.btn-p{background:linear-gradient(135deg,${G},#a8872e);color:#07070f;border:none;border-radius:50px;padding:13px 28px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;letter-spacing:.8px;cursor:pointer;text-transform:uppercase;box-shadow:0 4px 20px rgba(201,168,76,.25);transition:opacity .15s;}
.btn-p:hover{opacity:.88;}
.btn-o{background:transparent;color:${G};border:0.5px solid rgba(201,168,76,.4);border-radius:8px;padding:7px 14px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .15s;}
.btn-o:hover{background:rgba(201,168,76,.07);}
.btn-d{background:transparent;color:${RD};border:0.5px solid rgba(224,80,80,.28);border-radius:8px;padding:5px 12px;font-size:11px;font-family:'DM Sans',sans-serif;cursor:pointer;}
.ftabs{display:flex;gap:6px;padding:10px 18px;overflow-x:auto;scrollbar-width:none;}
.ftabs::-webkit-scrollbar{display:none;}
.ftab{background:${S1};border:0.5px solid rgba(255,255,255,.07);color:${MU};border-radius:20px;padding:5px 13px;font-size:12px;white-space:nowrap;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;}
.ftab.on{background:rgba(201,168,76,.1);border-color:${G};color:${G};}
.srch{width:calc(100% - 36px);margin:0 18px 10px;background:${S1};border:0.5px solid rgba(255,255,255,.07);color:${TX};border-radius:10px;padding:9px 13px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;}
.srch:focus{border-color:rgba(201,168,76,.32);}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 18px 14px;}
.pcrd{background:${S1};border-radius:10px;padding:11px;border-left:3px solid;transition:transform .12s;}
.pcrd:hover{transform:scale(1.015);}
.ci{display:flex;align-items:flex-start;gap:11px;padding:11px;border-radius:10px;background:${S1};margin-bottom:7px;cursor:pointer;transition:background .12s;}
.ci:hover{background:${S2};}
.cbox{width:21px;height:21px;border-radius:6px;border:1.5px solid rgba(201,168,76,.38);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .15s;}
.cbox.ck{background:${G};border-color:${G};}
.pbar-w{height:6px;background:rgba(255,255,255,.05);border-radius:10px;overflow:hidden;margin:6px 0;}
.pbar{height:100%;background:linear-gradient(90deg,${G},${GL});border-radius:10px;transition:width .3s ease;}
.scrd{background:${S1};border-radius:12px;margin-bottom:9px;border:0.5px solid rgba(255,255,255,.06);overflow:hidden;}
.shdr{padding:13px 15px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;}
.upz{margin:0 18px 10px;border:1.5px dashed rgba(201,168,76,.28);border-radius:14px;padding:22px;text-align:center;cursor:pointer;background:rgba(201,168,76,.02);transition:all .15s;}
.upz:hover{border-color:${G};background:rgba(201,168,76,.05);}
.qopt{background:${S1};border:0.5px solid rgba(255,255,255,.07);border-radius:8px;padding:9px 13px;margin-bottom:5px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;color:${TX};width:100%;text-align:left;transition:all .12s;}
.qopt:hover{border-color:rgba(201,168,76,.28);}
.qopt.sel{border-color:${G};background:rgba(201,168,76,.08);color:${G};}
.qopt.ok{border-color:${MC};background:rgba(126,200,154,.08);color:${MC};}
.qopt.ko{border-color:${RD};background:rgba(224,80,80,.07);color:${RD};}
.div{height:0.5px;background:rgba(255,255,255,.05);margin:4px 0 12px;}
.inp{background:${S1};border:0.5px solid rgba(255,255,255,.09);color:${TX};border-radius:8px;padding:9px 12px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;width:100%;}
.inp:focus{border-color:rgba(201,168,76,.32);}
.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10px;font-weight:500;}
.rlink{display:flex;align-items:center;gap:13px;padding:13px 15px;background:${S1};border-radius:12px;margin-bottom:8px;border:0.5px solid rgba(255,255,255,.06);cursor:pointer;transition:background .12s;color:${TX};text-decoration:none;}
.rlink:hover{background:${S2};}
@keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.fi{animation:fi .24s ease forwards;}
`;

// ── SUB-COMPONENTS ────────────────────────────────────────────────

function DZDCalc() {
  const [eur, setEur] = useState("");
  const [rate, setRate] = useState("145");
  const dzd = eur && !isNaN(+eur) ? Math.round(+eur * (+rate || 145)) : null;
  return (
    <div className="cardg">
      <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:12 }}>Convertisseur EUR → DZD</p>
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <div style={{ flex:1 }}>
          <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>Montant (€)</label>
          <input className="inp" type="number" placeholder="0.00" value={eur} onChange={e=>setEur(e.target.value)} />
        </div>
        <div style={{ flex:1 }}>
          <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>1€ = ? DZD</label>
          <input className="inp" type="number" placeholder="145" value={rate} onChange={e=>setRate(e.target.value)} />
        </div>
      </div>
      {dzd !== null && (
        <div style={{ textAlign:"center", padding:"10px 0" }}>
          <p style={{ fontSize:11, color:MU }}>{eur}€ =</p>
          <p style={{ fontSize:28, fontWeight:600, color:G }}>{dzd.toLocaleString("fr-FR")} DZD</p>
        </div>
      )}
    </div>
  );
}

// ── BIENVENUE VIEW — Lecteur PDF intégré ─────────────────────────
// 👉 Place le fichier PDF dans /public/bienvenue-chogan.pdf sur Vercel
function BienvenueView({ onBack }) {
  return (
    <div className="fi" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 130px)" }}>
      <div className="sh" style={{ alignItems:"center", flexShrink:0 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:G, cursor:"pointer", fontSize:18, marginRight:10, padding:0 }}>←</button>
        <span className="shtitle">Bienvenue chez Chogan</span>
      </div>
      <div style={{ flex:1, margin:"10px 18px 0", borderRadius:12, overflow:"hidden", border:"0.5px solid rgba(201,168,76,.2)" }}>
        <iframe
          src="/bienvenue-chogan.pdf"
          style={{ width:"100%", height:"100%", border:"none", background:"#fff" }}
          title="Bienvenue chez Chogan"
        />
      </div>
      <div style={{ padding:"12px 18px", display:"flex", gap:8 }}>
        <a href="/bienvenue-chogan.pdf" download style={{ flex:1, textAlign:"center" }} className="btn-o">
          ↓ Télécharger le PDF
        </a>
        <button className="btn-o" onClick={onBack}>← Retour</button>
      </div>
    </div>
  );
}

function RessourcesView({ onOpenBienvenue, onOpenPromo }) {
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Ressources</span></div>
      <div className="sb">
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📥 Téléchargements</p>
        {[
          { ic:"📄", t:"Bon de commande",  d:"À imprimer pour tes clients" },
          { ic:"🗓", t:"Planning mensuel", d:"Organise ton activité Chogan" },
        ].map((r,i) => (
          <div key={i} className="rlink">
            <span style={{ fontSize:22 }}>{r.ic}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:500 }}>{r.t}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>{r.d}</p>
            </div>
            <span style={{ color:G, fontSize:16 }}>↓</span>
          </div>
        ))}
        <a href="/bienvenue-chogan.pdf" target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.06)", borderColor:"rgba(201,168,76,.22)" }}>
          <span style={{ fontSize:22 }}>👋</span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:13, fontWeight:600, color:G }}>PDF Bienvenue chez Chogan</p>
            <p style={{ fontSize:11, color:MU, marginTop:2 }}>Guide complet d'onboarding — appuie pour ouvrir</p>
          </div>
          <span style={{ color:G, fontSize:16 }}>↗</span>
        </a>
        <div className="rlink" style={{ background:"rgba(74,222,128,.05)", borderColor:"rgba(74,222,128,.2)", cursor:"pointer" }} onClick={onOpenPromo}>
          <span style={{ fontSize:22 }}>🏷</span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:13, fontWeight:600, color:"#4ade80" }}>Calculateur Promo</p>
            <p style={{ fontSize:11, color:MU, marginTop:2 }}>Prix de revient · marges · calculs DZD automatiques</p>
          </div>
          <span style={{ color:"#4ade80", fontSize:16 }}>→</span>
        </div>

        <div className="div" style={{ margin:"14px 0" }} />
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🔗 Liens utiles</p>
        {[
          { ic:"🎨", t:"Modèles Canva",       d:"Stories et posts Instagram prêts à personnaliser", url:"#" },
          { ic:"🔓", t:"Limitless – Formation",d:"Plateforme de formation complète",                url:"https://mylimitless.be/" },
          { ic:"🌐", t:"Site Chogan Officiel", d:"chogan.eu — espace consultant & commandes",        url:"https://chogan.eu" },
        ].map((r,i) => (
          <a key={i} className="rlink" href={r.url} target="_blank" rel="noreferrer">
            <span style={{ fontSize:22 }}>{r.ic}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:500 }}>{r.t}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>{r.d}</p>
            </div>
            <span style={{ color:G, fontSize:16 }}>↗</span>
          </a>
        ))}

        <div className="div" style={{ margin:"14px 0" }} />
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📲 Canaux Telegram</p>
        <div className="cardg" style={{ marginBottom:12 }}>
          <p style={{ fontSize:12, color:"#ccc", lineHeight:1.7 }}>
            Tous les canaux Telegram pour accéder aux informations importantes : actualités, preuves sociales, nouveautés, stories et contenu réseaux 😊
          </p>
          <p style={{ fontSize:22, color:G, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", marginTop:10, textAlign:"center", fontWeight:600 }}>Marie</p>
        </div>
        {[
          { ic:"📸", t:"Story",          d:"Modèles de stories à partager",    url:"https://t.me/+FlsHgrOtL64wOGFk" },
          { ic:"📅", t:"Calendly",       d:"Prise de rendez-vous",             url:"https://t.me/+ICxJuEEFHg04MzJk" },
          { ic:"🖼️", t:"Pictures",       d:"Photos & visuels produits",        url:"https://t.me/+1zWQawmuayo0ZTc0" },
          { ic:"🗓️", t:"90 Jours",       d:"Challenge & suivi 90 jours",       url:"https://t.me/+AAX6DoGpg48wZTdk" },
          { ic:"💰", t:"Pro Vente",      d:"Scripts et techniques de vente",   url:"https://t.me/+akYPbYLQ3kcxYzdk" },
          { ic:"⭐", t:"Preuve Sociale", d:"Témoignages & succès de l'équipe", url:"https://t.me/+Ylo19O_dBQ01ODE0" },
        ].map((r,i) => (
          <a key={i} className="rlink" href={r.url} target="_blank" rel="noreferrer">
            <span style={{ fontSize:22 }}>{r.ic}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:500 }}>{r.t}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>{r.d}</p>
            </div>
            <span style={{ color:"#2AABEE", fontSize:16 }}>↗</span>
          </a>
        ))}

        <div className="div" style={{ margin:"14px 0" }} />
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🏅 Statuts & Aide</p>
        {[
          { ic:"⭐", n:"Standard", b:"FAQ",           d:"Base de connaissances complète",    c:MU },
          { ic:"🥇", n:"Gold",     b:"WhatsApp direct",d:"Support prioritaire via WhatsApp", c:G },
          { ic:"👑", n:"Admin",    b:"Gestion totale", d:"Gestion complète de l'équipe",     c:"#b0a0ff" },
        ].map((s,i) => (
          <div key={i} className="card" style={{ borderLeft:`3px solid ${s.c}`, display:"flex", gap:12, alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:22 }}>{s.ic}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:2 }}>
                <span style={{ fontSize:13, fontWeight:600, color:s.c }}>{s.n}</span>
                <span className="badge" style={{ background:"rgba(255,255,255,.05)", color:s.c }}>{s.b}</span>
              </div>
              <p style={{ fontSize:11, color:MU }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormationView() {
  const [sub, setSub] = useState("modules");
  const [openSc, setOpenSc] = useState(null);
  const [qa, setQa] = useState({});
  const [qdone, setQdone] = useState(false);

  const score = QUIZ.filter(q => qa[q.id] === q.correct).length;

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Formation</span>
        {sub === "quiz" && <button className="btn-d" onClick={()=>{if(window.confirm("Reset quiz ?")){ setQa({}); setQdone(false); }}}>↺ Reset</button>}
      </div>
      <div className="ftabs">
        {[["modules","📚 Modules"],["prospection","💬 Scripts"],["quiz","📝 Quiz"]].map(([v,l])=>(
          <button key={v} className={`ftab ${sub===v?"on":""}`} onClick={()=>setSub(v)}>{l}</button>
        ))}
      </div>

      {sub === "modules" && (
        <div className="sb">
          <div className="cardg" style={{ marginBottom:16 }}>
            <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:4 }}>🎬 Académie Chogan</p>
            <p style={{ fontSize:12, color:MU, lineHeight:1.65 }}>3 modules vidéos pour maîtriser chaque aspect de ton activité. Complète-les dans l'ordre.</p>
          </div>
          {[
            { ic:"📝", t:"Module 1 – Inscription", d:"Créer ton espace consultant et comprendre la plateforme Chogan" },
            { ic:"👜", t:"Module 2 – La Mallette",  d:"Présentation des produits et tes premières ventes" },
            { ic:"💰", t:"Module 3 – La Vente",    d:"Techniques de vente, objections et closing efficace" },
          ].map((m,i) => (
            <div key={i} className="rlink">
              <span style={{ fontSize:22 }}>{m.ic}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:500 }}>{m.t}</p>
                <p style={{ fontSize:11, color:MU, marginTop:2, lineHeight:1.4 }}>{m.d}</p>
              </div>
              <span style={{ color:G, fontSize:15, flexShrink:0 }}>▶</span>
            </div>
          ))}
        </div>
      )}

      {sub === "prospection" && (
        <div className="sb">
          <div className="cardg" style={{ marginBottom:14 }}>
            <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:4 }}>📖 Module 2 – Contacter & Inviter</p>
            <p style={{ fontSize:12, color:MU, lineHeight:1.65 }}>4 scripts éprouvés. Personnalise toujours avec le prénom et adapte au contexte.</p>
          </div>
          {SCRIPTS.map(s => (
            <div key={s.id} className="scrd">
              <div className="shdr" onClick={()=>setOpenSc(openSc===s.id?null:s.id)}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600 }}>{s.title}</p>
                  <p style={{ fontSize:11, color:MU, marginTop:2 }}>{s.ctx}</p>
                </div>
                <span style={{ color:G }}>{openSc===s.id?"▲":"▼"}</span>
              </div>
              {openSc===s.id && (
                <div style={{ padding:"0 15px 15px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                  <div style={{ background:"rgba(201,168,76,.05)", border:"0.5px solid rgba(201,168,76,.14)", borderRadius:10, padding:13, fontSize:13, lineHeight:1.7, margin:"12px 0", color:"#ddd", fontStyle:"italic" }}>
                    {s.text}
                  </div>
                  <div style={{ fontSize:11, color:MC, padding:"7px 11px", background:"rgba(126,200,154,.07)", borderRadius:8, marginBottom:10 }}>
                    💡 {s.tip}
                  </div>
                  <button className="btn-o" style={{ width:"100%" }}
                    onClick={()=>navigator.clipboard?.writeText(s.text).then(()=>alert("Script copié ! 📋"))}>
                    📋 Copier le script
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {sub === "quiz" && (
        <div className="sb">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <p style={{ fontSize:13, fontWeight:500 }}>Quiz de Certification</p>
            <span className="badge" style={{ background:"rgba(201,168,76,.14)", color:G }}>8/10 requis</span>
          </div>

          {!qdone ? (
            <div style={{display:"contents"}}>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:10 }}>
                  <p style={{ fontSize:13, fontWeight:500, marginBottom:10, lineHeight:1.45 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(
                    <button key={oi} className={`qopt ${qa[q.id]===oi?"sel":""}`}
                      onClick={()=>setQa(p=>({...p,[q.id]:oi}))}>
                      {opt}
                    </button>
                  ))}
                </div>
              ))}
              <button className="btn-p" style={{ width:"100%", marginTop:8 }}
                onClick={()=>{
                  if(Object.keys(qa).length < QUIZ.length){ alert("Réponds à toutes les questions !"); return; }
                  setQdone(true);
                }}>
                Valider le quiz
              </button>
            </div>
          ) : (
            <div style={{display:"contents"}}>
              <div className={score>=8?"cardg":"card"} style={{ textAlign:"center", padding:24, marginBottom:16 }}>
                <p style={{ fontSize:40, marginBottom:8 }}>{score>=8?"🎓":"📚"}</p>
                <p style={{ fontSize:30, fontWeight:700, color:score>=8?G:RD }}>{score}/10</p>
                <p style={{ fontSize:13, marginTop:8, color:"#ccc" }}>
                  {score>=8?"Certification obtenue ! Félicitations ! 🎉":"Score insuffisant — révise et réessaie"}
                </p>
              </div>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:8 }}>
                  <p style={{ fontSize:12, fontWeight:500, marginBottom:8, lineHeight:1.4 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(
                    <button key={oi} className={`qopt ${oi===q.correct?"ok":qa[q.id]===oi&&oi!==q.correct?"ko":""}`}>{opt}</button>
                  ))}
                </div>
              ))}
              <button className="btn-o" style={{ width:"100%", marginTop:8 }}
                onClick={()=>{setQa({});setQdone(false);}}>
                Reprendre le quiz
              </button>
            </div>
          )}
        </div>
      )}
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
        <button className="btn-d" onClick={()=>{if(window.confirm("Réinitialiser la checklist ?")) setChecklist(CHECKLIST0);}}>↺ Reset</button>
      </div>
      <div className="sb">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
          <span style={{ fontSize:12, color:MU }}>{done}/{checklist.length} étapes</span>
          <span className="badge" style={{ background:pct===100?"rgba(126,200,154,.16)":"rgba(201,168,76,.14)", color:pct===100?MC:G }}>{pct}%</span>
        </div>
        <div className="pbar-w"><div className="pbar" style={{ width:`${pct}%` }} /></div>
        {pct===100&&(
          <div className="cardg" style={{ textAlign:"center", padding:20, marginTop:12 }}>
            <p style={{ fontSize:24, marginBottom:6 }}>🎓</p>
            <p style={{ color:G, fontWeight:600, fontSize:14 }}>Onboarding complété ! Félicitations !</p>
          </div>
        )}
        <div style={{ marginTop:10 }}>
          {checklist.map(item=>(
            <div key={item.id} className="ci"
              onClick={()=>setChecklist(p=>p.map(i=>i.id===item.id?{...i,done:!i.done}:i))}>
              <div className={`cbox ${item.done?"ck":""}`}>
                {item.done&&<span style={{ color:"#07070f", fontSize:11, fontWeight:700 }}>✓</span>}
              </div>
              <span style={{ fontSize:13, lineHeight:1.4, flex:1, textDecoration:item.done?"line-through":"none", color:item.done?MU:TX }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
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
    if (sizeF !== "tous" && !(p.sizes||[]).includes(sizeF)) return false;
    if (genF  !== "tous" && p.gender !== genF) return false;
    if (srch) {
      const q = srch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !(p.brand||"").toLowerCase().includes(q) && !(p.ref||"").includes(srch)) return false;
    }
    return true;
  });

  const handleFile = async e => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true); setMsg("✨ Extraction IA en cours…");
    try {
      const b64 = await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result.split(",")[1]); r.onerror=rej; r.readAsDataURL(file); });
      const isImg = file.type.startsWith("image/");
      const resp = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:2000,
          messages:[{ role:"user", content:[
            { type:isImg?"image":"document", source:{ type:"base64", media_type:file.type, data:b64 }},
            { type:"text", text:`Extrais TOUS les parfums Chogan visibles dans cette image/PDF.
Règle couleur du texte : NOIR = homme | ROSE/ROUGE = femme | VERT = mixte
Chaque parfum peut avoir plusieurs tailles (70ml, 30ml, 50ml, 15ml, 100ml).
Réponds UNIQUEMENT en JSON valide sans markdown :
[{"name":"nom du parfum","brand":"marque inspiratrice","ref":"code principal ex:001","gender":"homme|femme|mixte","sizes":["70ml","30ml","15ml"]}]
Si pas de référence, génère un id court. Inclus TOUTES les entrées visibles.` }
          ]}]
        })
      });
      const data = await resp.json();
      const raw = (data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      const list = JSON.parse(raw);
      if (Array.isArray(list)&&list.length>0) {
        setPerfumes(prev=>{
          const names = new Set(prev.map(p=>p.name.toLowerCase()));
          const add = list.filter(p=>!names.has((p.name||"").toLowerCase()))
            .map((p,i)=>({...p, id:Date.now()+i, name:p.name||`Parfum ${i+1}`, gender:p.gender||"mixte", sizes:p.sizes||["70ml","15ml"]}));
          return [...prev,...add];
        });
        setMsg(`✅ ${list.length} inspirations extraites !`);
      } else { setMsg("⚠️ Aucun parfum détecté. Image plus nette ?"); }
    } catch(err) { setMsg("❌ Erreur extraction. Réessaie."); }
    finally { setUploading(false); setTimeout(()=>setMsg(""),5000); e.target.value=""; }
  };

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Liste Inspirations</span>
        <span style={{ fontSize:11, color:MU }}>{perfumes.length} parfums</span>
      </div>

      <div className="upz" onClick={()=>fref.current.click()}>
        {uploading
          ? <p style={{ color:G, fontSize:13 }}>⏳ Analyse IA en cours…</p>
          : <div style={{display:"contents"}}>
              <p style={{ fontSize:24, marginBottom:6 }}>📷</p>
              <p style={{ fontSize:13, color:G, fontWeight:500 }}>Mettre à jour la liste</p>
              <p style={{ fontSize:11, color:MU, marginTop:3 }}>Upload photo ou PDF → extraction automatique par IA</p>
            </div>
        }
      </div>
      <input ref={fref} type="file" accept="image/*,application/pdf" style={{ display:"none" }} onChange={handleFile} />
      {msg&&<div style={{ textAlign:"center", fontSize:12, padding:"4px 18px 10px", color:msg.startsWith("✅")?MC:msg.startsWith("❌")?RD:G }}>{msg}</div>}

      <div className="ftabs">
        {[["tous","Tous"],["homme","♂ Homme"],["femme","♀ Femme"],["mixte","⚧ Mixte"]].map(([v,l])=>(
          <button key={v} className={`ftab ${genF===v?"on":""}`}
            style={genF===v&&v!=="tous"?{borderColor:gc(v),color:gc(v)}:{}}
            onClick={()=>setGenF(v)}>{l}</button>
        ))}
      </div>
      <div className="ftabs" style={{ paddingTop:0 }}>
        {[["tous","Toutes"],["15ml","15 ml"],["30ml","30 ml"],["50ml","50 ml"],["70ml","70 ml"]].map(([v,l])=>(
          <button key={v} className={`ftab ${sizeF===v?"on":""}`} onClick={()=>setSizeF(v)}>{l}</button>
        ))}
      </div>
      <input className="srch" placeholder="🔍 Nom, marque ou référence…" value={srch} onChange={e=>setSrch(e.target.value)} />

      <div className="pgrid">
        {filtered.length===0
          ? <div style={{ gridColumn:"1/-1", textAlign:"center", padding:36, color:MU }}><p style={{ fontSize:28, marginBottom:8 }}>🌸</p><p style={{ fontSize:13 }}>Aucun parfum trouvé</p></div>
          : filtered.map(p=>(
              <div key={p.id} className="pcrd" style={{ borderLeftColor:gc(p.gender) }}>
                <p style={{ fontSize:12, fontWeight:600, color:gc(p.gender), lineHeight:1.3, marginBottom:2 }}>{p.name}</p>
                <p style={{ fontSize:10, color:MU, marginBottom:2 }}>{p.brand}</p>
                <p style={{ fontSize:10, color:MU, marginBottom:7 }}>Réf. {p.ref}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                  {(p.sizes||[]).map(s=>(
                    <div key={s} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"2px 6px", borderRadius:6,
                      background: sizeF===s ? `rgba(${p.gender==="homme"?"212,212,226":p.gender==="femme"?"244,160,181":"126,200,154"},.15)` : "rgba(255,255,255,.04)",
                      border: sizeF===s ? `0.5px solid ${gc(p.gender)}` : "0.5px solid transparent"
                    }}>
                      <span style={{ fontSize:10, color: sizeF===s ? gc(p.gender) : MU, fontWeight: sizeF===s?600:400 }}>{s}</span>
                      <span style={{ fontSize:10, color:G, fontWeight:600 }}>{p.prices?.[s] ? `${p.prices[s].toFixed(2).replace(".",",")} €` : "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
        }
      </div>
      <div style={{ textAlign:"center", paddingBottom:16 }}>
        <button className="btn-d" onClick={()=>{if(window.confirm("Réinitialiser la liste ?")) setPerfumes(DEMO_PERFUMES);}}>
          ↺ Réinitialiser la liste
        </button>
      </div>
    </div>
  );
}

function AccueilView({ prenom, isAdmin }) {
  const [started, setStarted] = useState(false);
  const [inputPrenom, setInputPrenom] = useState("");
  const [loading, setLoading] = useState(true);
  const [anns, setAnns] = useState([
    { id:1, text:"🎉 Bienvenue dans l'équipe ! Ton aventure Chogan commence aujourd'hui.", date:new Date().toLocaleDateString("fr-FR") },
    { id:2, text:"🌸 Promo du mois : -20% sur la gamme 50ml jusqu'à fin du mois !", date:new Date().toLocaleDateString("fr-FR") },
  ]);
  const [sucs, setSucs] = useState([
    { id:1, name:"Amira B.", ach:"Première vente ✨" },
    { id:2, name:"Nour K.",  ach:"Statut Gold atteint 🥇" },
  ]);
  const [newA, setNewA] = useState("");
  const [newSName, setNewSName] = useState("");
  const [newSAch, setNewSAch] = useState("");

  const displayName = inputPrenom.trim() || prenom || "Consultante";

  // Charger les murs partagés au démarrage
  React.useEffect(() => {
    getMurs().then(data => {
      if (data?.anns?.length) setAnns(data.anns);
      if (data?.sucs?.length) setSucs(data.sucs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Sauvegarder automatiquement quand Marie modifie
  const updateAnns = (newAnns) => { setAnns(newAnns); if(isAdmin) saveMurs(newAnns, sucs); };
  const updateSucs = (newSucs) => { setSucs(newSucs); if(isAdmin) saveMurs(anns, newSucs); };

  if (!started) return (
    <div className="fi" style={{ minHeight:"calc(100vh - 60px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 18px", textAlign:"center", background:"radial-gradient(ellipse at 50% 25%, rgba(201,168,76,.07) 0%, transparent 65%)" }}>
      <img src={LOGO} style={{ width:72, height:72, borderRadius:"50%", objectFit:"cover", marginBottom:14, border:"2px solid rgba(201,168,76,.4)", boxShadow:"0 4px 20px rgba(201,168,76,.2)" }} alt="logo" />
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:26, fontWeight:700, color:G, lineHeight:1.2, marginBottom:18 }}>Bienvenue chez Chogan</div>
      <div style={{ background:"rgba(255,255,255,.025)", border:"0.5px solid rgba(201,168,76,.2)", borderRadius:14, padding:"18px 18px 14px", marginBottom:22 }}>
        <p style={{ fontSize:13, lineHeight:1.85, color:"#ccc", textAlign:"center" }}>
          ✨ Bienvenue dans ton espace Chogan ✨<br/><br/>
          Cette application a été pensée pour t'accompagner simplement dans ton activité, du lancement jusqu'à ton évolution au quotidien.<br/><br/>
          🤍 bien démarrer<br/>
          🤍 organiser tes ventes<br/>
          🤍 guider tes clientes plus facilement<br/>
          🤍 et avancer étape par étape grâce à un suivi structuré ✨
        </p>
        <p style={{ fontSize:22, color:G, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", marginTop:14, textAlign:"center", fontWeight:600 }}>Marie</p>
      </div>
      <div style={{ width:"100%", maxWidth:320, marginBottom:16 }}>
        <label style={{ fontSize:11, color:MU, display:"block", marginBottom:6, textAlign:"left" }}>👤 Ton prénom</label>
        <input className="inp" placeholder="Ton prénom…" value={inputPrenom}
          onChange={e=>setInputPrenom(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&setStarted(true)}
          style={{ textAlign:"center", fontSize:16 }} />
      </div>
      <button className="btn-p" onClick={()=>setStarted(true)}>🚀 Démarrer mon aventure</button>
    </div>
  );

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Bonjour {displayName} 👋</span>
        <button className="btn-d" onClick={()=>{if(window.confirm("Réinitialiser l'accueil ?")) setStarted(false);}}>↺ Reset</button>
      </div>
      <div className="sb">
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📣 Mur d'Annonces</p>
        {anns.map(a=>(
          <div key={a.id} className="cardg" style={{ position:"relative" }}>
            <p style={{ fontSize:13, lineHeight:1.55 }}>{a.text}</p>
            <p style={{ fontSize:10, color:MU, marginTop:5 }}>{a.date}</p>
            {isAdmin && <button onClick={()=>updateAnns(anns.filter(x=>x.id!==a.id))} style={{ position:"absolute", top:10, right:10, background:"none", border:"none", color:MU, cursor:"pointer", fontSize:17 }}>×</button>}
          </div>
        ))}
        {isAdmin && (
          <div style={{ display:"flex", gap:8, marginTop:8, alignItems:"center" }}>
            <input className="inp" placeholder="Nouvelle annonce…" value={newA}
              onChange={e=>setNewA(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter" && newA.trim()){ updateAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]); setNewA(""); }}}
              style={{ flex:1 }} />
            <button className="btn-o" style={{ flexShrink:0, padding:"9px 16px", fontSize:18 }}
              onClick={()=>{ if(!newA.trim())return; updateAnns([...anns,{id:Date.now(),text:newA,date:new Date().toLocaleDateString("fr-FR")}]); setNewA(""); }}>+</button>
          </div>
        )}
        {!isAdmin && <p style={{ fontSize:10, color:MU, textAlign:"center", fontStyle:"italic", marginTop:6 }}>Seule Marie peut modifier les annonces</p>}
      </div>

      <div className="div" />

      <div className="sb">
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🏆 Mur des Succès</p>
        {sucs.map(s=>(
          <div key={s.id} className="card" style={{ display:"flex", alignItems:"center", gap:12, position:"relative" }}>
            <span style={{ fontSize:24 }}>🌟</span>
            <div><p style={{ fontSize:13, fontWeight:600 }}>{s.name}</p><p style={{ fontSize:12, color:MU }}>{s.ach}</p></div>
            {isAdmin && <button onClick={()=>updateSucs(sucs.filter(x=>x.id!==s.id))} style={{ position:"absolute", top:10, right:10, background:"none", border:"none", color:MU, cursor:"pointer", fontSize:17 }}>×</button>}
          </div>
        ))}
        {isAdmin && (
          <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:8 }}>
            <input className="inp" placeholder="Prénom de la consultante" value={newSName}
              onChange={e=>setNewSName(e.target.value)} />
            <div style={{ display:"flex", gap:8 }}>
              <input className="inp" placeholder="Son succès (ex: première vente 🎉)" value={newSAch}
                onChange={e=>setNewSAch(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter" && newSName.trim()){ updateSucs([...sucs,{id:Date.now(),name:newSName,ach:newSAch||"Nouveau succès 🎉"}]); setNewSName(""); setNewSAch(""); }}}
                style={{ flex:1 }} />
              <button className="btn-o" style={{ flexShrink:0, padding:"9px 16px", fontSize:18 }}
                onClick={()=>{
                  if(!newSName.trim())return;
                  updateSucs([...sucs,{id:Date.now(),name:newSName,ach:newSAch||"Nouveau succès 🎉"}]);
                  setNewSName(""); setNewSAch("");
                }}>+</button>
            </div>
          </div>
        )}
        {!isAdmin && <p style={{ fontSize:10, color:MU, textAlign:"center", fontStyle:"italic", marginTop:6 }}>Seule Marie peut modifier les succès</p>}
      </div>
    </div>
  );
}

// ── CATALOGUES VIEW ───────────────────────────────────────────────

const CATALOGUES = [
  { ic:"🌸", titre:"Parfums",                url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1739360788_documents",  desc:"Collection complète 15ml · 30ml · 50ml · 70ml" },
  { ic:"🏠", titre:"Parfums d'ambiance",     url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736340849_documents",  desc:"Diffuseurs & senteurs maison" },
  { ic:"💧", titre:"Les Huiles",             url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1732103472_documents",  desc:"Huiles essentielles & concentrées" },
  { ic:"🌿", titre:"LOLUM (huiles)",         url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1728551530_documents",  desc:"Gamme huiles LOLUM" },
  { ic:"💄", titre:"Maquillage",             url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1741095206_documents",  desc:"Rouge à lèvres, fond de teint, yeux…" },
  { ic:"🕶", titre:"Lunettes de soleil",     url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740996419_documents",  desc:"Collection lunettes tendance" },
  { ic:"🧹", titre:"Produits ménagers",      url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1738679717_documents",  desc:"Nettoyants & entretien maison" },
  { ic:"🌱", titre:"Bien-être (Aurodhea)",   url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1736256904_documents",  desc:"Compléments & soins bien-être" },
  { ic:"💊", titre:"Peptilux",               url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1740410027_documents",  desc:"Gamme Peptilux" },
  { ic:"💪", titre:"Supplefit",              url:"https://www.chogangroup.com/dflip/page_flip.php?doc=1733905272_documents",  desc:"Nutrition sportive & forme" },
];

function CataloguesView() {
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Catalogues</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:16 }}>
          <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:3 }}>📖 Catalogues officiels Chogan</p>
          <p style={{ fontSize:11, color:MU, lineHeight:1.6 }}>Appuie sur un catalogue pour l'ouvrir directement sur le site officiel Chogan.</p>
        </div>
        {CATALOGUES.map((c,i)=>(
          <a key={i} className="rlink" href={c.url} target="_blank" rel="noreferrer">
            <span style={{ fontSize:26, flexShrink:0 }}>{c.ic}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:600 }}>{c.titre}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>{c.desc}</p>
            </div>
            <span style={{ color:G, fontSize:16, flexShrink:0 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── KIT DE DÉMARRAGE VIEW ─────────────────────────────────────────

const FAMILLES = [
  { id:"ambree", emoji:"🟠", nom:"Ambrée / Orientale", couleur:"#c97c3a", style:"CHAUD · SENSUEL · ENVOÛTANT",
    notes:"Vanille, ambroxan, amande, patchouli, benjoin, résines…",
    pourQui:"Toute personne qui aime séduire, plaire, laisser un sillage. Donne de l'assurance, de l'audace.",
    sousFamilles:[
      { n:"Ambré Épicé",       refs:["6 – Opium","33 – Black Code","117 – Tobacco Vanille"] },
      { n:"Ambré Aquatique",   refs:["130 – Megamare"] },
      { n:"Ambré Boisé",       refs:["10 – Alien","15 – Roma","30 – Black XS","37 – Man","48 – Allure","72 – Patchouli","73 – Himalaya","102 – Velvet Amber Sun","114 – Ombre Nomade","127 – Oud Wood","141 – Turath"] },
      { n:"Ambré",             refs:["83 – Uomo","101 – Velvet Amber Skin","124 – Zeta","129 – Erba Pura"] },
      { n:"Ambré Floral",      refs:["13 – Guilty","14 – Manifesto","26 – Flower","27 – Trésor","41 – Chloé","47 – Crystal Noir","51 – Coco Mademoiselle","56 – Ange ou Démon","64 – Omnia Indian Garnet","67 – Olympéa","70 – The One","81 – Classique Essence"] },
      { n:"Oriental Vanillé",  refs:["23 – Hypnotic Poison","28 – Angel","40 – Hypnose","55 – Black Opium","71 – Allure","90 – Poison Girl","97 – Amo","105 – Intense Café","109 – J'Adore l'Or","111 – Lost Cherry","116 – Yes I Am","118 – Baccarat Rouge","121 – L'Interdit","126 – Soleil Blanc","128 – Vanille Fatale","131 – Good Girl","133 – Paradoxe","134 – Bitter Peach","139 – Les Sables Roses","143 – Vanilla Powder","144 – Bianco Latte","54 – Black Orchid","88 – Man in Black"] },
    ]},
  { id:"fleurie", emoji:"🌸", nom:"Fleurie", couleur:"#d45c8a", style:"ÉLÉGANCE · FÉMINITÉ",
    notes:"Rose, jasmin, fleur d'oranger, tubéreuse, géranium…",
    pourQui:"Principalement pour les femmes, féminines, élégantes, appréciant la délicatesse et la finesse.",
    sousFamilles:[
      { n:"Floral Aldéhydé",     refs:["24 – Chanel N°5"] },
      { n:"Floral Boisé Musqué", refs:["25 – For Her","43 – Love Chloé","53 – Narciso","57 – Omnia Améthyste","98 – Joy","100 – White Aoud"] },
      { n:"Floral",              refs:["49 – Dolce","77 – Flora","96 – Gabrielle","132 – My Way"] },
      { n:"Floral Fruité",       refs:["7 – J'Adore","11 – Light Blue","19 – Lady Million","42 – La Vie est Belle","82 – Signorina","95 – Burberry","120 – La Petite Robe Noire","123 – Good Girl Gone Bad"] },
      { n:"Floral Aquatique",    refs:["29 – Eau d'Issey","76 – Acqua di Gioia"] },
    ]},
  { id:"boisee", emoji:"🪵", nom:"Boisée", couleur:"#8b6242", style:"LUXUEUX · CHALEUREUX · PRÉCIEUX",
    notes:"Essences, mousses de bois, cèdre, bois de santal, bois de gaïac, tabac…",
    pourQui:"Principalement des hommes, sûrs d'eux, ayant une certaine maturité.",
    sousFamilles:[
      { n:"Boisé Aromatique",    refs:["17 – Guilty","38 – Bleu","50 – Burberry for Men","52 – Pasha","62 – Intenso","74 – Black Afgano"] },
      { n:"Boisé Floral Musqué", refs:["3 – Fahrenheit","18 – Déclaration","136 – Dior Homme Intense"] },
      { n:"Boisé",               refs:["138 – Wood Whisper"] },
      { n:"Boisé Épicé",         refs:["1 – One Million","4 – The One","20 – La Nuit de l'Homme","22 – Terre d'Hermès","32 – Spice Bomb","87 – Wanted"] },
      { n:"Boisé Chypré",        refs:["135 – Bois d'Argent"] },
      { n:"Boisé Aquatique",     refs:["61 – Invictus","69 – Acqua di Sale"] },
    ]},
  { id:"aromatique", emoji:"🌿", nom:"Aromatique", couleur:"#5a8a5a", style:"SOBRE · VIF · MASCULIN",
    notes:"Sauge, laurier, lavande, romarin, menthe…",
    pourQui:"Femmes dynamiques/sportives. Hommes charismatiques, actifs, entreprenants.",
    sousFamilles:[
      { n:"Aromatique Fougère",   refs:["140 – Éros"] },
      { n:"Aromatique Vert",      refs:["63 – Hugo femme","5 – Hugo homme"] },
      { n:"Aromatique",           refs:["44 – Silver Mountain Water"] },
      { n:"Aromatique Épicé",     refs:["65 – The Scent","137 – XJ 1861 Naxos"] },
      { n:"Aromatique Aquatique", refs:["2 – Acqua di Gio"] },
    ]},
  { id:"chypree", emoji:"🍃", nom:"Chyprée", couleur:"#4a7a4a", style:"CHARISMATIQUE · AFFIRMÉ · CARACTÈRE",
    notes:"Bergamote, jasmin, mousse de chêne, patchouli…",
    pourQui:"Femmes et hommes avec de forte personnalité, à la recherche de parfums singuliers.",
    sousFamilles:[
      { n:"Chypré Fruité", refs:["39 – Miss Dior Chérie","68 – Aventus","80 – Si","93 – Aventus for Her","110 – Kirké"] },
      { n:"Chypré Floral", refs:["85 – Chance","89 – Mon Paris","115 – Idôle","119 – Scandal"] },
    ]},
  { id:"hesperidee", emoji:"🍋", nom:"Hespéridée", couleur:"#b8a030", style:"FRAIS · LÉGER · FRUITÉ",
    notes:"Agrumes, citron, mandarine, orange, bergamote…",
    pourQui:"Personnes de tout âge en quête de fraîcheur et de légèreté, appréciant le côté tonifiant.",
    sousFamilles:[
      { n:"Hespéridés Aromatiques", refs:["12 – Eau Sauvage","21 – Light Blue","46 – CK One","91 – Chrome","99 – Mandarino di Amalfi","112 – Néroli Portofino","113 – Sur la Route"] },
      { n:"Hespéridés",             refs:["125 – Sole di Positano"] },
    ]},
  { id:"fougere", emoji:"🫧", nom:"Fougère", couleur:"#6a6aba", style:"VIRIL · PUISSANT · VIVIFIANT",
    notes:"Lavande, géranium, mousse de chêne, labdanum, vétiver…",
    pourQui:"Des hommes essentiellement, dégageant une certaine virilité, une vigueur, souvent rassurant.",
    sousFamilles:[
      { n:"Fougère Ambré/Oriental", refs:["16 – Le Mâle","75 – X for Men","122 – Libre"] },
      { n:"Fougère Aromatique",     refs:["84 – Blue Dylan","86 – Legend","94 – Sauvage"] },
      { n:"Cuiré",                  refs:["106 – Fucking Fabulous","142 – Ombré Leather"] },
    ]},
];

function KitDemarrageView() {
  const [openFam, setOpenFam] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [openPays, setOpenPays] = useState(false);

  const PAYS_LIST = [
    {flag:"🇦🇱",name:"Albanie"},{flag:"🇩🇿",name:"Algérie"},{flag:"🇦🇴",name:"Angola",test:true},
    {flag:"🇦🇺",name:"Australie",test:true},{flag:"🇦🇹",name:"Autriche"},{flag:"🇵🇹",name:"Açores"},
    {flag:"🇧🇪",name:"Belgique"},{flag:"🇧🇬",name:"Bulgarie"},{flag:"🇨🇦",name:"Canada",test:true},
    {flag:"🇪🇸",name:"Ceuta",test:true},{flag:"🇨🇾",name:"Chypre"},{flag:"🇬🇷",name:"Corfou"},
    {flag:"🇭🇷",name:"Croatie"},{flag:"🇩🇰",name:"Danemark"},{flag:"🇪🇬",name:"Égypte",test:true},
    {flag:"🇪🇪",name:"Estonie"},{flag:"🇫🇮",name:"Finlande"},{flag:"🇫🇷",name:"France"},
    {flag:"🇬🇪",name:"Géorgie"},{flag:"🇩🇪",name:"Allemagne"},{flag:"🇬🇷",name:"Grèce"},
    {flag:"🇫🇷",name:"Guadeloupe"},{flag:"🇬🇬",name:"Guernsey"},{flag:"🇮🇳",name:"Inde",test:true},
    {flag:"🇮🇶",name:"Iraq",test:true},{flag:"🇮🇪",name:"Irlande"},{flag:"🇮🇸",name:"Islande",test:true},
    {flag:"🇫🇮",name:"Îles Aland"},{flag:"🇪🇸",name:"Îles Canaries"},{flag:"🇬🇷",name:"Îles Grecques"},
    {flag:"🇮🇹",name:"Italie"},{flag:"🇯🇪",name:"Jersey"},{flag:"🇰🇿",name:"Kazakhstan",test:true},
    {flag:"🇽🇰",name:"Kosovo"},{flag:"🇱🇻",name:"Lettonie"},{flag:"🇱🇧",name:"Libano",test:true},
    {flag:"🇱🇾",name:"Libye",test:true},{flag:"🇱🇮",name:"Liechtenstein"},{flag:"🇱🇹",name:"Lituanie"},
    {flag:"🇱🇺",name:"Luxembourg"},{flag:"🇲🇰",name:"Macédoine du Nord"},{flag:"🇵🇹",name:"Madeira"},
    {flag:"🇲🇹",name:"Malte"},{flag:"🇫🇷",name:"Martinique"},{flag:"🇫🇷",name:"Mayotte"},
    {flag:"🇪🇸",name:"Melilla",test:true},{flag:"🇲🇽",name:"Messico",test:true},{flag:"🇲🇩",name:"Moldova"},
    {flag:"🇲🇪",name:"Monténégro",test:true},{flag:"🇳🇴",name:"Norvège"},{flag:"🇫🇷",name:"Nouvelle Calédonie"},
    {flag:"🇳🇱",name:"Pays-Bas"},{flag:"🇵🇱",name:"Pologne"},{flag:"🇵🇹",name:"Portugal"},
    {flag:"🇬🇧",name:"Royaume-Uni"},{flag:"🇨🇿",name:"République Tchèque"},{flag:"🇩🇴",name:"République Dominicaine",test:true},
    {flag:"🇫🇷",name:"Réunion"},{flag:"🇷🇴",name:"Roumanie"},{flag:"🇫🇷",name:"Saint-Barthélemy"},
    {flag:"🇫🇷",name:"Saint-Martin"},{flag:"🇫🇷",name:"Saint-Pierre et Miquelon"},{flag:"🇸🇲",name:"San Marino"},
    {flag:"🇸🇬",name:"Singapour",test:true},{flag:"🇸🇰",name:"Slovacchia"},{flag:"🇸🇮",name:"Slovénie"},
    {flag:"🇪🇸",name:"Espagne"},{flag:"🇸🇪",name:"Suède"},{flag:"🇨🇭",name:"Suisse"},
    {flag:"🇹🇭",name:"Thaïlande",test:true},{flag:"🇭🇺",name:"Hongrie"},{flag:"🇻🇳",name:"Viêt Nam",test:true},
  ];

  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Kit de démarrage</span></div>
      <div className="sb">

        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📋 Documents</p>
        <a href="https://raw.githubusercontent.com/ouadinej-design/limitless-app/main/Liste%20inspirations.pdf" target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.06)", borderColor:"rgba(201,168,76,.22)" }}>
          <span style={{ fontSize:22 }}>📋</span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:13, fontWeight:600, color:G }}>Liste des Inspirations</p>
            <p style={{ fontSize:11, color:MU, marginTop:2 }}>132 références · prix · tailles</p>
          </div>
          <span style={{ color:G, fontSize:16 }}>↗</span>
        </a>
        {[
          { ic:"🌟", t:"Programme Ambassadeur", url:"https://drive.google.com/file/d/1d952VZyjBs6XM7rVmpr1K07GnP0is1U2/view" },
          { ic:"📖", t:"Book",                  url:"https://drive.google.com/file/d/1wrZCau12O-JQ3Pfkmu2Mu2qHQCP9_cdb/view" },
          { ic:"📗", t:"Book 2",                url:"https://drive.google.com/file/d/1V4JLCN7rIqWnd7UYTH8MTLzsN0UKybzQ/view" },
        ].map((r,i)=>(
          <a key={i} href={r.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(66,133,244,.06)", borderColor:"rgba(66,133,244,.2)" }}>
            <span style={{ fontSize:22 }}>{r.ic}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:600, color:"#4285f4" }}>{r.t}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>Ouvrir via Google Drive</p>
            </div>
            <span style={{ color:"#4285f4", fontSize:16 }}>↗</span>
          </a>
        ))}

        <div className="div" style={{ margin:"14px 0" }} />

        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🎬 Vidéos</p>
        {[
          { ic:"👜", t:"La Mallette",              d:"Présentation de ta mallette de démarrage",     url:"https://drive.google.com/file/d/1s3EKcodYivoV1wVBnkWlG3Uk4gGWkp48/view" },
          { ic:"🔗", t:"Lien de parrainage client", d:"Comment envoyer ton lien à tes clientes",      url:"https://drive.google.com/file/d/1XLsJsyvHPe7GHSrRHvxScbligxILIcvH/view" },
        ].map((v,i)=>(
          <a key={i} href={v.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.04)", borderColor:"rgba(201,168,76,.15)" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:18, marginLeft:3 }}>▶</span>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:600, color:G }}>{v.t}</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>{v.d}</p>
            </div>
            <span style={{ color:G, fontSize:16 }}>↗</span>
          </a>
        ))}

        <div className="div" style={{ margin:"14px 0" }} />

        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🌸 Familles Olfactives</p>
        {FAMILLES.map(f => (
          <div key={f.id} className="scrd" style={{ borderLeft:"3px solid "+f.couleur }}>
            <div className="shdr" onClick={()=>{ setOpenFam(openFam===f.id?null:f.id); setOpenSub(null); }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:22 }}>{f.emoji}</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:f.couleur }}>{f.nom}</p>
                  <p style={{ fontSize:10, color:MU, marginTop:1, letterSpacing:.5 }}>{f.style}</p>
                </div>
              </div>
              <span style={{ color:f.couleur }}>{openFam===f.id?"▲":"▼"}</span>
            </div>
            {openFam===f.id && (
              <div style={{ padding:"0 14px 14px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                <div style={{ background:"rgba(255,255,255,.03)", borderRadius:8, padding:"10px 12px", margin:"10px 0" }}>
                  <p style={{ fontSize:11, color:MU, marginBottom:3 }}>🎵 Notes</p>
                  <p style={{ fontSize:12, color:"#ccc", lineHeight:1.5 }}>{f.notes}</p>
                </div>
                <div style={{ background:"rgba(255,255,255,.03)", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  <p style={{ fontSize:11, color:MU, marginBottom:3 }}>👤 Pour qui</p>
                  <p style={{ fontSize:12, color:"#ccc", lineHeight:1.5 }}>{f.pourQui}</p>
                </div>
                <p style={{ fontSize:10, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Sous-familles</p>
                {f.sousFamilles.map((sf,si) => {
                  const subKey = f.id+"-"+si;
                  const isOpen = openSub===subKey;
                  return (
                    <div key={si} style={{ marginBottom:6 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                        background:"rgba(255,255,255,.04)", borderRadius:8, padding:"8px 12px", cursor:"pointer",
                        border:"0.5px solid "+(isOpen?f.couleur:"transparent") }}
                        onClick={()=>setOpenSub(isOpen?null:subKey)}>
                        <p style={{ fontSize:12, fontWeight:500, color:isOpen?f.couleur:TX }}>{sf.n}</p>
                        <span style={{ fontSize:10, color:MU }}>{sf.refs.length} réf.</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding:"8px 12px", background:"rgba(255,255,255,.02)", borderRadius:"0 0 8px 8px", marginTop:-4 }}>
                          {sf.refs.map((r,ri)=>(
                            <span key={ri} style={{ display:"inline-block", fontSize:10, padding:"2px 8px", margin:"2px 3px", background:"rgba(120,120,120,.15)", borderRadius:20, color:"#ccc" }}>{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="div" style={{ margin:"14px 0" }} />

        <div className="scrd" style={{ borderLeft:"3px solid #4285f4" }}>
          <div className="shdr" onClick={()=>setOpenPays(!openPays)}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>🌍</span>
              <div>
                <p style={{ fontSize:13, fontWeight:600, color:"#4285f4" }}>Pays ouverts Chogan</p>
                <p style={{ fontSize:10, color:MU, marginTop:1 }}>{PAYS_LIST.length} pays · {PAYS_LIST.filter(p=>p.test).length} en phase de test</p>
              </div>
            </div>
            <span style={{ color:"#4285f4" }}>{openPays?"▲":"▼"}</span>
          </div>
          {openPays && (
            <div style={{ padding:"0 14px 14px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
              <div style={{ background:"rgba(224,80,80,.07)", border:"0.5px solid rgba(224,80,80,.25)", borderRadius:8, padding:"8px 12px", margin:"10px 0" }}>
                <p style={{ fontSize:11, color:RD }}>⚠️ Phase de test : autorisation du Leader Emerald+ requise.</p>
              </div>
              {PAYS_LIST.map((p,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"7px 8px",
                  background:p.test?"rgba(224,80,80,.04)":"rgba(255,255,255,.02)",
                  borderRadius:7, marginBottom:4,
                  border:"0.5px solid "+(p.test?"rgba(224,80,80,.12)":"rgba(255,255,255,.04)") }}>
                  <span style={{ fontSize:18 }}>{p.flag}</span>
                  <span style={{ fontSize:12, flex:1, color:p.test?MU:TX }}>{p.name}</span>
                  {p.test && <span style={{ fontSize:9, color:RD, border:"0.5px solid rgba(224,80,80,.35)", borderRadius:10, padding:"1px 6px" }}>test</span>}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ── BON DE COMMANDE VIEW ─────────────────────────────────────────
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

  const filtered = perfumes.filter(p => {
    if (!srch) return true;
    const q = srch.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.brand||"").toLowerCase().includes(q) || (p.ref||"").includes(srch);
  });

  const addToCart = (p, size) => {
    const key = `${p.id}-${size}`;
    setCart(prev => {
      const ex = prev.find(c=>c.key===key);
      if (ex) return prev.map(c=>c.key===key?{...c,qty:c.qty+1}:c);
      return [...prev, { key, id:p.id, name:p.name, ref:p.ref, brand:p.brand, size, price:p.prices?.[size]||35, qty:1 }];
    });
  };

  const removeFromCart = key => setCart(prev=>prev.filter(c=>c.key!==key));
  const updateQty = (key, delta) => setCart(prev=>prev.map(c=>c.key===key?{...c,qty:Math.max(1,c.qty+delta)}:c).filter(c=>c.qty>0));

  const totalEur = cart.reduce((s,c)=>s+c.price*c.qty, 0);
  const tauxN = parseFloat(taux)||245;
  const fraisN = parseFloat(frais)||0;
  const autresN = parseFloat(autresFrais)||0;
  const totalDzd = Math.round(totalEur * tauxN + (pays==="dz" ? fraisN + autresN : 0));
  const totalFr  = totalEur + fraisN + autresN;

  const exportText = () => {
    const lines = [`📋 BON DE COMMANDE — CHOGAN`, `👤 Client : ${nomClient||"—"}`, `📅 Date : ${new Date().toLocaleDateString("fr-FR")}`, `🌍 Pays : ${pays==="fr"?"France 🇫🇷":"Algérie 🇩🇿"}`, ``, `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`];
    cart.forEach(c=>lines.push(`• N°${c.ref} ${c.name} — ${c.size} × ${c.qty} = ${(c.price*c.qty).toFixed(2)}€`));
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`💶 Total produits : ${totalEur.toFixed(2)} €`);
    if(pays==="dz") { lines.push(`💱 Taux du jour : 1€ = ${taux} DA`); lines.push(`🚚 Frais envoi : ${frais} DA`); if(autresN>0) lines.push(`➕ Autres frais : ${autresFrais} DA`); lines.push(`💰 TOTAL DZD : ${totalDzd.toLocaleString("fr-FR")} DA`); }
    if(pays==="fr") { lines.push(`🚚 Frais de port : ${fraisN} €`); if(autresN>0) lines.push(`➕ Autres frais : ${autresFrais} €`); }
    navigator.clipboard?.writeText(lines.join("\n")).then(()=>setExported(true));
    setTimeout(()=>setExported(false), 3000);
  };

  const gc2 = g => g==="homme"?"#d4d4e2":g==="femme"?"#f4a0b5":"#7ec89a";

  if (showCart) return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <button onClick={()=>setShowCart(false)} style={{ background:"none", border:"none", color:G, cursor:"pointer", fontSize:18, marginRight:10, padding:0 }}>←</button>
        <span className="shtitle">Récapitulatif</span>
        <button className="btn-d" onClick={()=>setCart([])}>Vider</button>
      </div>
      <div className="sb">
        {/* Pays selector */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[["fr","🇫🇷 France"],["dz","🇩🇿 Algérie"]].map(([v,l])=>(
            <button key={v} onClick={()=>setPays(v)} style={{ flex:1, padding:"10px", borderRadius:10, border:`1.5px solid ${pays===v?G:"rgba(255,255,255,.1)"}`, background:pays===v?"rgba(201,168,76,.1)":"transparent", color:pays===v?G:MU, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>

        {/* Taux + frais */}
        {pays==="dz" && (
          <div style={{ display:"flex", gap:8, marginBottom:14 }}>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>💱 Taux du jour (1€ = ? DA)</label>
              <input className="inp" type="number" value={taux} onChange={e=>setTaux(e.target.value)} placeholder="245" />
            </div>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>🚚 Frais envoi (DA)</label>
              <input className="inp" type="number" value={frais} onChange={e=>setFrais(e.target.value)} placeholder="0" />
            </div>
          </div>
        )}
        {pays==="fr" && (
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>🚚 Frais de port (€)</label>
            <input className="inp" type="number" value={frais} onChange={e=>setFrais(e.target.value)} placeholder="2.5" />
          </div>
        )}

        {/* Autres frais */}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>➕ Autres frais {pays==="dz"?"(DA)":"(€)"} — optionnel</label>
          <input className="inp" type="number" value={autresFrais} onChange={e=>setAutresFrais(e.target.value)} placeholder="0" />
        </div>

        {/* Nom client */}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:10, color:MU, display:"block", marginBottom:4 }}>👤 Nom du client (optionnel)</label>
          <input className="inp" placeholder="Prénom Nom…" value={nomClient} onChange={e=>setNomClient(e.target.value)} />
        </div>

        {cart.length===0
          ? <div style={{ textAlign:"center", padding:32, color:MU }}>
              <p style={{ fontSize:28, marginBottom:8 }}>🛒</p>
              <p style={{ fontSize:13 }}>Aucun produit sélectionné</p>
            </div>
          : <div style={{display:"contents"}}>
              {cart.map(c=>(
                <div key={c.key} className="card" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", marginBottom:7 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:12, fontWeight:600 }}>{c.name}</p>
                    <p style={{ fontSize:10, color:MU }}>Réf. {c.ref} · {c.size}</p>
                    <p style={{ fontSize:11, color:G, fontWeight:600, marginTop:2 }}>{(c.price*c.qty).toFixed(2)} €{pays==="dz"?` = ${Math.round(c.price*c.qty*tauxN).toLocaleString("fr-FR")} DA`:""}</p>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button onClick={()=>updateQty(c.key,-1)} style={{ width:26, height:26, borderRadius:6, background:"rgba(255,255,255,.07)", border:"none", color:TX, cursor:"pointer", fontSize:16 }}>−</button>
                    <span style={{ fontSize:13, fontWeight:600, minWidth:16, textAlign:"center" }}>{c.qty}</span>
                    <button onClick={()=>updateQty(c.key,1)} style={{ width:26, height:26, borderRadius:6, background:"rgba(201,168,76,.15)", border:"none", color:G, cursor:"pointer", fontSize:16 }}>+</button>
                    <button onClick={()=>removeFromCart(c.key)} style={{ width:26, height:26, borderRadius:6, background:"rgba(224,80,80,.1)", border:"none", color:RD, cursor:"pointer", fontSize:14 }}>×</button>
                  </div>
                </div>
              ))}

              {/* Totaux */}
              <div className="cardg" style={{ marginTop:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:12, color:MU }}>Total produits</span>
                  <span style={{ fontSize:13, fontWeight:600 }}>{totalEur.toFixed(2)} €</span>
                </div>
                {pays==="fr" && (
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:MU }}>Frais de port</span>
                    <span style={{ fontSize:13, fontWeight:600 }}>{fraisN.toFixed(2)} €</span>
                  </div>
                )}
                {pays==="dz" && (
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:MU }}>Frais d'envoi</span>
                    <span style={{ fontSize:13, fontWeight:600 }}>{fraisN.toLocaleString("fr-FR")} DA</span>
                  </div>
                )}
                {autresN > 0 && (
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:MU }}>Autres frais</span>
                    <span style={{ fontSize:13, fontWeight:600 }}>{pays==="dz" ? autresN.toLocaleString("fr-FR")+" DA" : autresN.toFixed(2)+" €"}</span>
                  </div>
                )}
                <div style={{ height:"0.5px", background:"rgba(201,168,76,.2)", margin:"8px 0" }} />
                {pays==="fr" && (
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:13, fontWeight:600 }}>TOTAL</span>
                    <span style={{ fontSize:22, fontWeight:700, color:G }}>{(totalEur + fraisN + autresN).toFixed(2)} €</span>
                  </div>
                )}
                {pays==="dz" && (
                  <div style={{display:"contents"}}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:11, color:MU }}>Taux : 1€ = {taux} DA</span>
                      <span style={{ fontSize:11, color:MU }}>{totalEur.toFixed(2)}€ × {taux}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ fontSize:13, fontWeight:600 }}>TOTAL DZD</span>
                      <span style={{ fontSize:22, fontWeight:700, color:G }}>{totalDzd.toLocaleString("fr-FR")} DA</span>
                    </div>
                  </div>
                )}
              </div>

              <button className="btn-p" style={{ width:"100%", marginTop:12 }} onClick={exportText}>
                {exported ? "✅ Copié dans le presse-papier !" : "📋 Copier le bon de commande"}
              </button>
            </div>
          }
      </div>
    </div>
  );

  return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <span className="shtitle">Bon de Commande</span>
        <button className="btn-p" style={{ padding:"6px 14px", fontSize:11, position:"relative" }} onClick={()=>setShowCart(true)}>
          🛒 {cart.length>0&&<span style={{ position:"absolute", top:-6, right:-6, background:RD, color:"#fff", borderRadius:"50%", width:18, height:18, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center" }}>{cart.reduce((s,c)=>s+c.qty,0)}</span>}
          Panier {cart.length>0?`(${cart.reduce((s,c)=>s+c.qty,0)})` : ""}
        </button>
      </div>
      <div style={{ padding:"8px 18px 4px" }}>
        <input className="srch" style={{ width:"100%", margin:0 }} placeholder="🔍 Rechercher un parfum…" value={srch} onChange={e=>setSrch(e.target.value)} />
      </div>
      <div className="pgrid">
        {filtered.map(p=>(
          <div key={p.id} className="pcrd" style={{ borderLeftColor:gc2(p.gender) }}>
            <p style={{ fontSize:11, fontWeight:700, color:gc2(p.gender), lineHeight:1.3, marginBottom:2 }}>{p.name}</p>
            <p style={{ fontSize:9, color:MU, marginBottom:6 }}>{p.brand} · Réf.{p.ref}</p>
            {(p.sizes||[]).map(s=>(
              <button key={s} onClick={()=>addToCart(p,s)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", padding:"4px 7px", marginBottom:3, borderRadius:6, background:"rgba(201,168,76,.06)", border:"0.5px solid rgba(201,168,76,.2)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                <span style={{ fontSize:10, color:MU }}>{s}</span>
                <span style={{ fontSize:10, color:G, fontWeight:600 }}>{p.prices?.[s]?.toFixed(2)||"35.00"}€ +</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROMO VIEW ────────────────────────────────────────────────────
const PRODUITS_PROMO = [
  { id:"etuis",  nom:"Étuis Simple",  prixEur:9.10,  transportDzd:1.80, emballage:0    },
  { id:"cuir",   nom:"Étui Cuire",    prixEur:10.50, transportDzd:1.80, emballage:0    },
  { id:"15ml",   nom:"15 ML",         prixEur:5.95,  transportDzd:1.80, emballage:0.48 },
  { id:"30ml",   nom:"30 ML",         prixEur:9.00,  transportDzd:1.80, emballage:0.48 },
  { id:"70ml",   nom:"70 ML",         prixEur:17.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux1",   nom:"Luxury 22,50€", prixEur:22.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux2",   nom:"Luxury 23€",    prixEur:23.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux3",   nom:"Luxury 24€",    prixEur:24.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux4",   nom:"Luxury 26€",    prixEur:26.00, transportDzd:1.80, emballage:0.48 },
  { id:"lux5",   nom:"Luxury 28,50€", prixEur:28.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux6",   nom:"Luxury 32,50€", prixEur:32.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux7",   nom:"Luxury 35,50€", prixEur:35.50, transportDzd:1.80, emballage:0.48 },
  { id:"lux8",   nom:"Luxury 38,75€", prixEur:38.75, transportDzd:1.80, emballage:0.48 },
];

function PromoView({ onBack }) {
  const [devise, setDevise] = useState("eur");
  const [txDA, setTxDA] = useState("290");
  const [fraisPort, setFraisPort] = useState("");
  const [promos, setPromos] = useState({});
  const [qtes, setQtes] = useState({});
  const [selected, setSelected] = useState(null);

  const tx = parseFloat(txDA) || 290;
  const fp = parseFloat(fraisPort) || 0;

  const calc = (p) => {
    const totalEur = p.prixEur + p.emballage;                          // EUR: sans transport
    const totalDzd = p.prixEur + (p.transportDzd||0) + p.emballage;   // DZD: avec transport
    const prixDA   = Math.round(totalDzd * tx);
    const minEur   = parseFloat((totalEur * 1.04).toFixed(2));
    const minDA    = Math.round(prixDA * 1.04);
    const promoVal = parseFloat(promos[p.id]) || 0;
    const qte      = parseInt(qtes[p.id]) || 0;

    if (devise === "eur") {
      const margeEur = promoVal > 0 && promoVal >= minEur ? parseFloat(((promoVal - totalEur) * qte).toFixed(2)) : 0;
      const ok = promoVal >= minEur;
      return { totalEur, prixDA, minEur, minDA, promoVal, qte, marge: margeEur, ok, devise:"eur" };
    } else {
      const margeDA = promoVal > 0 && promoVal >= minDA ? Math.round((promoVal - prixDA) * qte) : 0;
      const ok = promoVal >= minDA;
      return { totalEur, prixDA, minEur, minDA, promoVal, qte, marge: margeDA, ok, devise:"dzd" };
    }
  };

  const totalMarge = PRODUITS_PROMO.reduce((s,p) => s + calc(p).marge, 0);
  const produitActif = selected ? PRODUITS_PROMO.find(p=>p.id===selected) : null;
  const calcActif = produitActif ? calc(produitActif) : null;

  const fmt = (val) => devise === "eur"
    ? val.toFixed(2) + " €"
    : val.toLocaleString("fr-FR") + " DA";

  const paLabel   = devise === "eur" ? calcActif?.totalEur.toFixed(2)+" €" : calcActif?.prixDA.toLocaleString("fr-FR")+" DA";
  const minLabel  = devise === "eur" ? calcActif?.minEur.toFixed(2)+" €"   : calcActif?.minDA.toLocaleString("fr-FR")+" DA";
  const minVal    = devise === "eur" ? calcActif?.minEur : calcActif?.minDA;

  // Vue détail produit
  if (produitActif && calcActif) return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:G, cursor:"pointer", fontSize:18, marginRight:10, padding:0 }}>←</button>
        <span className="shtitle">{produitActif.nom}</span>
      </div>
      <div className="sb">

        {/* Prix de revient */}
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📦 Prix de revient</p>
        <div className="card" style={{ marginBottom:14 }}>
          {[
            ["Prix d'achat",  produitActif.prixEur.toFixed(2)+"€"],
            ...(devise==="dzd" ? [["Transport", (produitActif.transportDzd||0).toFixed(2)+"€"]] : []),
            ["Emballage",     produitActif.emballage>0?produitActif.emballage.toFixed(2)+"€":"Inclus"],
          ].map(([l,v],i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"0.5px solid rgba(255,255,255,.05)" }}>
              <span style={{ fontSize:12, color:MU }}>{l}</span>
              <span style={{ fontSize:12, color:TX }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 4px" }}>
            <span style={{ fontSize:13, fontWeight:600 }}>Total PA (€)</span>
            <span style={{ fontSize:15, fontWeight:700, color:G }}>{calcActif.totalEur.toFixed(2)} €</span>
          </div>
          {devise==="dzd" && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 0" }}>
              <span style={{ fontSize:13, fontWeight:600 }}>Total PA (DA)</span>
              <span style={{ fontSize:15, fontWeight:700, color:G }}>{calcActif.prixDA.toLocaleString("fr-FR")} DA</span>
            </div>
          )}
        </div>

        {/* Prix minimum */}
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🚫 Prix minimum (ne pas vendre en dessous)</p>
        <div style={{ background:"rgba(74,222,128,.08)", border:"1.5px solid #4ade80", borderRadius:12, padding:"14px 16px", marginBottom:14, textAlign:"center" }}>
          <p style={{ fontSize:11, color:"#4ade80", marginBottom:4 }}>PA × 1,04 = marge minimale 4%</p>
          <p style={{ fontSize:30, fontWeight:700, color:"#4ade80" }}>{minLabel}</p>
          <p style={{ fontSize:10, color:"rgba(74,222,128,.7)", marginTop:4 }}>En dessous de ce prix = perte</p>
        </div>

        {/* Simulateur promo */}
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🏷 Simuler une promo</p>
        <div className="card" style={{ marginBottom:14 }}>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>
              Mon prix promo {devise==="eur"?"(€)":"(DA)"}
            </label>
            <input className="inp" type="number"
              placeholder={"Min : " + (devise==="eur"?calcActif.minEur.toFixed(2)+" €":calcActif.minDA.toLocaleString("fr-FR")+" DA")}
              value={promos[produitActif.id]||""}
              onChange={e=>setPromos(p=>({...p,[produitActif.id]:e.target.value}))}
              style={{ borderColor: calcActif.promoVal>0?(calcActif.ok?"#4ade80":"#e05050"):"rgba(255,255,255,.09)" }}
            />
            {calcActif.promoVal>0 && !calcActif.ok && (
              <p style={{ fontSize:11, color:RD, marginTop:5 }}>⚠️ Prix trop bas ! Minimum : {minLabel}</p>
            )}
            {calcActif.promoVal>0 && calcActif.ok && (
              <p style={{ fontSize:11, color:"#4ade80", marginTop:5 }}>✅ Prix valide</p>
            )}
          </div>
          <div>
            <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>Quantité vendue</label>
            <input className="inp" type="number" placeholder="0"
              value={qtes[produitActif.id]||""}
              onChange={e=>setQtes(p=>({...p,[produitActif.id]:e.target.value}))}
            />
          </div>
        </div>

        {calcActif.promoVal>0 && calcActif.ok && calcActif.qte>0 && (
          <div style={{ background:"rgba(201,168,76,.1)", border:"1.5px solid "+G, borderRadius:12, padding:"14px 16px", textAlign:"center" }}>
            <p style={{ fontSize:12, color:MU, marginBottom:4 }}>
              ({devise==="eur"?calcActif.promoVal.toFixed(2)+" € − "+calcActif.totalEur.toFixed(2)+" €":calcActif.promoVal.toLocaleString("fr-FR")+" − "+calcActif.prixDA.toLocaleString("fr-FR")}) × {calcActif.qte}
            </p>
            <p style={{ fontSize:28, fontWeight:700, color:G }}>{fmt(calcActif.marge)}</p>
            <p style={{ fontSize:11, color:MU, marginTop:4 }}>Marge générée sur cette promo</p>
          </div>
        )}
      </div>
    </div>
  );

  // Vue liste principale
  return (
    <div className="fi">
      <div className="sh" style={{ alignItems:"center" }}>
        {onBack && <button onClick={onBack} style={{ background:"none", border:"none", color:G, cursor:"pointer", fontSize:18, marginRight:10, padding:0 }}>←</button>}
        <span className="shtitle">Calculateur Promo</span>
      </div>
      <div className="sb">

        {/* Sélecteur devise */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[["eur","🇫🇷 Euros (€)"],["dzd","🇩🇿 Dinars (DA)"]].map(([v,l])=>(
            <button key={v} onClick={()=>{ setDevise(v); setPromos({}); setQtes({}); }}
              style={{ flex:1, padding:"10px", borderRadius:10,
                border:"1.5px solid "+(devise===v?G:"rgba(255,255,255,.1)"),
                background:devise===v?"rgba(201,168,76,.1)":"transparent",
                color:devise===v?G:MU, fontFamily:"'DM Sans',sans-serif",
                fontSize:12, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>

        {/* Taux DA (seulement en DA) */}
        {devise==="dzd" && (
          <div className="cardg" style={{ marginBottom:14 }}>
            <label style={{ fontSize:11, color:G, fontWeight:600, display:"block", marginBottom:8 }}>💱 Taux du jour (1€ = ? DA)</label>
            <input className="inp" type="number" value={txDA} onChange={e=>setTxDA(e.target.value)} placeholder="290" style={{ fontSize:18, fontWeight:700, textAlign:"center" }} />
          </div>
        )}

        {/* Frais de port */}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>
            🚚 Frais de port {devise==="eur"?"(€)":"(DA)"} — optionnel
          </label>
          <input className="inp" type="number" placeholder="0"
            value={fraisPort} onChange={e=>setFraisPort(e.target.value)} />
        </div>

        {/* Total marge globale */}
        {totalMarge > 0 && (
          <div style={{ background:"rgba(201,168,76,.1)", border:"1px solid "+G, borderRadius:12, padding:"12px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:12, color:MU }}>Total marge promo</span>
            <span style={{ fontSize:20, fontWeight:700, color:G }}>{fmt(totalMarge)}</span>
          </div>
        )}

        {/* Liste produits */}
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>
          Appuie sur un produit pour simuler
        </p>
        {PRODUITS_PROMO.map(p => {
          const c = calc(p);
          const paDisp = devise==="eur" ? c.totalEur.toFixed(2)+" €" : c.prixDA.toLocaleString("fr-FR")+" DA";
          const minDisp = devise==="eur" ? c.minEur.toFixed(2)+" €" : c.minDA.toLocaleString("fr-FR")+" DA";
          return (
            <div key={p.id} onClick={()=>setSelected(p.id)} className="card"
              style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer", marginBottom:8,
                borderLeft: c.marge>0?"3px solid "+G:"3px solid rgba(255,255,255,.1)" }}>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:600 }}>{p.nom}</p>
                <div style={{ display:"flex", gap:10, marginTop:3, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11, color:MU }}>PA : {paDisp}</span>
                  <span style={{ fontSize:11, color:"#4ade80" }}>Min : {minDisp}</span>
                </div>
                {c.marge>0 && (
                  <p style={{ fontSize:11, color:G, fontWeight:600, marginTop:3 }}>
                    Marge : {fmt(c.marge)} ({c.qte} pcs)
                  </p>
                )}
              </div>
              <span style={{ color:G, fontSize:18 }}>›</span>
            </div>
          );
        })}

        <button className="btn-d" style={{ width:"100%", marginTop:8 }} onClick={()=>{ setPromos({}); setQtes({}); setFraisPort(""); }}>↺ Tout réinitialiser</button>
      </div>
    </div>
  );
}

// ── LANCEMENT VIEW ───────────────────────────────────────────────
function LancementView() {
  const [sub, setSub] = useState("lancement");
  const [openSc, setOpenSc] = useState(null);
  const [openPays, setOpenPays] = useState(false);
  const [qa, setQa] = useState({});
  const [qdone, setQdone] = useState(false);
  const score = QUIZ.filter(q=>qa[q.id]===q.correct).length;

  return (
    <div className="fi">
      <div className="sh">
        <span className="shtitle">Formation</span>
        {sub==="quiz" && <button className="btn-d" onClick={()=>{if(window.confirm("Reset quiz ?")){setQa({});setQdone(false);}}}>↺ Reset</button>}
      </div>
      <div className="ftabs">
        {[["lancement","🚀 Lancement"],["scripts","💬 Scripts"],["quiz","📝 Quiz"]].map(([v,l])=>(
          <button key={v} className={`ftab ${sub===v?"on":""}`} onClick={()=>setSub(v)}>{l}</button>
        ))}
      </div>

      {sub==="lancement" && (
        <div className="sb">
          <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🔓 Plateforme</p>
          <a href="https://mylimitless.be/" target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.06)", borderColor:"rgba(201,168,76,.22)" }}>
            <span style={{ fontSize:22 }}>🔓</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, fontWeight:600, color:G }}>Inscription Limitless</p>
              <p style={{ fontSize:11, color:MU, marginTop:2 }}>Accède à la plateforme de formation</p>
            </div>
            <span style={{ color:G, fontSize:16 }}>↗</span>
          </a>

          <div className="div" style={{ margin:"14px 0" }} />
          <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>🎬 Vidéos</p>
          {[
            { t:"Vidéo Mallette",             d:"Présentation de ta mallette de démarrage", url:"https://drive.google.com/file/d/1s3EKcodYivoV1wVBnkWlG3Uk4gGWkp48/view" },
            { t:"Lien de parrainage client",  d:"Comment envoyer ton lien à tes clientes",  url:"https://drive.google.com/file/d/1XLsJsyvHPe7GHSrRHvxScbligxILIcvH/view" },
          ].map((v,i)=>(
            <a key={i} href={v.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(201,168,76,.04)", borderColor:"rgba(201,168,76,.15)" }}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:18, marginLeft:3 }}>▶</span>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:600, color:G }}>{v.t}</p>
                <p style={{ fontSize:11, color:MU, marginTop:2 }}>{v.d}</p>
              </div>
              <span style={{ color:G, fontSize:16 }}>↗</span>
            </a>
          ))}

          <div className="div" style={{ margin:"14px 0" }} />
          <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>📚 Documents</p>
          {[
            { ic:"📖", t:"Book 1",                url:"https://drive.google.com/file/d/1wrZCau12O-JQ3Pfkmu2Mu2qHQCP9_cdb/view" },
            { ic:"📗", t:"Book 2",                url:"https://drive.google.com/file/d/1V4JLCN7rIqWnd7UYTH8MTLzsN0UKybzQ/view" },
            { ic:"🌟", t:"Programme Ambassadeur", url:"https://drive.google.com/file/d/1d952VZyjBs6XM7rVmpr1K07GnP0is1U2/view" },
          ].map((r,i)=>(
            <a key={i} href={r.url} target="_blank" rel="noreferrer" className="rlink" style={{ background:"rgba(66,133,244,.06)", borderColor:"rgba(66,133,244,.2)" }}>
              <span style={{ fontSize:22 }}>{r.ic}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:600, color:"#4285f4" }}>{r.t}</p>
                <p style={{ fontSize:11, color:MU, marginTop:2 }}>Ouvrir via Google Drive</p>
              </div>
              <span style={{ color:"#4285f4", fontSize:16 }}>↗</span>
            </a>
          ))}

          <div className="div" style={{ margin:"14px 0" }} />
          <div className="scrd" style={{ borderLeft:"3px solid #4285f4" }}>
            <div className="shdr" onClick={()=>setOpenPays(!openPays)}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:22 }}>🌍</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:"#4285f4" }}>Pays ouverts Chogan</p>
                  <p style={{ fontSize:10, color:MU, marginTop:1 }}>Zones de livraison disponibles</p>
                </div>
              </div>
              <span style={{ color:"#4285f4" }}>{openPays?"▲":"▼"}</span>
            </div>
            {openPays && (
            <div style={{ padding:"0 14px 14px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
              <div style={{ background:"rgba(224,80,80,.07)", border:"0.5px solid rgba(224,80,80,.25)", borderRadius:8, padding:"8px 12px", margin:"10px 0" }}>
                <p style={{ fontSize:11, color:RD }}>⚠️ Phase de test : autorisation du Leader Emerald+ requise.</p>
              </div>
              {[
                {flag:"🇦🇱",name:"Albanie"},{flag:"🇩🇿",name:"Algérie"},{flag:"🇦🇴",name:"Angola",test:true},
                {flag:"🇦🇺",name:"Australie",test:true},{flag:"🇦🇹",name:"Autriche"},{flag:"🇧🇪",name:"Belgique"},
                {flag:"🇧🇬",name:"Bulgarie"},{flag:"🇨🇦",name:"Canada",test:true},{flag:"🇭🇷",name:"Croatie"},
                {flag:"🇩🇰",name:"Danemark"},{flag:"🇪🇬",name:"Égypte",test:true},{flag:"🇫🇷",name:"France"},
                {flag:"🇩🇪",name:"Allemagne"},{flag:"🇬🇷",name:"Grèce"},{flag:"🇮🇹",name:"Italie"},
                {flag:"🇱🇺",name:"Luxembourg"},{flag:"🇳🇱",name:"Pays-Bas"},{flag:"🇵🇱",name:"Pologne"},
                {flag:"🇵🇹",name:"Portugal"},{flag:"🇬🇧",name:"Royaume-Uni"},{flag:"🇷🇴",name:"Roumanie"},
                {flag:"🇪🇸",name:"Espagne"},{flag:"🇸🇪",name:"Suède"},{flag:"🇨🇭",name:"Suisse"},
                {flag:"🇭🇺",name:"Hongrie"},{flag:"🇧🇪",name:"Belgique"},
              ].map((p,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 8px",
                  background:p.test?"rgba(224,80,80,.04)":"rgba(255,255,255,.02)",
                  borderRadius:6, marginBottom:3,
                  border:"0.5px solid "+(p.test?"rgba(224,80,80,.12)":"rgba(255,255,255,.04)") }}>
                  <span style={{ fontSize:16 }}>{p.flag}</span>
                  <span style={{ fontSize:12, flex:1, color:p.test?MU:TX }}>{p.name}</span>
                  {p.test && <span style={{ fontSize:9, color:RD, border:"0.5px solid rgba(224,80,80,.35)", borderRadius:10, padding:"1px 6px" }}>test</span>}
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      )}

      {sub==="scripts" && (
        <div className="sb">
          <div className="cardg" style={{ marginBottom:14 }}>
            <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:4 }}>💬 Scripts de contact</p>
            <p style={{ fontSize:12, color:MU, lineHeight:1.65 }}>4 scripts éprouvés. Personnalise toujours avec le prénom.</p>
          </div>
          {SCRIPTS.map(s=>(
            <div key={s.id} className="scrd">
              <div className="shdr" onClick={()=>setOpenSc(openSc===s.id?null:s.id)}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600 }}>{s.title}</p>
                  <p style={{ fontSize:11, color:MU, marginTop:2 }}>{s.ctx}</p>
                </div>
                <span style={{ color:G }}>{openSc===s.id?"▲":"▼"}</span>
              </div>
              {openSc===s.id && (
                <div style={{ padding:"0 15px 15px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                  <div style={{ background:"rgba(201,168,76,.05)", border:"0.5px solid rgba(201,168,76,.14)", borderRadius:10, padding:13, fontSize:13, lineHeight:1.7, margin:"12px 0", color:"#ddd", fontStyle:"italic" }}>
                    {s.text}
                  </div>
                  <div style={{ fontSize:11, color:MC, padding:"7px 11px", background:"rgba(126,200,154,.07)", borderRadius:8, marginBottom:10 }}>
                    💡 {s.tip}
                  </div>
                  <button className="btn-o" style={{ width:"100%" }}
                    onClick={()=>navigator.clipboard?.writeText(s.text).then(()=>alert("Script copié ! 📋"))}>
                    📋 Copier le script
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {sub==="quiz" && (
        <div className="sb">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <p style={{ fontSize:13, fontWeight:500 }}>Quiz de Certification</p>
            <span className="badge" style={{ background:"rgba(201,168,76,.14)", color:G }}>12/15 requis</span>
          </div>
          {!qdone ? (
            <div style={{display:"contents"}}>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:10 }}>
                  <p style={{ fontSize:13, fontWeight:500, marginBottom:10, lineHeight:1.45 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(
                    <button key={oi} className={`qopt ${qa[q.id]===oi?"sel":""}`}
                      onClick={()=>setQa(p=>({...p,[q.id]:oi}))}>
                      {opt}
                    </button>
                  ))}
                </div>
              ))}
              <button className="btn-p" style={{ width:"100%", marginTop:8 }}
                onClick={()=>{ if(Object.keys(qa).length<QUIZ.length){alert("Réponds à toutes les questions !");return;} setQdone(true); }}>
                Valider le quiz
              </button>
            </div>
          ) : (
            <div style={{display:"contents"}}>
              <div className={score>=12?"cardg":"card"} style={{ textAlign:"center", padding:24, marginBottom:16 }}>
                <p style={{ fontSize:40, marginBottom:8 }}>{score>=12?"🎓":"📚"}</p>
                <p style={{ fontSize:30, fontWeight:700, color:score>=12?G:RD }}>{score}/15</p>
                <p style={{ fontSize:13, marginTop:8, color:"#ccc" }}>
                  {score>=12?"Certification obtenue ! Félicitations ! 🎉":"Score insuffisant — révise et réessaie (12/15 requis)"}
                </p>
              </div>
              {QUIZ.map((q,qi)=>(
                <div key={q.id} className="card" style={{ marginBottom:8 }}>
                  <p style={{ fontSize:12, fontWeight:500, marginBottom:8, lineHeight:1.4 }}>{qi+1}. {q.q}</p>
                  {q.opts.map((opt,oi)=>(
                    <button key={oi} className={`qopt ${oi===q.correct?"ok":qa[q.id]===oi&&oi!==q.correct?"ko":""}`}>{opt}</button>
                  ))}
                </div>
              ))}
              <button className="btn-o" style={{ width:"100%", marginTop:8 }} onClick={()=>{setQa({});setQdone(false);}}>
                Reprendre le quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── FAMILLE OLFACTIVE VIEW ────────────────────────────────────────
function FamilleView() {
  const [openFam, setOpenFam] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Familles Olfactives</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:14 }}>
          <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:4 }}>💐 Les 7 Familles Olfactives</p>
          <p style={{ fontSize:12, color:MU, lineHeight:1.65 }}>Guide pour orienter tes clientes vers le parfum qui leur correspond.</p>
        </div>
        {FAMILLES.map(f => (
          <div key={f.id} className="scrd" style={{ borderLeft:"3px solid "+f.couleur }}>
            <div className="shdr" onClick={()=>{ setOpenFam(openFam===f.id?null:f.id); setOpenSub(null); }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:22 }}>{f.emoji}</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:f.couleur }}>{f.nom}</p>
                  <p style={{ fontSize:10, color:MU, marginTop:1 }}>{f.style}</p>
                </div>
              </div>
              <span style={{ color:f.couleur }}>{openFam===f.id?"▲":"▼"}</span>
            </div>
            {openFam===f.id && (
              <div style={{ padding:"0 14px 14px", borderTop:"0.5px solid rgba(255,255,255,.06)" }}>
                <div style={{ background:"rgba(255,255,255,.03)", borderRadius:8, padding:"10px 12px", margin:"10px 0" }}>
                  <p style={{ fontSize:11, color:MU, marginBottom:3 }}>🎵 Notes</p>
                  <p style={{ fontSize:12, color:"#ccc", lineHeight:1.5 }}>{f.notes}</p>
                </div>
                <div style={{ background:"rgba(255,255,255,.03)", borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  <p style={{ fontSize:11, color:MU, marginBottom:3 }}>👤 Pour qui</p>
                  <p style={{ fontSize:12, color:"#ccc", lineHeight:1.5 }}>{f.pourQui}</p>
                </div>
                <p style={{ fontSize:10, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Sous-familles</p>
                {f.sousFamilles.map((sf,si) => {
                  const subKey = f.id+"-"+si;
                  const isOpen = openSub===subKey;
                  return (
                    <div key={si} style={{ marginBottom:6 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                        background:"rgba(255,255,255,.04)", borderRadius:8, padding:"8px 12px", cursor:"pointer",
                        border:"0.5px solid "+(isOpen?f.couleur:"transparent") }}
                        onClick={()=>setOpenSub(isOpen?null:subKey)}>
                        <p style={{ fontSize:12, fontWeight:500, color:isOpen?f.couleur:TX }}>{sf.n}</p>
                        <span style={{ fontSize:10, color:MU }}>{sf.refs.length} réf.</span>
                      </div>
                      {isOpen && (
                        <div style={{ padding:"8px 12px", background:"rgba(255,255,255,.02)", borderRadius:"0 0 8px 8px", marginTop:-4 }}>
                          {sf.refs.map((r,ri)=>(
                            <span key={ri} style={{ display:"inline-block", fontSize:10, padding:"2px 8px", margin:"2px 3px", background:"rgba(120,120,120,.15)", borderRadius:20, color:"#ccc" }}>{r}</span>
                          ))}
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

// ── CONVERTISSEUR VIEW ────────────────────────────────────────────
function ConvertisseurView() {
  const [eur, setEur] = useState("");
  const [rate, setRate] = useState("245");
  const dzd = eur && !isNaN(+eur) ? Math.round(+eur * (+rate||245)) : null;
  return (
    <div className="fi">
      <div className="sh"><span className="shtitle">Convertisseur</span></div>
      <div className="sb">
        <div className="cardg" style={{ marginBottom:20 }}>
          <p style={{ fontSize:12, color:G, fontWeight:500, marginBottom:4 }}>💱 Convertisseur EUR → DZD</p>
          <p style={{ fontSize:12, color:MU, lineHeight:1.65 }}>Calcule instantanément le prix en Dinars algériens.</p>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, color:MU, display:"block", marginBottom:6 }}>Taux du jour (1€ = ? DA)</label>
          <input className="inp" type="number" placeholder="245" value={rate} onChange={e=>setRate(e.target.value)} style={{ fontSize:18, fontWeight:600, textAlign:"center" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:11, color:MU, display:"block", marginBottom:6 }}>Montant en Euros (€)</label>
          <input className="inp" type="number" placeholder="0.00" value={eur} onChange={e=>setEur(e.target.value)} style={{ fontSize:22, fontWeight:700, textAlign:"center" }} />
        </div>
        {dzd !== null && (
          <div className="cardg" style={{ textAlign:"center", padding:"24px 16px" }}>
            <p style={{ fontSize:13, color:MU, marginBottom:8 }}>{eur} € =</p>
            <p style={{ fontSize:42, fontWeight:700, color:G, lineHeight:1 }}>{dzd.toLocaleString("fr-FR")}</p>
            <p style={{ fontSize:16, color:G, marginTop:4 }}>Dinars algériens</p>
            <p style={{ fontSize:11, color:MU, marginTop:8 }}>Taux : 1€ = {rate} DA</p>
          </div>
        )}
        <div className="div" style={{ margin:"20px 0" }} />
        <p style={{ fontSize:11, color:MU, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Conversions rapides</p>
        {[11.90,18,25.50,35,45,48,52,57,65].map(p => (
          <div key={p} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 14px", background:"rgba(255,255,255,.03)", borderRadius:8, marginBottom:6, border:"0.5px solid rgba(255,255,255,.05)" }}>
            <span style={{ fontSize:13, color:TX, fontWeight:500 }}>{p.toFixed(2)} €</span>
            <span style={{ fontSize:13, color:G, fontWeight:700 }}>{Math.round(p*(+rate||245)).toLocaleString("fr-FR")} DA</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CODES CONSULTANTES (codes Chogan officiels) ───────────────────
// Code admin Marie (secret) : MAR74B59D
const CODES_VALIDES = [
  "SHAC7CB8F",  // Shaïma Khelifi
  "TRAEB240A",  // Tracy Mafita Kembo
  "MIL1B11E0",  // Milene Bouguera
  "SEL2D06DE",  // Selma Merikhi
  "YASD2F154",  // Yasmine Chemali
  "ISA98670B",  // Isabelle Bellaha
  "BLABC677B",  // Blandine Ameur
  "BAY2CAEB0",  // Baya Sahraoui
  "SOPB7D832",  // Sophia Necer
  "NAD7354BF",  // Nadia Nadjem
  "SAR0E4537",  // Sarah Meziou
  "NAD93A481",  // Nadia Bendjeddou
  "MELB42DE5",  // Melissa Zerouk
  "CAS04EBF2",  // Cassandra Cortezon
  "SOU36AE1C",  // Soumia Bensaad
  "ADA7DBE89",  // Adam Talmoudi
  "KAR96A897",  // Karim Ayachi
  "MER2105D7",  // Meryem Boukenkoul
  "NO81BN48",   // Nej Ouadi
];

// ── PENDING VIEW ──────────────────────────────────────────────────
function PendingView({ prenom, nom, onRetry }) {
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 24px", background:"radial-gradient(ellipse at 50% 20%, rgba(201,168,76,.09) 0%, transparent 65%)", fontFamily:"'DM Sans',sans-serif", textAlign:"center" }}>
      <div style={{ fontSize:50, marginBottom:16 }}>⏳</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G, marginBottom:8 }}>Demande envoyée !</div>
      <div style={{ background:S1, borderRadius:16, padding:"24px 22px", maxWidth:340, width:"100%", border:"0.5px solid rgba(201,168,76,.22)", marginBottom:20 }}>
        <p style={{ fontSize:13, color:"#ccc", lineHeight:1.8, marginBottom:12 }}>
          Bonjour <strong style={{color:G}}>{prenom} {nom}</strong> 👋<br/><br/>
          Ta demande d'accès a bien été envoyée à Marie.<br/>
          Elle va valider ton accès très prochainement.<br/><br/>
          <span style={{ fontSize:11, color:MU }}>Une fois autorisée, reviens ici et connecte-toi à nouveau.</span>
        </p>
        <div style={{ background:"rgba(201,168,76,.07)", borderRadius:10, padding:"10px 14px" }}>
          <p style={{ fontSize:11, color:G }}>📧 Marie a reçu une notification et reviendra vers toi.</p>
        </div>
      </div>
      <button className="btn-o" onClick={onRetry}>← Retour à la connexion</button>
      <p style={{ fontSize:22, color:G, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", marginTop:20, fontWeight:600 }}>Marie</p>
    </div>
  );
}

// ── UPDATE BANNER ─────────────────────────────────────────────────
function UpdateBanner() {
  const key = "chogan_version";
  const seen = localStorage.getItem(key);
  const [visible, setVisible] = useState(seen !== APP_VERSION);

  if (!visible) return null;

  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0, zIndex:9999,
      background:`linear-gradient(135deg, ${G}, #a8872e)`,
      padding:"10px 16px", display:"flex", alignItems:"center",
      justifyContent:"space-between", gap:10, boxShadow:"0 2px 12px rgba(201,168,76,.4)"
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:18 }}>✨</span>
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:"#07070f" }}>Nouvelle mise à jour disponible !</p>
          <p style={{ fontSize:10, color:"rgba(0,0,0,.6)" }}>Ferme et rouvre l'app pour en profiter — v{APP_VERSION}</p>
        </div>
      </div>
      <button onClick={()=>{ localStorage.setItem(key, APP_VERSION); setVisible(false); }}
        style={{ background:"rgba(0,0,0,.15)", border:"none", borderRadius:8,
          padding:"6px 12px", fontSize:11, fontWeight:600, color:"#07070f",
          cursor:"pointer", whiteSpace:"nowrap" }}>
        OK ✓
      </button>
    </div>
  );
}

// ── LOGIN VIEW ────────────────────────────────────────────────────
function LoginView({ onLogin }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = () => {
    if (!prenom.trim() || !nom.trim()) { setErr("Merci d'entrer ton prénom et nom."); return; }
    if (!code.trim()) { setErr("Merci d'entrer ton code sponsor."); return; }
    const c = code.trim().toUpperCase();
    const isAdmin = c === "MAR74B59D"; // seul ce code admin
    const isValid = isAdmin || CODES_VALIDES.includes(c);
    if (!isValid) { setErr("Code sponsor incorrect. Contacte Marie pour obtenir ton code."); return; }
    onLogin(prenom.trim(), nom.trim(), c);
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 24px", background:"radial-gradient(ellipse at 50% 20%, rgba(201,168,76,.09) 0%, transparent 65%)", fontFamily:"'DM Sans',sans-serif" }}>
      <img src={LOGO} style={{ width:80, height:80, borderRadius:"50%", objectFit:"cover", marginBottom:14, border:"2px solid rgba(201,168,76,.4)", boxShadow:"0 4px 20px rgba(201,168,76,.2)" }} alt="logo" />
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:G, marginBottom:4, letterSpacing:2, textAlign:"center", lineHeight:1.3 }}>Team Marie</div>
      <p style={{ fontSize:13, color:G, marginBottom:28, letterSpacing:2, fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic" }}>Équipe Chogan Succès 🌷</p>

      <div style={{ width:"100%", maxWidth:340, background:S1, borderRadius:16, padding:"28px 22px", border:"0.5px solid rgba(201,168,76,.22)" }}>
        <p style={{ fontSize:14, color:G, fontWeight:600, marginBottom:18, textAlign:"center" }}>Connexion à l'application</p>

        <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>Prénom</label>
        <input className="inp" placeholder="Ton prénom…" value={prenom} onChange={e=>setPrenom(e.target.value)} style={{ marginBottom:12 }} />

        <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>Nom</label>
        <input className="inp" placeholder="Ton nom…" value={nom} onChange={e=>setNom(e.target.value)} style={{ marginBottom:12 }} />

        <label style={{ fontSize:11, color:MU, display:"block", marginBottom:5 }}>Code Sponsor</label>
        <input className="inp" placeholder="Code sponsor" value={code}
          type="password"
          onChange={e=>setCode(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&handleLogin()}
          style={{ marginBottom:18 }} />

        {err && <p style={{ fontSize:11, color:RD, marginBottom:12, textAlign:"center" }}>{err}</p>}

        <button className="btn-p" style={{ width:"100%" }} onClick={handleLogin}>
          🚀 Accéder à l'application
        </button>
      </div>
      <p style={{ fontSize:10, color:MU, marginTop:16, letterSpacing:1 }}>© Chogan Élite — Espace privé</p>
    </div>
  );
}



// ── MAIN APP ──────────────────────────────────────────────────────
export default function ChoganApp() {
  const [screen, setScreen] = useState("login"); // "login" | "pending" | "app"
  const [tab, setTab] = useState("accueil");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [perfumes, setPerfumes] = useState(DEMO_PERFUMES);
  const [checklist, setChecklist] = useState(CHECKLIST0);
  const [showPromo, setShowPromo] = useState(false);

  const handleLogin = (p, n, code) => {
    const admin = code === "MAR74B59D"; // seul ce code donne les droits admin
    setPrenom(p); setNom(n); setIsAdmin(admin);
    const key = "chogan_seen_" + (p+n).toLowerCase().replace(/\s/g,"");
    const isNew = !localStorage.getItem(key);
    if (isNew && !admin) {
      localStorage.setItem(key, new Date().toLocaleDateString("fr-FR"));
      trackAction(p+" "+n, "accueil", "premiere-connexion");
    } else {
      trackAction(p+" "+n, "accueil", admin?"connexion-admin":"connexion");
    }
    setScreen("app");
  };

  const changeTab = (newTab) => {
    setShowPromo(false); setTab(newTab);
    trackAction(prenom+" "+nom, newTab, "navigation");
  };

  const TABS = [
    { id:"accueil",      lbl:"Accueil",      ic:"🏠" },
    { id:"formation",    lbl:"Formation",    ic:"🚀" },
    { id:"inspirations", lbl:"Inspirations", ic:"🌹" },
    { id:"familles",     lbl:"Familles",     ic:"💐" },
    { id:"catalogues",   lbl:"Catalogue",    ic:"💄" },
    { id:"commande",     lbl:"Commande",     ic:"💶" },
    { id:"checklist",    lbl:"Check-list",   ic:"✨" },
    { id:"promo",        lbl:"Promo",        ic:"%" },
    { id:"convertisseur",lbl:"Convertis.",   ic:"💱" },
  ];

  const activeLabel = TABS.find(t=>t.id===tab)?.lbl || "";

  if (screen==="login") return (
    <div style={{ background:BG, minHeight:"100vh" }}>
      <style>{CSS}</style>
      <LoginView onLogin={handleLogin} />
    </div>
  );

  if (screen==="pending") return (
    <div style={{ background:BG, minHeight:"100vh" }}>
      <style>{CSS}</style>
      <PendingView prenom={prenom} nom={nom} onRetry={()=>setScreen("login")} />
    </div>
  );

  return (
    <div style={{ background:BG, minHeight:"100vh" }}>
      <style>{CSS}</style>
      <UpdateBanner />
      <div className="app">
        <nav className="lnav">
          <img src={LOGO} style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover", marginBottom:10, marginTop:4, flexShrink:0, border:"1.5px solid rgba(201,168,76,.35)" }} alt="logo" />
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
            <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(201,168,76,.15)", border:"1.5px solid rgba(201,168,76,.4)", display:"flex", alignItems:"center", justifyContent:"center", marginRight:8, flexShrink:0 }}>
              <span style={{ fontFamily:"serif", fontSize:14, color:"#c9a84c", fontWeight:700 }}>C</span>
            </div>
            <span className="logo">Team Marie 🌷</span>
            <span className="hdr-sub">{activeLabel}</span>
            <button onClick={()=>{ if(window.confirm("Se déconnecter ?")) setScreen("login"); }}
              style={{ marginLeft:"auto", background:"none", border:"0.5px solid rgba(224,80,80,.35)", color:RD, borderRadius:8, padding:"4px 10px", fontSize:10, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", letterSpacing:.5 }}>
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
