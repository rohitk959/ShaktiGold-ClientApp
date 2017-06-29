import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CartPage } from '../pages/cart/cart';
import { AccountPage } from '../pages/account/account';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { ItemListPage } from '../pages/item-list/item-list';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { OrdersPage } from '../pages/orders/orders';
import { NotificationsPage } from '../pages/notifications/notifications';

import { PopoverContent } from '../pages/popover-content/popover-content';

import { AuthService } from '../providers/auth-service';
import { CategoryService } from '../providers/category-service';
import { ItemService } from '../providers/item-service';
import { GlobalFunctions } from'../providers/global-functions'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,    
    CartPage,
    AccountPage,
    AboutPage,
    TabsPage,
    SubcategoryPage,
    ItemListPage,
    ItemDetailPage,
    ChangePasswordPage,
    UpdateProfilePage,
    OrdersPage,
    NotificationsPage,
    PopoverContent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__shaktiGold',
         driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,    
    CartPage,
    AccountPage,
    AboutPage,
    TabsPage,
    SubcategoryPage,
    ItemListPage,
    ItemDetailPage,
    ChangePasswordPage,
    UpdateProfilePage,
    OrdersPage,
    NotificationsPage,
    PopoverContent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              StatusBar,
              SplashScreen,
              AuthService, 
              CategoryService, 
              ItemService,
              GlobalFunctions
              ]
})
export class AppModule {}
