package com.example.flightsearch.ui.search

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.flightsearch.model.Airport

@Composable
fun SearchResults(
    modifier: Modifier = Modifier,
    airports: List<Airport>,
    onSelectCode: (String) -> Unit,
) {
    LazyColumn(
        modifier = modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        items(
            items = airports
        ) {
            Card(
                modifier = modifier
                    .fillMaxWidth()
                    .padding(8.dp)
                    .border(1.dp, Color.Black, shape = RoundedCornerShape(8.dp)),
            ) {
                AirportRow(
                    code = it.iataCode,
                    name = it.airportName,
                    onSelectCode = onSelectCode,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 8.dp)
                )
            }
        }
    }
}