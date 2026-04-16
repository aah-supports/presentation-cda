# Exercice 3 - Diagramme de composants (switch de persistance)

## Contexte
L'application peut tourner avec:
- `STORAGE_DRIVER=memory`
- `STORAGE_DRIVER=postgres`

## Travail demande
Faire un diagramme de composants qui montre:
1. Composant API Express
2. Composant Service metier
3. Port `IStorage`
4. Adaptateur `InMemory`
5. Adaptateur `PostgresStorage`
6. Base PostgreSQL (utilisee uniquement en mode postgres)

## Contraintes
- Le service ne depend pas directement de PostgreSQL.
- Le switch de driver se fait au demarrage (composition root/server).

## Livrable
- `exercice-3.drawio` ou `exercice-3.puml`
