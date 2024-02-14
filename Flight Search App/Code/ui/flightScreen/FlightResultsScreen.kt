package com.example.flightsearch.ui.flightScreen

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.flightsearch.model.Airport
import com.example.flightsearch.model.Favorite

@Composable
fun FlightResults(
    modifier: Modifier = Modifier,
    departureAirport: Airport,
    destinationList: List<Airport>,
    favoriteList: List<Favorite>,
    favoriteClickListener: (String, String) -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Start,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Showing flights from: ",
            style = MaterialTheme.typography.h6,
        )
        Text(
            text = departureAirport.iataCode,
            style = MaterialTheme.typography.h6,
        )
    }

    Column {
        LazyColumn(
            modifier = modifier
                .padding(8.dp)
                .fillMaxWidth()
        ) {
            items(destinationList, key = { it.id }) { item ->
                val isFavorite = favoriteList.find { f ->
                    f.departureCode == departureAirport.iataCode &&
                            f.destinationCode == item.iataCode }

                FlightDepartArrive(
                    isUserFavorite = isFavorite != null,
                    departureCode = departureAirport.iataCode,
                    departureName = departureAirport.airportName,
                    destinationCode = item.iataCode,
                    destinationName = item.airportName,
                    favoriteClickListener = favoriteClickListener
                )
            }
        }
    }
}