import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'color-guess';
  guesses = -1;
  r = -1;
  g = -1;
  b = -1;
  ngOnInit(): void {
    this.guesses = 0;
    let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    if(ctx !== null){
      console.log(`R: ${this.r}, G: ${this.g}, B:${this.b}`);
      ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      ctx.fillRect(0,0, 1000, 500);
    }
  }

  onSubmit(event:Event){
    event.preventDefault();
    let guessR = parseInt((<HTMLInputElement>document.getElementById("red")).value);
    let guessG = parseInt((<HTMLInputElement>document.getElementById("green")).value);
    let guessB = parseInt((<HTMLInputElement>document.getElementById("blue")).value);
    console.log(`RedGuess: ${guessR}, GreenGuess: ${guessG}, GuessBlue: ${guessB}`);
    this.guesses++;
    console.log(this.guesses);
    let guessCounter = document.getElementById("guesses");
    if(guessCounter !== null){
      guessCounter.innerHTML = `Guesses: ${this.guesses}`;
    }

    let redRes = Math.abs(guessR - this.r);
    let greenRes = Math.abs(guessG - this.g);
    let blueRes = Math.abs(guessB - this.b);

    let redField = document.getElementById("red");
    let greenField = document.getElementById("green");
    let blueField = document.getElementById("blue");

    let highlow = document.getElementById("highlow");

    if(redField !== null){
      if(redRes > 100){
        redField.style.backgroundColor = "red";
      }
      else if(redRes <= 100 && redRes > 50){
        redField.style.backgroundColor = "orange";
      }
      else if(redRes <= 50 && redRes > 0){
        redField.style.backgroundColor = "yellow";
      }
      else{
        redField.style.backgroundColor = "green";
      }
    }

    if(greenField !== null){
      if(greenRes > 100){
        greenField.style.backgroundColor = "red";
      }
      else if(greenRes <= 100 && greenRes > 50){
        greenField.style.backgroundColor = "orange";
      }
      else if(greenRes <= 50 && greenRes > 0){
        greenField.style.backgroundColor = "yellow";
      }
      else{
        greenField.style.backgroundColor = "green";
      }
    }

    if(blueField !== null){
      if(blueRes > 100){
        blueField.style.backgroundColor = "red";
      }
      else if(blueRes <= 100 && blueRes > 50){
        blueField.style.backgroundColor = "orange";
      }
      else if(blueRes <= 50 && blueRes > 0){
        blueField.style.backgroundColor = "yellow";
      }
      else{
        blueField.style.backgroundColor = "green";
      }
    }

    if(highlow !== null){
      let rhl = "";
      let ghl = "";
      let bhl = "";

      if(guessR > this.r) rhl = "high";
      else if(guessR < this.r) rhl = "low";
      else rhl = "correct";

      if(guessG > this.g) ghl = "high";
      else if(guessG < this.g) ghl = "low";
      else ghl = "correct";

      if(guessB > this.b) bhl = "high";
      else if(guessB < this.b) bhl = "low";
      else bhl = "correct";

      highlow.innerHTML = `Red: ${rhl}. Green: ${ghl}. Blue: ${bhl}`;
    }
  }

  

}
