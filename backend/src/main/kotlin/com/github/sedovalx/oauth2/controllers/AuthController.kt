package com.github.sedovalx.oauth2.controllers

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import com.github.sedovalx.oauth2.utils.web.Response
import org.apache.http.client.config.CookieSpecs
import org.apache.http.client.config.RequestConfig
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClients
import org.apache.http.message.BasicHeader
import org.apache.http.util.EntityUtils
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Created by Alexander
 * on 26.04.2016.
 */
@RestController
@RequestMapping(value = "**/api/auth/")
class AuthController {
    @RequestMapping(value = "exchange-code-for-token", method = arrayOf(RequestMethod.POST))
    fun getToken(@RequestBody request: RequestDto): ResponseEntity<String> {
        val httpClient = HttpClients.custom().setDefaultRequestConfig(RequestConfig.custom().setCookieSpec(CookieSpecs.STANDARD).build()).build()
        val httpPost = HttpPost(request.uri)
        request.headers?.forEach {
            httpPost.addHeader(BasicHeader(it.key, it.value))
        }
        httpClient.execute(httpPost).use { response ->
            return Response.buildJsonObjectOK(EntityUtils.toString(response.entity))
        }
    }
}