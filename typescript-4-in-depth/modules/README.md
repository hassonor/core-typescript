## Modules

___

### Reasons to Use Modules:

* They are modular
* Maintainable
* Reusable
* Native to Node and ES2015
* Organized simply in files and folders.

### Exporting from a Module

(periodicals.ts)

```ts (periodicals.ts)
/** Option 1 **/

export interface Periodical {
    issueNumber: number;
}

export class Magazine implements Periodical {
    issueNumber: number;
}

export function GetMagazineByIssueNumber(issue: number): Magazine {
    // retrieve and return a magazine
}
```

(periodicals.ts)

```ts 
/** Option 2 **/

interface Periodical {
    issueNumber: number;
}

class Magazine implements Periodical {
    issueNumber: number;
}

function GetMagazineByIssueNumber(issue: number): Magazine {
    // retrieve and return a magazine
}

export {Periodical, Magazine, GetMagazineByIssueNumber as GetMag}
```

### Importing from a Module

`news.ts`

```ts
import {Magazine, GetMag as GetMagazine} from './periodicals';

let newsMag: Magazine = GetMagazine('Weekly News');
```

`tech12.ts`

```ts
import * as mag from './perdiocals';

let techMag: mag.Magazine = mag.GetMag('React Native Stuff!');
```

### Default Exports

`movies.ts`

```ts
export default class {
    title: string;
    director: string;
}
```

`kids.ts`

```ts
import AnimatedMovie from './movie';

let cartoon = new AnimatedMovie();
```