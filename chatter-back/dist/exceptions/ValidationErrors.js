'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ValidationErrors = void 0;
var ValidationErrors;
(function (ValidationErrors) {
  ValidationErrors['REQUIRED_FIELD'] = 'Ce champ est obligatoire.';
  ValidationErrors['EMAIL_INVALID'] = "L'adresse e-mail n'est pas valide.";
  ValidationErrors['CREDENTIALS_INVALID'] = 'Les identifiants sont incorrects.';
  ValidationErrors['PSEUDO_LENGTH'] =
    'Le pseudo doit contenir au moins 3 caract\u00E8res.';
  ValidationErrors['PASSWORD_CONFIRM'] =
    'Les mots de passe ne correspondent pas.';
  ValidationErrors['EMAIL_ALREADY_USED'] =
    'Cette adresse e-mail est d\u00E9j\u00E0 utilis\u00E9e.';
  ValidationErrors['ERROR_404'] = 'Erreur 404';
  ValidationErrors['USER_NOT_FOUND'] = 'Utilisateur non trouv\u00E9';
})(ValidationErrors || (exports.ValidationErrors = ValidationErrors = {}));
//# sourceMappingURL=ValidationErrors.js.map
