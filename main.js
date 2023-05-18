var thestatus = false;
var objectName = "";
var object = "";

function preload() { }

function setup() {
   canvas = createCanvas(500, 400);
   canvas.position(425, 420);

   webcam = createCapture(VIDEO);
   webcam.hide();
}

function start() {
   oD = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Detecting Objects...";
   objectName = document.getElementById("input").value
   if (objectName == "") {
      document.getElementById("obj").innerHTML = "waiting to search for objects...";
   } else {
      document.getElementById("obj").innerHTML = "searching for " + objectName + "...";
   }

}

function modelLoaded() {
   thestatus = true;
   console.log("model loaded!  ", thestatus);
}

function gotResults(error, result) {
   if (error) {
      console.error(error);
   } else if (result) {
      object = result;
   }
}

function draw() {
   image(webcam, 0, 0)
   textSize(30);
   strokeWeight(3);

   if (thestatus == true) {
      oD.detect(webcam, gotResults);

      for (i = 0; i < object.length; i++) {
         document.getElementById("status").innerHTML = "Objects Detected!";

         fill("black");
         percent = (object[i].confidence * 100).toFixed(1);
         text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
         noFill();

         stroke("#00ff40");
         rect(object[i].x, object[i].y, object[i].width, object[i].height);


         if (object[i].label == objectName) {
            document.getElementById("obj").innerHTML = objectName + " Found!";

            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(objectName + " Found");
            synth.speak(utterThis);

         } else {
            document.getElementById("obj").innerHTML = "Searching for " + objectName + "...";
         }
      }
   }
}