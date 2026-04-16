# Correction - Exercice 1 MCD marketplace (Mocodo)

## Remarques
- `LIGNE_COMMANDE` est une entite associative entre `COMMANDE` et `PRODUIT`.
- Cardinalite `COMMANDE -> LIGNE_COMMANDE` doit etre `1N` (une commande a au moins une ligne).
- Cardinalite `PRODUIT -> LIGNE_COMMANDE` est `0N` (un produit peut n'etre dans aucune commande).
- `REGLER` est modele en `01 COMMANDE` vers `11 PAIEMENT` pour exprimer 0 ou 1 paiement par commande.

## Proposition de MCD (Mocodo)
```text
CLIENT: id_client, email, raison_sociale
VENDEUR: id_vendeur, nom, siret
CATEGORIE: id_categorie, libelle
PRODUIT: id_produit, sku, nom, prix_ht
COMMANDE: id_commande, date_commande, statut
LIGNE_COMMANDE: id_ligne, quantite, prix_unitaire_ht
PAIEMENT: id_paiement, date_paiement, montant_ttc, statut
EXPEDITION: id_expedition, date_expedition, transporteur, tracking

PASSER, 0N CLIENT, 1N COMMANDE
CLASSER, 0N CATEGORIE, 1N PRODUIT
VENDRE, 0N VENDEUR, 1N PRODUIT
CONTENIR, 1N COMMANDE, 1N LIGNE_COMMANDE
REFERENCER, 0N PRODUIT, 1N LIGNE_COMMANDE
REGLER, 01 COMMANDE, 11 PAIEMENT
LIVRER, 0N COMMANDE, 1N EXPEDITION
```

## Verification rapide des cardinalites
- `CLIENT (0,N) -> COMMANDE (1,1)`
- `COMMANDE (1,N) -> LIGNE_COMMANDE (1,1)`
- `PRODUIT (0,N) -> LIGNE_COMMANDE (1,1)`
- `COMMANDE (0,1) -> PAIEMENT (1,1)`
- `COMMANDE (0,N) -> EXPEDITION (1,1)`

## Conseils Mocodo
- Si le layout est charge, utiliser `Retouches` puis `Rafraichir`.
- Conserver le `.mcd` dans le rendu final pour relecture.
