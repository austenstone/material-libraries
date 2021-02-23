# MaterialIconList

Simple material icon picker.

![Material icon picker](https://github.com/astone2014/material-libraries/blob/master/chrome_3p35FKoOLG.png?raw=true)

# Getting Started
```typescript
<app-material-icon-list [(icon)]="icon"></app-material-icon-list>
```

## Menu
```typescript
<button mat-icon-button #menuTrigger="matMenuTrigger" [matMenuTriggerFor]="menu">
  <mat-icon>{{icon}}</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <app-material-icon-list [(icon)]="icon" (iconChange)="menuTrigger.closeMenu()"></app-material-icon-list>
</mat-menu>
```
## Customize
```typescript
<app-material-icon-list [(icon)]="icon" color="accent" appearance="standard"></app-material-icon-list>
```

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Code scaffolding

Run `ng generate component component-name --project material-icon-list` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project material-icon-list`.
> Note: Don't forget to add `--project material-icon-list` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build material-icon-list` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build material-icon-list`, go to the dist folder `cd dist/material-icon-list` and run `npm publish`.

## Running unit tests

Run `ng test material-icon-list` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
