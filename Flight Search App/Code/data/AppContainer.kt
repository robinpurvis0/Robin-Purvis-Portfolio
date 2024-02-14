/*
Robin Purvis
OSU
CS492
 */

package com.example.flightsearch.data

import android.content.Context

/**
 * App container for Dependency injection.
 */
interface AppContainer {
    val flightRepository: FlightRepository
}

/**
 * [AppContainer] implementation that provides instance of [OfflineFlightRepository]
 */
class AppDataContainer(private val context: Context) : AppContainer {
    /**
     * Implementation for [FlightRepository]
     */
    override val flightRepository: FlightRepository by lazy {
        OfflineFlightRepository(FlightDatabase.getDatabase(context).flightDao())
    }
}