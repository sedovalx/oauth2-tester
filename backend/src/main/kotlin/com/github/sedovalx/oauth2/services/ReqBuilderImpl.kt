package com.github.sedovalx.oauth2.services

import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import org.apache.http.client.methods.HttpUriRequest
import org.apache.http.client.methods.RequestBuilder
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import org.springframework.stereotype.Service

/**
 * Author AlSedov on 26.04.2016
 */
@Service
class ReqBuilderImpl : ReqBuilder {
    override fun buildRequest(clientReq: RequestDto): HttpUriRequest {
        val builder = clientReq.headers.fold(
                RequestBuilder
                        .create(clientReq.method.name)
                        .setUri(clientReq.uri)
        ){ builder, header ->
            builder.addHeader(header.key, header.value)
        }

        if (clientReq.body != null) {
            builder.entity = StringEntity(clientReq.body, ContentType.create(clientReq.mimeType, clientReq.charset))
        }

        return builder.build()
    }
}