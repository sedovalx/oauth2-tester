package com.github.sedovalx.oauth2.dto

/**
 * Created by Alexander
 * on 15.04.2016.
 */
data class OAuthServer(
        val id: Int,
        val name: String,
        val authEndpoint: String,
        val tokenEndpoint: String,
        val clientID: String,
        val clientSecret: String
)