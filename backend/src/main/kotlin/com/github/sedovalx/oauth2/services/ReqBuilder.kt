package com.github.sedovalx.oauth2.services

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import org.apache.http.client.methods.HttpUriRequest

/**
 * Author AlSedov on 26.04.2016
 */
interface ReqBuilder {
    /**
     * Build HttpClient's request
     * @param clientReq request data from the client
     * @return new request
     */
    fun buildRequest(clientReq: RequestDto): HttpUriRequest
}