![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

# Table des matières

- [Prérequis](#prérequis)
- [Principe](#principe)
- [Architecture](#architecture)
- [Components](#components)
  - [components](#components)
  - [components-ui](#components-ui)
  - [components-anim](#components-anim)
- [Objects](#objects)
- [Settings](#settihgs)
  - [_config](#_config)
  - [_config.app](#_config.app)
  - [_config.colors](#_config.colors)
- [Utilities](#utilies)
- [Préfixes](#préfixes)


# Prérequis

Avant de poursuivre votre lecture, il est conseillé de lire la documentation située ici.

> [\_\_root\_\_ / docs / guides / how-to--BEM.md](./how-to--BEM.md)

---

# Principe

L'approche **ITCSS** (**Inverted Triangle CSS**) introduit une architecture qui permet de donner une structure aux codes **CSS**. Le but est de miniser le code écrit par les programmeurs et augmenter la lisibilité de celui-ci.

---

# Architecture

Comme l'**ITCSS** est une approche pour régler un problème d'organisation de codes **CSS** et non une méthodologie établie, il existe plusieurs variantes disponibles sur les internets. 

Notre approche est insipirée de celle de **Locomotive** (une agence de design Web). Celle-ci est insiprée à son tour d'une distribution provenant de l'entité **InuitCSS**.

**Boilerplate Locomotive**

> [boilerplate](https://github.com/locomotivemtl/locomotive-boilerplate/tree/master/assets/styles)

**InuitCSS** : 

> [InuitCSS](https://github.com/inuitcss)

Voici l'architecture de notre dossier des styles **SASS**.

```
scss                 # Styles directory
├── base             # Common to all pages
├── components       # See section : Components
├── components-ui    # See section : Components
├── components-anim  # See section : Components
├── generic          # Resets 
├── objects          # See section : Objects 
├── settings         # See section : Settings
├── tools            # Mixins & Functions
├── utilities        # See section : Utilities 
├── main.scss        # Imports
└── README.md        # Additionnal info
```

**Note** : Il n'est pas permis d'ajouter des dossiers supplémentaires dans cette architecture sans le consentement du directeur technique.


---

# Components

Nous avons 3 répertoires de styles pour les composants.

### components

Tous composants connectés au `store` de **Redux** doivent avoir un fichier **SASS** associé à l'intérieur de ce répertoire.

Nous y retrouvons des composants internes à l'application (**Navigation**, **Alert**, etc.), ainsi que des composants externes (**Modules**).

---

### components-ui

Tous composants n'étant pas connectés au `store` de **Redux** doivent avoir un fichier **SASS** associé à l'intérieur de ce répertoire.


---

### components-anim

Tous composants servant uniquement à effectuer des animations doivent avoir un fichier **SASS** associé à l'intérieur de ce répertoire.

---

# Objects

Les **Objets** sont des classes **CSS** qui décrivent des éléments abstraits. Par exemple, la classe `.o-button` contient une description générale de ce qu'est un bouton.

```html
<button class="o-button"></button>
```
D'un point de vu _**programmation oriantée objets**_, nous pouvons comparer celles-ci à des _**classes abstraites**_.

Par exemple, le code suivant ...

```html
<button class="c-alert_btn o-button"></button>
```

... pourrait être traduit comme ceci :

```java
abstract class O_Button { ... }

class C_Alert_Btn extends O_Button { ... }
```

**Note** : N'hésitez pas à demander de l'aide auprès de programmeurs expérimentés pour vous conseiller ou vous apporter des clarifications.

---

# Settings

Vous trouverez dans ce dossier toutes les variables **SASS**.

Dans la même optique, toute nouvelle variable devra être ajoutée dans l'un des fichiers suivants.

Chaque fichier contient des variables d'un certain type ou d'une certaine portée.

### _config

Ce fichier contient toutes les variables **SASS** de base. 

Celles-ci sont utilisées au travers tous les fichiers **SASS**.

---

### _config.app

Ce fichier contient toutes les variables **SASS** reliées aux componsants : _components_ / _components-ui_ / _components-anim_.

---

### _config.colors

Ce fichier contient toutes les variables **SASS** reliées aux couleurs.

---

# Utilities

Le dossier **Utilities** contient des classes `helpers` et des classes qui ne possèdent _qu'une seule fonction_.

Par exemple, la classe `.u-clearfix` permet d'annuler tous les effets engendrés par la propriété: `float`.

La classe `.u-text-center`, quant à elle, permet de centrer un texte dans un élément ... etc.

Il est important de noté que la valeur `!important` n'est présente que dans les fichiers se situant dans le dossier des **Utilities**. N'utilisez pas la valeur `!important` en dehors de ce dossier.

**Note 1**
 : Prenez le temps de vous familiariser avec le contenu des fichiers présents dans les **Utilities**. Il est préférable d'utiliser des classes d'aide ( `helpers` ) que de réécrire le même code dans plusieurs fichiers.

 ```html
 <div class="c-component u-clearfix"></div>
 ``` 

**Note 2** :  N'hésitez pas à demander de l'aide auprès de programmeurs expérimentés pour vous conseiller ou vous apporter des clarifications.

---

# Préfixes

Comme nous l'avons vu à travers de nombreux exemples, nous retrouvons souvant une lettre suivie d'un tiret ( `/[a-z]-/` ) devant un mot. On appele cela des **Préfixes**.

```scss
.c-alert { ... }     // c-
.o-button { ... }    // o-
.u-clearfix { ... }  // u-
```

Ceci est un ajout à l'approche **ITCSS**. Ces **Préfixes** nous permettent de savoir quelle est la type de la classe utilisée.

Voici un tableau de tous les **Préfixes** disponibles :

|  **Préfixe** | **Signification**  | **Exemple** |
|---|---|---|
| `o-` | Object | `.o-button` |
| `c-` | Component | `.c-alert` |
| `u-` | Utility  | `.u-clearfix` |
| `-` | Modifier  | `.-big` |
