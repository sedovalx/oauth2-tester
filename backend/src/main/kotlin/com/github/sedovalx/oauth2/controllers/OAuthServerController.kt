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

    @RequestMapping(value = "", method = arrayOf(RequestMethod.POST))
    fun create(@Validated @RequestBody dto: OAuthServerDto): ResponseEntity<OAuthServer> {
        // todo: remove it
        Thread.sleep(1000)

        val entity = repo.create(dto)
        return Response.buildJsonObjectOK(entity)
    }

    @RequestMapping(value = "{id}", method = arrayOf(RequestMethod.DELETE))
    fun delete(@PathVariable id: Long): ResponseEntity<String?> {
        val wasFound = repo.delete(id)
        return if (wasFound) Response.buildJsonOK() else Response.buildStringResponse(HttpStatus.NOT_FOUND, MediaType.APPLICATION_JSON, null)
    }
}