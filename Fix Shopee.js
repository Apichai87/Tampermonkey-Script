// ==UserScript==
// @name         Fix Shopee
// @namespace    http://ubotplugin.com/
// @version      0.3
// @description  try to take over the world!
// @author       Apichai P.
// @include      https://shopee*
// @grant	     GM_xmlhttpRequest
// @grant	     GM_getResourceText
// @grant	     GM_getResourceURL
// @grant	     GM_getValue
// @grant	     GM_setValue
// @grant	     GM_openInTab
// @grant	     GM_registerMenuCommand
// @grant	     GM_addStyle
// @grant	     GM_log
// @run-at       document-end
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
// @include      *shopee.co.th/*
// @include      https://shopee.co.th/cart/*
// @include      https://shopee.co.th/search*
// @include      https://shopee.co.th/user/voucher*
// @include      https://shopee.co.th/user/purchase/list/?type=8
// @updateURL    https://raw.githubusercontent.com/Apichai87/Tampermonkey-Script/main/Fix%20Shopee
//อย่ตั้งค่าเป็น Top of frame

(function() {
    'use strict';
    var runOne = true;
    function stripHtmlTag(node)
    {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = node.innerHTML + "";
        return tmp.textContent || tmp.innerText || "";
    }
    function pageFullyLoaded()
    {
        //if(!runOne) return;
        runOne = false;
        try {
            //********************************************************* Title change size  *********************************************************
            function isOverflown(element) {
                return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            }
            setTimeout(function(){
                var x = document.querySelectorAll('div[class*="flex flex-auto "]');
                if(x.length > 0){
                    x = x[0].children;
                    x = x[0].children;
                    let el = x[0];
                    //alert(el.innerText);
                    //el.style.textOverflow = "clip";
                    //el.style.wordWrap = "normal";
                    //el.style.fontSize = "1.0rem";
                    el.style.fontWeight = "bold";
                    //el.style.fontSize = "16px";
                    el.style.fontSize = '110%';
                    //el.style.fontSize = '1vw';

                   // var f = 0.35, s = el.offsetWidth, fs = s * f;
                   // el.style.fontSize = fs + '%';




                    //Get font size
                    //var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
                    //var fontSize = parseFloat(style);
                    //alert(fontSize);

                    //Check Text has over-flown
                    //alert('offsetWidth: '+ el.offsetWidth + ' scrollWidth: ' + el.scrollWidth); // ==
                    // alert(isOverflown(el));
                    // if (el.offsetWidth < el.scrollWidth) {
                    //     alert('Text has over-flown');
                    // }

                }
            }, 3000);



            //********************************************************* Oder List highlight *********************************************************
            var time1 = setInterval(function(){
                var x = document.getElementsByClassName("order-delivery-status__desc");
                if(x.length < 1) clearInterval(time1);
                for (var i=0; i < x.length; i++) {
                    var txt = x[i].innerText || x[i].textContent;
                    if(txt.includes("Your order is out for delivery") || txt.includes("On Vehicle for Delivery") || txt.includes("Your order is out for delivery") || txt.includes("Arrived at destination station") || txt.includes("Out for delivery") || txt.includes("]อยู่ระหว่างการจัดส่ง") || txt.includes("กําลังนำส่งพัสดุของคุณ")){//Your order is out for

                        x[i].style.backgroundColor = "#FDFF47";
                        //x[i].style.outline = '#f00 solid 2px';
                    }
                    else if(txt.includes("Completed") || txt.includes("Sukhothai") || txt.includes("เมืองสุโขทัย")){

                        x[i].style.backgroundColor = "#32a852";
                        //x[i].style.outline = '#f00 solid 2px';
                    }

                }

            }, 3000);
            //********************************************************* สกัด url ของภาพ *********************************************************
            var t = 0;
            var time2 = setInterval(function(){
                var x = document.querySelectorAll('div[style*="background-size: contain; background-repeat: no-repeat;"]');//background-image: url("https://cf.shopee.co.th/file/
                console.log('shopee สกัด url ของภาพ: '+ x.length);
                if(x.length < 1 && t > 5){
                    clearInterval(time2);
                }else{
                    t++;
                }
                for (var i=0; i < x.length; i++) {
                    var ele = x[i];
                    var eleCheck = ele.parentElement.parentElement.parentElement;
                    //console.log(eleCheck.innerHTML);
                    if(eleCheck.innerHTML.includes("data-dashjs-player")){
                        var imageUrl = ele.getAttribute("style");
                        imageUrl = imageUrl.match(/(?<=").*?(?=")/g);
                        //alert(imageUrl);
                        var element = document.getElementById('genUrl');
                        if (typeof(element) != 'undefined' && element != null)
                        {
                            element.innerHTML = '<a href="'+ imageUrl +'" target="_blank">'+ imageUrl +'</a>';
                        }else{
                            // Create the element
                            element = document.createElement("div");
                            element.setAttribute("id", "genUrl");
                            // Add script content
                            element.innerHTML = '<a href="'+ imageUrl +'" target="_blank">'+ imageUrl +'</a>';
                            // Append
                            eleCheck.appendChild(element);
                        }
                        break;
                    }
                }

            }, 1000);

            // $("body").on('DOMSubtreeModified', "#genUrl", function() {
            //     alert('changed');
            // });
            //********************************************************* ควบคุมการเลื่อนหน้า และการเปิดหน้า ด้วยปุ่มลูกศร *********************************************************

            document.addEventListener('keydown', logKey);//keypress
            function logKey(e) {
                console.log(e.key); //e.code
                switch (event.key) {
                    case "ArrowLeft":
                        // Left pressed
                        document.getElementsByClassName("shopee-button-outline shopee-mini-page-controller__prev-btn")[0].click();
                        break;
                    case "ArrowRight":
                        // Right pressed
                        document.getElementsByClassName("shopee-button-outline shopee-mini-page-controller__next-btn")[0].click();
                        break;
                    case "ArrowUp":
                        // Up pressed
                        break;
                    case "ArrowDown":
                        // Down pressed
                        break;
                }
            }
            // $("a").each(function(){
            //     $(this).on("mouseover", function () {//.mouseover(function(){
            //         $(this).attr("title", $(this).text());
            //         $(this).attr("alt", $(this).text());
            //     });
            // });
            //setTimeout(function() {
            setInterval(function() {
                var allTags = document.getElementsByTagName("A");//document.getElementsByClassName('shopee-search-item-result');
                if(allTags.length > 0){
                    //console.log("Set A title: " + allTags.length);
                    // allTags = allTags[0].getElementsByTagName("A");
                    for (var i = 0; i < allTags.length; i++) {
                        // allTags[i] is an element within the container object
                        // allTags[i].id is the id of the element (if there is one)
                        var a = allTags[i];
                        var txt = stripHtmlTag(a);
                        //console.log(txt);
                        txt = txt.split('฿')[0];
                        a.setAttribute('title', txt);
                        a.setAttribute('alt', txt);
                    }
                }
            }, 3000);
            // var elements = document.getElementsByTagName('a');
            // for(var i = 0; i < elements.length; i++) {
            //     var a = elements[i];
            //     if (a.title || a.title === "")
            //     {
            //         var linkText = a.innerText || a.textContent;
            //         linkText = linkText.replace(/\d+%/ig, "").trim();
            //         linkText = linkText.replace(/(ร้านแนะนำ|ส่วนลด)/ig, "").trim();
            //         linkText = linkText.replace(/\n.*/ig, "").trim();
            //         if(!linkText.includes("http")){
            //             a.title = linkText;
            //         }
            //         //a.target = "_blank";
            //         //a.setAttribute('target', '_blank');
            //         var url = a.getAttribute("href") + "";
            //         //alert(url);
            //         if(!url.includes("javascript")){
            //             var strWindowFeatures = "";//height=570,width=520,menubar=1,resizable=1 // location=1,scrollbars=1,status=1
            //             if(url.includes("http")){
            //                 //a.setAttribute('onclick', "window.open('" + url +"', '_blank', '"+ strWindowFeatures +"'); return false;");
            //             }
            //             else{
            //                 //a.setAttribute('onclick', "window.open('https://shopee.co.th" + url +"', '_blank', '"+ strWindowFeatures +"'); return false;");
            //             }
            //         }
            //        // a.setAttribute('href', 'javascript:void(0); return false;');//javascript:void(0);
            //     }
            // }
        }
        catch(err) {
            alert(err + "");
        }
    }
    pageFullyLoaded();
    window.onload = function () {
        pageFullyLoaded();

    }
    // window.onscroll = function() {
    //     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //         pageFullyLoaded();
    //     }
    // }
})();
