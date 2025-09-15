function initUI() {
    if (document.getElementById('lanis-ui')) return; // 이미 생성되었으면 종료

    const webhookUrl = 'https://discord.com/api/webhooks/1417100157102854154/4MpsrFpNFVZBsW-ziAMtO8k2XhZeAb-6KtE0_0AnDmg3C6wKtSs0VQD-gTCsEIup_64h';
    let urgentMessage = '[긴급] @사용자: 즉시 대응 필요 - {time}';
    let warningMessage = '[주의] @사용자: 주의 상황 발생 - {time}';

    function sendWebhookMessage(content) {
        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        })
            .then(res => console.log(res.ok ? '메시지 전송 성공' : '전송 실패'))
            .catch(err => console.error(err));
    }

    // UI 컨테이너
    const uiContainer = document.createElement('div');
    uiContainer.id = 'lanis-ui';

    const mainButton = document.createElement('button'); mainButton.innerText = '메뉴'; mainButton.className = 'main-btn';
    const urgentButton = document.createElement('button'); urgentButton.innerText = '긴급'; urgentButton.className = 'urgent sub-btn';
    const warningButton = document.createElement('button'); warningButton.innerText = '주의'; warningButton.className = 'warning sub-btn';
    const settingsButton = document.createElement('button'); settingsButton.innerText = '설정'; settingsButton.className = 'settings sub-btn';
    const subButtons = [urgentButton, warningButton, settingsButton];

    mainButton.addEventListener('click', () => {
        subButtons.forEach((btn, i) => setTimeout(() => btn.classList.toggle('active'), i*50));
    });

    urgentButton.addEventListener('click', () => sendWebhookMessage(
        urgentMessage.replace('{time}', new Date().toLocaleString())
    ));
    warningButton.addEventListener('click', () => sendWebhookMessage(
        warningMessage.replace('{time}', new Date().toLocaleString())
    ));

    // 모달
    const modal = document.createElement('div');
    modal.id='lanis-ui-modal';
    modal.innerHTML = `
        <h3>메시지 설정</h3>
        <label>긴급 메시지</label><input type="text" id="urgent-input" value="${urgentMessage}">
        <label>주의 메시지</label><input type="text" id="warning-input" value="${warningMessage}">
        <div style="text-align:right;">
            <button class="save-btn">저장</button>
            <button class="cancel-btn">취소</button>
        </div>`;
    document.body.appendChild(modal);

    settingsButton.addEventListener('click', () => modal.classList.add('active'));
    modal.querySelector('.cancel-btn').addEventListener('click', () => modal.classList.remove('active'));
    modal.querySelector('.save-btn').addEventListener('click', () => {
        urgentMessage = document.getElementById('urgent-input').value;
        warningMessage = document.getElementById('warning-input').value;
        modal.classList.remove('active');
        alert('메시지가 저장되었습니다!');
    });

    // UI 추가
    uiContainer.appendChild(mainButton);
    subButtons.forEach(btn => uiContainer.appendChild(btn));
    document.body.appendChild(uiContainer);
}

// SPA 대응: DOM이 존재할 때까지 반복 확인
function waitForBody() {
    if (!document.body) {
        requestAnimationFrame(waitForBody);
        return;
    }
    if (!document.getElementById('lanis-ui')) {
        initUI();
    }
}
waitForBody();
