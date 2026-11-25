/* =========================================================
   🎁 LA LISTE DES CADEAUX — c'est le seul fichier à modifier
   ---------------------------------------------------------
   Les cadeaux sont dans l'ordre de préférence.
   Pour chaque cadeau :
   - nom         : le nom de l'article
   - description : une petite phrase (facultatif)
   - prix        : un nombre en euros (ex : 29.99) ou null
   - prixAvant   : (facultatif) ancien prix, affiché barré
   - note        : (facultatif) petite précision sous le prix
   - prixTexte   : (facultatif) texte à la place du prix (ex : "Participation libre")
   - image       : chemin vers une image dans assets/images/
   - lien        : lien vers la boutique (ou "" si aucun)
   - envie       : 1 = sympa, 2 = j'aimerais bien, 3 = j'en rêve ⭐
   ========================================================= */

const CADEAUX = [
  {
    nom: "Apple Watch SE",
    description: "44 mm, GPS, boîtier en aluminium minuit avec bracelet sport noir (taille M/L).",
    prix: 239,
    prixAvant: 279,
    note: "Avec la carte cadeau Apple de 40 € qu'on a déjà",
    image: "assets/images/apple-watch-se.jpg",
    lien: "https://www.apple.com/fr-edu/shop/buy-watch/apple-watch-se/44mm-gps-minuit-aluminium-black-bracelet-sport-m-l-se",
    envie: 3,
  },
  {
    nom: "Bracelet milanais magnétique",
    description: "Bracelet en métal à double fermeture magnétique, compatible Apple Watch.",
    prix: 12.36,
    image: "assets/images/bracelet-milanais.jpg",
    lien: "https://www.amazon.fr/gp/product/B0BZ7CRHHF/ref=ox_sc_act_title_1?smid=A1S4IXN067SZHH&th=1&psc=1",
    envie: 3,
  },
  {
    nom: "Câble USB-C UGREEN 240 W",
    description: "Câble USB-C PD 3.1 avec écran LED qui affiche la puissance, 2 mètres.",
    prix: null,
    prixTexte: "Voir le prix",
    image: "assets/images/cable-ugreen.jpg",
    lien: "https://www.amazon.fr/gp/product/B0F62PGJSM/ref=ewc_pr_img_3?smid=AXZ3JQ1GVFPIF&th=1",
    envie: 2,
  },
  {
    nom: "Mini PC Lenovo ThinkCentre M900 Tiny",
    description: "Reconditionné · Intel Core i5 quad-core, 8 Go de RAM, SSD 256 Go, Windows 11 Pro.",
    prix: 160,
    image: "assets/images/lenovo-thinkcentre.jpg",
    lien: "https://www.amazon.fr/gp/product/B0B8624BN3/ref=ewc_pr_img_2?smid=AQ5ELYRI4891Q&psc=1",
    envie: 2,
  },
  {
    nom: "Un coup de pouce pour mon Pass Annuel Disneyland",
    description: "Une participation, petite ou grande, pour m'aider à m'offrir mon Pass Annuel Disneyland Paris ✨",
    prix: null,
    prixTexte: "Participation libre",
    image: "assets/images/disneyland-pass.jpg",
    lien: "",
    envie: 2,
  },
];
