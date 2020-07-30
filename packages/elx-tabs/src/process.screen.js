const getBrowser = function() {
  const userAgent = navigator.userAgent;
  const isOpera = userAgent.indexOf('Opera') > -1;
  if (isOpera) {
    return 'Opera';
  };
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE';
  };
};
const handleFullScreen = function(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullscreen();
  }
};
const handleExitFullscreen = function() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
const originStyle = {
  fullScreen: {},
  maximize: {}
};
const setOriginStyle = function(dom, iframe, type) {
  originStyle[type] = {
    position: dom.style.position,
    top: dom.style.top,
    left: dom.style.left,
    marginTop: dom.style.marginTop,
    marginLeft: dom.style.marginLeft,
    zIndex: dom.style.zIndex,
    width: dom.style.width,
    height: dom.style.height
  };
};
export const fullScreen = function(dom, iframe) {
  setOriginStyle(dom, iframe, 'fullScreen');
  if (getBrowser() === 'Chrome') {
    handleFullScreen(iframe);
    return;
  }
};
export const maximize = function(dom, iframe) {
  setOriginStyle(dom, iframe, 'maximize');
  dom.style.position = 'fixed';
  dom.style.zIndex = '1000';
  dom.style.top = '0px';
  dom.style.left = '0px';
  dom.style.marginTop = '0px';
  dom.style.marginLeft = '0px';
  dom.style.width = '100%';
  dom.style.height = '100%';
};
export const restore = function(dom, iframe, type) {
  if (getBrowser() === 'Chrome') {
    handleExitFullscreen();
  }
  const oldStyle = originStyle[type];
  dom.style.position = oldStyle.position;
  dom.style.zIndex = oldStyle.zIndex;
  dom.style.top = oldStyle.top;
  dom.style.left = oldStyle.left;
  dom.style.marginTop = oldStyle.marginTop;
  dom.style.marginLeft = oldStyle.marginLeft;
  dom.style.width = oldStyle.width;
  dom.style.height = oldStyle.height;
};
