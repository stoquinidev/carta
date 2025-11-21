// Elementos DOM
const envelope = document.getElementById('envelope');
const specialBtn = document.getElementById('specialBtn');
const playBtn = document.getElementById('playBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeSliderContainer = document.getElementById('volumeSliderContainer');
const soundcloudIframe = document.getElementById('soundcloudIframe');

// Variáveis do player
let widget;
let isPlaying = false;
let volumeVisible = false;

// Inicializar o widget do SoundCloud quando a página carregar
window.onload = function() {
    widget = SC.Widget(soundcloudIframe);
    
    // Configurar eventos do widget
    widget.bind(SC.Widget.Events.READY, function() {
        console.log('Player do SoundCloud pronto!');
        // Configurar volume inicial
        widget.setVolume(volumeSlider.value);
        updateVolumeIcon(volumeSlider.value);
    });
    
    widget.bind(SC.Widget.Events.PLAY, function() {
        isPlaying = true;
        updatePlayButton(true);
        showNotification('🎵 Tocando Perfect - Ed Sheeran 🎵');
    });
    
    widget.bind(SC.Widget.Events.PAUSE, function() {
        isPlaying = false;
        updatePlayButton(false);
        showNotification('⏸️ Música pausada');
    });
    
    widget.bind(SC.Widget.Events.FINISH, function() {
        isPlaying = false;
        updatePlayButton(false);
        showNotification('🎵 Música finalizada');
    });
};

// Abrir/fechar envelope
envelope.addEventListener('click', function() {
    this.classList.toggle('open');
});

// Botão especial
specialBtn.addEventListener('click', function() {
    alert("Prometo fazer de cada dia uma oportunidade para te fazer feliz e demonstrar o quanto você é especial para mim. Vou trabalhar todos os dias para merecer seu amor e confiança.");
});

// Controle de play/pause
playBtn.addEventListener('click', function() {
    if (widget) {
        widget.toggle();
    } else {
        showNotification('⏳ Player carregando...');
    }
});

// Controle de volume - mostrar/ocultar
volumeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    volumeVisible = !volumeVisible;
    volumeSliderContainer.classList.toggle('show', volumeVisible);
});

// Fechar controle de volume ao clicar fora
document.addEventListener('click', function(e) {
    if (!volumeSliderContainer.contains(e.target) && e.target !== volumeBtn) {
        volumeSliderContainer.classList.remove('show');
        volumeVisible = false;
    }
});

// Atualizar volume
volumeSlider.addEventListener('input', function() {
    const volume = this.value;
    if (widget) {
        widget.setVolume(volume);
    }
    updateVolumeIcon(volume);
    showVolumeNotification(volume);
});

// Atualiza o botão de play/pause
function updatePlayButton(playing) {
    if (playing) {
        playBtn.innerHTML = "⏸️";
        playBtn.classList.add('playing');
        isPlaying = true;
    } else {
        playBtn.innerHTML = "▶️";
        playBtn.classList.remove('playing');
        isPlaying = false;
    }
}

// Atualiza o ícone do volume baseado no valor
function updateVolumeIcon(volume) {
    let volumeIcon = "🔊"; // Alto
    if (volume == 0) {
        volumeIcon = "🔇"; // Mudo
    } else if (volume < 30) {
        volumeIcon = "🔈"; // Baixo
    } else if (volume < 70) {
        volumeIcon = "🔉"; // Médio
    }
    volumeBtn.innerHTML = volumeIcon;
}

// Mostra notificação do volume
function showVolumeNotification(volume) {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.volume-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification volume-notification';
    notification.innerHTML = `Volume: ${volume}%`;
    notification.style.background = 'rgba(255, 85, 0, 0.95)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 1000);
}

// Efeito de confete ao abrir a carta pela primeira vez
let firstOpen = true;
envelope.addEventListener('click', function() {
    if (firstOpen && this.classList.contains('open')) {
        createHearts();
        firstOpen = false;
        
        // Sugere tocar a música quando a carta é aberta
        setTimeout(() => {
            if (!isPlaying) {
                showMusicSuggestion();
            }
        }, 2000);
    }
});

// Função para criar corações flutuantes
function createHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            // Animação
            const animation = heart.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: `translateY(-${Math.random() * 300 + 100}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => {
                heart.remove();
            };
        }, i * 200);
    }
}

// Mostra notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sugestão para tocar música
function showMusicSuggestion() {
    const suggestion = document.createElement('div');
    suggestion.className = 'notification';
    suggestion.innerHTML = '💝 Que tal ouvir nossa música especial?';
    suggestion.style.cursor = 'pointer';
    suggestion.style.background = 'rgba(255, 85, 0, 0.9)';
    
    suggestion.addEventListener('click', () => {
        playBtn.click();
        suggestion.remove();
    });
    
    document.body.appendChild(suggestion);
    
    setTimeout(() => {
        if (document.body.contains(suggestion)) {
            suggestion.remove();
        }
    }, 5000);
}

// Inicialização
console.log(`
❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  Site de Pedido de Desculpas
  Com player do SoundCloud integrado!
  
  Música: Perfect - Ed Sheeran
  Player: SoundCloud com controles personalizados
❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
`);