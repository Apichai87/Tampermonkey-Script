// ==UserScript==
// @name         Fix Lazada
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://www.lazada.co.th/*
// @include      https://cart.lazada.co.th/*
// @include      https://my.lazada.co.th/customer/order/*
// @grant        GM_addStyle
// @run-at       document-end
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
    }
    var x;
    try {
        window.addEventListener('load', (event) => {
            var url = window.location !== window.parent.location ? document.referrer : document.location.href;


            var $win = $(window),
                $base = $('.lzd-playground-main'),
                $inner = $('#rightContainer_CR');

            $win.on('scroll', function(e) {
                var viewportHeight = $win.height(),
                    baseBoundingBox = $base[0].getBoundingClientRect().top,
                    innerPOS = (baseBoundingBox + $base.outerHeight()) - viewportHeight,
                    baseWidth = $base.outerWidth();

                if(innerPOS <= 0) {
                    if ($inner.css('position') !== 'absolute') {
                        $inner.css({ position: 'absolute', maxWidth: 'none', left: 0, marginLeft: 0 });
                    }
                }
                else {
                    if ($inner.css('position') !== 'fixed') {
                        //$inner.css({ position: 'fixed', maxWidth: baseWidth, left: '50%', marginLeft: -(baseWidth / 2) });
                         $inner.css({ position: 'fixed', maxWidth: baseWidth, right: '18%'});//left: '100%',, marginLeft: -(baseWidth / 2)
                    }
                }
            });

            //********************************************************* แสดงรายการสินค้ามากขึ้น *********************************************************
            if(url.includes("customer/order")){
                setInterval(function(){
                    x = document.getElementsByClassName("next-icon next-icon-arrow-down next-icon-small next-select-arrow");
                    if(x.length > 0 && !x[0].parentNode.textContent.includes("คำสั่งซื้อในปี")){
                        //alert(x[0].parentNode.textContent)
                        x[0].click();
                        var menuItem = document.getElementsByClassName("next-menu-item");
                        if(menuItem.length > 0){
                            if(isInViewport(menuItem[4])) menuItem[4].click();
                        }
                    }
                }, 3000);
            }
            //********************************************************* ย้ายแถบรีวิวดาว *********************************************************
            setInterval(function(){
                x = document.getElementsByClassName("next-menu-content");
                if(x.length < 1){
                    x = document.getElementsByClassName("oper");
                    if(x.length > 0){
                        if(isInViewport(x[0])) x[0].click();
                    }
                }
            }, 2000);
            //********************************************************* ย้ายแถบนำทางสินค้าจากด้านล่าง *********************************************************
            setInterval(function(){
                var x = document.getElementsByClassName("next-pagination-pages");//next-pagination-pages
                //alert(x.length);
                if(x.length > 0){
                    var navBar = x[0];
                    //navBar.style.position = "absolute";
                    navBar.style.position = "fixed";
                    navBar.style.margin = "auto";
                    // navBar.style.margin = "15px 500px -100px";//"15px 500px -100px";
                    //navBar.style.display = "flex";
                    //navBar.style.left = "50%";
                    // navBar.right = "50%";
                    navBar.style.transform = "translate(-50%, -50%)";
                    //navBar.style.top = "50%";
                    navBar.style.top = "6%";
                    navBar.style.left = "50%";
                    //navBar.style.bottom = "50%";
                    // navBar.style.right = "50%";
                    navBar.style.zIndex = "16777271";
                    var topActionHeader = document.getElementById("topActionHeader");
                    topActionHeader.insertBefore(navBar, topActionHeader.firstChild);
                    //topActionHeader.style.display = "flex";
                }
            }, 2000);

            setInterval(function(){
                var x = document.querySelectorAll('[data-qa-locator="general-products"]');
                if(x.length > 0){
                    var navBar = x[0].nextSibling;
                    //navBar.style.position = "absolute";
                    //navBar.style.margin = "auto";
                    navBar.style.left = "50%";
                    navBar.style.top = "0%";
                    //navBar.right = "50%";
                    navBar.style.transform = "translate(-50%, -50%)";
                    var topActionHeader = document.getElementById("topActionHeader");
                    topActionHeader.insertBefore(navBar, topActionHeader.firstChild);
                    //topActionHeader.style.margin = "-50px";
                }
            }, 1000);
            //********************************************************* คลิกหน้าออเดอร์ เลือกที่กำลังจัดส่ง *********************************************************
            //         setTimeout(function(){
            //             var x = document.getElementsByClassName('order-tab-item ')[2];
            //             if (typeof(x) != 'undefined' && x != null)
            //             {
            //                 x.click();
            //             }

            //         }, 100);
            //********************************************************* สกัด url ของภาพ *********************************************************
            if(document.getElementsByClassName("pdp-mod-common-image gallery-preview-panel__image").length > 0){
                setInterval(function(){
                    var x = document.getElementsByClassName('pdp-mod-common-image gallery-preview-panel__image')[0];
                    var x2 = document.getElementsByClassName('next-slick-list')[0];
                    var imageUrl = x.getAttribute("src");
                    //imageUrl = imageUrl.match(/(?<=").*?(?=")/g);
                    //alert(imageUrl);
                    var element = document.getElementById('genUrl');
                    if (typeof(element) != 'undefined' && element != null)
                    {
                        element.innerHTML = '<a href="'+ imageUrl +'" target="_blank">https:'+ imageUrl +'</a>';
                    }else{
                        // Create the element
                        element = document.createElement("div");
                        element.setAttribute("id", "genUrl");
                        element.style.zIndex = "999999";
                        element.style.position = "absolute";
                        element.style.wordWrap = "break-word";
                        element.style.width = "320px";
                        // Add script content
                        element.innerHTML = '<a href="'+ imageUrl +'" target="_blank">https:'+ imageUrl +'</a>';
                        // Append
                        x2.parentElement.appendChild(element);
                    }

                }, 1000);
            }
            //********************************************************* คลิกหน้าต่อไป เมื่อเลื่อนลงมาจนสุดแล้ว *********************************************************
            //           if(document.getElementsByClassName("anticon anticon-right").length > 0){
            //               window.onscroll = function() {
            //                   var doc = document.documentElement;
            //                   var current = doc.scrollTop;
            //                   var height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            //                   height = height - 1500;
            //                   //alert("current: " + current + "\r\nheight: " + height);
            //                   if (current >= height) {
            //                       //console.log('At the bottom');
            //                       //console.log('Waiting 2 second to switch to next page')
            //                       setTimeout(function(){
            //                           var doc = document.documentElement;
            //                           var current = doc.scrollTop;// + window.innerHeight;

            //                           if (current >= height) {
            //                               //document.getElementById('pnnext').click();
            //                               var x = document.getElementsByClassName("anticon anticon-right")[0].click();
            //                           }
            //                           else {
            //                               console.log('Next page didn\'t switch because you scrolled up');
            //                           }
            //                       }, 2000);
            //                   }
            //               };
            //           }
            //********************************************************* เพิ่มปุ่มค้นหาในร้านค้า ********************************************************************************

            if((!url.includes("/catalog/") && url.includes("?q=")) || url.includes("/products/") || url.includes("pageTypeId=") || url.includes("/shop/")){
                //lzdNavCart.style.position="absolute";
                var masterNode = document.getElementsByClassName("lzd-nav-search")[0];
                masterNode.style.width = "600px";

                var topNode = document.createElement("div");
                topNode.style.display = "inline-block";
                //topNode.style.display = "inline";
                topNode.style.position="fixed";
                //topNode.style.position="absolute";

                var node = document.createElement("button");
                node.setAttribute("type","button");
                node.setAttribute("id","searchButton");
                var txtNode = document.createTextNode("ค้นหาในร้านค้า");
                node.appendChild(txtNode);
                node.onclick = function() {
                    var txt = encodeURI(document.getElementById("q").value.trim());
                    var newUrl = "";
                    if(url.includes("/shop/")){
                        var shopName = window.top.location.href.match(/(?<=\/shop\/).*?(?=(\?|&))/g);
                        //alert(shopName)
                        newUrl = "https://www.lazada.co.th/" + shopName + "/?q=&langFlag=th&from=wangpu&lang=th&pageTypeId=2".replace(/(?<=q=).*?(?=&)/g, txt);
                    }else if(url.includes("/products/")){
                        shopName = document.getElementsByClassName("pdp-link pdp-link_size_xs pdp-link_theme_blue")[0];
                        shopName = shopName.href.match(/(?<=\/shop\/).*?(?=\/)/g);
                        newUrl = "https://www.lazada.co.th/" + shopName + "/?q=&langFlag=th&from=wangpu&lang=th&pageTypeId=2".replace(/(?<=q=).*?(?=&)/g, txt);
                    }else{
                        newUrl = url.replace(/(?<=q=).*?(?=&)/g, txt);
                    }
                    window.top.location.href = newUrl + "&sort=priceasc";
                };
                node.style.cssText = "background-color: #4CAF50; border: none; color: white; font-size: 16px; padding: 13.5px 10px; text-align: center; cursor: pointer;";

                topNode.appendChild(node);
                masterNode.parentNode.insertBefore(topNode, masterNode.nextSibling);

                var lzdNavCart = document.getElementsByClassName("lzd-nav-cart")[0];
                lzdNavCart.style.display="inline-block";
                lzdNavCart.style.position="fixed";
                lzdNavCart.style.left = (node.getBoundingClientRect().left + 100) + "px";
                lzdNavCart.style.top = (node.getBoundingClientRect().top + 5) + "px";

            }
            //********************************************************* เปิดแทปใหม่เมื่อคลิกที่สินค้า *********************************************************
            var x = document.querySelectorAll('[data-qa-locator="general-products"]');
            //alert(x.length)
            for (var i=0; i < x.length; i++) {
                var ele = x[i];
                var tagAs = ele.getElementsByTagName("A");
                for (var j=0; j < tagAs.length; j++) {
                    var tagA = tagAs[j];
                    tagA.setAttribute('target', '_blank');
                }
            }
            //             if(url.includes("products") || url.includes("/tag/") || url.includes("pageTypeId=") || url.includes("q=All-Products")){

            //             }
            if(url.includes("cart.lazada.co.th")){
                x = document.getElementsByClassName("cart-item-left");
                //alert(x.length)
                for (i=0; i < x.length; i++) {
                    ele = x[i];
                    tagAs = ele.getElementsByTagName("A");
                    for (j=0; j < tagAs.length; j++) {
                        tagA = tagAs[j];
                        tagA.setAttribute('target', '_blank');
                    }
                }
            }
            //********************************************************* เปิดแทบเดิมเมื่อคลิกที่เมนูหน้าร้านค้า *********************************************************
            x = document.getElementsByClassName("pi-layout-container");
            //alert(x.length)
            for (i=0; i < x.length; i++) {
                ele = x[i];
                tagAs = ele.getElementsByTagName("A");
                for (j=0; j < tagAs.length; j++) {
                    tagA = tagAs[j];
                    tagA.setAttribute('target', '_self');
                    //tagA.setAttribute('onclick', 'return false;');
                    tagA.onclick = function(e) {
                        event.preventDefault(); // Cancel the native event
                        e.stopPropagation();// Don't bubble/capture the event any further
                        //alert(e.currentTarget.href);
                        window.top.location.href = e.currentTarget.href;
                        //*****************
                        // e.preventDefault(); // Don't navigate!
                        // const anchor = e.target.closest("a"); // Find closest Anchor (or self)
                        // if (!anchor) return ; // Not found. Exit here.
                        // console.log(anchor.getAttribute('href')); // Log to test
                        //******************
                    }
                }
            }
        });

        //********************************************************* ควบคุมการเลื่อนหน้า และการเปิดหน้า ด้วยปุ่มลูกศร *********************************************************
        var url = window.location !== window.parent.location ? document.referrer : document.location.href;
        //if((!url.includes("/catalog/") && url.includes("?q=")) || url.includes("page=")){
        if(document.getElementsByClassName("anticon anticon-right").length > 0){
            document.addEventListener('keydown', logKey);//keypress
            function logKey(e) {
                console.log(e.key); //e.code
                switch (event.key) {
                    case "ArrowLeft":
                        // Left pressed
                        var x = document.getElementsByClassName("anticon anticon-left");
                        if(x.length > 0) x[0].click();
                        break;
                    case "ArrowRight":
                        // Right pressed
                        x = document.getElementsByClassName("anticon anticon-right");
                        if(x.length > 0) x[0].click();
                        break;
                    case "ArrowUp":
                        // Up pressed
                        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                        //window.scrollTo(0,document.body.scrollHeight);
                        //window.scrollTo(0,document.querySelector(".scrollingContainer").scrollHeight);
                        var scrollingElement = (document.scrollingElement || document.body);
                        //scrollingElement.scrollTop = scrollingElement.scrollHeight;
                        scrollingElement.scrollTop = scrollingElement.scrollTop - (height - 200);//window.screen.height;
                        break;
                    case "ArrowDown":
                        // Down pressed
                        width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                        //window.scrollTo(0,document.body.scrollHeight);
                        //window.scrollTo(0,document.querySelector(".scrollingContainer").scrollHeight);
                        scrollingElement = (document.scrollingElement || document.body);
                        //scrollingElement.scrollTop = scrollingElement.scrollHeight;
                        scrollingElement.scrollTop = scrollingElement.scrollTop + (height - 200);//window.screen.height;
                        break;
                }
            }
        }
    }
    catch(err) {
        console.log("Lazada Fix: " + err.message);
    }
})();
