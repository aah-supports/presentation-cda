# Glossaire Architecture - REST, MVC, Clean, Front et Middleware

## 1. API et architectures REST

1. **REST (Representational State Transfer)**  
Style d'architecture pour API web base sur les ressources, HTTP, la statelessness et une interface uniforme.

2. **RESTful API**  
API qui applique correctement les contraintes REST (ressources bien nommees, verbes HTTP pertinents, codes de statut, representations coherentes).

3. **Ressource**  
Objet metier expose par l'API (exemple: `movie`) accessible via une URI.

4. **URI (Uniform Resource Identifier)**  
Adresse qui identifie une ressource (exemple: `/api/movies/12`).

5. **Stateless**  
Le serveur ne garde pas l'etat de session entre deux requetes; chaque requete contient le contexte necessaire.

6. **Representation**  
Format de donnees retourne pour une ressource (souvent JSON).

7. **HTTP Methods**  
Verbes `GET`, `POST`, `PUT`, `PATCH`, `DELETE` utilises pour agir sur les ressources.

8. **Idempotence**  
Operation qui peut etre rejouée sans changer le resultat final (exemple: `PUT`, `DELETE` en théorie).

9. **Content Negotiation**  
Mécanisme permettant de choisir le format de réponse (exemple via `Accept`).

10. **HATEOAS**  
Contrainte REST optionnelle souvent absente en projet simple; la reponse inclut des liens d'actions possibles.

11. **Richardson Maturity Model**  
Modele de maturite REST de niveau 0 a 3 pour evaluer le niveau d'adoption REST.

12. **Niveau 0 (RPC over HTTP)**  
HTTP utilise comme simple tunnel d'appels.

13. **Niveau 1 (Resources)**  
API structuree autour de ressources.

14. **Niveau 2 (HTTP Verbs + Status)**  
Usage correct des verbes HTTP et codes de statut.

15. **Niveau 3 (Hypermedia)**  
Ajout de liens hypermedia (HATEOAS).

## 2. MVC et Clean Architecture

16. **MVC (Model-View-Controller)**  
Pattern separant donnees/metier (`Model`), affichage (`View`) et orchestration des requetes (`Controller`).

17. **Model**  
Structure de donnees et logique metier centrale.

18. **View**  
Couche d'affichage (UI web, template, sortie visuelle).

19. **Controller**  
Point d'entree qui recoit la requete et delegue au metier.

20. **Service Layer**  
Couche intermediaire pour regles metier et orchestration (souvent ajoutee dans un MVC pragmatique).

21. **Repository Pattern**  
Abstraction de l'acces aux donnees (memoire, SQL, NoSQL) sans exposer les details de stockage.

22. **Clean Architecture**  
Architecture orientée dépendances vers le coeur métier (domain), séparée de l'infrastructure.

23. **Use Case**  
Action métier applicative (exemple: "ajouter un film") isolee de la technique.

24. **Entities (Clean)**  
Objets métier centraux, stables, indépendants des frameworks.

25. **Dependency Rule**  
Les couches externes dépendent des couches internes, jamais l'inverse.

26. **Ports and Adapters (Hexagonal)**  
Variante proche de Clean: ports (interfaces) + adapters (implementations techniques).

## 3. Architectures Front-end

27. **MPA (Multi-Page Application)**  
Application composee de plusieurs pages rechargees cote serveur.

28. **SPA (Single-Page Application)**  
Application web chargee une fois puis mise a jour dynamiquement cote client.

29. **SSR (Server-Side Rendering)**  
Rendu HTML effectue cote serveur avant envoi au navigateur.

30. **CSR (Client-Side Rendering)**  
Rendu principal effectue dans le navigateur via JavaScript.

31. **SSG (Static Site Generation)**  
Pages generees a la build puis servies statiquement.

32. **ISR (Incremental Static Regeneration)**  
Regeneration progressive de pages statiques apres deploiement.

33. **Micro-frontend**  
Découpage du front en sous-applications indépendantes.

34. **BFF (Backend For Frontend)**  
Backend dédié à un type de front (web/mobile) pour adapter les données.

35. **Component-based Architecture**  
`UI` construite à partir de composants réutilisables.

## 4. Middleware et pipeline

36. **Middleware**  
Fonction intermediaire exécutée entre requête et reponse (auth, logs, validation, erreurs).

37. **Middleware Pipeline**  
Chaine ordonnée de middlewares executes successivement.

38. **Global Error Handler**  
Middleware final qui centralise la gestion des erreurs et la forme des reponses.

39. **Authentication Middleware**  
Middleware vérifiant identité et droits avant accès à une route.

40. **Validation Middleware**  
Middleware qui valide les données d'entrée avant passage au controller.

41. **CORS Middleware**  
Middleware qui applique les règles d'acces cross-origin.

42. **Rate Limiting Middleware**  
Limite le nombre de requetes pour proteger l'API.

43. **Logging Middleware**  
Trace les requêtes/reponses pour le debug et l'exploitation.

44. **Body Parsing Middleware**  
Transforme le corps de rêquete (JSON, form-data) en objet exploitable.

45. **Chain of Responsibility**  
Principe de délégation en chaine, applique naturellement dans un pipeline middleware.
