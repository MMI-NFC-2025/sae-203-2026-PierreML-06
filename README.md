[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/QH_p-_Ks)
- Nom: Mouilleseaux Lhuillier
- Prénom: Pierre
- url: https://sae203.pierre-mouilleseaux-lhuillier.fr/
- url netlify : https://phenomenal-meerkat-95170d.netlify.app/

compte admin site (accès modification artiste / scène. le compte admin peux être crée via inscription puis le booléen admin a true dans pocketbase )
- e-mail : admin@gmail.com
- mdp : YGVZYatwTJmEQ3o


# Fonctionnalités liées aux comptes

## Comptes utilisateurs

Le site intègre un système de comptes utilisateurs permettant à chaque visiteur de créer un espace personnel et d’accéder à des fonctionnalités supplémentaires une fois connecté.

Un utilisateur peut :

- créer un compte ;
- se connecter à son espace personnel ;
- modifier ses informations de profil ;
- supprimer son compte de manière complète;
- avoir accès au systheme de favori (ajouts étoile sur les card artise / scéne).

Lorsqu’il est connecté, l’utilisateur bénéficie d’une expérience plus personnalisée sur le site.  
Il peut notamment accéder à son image de profil et enregistrer certains événements en favoris grâce à des boutons dédiés et à un système d’étoile.

---

## Comptes administrateurs

Le site prévoit également un système de compte administrateur afin de gérer le contenu de la plateforme.  
Le rôle administrateur est défini dans PocketBase à l’aide d’un champ booléen attribué à certains comptes.

Lorsqu’un utilisateur possède les droits administrateur, il accède à une interface d’administration dédiée qui lui permet de gérer les contenus principaux du site.

Depuis cette interface, un administrateur peut :

- ajouter de nouveaux artistes ;
- modifier les artistes existants ;
- ajouter de nouvelles scènes ;
- modifier les scènes existantes.

---

## Gestion des rôles

Le projet repose donc sur deux niveaux d’accès :

### Compte user
Le compte user est destiné aux visiteurs inscrits du site.  
Il permet de gérer son profil, d’accéder à des fonctionnalités personnalisées et d’interagir davantage avec la plateforme.

### Compte admin
Le compte admin dispose de privilèges supplémentaires.  
En plus des fonctionnalités classiques d’un utilisateur connecté, il peut accéder à la page d’administration et gérer les contenus dynamiques du site.

---