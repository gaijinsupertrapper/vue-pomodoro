Vue.component("timer-tabs", {
    template: `
        <div>
            <div class="set-timer" v-show="condition === '1'">
                <form class="timer-form" @submit.prevent="onSubmit">
                    <p><label for="minutes"> Minutes: </label>
                    <input name="minutes" id="minutes"  v-model="timeMins"> </p>
                    <p><label for="seconds" > Seconds: </label>
                    <input name="seconds" id="seconds" v-model="timeSecs"> </p>

                    <p><input type="submit" value="Submit"></p>
                </form>
            </div>
            <div class="timer-main" v-show="condition === '2'">
                <p> {{timeMins}}:{{timeSecs}} </p>
                <button @click="pauseTimer" v-show = "status === 'going' "> Pause </button>
                <button @click="continueTimer" v-show = "status === 'stop'"> Continue </button>
                <button @click="stopTimer" v-show = "status === 'stop'"> Stop </button>
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
        }
    },
    methods: {
        onSubmit(){
            this.condition = '2'
            this.time = this.timeMins*60 + this.timeSecs*1
            if (this.timeSecs == null) {
                this.timeSecs = "00"
            }
            this.defaultTime = this.time
            this.updateTime()
            console.log(this.time + " " + this.timeSecs + " " + this.timeMins)
        },
        updateTime(){
            const self = this
            this.interval = setInterval(function(){
                    self.time -= 1
                    self.timeMins = Math.floor(self.time/60)
                    self.timeSecs = self.time - self.timeMins*60
                    console.log(self.time)
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
            this.condition = "1"
        }
    }
})

let app = new Vue({
    el: "#app",
    data: {
        message: "Hey",
    },
    
})