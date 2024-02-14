package com.example.flightsearch.model

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "favorite")
data class Favorite(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    @ColumnInfo(name = "destination_code")
    val destinationCode: String,
    @ColumnInfo("departure_code")
    val departureCode: String,
)

