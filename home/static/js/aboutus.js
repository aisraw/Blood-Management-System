document.addEventListener("DOMContentLoaded", function () {

    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Gallery popup functionality
    const galleryLink = document.getElementById('gallery-link');
    const popupGallery = document.getElementById('popupGallery');
    const popupClose = document.querySelector('.popup-close');

    if (galleryLink && popupGallery && popupClose) {
        galleryLink.addEventListener('click', function (e) {
            e.preventDefault();
            popupGallery.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        popupClose.addEventListener('click', function () {
            popupGallery.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        popupGallery.addEventListener('click', function (e) {
            if (e.target === popupGallery) {
                popupGallery.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // More popup functionality
    const moreLink = document.getElementById('more-link');
    const morePopup = document.getElementById('morePopup');
    const moreClose = document.querySelector('.more-close');

    if (moreLink && morePopup && moreClose) {
        moreLink.addEventListener('click', function (e) {
            e.preventDefault();
            morePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        moreClose.addEventListener('click', function () {
            morePopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        morePopup.addEventListener('click', function (e) {
            if (e.target === morePopup) {
                morePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Search popup functionality
    const searchIcon = document.getElementById('search-icon');
    const searchPopup = document.getElementById('searchPopup');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchIcon && searchPopup && searchClose && searchInput && searchButton) {
        searchIcon.addEventListener('click', function (e) {
            e.preventDefault();
            searchPopup.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        });

        searchClose.addEventListener('click', function () {
            searchPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        searchButton.addEventListener('click', function () {
            performSearch();
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query + " site:yourwebsite.com")}`, '_blank');
                searchPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Language switch
    const languageIcon = document.getElementById('language-icon');
    if (languageIcon) {
        languageIcon.addEventListener('click', function () {
            const language = confirm("Switch to Bangla language?");
            if (language) {
                alert("Language will be changed to Bangla.");
                // window.location.href = "https://your-site.com/bn/";
            }
        });
    }

    // ESC to close popups
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (popupGallery && popupGallery.classList.contains('active')) {
                popupGallery.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (morePopup && morePopup.classList.contains('active')) {
                morePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (searchPopup && searchPopup.classList.contains('active')) {
                searchPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (cameraPopup && cameraPopup.classList.contains('active')) {
                stopCamera();
                cameraPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Image fallback
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'placeholder.jpg';
            this.alt = 'Image not available';
        });
    });

    // Camera functionality
    const playBtn = document.querySelector('.play-btn');
    const cameraPopup = document.getElementById('cameraPopup');
    const cameraClose = document.querySelector('.camera-close');
    const cameraFeed = document.getElementById('cameraFeed');
    const startCameraBtn = document.getElementById('startCamera');
    const recordBtn = document.getElementById('recordBtn');
    const stopBtn = document.getElementById('stopBtn');
    const captureBtn = document.getElementById('captureBtn');
    const photoPreview = document.getElementById('photoPreview');
    const videoPreview = document.getElementById('videoPreview');
    const shareBtn = document.getElementById('shareBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareOptions = document.querySelector('.share-options');

    let stream = null;
    let mediaRecorder = null;
    let recordedChunks = [];
    let isRecording = false;

    if (playBtn && cameraPopup) {
        playBtn.addEventListener('click', function (e) {
            e.preventDefault();
            cameraPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cameraClose) {
        cameraClose.addEventListener('click', function () {
            stopCamera();
            cameraPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (cameraPopup) {
        cameraPopup.addEventListener('click', function (e) {
            if (e.target === cameraPopup) {
                stopCamera();
                cameraPopup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', async function () {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                cameraFeed.srcObject = stream;
                startCameraBtn.disabled = true;
                recordBtn.disabled = false;
                captureBtn.disabled = false;
            } catch (err) {
                console.error("Error accessing camera: ", err);
                alert("Could not access the camera. Please check permissions.");
            }
        });
    }

    if (recordBtn) {
        recordBtn.addEventListener('click', function () {
            if (!stream) return;

            recordedChunks = [];
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (e) {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }
            };

            mediaRecorder.onstop = function () {
                const blob = new Blob(recordedChunks, { type: 'video/mp4' });
                const videoURL = URL.createObjectURL(blob);
                videoPreview.src = videoURL;
                videoPreview.style.display = 'block';
                photoPreview.style.display = 'none';
                shareOptions.style.display = 'flex';
            };

            mediaRecorder.start();
            isRecording = true;
            recordBtn.disabled = true;
            stopBtn.disabled = false;
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', function () {
            if (mediaRecorder && isRecording) {
                mediaRecorder.stop();
                isRecording = false;
                recordBtn.disabled = false;
                stopBtn.disabled = true;
            }
        });
    }

    if (captureBtn) {
        captureBtn.addEventListener('click', function () {
            if (!stream) return;

            const context = photoPreview.getContext('2d');
            photoPreview.width = cameraFeed.videoWidth;
            photoPreview.height = cameraFeed.videoHeight;
            context.drawImage(cameraFeed, 0, 0, photoPreview.width, photoPreview.height);

            photoPreview.style.display = 'block';
            videoPreview.style.display = 'none';
            shareOptions.style.display = 'flex';
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            let file;

            if (photoPreview.style.display !== 'none') {
                photoPreview.toBlob(function (blob) {
                    file = new File([blob], "blood-donation-moment.png", { type: "image/png" });
                    shareFile(file);
                });
            } else {
                const blob = new Blob(recordedChunks, { type: 'video/mp4' });
                file = new File([blob], "blood-donation-vlog.mp4", { type: "video/mp4" });
                shareFile(file);
            }
        });
    }

    function shareFile(file) {
        if (navigator.share) {
            navigator.share({
                files: [file],
                title: 'My Blood Donation Moment',
                text: 'Check out my blood donation experience!'
            }).catch(err => {
                console.log('Error sharing:', err);
                alert('Sharing failed. You can download and share manually.');
            });
        } else {
            alert('Web Share API not supported in your browser. You can download and share manually.');
        }
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            let link = document.createElement('a');

            if (photoPreview.style.display !== 'none') {
                link.href = photoPreview.toDataURL('image/png');
                link.download = 'blood-donation-moment.png';
            } else {
                const blob = new Blob(recordedChunks, { type: 'video/mp4' });
                link.href = URL.createObjectURL(blob);
                link.download = 'blood-donation-vlog.mp4';
            }

            link.click();
        });
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            cameraFeed.srcObject = null;
            stream = null;
        }

        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
        }

        startCameraBtn.disabled = false;
        recordBtn.disabled = true;
        stopBtn.disabled = true;
        captureBtn.disabled = true;
        photoPreview.style.display = 'none';
        videoPreview.style.display = 'none';
        shareOptions.style.display = 'none';
    }
});
