$(document).ready(function() {
  var onOffStatus;
  var quarters = ['G','R','Y','B'];
  var memArray = [];
  var randomVal;
  var clickArray = [];
  var countVal = 0;
  var strictVal = false;
  var time;
  var greenWav = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"; 
  var redWav = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  var yellowWav = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  var blueWav = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
  var wavArray = [greenWav,redWav,yellowWav,blueWav];
  var clickAudio;
  var myTime1, myTime2, myTime3;
  var clickPermission;
  
  
  $('.onOffSwitch').click(function() {
    if($('#on-off').attr('class') == "slide-off") {
      reset();
      $('#on-off').removeClass('slide-off');
      $('#on-off').addClass('slide-on');
      $('h2').addClass('blink');
      onOffStatus = $('#on-off').attr('class');
    }
    else {
      reset();
      $('#on-off').removeClass('slide-on');
      $('#on-off').addClass('slide-off');
      var audio = new Audio("http://soundbible.com/grab.php?id=664&type=wav");
      audio.play();
      $('h2').removeClass('blink');
      $('h2').text('--');
      onOffStatus = $('#on-off').attr('class');
    }
  });
  
  $('.strict').click(function() {
    if(onOffStatus == 'slide-on') {
      if(strictVal == false) {
        strictVal = true;
        $('.strict-led').addClass('strict-led-on');
      }
      else {
        strictVal = false;
        $('.strict-led').removeClass('strict-led-on');
      }
    }  
  });
  
  $('.start').click(function() {
    if(onOffStatus == 'slide-on') {
      $('h2').addClass('blink'); 
      $('h2').text('--');
      reset();
      randomVal = random();
      memArray.push(randomVal);
      myTime1 = setTimeout(startRunning, time);
    }
  });
  
  function reset() {
    memArray = [];
    clickArray = [];
    countVal = 1;
    strictVal = false;
    time = 2000;
    clickPermission = false;
    clearTimeout(myTime1);
    clearTimeout(myTime2);
    clearTimeout(myTime3);
  }
  
  function startRunning() {
    if(onOffStatus == 'slide-off') {
      $('h2').removeClass('blink'); 
      $('h2').text('--');
      reset();
    }
    else {
      $('h2').removeClass('blink');
      $('h2').text('0'+countVal);
      console.log(memArray);
      playMemArray();
      clickArray = [];
      clickPermission = true;
      myTime2 = setTimeout(checkfunction, time);
    }
  }
  
  //generate random between 0 to 3
  function random() {
    var x = Math.floor(Math.random() * (3 + 1));
    return x;
  }
  
  $(".quarter").click(function() {
    if(clickPermission) {
      var id = $(this).attr('id');
      id = parseInt(id);
      clickArray.push(id);
      clickAudio = new Audio(wavArray[id]);
      $('#'+id).addClass(quarters[id]);
      clickAudio.playbackRate = 0.5;
      clickAudio.play();
      setTimeout(function() {
        $('#'+id).removeClass(quarters[id]);
      }, 1000);
    }
  });
  
  
  function compArr(arr1,arr2) {
    if(arr1.length == arr2.length) {
      var j = 0;
      while(j < arr1.length) {
        if(arr1[j] == arr2[j]) {
          j++;
        }
        else {
          return false;
        }
      }
      return true;
    }
  }
 
  function checkfunction() {
    clickPermission = false;
    if(onOffStatus == "slide-on") {
      if(compArr(clickArray,memArray) == true) {
        time += 2000;
        countVal += 1;
        randomVal = random();
        memArray.push(randomVal);    
      }
      else {
        if(strictVal == true) {
          reset();
          randomVal = random();
          memArray.push(randomVal);
        }
        $('h2').text('!!');
        $('h2').addClass('blink');
        //playDanger();
      }
      setTimeout(startRunning, 500);
    }
  }
  
  function playMemArray() {
    
    var timeVal = 1000;
    $.each(memArray, function(i,val) {
      myTime3 = setTimeout(function() {
        
        var audio = new Audio(wavArray[val]);
        $('#'+val).addClass(quarters[val]);
        audio.playbackRate = 0.7;
        audio.play();
        setTimeout(function() {
          $('#'+val).removeClass(quarters[val]);
        },800);
        
      }, i*timeVal);      
    });
  }
  
  
});