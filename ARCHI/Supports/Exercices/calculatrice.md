# TP Calculatrice

### Objectif du TP

Les étudiants vont créer une application de calculatrice qui supporte les opérations de base **addition** et **soustraction**. Ils devront appliquer les concepts de **Zustand**, de **Clean Architecture** et **Atomic Design** pour organiser leur projet.

### Prérequis

- Connaissances en React
- Notions de base sur Zustand
- Notions de Clean Architecture
- Compréhension d'Atomic Design

---

### Architecture du projet

L'application sera organisée selon l'architecture suivante, en combinant **Clean Architecture** et **Atomic Design** pour une séparation claire des responsabilités.

#### Structure des Dossiers

```plaintext
src/
│
├── app/
│   └── stores/
│       └── calculatorStore.js # Store Zustand de la calculatrice
│
├── atoms/                  # Composants atomiques (boutons, champs de texte, etc.)
│   ├── Button.jsx          # Boutons pour chaque opération de la calculatrice (+, -)
│   └── Display.jsx         # Affichage du résultat
│
├── molecules/              # Composants composés d'atomes
│   └── CalculatorPanel.jsx # Panneau de calculatrice contenant les boutons et l'affichage
│
├── organisms/              # Composants complexes intégrant des molécules
│   └── Calculator.jsx      # Composant qui assemble le panneau et la logique Zustand
│
├── templates/              # Dispositions (templates) de l'application
│   └── CalculatorTemplate.jsx # Template contenant le composant Calculator
│
├── pages/                  # Pages de l'application
│   └── Home.jsx            # Page principale qui rend la calculatrice
│
├── features/               # La logique métier avec Zustand
│   └── calculator/         # Logique de gestion de la calculatrice
│       ├── calculatorStore.js  # Store Zustand pour gérer l'état des calculs
│       └── calculatorActions.js # Actions spécifiques à la calculatrice
│
├── routes/                 # Gestion des routes
│   └── AppRoutes.jsx       # Définition des routes avec TanStack Router
│
└── App.jsx                 # Point d'entrée de l'application
```

---

### Explication de l'Architecture

#### **1. Atomic Design**
L'architecture suit le modèle **Atomic Design** pour la composition des composants :
- **Atomes** : Composants simples et réutilisables. Par exemple, un bouton (`Button`) et un écran d'affichage (`Display`) sont des atomes.
- **Molécules** : Combinaison d'atomes pour créer des éléments plus complexes, comme un panneau de calculatrice (`CalculatorPanel`) qui regroupe les boutons et l'écran d'affichage.
- **Organismes** : Composants complexes qui intègrent des molécules et des atomes. Le composant `Calculator` gère la logique d'interface et se connecte à Zustand.
- **Templates** : Dispositions globales comme le template de la calculatrice (`CalculatorTemplate`), qui définit comment la calculatrice est agencée dans la page.
- **Pages** : La page principale (`Home`) qui intègre le template et affiche l'application.

#### **2. Clean Architecture**
L'application suit les principes de **Clean Architecture** :
- **Features** : La logique métier (comme la gestion des calculs) est séparée dans un dossier `features`, qui contient un **store Zustand** pour gérer l'état de l'application (les résultats des calculs).
- **Conteneurs** : Les composants comme `Calculator.jsx` servent de conteneurs en intégrant la logique de l'application (Zustand) avec l'interface utilisateur (UI).
- **Services/API** : Dans ce cas, il n'y a pas de service externe, mais si l'application devait s'étendre pour inclure des appels API, ce dossier gérerait les interactions avec le backend.
- **Séparation claire des responsabilités** : La logique de l'application (calculatrice, gestion des états) est séparée de la présentation (composants UI).

---

## Quelques précisions

#### 1. **Composants et UI (Atomic Design)**
Vous devez construire les composants UI en suivant les principes de **Atomic Design** :

- **Atomes** : 
    - Créez un bouton `Button.jsx` qui acceptera des `props` comme l'étiquette (ex. `+`, `-`, `C`) et une fonction de callback pour la gestion des événements.
    - Créez un composant `Display.jsx` pour afficher le résultat de la calculatrice.

- **Molécules** :
    - Créez un `CalculatorPanel.jsx` qui compose plusieurs boutons (`Button`) et affiche le résultat avec le composant `Display`.

- **Organismes** :
    - Créez un composant `Calculator.jsx` qui assemble `CalculatorPanel` et gère l'état global de l'application à travers Zustand.

#### 2. **Gestion de l'État avec Zustand (Logique Métier)**
Vous devez utiliser **Zustand** pour gérer l'état de la calculatrice :

- **`calculatorStore.js`** : Le store gérera l'état de l'application, c'est-à-dire :
    - Le nombre affiché à l'écran (`currentValue`).
    - L'historique des opérations (optionnel mais recommandé pour des extensions futures).
    - Des actions pour additionner et soustraire (`add`, `subtract`).
    - Un gestionnaire d'opération (`clear`) pour réinitialiser la calculatrice.

- **Actions du store** : 
    - **`add`** : Ajoute un nombre à l'état actuel.
    - **`subtract`** : Soustrait un nombre de l'état actuel.
    - **`clear`** : Réinitialise l'état de la calculatrice.

#### 3. **Connecting Zustand avec l'UI**
- Dans le composant `Calculator.jsx`, utilisez le hook Zustand (`useCalculatorStore`) pour connecter les actions à l'UI.
- L'état global de la calculatrice sera accessible via `useCalculatorStore` pour afficher le résultat dans le composant `Display`.
- Les actions (addition, soustraction, réinitialisation) seront appelées directement depuis `useCalculatorStore` dans le composant `CalculatorPanel`.

#### 54. **Template et Pages**
- Créez un template (`CalculatorTemplate.jsx`) qui définit la structure de la page de la calculatrice. Ce template inclura `Calculator.jsx` et le rendra dans le corps de la page.
- Créez une page `Home.jsx` pour rendre le template `CalculatorTemplate`.

---

### Livrables

À la fin de ce TP, vous devez fournir :
- Le code complet du projet avec une structure respectant **Clean Architecture** et **Atomic Design**.
- Un README détaillant l'architecture du projet, les choix techniques, et la procédure d'installation.
- Les tests unitaires écrits pour valider la logique des actions et de la calculatrice.
