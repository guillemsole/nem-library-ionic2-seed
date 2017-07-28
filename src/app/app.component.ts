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


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {

  allTransactions: Transaction[] = [];
  allTransactionsPaginated: Pageable<Transaction[]>;

  constructor(accountHttp: AccountHttp,
              confirmedTransactionListener: ConfirmedTransactionListener
  ) {

    const address = new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA");

    this.allTransactionsPaginated = accountHttp.allTransactionsPaginated(address, undefined, 5);
    this.allTransactionsPaginated.subscribe(transactions => {
      this.allTransactions = this.allTransactions.concat(transactions);
    });

    confirmedTransactionListener.given(address).subscribe(transaction => {
      this.allTransactions.unshift(transaction);
    })
  }

  open() {
    this.allTransactionsPaginated.nextPage();
  }
}

