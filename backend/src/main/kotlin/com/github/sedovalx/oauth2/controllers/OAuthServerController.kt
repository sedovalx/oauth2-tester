package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.domain.OAuthServer
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
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

        return Response.buildJsonObjectOK(repo.getAll(limit))
    }

    /**
     * Сохранение данных сервера
     */
    @RequestMapping(method = arrayOf(RequestMethod.POST))
    fun save(@Validated @RequestBody entity: OAuthServer): ResponseEntity<OAuthServer> {
        val saved = repo.save(entity)
        return Response.buildJsonObjectOK(saved)
    }

    /**
     * Удаление существующего
     */
    @RequestMapping(value = "{name}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable name: String): ResponseEntity<String?> {
        // todo: remove it
        Thread.sleep(1000)

        return if (repo.delete(name))
            Response.buildJsonOK()
        else
            Response.buildJsonResponse(HttpStatus.NOT_FOUND, "{ 'name': '$name' }")
    }

    /**
     * Создание дефолтного списка
     */
    @RequestMapping(value = "/create-test-data", method = arrayOf(RequestMethod.POST))
    fun default(): ResponseEntity<List<OAuthServer>> {
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
        return Response.buildJsonObjectOK(entities)
    }
}