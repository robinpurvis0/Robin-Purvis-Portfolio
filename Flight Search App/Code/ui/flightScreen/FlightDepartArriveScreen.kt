package com.example.flightsearch.ui.flightScreen

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.flightsearch.R
import com.example.flightsearch.ui.search.AirportRow

@Composable
fun FlightDepartArrive(
    modifier: Modifier = Modifier,
    isUserFavorite: Boolean,
    departureCode: String,
    departureName: String,
    destinationCode: String,
    destinationName: String,
    favoriteClickListener: (String, String) -> Unit,
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp)
            .border(1.dp, Color.Black, shape = RoundedCornerShape(8.dp)),
    ) {
        Column(
            modifier = modifier.padding(8.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = "Departure",
                        style = MaterialTheme.typography.h6,
                        modifier = Modifier.padding(start = 23.dp)
                    )
                    AirportRow(code = departureCode, name = departureName)
                }
                IconButton(
                    onClick = {
                        favoriteClickListener(departureCode, destinationCode)
                    },
                    modifier = Modifier.align(Alignment.CenterVertically)
                ) {
                    Icon(
                        painter = painterResource(id = R.drawable.star_foreground),
                        tint = if (isUserFavorite) Color.Red else Color.Gray,
                        contentDescription = null
                    )
                }
            }

            Text(
                text = "Arrival",
                style = MaterialTheme.typography.h6,
                modifier = Modifier.padding(start = 23.dp)
            )
            AirportRow(code = destinationCode, name = destinationName)
        }
    }
}



