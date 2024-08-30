let deck_id = undefined;
let text = document.getElementById('text');
let text2 = document.getElementById('text2')


function generateDeck() {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            text.innerHTML = "Ready to draw cards";
            text2.innerHTML = `${data.remaining} cards remain`
            deck_id = data.deck_id;
            if (!deck_id) {
                throw new Error('Error generating deck');
            }
        })
        .catch(error => {
            console.log('Error generating deck');
            alert('Error generating deck');
        });
}

function drawCard() {
    if (!deck_id) {
        alert('Please generate a deck first');
        text.innerText = "Please generate a deck first.";
        return;
    }

    fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
            if (data.cards.length > 0) {
                const imgEl = document.getElementById('cardImg');
                const cardPng = data.cards[0].image;
                imgEl.src = cardPng;
                imgEl.style.display = 'block';
                text2.innerHTML = `${data.remaining} cards remain`;
                text.innerHTML = `${data.cards[0].value} of ${data.cards[0].suit}`;
            } else {
                console.log('no more cards :(')
            }
        })
        .catch(error => {
            console.error('Error drawing card:', error);
        });
}
