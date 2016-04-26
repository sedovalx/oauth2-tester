package com.github.sedovalx.oauth2.controllers.dto

data class ResponsePackDto(
        val request: RequestDto,
        val response: ResponseDto? = null,
        val error: ErrorDto? = null
) {
    companion object {
        fun success(request: RequestDto, response: ResponseDto) = ResponsePackDto(request, response = response)

        fun error(request: RequestDto, e: Exception) = ResponsePackDto(
                request,
                error = ErrorDto(
                        "Unfortunately we cannot execute the query because of the server error",
                        e.javaClass.name,
                        e.message
                )
        )
    }
}