# Material Icon List

Simple material icon picker.

![Material icon picker](https://github.com/astone2014/material-libraries/blob/main/chrome_3p35FKoOLG.png?raw=true)

# Basic List
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

## More Information
* `icons.json` file is fetched from Google [fonts.google.com/metadata/fonts](https://fonts.google.com/metadata/fonts)
