import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
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

import { AuthService } from '../providers/auth-service';
import { CategoryService } from '../providers/category-service';
import { ItemService } from '../providers/item-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,    
    HomePage,
    CartPage,
    AccountPage,
    AboutPage,
    TabsPage,
    SubcategoryPage,
    ItemListPage,
    ItemDetailPage,
    ChangePasswordPage,
    UpdateProfilePage,
    OrdersPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,    
    HomePage,
    CartPage,
    AccountPage,
    AboutPage,
    TabsPage,
    SubcategoryPage,
    ItemListPage,
    ItemDetailPage,
    ChangePasswordPage,
    UpdateProfilePage,
    OrdersPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, CategoryService, ItemService]
})
export class AppModule {}
