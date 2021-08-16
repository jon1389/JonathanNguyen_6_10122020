# P6 - So Peckocko - Construisez une API sécurisée pour une application d'avis gastronomiques

## Contexte

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.
L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.
Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

## Mission

En tant que développeur backend freelance, la mission est de développer le backend et de créer l'API.

### Réalisation de l’API

#### Points de vigilance

L’entreprise ayant subi quelques attaques sur son site web ces ernières semaines, le fondateur souhaite que les données des tilisateurs soient parfaitement protégées.
Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.

#### Exigences concernant la sécurité

- l’API doit respecter le RGPD et les standards OWASP ;
- le mot de passe des utilisateurs doit être chiffré ;
- 2 types de droits administrateur à la base de données doivent être définis : un accès pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base de données ;
- la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
- l’authentification est renforcée sur les routes requises ;
- les mots de passe sont stockés de manière sécurisée ;
- les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

#### Erreurs API

Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().

#### Routes API

Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer <token>").

## Technologies à utiliser

- Framework : Express ;
- Serveur : NodeJS ;
- Base de données : MongoDB ;
- Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

## Installation

Ouvrir un terminal :

1. Tapez `cd frontend` pour accéder au dossier frontend
2. Puis `npm install` pour installer toutes les dépendances
3. Puis `npm start` pour lancer le serveur

Ouvrir un second terminal :

1. Tapez `cd backend` pour accéder au dossier backend
2. Puis `npm install` pour installer toutes les dépendances
3. Puis `nodemon server` pour lancer le serveur

## Configuration du fichier .env

Vous trouverez un fichier `.env.prod` dans le dossier backend.
Il vous faudra modifier ce fichier en le renommant en `.env` et en remplaçant les valeurs par vos informations (user, password, token...)

## Pour lancer l'application

Ouvrez un navigateur puis rendez vous sur http://localhost:4200/ pour lancer l'application.
