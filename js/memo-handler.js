document.addEventListener('DOMContentLoaded', () => {
    const memoInput = document.getElementById('memoInput');
    const generateProposalBtn = document.getElementById('generateProposalBtn');

    generateProposalBtn.addEventListener('click', () => {
        const memo = memoInput.value;
        if (!memo.trim()) {
            alert('メモを入力してください。');
            return;
        }

        // ここでGemini APIを呼び出し、メモを解析してTripRequestを生成する処理をシミュレート
        // 今回はダミーの解析ロジック
        const simulatedTripRequest = parseMemo(memo);

        // PlannerEngineを使って企画案の概要を生成
        const planner = new PlannerEngine(simulatedTripRequest, spotsData, flightsData);
        const tripPlan = planner.generatePlan(); // このtripPlanは詳細なもの

        // 企画案の概要を生成（今回はitineraryの最初の部分を抜粋）
        const proposalSummary = {
            summary: `【AIによる企画案概要】\n\n` +
                     `方面: ${getDestinationName(tripPlan.request.destination)}\n` +
                     `出発日: ${tripPlan.request.startDate}\n` +
                     `日程: ${tripPlan.request.days}日間 (${tripPlan.request.days - 1}泊)\n` +
                     `人数: ${tripPlan.request.pax || '不明'}名 (${getAgeGroupName(tripPlan.request.ageGroup)})\n` +
                     `ホテルタイプ: ${getHotelTypeName(tripPlan.request.hotelType)}\n` +
                     `食事プラン: ${getMealPlanName(tripPlan.request.mealPlan)}\n` +
                     `\n` +
                     `◆1日目：${tripPlan.itinerary[0].title}\n` +
                     `  主な観光地: ${tripPlan.itinerary[0].spots.map(s => s.name).join(', ')}\n` +
                     `\n` +
                     `※この概要はAIがメモを元に自動生成したものです。詳細な企画書は次の画面で確認・調整できます。`,
            // 詳細なtripPlanオブジェクトもセッションストレージに保存し、plan.htmlで利用できるようにする
            fullTripPlan: tripPlan
        };

        sessionStorage.setItem('generatedProposal', JSON.stringify(proposalSummary));
        sessionStorage.setItem('tripRequest', JSON.stringify(tripPlan.request)); // plan.htmlでplannerを再構築するために必要

        window.location.href = 'proposal.html';
    });

    // ダミーのメモ解析関数
    function parseMemo(memoText) {
        let destination = 'hokkaido'; // Default
        let days = 2; // Default (1泊2日)
        let startDate = new Date().toISOString().slice(0, 10); // Today
        let pax = 10; // Default
        let ageGroup = "adult"; // Default
        let hotelType = "business"; // Default
        let mealPlan = "breakfast"; // Default
        let banquet = false; // Default
        let busSize = "medium"; // Default

        // 目的地
        if (memoText.includes('沖縄')) destination = 'okinawa';
        else if (memoText.includes('北海道')) destination = 'hokkaido';

        // 日程（泊数から日数へ変換）
        const daysMatch = memoText.match(/(\d+)(泊|日)/);
        if (daysMatch) {
            const num = parseInt(daysMatch[1]);
            if (daysMatch[2] === '泊') days = num + 1; // 泊数から日数
            else days = num; // 日数
        }

        // 人数
        const paxMatch = memoText.match(/(\d+)(人|名)/);
        if (paxMatch) pax = parseInt(paxMatch[1]);

        // 年代
        if (memoText.includes('子供') || memoText.includes('家族')) ageGroup = "youth";
        else if (memoText.includes('シニア') || memoText.includes('高齢')) ageGroup = "senior";

        // ホテルタイプ
        if (memoText.includes('温泉')) hotelType = "onsen";
        else if (memoText.includes('リゾート')) hotelType = "resort";

        // 食事プラン
        if (memoText.includes('朝食') && memoText.includes('夕食')) mealPlan = "half";
        else if (memoText.includes('全食') || (memoText.includes('朝食') && memoText.includes('昼食') && memoText.includes('夕食'))) mealPlan = "full";

        // 宴会
        if (memoText.includes('宴会') || memoText.includes('懇親会')) banquet = true;

        // バスサイズ
        if (pax > 30) busSize = "large";

        // 日付の解析は複雑なので、今回は簡易的に
        const dateMatch = memoText.match(/(\d{1,2})月(\d{1,2})日/);
        if (dateMatch) {
            const month = String(dateMatch[1]).padStart(2, '0');
            const day = String(dateMatch[2]).padStart(2, '0');
            const year = new Date().getFullYear(); // 今年の日付と仮定
            startDate = `${year}-${month}-${day}`;
        }

        return {
            startDate: startDate,
            days: days,
            pax: pax,
            ageGroup: ageGroup,
            destination: destination,
            depAirport: "HND", // 仮
            arrAirport: destination === 'hokkaido' ? "CTS" : "OKA", // 仮
            timeBand: "morning", // 仮
            hotelType: hotelType,
            roomType: "twin", // 仮
            mealPlan: mealPlan,
            banquet: banquet,
            busSize: busSize
        };
    }

    // 表示用のヘルパー関数
    function getDestinationName(key) {
        const names = { "hokkaido": "北海道", "okinawa": "沖縄" };
        return names[key] || key;
    }

    function getAgeGroupName(key) {
        const names = { "youth": "若年層/家族", "adult": "成人", "senior": "シニア" };
        return names[key] || key;
    }

    function getHotelTypeName(key) {
        const names = { "business": "ビジネス", "onsen": "温泉", "リゾート": "resort" };
        return names[key] || key;
    }

    function getMealPlanName(key) {
        const names = { "breakfast": "朝食のみ", "half": "朝夕食付き", "full": "全食付き" };
        return names[key] || key;
    }
});