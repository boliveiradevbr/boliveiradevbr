
/*
 * ============================================================
 * CONFIGURATION
 * ============================================================
 *
 * IMPORTANT:
 * Replace this date with the relationship start date used
 * by your existing page.
 *
 * Example:
 * const RELATIONSHIP_START = new Date('2018-06-12T00:00:00');
 */

const RELATIONSHIP_START = new Date("2016-07-23");


/*
 * ============================================================
 * HERO TYPING EFFECT
 * ============================================================
 */

const typingTarget =
    'Você mudou meu código-fonte ❤️';

const typingElement =
    document.getElementById('typingText');

let typingIndex = 0;

function typeHeroText() {

    if (typingIndex <= typingTarget.length) {

        typingElement.textContent =
            typingTarget.slice(0, typingIndex);

        typingIndex++;

        setTimeout(
            typeHeroText,
            65
        );
    }
}

setTimeout(
    typeHeroText,
    500
);


/*
 * ============================================================
 * RELATIONSHIP COUNTER
 * ============================================================
 */

function calculateRelationship() {

    const now = new Date();

    if (
        Number.isNaN(
            RELATIONSHIP_START.getTime()
        )
    ) {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0
        };
    }

    let years =
        now.getFullYear() -
        RELATIONSHIP_START.getFullYear();

    let months =
        now.getMonth() -
        RELATIONSHIP_START.getMonth();

    let days =
        now.getDate() -
        RELATIONSHIP_START.getDate();

    if (days < 0) {

        months--;

        const previousMonth =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

        days +=
            previousMonth.getDate();
    }

    if (months < 0) {

        years--;
        months += 12;
    }

    const totalSeconds =
        Math.max(
            0,
            Math.floor(
                (
                    now.getTime() -
                    RELATIONSHIP_START.getTime()
                ) / 1000
            )
        );

    const seconds =
        totalSeconds % 60;

    const minutes =
        Math.floor(totalSeconds / 60) % 60;

    const hours =
        Math.floor(totalSeconds / 3600) % 24;

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalSeconds
    };
}


function updateCounter() {

    const data =
        calculateRelationship();

    document.getElementById('years')
        .textContent = data.years;

    document.getElementById('months')
        .textContent = data.months;

    document.getElementById('days')
        .textContent = data.days;

    document.getElementById('seconds')
        .textContent =
        String(data.seconds)
            .padStart(2, '0');

    document.getElementById('terminalUptime')
        .textContent =
        `${data.years} anos, ` +
        `${data.months} meses, ` +
        `${data.days} dias, ` +
        `${String(data.hours).padStart(2, '0')}:` +
        `${String(data.minutes).padStart(2, '0')}:` +
        `${String(data.seconds).padStart(2, '0')}`;
}

updateCounter();

setInterval(
    updateCounter,
    1000
);


/*
 * ============================================================
 * GALLERY
 * ============================================================
 */

const gallery =
    document.getElementById('gallery');

const photos =
    Array.from(
        { length: 10 },
        (_, index) =>
            `images/photo${index + 1}.jpg`
    );

const rotations = [
    '-1deg',
    '1.2deg',
    '-.7deg',
    '1deg',
    '-1.5deg',
    '.8deg',
    '-.5deg',
    '1.3deg',
    '-1deg',
    '.6deg'
];

photos.forEach(
    (photo, index) => {

        const card =
            document.createElement('button');

        card.type = 'button';

        card.className =
            'photo-card relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 aspect-[4/5] group transition-all duration-500 cursor-pointer';

        card.style.setProperty(
            '--rotation',
            rotations[index]
        );

        /*
         * Slightly asymmetrical masonry feeling.
         */

        if (index === 0 || index === 5) {
            card.classList.add(
                'md:row-span-2',
                'aspect-auto'
            );
        }

        card.innerHTML = `
                    <img
                        src="${photo}"
                        alt="Momento ${index + 1}"
                        loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    >

                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"
                    ></div>

                    <div
                        class="absolute bottom-3 left-3 right-3 flex items-center justify-between"
                    >
                        <span
                            class="font-mono text-[10px] text-white/60"
                        >
                            memory_${String(index + 1).padStart(2, '0')}
                        </span>

                        <span
                            class="text-rose-400 opacity-0 group-hover:opacity-100 transition"
                        >
                            ❤️
                        </span>
                    </div>
                `;

        card.addEventListener(
            'click',
            () => openLightbox(index)
        );

        gallery.appendChild(card);
    }
);


/*
 * ============================================================
 * LIGHTBOX
 * ============================================================
 */

const lightbox =
    document.getElementById('lightbox');

const lightboxImage =
    document.getElementById('lightboxImage');

let currentPhoto = 0;

function renderLightbox() {

    lightboxImage.src =
        photos[currentPhoto];

    lightboxImage.alt =
        `Momento ${currentPhoto + 1}`;
}

function openLightbox(index) {

    currentPhoto = index;

    renderLightbox();

    lightbox.classList.add('active');

    document.body.classList.add('overflow-hidden');
}

function closeLightbox() {

    lightbox.classList.remove('active');

    document.body.classList.remove('overflow-hidden');
}

function nextPhoto() {

    currentPhoto =
        (currentPhoto + 1) %
        photos.length;

    renderLightbox();
}

function previousPhoto() {

    currentPhoto =
        (currentPhoto - 1 + photos.length) %
        photos.length;

    renderLightbox();
}

document
    .getElementById('lightboxClose')
    .addEventListener(
        'click',
        closeLightbox
    );

document
    .getElementById('lightboxNext')
    .addEventListener(
        'click',
        nextPhoto
    );

document
    .getElementById('lightboxPrev')
    .addEventListener(
        'click',
        previousPhoto
    );

lightbox.addEventListener(
    'click',
    event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    }
);

document.addEventListener(
    'keydown',
    event => {

        if (!lightbox.classList.contains('active')) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'ArrowRight') {
            nextPhoto();
        }

        if (event.key === 'ArrowLeft') {
            previousPhoto();
        }
    }
);


/*
 * ============================================================
 * MUSIC PLAYER
 * ============================================================
 */

const audio =
    document.getElementById('audio');

const musicToggle =
    document.getElementById('musicToggle');

const musicPlayer =
    document.getElementById('musicPlayer');

const heroCta = 
    document.getElementById('heroCta');

musicToggle.addEventListener(
    'click',
    playPauseSong
);

audio.addEventListener(
    'play',
    updateMusicUI
);

audio.addEventListener(
    'pause',
    updateMusicUI
);

audio.addEventListener(
    'ended',
    updateMusicUI
);

heroCta.addEventListener(
    'click',
    event => {

        event.preventDefault();

        document
            .getElementById('timeline')
            .scrollIntoView({
                behavior: 'smooth'
            });

        playPauseSong();
    }
);

async function playPauseSong() {
    try {

        if (audio.paused) {
            await audio.play();
        } else {
            audio.pause();
        }

        updateMusicUI();

    } catch (error) {

        console.warn(
            'Não foi possível reproduzir o áudio:',
            error
        );

    }
}

function updateMusicUI() {

    if (audio.paused) {

        musicToggle.textContent = '▶';

        musicToggle.setAttribute(
            'aria-label',
            'Tocar Música'
        );

        musicPlayer.classList.remove(
            'playing'
        );

    } else {

        musicToggle.textContent = 'Ⅱ';

        musicToggle.setAttribute(
            'aria-label',
            'Pausar'
        );

        musicPlayer.classList.add(
            'playing'
        );
    }
}


/*
 * ============================================================
 * TERMINAL ANIMATION
 * ============================================================
 */

const terminalLines =
    document.querySelectorAll(
        '.terminal-line'
    );

const terminalObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    terminalLines.forEach(
                        (line, index) => {

                            setTimeout(
                                () => {
                                    line.classList.add(
                                        'visible'
                                    );
                                },
                                index * 350
                            );
                        }
                    );

                    terminalObserver.disconnect();
                }
            );

        },
        {
            threshold: .3
        }
    );

terminalObserver.observe(
    document.getElementById('terminal')
);


/*
 * ============================================================
 * FLOATING HEARTS
 * ============================================================
 */

const hearts =
    document.getElementById('hearts');

const heartSymbols = [
    '♥',
    '❤',
    '♡'
];

function createHeart() {

    const heart =
        document.createElement('span');

    heart.textContent =
        heartSymbols[
        Math.floor(
            Math.random() *
            heartSymbols.length
        )
        ];

    heart.className =
        'absolute text-rose-500/20 text-sm animate-heart';

    heart.style.left =
        `${Math.random() * 100}%`;

    heart.style.animationDuration =
        `${5 + Math.random() * 6}s`;

    heart.style.animationDelay =
        `${Math.random() * 4}s`;

    hearts.appendChild(heart);

    setTimeout(
        () => heart.remove(),
        12000
    );
}

for (let i = 0; i < 12; i++) {
    createHeart();
}

setInterval(
    createHeart,
    1400
);