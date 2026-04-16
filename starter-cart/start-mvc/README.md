# Exercice simple - MVC

## Objectif
Completer un endpoint `GET /products` dans une structure MVC.

## Ce qui est deja pret
- Stack Docker: Node.js TypeScript + PostgreSQL
- Table `products` creee et hydratee au demarrage
- Routing MVC deja branche

## A faire
1. Completer `ProductModel.findAll()` dans `src/models/ProductModel.ts`
2. Verifier que `GET /products` retourne les 3 produits

## Commandes
```bash
docker compose up --build
```

## URLs utiles
- API: `http://localhost:3003`
- Health: `http://localhost:3003/health`
- Products: `http://localhost:3003/products`
