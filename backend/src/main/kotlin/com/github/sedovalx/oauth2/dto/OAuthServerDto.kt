package com.github.sedovalx.oauth2.dto

import javax.validation.constraints.NotNull

/**
 * Created by Alexander
 * on 15.04.2016.
 */
open class OAuthServerDto(
        @NotNull
        val name: String,
        @NotNull
        val authEndpoint: String,
        val tokenEndpoint: String? = null,
        @NotNull
        val clientID: String,
        @NotNull
        val clientSecret: String
)