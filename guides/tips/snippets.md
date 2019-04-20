![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

# Table des matières

- [Description](#description)
- [Installation](#installation)
- [Javascript](#javascript)
  - [Base](#base)
  - [React](#react)
  - [Redux](#redux)
  - [Templates](#templates)
- [SASS](#sass)

# Description

Un _snippet_ est une portion réutilisable de code source ou de texte. Ceux-ci permettent de travailler plus efficacement en écrivant moins de code (à la main).

**Visual Studio Code** permet la création et l'usage de _snippets_. Il faut les installer à partir de l'onglet **Extensions** ou les créer soi-même.

Nous suggérons fortement l'usage des _snippets_ crées ici au laboratoire, car cela permet :

1. De coder plus vite.
2. D'apprendre les bonnes pratiques **React** exercées au laboratoire.
3. De générer les squelettes de plusieurs fichiers **JavaScript** et **SASS** (_templates_).

# Installation

Les _snippets_ sont disponibles automatiquement lorsque vous ouvrez **Visual Studio Code** à la racine du projet.

Les _snippets_ se situent dans le dossier suivant :

> \_\_root\_\_ / .vscode /

Pour en savoir d'avantage, une description de chaque _snippet_ est disponible ci-bas.

# Javascript

## Base

**name** : *Base :: Code Separateur*
**prefix** : `sep`
**body**:

```js
// ------------------------------------------------------
```

---

**name** : *Base :: Code Separateur 2*
**prefix** : `sep2`
**body**:

```js
// ====================================================
```

---

**name** : *Base :: Console Log*
**prefix** : `cl`
**body**:

```js
console.log($1);
$0;
```

---

**name** : *Base :: Import*
**prefix** : `impf`
**body**:

```js
import { $2 } from "${1}";
$0;
```

---

**name** : *Base :: Import Component to Connect it*
**prefix** : `impc`
**body**:

```js
import ${1:Name}Component from "./components/${1:Name}";
$0;
```

---

**name** : *Base :: Import Default*
**prefix** : `impd`
**body**:

```js
import ${2:Component} from "$1";
$0;
```

---

**name** : *Base :: Export*
**prefix** : `ex`
**body**:

```js
export const ${1:name} = $0;
```

---

**name** : *Base :: Export Default*
**prefix** : `exd`
**body**:

```js
export default $0;
```

---

**name** : *Base :: Export Default As*
**prefix** : `exda`
**body**:

```js
export { default as ${2:Component} } from "$1";
$0;
```

---

**name** : *Base :: Export Connected Component*
**prefix** : `exc`
**body**:

```js
export const ${1:Name} = connect(
  mapStateToProps,
  mapDispatchToProps
)(${1:Name}Component);
$0;
```

---

**name** : *Base :: Class Constructor*
**prefix** : `con`
**body**:

```js
constructor(props) {
  super(props);
  $0
}
```

---

**name** : *Base :: Arrow Function*
**prefix** : `fn`
**body**:

```js
$1 => $0;
```

---

**name** : *Base :: Arrow Function (with body)*
**prefix** : `fnb`
**body**:

```js
$1 => {
  $0;
};
```

---

**name** : *Base :: Arrow Function (returns objet)*
**prefix** : `fno`
**body**:

```js
$1 => ({ $2 });
$0;
```

---

**name** : *Base :: Arrow Function (dispatch)*
**prefix** : `fnd`
**body**:

```js
($1) => dispatch({${2:action}($3));$0
```

---

**name** : *Base :: For Loop*
**prefix** : `forloop`
**body**:

```js
for (let ${1:i} = ${2:0}; $1 < ${3:length}; $1 += 1) {
  const ${4:element} = ${5:array}[$1];
}
```

---

## React

**name** : *React :: Component Props*
**prefix** : `props`
**body**:

```js
this.props.$0;
```

---

**name** : *React :: Component State*
**prefix** : `state`
**body**:

```js
this.state.$0;
```

---

**name** : *React :: Destructure From Props*
**prefix** : `dfp`
**body**:

```js
const { $1 } = this.props;
$0;
```

---

**name** : *React :: Destructure From State*
**prefix** : `dfs`
**body**:

```js
const { $2 } = this.state;
$0;
```

---

**name** : *React :: Destructure From Object*
**prefix** : `dfo`
**body**:

```js
const { $2 } = $1;
$0;
```

---

**name** : *React :: Component Proptypes*
**prefix** : `cpt`
**body**:

```js
${1:${TM_FILENAME_BASE}}.propTypes = { $0 };
```

---

**name** : *React :: Component Default Props*
**prefix** : `cdp`
**body**:

```js
${1:${TM_FILENAME_BASE}}.defaultProps = { $0 };
```

---

**name** : *React :: Component Did Mount*
**prefix** : `cdm`
**body**:

```js
componentDidMount() {
  $0
}
```

---

**name** : *React :: Should Component Update*
**prefix** : `scu`
**body**:

```js
shouldComponentUpdate() {
  $0
}
```

---

**name** : *React :: Component Did Update*
**prefix** : `cdup`
**body**:

```js
componentDidUpdate() {
  $0
}
```

---

**name** : *React :: Component Will Unmount*
**prefix** : `cwun`
**body**:

```js
componentWillUnmount() {
  $0
}
```

---

## Redux

**name** : *Redux :: Dispatch*
**prefix** : `dispatch`
**body**:

```js
dispatch(${1:action}($0));
```

---

**name** : *Redux :: Map State to Props*
**prefix** : `maps`
**body**:

```js
const mapStateToProps = ({ $1 }) => ({ $0 });
```

---

**name** : *Redux :: Map Dispatch to Props*
**prefix** : `mapd`
**body**:

```js
const mapDispatchToProps = ({ $1 }) => ({ $0 });
```

---

**name** : *React :: Get Component Modifiers*
**prefix** : `cgm`
**body**:

```js
getComponentModifiers() {
  const { $2 } = this.${1:props};
  let modifiers = ${0:""};
  return modifiers;
}
```

---

## Templates

**name** : *Template :: React Component*
**prefix** : `t_component`
**body**:

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class ${1:${TM_FILENAME_BASE}} extends Component {
  render() {
    return (
      <${4:div} className="${3:c}-$2">
        $0
      </${4:div}>
    );
  }
}

${1:${TM_FILENAME_BASE}}.propTypes = {};

export default ${1:${TM_FILENAME_BASE}};
```

---

**name** : *Template :: Redux Container*
**prefix** : `t_container`
**body**:

```js
import { connect } from "react-redux";

// Components
import ${1:Component} from "./${1:Component}";

const mapStateToProps = ({ $2 }) => ({$3});

const mapDispatchToProps = dispatch => ({$0});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(${1:Component});
```

---

**name** : *Template :: Redux Action*
**prefix** : `t_action`
**body**:

```js
// ====================================================
// Actions / ${TM_FILENAME_BASE/([a-z])/${1:/upcase}/}
// ====================================================

// Constants
import { ${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_ACTION_TYPES } from "./actions";

// Actions
// ====================================================

export const ${3:action} = () => ({$0});
```

---

**name** : *Template :: Redux Action (Module)*
**prefix** : `t_action_module`
**body**:

```js
// ====================================================
// Modules / ${TM_DIRECTORY/(?:.*)modules\\W([a-zA-Z]*)(?:.*)/$1/} / Core / Actions
// ====================================================

// Constants
export const ACTION_TYPES = {
  $1
};

// Actions
// ====================================================

export const ${3:action} = () => ({$0});
```

---

**name** : *Template :: Redux Reducer*
**prefix** : `t_reducer`
**body**:

```js
// ====================================================
// Reducers / ${TM_FILENAME_BASE/([a-z]*)(?:.*)/${1:/capitalize}/}
// ====================================================

// Constants"
import { ${TM_FILENAME_BASE/([a-z]*).*/${1:/upcase}/}_ACTION_TYPES } from "../actions/actions";

// Initial State
const initialState = {$0};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

---

**name** : *Template :: Redux Reducer (Module)*
**prefix** : `t_reducer_module`
**body**:

```js
// ====================================================
// Modules / ${TM_DIRECTORY/(?:.*)modules\\W([a-zA-Z]*)(?:.*)/$1/} / Core / Reducer
// ====================================================

// Constants"
import { ACTION_TYPES } from "./actions";

// Initial State
const initialState = { $0 };

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

# SASS

**name** : *Base :: Code Separator*
**prefix** : `sep`
**body**:

```js
// ====================================================
```

---

**name** : *Base :: Formated Variable*
**prefix** : `var`
**body**:

```js
$${1:${TM_FILENAME_BASE/_(.*)/$1/}}--${2:prop-name}: $0;
```

---

**name** : *Darken Color*
**prefix** : `darken`
**body**:

```js
darken($${1:var-name}, ${0:10}%);
```

---

**name** : *Lighten Color*
**prefix** : `ligthen`
**body**:

```js
lighten($${1:var-name}, ${0:10}%);
```

---

**name** : *Template :: SASS File*
**prefix** : `t_sass`
**body**:

```js
// ======================================================
// ${TM_DIRECTORY/.*scss\\W([a-z]*)/${1:/capitalize}/} / ${TM_FILENAME_BASE/_(.*)/${1:/capitalize}/}
// ======================================================

.${2:c}-${TM_FILENAME_BASE/_(.*)/$1/} {$0}
```

---
