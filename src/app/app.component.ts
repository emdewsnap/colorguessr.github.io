import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient){ }
  title = 'color-guess';
  guesses = -1;
  r = -1;
  g = -1;
  b = -1;
  playing = false;
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
    let guessCounter = document.getElementById("guesses");
    if(guessCounter !== null){
      guessCounter.innerHTML = `Guesses: ${this.guesses}`;
    }

    let table = document.getElementById("rgbGuesses");

    if(table !== null){
      table.innerHTML += `<tr><td>${guessR}</td><td>${guessG}</td><td>${guessB}</td></tr>`;
    }

    let redRes = Math.abs(guessR - this.r);
    let greenRes = Math.abs(guessG - this.g);
    let blueRes = Math.abs(guessB - this.b);

    let redField = document.getElementById("red");
    let greenField = document.getElementById("green");
    let blueField = document.getElementById("blue");

    let highlow = document.getElementById("highlow");

    this.hotOrCold(redField, redRes);

    this.hotOrCold(greenField, greenRes);

    this.hotOrCold(blueField, blueRes);

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

      if(rhl === "correct" && ghl === "correct" && bhl === "correct"){
        this.victory(<HTMLInputElement>document.getElementById("red"), <HTMLInputElement>document.getElementById("green"), <HTMLInputElement>document.getElementById("blue"));
      }
    }
  }

  playAudio(){
    let mButton = document.getElementById("musicButton");
    let audio = <HTMLAudioElement>document.getElementById("musicAud");
    if(mButton !== null && audio !== null){
      if(!this.playing){
        mButton.innerHTML = "Turn Music Off";
        this.playing = true;
        audio.load();
        audio.play();
      }
      else{
        mButton.innerHTML = "Turn Music On";
        this.playing = false;
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }

  hotOrCold(entryField: HTMLElement | null, closeness: number){
    if(entryField !== null){
      if(closeness > 100){
        entryField.style.backgroundColor = "red";
      }
      else if(closeness <= 100 && closeness > 50){
        entryField.style.backgroundColor = "orange";
      }
      else if(closeness <= 50 && closeness > 0){
        entryField.style.backgroundColor = "yellow";
      }
      else{
        entryField.style.backgroundColor = "green";
      }
    }
  }

  victory(red: HTMLInputElement, green: HTMLInputElement, blue: HTMLInputElement){
    let victory = document.getElementById("victory");
    let colorName = document.getElementById("colorName");
    let submit = <HTMLInputElement>document.getElementById("sub")
    if(victory !== null && colorName !== null && submit !== null){
      victory.innerHTML = "Congrats!"
      red.disabled = true;
      green.disabled = true;
      blue.disabled = true;
      submit.disabled = true;
      let url = `https://www.thecolorapi.com/id?rgb=(${red.value},${green.value},${blue.value})`;
      this.http.get<any>(url).subscribe({
        next: data => {
          console.log(data.name.value);
          if(colorName !== null){
            colorName.innerHTML = `Your color was: ${data.name.value}`;
          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    }
  }

}
