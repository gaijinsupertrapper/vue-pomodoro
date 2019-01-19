let app = new Vue({
    el: "#timer",
    
    data: {
        timeMins: 2,
        timeSecs: 100,
        time:100,
        defaultTime: 100,
        interval: null,
    },
    methods:{
        totalTime(){
            this.time = this.timeMins * 60 + this.timeSecs;
        },
        updateTime(){
            const self = this
            this.interval = setInterval(function(){
                    self.time -= 1
                    self.timeMins = Math.floor(self.time/60)
                    self.timeSecs = self.time - self.timeMins*60
            }, 1000)
            
        },
        stopTimer(){
            clearInterval(this.interval)
            this.time=100;
            this.timeMins = Math.floor(this.time/60)
            this.timeSecs = this.time - this.timeMins*60
        }
    },
    beforeMount(){
            this.timeMins = Math.floor(this.time/60)
            this.timeSecs = this.time - this.timeMins*60
        }
    

})

