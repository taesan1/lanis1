(function() {
    if (document.getElementById('lanis-ui')) return;

    const webhookUrl = 'https://discord.com/api/webhooks/1417100157102854154/4MpsrFpNFVZBsW-ziAMtO8k2XhZeAb-6KtE0_0AnDmg3C6wKtSs0VQD-gTCsEIup_64h';

    function sendWebhookMessage(content) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        })
            .then(res => {
                if(res.ok) console.log('메시지 전송 성공');
                else console.error('전송 실패', res.status);
            })
            .catch(err => console.error('오류 발생', err));
    }

    const uiContainer = document.createElement('div');
    uiContainer.id = 'lanis-ui';

    const mainButton = document.createElement('button');
    mainButton.innerText = '메뉴';
    mainButton.className = 'main-btn';

    const urgentButton = document.createElement('button');
    urgentButton.innerText = '긴급';
    urgentButton.className = 'urgent sub-btn';

    const warningButton = document.createElement('button');
    warningButton.innerText = '주의';
    warningButton.className = 'warning sub-btn';

    const settingsButton = document.createElement('button');
    settingsButton.innerText = '설정';
    settingsButton.className = 'settings sub-btn';

    const subButtons = [urgentButton, warningButton, settingsButton];

    mainButton.addEventListener('click', () => {
        subButtons.forEach(btn => btn.classList.toggle('active'));
    });

    urgentButton.addEventListener('click', () => {
        const msg = `[긴급] 사용자: 즉시 대응 필요 - ${new Date().toLocaleString()}`;
        sendWebhookMessage(msg);
    });

    warningButton.addEventListener('click', () => {
        const msg = `[주의] 사용자: 주의 상황 발생 - ${new Date().toLocaleString()}`;
        sendWebhookMessage(msg);
    });

    settingsButton.addEventListener('click', () => alert('설정창 열기'));

    uiContainer.appendChild(mainButton);
    subButtons.forEach(btn => uiContainer.appendChild(btn));
    document.body.appendChild(uiContainer);
})();
