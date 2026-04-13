# Spécifications fonctionnelles - Mini application Gestion de films

## 1. Objectif fonctionnel
Cette section decrit ce que l'application doit faire du point de vue utilisateur/metier.

Le systeme doit permettre de :
- ajouter un film au catalogue,
- afficher la liste des films,
- rechercher un film par titre,
- supprimer un film.

## 2. Acteurs
- **Utilisateur** : consulte, ajoute, recherche et supprime des films dans le catalogue.

## 3. Fonctionnalites detaillees

### SF-01 Ajouter un film

**Description**
Permettre a l'utilisateur d'ajouter un film via un formulaire.

**Donnees d'entree**
- titre
- realisateur
- annee
- genre

**Preconditions**
- l'utilisateur est sur l'ecran de gestion du catalogue.

**Scenario nominal**
1. L'utilisateur saisit les informations du film.
2. Il valide le formulaire.
3. Le systeme verifie les champs.
4. Le systeme enregistre le film.
5. Le film apparait dans la liste.

**Scenarios d'erreur**
- champ obligatoire vide -> message d'erreur explicite.
- annee invalide (< 1888 ou non numerique) -> message d'erreur.

**Criteres d'acceptation**
- tous les champs obligatoires sont controles.
- un film valide est visible immediatement apres ajout.

### SF-02 Lister les films

**Description**
Afficher le catalogue de films sous forme de liste/tableau.

**Donnees de sortie**
- titre
- realisateur
- annee
- genre

**Preconditions**
- la page principale est chargee.

**Scenario nominal**
1. Le systeme charge les films existants.
2. Le systeme affiche la liste des films.
3. La liste est triee par titre (ordre alphabetique).

**Scenarios d'erreur**
- aucun film disponible -> afficher un etat vide (liste vide explicite).

**Criteres d'acceptation**
- les 4 attributs sont visibles pour chaque film.
- l'affichage reste lisible et stable apres ajout/suppression.

### SF-03 Rechercher un film

**Description**
Permettre une recherche par titre pour retrouver rapidement un film.

**Donnee d'entree**
- texte de recherche (titre partiel)

**Preconditions**
- la liste des films est affichee.

**Scenario nominal**
1. L'utilisateur saisit un texte dans la barre de recherche.
2. Le systeme filtre la liste selon le titre.
3. Les resultats correspondants sont affiches.

**Scenarios d'erreur**
- aucun resultat -> afficher "Aucun film trouve".

**Criteres d'acceptation**
- recherche partielle (pas besoin du titre complet).
- recherche insensible a la casse.
- message explicite si aucun resultat.

### SF-04 Supprimer un film

**Description**
Permettre la suppression d'un film du catalogue.

**Preconditions**
- au moins un film est present dans la liste.

**Scenario nominal**
1. L'utilisateur clique sur "Supprimer" sur un film.
2. Le systeme demande confirmation.
3. L'utilisateur confirme.
4. Le film est retire de la liste.

**Scenarios d'erreur**
- l'utilisateur annule la confirmation -> aucune suppression.

**Criteres d'acceptation**
- suppression effective uniquement apres confirmation.
- la liste est mise a jour immediatement.

## 4. Regles de gestion
- RG-01 : `title`, `director`, `year`, `genre` sont obligatoires.
- RG-02 : `year` doit etre numerique et >= 1888.
- RG-03 : la recherche porte uniquement sur le titre dans le cadre de ce TP.
- RG-04 : la suppression doit passer par une confirmation utilisateur.

## 5. Exigences non fonctionnelles associees
- ENF-01 : temps de reponse percu < 1 seconde sur petit volume (<= 200 films).
- ENF-02 : messages d'erreur comprehensibles pour les validations.
- ENF-03 : comportement stable sur navigateur desktop moderne.

## 6. Matrice de tracabilite (exemple)

| Exigence / SF | User Story | Test de validation |
|---|---|---|
| SF-01 Ajouter un film | US-01 | Test ajout film valide + test champ vide |
| SF-02 Lister les films | US-02 | Test affichage liste + tri titre |
| SF-03 Rechercher un film | US-03 | Test recherche "dark" + test aucun resultat |
| SF-04 Supprimer un film | US-04 | Test suppression avec confirmation |

## 7. Preuves a joindre dans le dossier CDA
- capture du formulaire d'ajout et de ses validations,
- capture de la liste des films,
- capture d'une recherche avec et sans resultat,
- capture de la suppression avec confirmation,
- lien vers les tests executes (ou protocole de tests manuels).
