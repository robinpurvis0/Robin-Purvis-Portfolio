package com.example.flightsearch.ui.flightScreen

import com.example.flightsearch.model.Airport
import com.example.flightsearch.model.Favorite

data class FlightsUiState(
    val code: String = "",
    val favorites: List<Favorite> = emptyList(),
    val destinations: List<Airport> = emptyList(),
    val selectedDepartureAirport: Airport = Airport(),
)
