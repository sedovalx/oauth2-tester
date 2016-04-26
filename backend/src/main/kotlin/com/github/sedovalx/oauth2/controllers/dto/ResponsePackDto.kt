package com.github.sedovalx.oauth2.controllers.dto

data class ResponsePackDto(
        val request: RequestDto,
        val response: ResponseDto? = null,
        val error: Exception? = null
)