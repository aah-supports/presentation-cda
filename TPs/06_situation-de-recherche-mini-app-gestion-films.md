# Description d'une situation de travail ayant necessite une recherche

## 1. Contexte de travail
Pendant le developpement de la mini application "Gestion de films" (TP 3h), je travaillais sur la fonctionnalite **SF-03 Rechercher un film**. L'objectif etait de filtrer la liste des films par titre, de maniere partielle et insensible a la casse, avec un resultat stable cote utilisateur.

## 2. Problematique rencontree
Lors des premiers tests, la recherche ne donnait pas toujours les resultats attendus :
- les differences de majuscules/minuscules provoquaient des faux negatifs,
- certaines saisies utilisateurs (espaces en debut/fin) reduisaient la pertinence,
- le comportement n'etait pas clairement defini pour une recherche vide.

Cette situation bloquait la validation des criteres d'acceptation de SF-03.

## 3. Objectif de la recherche
Trouver une methode simple, robuste et rapide pour:
- implementer une recherche partielle par titre,
- rendre la recherche insensible a la casse,
- definir une regle explicite pour les cas limites (chaine vide, espaces).

## 4. Demarche de recherche effectuee

### 4.1 Sources consultees
- Documentation MDN sur les methodes de chaines JavaScript (`toLowerCase`, `trim`, `includes`)
- Exemples de filtrage en JavaScript natif (ressources techniques generalistes)
- Bonnes pratiques de validation d'entree deja recensees dans ma veille securite

### 4.2 Hypotheses testees
1. Filtrage direct sans normalisation
2. Normalisation partielle (query uniquement)
3. Normalisation complete (query + titre)

### 4.3 Criteres de comparaison
- conformite fonctionnelle (criteres SF-03),
- simplicite d'implementation dans le temps imparti,
- lisibilite/maintenabilite du code.

## 5. Analyse et choix de solution

### Option A - Filtrage direct
- Avantage: tres rapide a coder
- Limite: ne gere pas bien la casse et les espaces

### Option B - Normalisation query uniquement
- Avantage: ameliore partiellement les resultats
- Limite: reste incomplet si les titres ne sont pas normalises

### Option C - Normalisation query + titre (solution retenue)
- Avantage: comportement coherent et previsible
- Avantage: implementation courte, adaptee au TP
- Limite: optimisation limitee pour gros volumes (acceptable ici)

## 6. Mise en oeuvre dans le projet

Principe implemente :
- `query = q.trim().toLowerCase()`
- pour chaque film: `movie.title.toLowerCase().includes(query)`
- si `query` est vide, afficher la liste complete
- si aucun match, afficher "Aucun film trouve"

Extrait de code representatif :

```js
const query = (req.query.q || '').trim().toLowerCase();

const filtered = movies.filter((m) => {
  if (!query) return true;
  return m.title.toLowerCase().includes(query);
});
```

## 7. Resultat obtenu
- Critere "recherche partielle" : valide
- Critere "insensible a la casse" : valide
- Critere "aucun resultat" : valide (message explicite)

Donnees de verification (exemple):
- Entree: `q=dark`
- Attendu: films contenant "dark" dans le titre
- Obtenu: liste filtree conforme + 200 OK

## 8. Capitalisation (retour d'experience)
- Toujours fixer une regle de normalisation des donnees de recherche des la conception.
- Documenter les cas limites (query vide, espaces, casse) dans les criteres d'acceptation.
- Conserver un exemple de test manuel/API pour prouver le resultat en soutenance.

## 9. Preuves a annexer dans le dossier CDA
- capture de la recherche avec resultat,
- capture du cas "aucun resultat",
- extrait du code de filtrage,
- reference au test associe dans le plan de tests.
