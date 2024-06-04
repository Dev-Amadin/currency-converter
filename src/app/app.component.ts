import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterService } from './currency-converter.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, ReactiveFormsModule, DecimalPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Currency Converter';
  currencies = new Array;
  toValue = 0;

  converterForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required)
  })

  converterService = inject(CurrencyConverterService);

  ngOnInit(): void {
    this.getCurrencies();
  }


  getCurrencies() {
    this.converterService.getCurrencies().subscribe(curr => {
      this.currencies = Object.entries(curr).map(([code, name]) => ({ code, name }));
    })
  }

  convert() {
    this.converterService.convert(this.converterForm.value).subscribe({
      next: value => {
        if(value){
          let result:any = value;
          let rates = Object.entries(result.rates).map(([code, value]) => ({ code, value }));
          this.toValue = Number(rates[0].value);
        }
             },
      error: e => {
        console.log("Error => ",e)
        alert(e.message);
      }
    })
  }

  clear(){
    this.converterForm.reset();
    this.toValue = 0;
  }
}
