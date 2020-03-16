export const kelvinToCelsius = (kelvin) => {
    if (isNaN(kelvin))
        return "-"
    return (kelvin - 273.15).toFixed(1)
}