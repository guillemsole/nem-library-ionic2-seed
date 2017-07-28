import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AppComponent} from "./app.component";
import {AccountHttpProvider} from "../providers/AccountHttpProvider";
import {AccountHttp, ConfirmedTransactionListener, NEMLibrary, NetworkTypes} from "nem-library";
import {ConfirmedTransactionListenerProvider} from "../providers/ConfirmedTransactionListenerProvider";

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AccountHttp, useFactory: AccountHttpProvider},
    {provide: ConfirmedTransactionListener, useFactory: ConfirmedTransactionListenerProvider},
  ]
})
export class AppModule {}
