package com.github.sedovalx.oauth2.controllers.dto

/**
 * Created by Alexander
 * on 26.04.2016.
 */
data class ResponseDto(
        val status: HttpStatusDto,
        val headers: List<KeyValueDto>,
        val contentLength: Long,
        val body: String? = null
)