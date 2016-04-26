package com.github.sedovalx.oauth2.services

import com.github.sedovalx.oauth2.controllers.dto.HttpStatusDto
import com.github.sedovalx.oauth2.controllers.dto.KeyValueDto
import com.github.sedovalx.oauth2.controllers.dto.RequestDto
import com.github.sedovalx.oauth2.controllers.dto.ResponseDto
import org.apache.http.client.methods.CloseableHttpResponse
import org.apache.http.client.methods.HttpUriRequest
import org.apache.http.client.methods.RequestBuilder
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import org.apache.http.util.EntityUtils
import org.springframework.stereotype.Service

/**
 * Author AlSedov on 26.04.2016
 */
@Service
class HttpHelperImpl : HttpHelper {
    override fun parseResponse(response: CloseableHttpResponse): ResponseDto {
        val statusCode = response.statusLine.statusCode
        val statusReason = response.statusLine.reasonPhrase
        val statusProtocol = response.statusLine.protocolVersion.toString()
        val headers = response.allHeaders.map { KeyValueDto(it.name, it.value) }
        val contentLength = response.entity.contentLength
        val body = EntityUtils.toString(response.entity)
        return ResponseDto(
                HttpStatusDto(
                        statusCode,
                        statusReason,
                        statusProtocol
                ),
                headers,
                contentLength,
                body
        )
    }

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