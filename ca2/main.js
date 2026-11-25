import {ShapeCard} from './shapecard.js';
import {db} from './firebase.js';
import {collection,addDoc,serverTimestamp} from 'firebase/firestore';



class game extends HTMLElement {
    constructor(){
        super();

        this.firstCard = null;
        this.secondCard = null;
        this.clicks =0;
        this.matches =0;

    }

    connectedCallback() {
        const size = this.getAttribute('size');
        const dimensions= size.split('x');
        const rows = Number(dimensions[0]);
        const cols = Number(dimensions[1]);

        const totalCards = rows * cols;
        const pairs = totalCards/2;

        //cards into columns and rows
        this.style.display ='grid';
        this.style.gridTemplateColumns= `repeat(${cols}, 100px)`;
        this.style.gap = '10px';
        

        this.innerHTML= ShapeCard.getUniqueRandomCardsAsHTML(pairs, true);

        Array.from(this.getElementsByTagName('shape-card')).forEach((sc) =>{
            sc.addEventListener('click',() => {

                //keep matched cards up
                if(sc.isFaceUp()){
                    return;
                }

                if(this.firstCard === null){
                    this.firstCard = sc;
                    this.clicks++;
                    sc.flip();
                }

                else if(this.secondCard === null && sc !== this.firstCard){
                    this.secondCard = sc;
                    this.clicks++;
                    sc.flip();

                    if(this.firstCard.getAttribute('type')=== this.secondCard.getAttribute('type') && this.firstCard.getAttribute('colour')=== this.secondCard.getAttribute('colour')){
                        console.log('Match');

                        //set both card back to null so game can continue
                        this.firstCard = null;
                        this.secondCard = null;

                        this.matches++;

                        if(this.matches === pairs){

                            this.innerHTML = '';
                            this.style.display = 'block';

                            const message = document.createElement('p');  
                            message.innerText = 'You completed the game in ' + this.clicks + ' clicks!';
                            this.appendChild(message);

                            const restartButton = document.createElement('button');
                            restartButton.innerText = 'Play Again';
                            this.appendChild(restartButton);

                            restartButton.addEventListener('click', () => {
                                this.firstCard = null;
                                this.secondCard = null;
                                this.clicks = 0;
                                this.matches = 0;
                                
                                this.connectedCallback();

                            });

                            //stage 3: save the score to firestore 
                                addDoc(collection(db, 'click'),{
                                    clicks: this.clicks,
                                    timestamp: serverTimestamp()
                                }).then((error)=>{console.log('Saved')}).catch((error)=>{console.log('error saving:',error)});
                        
                        }
                    }

                    else{
                    console.log('Not a Match');

                    setTimeout(() => {
                        this.firstCard.flip();
                        this.secondCard.flip();

                        this.firstCard = null;
                        this.secondCard = null;
                    }, 500);

                }

            }

            });
        });

    }
}

customElements.define('game-play',game);

