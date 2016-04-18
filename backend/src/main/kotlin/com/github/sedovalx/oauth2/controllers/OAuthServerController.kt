package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.dto.OAuthServerDto
import com.github.sedovalx.oauth2.repos.OAuthServerRepo
import com.github.sedovalx.oauth2.utils.web.Response
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

/**
 * Created by Alexander
 * on 15.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/servers")
class OAuthServerController {
    @Autowired
    private lateinit var repo: OAuthServerRepo

    /**
     * Получение списка сохраненных OAuth серверов
     */
    @RequestMapping(value = "", method = arrayOf(RequestMethod.GET))
    fun getAll(@RequestParam(required = false) limit: Int? = 100): ResponseEntity<List<OAuthServer>> {
        // todo: remove it
        Thread.sleep(100)

        return Response.buildJsonObjectOK(repo.get(limit))
    }

    /**
     * Создание нового
     */
    @RequestMapping(value = "", method = arrayOf(RequestMethod.POST))
    fun create(@Validated @RequestBody dto: OAuthServerDto): ResponseEntity<OAuthServer> {
        // todo: remove it
        Thread.sleep(1000)

        val entity = repo.create(dto)
        return Response.buildJsonObjectOK(entity)
    }

    /**
     * Редактирование существующего
     */
    @RequestMapping(value = "{id}", method = arrayOf(RequestMethod.POST))
    fun edit(@PathVariable id: Long, @Validated @RequestBody dto: OAuthServerDto): ResponseEntity<OAuthServer?> {
        // todo: remove it
        Thread.sleep(1000)

        val entity = repo.edit(id, dto)
        return if (entity != null)
            Response.buildJsonObjectOK(entity)
        else
            Response.buildJsonObject<OAuthServer?>(HttpStatus.NOT_FOUND, null);
    }

    /**
     * Удаление существующего
     */
    @RequestMapping(value = "{id}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable id: Long): ResponseEntity<String?> {
        // todo: remove it
        Thread.sleep(1000)

        val wasFound = repo.delete(id)
        val idJson = "{id: $id}"
        return if (wasFound)
            Response.buildJsonOK(idJson)
        else
            Response.buildJsonResponse(HttpStatus.NOT_FOUND, idJson)
    }

    /**
     * Создание дефолтного списка
     */
    @RequestMapping(value = "/default", method = arrayOf(RequestMethod.POST))
    fun default(): ResponseEntity<List<OAuthServer>> {
        val entities = arrayOf(
                OAuthServerDto(
                        name = "Github",
                        authEndpoint = "https://github.com/login/oauth/authorize",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServerDto(
                        name = "Facebook",
                        authEndpoint = "https://www.facebook.com/dialog/oauth",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServerDto(
                        name = "LinkedIn",
                        authEndpoint = "https://www.linkedin.com/uas/oauth2/authorization",
                        clientID = "123123",
                        clientSecret = "asdasd"
                ),
                OAuthServerDto(
                        name = "Google",
                        authEndpoint = "https://www.googleapis.com/oauth2/v4/token",
                        clientID = "123123",
                        clientSecret = "asdasd"
                )
        ).map { repo.create(it) }
        return Response.buildJsonObjectOK(entities)
    }
}