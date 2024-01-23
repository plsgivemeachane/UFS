function getTheme() {
    var colorTheme = localStorage.getItem("color_theme") || "#161A30"
    return colorTheme
}

function setTheme(colorTheme: string) {
    localStorage.setItem("color_theme", colorTheme)
}

export { getTheme, setTheme }