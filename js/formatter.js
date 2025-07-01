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

        // 行程（テキスト版）
        if (tripPlan.internalMemo && tripPlan.internalMemo.itinerary_text_summary && tripPlan.internalMemo.itinerary_text_summary.length > 0) {
            formattedText += "### 行程概要（テキスト版）\n\n";
            tripPlan.internalMemo.itinerary_text_summary.forEach(daySummary => {
                formattedText += `${daySummary.day}日目: ${daySummary.summary}\n`;
            });
            formattedText += "\n";
        }

        // 行程（指定スタイル）
        if (tripPlan.internalMemo && tripPlan.internalMemo.itinerary_styled_summary && tripPlan.internalMemo.itinerary_styled_summary.length > 0) {
            formattedText += "### 行程概要（指定スタイル）\n\n";
            tripPlan.internalMemo.itinerary_styled_summary.forEach(daySummary => {
                formattedText += `${daySummary.day}日目:\n${daySummary.summary}\n`;
            });
            formattedText += "\n";
        }

        // 詳細行程
        formattedText += "### 詳細行程\n\n";
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

        // 社内メモ\n        formattedText += "### 社内メモ\n\n";
        if (tripPlan.internalMemo) {
            if (tripPlan.internalMemo.flight_details && tripPlan.internalMemo.flight_details.length > 0) {
                formattedText += "#### フライト情報\n";
                tripPlan.internalMemo.flight_details.forEach(flight => {
                    formattedText += `- ${flight.airline} ${flight.flight_number} (${flight.departure_time} - ${flight.arrival_time})\n`;
                });
                formattedText += "\n";
            }
            if (tripPlan.internalMemo.bus_details) {
                formattedText += "#### バス情報\n";
                formattedText += `${tripPlan.internalMemo.bus_details}\n\n`;
            }
            if (tripPlan.internalMemo.sightseeing_fees && tripPlan.internalMemo.sightseeing_fees.length > 0) {
                formattedText += "#### 見学地料金\n";
                formattedText += "#### 見学地料金\n";
                tripPlan.internalMemo.sightseeing_fees.forEach(fee => {
                    formattedText += `- ${fee.name}: 大人 ${fee.adult_fee}, 団体割引 ${fee.group_discount_fee} (${fee.group_discount_conditions})\n`;
                });
                formattedText += "\n";
            }
            if (tripPlan.internalMemo.parking_fees && tripPlan.internalMemo.parking_fees.length > 0) {
                formattedText += "#### 駐車料金\n";
                tripPlan.internalMemo.parking_fees.forEach(parking => {
                    formattedText += `- ${parking.location}: ${parking.fee}\n`;
                });
                formattedText += "\n";
            }
        }

        return formattedText;
    }
}