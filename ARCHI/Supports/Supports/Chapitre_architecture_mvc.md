# MVC 

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)

Attention MVC n'est pas une architecture en couche en soi, mais plutôt un modèle de conception logicielle qui divise une application en trois composants principaux : le modèle, la vue et le contrôleur.

Le MVC est plus modulable qu'une architecture en couche.

1. **Modèle (Model)** ( couche données / ORM )
   - Responsable de la gestion des données de l'application.
   - Dans Symfony, le modèle représente souvent les entités Doctrine qui correspondent aux tables de la base de données.
   - Il comprend également la logique métier de l'application.

1. **Vue (View)** ( UI )
   - Responsable de l'affichage des données à l'utilisateur.
   - Dans Symfony, les vues sont généralement des fichiers de template Twig (moteur de template) qui définissent la présentation des données / les pages de l'application.
   - Elles sont chargées en utilisant les contrôleurs et peuvent inclure des éléments dynamiques (pas de logique métier).

2. **Contrôleur (Controller)** :
   - Responsable de la gestion des requêtes utilisateur et de la coordination entre le modèle et la vue.
   - Dans Symfony, les contrôleurs sont des classes PHP qui reçoivent les requêtes HTTP et déterminent les actions à effectuer.
   - Ils font appel aux services nécessaires pour traiter les données et renvoyer une réponse appropriée.

🥑 Kernel Symfony

- **Kernel** :
  - Au cœur de l'architecture Symfony, le kernel est responsable du démarrage de l'application et de la gestion des requêtes HTTP.
  - Il initialise l'environnement de l'application, charge les bundles, gère les événements, et exécute les différentes étapes du cycle de vie de la requête.
  - Il agit comme une sorte de **contrôleur principal** qui dirige le trafic entrant vers les bonnes parties de l'application en fonction des routes définies.

📖 Résumé 

- Le **Modèle** gère les données et la logique métier.
- La **Vue** gère l'affichage des données.
- Le **Contrôleur** gère la logique de traitement des requêtes utilisateur et orchestre l'interaction entre le modèle et la vue.
- Le **Kernel** de Symfony agit comme un point d'entrée central qui gère le cycle de vie des requêtes HTTP et dirige le trafic vers les bonnes parties de l'application.

## Ne pas confondre MVC et architecture en couche

Tout ceci est proche ...

### Architecture en Couches :

1. **Couche de Présentation :**
   - Cette couche contient les composants responsables de l'interface utilisateur, tels que les pages web, les interfaces graphiques utilisateur (GUI) ou les interfaces de programmation d'application (API).
   - Exemple : Un site web avec des pages HTML, des feuilles de style CSS et des scripts JavaScript.

2. **Couche Métier :**
   - Cette couche contient la logique métier de l'application, y compris les règles métier et la manipulation des données.
   - Exemple : Un ensemble de classes Java dans une application back-end qui gère la logique métier, tels que la gestion des utilisateurs, la facturation, etc.

3. **Couche d'Accès aux Données :**
   - Cette couche est responsable de l'accès et de la manipulation des données stockées dans une base de données ou un autre système de stockage.
   - Exemple : Une base de données relationnelle MySQL utilisée pour stocker les données de l'application, avec des scripts SQL pour interroger et modifier les données.

### Architecture MVC :

1. **Modèle (Model) :**
   - Cette composante gère les données et la logique métier de l'application.
   - Exemple : Une classe en PHP qui représente un utilisateur avec des méthodes pour récupérer et modifier les informations de l'utilisateur dans une base de données.

2. **Vue (View) :**
   - Cette composante est responsable de l'affichage des données et de l'interface utilisateur.
   - Exemple : Une page HTML qui affiche les informations de l'utilisateur à partir du modèle et permet à l'utilisateur d'interagir avec l'application via des formulaires.

3. **Contrôleur (Controller) :**
   - Cette composante gère les interactions utilisateur et la coordination entre la vue et le modèle.
   - Exemple : Un script PHP qui reçoit les requêtes HTTP de l'utilisateur, interroge le modèle pour obtenir les données nécessaires et sélectionne la vue appropriée pour afficher les données.


## Différence entre architecture en couche et MVC

Oui, vous avez raison sur le fait que l'architecture MVC est modulaire, ce qui lui confère une flexibilité accrue par rapport à l'architecture en couches. Voici quelques autres exemples pour illustrer les différences entre les deux approches :

1. **Maintenance et évolutivité :**
   - Dans l'architecture en couches, chaque couche est généralement fortement couplée aux autres couches, ce qui rend difficile la modification ou l'extension d'une couche sans affecter les autres. Par exemple, une modification de la base de données peut nécessiter des changements dans la couche de logique métier et la couche de présentation.
   - En revanche, dans l'architecture MVC, les différents composants (modèles, vues et contrôleurs) sont plus indépendants les uns des autres. Par exemple, si vous ajoutez une nouvelle fonctionnalité à une vue, cela peut être fait sans modifier le modèle ou le contrôleur.

2. **Réutilisabilité du code :**
   - Dans l'architecture en couches, le code peut être moins réutilisable en raison du fort couplage entre les différentes couches. Par exemple, les fonctions spécifiques à la base de données dans la couche d'accès aux données peuvent être difficiles à réutiliser dans d'autres parties de l'application.
   - Avec l'architecture MVC, les composants sont généralement conçus pour être réutilisables. Par exemple, un modèle de données peut être utilisé dans plusieurs vues pour afficher différentes représentations des mêmes données.

3. **Complexité de l'application :**
   - L'architecture en couches peut devenir complexe à mesure que l'application grandit, en raison de son fort couplage et de sa structure hiérarchique.
   - L'architecture MVC, en revanche, peut offrir une meilleure organisation et une plus grande facilité de gestion pour les applications de taille moyenne à grande, en raison de sa modularité et de sa séparation des responsabilités.

4. **Tests unitaires :**
   - Dans l'architecture en couches, les tests unitaires peuvent être plus difficiles à mettre en œuvre en raison du fort couplage entre les couches. Par exemple, il peut être difficile de tester la logique métier sans tester également la couche d'accès aux données.
   - Avec l'architecture MVC, les tests unitaires sont généralement plus faciles à écrire car les composants sont plus indépendants. Par exemple, vous pouvez tester la logique métier d'un contrôleur sans vous soucier de la vue ou du modèle.

5. Multiples vues dans le MVC
Considérons une application de gestion de contenu où les articles peuvent être affichés de différentes manières : sous forme de liste sur la page d'accueil, sous forme de vignettes dans une galerie sur une page dédiée, et sous forme de détails complets sur une autre page. Si une modification est apportée à la structure des données des articles dans la base de données, comme l'ajout d'un nouveau champ, cette modification n'affectera que la logique de récupération des données dans le modèle. Les contrôleurs et les vues peuvent être mis à jour séparément pour prendre en charge le nouveau champ, sans avoir besoin de modifier chaque vue individuellement. 

🌈 Ainsi, une seule modification dans la base de données peut **être propagée à plusieurs vues** de manière direct.

## Exemple simple d'architecture MVC

1. Modèle (TaskModel.php)

```php
<?php
class TaskModel {
    private $tasks = [];

    public function __construct() {
        // Initialisation avec quelques tâches par défaut
        $this->tasks = [
            ['id' => 1, 'title' => 'Faire les courses'],
            ['id' => 2, 'title' => 'Nettoyer la maison'],
            ['id' => 3, 'title' => 'Travailler sur le projet']
        ];
    }

    public function getAllTasks() {
        return $this->tasks;
    }

    public function addTask($title) {
        $newTask = ['id' => count($this->tasks) + 1, 'title' => $title];
        array_push($this->tasks, $newTask);
    }

    public function deleteTask($taskId) {
        foreach ($this->tasks as $key => $task) {
            if ($task['id'] == $taskId) {
                unset($this->tasks[$key]);
                break;
            }
        }
    }
}
?>
```

1. Contrôleur (TaskController.php).

```php
<?php
include 'TaskModel.php';

class TaskController {
    private $model;

    public function __construct() {
        $this->model = new TaskModel();
    }

    public function getAllTasks() {
        return $this->model->getAllTasks();
    }

    public function addTask($title) {
        $this->model->addTask($title);
    }

    public function deleteTask($taskId) {
        $this->model->deleteTask($taskId);
    }
}
?>
```

1. Vue (index.php) 

```php
<?php
include 'TaskController.php';

$controller = new TaskController();

// Traitement des actions de l'utilisateur - mini router
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['action'] === 'add') {
        $controller->addTask($_POST['title']);
    } elseif ($_POST['action'] === 'delete') {
        $controller->deleteTask($_POST['task_id']);
    }
}

// Affichage des tâches
$tasks = $controller->getAllTasks();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Liste de tâches</title>
</head>
<body>
    <h1>Liste de tâches</h1>
    <ul>
        <?php foreach ($tasks as $task): ?>
            <li><?php echo $task['title']; ?> <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>"><input type="hidden" name="action" value="delete"><input type="hidden" name="task_id" value="<?php echo $task['id']; ?>"><button type="submit">Supprimer</button></form></li>
        <?php endforeach; ?>
    </ul>
    <h2>Ajouter une tâche</h2>
    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
        <input type="hidden" name="action" value="add">
        <input type="text" name="title" placeholder="Titre de la tâche">
        <button type="submit">Ajouter</button>
    </form>
</body>
</html>
```

🔖 Dans cet exemple, le modèle (`TaskModel.php`) gère la logique métier des tâches, le contrôleur (`TaskController.php`) traite les actions de l'utilisateur et communique avec le modèle, et la vue (`index.php`) affiche les données des tâches et les éléments d'interface utilisateur.

### Plan du cours général

[plan du cours](../../01_ORGA/00_plan.md)