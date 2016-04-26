package com.github.sedovalx.oauth2.controllers.dto

import org.springframework.web.bind.annotation.RequestMethod
import javax.validation.constraints.NotNull

data class RequestDto(
        val method: RequestMethod = RequestMethod.GET,
        @NotNull
        val uri: String = "",
        val body: String? = null,
        val mimeType: String = "application/json",
        val charset: String = "UTF-8",
        val headers: List<KeyValueDto> = listOf()
)