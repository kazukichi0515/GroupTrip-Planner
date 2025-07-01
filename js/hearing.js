// hearing.js
// ヒアリング画面の制御を記述

document.addEventListener('DOMContentLoaded', () => {
    const hearingForm = document.getElementById('hearingForm');
    const questionContainer = document.getElementById('questionContainer');

    const questions = [
        {
            step: "基本情報",
            question: "出発日は？",
            key: "startDate",
            type: "date"
        },
        {
            step: "基本情報",
            question: "ご予定の人数は？",
            key: "pax",
            type: "number"
        },
        {
            step: "基本情報",
            question: "年代は？",
            key: "ageGroup",
            type: "select",
            options: ["youth", "adult", "senior"]
        },
        {
            step: "基本情報",
            question: "目的地は？",
            key: "destination",
            type: "text"
        },
        {
            step: "基本情報",
            question: "出発空港は？",
            key: "depAirport",
            type: "text"
        },
        {
            step: "基本情報",
            question: "到着空港は？",
            key: "arrAirport",
            type: "text"
        },
        {
            step: "基本情報",
            question: "希望の時間帯は？",
            key: "timeBand",
            type: "select",
            options: ["morning", "afternoon", "evening"]
        },
        {
            step: "宿泊",
            question: "ホテルのタイプは？",
            key: "hotelType",
            type: "select",
            options: ["business", "onsen", "resort"]
        },
        {
            step: "宿泊",
            question: "部屋のタイプは？",
            key: "roomType",
            type: "select",
            options: ["single", "twin", "triple"]
        },
        {
            step: "宿泊",
            question: "食事プランは？",
            key: "mealPlan",
            type: "select",
            options: ["breakfast", "half", "full"]
        },
        {
            step: "その他",
            question: "宴会はありますか？",
            key: "banquet",
            type: "checkbox"
        },
        {
            step: "その他",
            question: "バスのサイズは？",
            key: "busSize",
            type: "select",
            options: ["large", "medium"]
        }
    ];

    let currentQuestionIndex = 0;
    const tripRequest = {};

    function renderQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <div class="question-block">
                    <h3>${q.step}</h3>
                    <label for="${q.key}">${q.question}</label>
                    ${generateInputHtml(q)}
                </div>
            `;
        } else {
            questionContainer.innerHTML = `<h2>ヒアリング完了！</h2><p>プラン生成ボタンを押してください。</p>`;
            hearingForm.querySelector('button[type="submit"]').style.display = 'block';
        }
    }

    function generateInputHtml(q) {
        switch (q.type) {
            case "date":
                return `<input type="date" id="${q.key}" name="${q.key}" required>`;
            case "number":
                return `<input type="number" id="${q.key}" name="${q.key}" required>`;
            case "text":
                return `<input type="text" id="${q.key}" name="${q.key}" required>`;
            case "select":
                return `<select id="${q.key}" name="${q.key}" required>${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`;
            case "checkbox":
                return `<input type="checkbox" id="${q.key}" name="${q.key}">`;
            default:
                return '';
        }
    }

    hearingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            const inputElement = document.getElementById(q.key);

            if (q.type === "checkbox") {
                tripRequest[q.key] = inputElement.checked;
            } else {
                tripRequest[q.key] = inputElement.value;
            }

            currentQuestionIndex++;
            renderQuestion();
        } else {
            // 全ての質問が完了したら、tripRequestをlocalStorageに保存してplan.htmlへ遷移
            localStorage.setItem('tripRequest', JSON.stringify(tripRequest));
            window.location.href = 'plan.html';
        }
    });

    // 初期表示
    renderQuestion();
});
