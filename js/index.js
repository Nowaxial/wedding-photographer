const cameraButton = document.querySelector('.button-div-camera');
const videoElem  = document.querySelector('#camera');
const takePictureButton = document.querySelector('.button-div');
const canvas = document.querySelector('#picture');
const galleryElem = document.querySelector('#gallery')
const streamElem = document.querySelector('.stream-window');
const pictureElem = document.querySelector('.picture-window')
const newPictureElem = document.querySelector('.button-div-pic');
const ctx = canvas.getContext('2d');
const posterElem = document.querySelector('.poster');


let stream;
let images;

let imagesFromStorage = JSON.parse(localStorage.getItem('weddingApp'))
if(imagesFromStorage){
    images = imagesFromStorage  // letar efter existerande bilder och lägger ihop nya + gamla
} else {
    images = []; // om inga bilder finns lägger vi till våra nya
}


/* stream.html // Autostreamar kameran när behörighet ges*/
async function cameraAutoStart(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // browser support
            stream = await navigator.mediaDevices.getUserMedia({video:true});
            videoElem.srcObject = stream;
            videoElem.play();
    }
}
cameraAutoStart();


/* capture.html */
takePictureButton.addEventListener ('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    takePictureButton.style.display='none'
    streamElem.style.display='none' 
    pictureElem.style.display='block' 
    images.push({
        id: images.lenght,
        image: imageData
    });
    localStorage.setItem('weddingApp', JSON.stringify(images));
});

newPictureElem.addEventListener ('click', () => {
    streamElem.style.display='block' // göm videoDiv när vi tar bilden
    pictureElem.style.display='none' 
    takePictureButton.style.display = 'block'// visa pictureDiv när vi tar bilden
});

posterElem.addEventListener ('click', () => {
    
    pictureElem.style.display='none' 
    
});

function createImage(image){
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    galleryElem.append(imageElem);

}

function getImages(){
    for (let image of images){
        createImage(image);
    }

}

getImages();
