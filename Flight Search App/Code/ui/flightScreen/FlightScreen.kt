package com.example.flightsearch.ui.flightScreen

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.flightsearch.NavigationDestination
import com.example.flightsearch.R

object FlightScreenDestination : NavigationDestination {
    override val route = "flightScreen"
    override val titleRes = R.string.app_name
    const val codeArg = "code"
    val routeWithArgs = "$route/{$codeArg}"
}

@Composable
fun FlightScreen() {
    val viewModel: FlightViewModel = viewModel(factory = FlightViewModel.Factory)
    val uiState = viewModel.uiState.collectAsState()

    Column {
            FlightResults(
                departureAirport = uiState.value.selectedDepartureAirport,
                destinationList = uiState.value.destinations,
                favoriteList = uiState.value.favorites,
                favoriteClickListener = { s1: String, s2: String ->
                        viewModel.addFavoriteFlight(s1, s2)
                }
            )
    }
}