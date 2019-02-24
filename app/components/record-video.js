import Component from "@ember/component";
import videojs from "video.js";
import adapter from "webrtc-adapter";
import RecordRTC from "recordrtc";
//import { Record } from "videojs-record";

export default Component.extend({
  didInsertElement() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then(async stream => {
        let recorder = RecordRTC(stream, {
          type: "video",
          disableLogs: false
        });
        this.set("recorder", recorder);
      });

    let player = document.getElementById("recording-player");
    this.set("player", player);
  },
  actions: {
    record() {
      this.recorder.startRecording(function() {
        let blob = this.recorder.toURL();
        this.player.src = blob;
      });
    },
    stop() {
      let recorder = this.recorder;
      recorder.stopRecording(() => {
        let blob = recorder.toURL();
        this.player.src = blob;
      });
    }
  }
});
