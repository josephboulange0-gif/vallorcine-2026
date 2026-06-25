# Guide de Synchronisation Google Sheets 📊

Pour que les votes de présence de tous les participants se synchronisent directement et en temps réel sur une feuille de calcul dans votre **Google Drive**, suivez ces étapes simples (durée : 3 minutes, 100% gratuit).

---

## Étape 1 : Créer votre Google Sheet
1. Ouvrez votre Google Drive et créez une nouvelle feuille de calcul **Google Sheets**.
2. Nommez votre fichier (ex : `Sondages Vallorcine 2026`).
3. Laissez la feuille vide, le script va créer automatiquement les en-têtes lors du premier vote.

---

## Étape 2 : Ajouter le script de connexion (Google Apps Script)
1. Dans le menu du haut de votre Google Sheet, cliquez sur **Extensions** -> **Apps Script**.
2. Effacez le code existant dans l'éditeur (la fonction `myFunction`).
3. Copiez et collez le code suivant dans l'éditeur :

```javascript
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var votes = [];
  
  // Parcourir les lignes du tableau (sauter la ligne d'en-tête)
  for (var i = 1; i < data.length; i++) {
    votes.push({
      timestamp: data[i][0],
      courseId: data[i][1],
      name: data[i][2],
      status: data[i][3]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(votes))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Initialiser les en-têtes si le tableau est vide
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Horodatage", "CourseId", "Nom", "Statut"]);
  }
  
  var params = JSON.parse(e.postData.contents);
  var timestamp = new Date().toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit',
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  var nameToFind = params.name.toString().toLowerCase().trim();
  var courseToFind = params.courseId.toString().toLowerCase().trim();
  var updated = false;
  
  // Cas de suppression
  if (params.status === 'delete') {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][2].toString().toLowerCase().trim() === nameToFind && 
          data[i][1].toString().toLowerCase().trim() === courseToFind) {
        sheet.deleteRow(i + 1);
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify({result: "deleted"}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Cas d'ajout ou de mise à jour du vote
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][2].toString().toLowerCase().trim() === nameToFind && 
        data[i][1].toString().toLowerCase().trim() === courseToFind) {
      // Mettre à jour la ligne existante
      sheet.getRange(i + 1, 1).setValue(timestamp);
      sheet.getRange(i + 1, 4).setValue(params.status);
      updated = true;
      break;
    }
  }
  
  if (!updated) {
    // Ajouter une nouvelle ligne
    sheet.appendRow([timestamp, params.courseId, params.name, params.status]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Cliquez sur la disquette en haut pour **Enregistrer** le projet.

---

## Étape 3 : Déployer le script en Web App
1. Cliquez sur le bouton bleu **Déployer** (en haut à droite) -> **Nouveau déploiement**.
2. Cliquez sur l'engrenage à côté de "Sélectionner le type" et choisissez **Application Web**.
3. Configurez les paramètres suivants :
   * **Description** : `API Sondage Vallorcine`
   * **Exécuter en tant que** : **Moi (votre e-mail)**
   * **Qui a accès** : **Tout le monde** *(très important pour que le site puisse envoyer les réponses sans authentification Google)*.
4. Cliquez sur **Déployer**.
5. Google va vous demander d'autoriser les accès. Cliquez sur **Autoriser l'accès**, puis sélectionnez votre compte Google.
   * *Note : Google affichera une alerte de sécurité ("Google n'a pas validé cette application"). Cliquez sur **Paramètres avancés** (en bas à gauche) puis sur **Accéder à Projet sans titre (non sécurisé)** pour valider.*
6. Copiez l'**URL de l'application web** qui s'affiche (elle se termine par `/exec`).

---

## Étape 4 : Brancher l'URL dans votre code
1. Ouvrez le fichier `src/components/RsvpWidget.tsx` dans votre projet.
2. À la ligne 8, remplacez la valeur vide de la variable `GOOGLE_SCRIPT_URL` par l'URL que vous venez de copier :
   ```typescript
   const GOOGLE_SCRIPT_URL = 'VOTRE_URL_GOOGLE_SCRIPT_ICI';
   ```
3. Enregistrez le fichier.

C'est tout ! Les votes s'écriront et se liront désormais directement sur votre Google Sheet dans votre Google Drive, visibles par tous vos participants en temps réel sur le site !
