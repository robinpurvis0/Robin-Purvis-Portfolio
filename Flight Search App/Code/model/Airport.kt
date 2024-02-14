package com.example.flightsearch.model

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "airport")
data class Airport(
    @PrimaryKey
    val id: Int = 0,
    @ColumnInfo(name = "name")
    val airportName: String = "",
    @ColumnInfo("iata_code")
    val iataCode: String = "",
    val passengers: Int = 0
)
