// formatter.js
// 出力フォーマットのロジックを記述

class PlanFormatter {
    /**
     * TripPlanオブジェクトを整形して表示用の文字列を生成する
     * @param {object} tripPlan - TripPlanオブジェクト
     * @returns {string} 整形されたプラン文字列
     */
    formatPlan(tripPlan) {
        let formattedText = "";

        formattedText += "## 旅行プラン\n\n";

        // 行程
        formattedText += "### 行程\n\n";
        tripPlan.itinerary.forEach(dayPlan => {
            formattedText += `#### ${dayPlan.day}日目\n`;
            dayPlan.events.forEach(event => {
                formattedText += `- ${event.time} ${event.description}\n`;
            });
            formattedText += "\n";
        });

        // スポット
        formattedText += "### 観光スポット\n\n";
        tripPlan.spots.forEach(spot => {
            formattedText += `- ${spot.name}: ${spot.description}\n`;
        });
        formattedText += "\n";

        // 宿泊
        formattedText += "### 宿泊\n\n";
        formattedText += `- ホテル: ${tripPlan.accommodation.name}\n`;
        formattedText += `- 部屋タイプ: ${tripPlan.accommodation.roomType}\n`;
        formattedText += `- 食事プラン: ${tripPlan.accommodation.mealPlan}\n`;
        formattedText += "\n";

        // 補足
        formattedText += "### 補足\n\n";
        formattedText += `${tripPlan.notes}\n\n`;

        // 社内メモ
        formattedText += "### 社内メモ\n\n";
        formattedText += `${tripPlan.internalMemo}\n\n`;

        return formattedText;
    }
}

