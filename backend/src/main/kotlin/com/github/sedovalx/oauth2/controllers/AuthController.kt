package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.BuildUriResultDto
import com.github.sedovalx.oauth2.controllers.dto.CodeUriParamsDto
import com.github.sedovalx.oauth2.domain.FlowCode
import com.github.sedovalx.oauth2.storage.repos.OAuthServerRepo
import com.github.sedovalx.oauth2.utils.web.Response
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import java.net.URLEncoder

/**
 * Created by Alexander
 * on 22.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/auth")
class AuthController : ControllerBase() {
    @Autowired
    private lateinit var serverRepo: OAuthServerRepo

    @Suppress("IfNullToElvis")
    @RequestMapping(value = "build-uri/code", method = arrayOf(RequestMethod.POST))
    fun buildUri(@Validated @RequestBody params: CodeUriParamsDto): ResponseEntity<BuildUriResultDto> {
        imitateTimeouts()

        if (params.serverName == null) {
            return Response.buildJsonObject(HttpStatus.BAD_REQUEST, BuildUriResultDto.error("OAuth server name expected"))
        }

        val server = serverRepo.get(params.serverName)
        if (server == null) {
            return Response.buildJsonObject(
                    HttpStatus.NOT_FOUND,
                    BuildUriResultDto.error("OAuth server with name [${params.serverName}] not found")
            )
        };

        var uri = "${server.authEndpoint}?response_type=code&client_id=${encodeUtf8(server.clientID)}"
        if (params.scope != null) {
            uri += "&scope=${encodeUtf8(params.scope)}"
        }
        if (params.state != null) {
            uri += "&state=${encodeUtf8(params.state)}"
        }

        return Response.buildJsonObjectOK(BuildUriResultDto.uri(uri))
    }

    private fun encodeUtf8(s: String) = URLEncoder.encode(s, "UTF-8")
}