interface LoveQuote {
    en: string;
    tagalog: string;
}

const messages: LoveQuote[] = [
    {
        en: "Whatever our souls are made of, yours and mine are the same.",
        tagalog: "Anuman ang gawa ng ating mga kaluluwa, pareho ang sa'yo at ang sa akin."
    },
    {
        en: "In all the world, there is no heart for me like yours.",
        tagalog: "Sa buong mundo, walang pusong gaya ng sa'yo para sa akin."
    },
    {
        en: "I look at you and see the rest of my life in your eyes.",
        tagalog: "Tinitigan kita at nakikita ang natitirang buhay ko sa iyong mga mata."
    },
    {
        en: "You are my today and all of my tomorrows.",
        tagalog: "Ikaw ang aking ngayon at lahat ng aking mga bukas."
    },
    {
        en: "Distance means so little when someone means so much.",
        tagalog: "Walang saysay ang distansya kapag napakahalaga ng isang tao sa'yo."
    },
    {
        en: "My soul saw you and kind of went, \"Oh, there you are. I've been looking for you.\"",
        tagalog: "Nakita ka ng aking kaluluwa at parang sinabi, \"Ay, nandito ka pala. Hinahanap na kita.\""
    },
    {
        en: "I would rather spend one lifetime with you, than face all the ages of this world alone.",
        tagalog: "Mas pipiliin kong makasama ka sa isang buhay, kaysa harapin mag-isa ang lahat ng panahon ng mundong ito."
    },
    {
        en: "To love and be loved is to feel the sun from both sides.",
        tagalog: "Ang magmahal at mahalin ay ang maramdaman ang araw mula sa magkabilang panig."
    },
    {
        en: "If I know what love is, it is because of you.",
        tagalog: "Kung alam ko kung ano ang pag-ibig, dahil iyon sa'yo."
    },
    {
        en: "You are my sun, my moon, and all my stars.",
        tagalog: "Ikaw ang aking araw, ang aking buwan, at lahat ng aking mga bituin."
    },
    {
        en: "My heart is and always will be yours.",
        tagalog: "Ang aking puso ay sa'yo at mananatiling sa'yo magpakailanman."
    },
    {
        en: "In a room full of art, I'd still stare at you.",
        tagalog: "Kahit sa isang silid na puno ng sining, titingnan pa rin kita."
    },
    {
        en: "You have bewitched me, body and soul, and I love you.",
        tagalog: "Nabighani mo ako, katawan at kaluluwa, at mahal kita."
    },
    {
        en: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
        tagalog: "Nakita kong perpekto ka, kaya minahal kita. Tapos nakita kong hindi ka perpekto at lalo kitang minahal."
    },
    {
        en: "I love you not only for what you are, but for what I am when I am with you.",
        tagalog: "Mahal kita hindi lamang dahil sa kung sino ka, kundi dahil sa kung sino ako kapag kasama kita."
    },
    {
        en: "You are the piece I didn't know I was missing.",
        tagalog: "Ikaw ang pirasong hindi ko alam na kulang sa akin."
    },
    {
        en: "Thinking of you keeps me awake. Dreaming of you keeps me asleep. Being with you keeps me alive.",
        tagalog: "Ang pag-iisip sa'yo ang nagpapanatiling gising sa akin. Ang panaginip sa'yo ang nagpapatulog sa akin. Ang pagsama sa'yo ang nagpapanatiling buhay sa akin."
    },
    {
        en: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
        tagalog: "Sumusumpa ako na hindi na kita kayang mahalin pa nang higit sa kasalukuyan, ngunit alam kong higit pa kitang mamahalin bukas."
    },
    {
        en: "I loved you yesterday, I love you still, I always have, I always will.",
        tagalog: "Minahal kita kahapon, mahal pa rin kita, minahal kita noon pa man, at mamahalin kita palagi."
    },
    {
        en: "You are my favorite thought.",
        tagalog: "Ikaw ang aking paboritong iniisip."
    }
];

const starSymbols: string[] = ["・", "·", ".", ":", "°", "¨", "˙"];

function createStars(): void {
    const container = document.getElementById("stars-container");
    if (!container) return;

    for (let i = 0; i < 14; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.fontSize = `${6 + Math.random() * 10}px`;
        container.appendChild(star);
    }
}

function getRandomMessage(): LoveQuote {
    return messages[Math.floor(Math.random() * messages.length)];
}

function initDailyMessage(): void {
    const messageElement = document.getElementById("daily-message");
    const newMessageBtn = document.getElementById("new-message-btn");

    const render = (quote: LoveQuote): void => {
        if (!messageElement) return;
        messageElement.innerHTML = "";
        const en = document.createElement("span");
        en.className = "daily-en";
        en.textContent = quote.en;
        const tag = document.createElement("span");
        tag.className = "daily-tagalog";
        tag.textContent = quote.tagalog;
        messageElement.appendChild(en);
        messageElement.appendChild(tag);
    };

    render(getRandomMessage());

    if (newMessageBtn) {
        newMessageBtn.addEventListener("click", () => {
            if (!messageElement) return;
            messageElement.style.opacity = "0";
            setTimeout(() => {
                render(getRandomMessage());
                messageElement.style.opacity = "1";
            }, 300);
        });
    }
}

function initFadeInAnimations(): void {
    const fadeElements = document.querySelectorAll<HTMLElement>(".fade-in");
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    (entry.target as HTMLElement).style.animationPlayState = "running";
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach((el) => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });
}

function createSparkles(): void {
    document.addEventListener("click", (e) => {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement("div");
            sparkle.style.position = "fixed";
            sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 40}px`;
            sparkle.style.top = `${e.clientY + (Math.random() - 0.5) * 40}px`;
            sparkle.style.width = `${6 + Math.random() * 8}px`;
            sparkle.style.height = sparkle.style.width;
            sparkle.style.borderRadius = "50%";
            sparkle.style.background = "#ff8fc2";
            sparkle.style.pointerEvents = "none";
            sparkle.style.zIndex = "9999";
            sparkle.style.transition = "all 0.8s ease-out";
            document.body.appendChild(sparkle);

            requestAnimationFrame(() => {
                sparkle.style.transform = `translateY(-${50 + Math.random() * 30}px) scale(0)`;
                sparkle.style.opacity = "0";
            });

            setTimeout(() => sparkle.remove(), 800);
        }
    });
}

function initIntro(): void {
    const intro = document.getElementById("intro");
    const wghtgt = document.getElementById("intro-wghtgt");
    const question = document.getElementById("intro-question");
    const show = document.getElementById("intro-show");

    if (!intro || !wghtgt || !question || !show) return;

    document.body.style.overflow = "hidden";

    const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

    const hideElement = (el: HTMLElement): void => el.classList.remove("show");

    const run = async (): Promise<void> => {
        await sleep(600);
        wghtgt.classList.add("show");
        await sleep(2600);
        hideElement(wghtgt);
        await sleep(700);
        question.classList.add("show");
        await sleep(2800);
        hideElement(question);
        await sleep(700);
        show.classList.add("show");
        await sleep(2400);
        hideElement(show);
        await sleep(600);
        intro.classList.add("hide");
        document.body.style.overflow = "";
        startPlayback();
        await sleep(1100);
        intro.remove();
    };

    run();
}

interface LyricWord {
    time: number;
    text: string;
}

interface LyricLine {
    time: number;
    words: LyricWord[];
}

const lyrics: LyricLine[] = [
    {
        time: 17.94,
        words: [
            { time: 17.94, text: "Is" },
            { time: 19.06, text: "it" },
            { time: 20.18, text: "true?" }
        ]
    },
    {
        time: 23.18,
        words: [
            { time: 23.18, text: "You've" },
            { time: 24.08, text: "been" },
            { time: 24.26, text: "feeling" },
            { time: 24.76, text: "sort" },
            { time: 25.28, text: "of" },
            { time: 25.5, text: "low" },
            { time: 26.0, text: "these" },
            { time: 26.6, text: "days" }
        ]
    },
    {
        time: 28.24,
        words: [
            { time: 28.24, text: "Just" },
            { time: 29.06, text: "don't" },
            { time: 29.5, text: "have" },
            { time: 29.8, text: "a" },
            { time: 29.98, text: "place" },
            { time: 30.3, text: "to" },
            { time: 30.62, text: "go" },
            { time: 31.06, text: "these" },
            { time: 31.64, text: "days" }
        ]
    },
    {
        time: 33.28,
        words: [
            { time: 33.28, text: "Must" },
            { time: 34.2, text: "be" },
            { time: 34.44, text: "bringing" },
            { time: 35.04, text: "you" },
            { time: 35.46, text: "down" }
        ]
    },
    {
        time: 39.42,
        words: [
            { time: 39.42, text: "If" },
            { time: 40.34, text: "it's" },
            { time: 40.7, text: "so" }
        ]
    },
    {
        time: 43.22,
        words: [
            { time: 43.22, text: "Then" },
            { time: 43.98, text: "come" },
            { time: 44.36, text: "on" },
            { time: 44.58, text: "give" },
            { time: 44.88, text: "this" },
            { time: 45.32, text: "lover" },
            { time: 45.7, text: "boy" },
            { time: 46.26, text: "a" },
            { time: 47.02, text: "try" }
        ]
    },
    {
        time: 48.62,
        words: [
            { time: 48.62, text: "I'll" },
            { time: 49.22, text: "put" },
            { time: 49.4, text: "the" },
            { time: 49.7, text: "sparkle" },
            { time: 50.18, text: "right" },
            { time: 50.58, text: "back" },
            { time: 50.9, text: "in" },
            { time: 51.62, text: "your" },
            { time: 52.0, text: "eyes" }
        ]
    },
    {
        time: 53.9,
        words: [
            { time: 53.9, text: "What" },
            { time: 55.24, text: "could" },
            { time: 55.5, text: "you" },
            { time: 55.8, text: "lose?" }
        ]
    },
    {
        time: 60.28,
        words: [
            { time: 60.28, text: "Well" },
            { time: 60.62, text: "for" },
            { time: 60.92, text: "one," },
            { time: 62.58, text: "her" },
            { time: 63.5, text: "heart" },
            { time: 64.78, text: "belongs" },
            { time: 66.16, text: "to" },
            { time: 68.34, text: "another." }
        ]
    },
    {
        time: 70.16,
        words: [
            { time: 70.16, text: "And" },
            { time: 70.84, text: "no" },
            { time: 71.22, text: "other" },
            { time: 71.92, text: "heart" },
            { time: 74.22, text: "will" },
            { time: 76.18, text: "do." }
        ]
    },
    {
        time: 80.08,
        words: [
            { time: 80.08, text: "Is" },
            { time: 81.08, text: "it" },
            { time: 81.26, text: "wrong?" },
            { time: 81.9, text: "To" },
            { time: 84.62, text: "think" },
            { time: 85.02, text: "my" },
            { time: 85.38, text: "love" },
            { time: 85.72, text: "could" },
            { time: 85.98, text: "really" },
            { time: 86.48, text: "help" },
            { time: 86.92, text: "you" },
            { time: 87.18, text: "out?" }
        ]
    },
    {
        time: 89.38,
        words: [
            { time: 89.38, text: "It's" },
            { time: 89.88, text: "simply" },
            { time: 90.34, text: "just" },
            { time: 90.82, text: "my" },
            { time: 91.12, text: "stubborn" },
            { time: 91.46, text: "heart" },
            { time: 92.24, text: "no" },
            { time: 92.7, text: "doubt," },
            { time: 94.12, text: "rambling" },
            { time: 96.1, text: "away." }
        ]
    },
    {
        time: 100.5,
        words: [
            { time: 100.5, text: "If" },
            { time: 101.38, text: "it's" },
            { time: 101.68, text: "not" }
        ]
    },
    {
        time: 104.28,
        words: [
            { time: 104.28, text: "Then" },
            { time: 105.12, text: "come" },
            { time: 105.46, text: "on" },
            { time: 105.66, text: "give" },
            { time: 105.94, text: "this" },
            { time: 106.38, text: "lover" },
            { time: 106.82, text: "boy" },
            { time: 107.54, text: "a" },
            { time: 107.96, text: "try" }
        ]
    },
    {
        time: 109.42,
        words: [
            { time: 109.42, text: "I'll" },
            { time: 110.28, text: "put" },
            { time: 110.5, text: "the" },
            { time: 110.82, text: "sparkle" },
            { time: 111.26, text: "right" },
            { time: 111.66, text: "back" },
            { time: 111.94, text: "in" },
            { time: 112.64, text: "your" },
            { time: 113.04, text: "eyes" }
        ]
    },
    {
        time: 115.4,
        words: [
            { time: 115.4, text: "What" },
            { time: 116.28, text: "could" },
            { time: 116.54, text: "you" },
            { time: 116.86, text: "lose?" }
        ]
    },
    {
        time: 120.26,
        words: [
            { time: 120.26, text: "Well" },
            { time: 121.66, text: "for" },
            { time: 121.96, text: "one," },
            { time: 123.9, text: "her" },
            { time: 124.58, text: "heart" },
            { time: 125.54, text: "belongs" },
            { time: 127.1, text: "to" },
            { time: 129.4, text: "another." }
        ]
    },
    {
        time: 131.34,
        words: [
            { time: 131.34, text: "And" },
            { time: 131.94, text: "no" },
            { time: 132.26, text: "other" },
            { time: 132.9, text: "heart" },
            { time: 135.36, text: "will" },
            { time: 137.3, text: "do." }
        ]
    },
    {
        time: 140.92,
        words: [
            { time: 140.92, text: "For" },
            { time: 142.32, text: "one," },
            { time: 144.14, text: "her" },
            { time: 144.96, text: "heart" },
            { time: 145.92, text: "belongs" },
            { time: 147.62, text: "to" },
            { time: 149.78, text: "another." }
        ]
    },
    {
        time: 151.74,
        words: [
            { time: 151.74, text: "And" },
            { time: 152.28, text: "no" },
            { time: 152.64, text: "other" },
            { time: 153.16, text: "heart" },
            { time: 156.44, text: "will" },
            { time: 157.7, text: "do," },
            { time: 158.1, text: "ooh" }
        ]
    }
];

function initPlayer(): void {
    const audio = document.getElementById("player-audio") as HTMLAudioElement | null;
    const lyricEl = document.getElementById("player-lyric");
    const playerEl = document.getElementById("player");

    if (!audio || !lyricEl || !playerEl) return;

    const HIDE_DELAY = 1.8;

    const getActiveIndex = (current: number): number => {
        let index = -1;
        for (let i = 0; i < lyrics.length; i++) {
            if (current >= lyrics[i].time) {
                index = i;
            } else {
                break;
            }
        }
        if (index < 0) return -1;
        const lastWordTime = lyrics[index].words[lyrics[index].words.length - 1].time;
        if (current >= lastWordTime + HIDE_DELAY) {
            return -1;
        }
        return index;
    };

    let currentLyricIndex = -1;
    let currentWordIndex = -1;
    let fadeTimer: number | undefined;
    let pendingLineSwap = false;

    const buildLine = (index: number): void => {
        lyricEl.textContent = "";
        lyrics[index].words.forEach((word, i) => {
            const span = document.createElement("span");
            span.className = "player-lyric-word";
            span.textContent = word.text + " ";
            if (i === currentWordIndex) span.classList.add("active");
            lyricEl.appendChild(span);
        });
    };

    const showLyric = (index: number): void => {
        pendingLineSwap = false;
        currentWordIndex = -1;
        lyricEl.classList.remove("show", "hide");
        void lyricEl.offsetWidth;
        buildLine(index);
        lyricEl.classList.add("show");
        playerEl.classList.add("lyric-visible");
    };

    const updateLyrics = (): void => {
        const index = getActiveIndex(audio.currentTime);
        if (index === currentLyricIndex) return;
        currentLyricIndex = index;
        currentWordIndex = -1;

        if (index < 0) {
            pendingLineSwap = false;
            lyricEl.classList.remove("show");
            lyricEl.classList.add("hide");
            lyricEl.textContent = "";
            playerEl.classList.remove("lyric-visible");
            return;
        }

        pendingLineSwap = true;
        if (fadeTimer) window.clearTimeout(fadeTimer);

        lyricEl.classList.remove("show");
        lyricEl.classList.add("hide");
        fadeTimer = window.setTimeout(() => {
            showLyric(index);
        }, 450);
    };

    const updateWords = (): void => {
        if (currentLyricIndex < 0 || pendingLineSwap) return;
        const words = lyrics[currentLyricIndex].words;
        let wordIndex = -1;
        for (let i = 0; i < words.length; i++) {
            if (audio.currentTime >= words[i].time) {
                wordIndex = i;
            } else {
                break;
            }
        }
        if (wordIndex === currentWordIndex) return;
        currentWordIndex = wordIndex;

        const spans = lyricEl.querySelectorAll<HTMLElement>(".player-lyric-word");
        spans.forEach((span, i) => {
            span.classList.toggle("active", i === wordIndex);
        });
    };

    audio.addEventListener("timeupdate", () => {
        updateLyrics();
        updateWords();
    });

    audio.addEventListener("ended", () => {
        lyricEl.classList.remove("show");
        lyricEl.classList.add("hide");
        lyricEl.textContent = "";
        playerEl.classList.remove("lyric-visible");
    });
}

function initFullscreen(): void {
    const cap = (window as any).Capacitor;
    if (cap && cap.Plugins && cap.Plugins.SystemBars) {
        cap.Plugins.SystemBars.hide().catch(() => undefined);
        setTimeout(() => {
            cap.Plugins.SystemBars.hide().catch(() => undefined);
        }, 1500);
    }
}

function startPlayback(): void {
    const audio = document.getElementById("player-audio") as HTMLAudioElement | null;
    if (!audio) return;

    const tryPlay = (): void => {
        audio.play().catch(() => undefined);
    };

    tryPlay();

    const events: string[] = ["pointerdown", "touchstart", "click", "keydown", "scroll", "wheel"];
    const startOnce = (): void => {
        tryPlay();
        if (!audio.paused) {
            events.forEach((e) => window.removeEventListener(e, startOnce));
        }
    };
    events.forEach((e) => window.addEventListener(e, startOnce, { passive: true }));
}

document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    createStars();
    initDailyMessage();
    initFadeInAnimations();
    createSparkles();
    initPlayer();
    initFullscreen();
    startPlayback();
});

window.addEventListener("load", initFullscreen);