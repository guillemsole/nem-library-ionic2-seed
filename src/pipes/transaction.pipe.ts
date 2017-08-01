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
import {Pipe, PipeTransform} from "@angular/core";
import {MultisigTransaction, Transaction, TransactionTypes} from "nem-library";

@Pipe({name: 'transactionType'})
export class TransactionTypePipe implements PipeTransform {

    transform(transaction: Transaction): string {
        switch (transaction.type) {
            case TransactionTypes.TRANSFER:
                return "Transfer transaction"
            case TransactionTypes.IMPORTANCE_TRANSFER:
                return "Importance transaction"
            case TransactionTypes.MOSAIC_DEFINITION_CREATION:
                return "Mosaic creation"
            case TransactionTypes.MOSAIC_SUPPLY_CHANGE:
                return "Mosaic edition"
            case TransactionTypes.PROVISION_NAMESPACE:
                return "Namespace creation"
            case TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION:
                return "Create multisig account"
            case TransactionTypes.MULTISIG:
                if ((<MultisigTransaction>transaction).otherTransaction.type == TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION) {
                    return "Edit multisig account"
                }
                return "Multisig - " + this.transform((<MultisigTransaction>transaction).otherTransaction);
        }
    }
}
