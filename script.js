class BreathingGuide {
    constructor() {
        this.circle = document.querySelector('.circle');
        this.breathText = document.getElementById('breathText');
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.patternSelect = document.getElementById('pattern');
        this.progressBar = document.getElementById('progressBar');
        this.sessionTimeDisplay = document.getElementById('sessionTime');

        this.isRunning = false;
        this.sessionTime = 0;
        this.currentInterval = null;
        this.sessionInterval = null;

        this.patterns = {
            '478': { inhale: 4, hold: 7, exhale: 8 },
            'box': { inhale: 4, hold: 4, exhale: 4, holdOut: 4 },
            'diaphragm': { inhale: 6, hold: 2, exhale: 6 }
        };

        this.initEvents();
    }

    initEvents() {
        this.startBtn.addEventListener('click', () => this.toggleExercise());
    }

    toggleExercise() {
        this.isRunning ? this.stop() : this.start();
    }

    start() {
        this.isRunning = true;
        this.startBtn.textContent = 'Stop';
        this.sessionTime = 0;
        this.updateSessionTime();

        this.runSession();
        this.sessionInterval = setInterval(() => this.updateSessionTime(), 1000);
    }

    stop() {
        this.isRunning = false;
        this.startBtn.textContent = 'Start';

        clearInterval(this.currentInterval);
        clearInterval(this.sessionInterval);

        this.circle.className = 'circle';
        this.breathText.textContent = 'Paused';
        this.timerDisplay.textContent = '0';
    }

    async runSession() {
        const pattern = this.patterns[this.patternSelect.value];

        while (this.isRunning) {
            await this.breathe('Inhale', pattern.inhale, 'inhale');
            if (!this.isRunning) break;

            await this.breathe('Hold', pattern.hold, 'hold');
            if (!this.isRunning) break;

            await this.breathe('Exhale', pattern.exhale, 'exhale');

            if (pattern.holdOut && this.isRunning) {
                await this.breathe('Hold', pattern.holdOut, 'hold');
            }
        }
    }

    breathe(text, duration, animation) {
        return new Promise(resolve => {
            this.breathText.textContent = text;
            this.circle.className = `circle ${animation}`;

            let timeLeft = duration;
            this.timerDisplay.textContent = timeLeft;

            this.currentInterval = setInterval(() => {
                timeLeft--;
                this.timerDisplay.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(this.currentInterval);
                    resolve();
                }
            }, 1000);
        });
    }

    updateSessionTime() {
        this.sessionTime++;
        const minutes = Math.floor(this.sessionTime / 60);
        const seconds = this.sessionTime % 60;

        this.sessionTimeDisplay.textContent =
            `Session: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        // progress: 5-minute session (300s)
        const progress = Math.min((this.sessionTime / 300) * 100, 100);
        this.progressBar.style.setProperty('--progress', `${progress}%`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BreathingGuide();
});


const instructionsP = document.getElementById('instructions');
const linksA = document.getElementById('links');
const patternSelect = document.getElementById('pattern');

const breathingInstructions = {
    "478": {
        text: `
        1) Position your tongue: your tongue should 
        stay toward the roof of the mouth, with the
         tip of your tongue touching the back of
          your two front teeth.
        2) Breathe out deeply. Let your breath out
         through your lips, making a whooshing
         sound.Now you’re ready  to begin 
        3) Inhale and start counting not too quick 
        and not too slow  to four 
        4) hold your breath while counting to seven
         in your mind.
        5) Breathe out slowly with counting to  eight 
        with your lips slightly pursed around your tongue.
        6) Repeat the process. Do steps three through 
        five again for three more cycles
        `,
        link: "https://health.clevelandclinic.org/4-7-8-breathing",
        linkText: "Learn more about 4-7-8 Breathing"
    },
    "box": {
        text: `
        1) Sit upright in a comfortable chair with
         your feet flat on the floor.
        2) Inhale slowly through your nose to a 
        mental count of four,
        3) Hold your breath for a count of four.
        4) Exhale slowly through your mouth for a
         count of four.
        5) Hold your breath again for a count of four.
        6) Repeat the process for several minutes.

      `,
        link: "https://health.clevelandclinic.org/box-breathing-benefits",
        linkText: "Learn more about Box Breathing"
    },
    "diaphragm": {
        text: `
        1) Sit comfortably or lie flat on the floor.
        2) Place one hand on your upper chest and 
        the other just below your rib cage. This
         will allow you to feel your diaphragm 
        move as you breathe.
        3) Breathe in slowly through your nose
            so that your stomach moves outward against
            your hand. The hand on your chest should
            remain as still as possible.
        4) Tighten your stomach muscles, letting
            them fall inward as you exhale through
            pursed lips. The hand on your upper chest
            should remain as still as possible.
        5) Repeat for several minutes.
    
      `,
        link: "https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing",
        linkText: "About Diaphragmatic Breathing"
    }
};

// Function to update instructions and link
function updateInstructions() {
    const selected = patternSelect.value;
    const info = breathingInstructions[selected];
    instructionsP.innerText = info.text;
    linksA.href = info.link;
    linksA.innerText = info.linkText;
}

// Event listener for selection change
patternSelect.addEventListener('change', updateInstructions);

// Set default on page load
window.addEventListener('DOMContentLoaded', updateInstructions);


const happyBtn = document.getElementById("hpy");
const neutralBtn = document.getElementById("ntr");
const sadBtn = document.getElementById("sad");
const outputSpace = document.getElementById("mood");

  happyBtn.addEventListener("click", function () {
    outputSpace.innerHTML = "<h2 style=\"color: black;\"><strong>﴾ اشكرِ الله فقد قال عزّ وجل: ﴿  لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُم </strong></h2>";
  });
  neutralBtn.addEventListener("click", function () {
     outputSpace.innerHTML = "<h2 style=\"color: black;\"><strong>﴾ داومو على ذكر الله في كل الحالات: ﴿  أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ </strong></h2>";
  });
  sadBtn.addEventListener("click", function () {
    outputSpace.innerHTML = "<h2 style=\"color: black;\"><strong>     'فقط كرر  'اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً </strong></h2>";
  });


  const clrBtn = document.getElementById("calm");
const conBtn = document.getElementById("idontknow");
const chaBtn = document.getElementById("overthinking");
const outputSpace2 = document.getElementById("mood2");

  clrBtn.addEventListener("click", function () {
    outputSpace2.innerHTML = "<h2 style=\"color: black;\"><strong> “Tranquility of the mind is the art of living; <br> cherish it, for it makes every moment brighter</strong></h2>";
  });
  conBtn.addEventListener("click", function () {
     outputSpace2.innerHTML = "<h2 style=\"color: black;\"><strong> When you feel lost, remember that Allah is the best of planners.</strong></h2>";
  });
  chaBtn.addEventListener("click", function () {
    outputSpace2.innerHTML = "<h2 style=\"color: black;\"><strong> Do not be anxious about tomorrow; Allah is sufficient for today.</strong></h2>";
  });







