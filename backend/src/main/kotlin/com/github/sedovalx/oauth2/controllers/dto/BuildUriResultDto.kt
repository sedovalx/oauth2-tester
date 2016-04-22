package com.github.sedovalx.oauth2.controllers.dto

import com.fasterxml.jackson.annotation.JsonInclude

/**
 * Created by Alexander
 * on 23.04.2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
data class BuildUriResultDto(val success: Boolean, val error: String? = null, val uri: String? = null) {
    companion object {
        fun uri(uri: String): BuildUriResultDto {
            return BuildUriResultDto(success = true, uri = uri)
        }

        fun error(error: String): BuildUriResultDto {
            return BuildUriResultDto(success = false, error = error)
        }
    }
}