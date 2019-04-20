![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

# Table des matières

- [Import](#import)
	- [Format](#format)
	- [Actions](#actions)
- [Connect](#connect)

# Import

## Format

Pour garder une uniformité à travers les fichiers **JavaScript**, nous vous conseillons de conserver autant que possible le même ordre dans vos importations.

Notre suggestion est la suivante : 

 1. Librairies
 2. Componsants
 3. Actions
 4. Helpers
 5. Constantes

Exemple : 

```js
import react from "react";
import moment from "moment";

// Components
import Navigation from "../Navigation";
import Alert from "../Alert";
import { Button, Modal } from "../../components-ui";

// Helpers
import history from "../../history";

// Contants
import { ITEMS, DATA } from "./core/constants";
```

**Note** : Délimitez les sections à l'aide de commentaires. Chaque commentaire doit *contenir un mot* et ce mot doit *commencer par une majuscule*.

---

## Actions

Lorsque vous importez une action, il est préférable de la renommer de telle sorte à ce que le nom du composant soit intégré dans celle-ci : 

```js
import { connect } from "react-redux";

// Components
import Component from "./Component";

// Actions
import { show as showAlert } from "../../actions/alert";
import { fetchData as fetchDataForMyModule } from "../../modules/MyModule/core/actions"; 

const mapStateToProps = ({ component }) => ({ ...component });

const mapDispatchToProps = dispatch => ({
	showAlert: () => dispatch(showAlert())
	fetchDataForMyModule: () => dispatch(fetchDataForMyModule())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
```

Cela augmente la lisibilité du code et nous évitons les conflits de noms tels que : 

```js
// Pas souhaitable
import { show } from "../../actions/alert";
import { show } from "../../actions/navigation";

// Super!
import { show as showAlert } from "../../actions/alert";
import { show as showNavigation } from "../../actions/navigation";
```

---

# Connect

Il est possible de connecter plusieurs composants dans le même **Container**.

Utilisez le préfix `impc` pour importer un sous-composant et `exc` pour exporter celui-ci.

```js
import { connect } from  "redux";

// Components
import Alert from "./Alert";
import CloseBtnComponent from "./components/CloseBtn";
import SubmitBtnComponent from "./components/SubmitBtn";

// ...

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Alert);

export const CloseBtn = connect(
	mapStateToProps,
	mapDispatchToProps
)(CloseBtnComponent);

export const SubmitBtn = connect(
	mapStateToProps,
	mapDispatchToProps
)(SubmitBtnComponent);
```

La convention de nommage pour l'importation est la suivante :

> import {NomDuComposant}Composant from "./components/{NomDuComposant}";

Lors de l'exportation, nous conservons que le nom du sous-composant :

> export const {NomDuComposant} = connect( ... )({NomDuComposant}Composant);

Exemple :

```js
// Prefix : impc
import ListItemComponent from "./components/ListItem";

// Prefix : exc
export const ListItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(ListItemComponent);
```