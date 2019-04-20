![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

# Table des matières

- [Prérequis](#prerequis)
- [Snippets](#snippets)
- [Template](#template)
- [Variables](#variables) 
	- [Système de grille](#systeme-de-grille) 
	- [Usage](#usage) 
	- [Gestion des colonnes](#Gestion-des-colonnes)
- [Media](#media)
- [Flex](#flex)
- [Propriétés](#propriétés)
- [Sélecteurs](#sélecteurs)

# Prérequis

Avant de poursuivre votre lecture, il est conseillé de :

1. Lire la documentation sur l'approche **BEM**.

> [\_\_root\_\_ / docs / guides / how-to--BEM.md](./how-to--BEM.md)

2. Lire la documentation sur la méthodologie **ITCSS**.

> [\_\_root\_\_ / docs / guides / how-to--ITCSS.md](./how-to--ITCSS.md)

---

# Snippets

### Template

Lorsque vous avez créé un nouveau fichier **scss**, utilisez le préfix `tmp_sass` pour générer l'entête du fichier et la classe du composant. Par exemple :

**Fichier** : scss / components / _\_navigation.scss_

```scss
// ======================================================
// Components / Navigation
// ======================================================

.c-navigation {
}
```

---

### Variables

Pour standardiser le nommage des variables SASS, nous demandons à ce que vous utilisez le formattage suivant pour vos noms de variables.

```
${component-name}--{name} = {value};
```

Par exemple :

```scss
$navigation--width: 300px;
$navigation--item-height: 80px;
$alert--fadein-speed: $speed * 2;
$file-list--list-width: 500px;
```

**Note** : Vous pouvez utiliser le préfix `var` pour générer automatiquement vos variables.

---

# Système de grille

### Usage

Voici un usage simple du système de grille.

```html
<div className="o-layout">
  <div className="o-layout_item" />
  <div className="o-layout_item" />
  <div className="o-layout_item" />
  ...
</div>
```

Si vous êtes habitués avec des librairies comme **Bootstrap**, le code ci-haut est _l'équivalent_ (pas tout à fait, mais proche) de :

```html
<div className="row">
  <div className="col-12" />
  <div className="col-12" />
  <div className="col-12" />
  ...
</div>
```

---

### Gestion des colonnes

Pour spécifier la taille des colonnes, il faut utiliser la classe `.u-{nominator}/{denominator}`.

```html
<div className="o-layout">
  <div className="o-layout_item u-1/2" />
  <div className="o-layout_item u-1/2" />
</div>
```

Ici, nous avons une rangée avec deux colonnes de taille égale.

---

### Media

Il n'y a pas de _classes CSS_ prédéfinies pour tous les scénarios possibles.

Il faut les ajouter au fur et à mesure à la fin du fichier suivant :

> . / src / scss / tools / \_widths.scss

Par exemple, si nous avons besoin d'avoir des colonnes d'une taille de 50% à partir d'une certaine taille d'écran, nous allons ajouter (si ces _classes_ ne sont pas déjà créées) les _classes_ suivantes :

```scss
.u-1\/2\@from-small {
  @media (min-width: $from-small) {
    width: span(1/2) !important;
  }
}

.u-1\/2\@to-small {
  @media (max-width: $to-small) {
    width: span(1/2) !important;
  }
}
```

Le forme générale est la suivante :

```scss
.u-{nominator}\/{denominator}\@{context} {
	@media ({min/max}-width: ${context} {
		width: span({nominator}/{denominator}) !important;
	}
}
```

Utilisation :

```html
<div className="o-layout">
	<div className="o-layout_item u-1/2@from-small" />
	<div className="o-layout_item u-1/2@from-small" />
</div>
```

**Note**: Dans l'exemple ci-haut, les `div` aurons une taille de _100%_ par défaut, mais cela passe a _50%_ à partir de _$from-small_.

---

### Flex

Pour center des elements de façon verticale, utilisez l'approche suivante :

```html
<div className="o-layout -flex -middle">
	...
</div>
```

Vous pouvez consulter le fichier suivant pour plus de détails :

> . / src / scss / objects / \_layout.scss

---

# Propriétés

Nous conseillons de grouper (sans mettre de commentaire) vos propriétés **CSS** de sorte à ce que chaque petit groupe opère sur un aspect semblable. Par exemple :

```scss
.c-composant {
  // Position
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;

  // Size
  width: rem($component--width);
  height: rem($component--height);

  // Boxing
  margin: 0 auto;
  padding: rem($unit);

  // Fonts
  font-weight: $light;
  text-decoration: none;

  // Colors
  color: $white;
  background-color: $main;
  box-shadow: 0 0 $unit rgba($color: $black, $alpha: 0.2);
  &:hover {
    color: lighten($main, 10%);
  }

  // Animations
  transition: $speed $easing;
  opacity: 0;
  transform: scale(0.01);
  &.-animate {
    opacity: 1;
    transform: scale(1);
  }
}
```

Cela augmente grandement la lisibilité du code. Il est donc plus simple d'apporter des modifications.

**IMPORTANT** : Utilisez autant que possible l'ordre des groupes ci-haut :

1.  Position
2.  Size
3.  Boxing
4.  Fonts
5.  Colors
6.  Animations

**Note** : N'hésitez pas d'ajouter des commentaires dans votre code lorsque nécessaire.

---

# Sélecteurs

Vous connaissez sûrement l'utilisation du symbole `&` lors de l'imbrication de plusieurs règles **CSS** :

```scss
// SASS
.c-component {
  color: black;
  &.-white {
    color: white;
  }
}

// CSS
.c-component {
  color: black;
}
.c-component.-white {
  color: white;
}
```

Une chose que vous ne savez peut-être pas, c'est que l'on peut l'utiliser _**après**_ un sélecteur.

```scss
.class {
	.-modifier & { ... }
}
```

Ceci ouvre un vaste monde de possibilités, car nous pouvons ainsi modifier le style de notre classe _en regardant les classes parentes_.

```scss
// SASS
// =========================================

.c-navigation {
  background-color: black;
  &.-white {
    background-color: white;
  }
}

.c-navigation_link {
  color: white;
  // Here
  .-white & {
    color: black;
  }
}

// CSS
// =========================================

.c-navigation {
  background-color: black;
}
.c-navigation.-white {
  background-color: white;
}

.c-navigation_link {
  color: white;
}
.-white .c-navigation_link {
  color: black;
}
```
