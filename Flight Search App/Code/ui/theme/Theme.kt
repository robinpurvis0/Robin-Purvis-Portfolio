package com.example.flightsearch.ui.theme

import androidx.compose.material.MaterialTheme
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable

private val ColorPalette = lightColors(
    primary = Blue100,
    primaryVariant = Blue200,
    secondary = Purple100
)

@Composable
fun FlightSearchTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colors = ColorPalette,
        content = content
    )
}