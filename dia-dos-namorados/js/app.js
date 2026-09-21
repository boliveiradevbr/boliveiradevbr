const relationshipDate = new Date("2016-07-23");

function updateCounter()
{
    const now = new Date();

    let years =
        now.getFullYear() -
        relationshipDate.getFullYear();

    let months =
        now.getMonth() -
        relationshipDate.getMonth();

    let days =
        now.getDate() -
        relationshipDate.getDate();

    if(days < 0)
    {
        months--;

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days += previousMonth.getDate();
    }

    if(months < 0)
    {
        years--;
        months += 12;
    }

    document.getElementById('years')
        .textContent = years;

    document.getElementById('months')
        .textContent = months;

    document.getElementById('days')
        .textContent = days;
}

updateCounter();

setInterval(
    updateCounter,
    60000
);

function createHeart()
{
    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (Math.random()*20+10)+"px";

    document.body.appendChild(heart);

    let pos = 100;

    const interval = setInterval(() => {

        pos--;

        heart.style.top = pos + "vh";

        if(pos < -10)
        {
            clearInterval(interval);
            heart.remove();
        }

    },50);
}

setInterval(createHeart,800);

const music = document.getElementById('bgMusic');

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', async () => {

    try {
        await music.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    } catch(error) {
        console.log(error);
    }

});

pauseBtn.addEventListener('click', () => {
    music.pause();
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
});

document.querySelector('.btn').addEventListener('click', async () => {
    try {
        await music.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    } catch(e) {}

});

const loveText =
'Eu te amo mais do que qualquer algoritmo seria capaz de calcular. ❤️';

const loveTypingElement =
document.getElementById('loveTyping');

const loveLetterSection =
document.querySelector('.love-letter');

let typingStarted = false;

function startLoveTyping()
{
    let index = 0;

    function type()
    {
        if(index < loveText.length)
        {
            loveTypingElement.textContent += loveText.charAt(index);

            index++;

            setTimeout(type, 55);
        }
        else
        {
            document
                .querySelector('.typing-cursor')
                .style.display = 'none';
        }
    }

    type();
}

const loveObserver =
new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if(
            entry.isIntersecting &&
            !typingStarted
        ){
            typingStarted = true;

            startLoveTyping();

            loveObserver.unobserve(
                loveLetterSection
            );
        }

    });

},
{
    threshold:0.4
});

loveObserver.observe(
    loveLetterSection
);

const galleryImages =
    document.querySelectorAll('.gallery-grid img');

const lightbox =
    document.getElementById('lightbox');

const lightboxImage =
    document.getElementById('lightbox-image');

const closeLightbox =
    document.querySelector('.close-lightbox');

const prevPhoto =
    document.getElementById('prevPhoto');

const nextPhoto =
    document.getElementById('nextPhoto');

let currentIndex = 0;

function openImage(index)
{
    currentIndex = index;

    lightboxImage.src =
        galleryImages[currentIndex].src;

    lightbox.classList.add('active');

    document.body.style.overflow = 'hidden';
}

function closeModal()
{
    lightbox.classList.remove('active');

    document.body.style.overflow = 'auto';
}

function showNext()
{
    currentIndex++;

    if(currentIndex >= galleryImages.length)
    {
        currentIndex = 0;
    }

    lightboxImage.src =
        galleryImages[currentIndex].src;
}

function showPrev()
{
    currentIndex--;

    if(currentIndex < 0)
    {
        currentIndex =
            galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[currentIndex].src;
}

galleryImages.forEach((image, index) => {

    image.addEventListener('click', () => {
        openImage(index);
    });

});

nextPhoto.addEventListener(
    'click',
    showNext
);

prevPhoto.addEventListener(
    'click',
    showPrev
);

closeLightbox.addEventListener(
    'click',
    closeModal
);

lightbox.addEventListener(
    'click',
    (event) => {

        if(event.target === lightbox)
        {
            closeModal();
        }
    }
);

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
    'touchstart',
    e => {

        touchStartX =
            e.changedTouches[0].screenX;
    }
);

lightbox.addEventListener(
    'touchend',
    e => {

        touchEndX =
            e.changedTouches[0].screenX;

        if(touchEndX < touchStartX - 50)
        {
            showNext();
        }

        if(touchEndX > touchStartX + 50)
        {
            showPrev();
        }
    }
);

document.addEventListener(
    'keydown',
    (event) => {

        if(
            !lightbox.classList.contains('active')
        ){
            return;
        }

        switch(event.key)
        {
            case 'ArrowRight':
                showNext();
                break;

            case 'ArrowLeft':
                showPrev();
                break;

            case 'Escape':
                closeModal();
                break;
        }
    }
);