// hearing.js
// ヒアリング画面の制御を記述

document.addEventListener('DOMContentLoaded', () => {
    const hearingForm = document.getElementById('hearingForm');
    const overviewTextarea = document.getElementById('overview');

    hearingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const overview = overviewTextarea.value;
        console.log("入力された概要:", overview);

        // ここでAIによる内容分析をシミュレーション
        // 実際にはAI APIを呼び出し、結果をTripRequestにマッピング
        const simulatedTripRequest = simulateAIAnalysis(overview);

        // 生成したTripRequestをlocalStorageに保存して次の画面へ遷移
        localStorage.setItem('tripRequest', JSON.stringify(simulatedTripRequest));
        localStorage.setItem('overviewText', overview); // 元の概要も保存

        window.location.href = 'preliminary_plan.html'; // 新しい中間画面へ遷移
    });

    /**
     * AIによる内容分析をシミュレーションする関数
     * 入力された概要テキストからキーワードを抽出し、ダミーのTripRequestを生成
     * @param {string} overviewText - ユーザーが入力した概要テキスト
     * @returns {object} シミュレートされたTripRequestオブジェクト
     */
    function simulateAIAnalysis(overviewText) {
        const tripRequest = {
            startDate: "2025-08-01", // ダミー
            days: 3, // ダミー
            pax: 4, // ダミー
            ageGroup: "adult", // ダミー
            destination: "沖縄", // ダミー
            depAirport: "羽田", // ダミー
            arrAirport: "那覇", // ダミー
            timeBand: "morning", // ダミー
            hotelType: "resort", // ダミー
            roomType: "twin", // ダミー
            mealPlan: "half", // ダミー
            banquet: false, // ダミー
            busSize: "medium" // ダミー
        };

        // キーワードによる簡易的な解析（例）
        if (overviewText.includes("北海道")) {
            tripRequest.destination = "北海道";
            tripRequest.arrAirport = "新千歳";
            tripRequest.hotelType = "business";
        }
        if (overviewText.includes("京都")) {
            tripRequest.destination = "京都";
            tripRequest.arrAirport = "伊丹";
            tripRequest.hotelType = "onsen";
        }
        if (overviewText.includes("家族")) {
            tripRequest.pax = 4;
            tripRequest.ageGroup = "adult";
        }
        if (overviewText.includes("社員旅行")) {
            tripRequest.pax = 30;
            tripRequest.banquet = true;
            tripRequest.busSize = "large";
        }
        if (overviewText.includes("3泊4日")) {
            tripRequest.days = 4;
        }
        if (overviewText.includes("海")) {
            tripRequest.hotelType = "resort";
        }
        if (overviewText.includes("温泉")) {
            tripRequest.hotelType = "onsen";
        }

        return tripRequest;
    }
});