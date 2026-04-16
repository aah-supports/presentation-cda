# Comparaison entre architecture hexagonal - MVC - en couches

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)

## Tableau comparatif

| **Architecture** | **Description**                                                                           | **Exemple**                                                          | **Avantages**                                        | **Inconvénients**                              |
|------------------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|-----------------------------------------------------|-----------------------------------------------|
| **MVC**          | Sépare l'application en trois parties: données (**Modèle**), interface (**Vue**), et actions (**Contrôleur**). | **Modèle** : User.js<br>**Vue** : UserProfilePage.html<br>**Contrôleur** : UserController.js | Facile à comprendre; idéal pour les sites web interactifs. | Couplage entre la vue et le contrôleur.       |
| **Hexagonale**   | Centre autour de la logique métier avec des **ports** pour les entrées/sorties et des **adaptateurs** pour se connecter à des technologies externes. | **Port** : IUserRepository<br>**Adaptateur** : SqlUserRepository - **Core** : UserService | Facilite l'ajout de nouvelles technologies; excellent pour les tests. | Plus complexe; peut être excessif pour les petites applications. |
| **En couches**   | Divise l'application en couches horizontales, typiquement présentation, logique métier, et données. | **Présentation** : WebPages<br>**Business** : OrderProcessing<br>**Data** : SQLDatabaseAccess | Séparation claire des responsabilités; facilite la maintenance. | Risque de couplage fort si mal structuré. |

## Exemples d'organisation

### 1. MVC

```arduino
├── Models
│   └── User.js           // Gère les données utilisateur
├── Views
│   └── UserProfilePage.html  // Affiche le profil de l'utilisateur
├── Controllers
    └── UserController.js  // Traite les interactions de la page de profil utilisateur
```

### 2. Architecture hexagonale

```arduino
├── Domain                      // Logique métier centrale
│   ├── Ports                   // Interfaces pour les entrées/sorties
│   │   └── IUserRepository.js  // Interface pour l'accès aux données utilisateur
│   ├── Core
│       └── UserService.js      // Logique métier centrale pour les utilisateurs
├── Adapters                      // Adaptateurs pour les technologies externes
    ├── Repository
        └── SqlUserRepository.js  // Implémentation SQL de IUserRepository
```

### 3. Architecture en couches

```arduino
├── Presentation // Interface utilisateur
│   └── WebPages
│       └── Dashboard.html   // Interface utilisateur pour le tableau de bord
├── Business // Logique métier
│   └── OrderProcessing
│       └── OrderService.js  // Logique métier pour le traitement des commandes
├── Data // Interaction avec la base de données
    └── SQLDatabaseAccess
        └── DatabaseHelper.js  // Accès et manipulation de la base de données
```

L'architecture en couches et hexagonales semblent similaires, c'est vrai.
Mais il y a des différences:

- L'architecture en couches est plus orientée sur la séparation des responsabilités, tandis que l'architecture hexagonale est plus orientée sur la flexibilité et l'indépendance des technologies.

- L'architecture hexagonale utilise des **ports** et des **adaptateurs** pour définir des interfaces claires entre les composants, tandis que l'architecture en couches utilise des couches horizontales pour organiser les composants. En gros on permets à l'app de fonctionner indépendamment d'une implémentation externe (db, fw, ...)

- Dans l'architecture en couche, les "composants" (ou blocs) de l'architecture interagissent de manière **directe et séquentielle** avec la couche au dessus, appelant les services de la couche en dessous. Dans l'architecture hexagonale, les composants interagissent de manière **indirecte et décorrélée** via des ports et des adaptateurs.

## Hamburger en couches

![Hamburger](https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/800px-NCI_Visuals_Food_Hamburger.jpg)

Le hamburger est une analogie sympa pour parler de **l'architecture en couches**. Chaque bloc du sandwich se construit en couches verticales.
Chaque ingrédient est une couche de l'application, et l'ensemble forme un sandwich délicieux (ou une application fonctionnelle). En retirer un ingrédient peut affecter le goût de l'ensemble. Par exemple, retirer le fromage peut rendre le sandwich moins savoureux, tout comme retirer la couche de données peut rendre l'application moins fonctionnelle. Il faut que **tout** les ingrédients soient là pour que le sandwich soit bon.

## Sushi hexagonal

![Sushi](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/800px-Sushi_platter.jpg)

Voici un plateau de sushi savoureux.
Chaque pièces de sushi est différentes, donc chacun a un goût et donc un intérêt différent. Cependant, si je retire une pièce de ce plateau, ca reste un plateau de sushi.
C'est une analogie pour **l'architecture hexagonale**. Chaque pièce de sushi est un composant de l'application, et l'ensemble forme un plateau de sushi (ou une application fonctionnelle). En retirer un composant n'affecte pas le goût de l'ensemble. Par exemple, retirer le sushi au saumon ne change pas le goût du sushi au thon, tout comme retirer le composant de données n'affecte pas le composant de logique métier. Chaque composant est indépendant et peut être remplacé sans affecter les autres.

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)