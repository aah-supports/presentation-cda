# Situation de recherche technique - format simple CDA

## 1. Contexte

Pendant le TP, un probleme bloque l'avancement (exemple: port Docker occupe, validation TypeScript, route non atteinte).

## 2. Problematique

[A REMPLIR]

Exemple:
- erreur Docker: `port is already allocated`

## 3. Demarche de recherche

- observation du message d'erreur
- recherche documentation officielle
- test de 2 solutions
- choix et validation

## 4. Solution retenue (exemple)

- Changer le port expose dans `docker-compose.yml`
- Relancer:

```bash
docker compose down --remove-orphans
docker compose up --build -d
```

## 5. Resultat

- blocage leve
- endpoint accessible
- solution documentee

## 6. Preuves a joindre

- capture erreur initiale
- capture commande corrective
- capture resultat final
