const cameraButton = document.querySelector('.button-div-camera');
const videoElem  = document.querySelector('#camera');
const takePictureButton = document.querySelector('.button-div');
const canvas = document.querySelector('#picture');
const galleryElem = document.querySelector('#gallery')
const ctx = canvas.getContext('2d');
let stream;
const images = [];

/* stream.html // Autostart kamera när behörighet ges*/
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
    console.log(imageData);
    images.push({
        id: images.lenght,
        image: imageData
    });
    localStorage.setItem('weddingApp', JSON.stringify(images));
});


function createImage(image){
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    galleryElem.append(imageElem);

}

function getImages(){
    const images = JSON.parse(localStorage.getItem('weddingApp'));
    for (let image of images){
        createImage(image);
    }

}

getImages();
