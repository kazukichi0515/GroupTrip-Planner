document.addEventListener('DOMContentLoaded', () => {
    const hearingForm = document.getElementById('hearingForm');
    const overviewTextarea = document.getElementById('overview');

    hearingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const overview = overviewTextarea.value;
        console.log("入力された概要:", overview);

        try {
            // バックエンドの新しいAPIエンドポイントを呼び出す
            const response = await fetch('http://localhost:3000/api/generate-full-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ overviewText: overview }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'AIプラン生成に失敗しました。');
            }

            const tripPlan = await response.json(); // AIから直接TripPlanを受け取る
            console.log("AIから生成されたTripPlan:", tripPlan);

            // 生成したTripPlanをlocalStorageに保存して次の画面へ遷移
            localStorage.setItem('tripPlan', JSON.stringify(tripPlan)); // キーをtripPlanに変更
            localStorage.setItem('overviewText', overview); // 元の概要も保存

            window.location.href = 'preliminary_plan.html'; // 中間画面へ遷移

        } catch (error) {
            console.error('API呼び出しエラー:', error);
            alert('プラン生成中にエラーが発生しました。\n' + error.message);
        }
    });
});