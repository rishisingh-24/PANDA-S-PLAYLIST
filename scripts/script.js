new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Khoobsurat",
          artist: "Vishal",
          cover: "img/8.jpeg",
          source: "mp3/8.mp3",
          url: "https://youtu.be/1-nnEM8chwo?si=AucTuv2aREOWfbKj",
          favorited: true
        },
        // {
        //   name: "Intentions",
        //   artist: "Justin Bieber",
        //   cover: "img/1.jpeg",
        //   source: "mp3/2.mp3",
        //   url: "https://youtu.be/3AyMjyHu1bA?si=mrHkxK2NoRngC5UV",
        //   favorited: false
        // },
        {
          name: "Sun Sathiyaan ",
          artist: "Sachin",
          cover: "img/2.jpeg",
          source: "mp3/1.mp3",
          url: "https://youtu.be/TGpG56pg3UU?si=sJrxf672pTwspUGo",
          favorited: true
        },

        {
          name: "Sajni Re",
          artist: "Arijit",
          cover: "img/3.jpeg",
          source: "mp3/3.mp3",
          url: "https://youtu.be/k3g_WjLCsXM?si=wWNlAryVI_MUmKIC",
          favorited: false
        },

        {
          name: "Heeriye",
          artist: "Arijit",
          cover: "img/4.jpeg",
          source: "mp3/4.mp3",
          url: "https://youtu.be/RLzC55ai0eo?si=KFC5vw4zQ6UjtsXp",
          favorited: false
        },
        {
          name: "Naadaniyan",
          artist: "Akshath",
          cover: "img/5.jpg",
          source: "mp3/5.mp3",
          url: "https://youtu.be/gPpQNzQP6gE?si=ArnGk6lVtiqOPlT3",
          favorited: true
        },
        {
          name: "Perfect",
          artist: "Ed Sheeren",
          cover: "img/6.jpeg",
          source: "mp3/6.mp3",
          url: "https://youtu.be/2Vv-BfVoq4g?si=Q898ry_JKeO9IJr7",
          favorited: false
        },
        {
          name: "Shayad",
          artist: "Arijit",
          cover: "img/7.jpg",
          source: "mp3/7.mp3",
          url: "https://youtu.be/MJyKN-8UncM?si=IS1c7ZOzwVcKUWIH",
          favorited: false
        },
        {
          name: "Peaches",
          artist: "Justin Bieber",
          cover: "img/1.jpeg",
          source: "mp3/9.mp3",
          url: "https://youtu.be/tQ0yjYUFKAE?si=a0oqJnC3hHa91o0e",
          favorited: false
        },
        {
          name: "Intentions",
          artist: "Justin Bieber",
          cover: "img/9.jpg",
          source: "mp3/2.mp3",
          url: "https://youtu.be/3AyMjyHu1bA?si=mrHkxK2NoRngC5UV",
          favorited: false
        },
        // {
        //   name: "Khoobsurat",
        //   artist: "Vishal",
        //   cover: "img/8.jpeg",
        //   source: "mp3/8.mp3",
        //   url: "https://youtu.be/1-nnEM8chwo?si=AucTuv2aREOWfbKj",
        //   favorited: false
        // },

      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
