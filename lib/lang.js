const e=require("fs"),i=require("inquirer"),{LANG_TEXT:n}=require("../i18n"),{AbsPath:a,ShowMsg:r,ShowTitle:t}=require("../util");module.exports=async function(){t("lang");const s=[{choices:["zh-chs 简体中文","zh-cht 繁体中文","en English"],default:0,message:n.qaLanguage,name:"language",type:"list"}],l=(await i.prompt(s)).language.split(" ")[0],u=a("../i18n/index.js",1),c=e.readFileSync(u,"utf8").replace(/"(.+?)"/gi,`"./${l}"`);e.writeFileSync(u,c),r("green",n.langSucceed)};