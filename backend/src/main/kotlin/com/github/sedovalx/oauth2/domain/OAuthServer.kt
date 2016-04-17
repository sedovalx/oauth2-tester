package com.github.sedovalx.oauth2.domain

import com.github.sedovalx.oauth2.dto.OAuthServerDto

/**
 * Created by Alexander
 * on 18.04.2016.
 */
class OAuthServer(
        val id: Long,
        name: String,
        authEndpoint: String,
        tokenEndpoint: String?,
        clientID: String,
        clientSecret: String
): OAuthServerDto(name, authEndpoint, tokenEndpoint, clientID, clientSecret) {
    companion object {
        fun fromDto(id: Long, dto: OAuthServerDto): OAuthServer {
            return OAuthServer(
                    id = id,
                    name = dto.name,
                    authEndpoint = dto.authEndpoint,
                    tokenEndpoint = dto.tokenEndpoint,
                    clientID = dto.clientID,
                    clientSecret = dto.clientSecret
            )
        }
    }
}