function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
  classifier.classify(video, gotResult);
}

function modelLoaded() {
  console.log("Model is Loaded");
}

var previous_result = "";

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;

      var synth = window.speechSynthesis;
      speak_data = "object Detected is - " +  results[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML =  results[0].label;
      document.getElementById("result_object_accuracy").innerHTML =  results[0].confidence.toFix(2) ;
    }
  }
}






