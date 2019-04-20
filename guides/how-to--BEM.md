![](http://www.cyberjustice.ca/files/sites/102/header_2x-1.png)

  
# Table des matières

- [Principe](#principe)
- [Block](#block)
- [Elements](#elements)
- [Modifiers](#modifiers)

# Principe

**BEM** est une approche qui permet de nommer et d'organiser les classes **CSS**.  

L'acronyme **BEM** correspond aux mots suivants : *Block*, *Elements*, *Modifiers*. Vous trouverez ci-bas la description de chaque terme, ainsi que quelques exemples pratiques. 

Suite à votre lecture, il est conseillé de lire la documentation située au lien ci-dessous. Nous utilisons les approches **BEM** et **ITCSS** dans nos projets react.

> [_\_\_root\_\_ / docs / guides / how-to--ITCSS.md](./how-to--ITCSS.md)

---

# Block

Un **Block** correspond à un **Composant** ou à un **Sous-Composant**.  

L'approche **BEM** requiert une certaine hiérarchie à l'intérieur d'un **Block**, c'est-à-dire qu'il faut fonctionner par niveaux :

```
block                             # La racine du Composant
├── block_element1      
├── block_element2         
│   ├── block_element2_element2.1         
│   └── block_element2_element2.2
└── block_element3
``` 
```html
<div class="c-block">
	<div class="c-block_element1"></div>
	<div class="c-block_element2">
		<div class="c-block_element2_element2.1"></div>
		<div class="c-block_element2_element2.2"></div>
	</div>
	<div class="c-block_element3"></div>
</div>
```

Exemple réel : 
```html
<aside class="c-alert">
	<div class="c-alert_header">
		<h1 class="c-alert_header_h1">Title</h1>
	</div>
	<div class="c-alert_body">Content</div>
	<div class="c-alert_footer">
		<button class="c-alert_footer_close-btn">
			Close
		</button>
	</div>
</aside>
```
**Note 1** : Il y a un _\_underscore\__ entre chaque niveau.
**Note 2** : Si le nom d'un **Block** (ou d'un **Element**) contient des espaces, il faut utiliser des _**tirets**_.
**Note 3** : Pour plus d'information sur les préfixes « _**c-**_ », consultez la documentation située ci-bas.

> [_\_\_root\_\_ / docs / guides / how-to--ITCSS.md](./how-to--ITCSS.md)

---

# Elements

Un **Element** est une balise **HTML** comprise à l'intérieur d'un **Block**.

Nous avons déjà vu un exemple plus haut de la hiérarchie d'un **Block**, mais nous pouvons faire mieux. Regardons l'exemple ci-bas : 

```html
<nav class="c-nav">
	<ul class="c-nav_list">
		<li class="c-nav_list_item">
			<a class="c-nav_list_item_link" href="#">
				Home
			</a>
		</li>
		<li class="c-nav_list_item">
			<a class="c-nav_list_item_link" href="#">
				Contact
			</a>
		</li>
	</ul>
</nav>
```

Nous pouvons déjà observer une problématique assez importante : *le nom de certaines classes commencent à être long*.

Pour régler le problème, nous allons procéder ainsi : 

```html
<nav class="c-nav">
	<ul class="c-nav_list">
		<li class="c-nav_item">
			<a class="c-nav_link" href="#">Home</a>
		</li>
		<li class="c-nav_item">
			<a class="c-nav_link" href="#">Contact</a>
		</li>
	</ul>
</nav>
```

Cela demande de la pratique, mais l'idée est de raccourcir le nom d'une classe en *enlevant les niveaux qui n'apportent auncune information pertinente*.

---

# Modifiers

Un **Modifier** est une classe qui modifie l'état d'un **Composant** (d'un **Block**).

```html
<!-- Single Modifier -->
<nav class="c-navigation -white">...<nav>

<!-- Multiple Modifiers -->
<nav class="c-navigation -white -open">...<nav>
```

Regardons, un exemple plus concret :

```html
<button class="o-button">Text</button>
<button class="o-button -main">Text</button>
<button class="o-button -big">Text</button>
<button class="o-button -danger">Text</button>
<button class="o-button -small -warning">Text</button>
```

Ici nous avons plusieurs fois le même `button`, mais nous avons utilisé différents **Modifiers** afin de changer certains aspects visuels.
 
Jetons un coup d'oeil du côté du **SASS**.

```scss
.o-button {
	// Size modifiers
	padding: 1rem 2rem;
	&.-small { padding: 0.5rem 1.5rem; }
	&.-big   { padding: 1.5rem 2.5rem; }

	// Color modifiers
	color:white;
	background-color: gray;
	&.-main    { background-color: blue; }
	&.-warning { background-color: orange; }
	&.-danger  { background-color: red; }
}
```

Les **Modifiers** peuvent agir sur plus d'une propriété et ils peuvent même changer complétement l'apprence d'un **Composant**. 

Regardons un dernier exemple.

```html
<nav class="c-navigation -white -fixed">
	<ul class="c-navigation_list">
		<li class="c-navigation_item">
			<a class="c-nav_link" href="#">Home</a>
		</li>
		<li class="c-navigation_item">
			<a class="c-nav_link -active" href="#">About</a>
		</li>
		<li class="c-navigation_item">
			<a class="c-nav_link" href="#">Contact</a>
		</li>
	</ul>
</nav>
```
```scss
.c-navigation {
	&.-fixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	width: 100%;
	height: 5rem;

	background-color: $black;
	&.-white {
		background-color: $white;
	}
}

.c-navigation_list,
.c-navigation_item,
.c-navigation_link {
	height: 100%
}

.c-navigation_list {
	liste-style-type: none;
}

.c-navigation_item {
	display: inline-block;
}

.c-navigation_link {
	display:block;
	padding: 1rem 2rem;
	
	color: white;
	.-white & {
		color: $black;
	}
	&.-active {
		background-color: $main-color;
	}
}
```

**Note** : Les **Modifiers** commencent par un _**tiret**_. 
