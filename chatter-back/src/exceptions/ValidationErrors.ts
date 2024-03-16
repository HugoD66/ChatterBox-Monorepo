export enum ValidationErrors {
  REQUIRED_FIELD = 'Ce champ est obligatoire.',
  EMAIL_INVALID = "L'adresse e-mail n'est pas valide.",
  CREDENTIALS_INVALID = 'Les identifiants sont incorrects.',
  PSEUDO_LENGTH = 'Le pseudo doit contenir au moins 3 caractères.',
  PASSWORD_CONFIRM = 'Les mots de passe ne correspondent pas.',
  EMAIL_ALREADY_USED = 'Cette adresse e-mail est déjà utilisée.',
  ERROR_404 = 'Erreur 404',
  USER_NOT_FOUND = 'Utilisateur non trouvé',
}
