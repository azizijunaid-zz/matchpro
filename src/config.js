import {LayoutAnimation} from "react-native";

console.disableYellowBox = false;

export const CC_CREDENTIALS = {
    appId: 1199,
    authKey: 'Y-7nGR2uUz-YkO8',
    authSecret: 'dm-eODseeBrjMLW'
};

export const IMAGES = {
    placeHolderImage: require("../assets/placeholder.png"),
};


export const SWIPE_ACTIONS = {
    NOPE: 0,
    LIKE: 1,
    BLEAH: 2,
    SUPER_LIKE: 3

};

export const LAYOUT_ANIMATION = {
    duration: 200,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,

    },
    delete: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,

    }
};

// export const API_URL = "http://127.0.0.1:3333";
export const API_URL = "https://rattehin.herokuapp.com";

export const LANGUAGES = [
    {
        name: "English",
        default: true,
        flag: "",
        translations: {
            dictionary: {
                women: "Women",
                men: "Men",
                logout: "Logout",
                login: "Log in",
                signUp: "Sign up",
                forgotPassword: "Forgot your password?",
                dontHaveAccount: "Don't have an account?",
                haveAccount: "Already have an account?",
                share: "Share",
                profile: "Profile",
                report: "Report"
            },
            fields: {
                full_name: "Full Name",
                about_me: "About me",
                job_title: "Job Title",
                company: "Company",
                education: "Education",
                phoneNumber: "Phone Number",
                email: "Email",
                location: "Location",
                maxDistance: "Maximum Distance",
                showMe: "Show me",
                ageRange: "Age Range",
                password: "Password",
                language: "Language"
            },
            authScreen: {
                discoverButtonText: "Discovery Settings",
            },
            messagesScreen: {
                title: "Messages",
                messages: "Messages",
                matches: "Matches",
                placeholderTitle: "Check back later",
                placeholderMessage: "Your messages will appear here",

            },
            chatScreen: {
                placeholderMessage: "",
                inputPlaceholder: "Type a message...",
            },
            discoverScreen: {
                title: "Discover",
                placeholderMessage: "There is no one around you, Expand your Discovery settings to see more people.",
                discoverButtonText: "Discovery Settings",

            },
            profileScreen: {},
            matchScreen: {
                title: "Matches",
                placeholderTitle: "Check back later",
                placeholderMessage: "Your matches activity will appear here",

            },
            likeScreen: {
                placeholderTitle: "Check back later",
                placeholderMessage: "Your likes activity will appear here",

            },
            userDetailScreen: {
                placeholderMessage: "",
                kilometersAway: "Kilometers away",
                lastSeen: "Last seen",
                shareDesc: "SEE WHAT A FRIEND THINKS",

            },
        },
    },
    {
        name: "French",
        flag: "",
        translations: {
            dictionary: {
                women: "Femmes",
                men: "Hommes",
                logout: "Se déconnecter",
                login: "S'identifier",
                signUp: "S'inscrire",
                forgotPassword: "Mot de passe oublié?",
                dontHaveAccount: "Vous n'avez pas de compte?",
                haveAccount: "Vous avez déjà un compte?",
                share: "Partager",
                profile: "Profil",
                report: "rapport"
            },
            fields: {
                full_name: "Nom complet",
                about_me: "À propos de moi",
                job_title: "Profession",
                company: "Compagnie",
                education: "Éducation",
                phoneNumber: "Numéro de téléphone",
                email: "Email",
                location: "Emplacement",
                maxDistance: "Distance maximale",
                showMe: "Montre moi",
                ageRange: "Tranche d'âge",
                password: "Mot de passe",
                language: "La langue"
            },
            authScreen: {
                discoverButtonText: "Discovery Settings",
            },
            messagesScreen: {
                title: "Messages",
                messages: "Messages",
                matches: "Allumettes",
                placeholderTitle: "Revenez plus tard",
                placeholderMessage: "Vos messages apparaîtront ici",

            },
            chatScreen: {
                placeholderMessage: "",
                inputPlaceholder: "Tapez un message...",

            },
            discoverScreen: {
                title: "Découvrir",
                placeholderMessage: "Il n'y a personne autour de vous, développez vos paramètres de découverte pour voir plus de personnes",
                discoverButtonText: "Paramètres de découverte",

            },
            profileScreen: {},
            matchScreen: {
                title: "Allumettes",
                placeholderTitle: "Revenez plus tard",
                placeholderMessage: "Votre activité de match apparaîtra ici",

            },
            likeScreen: {
                placeholderTitle: "Revenez plus tard",
                placeholderMessage: "Votre activité J'aime apparaîtra ici",

            },
            userDetailScreen: {
                placeholderMessage: "",
                kilometersAway: "Kilomètres",
                lastSeen: "Vue la dernière fois",
                shareDesc: "VOIR CE QU'UN AMI PENSE",
            },
        },
    },
    {
        name: "Russian",
        flag: "",
        translations: {
            dictionary: {
                women: "женщины",
                men: "Мужчины",
                logout: "Выйти",
                login: "Авторизоваться",
                signUp: "зарегистрироваться",
                forgotPassword: "Забыли свой пароль?",
                dontHaveAccount: "У вас нет аккаунта?",
                haveAccount: "Уже есть аккаунт?",
                share: "доля",
                profile: "Профиль",
                report: "отчет"
            },
            fields: {
                full_name: "Полное имя",
                about_me: "Обо мне",
                job_title: "Название работы",
                company: "Компания",
                education: "образование",
                phoneNumber: "Номер телефона",
                email: "Электронное письмо",
                location: "Место нахождения",
                maxDistance: "Максимальное расстояние",
                showMe: "Покажи мне",
                ageRange: "Возрастной диапазон",
                password: "пароль",
                language: "язык"
            },
            authScreen: {
                discoverButtonText: "Настройки обнаружения",
            },
            messagesScreen: {
                title: "Сообщения",
                messages: "Сообщения",
                matches: "Спички",
                placeholderTitle: "Проверьте позднее",
                placeholderMessage: "Ваши сообщения появятся здесь",

            },
            chatScreen: {
                placeholderMessage: "",
                inputPlaceholder: "Введите сообщение ...",
            },
            discoverScreen: {
                title: "Обнаружить",
                placeholderMessage: "Вокруг вас никого нет. Раскройте настройки Discovery, чтобы увидеть больше людей.",
                discoverButtonText: "Настройки обнаружения",

            },
            profileScreen: {},
            matchScreen: {
                title: "Спички",
                placeholderTitle: "Проверьте позднее",
                placeholderMessage: "Ваша игровая активность появится здесь",

            },
            likeScreen: {
                placeholderTitle: "Проверьте позднее",
                placeholderMessage: "Ваша лайковая активность появится здесь",

            },
            userDetailScreen: {
                placeholderMessage: "",
                kilometersAway: "Километров",
                lastSeen: "В последний раз видел",
                shareDesc: "УВИДЕТЬ, ЧТО ДРУГ ДУМАЕТ",

            },
        },
    },
];
