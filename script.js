const $form = document.getElementById('questionForm');
const $input = document.getElementById('questionInput');
const $promptText = document.getElementById('promptText');
const $answer = document.getElementById('answer');

$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = $input.value;
    $input.value = '';

    try {
        const response = await fetch('https://openai.jejucodingcamp.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response');
        }

        const data = await response.json();
        const answer = data.choices[0].message.content;
        $answer.innerHTML = `<p>${answer}</p>`;
        $promptText.textContent = '질문을 입력하세요:';
    } catch (error) {
        console.error('Error:', error);
        $answer.innerHTML = '<p>답변을 가져오는 중 오류가 발생했습니다.</p>';
        $promptText.textContent = '질문을 입력하세요:';
    }
});
