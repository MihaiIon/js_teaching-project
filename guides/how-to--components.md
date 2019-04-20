![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

# Table des matières

- [Prérequis](#prerequis)
- [Composant](#composant)
- [Sections](#sections)
- [PropTypes](#proptypes)
- [Astuces](#astuces)
  - [This](#this)
  - [Passer les Propriétés](#passer-les-propriétés)
  - [Modifiers](#modifiers)
  - [Composants auxiliaires](#composants-auxiliaires)

---

# Prérequis

Avant de poursuivre votre lecture, il est conseillé :

1. Installer les **snippets** JavaScript.

> [\_\_root\_\_ / docs / tips / snippets.md](../tips/snippets.md)

2. Avoir lu les différentes recommandations concernant l'importation et l'exportation d'objets JavaScript.

> [\_\_root\_\_ / docs / guides / how-to--import-export.md](./how-to--import-export.md)

3. Puis finalement, il faut avoir une bonne compréhension de la methodologie **BEM**.

> [\_\_root\_\_ / docs / guides / how-to--BEM.md](./how-to--BEM.md)

---

# Composant

Tout composant doit avoir un nom (PascalCase) et son propre fichier Javascript.

Par exemple, si notre composant se nomme `MyComponent`, son fichier doit être nommer : `MyComponent.js`.

Ayant installé les **snippets**, vous pouvez générer votre premier composant avec le préfix suivant : `tmp_component`.

--

#### Résultat

**Fichier** : _MyComponent.js_

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  render() {
    return <div className="c-my-component" />;
  }
}

MyComponent.propTypes = {};

export default MyComponent;
```

--

Notez que la valeur de la propriété `className` a été choisie afin de respecter les conventions **BEM**.

---

# Sections

Pour garder le code organisé, il conseillé de séparer votre code en _4 sections_ :

- Le Constructeur.
- Les méthodes du cycle de vie du composant (Life Cycle).
- Les méthodes autres (Methods).
- Les méthodes `render` (Render).

--

#### Exemple

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProp: false
    };
  }

  // ------------------------------------------------------
  // Life Cycle

  componentDidMount() {
    const { myProp } = this.state;
    this.setState({ myProp: true });
  }

  // ------------------------------------------------------
  // Methods

  onClickHandler() {
    const { myProp } = this.state;
    const { receivedProp } = this.props;
    this.setState({ myProp: receivedProp > 0 ? myProp : !myProp });
  }

  // ------------------------------------------------------
  // Render

  render() {
    const handler = () => this.onClickHandler();
    return <div className="c-my-component" onClick={handler} />;
  }
}

MyComponent.propTypes = {
  receivedProp: PropTypes.number.isRequired
};

export default MyComponent;
```

--

**Note** : Utilisez le **snippet** `sep` pour créer les séparateurs.

> // ------------------------------------------------------

---

# PropTypes

Il y a une série de **snippets**, qui ne sont pas mentionnés dans la documentation, qui aident grandement à écrire les **PropTypes**. Par exemple, le préfix `ptnr` nous donnera :

```js
MyComponent.propTypes = {
  receivedProp: PropTypes.number.isRequired // ptnr
};
```

Cette série de **snippets** est construite de la façon suivante :

`[pt : PropTypes] [Type] [(r)? : isRequired]`

Donc nous avons :

- **ptb** : PropTypes.bool
- **ptbr** : PropTypes.bool.isRequired
- **pts** : PropTypes.string
- **ptsr** : PropTypes.string.isRequired
- etc.

La liste complète des snippets de cette série est [disponible ici](https://github.com/cobeia/airbnb-react-snippets).

---

# Astuces

### This

Le mot clé `this` ne fonctionne pas tout à fait comme dans d'autres languages de programmation. Regardons l'exemple suivant :

```js
class ExampleComponent extends Component {
  onClickHandler() {
    console.log(this);
  }

  render() {
    return <article className="c-example-component" onClick={this.onClickHandler} />;
  }
}
```

Dans cet exemple, le `this` perd la référence de la classe `ExampleComponent` et pointe maintenant vers l'élément `article`.

Cela signifie que lorsque nous utilisons le mot clé `this` à l'intérieur de notre méthode `onClickHandler`, JavaScript essayera d'accéder aux propriétés/méthodes de l'élément `article`.

Pour régler la situation, il faut encapsuler la référence du `this` dans une fonction anonyme :

```js
class ExampleComponent extends Component {
  onClickHandler() {
    console.log(this);
  }

  render() {
    const handler = () => this.onClickHandler();
    return <article className="c-example-component" onClick={handler} />;
  }
}
```

---

### Passer les propriétés

À certaines occasions, vous allez avoir besoin de passer plusieurs propriétés à un sous-composant :

```js
class Header extends Component {
  render() {
    const { activeLink, isVisible, isWhite, isLoaded, isShrinked } = this.props;
    return (
      <header className="c-header">
        <Navigation
          activeLink={activeLink}
          isWhite={isWhite}
          isVisible={isVisible}
          isLoaded={isLoaded}
          isShrinked={isShrinked}
        />
      </header>
    );
  }
}
```

Il se peut que le code devienne vite difficile à lire ou très long. Une solution simple, qui allège le code, est d'utiliser l'opérateur `...` :

```js
class Header extends Component {
  render() {
    const { activeLink, isVisible, isWhite, isLoaded, isShrinked } = this.props;
    const navProps = { activeLink, isVisible, isWhite, isLoaded, isShrinked };
    return (
      <header className="c-header">
        <Navigation {...navProps} />;
      </header>
    );
  }
}
```

---

### Modifiers

Comme nous travaillons avec la méthodologie **BEM**, les composants peuvent changer d'état à l'aide de _modifiers_. Des problèmes surviennent lorsque le composant commence à avoir beaucoup d'états (3 ou plus). Regardons un exemple :

```js
class Header extends Component {
  render() {
    const { isVisible, isWhite, isShrinked } = this.props;
    const navProps = { isVisible, isWhite, isShrinked };
    return (
      <header className="c-header">
        <Navigation
          className={`${isVisible ? "-visible" : ""} ${isWhite ? "-white" : ""} ${
            isShrinked ? "-shrink" : ""
          }`}
        />
        ;
      </header>
    );
  }
}
```

Pour éviter de créer une longue chaîne de caractères avec des opérateurs ternaires, nous allons utiliser une méthode _helper_ pour formatter les _modifiers_. Cette méthode est disponible grâce au préfix : `cgm`.

```js
class Header extends Component {
  // ------------------------------------------------------
  // Methods

  // cgm -> Component - Get Modifiers
  getComponentModifiers() {
    const { isVisible, isWhite, isShrinked } = this.props;
    let modifiers = isVisible ? "-visible " : "";
    modifiers += isWhite ? "-white " : "";
    modifiers += isShrinked ? "-shrinked" : "";
    return modifiers;
  }

  // ------------------------------------------------------
  // Render

  render() {
    return (
      <header className="c-header">
        <Navigation className={this.getComponentModifiers()} />;
      </header>
    );
  }
}
```

Veuillez toujours utiliser la méthode `getComponentModifiers` pour formatter les _modifiers_.

---

### Composants auxiliaires

Il faut garder les composants le petit possible. Pour ce faire, il est conseillé de créer des sous-composants. Regardons un exemple :

```js
class Navigation extends Component {
  render() {
    return (
      <nav className="c-navigation">
        <ul className="c-navigation_list">
          <li className="c-navigation_item">
            <a className="c-navigation_link" href="\">
              Home
            </a>
          </li>
          <li className="c-navigation_item">
            <a className="c-navigation_link" href="\about">
              About
            </a>
          </li>
          <li className="c-navigation_item">
            <a className="c-navigation_link" href="\contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
```

Pour simplifier le code nous allons utiliser l'architecture suivante :

```
├── Navigation/                    # Navigation directory
│   ├── components/                # Sub-components
│   │   └── NavigationItem.js
│   ├── core                       # Related constants / helpers
│   │   └── constants.js
│   ├── Navigation.js              # Main Component
│   └── index.js                   # Container
```

Nous aurons donc la séparation suivante :

**Fichier** : _NavigationItem.js_

```js
class NavigationItem extends Component {
  render() {
    const { href, text } = this.props;
    return (
      <li className="c-navigation_item">
        <a className="c-navigation_link" href={href}>
          {text}
        </a>
      </li>
    );
  }
}

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default NavigationItem;
```

**Fichier** : _constants.js_

```js
export const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" }
];
```

**Fichier** : _Navigation.js_

```js
// Constants
import { navItems } from "./core/constants";

// Components
import NavigationItem from "./components/NavigationItem";

class Navigation extends Component {
  render() {
    return (
      <nav className="c-navigation">
        <ul className="c-navigation_list">
          {navItems.map(item => <NavigationItem {...item} />}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
```

Veuillez toujours utiliser l'architecture mentionnée ci-haut.
