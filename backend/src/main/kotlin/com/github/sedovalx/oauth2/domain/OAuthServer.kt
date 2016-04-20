package com.github.sedovalx.oauth2.domain

import org.mongodb.morphia.annotations.Entity
import org.mongodb.morphia.annotations.Id
import javax.validation.constraints.NotNull

/**
 * Created by Alexander
 * on 18.04.2016.
 */
@Entity("servers")
class OAuthServer(
        @Id
        @NotNull
        var name: String = "",
        @NotNull
        var authEndpoint: String = "",
        var tokenEndpoint: String? = null,
        @NotNull
        var clientID: String = "",
        @NotNull
        var clientSecret: String = ""
)