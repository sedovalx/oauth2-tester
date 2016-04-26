package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import com.github.sedovalx.oauth2.controllers.dto.ResponsePackDto
import com.github.sedovalx.oauth2.services.HttpHelper
import com.github.sedovalx.oauth2.utils.logging.Loggable
import com.github.sedovalx.oauth2.utils.web.Response
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.config.RequestConfig
import org.apache.http.impl.client.HttpClients
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Created by Alexander
 * on 26.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/request")
open class RequestController {
    @Autowired
    private lateinit var httpHelper: HttpHelper

    /**
     * Executes incoming requests and returns request/response/status data to a client
     * Helps avoid CORS requests from the browser
     */
    @Loggable
    @RequestMapping(value = "", method = arrayOf(RequestMethod.POST))
    open fun getResponse(@Validated @RequestBody clientReq: RequestDto): ResponseEntity<ResponsePackDto> {
        // enable cookies
        val httpClient = HttpClients.custom()
                .setDefaultRequestConfig(
                    RequestConfig.custom().setCookieSpec(CookieSpecs.STANDARD).build()
                ).build()

        val request = try {
            httpHelper.buildRequest(clientReq)
        } catch (e: Exception) {
            return Response.buildObjectResponse(
                    HttpStatus.BAD_REQUEST,
                    MediaType.APPLICATION_JSON,
                    ResponsePackDto.error(clientReq, e)
            )
        }

        try {
            httpClient.execute(request).use { response ->
                val responseDto = httpHelper.parseResponse(response)
                // OK doesn't mean that the request to outer resource completed successfully
                return Response.buildJsonObjectOK(ResponsePackDto.success(clientReq, responseDto))
            }
        } catch (e: Exception) {
            return Response.buildObjectResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    MediaType.APPLICATION_JSON,
                    ResponsePackDto.error(clientReq, e)
            )
        }
    }

}

