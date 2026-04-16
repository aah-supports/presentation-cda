# Exercice 1 - Diagramme de classes (MVC simple)

## Contexte
Vous avez une API panier en MVC avec les éléments suivants:
- `CartController`
- `CartService`
- `IStorage`
- `InMemory`
- `PostgresStorage`
- `Product`
- `StorageItem`

## Travail demande
Construire un diagramme de classes UML qui montre:
1. les classes/interfaces ci-dessus
2. les principales méthodes publiques
3. les relations (association, dépendance, implémentation)

## Contraintes
- Montrer que `InMemory` et `PostgresStorage` implémentent `IStorage`.
- Montrer que `CartService` depend de `IStorage`.
- Montrer que `CartController` depend de `CartService`.

## Livrable
- `exercice-1.drawio` ou `exercice-1.puml`
