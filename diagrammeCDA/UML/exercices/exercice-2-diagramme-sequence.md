# Exercice 2 - Diagramme de sequence (ajout au panier)

## Contexte
Route HTTP: `POST /api/product`
Body:
```json
{ "productId": "aa1", "quantity": 2 }
```

## Travail demande
Faire un diagramme de séquence pour le scénario nominal:
1. Client appelle `CartController.addItem`
2. Le controller recupère le produit via `CartService.getProduct`
3. Le service vérifie le stock via `IStorage.checkStock`
4. Le service ajoute l'article via `IStorage.addItem`
5. Reponse HTTP `201`

## Variante erreur a inclure
- Si `quantity <= 0`, retourner `400 QUANTITY_INVALID`.

## Livrable
- `exercice-2.drawio` ou `exercice-2.puml`
