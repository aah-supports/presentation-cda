# Exercice 1 - MCD technique (marketplace) avec Mocodo

## Contexte
Vous devez modeliser une mini marketplace B2B:
- un client passe des commandes
- une commande contient plusieurs lignes
- chaque ligne cible un produit
- un produit est vendu par un vendeur
- chaque produit appartient a une categorie
- chaque commande est payee par un paiement (0 ou 1)
- une commande peut etre livree en plusieurs expeditions

## Travail demande
Construire le MCD complet avec:
1. Entites + attributs (identifiants inclus)
2. Associations + cardinalites
3. Contraintes metier visibles dans le modele (unicite logique)

## Contraintes metier
- Un client peut passer 0 a N commandes.
- Une commande contient 1 a N lignes.
- Une ligne reference exactement 1 produit.
- Un produit appartient a 1 categorie.
- Un produit est gere par 1 vendeur.
- Un paiement concerne 1 et 1 seule commande.
- Une commande peut avoir 0 a N expeditions.

## Livrables
- `exercice-1-mcd.drawio` ou `exercice-1-mcd.png`
- `exercice-1-mcd.mcd` (source Mocodo)

## Exemple d'utilisation de https://www.mocodo.net/
1. Ouvrir https://www.mocodo.net/
2. Coller le texte MCD dans la zone de gauche (onglet Entree)
3. Cliquer sur `Rafraichir`
4. Ajuster si besoin (onglet Retouches)
5. Exporter en SVG/PNG/PDF

### Exemple minimal Mocodo (syntaxe)
```text
CLIENT: id_client, email, raison_sociale
COMMANDE: id_commande, date_commande, statut
PASSER, 0N CLIENT, 1N COMMANDE
```

## Indice de depart (a completer)
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
REGLER, 0N COMMANDE, 1N PAIEMENT
LIVRER, 0N COMMANDE, 1N EXPEDITION
```
