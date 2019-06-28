function e(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},r=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),r.forEach(function(t){s(e,t,o[t])})}return e}function s(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}const t=require("postcss-import"),o=require("postcss-preset-env"),r=require("eslint-friendly-formatter"),a=require("mini-css-extract-plugin"),{browserList:i,eslintIgnores:l,eslintRules:u,frame:d,useTs:h}=require("./bruce"),{BROWSER:n}=require("../util/getting"),{AbsPath:p,IsExist:c}=require("../util/setting");module.exports=class{constructor(s){const{MODE:b="dll",HAS_POLYFILL:m=!1,USE_ES6:g=!1,USE_HASH:f=!1,USE_JSLINT:L=!1,USE_POLYFILL:y=!1}=s;this.mode=b,this.useJslint=L,this.useEs6=g,this.usePolyfill=y,this.useHash=f,this.useSourceMap="dev"===this.mode,this.hasPolyfill=m,this.loaderScope={exclude:/node_modules/,include:/src/},this.browsers=this.useEs6?n:i,this.envOpts=Object.assign({modules:!1,targets:{browsers:this.browsers}},this.hasPolyfill?{corejs:3,useBuiltIns:"entry"}:this.usePolyfill?{}:{corejs:3,useBuiltIns:"usage"}),this.handlebars={helperDirs:p("src/templates/helpers"),partialDirs:p("src/templates/partials")},this.style={sourceMap:this.useSourceMap},this.css={importLoaders:2,sourceMap:this.useSourceMap},this.postcss={plugins:[t(),o()],sourceMap:this.useSourceMap},this.sass={sourceMap:this.useSourceMap},this.less={sourceMap:this.useSourceMap},this.babel={babelrc:!1,cacheDirectory:!0,comments:!0,cwd:p("..",1),plugins:[["@babel/plugin-transform-runtime",{regenerator:!1,useESModules:!0}],["@babel/plugin-proposal-decorators",{legacy:!0}],["@babel/plugin-proposal-class-properties",{loose:!0}],["@babel/plugin-syntax-dynamic-import"],"lodash"],presets:[["@babel/preset-env",this.envOpts],h?"@babel/preset-typescript":null].filter(Boolean),sourceMap:this.useSourceMap},this.babelReact=Object.assign({},this.babel,{plugins:[...this.babel.plugins,["import",{libraryDirectory:"es",libraryName:"antd",style:"css"},"antd"],["import",{libraryDirectory:"es",libraryName:"antd-mobile",style:"css"},"antd-mobile"],["import",{libraryDirectory:"es",libraryName:"ant-design-vue",style:"css"},"ant-design-vue"],c("node_modules/react-hot-loader")?p("node_modules/react-hot-loader/babel"):null].filter(Boolean),presets:[...this.babel.presets,"@babel/preset-react"]}),this.tsVue={appendTsSuffixTo:[/\.vue$/]},this.eslint={cache:!0,configFile:p(`../temp/configs/eslintrc-${d}.json`,1),cwd:p("..",1),formatter:r,ignorePattern:l,rules:u},this.imagemin={gifsicle:{optimizationLevel:1},mozjpeg:{quality:70},optipng:{enabled:!1},pngquant:{quality:"70-90",speed:4}},this.rawLoader=e({},this.loaderScope,{test:/\.txt$/,use:[{loader:"raw-loader"}]}),this.hbsLoader=e({},this.loaderScope,{test:/\.(html|hbs)$/,use:[{loader:"handlebars-loader",options:this.handlebars}]}),this.cssLoader={include:/(node_modules|src)/,test:/\.css$/,use:[this.useSourceMap?{loader:"style-loader",options:this.style}:{loader:a.loader},{loader:"css-loader",options:this.css},{loader:"postcss-loader",options:this.postcss}]},this.sassLoader=e({},this.loaderScope,{test:/\.(sass|scss)$/,use:[this.useSourceMap?{loader:"style-loader",options:this.style}:{loader:a.loader},{loader:"css-loader",options:this.css},{loader:"postcss-loader",options:this.postcss},{loader:"sass-loader",options:this.sass}]}),this.lessLoader=e({},this.loaderScope,{test:/\.less$/,use:[this.useSourceMap?{loader:"style-loader",options:this.style}:{loader:a.loader},{loader:"css-loader",options:this.css},{loader:"postcss-loader",options:this.postcss},{loader:"less-loader",options:this.less}]}),this.babelLoader=e({},this.loaderScope,{test:/\.(js|ts)$/,use:[{loader:"babel-loader",options:this.babel}]}),this.babelReactLoader=e({},this.loaderScope,{test:/\.(js|ts|jsx|tsx)$/,use:[{loader:"babel-loader",options:this.babelReact}]}),this.babelVueLoader={exclude:e=>/node_modules/.test(e)&&!/\.vue\.js/.test(e),test:/\.js$/,use:[{loader:"babel-loader",options:this.babel}]},this.tsVueLoader=e({},this.loaderScope,{test:/\.ts$/,use:[{loader:"ts-loader",options:this.tsVue}]}),this.vueLoader=e({},this.loaderScope,{test:/\.vue$/,use:[{loader:"vue-loader"}]}),this.imgLoader=e({},this.loaderScope,{test:/\.(png|jpe?g|gif|svg)$/,use:[{loader:this.useSourceMap?"file-loader":"url-loader",options:this.useSourceMap?this.file("img"):this.url("img")}]}),this.fontLoader=e({},this.loaderScope,{test:/\.(eot|woff?2|ttf|otf)$/,use:[{loader:"file-loader",options:this.file("font")}]}),this.mediaLoader=e({},this.loaderScope,{test:/\.(wav|mp3|ogg|flac|aac|mp4|webm)(\?.*)?$/,use:[{loader:"file-loader",options:this.file("media")}]})}file(e){return{name:`[name]${this.useHash?".[hash:4]":""}.[ext]`,outputPath:e}}url(e){return{limit:10240,name:`[name]${this.useHash?".[hash:4]":""}.[ext]`,outputPath:e}}getLoader(){if(this.useJslint&&!h){const e={loader:"eslint-loader",options:this.eslint};this.babelLoader.use.push(e),this.babelReactLoader.use.push(e),this.babelVueLoader.use.push(e)}"dev"!==this.mode&&this.imgLoader.use.push({loader:"image-webpack-loader",options:this.imagemin});const e={default:[this.babelLoader],react:[this.babelReactLoader],vue:[h?this.tsVueLoader:this.babelVueLoader,this.vueLoader]}[d];return{rules:[this.rawLoader,this.hbsLoader,this.cssLoader,this.sassLoader,this.lessLoader,this.imgLoader,this.fontLoader,this.mediaLoader,...e].filter(Boolean)}}};