# Nested menu

Dynamic nested menu for undefined levels, extended from Angular Material menu component.

## Get started

### Clone the repo

```shell
git clone https://github.com/narci90/nested-menu.git
cd nested-menu
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
```

### Local server start

Start the dev server by running the command below. Navigate to `http://localhost:4200/`.

```shell
npm start
```

#### npm scripts

These are the most useful commands defined in `package.json`:

- `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
- `npm run build` - runs the TypeScript compiler and asset copier once.
- `npm run build:watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.
- `npm test` - builds the application and runs Intern tests (both unit and functional) one time.
- `npm run lint` - runs `eslint` on the project files.
- `npm run lint:fix` - runs `eslint fix` on the project files.
- `npm run prettier` - runs `prettier write` on the project files.

## Usage example

### Import module

Import the `NestedMenuModule` module into the module where you want to make use of it.

app.module.ts

```ts
...
import { NestedMenuModule } from './components';


@NgModule({
  ...
  imports: [NestedMenuModule],
})
export class AppModule {}
```

### Use the nested-menu in your component

app.component.html

```html
<nested-menu [items]="itemsMenu">
  <button>Menu</button>
</nested-menu>
```

app.component.ts

```ts
  import { NestedMenuItem } from './components/nested-menu';
  ...

  class AppComponent {

    itemsMenu: NestedMenuItem[] = [
      {
        name: 'Drink',
        id: 1,
        parentId: null
      },
      {
        name: 'Food',
        id: 2,
        parentId: null
      },
      {
        name: 'Without alcohol',
        id: 10,
        parentId: 1,
        disabled: true
      },
      {
        name: 'With alcohol',
        id: 11,
        parentId: 1,
        route: '/detail',
        params: ['With alcohol']
      }
    ];
    ...
```
