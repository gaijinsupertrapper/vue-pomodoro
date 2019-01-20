Vue.component("timer-tabs", {
    template: `
        <div>
            <div class="set-timer" v-show="condition === '1'">
                <ul v-if="error!=null">
                    <li>
                        {{error}}
                    </li>
                </ul>
                <form class="timer-form" @submit.prevent="onSubmit">
                    <p><input type="text" style="direction: rtl; text-align: center" name="minutes" id="minutes"  v-model="timeMins" placeholder="00"   pattern="\d*" >:<input type="text" style="direction: rtl; text-align: center" name="seconds" id="seconds" v-model="timeSecs" placeholder="00"  pattern="\d*" > 
                    </p>

                    <p><button > <i class="fas fa-play"></i> </button></p>
                </form>
            </div>
            <div class="timer-main" v-show="condition === '2'">
                <p> {{timeMins}}:{{timeSecs}} </p>
                <button @click="pauseTimer" v-show = "status === 'going' "> <i class="fas fa-pause"></i> </button>
                <button @click="continueTimer" v-show = "status === 'stop'"> <i class="fas fa-play"></i> </button>
                <button @click="stopTimer" v-show = "status === 'stop'"> <i class="fas fa-stop"></i> </button>
            </div>
        </div>
    `,
    data(){
        return{
            condition: '1',
            status: 'going',
            timeMins: null,
            timeSecs: null,
            time: null,
            defaultTime: null,
            interval: null,
            error: null,
        }
    },
    methods: {
        onSubmit(){
            if ((this.timeMins == null && this.timeSecs == null) ||
             (this.timeMins<1 && (this.timeSecs<1 || this.timeSecs == null)  )) {
                this.error = "Add time"
            }else{
                this.condition = '2'
                this.time = this.timeMins*60 + this.timeSecs*1
                if ((this.timeSecs < 10) && (this.timeSecs != null) && (this.timeSecs != "00")){
                    this.timeSecs = "0" + this.timeSecs
                }
                if (this.timeSecs == null) {
                    this.timeSecs = "00"
                }
                if (this.timeMins == null){
                    this.timeMins = "0"
                }
                this.defaultTime = this.time
                this.updateTime()
                console.log(this.time + " " + this.timeSecs + " " + this.timeMins)
            }
        },
        updateTime(){
            const self = this
            this.interval = setInterval(function(){
                    self.time -= 1
                    self.timeMins = Math.floor(self.time/60)
                    self.timeSecs = self.time - self.timeMins*60
                    if (self.timeSecs<10){
                        self.timeSecs = "0" + self.timeSecs
                    }
                    console.log(self.time)
                    if (self.time == 0){
                        alert("time's up!") 
                        self.stopTimer()
                    }
            }, 1000)
            
        },
        pauseTimer(){
            clearInterval(this.interval)
            this.status = "stop"
        },
        continueTimer(){
            this.updateTime()
            this.status = "going"
        },
        stopTimer(){
            clearInterval(this.interval)
            this.condition = "1"
            this.status = "going"
            this.timeMins = Math.floor(this.defaultTime/60)
            this.timeSecs = this.defaultTime - this.timeMins*60
            if (this.timeSecs <10){
                this.timeSecs = "0" + this.timeSecs
            }
        }
    }
})

let app = new Vue({
    el: "#app",
    data: {
        message: "Hey",
    },
    
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }