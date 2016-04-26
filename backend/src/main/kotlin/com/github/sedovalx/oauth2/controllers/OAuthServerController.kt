package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.OAuthServerListDto
import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import com.github.sedovalx.oauth2.utils.logging.Loggable
import com.github.sedovalx.oauth2.utils.web.Response
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

/**
 * Created by Alexander
 * on 15.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/servers")
open class OAuthServerController: ControllerBase() {
    @Autowired
    private lateinit var repo: OAuthServerRepo

    /**
     * Get list of saved servers
     */
    @Loggable
    @RequestMapping(value = "", method = arrayOf(RequestMethod.GET))
    open fun getAll(@RequestParam(required = false) limit: Int? = 100): ResponseEntity<OAuthServerListDto> {
        imitateTimeouts()

        val dto = OAuthServerListDto(repo.getAll(limit))
        return Response.buildJsonObjectOK(dto)
    }

    /**
     * Upsert server data
     */
    @Loggable
    @RequestMapping(value = "", method = arrayOf(RequestMethod.POST))
    open fun save(@Validated @RequestBody entity: OAuthServer): ResponseEntity<OAuthServer> {
        imitateTimeouts()

        val saved = repo.save(entity)
        return Response.buildJsonObjectOK(saved)
    }

    /**
     * Delete server data by name
     */
    @Loggable
    @RequestMapping(value = "{name}", method = arrayOf(RequestMethod.DELETE))
    open fun delete(@PathVariable name: String): ResponseEntity<String?> {
        imitateTimeouts()

        return if (repo.delete(name))
            Response.buildJsonOK()
        else
            Response.buildJsonResponse(HttpStatus.NOT_FOUND, "{ 'name': '$name' }")
    }

    /**
     * Create test data
     */
    @Loggable
    @RequestMapping(value = "/create-test-data", method = arrayOf(RequestMethod.POST))
    open fun default(): ResponseEntity<OAuthServerListDto> {
        val entities = arrayOf(
                OAuthServer(
                        name = "Github",
                        authEndpoint = "https://github.com/login/oauth/authorize",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServer(
                        name = "Facebook",
                        authEndpoint = "https://www.facebook.com/dialog/oauth",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServer(
                        name = "LinkedIn",
                        authEndpoint = "https://www.linkedin.com/uas/oauth2/authorization",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServer(
                        name = "Google",
                        authEndpoint = "https://www.googleapis.com/oauth2/v4/token",
                        clientID = "123123",
                        clientSecret = "asdasd"
                )
        ).map { repo.save(it) }
        val dto = OAuthServerListDto(entities)
        return Response.buildJsonObjectOK(dto)
    }
}