package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import com.github.sedovalx.oauth2.services.ReqBuilder
import com.github.sedovalx.oauth2.utils.web.Response
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClients
import org.apache.http.message.BasicHeader
import org.apache.http.util.EntityUtils
import org.springframework.beans.factory.annotation.Autowired
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
class RequestController {
    @Autowired
    private lateinit var requestBuilder: ReqBuilder

    /**
     * Executes incoming requests and returns request/response/status data to a client
     * Helps avoid CORS requests from the browser
     */
    @RequestMapping(value = "", method = arrayOf(RequestMethod.POST))
    fun getResponse(@Validated @RequestBody clientReq: RequestDto): ResponseEntity<String> {
        // enable cookies
        val httpClient = HttpClients.custom()
                .setDefaultRequestConfig(
                    RequestConfig.custom().setCookieSpec(CookieSpecs.STANDARD).build()
                ).build()

        val request = requestBuilder.buildRequest(clientReq)
        httpClient.execute(request).use { response ->
            return Response.buildJsonObjectOK(EntityUtils.toString(response.entity))
        }
    }
}