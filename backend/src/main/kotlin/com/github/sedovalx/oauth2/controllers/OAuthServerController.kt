package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.dto.OAuthServer
import com.github.sedovalx.oauth2.utils.web.Response
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Created by Alexander
 * on 15.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/servers")
class OAuthServerController {
    /**
     * Получение списка сохраненных OAuth серверов
     */
    @RequestMapping(value = "", method = arrayOf(RequestMethod.GET))
    fun getAll(@RequestParam(required = false) limit: Int? = 100): ResponseEntity<List<OAuthServer>> {
        Thread.sleep(1000)
        return Response.buildJsonObjectOK(listOf(
                OAuthServer(
                        id = 1,
                        name = "GitHub.com",
                        authEndpoint = "https://github.com/login/oauth/authorize",
                        tokenEndpoint = "https://github.com/login/oauth/access_token",
                        clientID = "a586b75223a497c9e81f",
                        clientSecret = "87b7c4f7877f1c8d30d20bb2024172918a6ff3e5"
                )
        ))
    }
}