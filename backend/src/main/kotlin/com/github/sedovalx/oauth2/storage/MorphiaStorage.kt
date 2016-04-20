package com.github.sedovalx.oauth2.storage

import com.mongodb.MongoClient
import org.mongodb.morphia.Datastore
import org.mongodb.morphia.Morphia
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

/**
 * Author AlSedov on 20.04.2016
 */
@Service
class MorphiaStorage {
    private val log: Logger = LoggerFactory.getLogger(this.javaClass)

    @Value("\${mongodb.connection.host:localhost}")
    private lateinit var host: String

    @Value("\${mongodb.connection.port:27017}")
    private var port: Int = 27017

    @Value("\${mongodb.connection.dbname:oauth2tester}")
    private lateinit var dbName: String

    fun connect(): Datastore {
        val morphia = Morphia()
        morphia.mapPackage("com.github.sedovalx.oauth2.domain")
        try {
            return  morphia.createDatastore(MongoClient(host, port), dbName)
        } catch (e: Exception) {
            log.error("Error connecting to $dbName on $host:$port. Make sure the db is running.", e)
            throw e
        }
    }
}