/*
 * MIT License
 *
 * Copyright (c) 2017 Aleix Morgadas <aleixmorgadas@openmailbox.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {Component} from "@angular/core";
import {AccountHttp, Address, ConfirmedTransactionListener, Transaction, Pageable} from "nem-library";
import {Subscription} from "rxjs/Subscription";
import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // Listeners
  confirmedTransactionsSubscription: Subscription;

  allTransactions: Transaction[] = [];
  allTransactionsPaginated: Pageable<Transaction[]>;

  allTransactionsActive: boolean = false;

  constructor(private accountHttp: AccountHttp,
              private confirmedTransactionListener: ConfirmedTransactionListener,
              public alertCtrl: AlertController
  ) {

  }

  fetchMoreTransactions() {
    this.allTransactionsPaginated.nextPage();
  }

  startFetchingTransactions(address_raw: string) {
    try {
      let address = new Address(address_raw.trim());

      this.allTransactionsPaginated = this.accountHttp.allTransactionsPaginated(address, undefined, 5);

      this.allTransactionsPaginated.subscribe(transactions => {
        this.allTransactions = this.allTransactions.concat(transactions);
      });

      if (this.confirmedTransactionsSubscription) this.confirmedTransactionsSubscription.unsubscribe();

      this.confirmedTransactionsSubscription = this.confirmedTransactionListener.given(address).subscribe(transaction => {
        this.allTransactions.unshift(transaction);
      });
    } catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Malformed address!',
        subTitle: 'Address must be testnet network and in correct format',
        buttons: ['OK']
      });
      alert.present();
    }
  }
}

