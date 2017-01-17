// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
    var id = /[/?=]([-\w]{11})/.exec($(".video-url").html());
    ytPlayer = new YT.Player(
        'youtube', // 埋め込む場所の指定
        {
            width: 640, // プレーヤーの幅
            height: 390, // プレーヤーの高さ
            videoId: id[1], // YouTubeのID
        }
    );
}

$(function() {
    $("#comment_text").click(function(){
      var carrentTime = ytPlayer.getCurrentTime();
      $(this).attr('defaultValue',carrentTime);
    });

    // 再生
    $('#play').click(function() {
        ytPlayer.playVideo();
    });
    // 一時停止
    $('#pause').click(function() {
        ytPlayer.pauseVideo();
    });
    // 1分前へ
    $('#prev').click(function() {
        // 現在の再生時間取得
        var currentTime = ytPlayer.getCurrentTime();
        // シークバーの移動
        ytPlayer.seekTo(currentTime - 10);
    });
    // 1分先へ
    $('#next').click(function() {
        // 現在の再生時間取得
        var currentTime = ytPlayer.getCurrentTime();
        // シークバーの移動
        ytPlayer.seekTo(currentTime + 10);
    });
    // 音量アップ(+10)
    $('#volup').click(function() {
        // 現在の音量取得
        var currentVol = ytPlayer.getVolume();
        ytPlayer.setVolume(currentVol + 10);
    });
    // 音量ダウン(-10)
    $('#voldown').click(function() {
        // 現在の音量取得
        var currentVol = ytPlayer.getVolume();
        ytPlayer.setVolume(currentVol - 10);
    });
    // ミュート
    $('#mute').click(function() {
        // ミュートされているかどうか
        if(ytPlayer.isMuted()) {
            // ミュートの解除
            ytPlayer.unMute();
        } else {
            // ミュート
            ytPlayer.mute();
        }
    });


    $("#new_comment").submit(function(event){
    event.preventDefault();
    var postUrl = $("#new_comment").attr("action");
    var text = $("#comment_text").val();
    var carrentTime = $("#comment_text").attr('defaultValue');
    var m = Math.floor(carrentTime/60);
    var s = Math.floor(carrentTime%60);
    var data_ = m+'分'+s+'秒'+':'+text;
    var time = m+'分'+s+'秒'
    console.log(text);
    $.ajax({
      type: "post",
      url: postUrl,
      data: {
        comment:{
          text:text,
          time:time,
        }
      },
      dataType: "json",
      cache: true,
    })
    .done(function(data){
      console.log(data);
      $("#comment_text").val("");
      $(".time").append("<p>"+ time +":<span>"+ text +"</span></p>");
    })
    .fail(function(jqXHR){
      alert("error")
      console.log(jqXHR);
    });
  });
});
