package com.github.sedovalx.oauth2.controllers.dto

/**
 * Created by Alexander
 * on 22.04.2016.
 */
data class CodeUriParamsDto(
        val serverName: String?,
        val scope: String?,
        val state: String?
)