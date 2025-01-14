//! =================================== Дата і час ===================================

//TODO: Реалізуйте таймер зворотного відліку до певної дати, яку задає користувач у форматі YYYY-MM-DD HH:mm:ss.
//? Користувач вводить кількість хвилин у текстове поле.
//? Після натискання кнопки "Старт":
//? На екрані відображається залишок часу у форматі хвилини:секунди.
//? Таймер оновлюється щосекунди.
//? Коли таймер доходить до 00:00, відображається повідомлення "Час вийшов!".
//? Додайте кнопку "Зупинити", щоб користувач міг зупинити таймер раніше.

//* Find elements
const minuteInput = document.querySelector('.num-input');
const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');

const hoursDiv = document.querySelector('.hours');
const minDiv = document.querySelector('.minutes');
const secDiv = document.querySelector('.seconds');


//* Add event listener
const timer = {
    interval: null,
    deadline: null,

    start(){
        this.deadline = new Date(Date.now() + Number(minuteInput.value) * 60000);
        
        this.interval = setInterval(() => {
            const diff = this.deadline - Date.now();
            
            if(diff <= 0){
                timer.stop();

                alert('Time is out🎉');
                return;
            }

            const timeComponents =  this.getTimeComponents(diff);

            hoursDiv.textContent = this.padFunc(Math.floor(timeComponents.hours));
            minDiv.textContent = this.padFunc(Math.floor(timeComponents.minutes));
            secDiv.textContent = this.padFunc(Math.floor(timeComponents.seconds));
            minuteInput.value = '';
        }, 1000)
    },

    getTimeComponents(diff){
        const hours = (diff / 1000 / 60 / 60);
        const minutes = (diff / 1000 / 60) % 60;
        const seconds = (diff / 1000 ) % 60;

        return{
            hours,
            minutes,
            seconds
        }
    },

    padFunc(num){
        return String(num).padStart(2, 0);
    },

    stop(){
        clearInterval(this.interval);
        hoursDiv.textContent = '00';
        minDiv.textContent = '00';
        secDiv.textContent = '00';
    }
}

startBtn.addEventListener('click', () => {
    if(minuteInput.value == ''){
        return;
    } else{
        timer.start();
    }
})


stopBtn.addEventListener('click', () => {
    timer.stop();
})