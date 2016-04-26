package com.github.sedovalx.oauth2.services

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import com.github.sedovalx.oauth2.controllers.dto.ResponseDto
import org.apache.http.client.methods.CloseableHttpResponse
import org.apache.http.client.methods.HttpUriRequest

/**
 * Author AlSedov on 26.04.2016
 */
interface HttpHelper {
    /**
     * Build HttpClient's request
     * @param clientReq request data from the client
     * @return new request
     */
    fun buildRequest(clientReq: RequestDto): HttpUriRequest

    /**
     * Get info subset from the HttpClient response
     * @param response original response from the outer host
     * @return parsed response data
     */
    fun parseResponse(response: CloseableHttpResponse): ResponseDto
}