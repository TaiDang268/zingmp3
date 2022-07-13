const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $(".btn-toggle-play")
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: "Đế Vương",
            singer: "Đình Dũng",
            path: "./assets/music/DeVuong-DinhDungACV-7121634.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg"
        },
        {
            name: "Cầu Vồng Khuyết",
            singer: "Tuấn Hưng",
            path: "./assets/music/CauVongKhuyet-TuanHung-2557205.mp3",
            image: "https://tieusunguoinoitieng.com/wp-content/uploads/2021/10/tieu-su-tuan-hung.jpg"
        },
        {
            name: "Điều Gì Đến Sẽ Đến",
            singer: "Phạm Quỳnh Anh",
            path: "./assets/music/DieuGiDenSeDen-UngHoangPhucPhamQuynhAnh-5673721.mp3",
            image: "data:image/jpeg;base64,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"
        },
        {
            name: "Dĩ Vãng Cuộc Tình",
            singer: "Duy Mạnh",
            path: "./assets/music/DiVangCuocTinh-TuanHung_r5z4.mp3",
            image: "data:image/jpeg;base64,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"
        },
        {
            name: "Dối Lòng",
            singer: "Trung Quân",
            path: "./assets/music/DoiLong-TuanHung-5385147.mp3",
            image: "https://znews-stc.zdn.vn/static/topic/person/trungquan.jpg"
        },
        {
            name: "Ta Là Của Nhau",

            singer: "Đông Nhi",
            path: "./assets/music/TaLaCuaNhau-DongNhiOngCaoThang-4113753.mp3",
            image: "https://nld.mediacdn.vn/291774122806476800/2022/4/6/phambeo0203dongnhi-16492062583601125803919.jpg"
        },

    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
        <div class="song ${index===this.currentIndex ? 'active':''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth;
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        document.onscroll = function() {
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()


        }

        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)

        }
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if (songNode) {

                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },
    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },

    start: function() {
        this.defineProperties();
        this.handleEvents()
        this.loadCurrentSong()
        this.render()

    }
}

app.start();