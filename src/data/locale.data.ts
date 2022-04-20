export const locale = {
    fr: {
        router: {
            idRequired: "La référence de l'objet est requise",
            titleRequired: "Le libellé est requis",
            categoryRequired: "La categorie est requise",
            referenceRequired: "La référence est requise",
        },
        controller: {
            urlRequired: "L'url est requise",
            notFound: "Enregistrement introuvable",
            wrongObjectId: "L'identifiant de l'objet n'est pas valide",
            saverNotfound: "Impossible de vérifier l'identité de l'administrateur, veuillez vous reconnecter. Si le problème persiste contactez un administrateur système.",
            categoryNotfound: "Categorie introuvable",
            subcategoryNotfound: "Sous-categorie introuvable",
            channelAlreadySaved: "Un enregistrement similaire a déjà été importé.",
            titleExist: "Un enregistrement avec ce titre existe déjà",
            successImport: "Enregistrements éffectués!",
            successSave: "Enregistrement réussie!",
            successUpdate: "Modification réussie!",
            successRemove: "Enregistrement supprimé avec succès.",
        },
        notfound: (label: string = '') => {
            return `${label} introuvable`
        },
        required: (label: string = '') => {
            return `${label} est un champs requis`
        },
        exist: (label: string = '') => {
            return `Un enregistrement avec ${label} exist déjà`
        },
        system: {
            errorTryCatchMessage: "Une erreur inattendue s'est produite."
        },
    },
    en: {
        controller: {},
        router: {},
        model: {},
        system: {},
    }
}