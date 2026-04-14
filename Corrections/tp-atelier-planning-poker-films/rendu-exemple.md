# Rendu exemple - Atelier Planning Poker

Projet: Films d'art et essai  
Atelier: Estimation Planning Poker (1h)

## Tableau final

| ID | User Story | Critere d'acceptation | Votes initiaux | Point final | Priorite | Note de decision |
|---|---|---|---|---|---|---|
| US-01 | Rechercher un film par titre | un titre existant apparait dans la liste | 1,2,2,3 | 2 | Must | recherche simple |
| US-02 | Filtrer par realisateur | seuls les films du realisateur sont affiches | 2,3,5,3 | 3 | Must | filtre a clarifier |
| US-03 | Consulter fiche film | titre, realisateur, annee, synopsis visibles | 2,3,3,3 | 3 | Must | fiche standard |
| US-04 | Ajouter a "A voir" | le film apparait dans la liste | 3,5,5,3 | 5 | Must | gestion etat liste |
| US-05 | Retirer de "A voir" | le film disparait de la liste | 2,3,3,2 | 3 | Should | operation inverse |
| US-06 | Creer fiche film admin | creation possible avec champs obligatoires | 5,8,8,5 | 8 | Should | validation plus riche |
| US-07 | Modifier fiche film admin | edition puis sauvegarde reussie | 3,5,5,5 | 5 | Could | besoin de validation |
| US-08 | Supprimer fiche film admin | fiche non visible apres suppression | 3,5,8,5 | 5 | Could | confirmer politique suppression |

## Synthese

- Total points brut: 34
- Must: 13 points
- Should: 11 points
- Could: 10 points

Conclusion atelier:

- les US Must sont claires et relativement petites
- la partie admin est plus couteuse et peut etre decalee
- un refinement supplementaire est recommande pour US-02 et US-06
