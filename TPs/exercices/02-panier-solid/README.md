# Exercice 2 - Panier SOLID (TypeScript)

## Objectif

Implementer un panier en respectant une architecture simple et les principes SOLID.

Dossiers imposes:

- `controllers/`
- `models/`
- `routers/`
- `services/`

## Structure

```text
src/
  controllers/
    cartController.ts
  models/
    Product.ts
    CartItem.ts
  routers/
    cartRouter.ts
  services/
    CartService.ts
    DiscountPolicy.ts
    NoDiscountPolicy.ts
    PercentageDiscountPolicy.ts
  server.ts
```

## Démarrage

```bash
npm install
npm run dev
```

## Endpoints

- `GET /cart`
- `POST /cart/items`
- `DELETE /cart/items/:productId`
- `GET /cart/total`

## Travail attendu (SOLID)

1. **S**: separer clairement controller, service, model.
2. **O**: permettre d'ajouter une nouvelle politique de remise sans modifier `CartService`.
3. **D**: injecter la politique de remise via une interface (`DiscountPolicy`).

## Exemple rapide

```bash
curl -X POST http://localhost:3011/cart/items \
  -H "content-type: application/json" \
  -d '{"product":{"id":1,"name":"Clavier","price":49.9},"quantity":2}'

curl http://localhost:3011/cart/total
```
