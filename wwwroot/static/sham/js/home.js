$(function () {
  //navlist
  $('#navList').on('click', '.nav-btn', function(event) {
    if($(this).hasClass('btn-active')){
      $('#expandZone #closeBtn').click();
      return false;
    }
    var curIndex = $(this).index() - 1
      , mlValue = '-' + curIndex * 100 + '%';
    if( $('#expandZone').hasClass('active') ){
      $('#expandZone .download').animate({marginLeft: mlValue});
    }
    else{
      $('#expandZone .download').css({marginLeft: mlValue});
    }
    var device = $(this).data('device');
    $(this).addClass('btn-active').siblings().removeClass('btn-active');
    $(device).addClass('item-active').siblings().removeClass('item-active');
    $('#expandZone').animate({height: '50px'}).addClass('active');
    return false;
  });

  $('#expandZone #closeBtn').on('click', function() {
    $('#expandZone').animate({height: '0px'}, function () {
      $(this).removeClass('active');
      $('#navList .btn-active').removeClass('btn-active');
    });
    return false;
  });
  $('.jk_btn button').click(function (){
    $(this).addClass("active").siblings().removeClass();
    $(".tabpic>img").hide().eq($('.jk_btn button').index(this)).show(); 
  })
  $('.vdph ul li').hover(function (){
    $(this).addClass("actives").siblings().removeClass();
   },function (){
    $(this).addClass("actives").siblings().removeClass();
   
  })
  
});



/*图片切换*/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function Focus(fangxiang) {
  function byid(id) {
    return document.getElementById(id);
  }
  function bytag(tag, obj) {
    return (typeof obj == 'object' ? obj: byid(obj)).getElementsByTagName(tag);
  }
  var timer = null;
  var oFocus = byid('tFocus');
  var oPic = byid('tFocus-pic');
  var oPicLis = bytag('li', oPic);
  var oBtn = byid('tFocus-btn');
  var oBtnLis = bytag('li', oBtn);
  var iActive = 0;
  function inlize() {
    oPicLis[0].style.filter = 'alpha(opacity:100)';
    oPicLis[0].style.opacity = 100;
    oPicLis[0].style.zIndex = 5;
  };
  for (var i = 0; i < oPicLis.length; i++) {
    oBtnLis[i].sIndex = i;
    oBtnLis[i].onclick = function() {
      if (this.sIndex == iActive) return;
      iActive = this.sIndex;
      changePic();
    }
  };
  byid('tFocus-leftbtn').onclick = byid('prev').onclick = function() {
    iActive--;
    if (iActive == -1) {
      iActive = oPicLis.length - 1;
    }
    changePic();
  };
  byid('tFocus-rightbtn').onclick = byid('next').onclick = function() {
    iActive++;
    if (iActive == oPicLis.length) {
      iActive = 0;
    }
    changePic();
  };
  
  function changePic() {
    for (var i = 0; i < oPicLis.length; i++) {
      doMove(oPicLis[i], 'opacity', 0);
      oPicLis[i].style.zIndex = 0;
      oBtnLis[i].className = '';
    };
    doMove(oPicLis[iActive], 'opacity', 100);
    oPicLis[iActive].style.zIndex = 5;
    oBtnLis[iActive].className = 'active';
    if (iActive == 0) {
      doMove(bytag('ul', oBtn)[0], fangxiang, 0);
    } else if (iActive >= oPicLis.length - 3) {
      doMove(bytag('ul', oBtn)[0], fangxiang, -(oPicLis.length - 4) * (oBtnLis[0].offsetWidth + 4));
    } else {
      doMove(bytag('ul', oBtn)[0], fangxiang, -(iActive - 1) * (oBtnLis[0].offsetWidth + 5));
    }
  };
  function autoplay() {
    if (iActive >= oPicLis.length - 1) {
      iActive = 0;
    } else {
      iActive++;
    }
    changePic();
  };
  aTimer = setInterval(autoplay, 2000);
  inlize();
  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  };
  function doMove(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var iCur = 0;
      if (attr == 'opacity') {
        iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        iCur = parseInt(getStyle(obj, attr));
      }
      var iSpeed = (iTarget - iCur) / 6;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      if (iCur == iTarget) {
        clearInterval(obj.timer);
      } else {
        if (attr == 'opacity') {
          obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
          obj.style.opacity = (iCur + iSpeed) / 100;
        } else {
          obj.style[attr] = iCur + iSpeed + 'px';
        }
      }
    },
    30)
  };
  byid('tFocus').onmouseover = function() {
    clearInterval(aTimer);
  }
  byid('tFocus').onmouseout = function() {
    aTimer = setInterval(autoplay, 2000);
  }
}