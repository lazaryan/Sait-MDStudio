"use strict";var buttonPopup=document.querySelector("#orderPopupButton"),popupOrder=document.querySelector("#popupOrder"),fillPopupOrder=document.querySelector("#closePopupBackground"),closePopupOrder=document.querySelector("#closePopup"),scrolled=void 0,timer=void 0;function showPopup(){var e=document.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body&&document.body.scrollTop;scrolled=e,scrollTop(e-popupOrder.clientHeight/2),popupOrder.setAttribute("style","top: "+(e-popupOrder.clientHeight/2)+"px;"),popupOrder.classList.remove("hide_left"),fillPopupOrder.classList.remove("_none")}function hidePopup(){popupOrder.classList.add("hide_left"),fillPopupOrder.classList.add("_none")}function scrollTop(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;scrolled>e?(window.scrollTo(e,scrolled),scrolled-=30,timer=setTimeout(function(){return scrollTop(e)},20)):clearTimeout(timer)}buttonPopup.addEventListener("click",function(){return showPopup()}),fillPopupOrder.addEventListener("click",function(){return hidePopup()}),closePopupOrder.addEventListener("click",function(){return hidePopup()});