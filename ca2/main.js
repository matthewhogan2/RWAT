import {ShapeCard} from './shapecard.js';


class game extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        const size = this.getAttribute('size');
        const dimensions= size.split('x');
        const rows = Number(dimensions[0]);
        const cols = Number(dimensions[1]);

        const totalCards = rows * cols;
        const pairs = totalCards/2;

        console.log('Rows:', rows, 'Columns:', cols, 'Total Cards:', totalCards, 'Pairs:', pairs);

        this.innerHTML= ShapeCard.getUniqueRandomCardsAsHTML(pairs, true);

        Array.from(this.getElementsByTagName('shape-card')).forEach((sc) =>{
            sc.addEventListener('click',() =>{
                sc.flip();
            });
        });






    }
}

customElements.define('game-play',game);





/************************ BEGINNING OF EXAMPLES *******************************/
/* example of generating several random unique cards
   with the use of static method getUniqueRandomCardsAsHTML  */

/*
document.body.innerHTML += `
    <h1>Generated unique cards</h1>
    <p>
        ${ShapeCard.getUniqueRandomCardsAsHTML(5, false)}
    </p>
`;
/* example of generating several random unique cards, each with a duplicate,
   also with the use of static method getUniqueRandomCardsAsHTML */

/*
document.body.innerHTML += `
    <h1>Generated unique cards with duplicates (use this in your application)</h1>
    <p>  
        ${ShapeCard.getUniqueRandomCardsAsHTML(6, true)}
    </p>
`;

/* example of flipping the cards:
   when clicked, the card is flipped and a message is sent to the console using
   the shape-card methods flip() and isFaceUp() *
document.querySelectorAll('shape-card').forEach(sc => sc.addEventListener('click', e => {
    e.target.flip();
    console.log("Shape card is face up:", e.target.isFaceUp());
}));
/************************ END OF EXAMPLES *******************************/
