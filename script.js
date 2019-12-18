/*

Drag’n’Drop algorithm
The basic Drag’n’Drop algorithm looks like this:

1-Catch mousedown on a draggable element.
2-Prepare the element for moving (maybe create a copy of it or whatever).
3-Then on mousemove move it by changing left/top and position:absolute.
4-On mouseup (button release) – perform all actions related to a finished Drag’n’Drop.
*/ 

let imgs = document.getElementsByTagName('img');
let imgCopy, targetImg, targetImgName, targetContainer, minHeight, minWidth, maxHeight, maxWidth;

for(let img of imgs){
    
img.addEventListener('mousedown', function(event) { // (1) start the process
    imgCopy = img.cloneNode();
    document.body.append(imgCopy);
    
    imgCopy.style.position = 'absolute';
    imgCopy.style.zIndex = 1000;   
  
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      imgCopy.style.left = pageX - imgCopy.offsetWidth / 2 + 'px';
      imgCopy.style.top = pageY - imgCopy.offsetHeight / 2 + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    document.addEventListener('mousemove', onMouseMove);

    imgCopy.addEventListener('mouseup', function(e) {
        debugger;
        targetImg = e.target
        targetImgName = 
        targetImg.src.slice( (targetImg.src.indexOf('img/')+4) , targetImg.src.lastIndexOf('.'))
        targetContainer = document.querySelector(`.drop .${targetImgName}`)
        console.log(targetImgName);
        console.log(`div`,targetContainer.offsetTop, targetContainer.offsetLeft)
        console.log(`img`, e.pageX, e.pageY);
        minWidth = targetContainer.offsetLeft;
        maxWidth = targetContainer.offsetLeft + targetContainer.offsetWidth ;
        minHeight = targetContainer.offsetTop;
        maxHeight = targetContainer.offsetTop + targetContainer.offsetHeight;
        
        if(minWidth<e.pageX  && e.pageX<maxWidth  && minHeight < e.pageY && e.pageY < maxHeight ){
            document.removeEventListener('mousemove', onMouseMove);
            imgCopy.style.left = minWidth + ((targetContainer.offsetWidth/2) - (imgCopy.offsetWidth /2)) +"px"; 
            imgCopy.style.top = minHeight + ((targetContainer.offsetHeight/2) - (imgCopy.offsetHeight /2)) +"px";
            targetContainer.style.backgroundColor = "green";
        }else{
            document.body.removeChild(imgCopy);
            document.removeEventListener('mousemove', onMouseMove);
        }
    });  // end mouseup
  
  });// end mousedown
}// end loop
