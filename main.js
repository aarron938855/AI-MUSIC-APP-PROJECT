song1 ="";
song2 ="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0
function preload(){
    song1=("alone.mp3");
    song2=("faded.mp3");
}
function setup(){
    canvas=createCanvas(700,900);
    canvas.center();
     
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(VIDEO,modelLoaded);
    poseNet.on("poses",gotPoses);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function draw(){
    canvas=createCanvas( 600,500);
    canvas.center();
    song_status=song1.isPlaying();
    song_status2=song2.isPlaying();
    fill("red");
    stroke("red");
    image(video,0,0,700,900);
    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,40);
        song2.stop();
        if(song_status==false){
            song1.play();
            document.getElementById("status").innerHTML="ALONE pt-II"
        }
    }

    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,40);
        song1.stop();
        if(song_status2==false){
            song2.play();
            document.getElementById("status").innerHTML="FADED"
        }
    }
    
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);

    }
}