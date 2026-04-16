# Exercice 1 - Diagramme de classes (MVC simple)

## Contexte
Tu as une API panier en MVC avec les elements suivants:
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
2. les principales methodes publiques
3. les relations (association, dependance, implementation)

## Contraintes
- Montrer que `InMemory` et `PostgresStorage` implementent `IStorage`.
- Montrer que `CartService` depend de `IStorage`.
- Montrer que `CartController` depend de `CartService`.

## Livrable
- `exercice-1.drawio` ou `exercice-1.puml`
