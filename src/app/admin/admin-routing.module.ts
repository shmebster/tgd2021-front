import { NgModule } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterModule,
    RouterStateSnapshot,
    Routes,
    UrlTree
} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { Observable, of } from "rxjs";

export class AdminGuard implements CanDeactivate<HomeComponent> {

    constructor(
    ) {
    }

    canDeactivate(component: HomeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return of(false);
    }

}


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canDeactivate: [AdminGuard],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AdminGuard],
})
export class AdminRoutingModule {}


