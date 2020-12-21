const swapButton = document.getElementById('swapButton');
const primaryCurrency = document.getElementById('primaryCurrency');
const primaryCurrencyValue = document.getElementById('primaryCurrencyValue');
const secondaryCurrency = document.getElementById('secondaryCurrency');
const secondaryCurrencyValue = document.getElementById('secondaryCurrencyValue');
const rate = document.getElementById('rate');
const date = document.getElementById('date');

//Fetch exchange rate and update DOM
function calculate() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${primaryCurrency.value}`)
        .then(res => res.json()
            .then((data) => {
                date.innerText = 'Last updated: ' + data.date.toString().trim();
                rate.innerText = `1 ${primaryCurrency.value} = ${data.rates[secondaryCurrency.value]} ${secondaryCurrency.value}`; 
                secondaryCurrencyValue.value = (data.rates[secondaryCurrency.value] * primaryCurrencyValue.value).toFixed(5);
            }));
    
}

function swapCurrency() {
    const temp = primaryCurrency.value;
    primaryCurrency.value = secondaryCurrency.value;
    secondaryCurrency.value = temp;
    calculate();
}

//Event Listeners

primaryCurrency.addEventListener('change', calculate);
primaryCurrencyValue.addEventListener('input', calculate);
secondaryCurrency.addEventListener('change', calculate);

swapButton.addEventListener('click', function(e) {
    e.preventDefault();
    swapCurrency();
});

document.onload = calculate();