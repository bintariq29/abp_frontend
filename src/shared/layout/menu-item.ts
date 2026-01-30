import { Injector } from "@node_modules/@angular/core";
import { FeatureCheckerService } from "@node_modules/abp-ng2-module";

export class MenuItem {
    id: number;
    parentId: number;
    label: string;
    route: string;
    icon: string;
    permissionName: string;
    featureName: string;
    isActive?: boolean;
    isCollapsed?: boolean;
    children: MenuItem[];


    constructor(
        label: string,
        route: string,
        icon: string,
        permissionName: string = null,
        children: MenuItem[] = null,
        featureName: string = null,
    ) {
        this.label = label;
        this.route = route;
        this.icon = icon;
        this.permissionName = permissionName;
        this.children = children;
        this.featureName = featureName;

    }
}
