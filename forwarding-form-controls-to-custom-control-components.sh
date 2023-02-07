cd /media/tcma/SeagateBackupPlusDrive/angularNetbasal/forwarding-form-controls-to-custom-control-components

bug-wget@gnu.org
https://lists.gnu.org/archive/html/bug-wget/2023-02/threads.html

Download webpages for offline viewing but get PAGE NOT FOUND 404 in browser later

I like to download webpages for offline viewing.
I do:
$ wget --reject robots.txt --limit-rate=200k --no-clobber --convert-links --random-wait -r -p -E -e robots=off -U mozilla https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55

The download completed without error.

I open the downloaded webpage:
file:///home/ak/netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html

The browser display:
PAGE NOT FOUND
404
Out of nothing, something.


$ wget -V
GNU Wget 1.20.3 built on linux-gnu.

-cares +digest -gpgme +https +ipv6 +iri +large-file -metalink +nls 
+ntlm +opie +psl +ssl/openssl 

Wgetrc: 
    /etc/wgetrc (system)
Locale: 
    /usr/share/locale 
Compile: 
    gcc -DHAVE_CONFIG_H -DSYSTEM_WGETRC="/etc/wgetrc" 
    -DLOCALEDIR="/usr/share/locale" -I. -I../../src -I../lib 
    -I../../lib -Wdate-time -D_FORTIFY_SOURCE=2 -DHAVE_LIBSSL -DNDEBUG 
    -g -O2 -fdebug-prefix-map=/build/wget-3oF214/wget-1.20.3=. 
    -fstack-protector-strong -Wformat -Werror=format-security 
    -DNO_SSLv2 -D_FILE_OFFSET_BITS=64 -g -Wall 
Link: 
    gcc -DHAVE_LIBSSL -DNDEBUG -g -O2 
    -fdebug-prefix-map=/build/wget-3oF214/wget-1.20.3=. 
    -fstack-protector-strong -Wformat -Werror=format-security 
    -DNO_SSLv2 -D_FILE_OFFSET_BITS=64 -g -Wall -Wl,-Bsymbolic-functions 
    -Wl,-z,relro -Wl,-z,now -lpcre2-8 -luuid -lidn2 -lssl -lcrypto -lz 
    -lpsl ftp-opie.o openssl.o http-ntlm.o ../lib/libgnu.a 


Hi, I guess it's a problem with the way you try to tell what to open to the browser. If you use "File"/"Open", does it work? Is "forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html" readable with a text editor? Do you use the same user on the system for Wget and for accessing the resulting files?

--
Sincerely, Stephane Ascoet



Hi Stephane,

"File"/"Open" by the browser does not work.  The browser display the proper webpage for about a second, then the browser display:
PAGE NOT FOUND
404
Out of nothing, something.


"forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html" is readable with a text editor.
I use the same user on the system for Wget and for accessing the resulting files.


$ ls -l forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html 
-rw-rw-r-- 1 ak ak 162986 Feb  4 08:48 forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html

$ head forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html 
<!doctype html><html lang="en"><head><title data-rh="true">Forwarding Form Controls to Custom Control Components in Angular | by Netanel Basal | Jan, 2023 | Netanel Basal</title><meta data-rh="true" charset="utf-8"/><meta data-rh="true" name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1"/><meta data-rh="true" name="theme-color" content="#000000"/><meta data-rh="true" name="twitter:app:name:iphone" content="Medium"/><meta data-rh="true" name="twitter:app:id:iphone" content="828256236"/><meta data-rh="true" property="al:ios:app_name" content="Medium"/><meta data-rh="true" property="al:ios:app_store_id" content="828256236"/><meta data-rh="true" property="al:android:package" content="com.medium.reader"/><meta data-rh="true" property="fb:app_id" content="542599432471018"/><meta data-rh="true" property="og:site_name" content="Medium"/><meta data-rh="true" property="og:type" content="article"/><meta data-rh="true" property="article:published_time" content="2023-01-25T06:21:06.742Z"/><meta data-rh="true" name="title" content="Forwarding Form Controls to Custom Control Components in Angular | by Netanel Basal | Jan, 2023 | Netanel Basal"/><meta data-rh="true" property="og:title" content="Forwarding Form Controls to Custom Control Components in Angular"/><meta data-rh="true" property="al:android:url" content="medium://p/701e8406cc55"/><meta data-rh="true" property="al:ios:url" content="medium://p/701e8406cc55"/><meta data-rh="true" property="al:android:app_name" content="Medium"/><meta data-rh="true" name="description" content="Sometimes we want to forward and use an existing form control rather than creating a redundant value accessor wrapper. One common use case is when creating, for example, custom input components. The…"/><meta data-rh="true" property="og:description" content="Sometimes we want to forward and use an existing form control rather than creating a redundant value accessor wrapper. One common use case…"/><meta data-rh="true" property="og:url" content="https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55"/><meta data-rh="true" property="al:web:url" content="https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55"/><meta data-rh="true" property="og:image" content="https://miro.medium.com/max/1200/1*6Xdo7Aasvlf5u60XygTVLA.png"/><meta data-rh="true" property="article:author" content="https://netbasal.medium.com"/><meta data-rh="true" name="author" content="Netanel Basal"/><meta data-rh="true" name="robots" content="index,follow,max-image-preview:large"/><meta data-rh="true" name="referrer" content="unsafe-url"/><meta data-rh="true" property="twitter:title" content="Forwarding Form Controls to Custom Control Components in Angular"/><meta data-rh="true" name="twitter:site" content="@NetanelBasal"/><meta data-rh="true" name="twitter:app:url:iphone" content="medium://p/701e8406cc55"/><meta data-rh="true" property="twitter:description" content="Sometimes we want to forward and use an existing form control rather than creating a redundant value accessor wrapper. One common use case…"/><meta data-rh="true" name="twitter:image:src" content="https://miro.medium.com/max/1200/1*6Xdo7Aasvlf5u60XygTVLA.png"/><meta data-rh="true" name="twitter:card" content="summary_large_image"/><meta data-rh="true" name="twitter:label1" content="Reading time"/><meta data-rh="true" name="twitter:data1" content="3 min read"/><meta data-rh="true" name="twitter:tile:template:testing" content="2"/><meta data-rh="true" name="twitter:tile:image" content="https://miro.medium.com/max/1200/1*6Xdo7Aasvlf5u60XygTVLA.png"/><meta data-rh="true" name="twitter:tile:info1:icon" content="Person"/><meta data-rh="true" name="twitter:tile:info1:text" content="Netanel Basal"/><meta data-rh="true" name="twitter:tile:info2:icon" content="Calendar"/><meta data-rh="true" name="twitter:tile:info2:text" content="Jan 25, 2023"/><meta data-rh="true" name="twitter:cta" content="Read on Medium"/><link data-rh="true" rel="icon" href="https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png"/><link data-rh="true" rel="search" type="application/opensearchdescription+xml" title="Medium" href="osd.xml"/><link data-rh="true" rel="apple-touch-icon" sizes="152x152" href="https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="120x120" href="https://miro.medium.com/fit/c/120/120/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="76x76" href="https://miro.medium.com/fit/c/76/76/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="apple-touch-icon" sizes="60x60" href="https://miro.medium.com/fit/c/60/60/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"/><link data-rh="true" rel="mask-icon" href="https://cdn-static-1.medium.com/_/fp/icons/Medium-Avatar-500x500.svg" color="#171717"/><link data-rh="true" id="glyph_preload_link" rel="preload" as="style" type="text/css" href="https://glyph.medium.com/css/unbound.css"/><link data-rh="true" id="glyph_link" rel="stylesheet" type="text/css" href="https://glyph.medium.com/css/unbound.css"/><link data-rh="true" rel="author" href="https://netbasal.medium.com"/><link data-rh="true" rel="canonical" href="forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55.html"/><link data-rh="true" rel="alternate" href="android-app://com.medium.reader/https/medium.com/p/701e8406cc55"/><script data-rh="true" type="application/ld+json">{"@context":"http:\u002F\u002Fschema.org","@type":"NewsArticle","image":["https:\u002F\u002Fmiro.medium.com\u002Fmax\u002F1200\u002F1*6Xdo7Aasvlf5u60XygTVLA.png"],"url":"https:\u002F\u002Fnetbasal.com\u002Fforwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55","dateCreated":"2023-01-25T06:21:06.742Z","datePublished":"2023-01-25T06:21:06.742Z","dateModified":"2023-01-25T09:24:16.896Z","headline":"Forwarding Form Controls to Custom Control Components in Angular","name":"Forwarding Form Controls to Custom Control Components in Angular","description":"Sometimes we want to forward and use an existing form control rather than creating a redundant value accessor wrapper. One common use case is when creating, for example, custom input components. The…","identifier":"701e8406cc55","author":{"@type":"Person","name":"Netanel Basal","url":"https:\u002F\u002Fnetbasal.medium.com"},"creator":["Netanel Basal"],"publisher":{"@type":"Organization","name":"Netanel Basal","url":"netbasal.com","logo":{"@type":"ImageObject","width":91,"height":60,"url":"https:\u002F\u002Fmiro.medium.com\u002Fmax\u002F182\u002F1*0r2siF-7v-HjTwQd1G3Zyw.jpeg"}},"mainEntityOfPage":"https:\u002F\u002Fnetbasal.com\u002Fforwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55"}</script><style type="text/css" data-fela-rehydration="520" data-fela-type="STATIC">html{box-sizing:border-box;-webkit-text-size-adjust:100%}*, *:before, *:after{box-sizing:inherit}body{margin:0;padding:0;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;color:rgba(0,0,0,0.8);position:relative;min-height:100vh}h1, h2, h3, h4, h5, h6, dl, dd, ol, ul, menu, figure, blockquote, p, pre, form{margin:0}menu, ol, ul{padding:0;list-style:none;list-style-image:none}main{display:block}a{color:inherit;text-decoration:none}a, button, input{-webkit-tap-highlight-color:transparent}img, svg{vertical-align:middle}button{background:transparent;overflow:visible}button, input, optgroup, select, textarea{margin:0}:root{--reach-tabs:1;--reach-menu-button:1}#speechify-root{font-family:Sohne, sans-serif}div[data-popper-reference-hidden="true"]{visibility:hidden;pointer-events:none}
/*XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>*/.hljs {background: #fff;color: black;
}/* Gray DOCTYPE selectors like WebKit */
.xml .hljs-meta {color: #c0c0c0;
}.hljs-comment,
.hljs-quote {color: #007400;
}.hljs-tag,
.hljs-attribute,
.hljs-keyword,
.hljs-selector-tag,
