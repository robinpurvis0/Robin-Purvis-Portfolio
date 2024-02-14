package com.example.flightsearch.ui.search

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.flightsearch.model.Airport
import com.example.flightsearch.model.Favorite
import com.example.flightsearch.ui.flightScreen.FlightDepartArrive

@Composable
fun FavoriteResult(
    modifier: Modifier = Modifier,
    airportList: List<Airport>,
    favoriteList: List<Favorite>,
    onFavoriteClick: (String, String) -> Unit
) {
    LazyColumn(
        modifier = modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        items(favoriteList, key = { it.id }) { item ->
            val departAirport = airportList.first { airport -> airport.iataCode == item.departureCode }
            val destinationAirport =
                airportList.first { airport -> airport.iataCode == item.destinationCode }
            FlightDepartArrive(
                isUserFavorite = true,
                departureCode = departAirport.iataCode,
                departureName = departAirport.airportName,
                destinationCode = destinationAirport.iataCode,
                destinationName = destinationAirport.airportName,
                favoriteClickListener = onFavoriteClick
            )
        }
    }
}