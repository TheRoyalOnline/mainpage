import prizesCombinations from "../../components/utils/data/combinations.json";

const lines = [
    [6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5],
    [11, 12, 13, 14, 15],
    [1, 7, 13, 9, 5],
    [11, 7, 3, 9, 15],
    [1, 2, 8, 4, 5],
    [11, 12, 8, 14, 15],
    [6, 12, 13, 14, 10],
    [6, 2, 3, 4, 10]
];


export function Simulate(game, roomData) {
    const setup = JSON.parse(roomData);
    const bet = game.bet;
    const totalBet = game.bet * game.lines;
    let accumulated = 0;

    let credits = game.credits;
    let useCredits = credits > 0.0;
    const results = [];
    for (let i = 1; i <= game.simulations; i++) {

        if (useCredits) {
            if (credits < totalBet)
                break;

            credits -= totalBet;
        }

        const spin = Spin(setup.items);
        const prizes = PrizeAnalyzer(game.lines, spin);
        const mainPrize = prizes.reduce((sum, item) => sum + item.prize, 0);

        let risk = null;
        let bonus = null;
        let sbonus = 0;
        if (spin.bonus) {
            bonus = Bonus(setup.RopeSequence, totalBet, totalBet >= setup.minBetToHardHat , setup.BPrizes);
            if(bonus.bonusIndex >= 4)
                sbonus = sBonus(setup.SBPrizes, setup.sbonusPosibility, totalBet);

        } else if (prizes.length > 0 && game.risk) {
            risk = Risk(setup.RiskPercents, setup.RiskMaxBet, mainPrize);
        }

        let totalEarn = mainPrize + sbonus;
        if (risk)
            totalEarn += risk.card_out + risk.card_in;

        if (bonus)
            totalEarn += bonus.bonusPrize;

        if (useCredits)
            credits += totalEarn;

        accumulated += totalEarn - totalBet;
        results.push({spin: i, lines: game.lines, bet: bet, totalBet: totalBet, credits: credits, details: prizes.map(item => `(${item.prize}) ${item.description}`).join(', '), mainPrize: mainPrize,
            bonus: bonus && bonus.bonusPrize, sbonus: sbonus, card_in: risk?.card_in, card_out: risk?.card_out, totalEarn: totalEarn, accumulated: accumulated});
    }

    return results;
}


export function Spin(symbols) {

    const itemMatrix = Array.from({length: 3}, () => Array(5).fill(null));

    for (let col = 0; col < 5; col++) {
        const colIdSymbols = [];
        for (let row = 0; row < 3; row++) {
            let symbol;
            do {
                symbol = RandomItem(symbols);
            } while (colIdSymbols.includes(symbol.id));
            colIdSymbols.push(symbol.id);
            itemMatrix[row][col] = symbol.id;
        }
    }

    let bonus = 0;
    const lst = [];
    let idcell = 0;
    const randomOrder = getRandomOrder();
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 3; row++) {
            lst.push({idcell: randomOrder[idcell], iditem: itemMatrix[row][col]});
            idcell += 1;

            if (itemMatrix[row][col] === 9)
                bonus++;
        }
    }

    return {symbols: lst, bonus: bonus >= 3};
}

function getRandomOrder() {
    const col1 = [1, 6, 11];
    const col2 = [2, 7, 12];
    const col3 = [3, 8, 13];
    const col4 = [4, 9, 14];
    const col5 = [5, 10, 15];

    // Shuffle an array in place
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(col1);
    shuffle(col2);
    shuffle(col3);
    shuffle(col4);
    shuffle(col5);

    const arrays = [col1, col2, col3, col4, col5];
    shuffle(arrays);

    // Combine all arrays into a single array
    const combined = arrays.flat();

    return combined;
}

export function Risk(percents, riskMaxBet, card_in) {
    let card_out = card_in;
    while (true) {
        const ia = randomNumber(2, 14); // Número aleatorio entre 2 y 14
        if (ia >= riskMaxBet)
            break;

        const values = [];
        for (let i = 0; i < 4; i++) {
            const cardValue = RandomItem(percents);
            values.push(cardValue.value);
        }
        const pick = values[randomNumber(0, 4)]
        if (pick > ia)
            card_out *= 2;
        else if (pick < ia) {
            card_out = 0;
            break;
        }
    }

    return {card_in: -card_in, card_out: card_out};
}

export function RandomItem(items) {
    const totalPossibility = items.reduce((sum, item) => sum + item.percent, 0);
    const randomValue = Math.random() * totalPossibility;
    let accumulativePossibility = 0;

    for (const item of items) {
        accumulativePossibility += item.percent;
        if (randomValue < accumulativePossibility) {
            return item;
        }
    }

    return items[items.length - 1];
}


function PrizeAnalyzer(number, spinResult) {
    const keysList = [];
    for (let i = 0; i < number; i++) {
        let keyData = "";
        lines[i].forEach(element => {
            const idSymbol = spinResult.symbols.find(x => x.idcell === element).iditem;
            keyData += idSymbol;

        })
        keysList.push(keyData);
    }

    let prizes = [];

    keysList.forEach(element => {
        const keys = generateCombinations(element);

        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            const prize = prizesCombinations.combinations[k];
            if (prize) {
                prizes.push(prize);
                break;
            }
        }
    });

    return prizes;
}

function Bonus(ropePossibility, totalBet, haveHat, prizes) {
    let bonusIndex = 0;
    let bonusPrize = 0;
    const maxPercent = prizes.reduce((sum, item) => sum + item.percent, 0);
    while (true) {
        if(bonusIndex > 4)
            break;

        if (randomNumber(0, 100) < ropePossibility[bonusIndex].percent)
            bonusPrize += selectBonusPrize(maxPercent, prizes);
         else if(haveHat)
            haveHat = false;
        else
            break;

        bonusIndex++;
    }
    return {bonusPrize: bonusPrize * totalBet, bonusIndex: bonusIndex};
}

function sBonus(prizes, probability, totalBet){
    const percent = randomNumber(0, 100);
    if(percent < probability){
        const item = RandomItem(prizes);
        return item.prize * totalBet;
    }
    return null;
}

function generateCombinations(str) {
    const substrings = [];
    substrings.push(str.slice(0, 5));
    substrings.push(str.slice(0, 4));
    substrings.push(str.slice(1, 5));
    substrings.push(str.slice(0, 3));
    substrings.push(str.slice(2, 5));
    return substrings;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectBonusPrize(maxPercent, prizeRopes) {
    const percent = randomNumber(0, maxPercent);
    let accumulation = 0;
    let prize = null;

    // Recorremos la lista de prizeropes
    for (const item of prizeRopes) {
        accumulation += item.percent;
        if (accumulation >= percent) {
            prize = item;
            break;
        }
    }
    // Generar un número aleatorio entre minPrize y maxPrize
    return randomNumber(prize.minPrize, prize.maxPrize);
}
