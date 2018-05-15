import { Routes } from '@angular/router';
import { MainComponent } from './components';
import { AuthGuard } from './auth.guard';
import {
    LoginComponent,
    CreateNodeComponent,
    CreateOrgComponent,
    CreateClassComponent,
    CreatePrincipalComponent,
    NodeDetailsComponent,
    ProductRegComponent,
    GenerateCodeComponent,
    RegistrationStatusComponent,
    LicenseTermComponent,
    CreateLicenseAssetComponent,
    CreateAssetComponent,
    AccountComponent,
    AccountNewComponent,
    SignupComponent,
    AccountExistingComponent,
    LicenseComponent

} from './components';

export const ROUTES: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'logout', redirectTo: 'login', pathMatch: 'full' },
{ path: 'signup', component: SignupComponent },
{ canActivate: [AuthGuard], path: 'license', component: LicenseComponent},
{ canActivate: [AuthGuard], path: 'warranty/:app/:brand/:sno/:tokenId', component: ProductRegComponent},
{ canActivate: [AuthGuard], path: 'account', component: AccountComponent },
{ canActivate: [AuthGuard], path: 'accountexist', component: AccountExistingComponent },
{ canActivate: [AuthGuard], path: 'accountcreate', component: AccountNewComponent },
{ canActivate: [AuthGuard], path: 'generate', component: GenerateCodeComponent},
{ canActivate: [AuthGuard], path: 'registrationstatus', component: RegistrationStatusComponent},
{ canActivate: [AuthGuard], path: 'createlicense', component: LicenseTermComponent},
{ canActivate: [AuthGuard], path: 'createassetlicense', component: CreateLicenseAssetComponent},
{ canActivate: [AuthGuard], path: '', component:  MainComponent, children: [
    { canActivate: [AuthGuard], path: 'createnode', component: CreateNodeComponent, children: [
      { canActivate: [AuthGuard], path: 'Organisation', component: CreateOrgComponent},
      { canActivate: [AuthGuard], path: 'Class', component: CreateClassComponent},
      { canActivate: [AuthGuard], path: 'Principal', component: CreatePrincipalComponent},
      { canActivate: [AuthGuard], path: 'Asset', component: CreateAssetComponent}
      ]
    },
  ]
},
{ canActivate: [AuthGuard], path: 'nodedetails' , component: NodeDetailsComponent}

];
