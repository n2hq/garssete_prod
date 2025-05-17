export type NavProps = {
    openNav: () => void
    navBg: boolean
}

export type NavTheme = {
    theme: string
}

export type CenterNavProps = {
    navBg: boolean
}

export type MobileNavProps = {
    showNav: boolean
    closeNav: () => void
}