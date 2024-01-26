img ="";
Status ="";
objects =[];
function preload() {
img = loadImage('dog_cat.jpg');
}

function setup() {
canvas = createCanvas(380,300);
canvas.center();
video = createCapture(VIDEO);
video.size(380,300);
video.hide();
}

function start() {
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status:Detecting Objects";
}

function modelLoaded() {
console.log("Model Loaded");
Status=true;
objectDetector.detect(video,gotResult);
}

function gotResult(error,results) {
if (error) {
console.log(error);    
}
console.log(results);
objects=results;
}

function draw() {
image(video , 0 , 0 , 380 , 300);

if(Status !="") {
r = random(255);
g = random(255);
b = random(255);

objectDetector.detect(video , gotResult);

for(c=0; c<objects.length;c++){
document.getElementById("status").innerHTML="Status : Object Detected";
document.getElementById("no_of_objects").innerHTML="No. of objects detected are :"+ objects.length; 
fill(r , g, b);
percent = floor(objects[c].confidence * 100);
text(objects[c].label+" "+percent+"%",objects[c].x + 15,objects[c].y + 15);
noFill();
stroke(r , g , b);
rect(objects[c].x,objects[c].y,objects[c].width,objects[c].height);    
}    
}
}